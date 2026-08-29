#!/usr/bin/env node
/**
 * Posts a just-published Insights article to LinkedIn: Deneys' personal
 * profile, and (once the org credentials below exist) the XGRC company
 * page too. Each target is independent and best-effort -- one failing or
 * missing its credentials never blocks the other.
 *
 * Called from scripts/scheduled-deploy-post-v2.sh right after it confirms
 * DEPLOY_SUCCESS for a blog post. Fire-and-forget from the caller's side:
 * this script logs and exits non-zero only if EVERY target failed; a
 * LinkedIn outage must never be treated as the blog deploy itself having
 * failed.
 *
 * Usage: node scripts/linkedin-share-post.mjs <slug>
 *
 * Credentials read from .secrets/ (gitignored, chmod 600, VM-only):
 *   linkedin-app-client-secret.json      -- {client_id, client_secret} of
 *                                           the "XGRC" app (personal-profile
 *                                           posting: Share on LinkedIn)
 *   linkedin-personal-refresh-token      -- Deneys' personal OAuth refresh
 *                                           token (w_member_social + openid
 *                                           + profile scopes, minted
 *                                           2026-08-27)
 *   linkedin-personal-urn                -- his urn:li:person:{id}, from
 *                                           the OpenID userinfo endpoint
 *   linkedin-org-app-client-secret.json  -- {client_id, client_secret} of
 *                                           the separate "XGRC Community
 *                                           Management" app (company-page
 *                                           posting: w_organization_social
 *                                           can't coexist with Advertising
 *                                           API + Share on LinkedIn on one
 *                                           app -- LinkedIn requires it be
 *                                           the only product on the app).
 *   linkedin-org-refresh-token           -- org-page OAuth refresh token
 *                                           (w_organization_social scope)
 *   ORG_URN constant below               -- urn:li:organization:17970825,
 *                                           the XGRC company page (NOT
 *                                           123322, which is Strategix the
 *                                           holding company's page). Not
 *                                           secret, hardcoded.
 *
 * If linkedin-org-app-client-secret.json / linkedin-org-refresh-token
 * don't exist yet, org posting is skipped silently (one-time OAuth
 * authorization hasn't been done yet) -- personal-profile posting still
 * runs normally.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { articles } from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.join(__dirname, '..')
const SECRETS_DIR = path.join(SITE_ROOT, '.secrets')
const REFRESH_TOKEN_PATH = path.join(SECRETS_DIR, 'linkedin-personal-refresh-token')
const ORG_REFRESH_TOKEN_PATH = path.join(SECRETS_DIR, 'linkedin-org-refresh-token')
const ORG_URN = 'urn:li:organization:17970825'
const SITE_ORIGIN = 'https://www.xgrcsoftware.com'
const IMAGES_DIR = path.join(SITE_ROOT, 'public', 'assets', 'images', 'insights')

function readSecret(name) {
  return fs.readFileSync(path.join(SECRETS_DIR, name), 'utf8').trim()
}

function secretExists(name) {
  return fs.existsSync(path.join(SECRETS_DIR, name))
}

// LinkedIn retires API versions ~12 months after release (confirmed live
// 2026-08-27 fixing the same rot in the XRM LinkedIn Ads connector -- see
// project_xrm_enh132_linkedin_connector_first_live_test_2026_08_27 in
// Claude memory). Computed at call time, one month behind current UTC
// month, so this can't silently go stale the way a hardcoded string did.
function currentLinkedInVersion() {
  const now = new Date()
  let year = now.getUTCFullYear()
  let month = now.getUTCMonth() // 0-11 -- already "1-indexed current month minus 1"
  if (month === 0) { month = 12; year -= 1 }
  return `${year}${String(month).padStart(2, '0')}`
}

async function refreshAccessToken(clientId, clientSecret, refreshToken, refreshTokenPath) {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  })
  const resp = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const data = await resp.json()
  if (!resp.ok) {
    throw new Error(`LinkedIn token refresh failed (${resp.status}): ${JSON.stringify(data)}`)
  }
  // LinkedIn may rotate the refresh token on use -- persist it if so, or
  // every run after the first would refresh against a dead token.
  if (data.refresh_token && data.refresh_token !== refreshToken) {
    fs.writeFileSync(refreshTokenPath, data.refresh_token, { mode: 0o600 })
  }
  return data.access_token
}

// LinkedIn's Posts API does not scrape a thumbnail from the article URL --
// it must be uploaded and referenced explicitly (Images API), or the link
// card renders with no image at all (confirmed live 2026-08-27, first
// personal post had none). Two-step flow: initializeUpload registers the
// asset and returns a one-time uploadUrl + the final image urn, then the
// raw JPEG bytes are PUT to that url with the same Bearer token.
async function uploadImage(accessToken, ownerUrn, imagePath) {
  const initResp = await fetch('https://api.linkedin.com/rest/images?action=initializeUpload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'Linkedin-Version': currentLinkedInVersion(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initializeUploadRequest: { owner: ownerUrn } }),
  })
  if (!initResp.ok) {
    throw new Error(`LinkedIn image upload init failed (${initResp.status}): ${await initResp.text()}`)
  }
  const { value } = await initResp.json()
  const { uploadUrl, image: imageUrn } = value

  const fileBytes = fs.readFileSync(imagePath)
  const uploadResp = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: fileBytes,
  })
  if (!uploadResp.ok) {
    throw new Error(`LinkedIn image binary upload failed (${uploadResp.status}): ${await uploadResp.text()}`)
  }
  return imageUrn
}

async function createArticlePost({ accessToken, authorUrn, commentary, articleUrl, title, description, thumbnailUrn }) {
  const body = {
    author: authorUrn,
    commentary,
    visibility: 'PUBLIC',
    distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
    content: {
      article: {
        source: articleUrl,
        title,
        description,
        ...(thumbnailUrn ? { thumbnail: thumbnailUrn } : {}),
      },
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  }
  const resp = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'Linkedin-Version': currentLinkedInVersion(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (resp.status !== 201) {
    const text = await resp.text()
    throw new Error(`LinkedIn post creation failed (${resp.status}): ${text}`)
  }
  return resp.headers.get('x-restli-id')
}

// One target = one LinkedIn author (a person or an organization) posting
// with its own app credentials/refresh token. Each target's failure is
// caught and reported independently -- see main()'s Promise.allSettled.
async function postToTarget({ label, accessToken, authorUrn, article, articleUrl }) {
  let thumbnailUrn
  if (article.image) {
    const imagePath = path.join(IMAGES_DIR, article.image)
    try {
      thumbnailUrn = await uploadImage(accessToken, authorUrn, imagePath)
    } catch (err) {
      console.error(`[${label}] Could not upload thumbnail image (${imagePath}), posting without one: ${err.message}`)
    }
  }

  const postId = await createArticlePost({
    accessToken,
    authorUrn,
    commentary: `${article.title}\n\n${article.excerpt}`,
    articleUrl,
    title: article.title,
    description: article.excerpt,
    thumbnailUrn,
  })
  console.log(`[${label}] LinkedIn post created: ${postId} (article: ${articleUrl}, thumbnail: ${thumbnailUrn || 'none'})`)
}

async function main() {
  const args = process.argv.slice(2)
  const slug = args.find(a => !a.startsWith('--'))
  const orgOnly = args.includes('--org-only')
  if (!slug) {
    console.error('Usage: node scripts/linkedin-share-post.mjs <slug> [--org-only]')
    process.exit(1)
  }
  const article = articles.find(a => a.slug === slug)
  if (!article) {
    throw new Error(`No article found in src/data/site.js for slug "${slug}"`)
  }
  const articleUrl = `${SITE_ORIGIN}/insights/${slug}`

  const targets = []

  // --org-only exists for verifying the org-page path in isolation against
  // an article that was already shared to the personal profile in a past
  // run (e.g. re-testing after the org app was set up) -- without it,
  // every normal invocation posts to both configured targets.
  if (!orgOnly) {
    const { client_id: clientId, client_secret: clientSecret } = JSON.parse(readSecret('linkedin-app-client-secret.json'))
    const refreshToken = readSecret('linkedin-personal-refresh-token')
    const personUrn = readSecret('linkedin-personal-urn')
    targets.push({ label: 'personal', clientId, clientSecret, refreshToken, refreshTokenPath: REFRESH_TOKEN_PATH, authorUrn: personUrn })
  }

  if (secretExists('linkedin-org-app-client-secret.json') && secretExists('linkedin-org-refresh-token')) {
    const { client_id: clientId, client_secret: clientSecret } = JSON.parse(readSecret('linkedin-org-app-client-secret.json'))
    const refreshToken = readSecret('linkedin-org-refresh-token')
    targets.push({ label: 'org', clientId, clientSecret, refreshToken, refreshTokenPath: ORG_REFRESH_TOKEN_PATH, authorUrn: ORG_URN })
  } else {
    console.log('[org] Skipping company-page post: org credentials not set up yet (one-time OAuth authorization pending).')
  }

  const results = await Promise.allSettled(targets.map(async (t) => {
    const accessToken = await refreshAccessToken(t.clientId, t.clientSecret, t.refreshToken, t.refreshTokenPath)
    await postToTarget({ label: t.label, accessToken, authorUrn: t.authorUrn, article, articleUrl })
  }))

  let anySucceeded = false
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      anySucceeded = true
    } else {
      console.error(`[${targets[i].label}] LinkedIn share failed: ${result.reason?.message ?? result.reason}`)
    }
  })

  if (!anySucceeded && targets.length > 0) {
    throw new Error('Every configured LinkedIn target failed -- see per-target errors above.')
  }
}

main().catch(err => {
  console.error('LinkedIn share failed:', err.message)
  process.exit(1)
})
