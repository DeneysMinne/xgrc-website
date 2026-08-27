#!/usr/bin/env node
/**
 * Posts a just-published Insights article to LinkedIn (personal profile).
 *
 * Called from scripts/scheduled-deploy-post-v2.sh right after it confirms
 * DEPLOY_SUCCESS for a blog post. Fire-and-forget from the caller's side:
 * this script logs and exits non-zero on its own failure, but a LinkedIn
 * outage must never be treated as the blog deploy itself having failed.
 *
 * Usage: node scripts/linkedin-share-post.mjs <slug>
 *
 * Credentials read from .secrets/ (gitignored, chmod 600, VM-only):
 *   linkedin-app-client-secret.json  -- {client_id, client_secret} of the
 *                                       "XGRC" LinkedIn developer app
 *   linkedin-personal-refresh-token  -- Deneys' personal OAuth refresh
 *                                       token (w_member_social + openid +
 *                                       profile scopes, minted 2026-08-27)
 *   linkedin-personal-urn            -- his urn:li:person:{id}, from the
 *                                       OpenID userinfo endpoint
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { articles } from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.join(__dirname, '..')
const SECRETS_DIR = path.join(SITE_ROOT, '.secrets')
const REFRESH_TOKEN_PATH = path.join(SECRETS_DIR, 'linkedin-personal-refresh-token')
const SITE_ORIGIN = 'https://www.xgrcsoftware.com'
const IMAGES_DIR = path.join(SITE_ROOT, 'public', 'assets', 'images', 'insights')

function readSecret(name) {
  return fs.readFileSync(path.join(SECRETS_DIR, name), 'utf8').trim()
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

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
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
    fs.writeFileSync(REFRESH_TOKEN_PATH, data.refresh_token, { mode: 0o600 })
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

async function main() {
  const slug = process.argv[2]
  if (!slug) {
    console.error('Usage: node scripts/linkedin-share-post.mjs <slug>')
    process.exit(1)
  }
  const article = articles.find(a => a.slug === slug)
  if (!article) {
    throw new Error(`No article found in src/data/site.js for slug "${slug}"`)
  }

  const { client_id: clientId, client_secret: clientSecret } = JSON.parse(readSecret('linkedin-app-client-secret.json'))
  const refreshToken = readSecret('linkedin-personal-refresh-token')
  const personUrn = readSecret('linkedin-personal-urn')

  const articleUrl = `${SITE_ORIGIN}/insights/${slug}`
  const accessToken = await refreshAccessToken(clientId, clientSecret, refreshToken)

  // Best-effort: a missing/unreadable image file must not block the post
  // itself -- post without a thumbnail rather than fail the whole share.
  let thumbnailUrn
  if (article.image) {
    const imagePath = path.join(IMAGES_DIR, article.image)
    try {
      thumbnailUrn = await uploadImage(accessToken, personUrn, imagePath)
    } catch (err) {
      console.error(`Could not upload thumbnail image (${imagePath}), posting without one: ${err.message}`)
    }
  }

  const postId = await createArticlePost({
    accessToken,
    authorUrn: personUrn,
    commentary: `${article.title}\n\n${article.excerpt}`,
    articleUrl,
    title: article.title,
    description: article.excerpt,
    thumbnailUrn,
  })
  console.log(`LinkedIn post created: ${postId} (article: ${articleUrl}, thumbnail: ${thumbnailUrn || 'none'})`)
}

main().catch(err => {
  console.error('LinkedIn share failed:', err.message)
  process.exit(1)
})
