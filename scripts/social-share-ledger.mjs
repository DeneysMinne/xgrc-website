// Shared record of which Insights article has been posted to which social platform,
// so a re-run (a manual recovery, a script run by hand) never posts the same article
// twice to one platform. Read and written by scripts/linkedin-share-post.mjs and
// scripts/meta-share-post.mjs; seeded from the deploy logs by
// scripts/social-ledger-backfill.mjs. Anyone posting an article by hand records it
// here too (see the header of that backfill script).
//
// Shape: { "<slug>": { "<platform>": { "id": "<post id>", "at": "<ISO time>", "source": "<who>" } } }
// Platforms: facebook, instagram, linkedin-personal, linkedin-org.
//
// Lives beside the canonical scheduled-deploy script, outside the git tree, so a
// branch checkout can never roll it back. A missing file means nothing recorded yet;
// an unreadable one stops the share (better no post than a duplicate).
import fs from 'node:fs'

export const LEDGER_PATH = process.env.SOCIAL_LEDGER_PATH || '/opt/www/xgrc-scheduled-deploys/social-share-ledger.json'

export function readLedger() {
  let text
  try {
    text = fs.readFileSync(LEDGER_PATH, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') return {}
    throw err
  }
  try {
    return JSON.parse(text)
  } catch (err) {
    throw new Error(`${LEDGER_PATH} is not valid JSON (${err.message}); fix it before sharing, or posts could repeat`)
  }
}

export function sharedEntry(slug, platform) {
  return readLedger()[slug]?.[platform] || null
}

export function recordShare(slug, platform, { id, at, source }) {
  const ledger = readLedger()
  ledger[slug] = ledger[slug] || {}
  ledger[slug][platform] = { id, at: at || new Date().toISOString(), source }
  const tmp = `${LEDGER_PATH}.tmp-${process.pid}`
  fs.writeFileSync(tmp, JSON.stringify(ledger, null, 1) + '\n')
  fs.renameSync(tmp, LEDGER_PATH)
}

export function describe(entry) {
  return `already shared ${String(entry.at).slice(0, 10)} (${entry.id}); add --force to post it again`
}
