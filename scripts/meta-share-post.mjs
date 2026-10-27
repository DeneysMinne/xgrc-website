#!/usr/bin/env node
/**
 * Posts a just-published Insights article to the XGRC Software Facebook Page
 * and (when configured) its Instagram account. The Meta counterpart of
 * linkedin-share-post.mjs, with the same discipline: each target is
 * independent and best-effort, anything a human should look at is printed as
 * an "ALERT:" line, and the script exits non-zero only if EVERY configured
 * target failed. A Meta outage must never look like the blog deploy failing.
 *
 * Called from scheduled-deploy-post-v2.sh (share_to_meta) right after
 * DEPLOY_SUCCESS, next to share_to_linkedin.
 *
 * Usage: node scripts/meta-share-post.mjs <slug> [--facebook-only | --instagram-only] [--dry-run] [--force]
 *   --dry-run prints what would be posted and calls nothing (no credentials needed).
 *   --force posts even where the social share ledger says this article is
 *   already on that platform (scripts/social-share-ledger.mjs); without it a
 *   platform that already has the article is skipped, so re-runs never duplicate.
 *
 * Credentials: .secrets/meta-social.json (gitignored, chmod 600, VM-only),
 * written on the server during the live token session, never pasted anywhere:
 *   {
 *     "system_user_token": "...",   system user "xgrc-automation" in the
 *                                   Strategix business portfolio, app "XGRC
 *                                   Social Publishing", assigned to the Page
 *                                   (and the Instagram account) with content
 *                                   permission. Scopes: pages_manage_posts,
 *                                   pages_read_engagement, pages_show_list,
 *                                   instagram_basic, instagram_content_publish.
 *     "page_id": "...",              the XGRC Software Facebook Page id
 *     "instagram_user_id": "..."     optional: the Instagram professional
 *                                   account linked to that Page; omit to post
 *                                   to Facebook only
 *   }
 * The Page access token is fetched from the system user token at run time, so
 * nothing else needs storing. Until meta-social.json exists the script logs one
 * line and exits 0: Meta sharing is simply not set up yet.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { articles } from '../src/data/site.js'
import { describe, recordShare, sharedEntry } from './social-share-ledger.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.join(__dirname, '..')
const CONFIG_PATH = path.join(SITE_ROOT, '.secrets', 'meta-social.json')
// Graph API versions live about two years. A retired version fails with an
// OAuthException naming the version; bump this then.
const GRAPH = 'https://graph.facebook.com/v24.0'
const SITE_ORIGIN = 'https://xgrcsoftware.com'
const IMAGES_DIR = path.join(SITE_ROOT, 'public', 'assets', 'images', 'insights')

async function graph(method, pathname, params) {
  const url = new URL(`${GRAPH}/${pathname}`)
  const init = { method }
  if (method === 'GET') {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  } else {
    init.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    init.body = new URLSearchParams(params)
  }
  const resp = await fetch(url, init)
  const data = await resp.json().catch(() => ({}))
  if (!resp.ok || data.error) {
    // Graph errors carry message, type, code and fbtrace_id; never the token.
    const e = data.error || {}
    const detail = [e.type && `type ${e.type}`, e.code && `code ${e.code}`, e.fbtrace_id && `trace ${e.fbtrace_id}`].filter(Boolean).join(', ')
    throw new Error(`${method} ${pathname} failed (${resp.status}): ${e.message || 'no message'}${detail ? ` [${detail}]` : ''}`)
  }
  return data
}

// The article's image, as linkedin-share-post.mjs finds it: article.image,
// else <slug>.<ext> (the same fallback the site's own page uses).
function articleImage(article) {
  if (article.image) return article.image
  return ['jpg', 'jpeg', 'png', 'webp']
    .map((ext) => `${article.slug}.${ext}`)
    .find((name) => fs.existsSync(path.join(IMAGES_DIR, name)))
}

async function postToFacebook({ token, pageId, article, articleUrl }) {
  // The Page token comes from the system user token; it is never stored.
  const { access_token: pageToken } = await graph('GET', pageId, { fields: 'access_token', access_token: token })
  // Ask Facebook to (re)scrape the article first, so the link card has the
  // og:image and title rather than a blank card for a URL it has never seen.
  try {
    await graph('POST', '', { id: articleUrl, scrape: 'true', access_token: pageToken })
  } catch (err) {
    console.error(`ALERT: [facebook] Link preview refresh failed, posting anyway (the card may lack its image): ${err.message}`)
  }
  const { id } = await graph('POST', `${pageId}/feed`, {
    message: `${article.title}\n\n${article.excerpt}`,
    link: articleUrl,
    access_token: pageToken,
  })
  console.log(`[facebook] Page post created: ${id} (article: ${articleUrl})`)
  return id
}

async function postToInstagram({ token, igUserId, article, imageFile }) {
  if (!imageFile) throw new Error(`"${article.slug}" has no image, and Instagram posts need one`)
  if (!/\.jpe?g$/i.test(imageFile)) throw new Error(`Instagram accepts JPEG only; "${imageFile}" is not one`)
  const imageUrl = `${SITE_ORIGIN}/assets/images/insights/${imageFile}`
  // Instagram captions cannot carry clickable links, hence "link in bio".
  const caption = `${article.title}\n\n${article.excerpt}\n\nRead the full article at xgrcsoftware.com (link in bio).`
  const { id: containerId } = await graph('POST', `${igUserId}/media`, { image_url: imageUrl, caption, access_token: token })
  // The container is processed asynchronously; publish once it is FINISHED.
  for (let i = 0; i < 12; i++) {
    const { status_code: status } = await graph('GET', containerId, { fields: 'status_code', access_token: token })
    if (status === 'FINISHED') break
    if (status === 'ERROR' || status === 'EXPIRED') throw new Error(`Instagram media container ${containerId} ended ${status}`)
    if (i === 11) throw new Error(`Instagram media container ${containerId} still ${status} after 60s`)
    await new Promise((r) => setTimeout(r, 5000))
  }
  const { id } = await graph('POST', `${igUserId}/media_publish`, { creation_id: containerId, access_token: token })
  console.log(`[instagram] Post published: ${id} (image: ${imageUrl})`)
  return id
}

async function main() {
  const args = process.argv.slice(2)
  const slug = args.find((a) => !a.startsWith('--'))
  const fbOnly = args.includes('--facebook-only')
  const igOnly = args.includes('--instagram-only')
  const dryRun = args.includes('--dry-run')
  const force = args.includes('--force')
  if (!slug || (fbOnly && igOnly)) {
    console.error('Usage: node scripts/meta-share-post.mjs <slug> [--facebook-only | --instagram-only] [--dry-run] [--force]')
    process.exit(1)
  }
  const article = articles.find((a) => a.slug === slug)
  if (!article) throw new Error(`No article found in src/data/site.js for slug "${slug}"`)
  const articleUrl = `${SITE_ORIGIN}/insights/${slug}/`
  const imageFile = articleImage(article)
  if (!article.image && imageFile) {
    console.error(`ALERT: "${slug}" has no image: set in src/data/site.js; used ${imageFile}. Add image: '${imageFile}' to its entry.`)
  }

  // Already on a platform (ledger) -> that platform is skipped unless --force.
  const already = (platform) => (force ? null : sharedEntry(slug, platform))

  if (dryRun) {
    const plan = (platform, post) => (already(platform) ? `skip: ${describe(already(platform))}` : post)
    console.log(JSON.stringify({
      facebook: fbOnly || !igOnly ? plan('facebook', { message: `${article.title}\n\n${article.excerpt}`, link: articleUrl }) : 'skipped',
      instagram: igOnly || !fbOnly ? plan('instagram', { image_url: imageFile ? `${SITE_ORIGIN}/assets/images/insights/${imageFile}` : null }) : 'skipped',
      credentials: fs.existsSync(CONFIG_PATH) ? 'present' : 'not set up',
    }, null, 2))
    return
  }

  if (!fs.existsSync(CONFIG_PATH)) {
    console.log('[meta] Skipping Facebook and Instagram: .secrets/meta-social.json not set up yet.')
    return
  }
  const { system_user_token: token, page_id: pageId, instagram_user_id: igUserId } = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))

  const targets = []
  if (!igOnly && already('facebook')) {
    console.log(`[facebook] Skipping: ${describe(already('facebook'))}.`)
  } else if (!igOnly) {
    if (token && pageId) targets.push({ label: 'facebook', run: () => postToFacebook({ token, pageId, article, articleUrl }) })
    else console.error('ALERT: [facebook] meta-social.json lacks system_user_token or page_id')
  }
  if (!fbOnly && already('instagram')) {
    console.log(`[instagram] Skipping: ${describe(already('instagram'))}.`)
  } else if (!fbOnly && igUserId) {
    targets.push({ label: 'instagram', run: () => postToInstagram({ token, igUserId, article, imageFile }) })
  } else if (!fbOnly) {
    console.log('[instagram] Skipping: no instagram_user_id in meta-social.json.')
  }

  const results = await Promise.allSettled(targets.map(async (t) => {
    const id = await t.run()
    try {
      recordShare(slug, t.label, { id, source: 'meta-share-post' })
    } catch (err) {
      console.error(`ALERT: [${t.label}] Posted (${id}) but could not record it in the share ledger, so a re-run would post it again: ${err.message}`)
    }
  }))
  let anySucceeded = false
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') anySucceeded = true
    else console.error(`ALERT: [${targets[i].label}] Meta share failed: ${r.reason?.message ?? r.reason}`)
  })
  if (!anySucceeded && targets.length > 0) {
    throw new Error('Every configured Meta target failed; see the ALERT lines above.')
  }
}

main().catch((err) => {
  console.error('Meta share failed:', err.message)
  process.exit(1)
})
