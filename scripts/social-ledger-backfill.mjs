#!/usr/bin/env node
// Seed the social share ledger (scripts/social-share-ledger.mjs) from the
// scheduled deploy logs, so every article already posted is known and cannot go
// out again on the same platform. Safe to re-run: entries already in the ledger
// are kept; the earliest post found in the logs wins.
//
//   node scripts/social-ledger-backfill.mjs            # write the ledger
//   node scripts/social-ledger-backfill.mjs --dry-run  # print what it would record
//
// Posting an article by hand (any platform)? Record it the same way, e.g.:
//   node -e "import('./scripts/social-share-ledger.mjs').then(m => m.recordShare('<slug>', 'facebook', { id: '<post id>', source: 'manual: <who>' }))"
// and check first with: node scripts/meta-share-post.mjs <slug> --dry-run
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LEDGER_PATH, readLedger } from './social-share-ledger.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const LOGS = path.join(here, 'scheduled-deploy-logs')
const dryRun = process.argv.includes('--dry-run')

const PATTERNS = [
  [/^\[facebook\] Page post created: (\S+)/, 'facebook'],
  [/^\[instagram\] Post published: (\S+)/, 'instagram'],
  [/^\[personal\] LinkedIn post created: (\S+)/, 'linkedin-personal'],
  [/^\[org\] LinkedIn post created: (\S+)/, 'linkedin-org'],
]
const STAMP = /^\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\]/

const found = {}
const repeats = []
for (const file of fs.readdirSync(LOGS).filter((f) => f.endsWith('.log')).sort()) {
  const slug = file.slice(0, -4)
  const fallbackAt = fs.statSync(path.join(LOGS, file)).mtime.toISOString()
  let lastStamp = null
  for (const line of fs.readFileSync(path.join(LOGS, file), 'utf8').split('\n')) {
    const s = line.match(STAMP)
    if (s) lastStamp = s[1]
    for (const [re, platform] of PATTERNS) {
      const m = line.match(re)
      if (!m) continue
      found[slug] = found[slug] || {}
      const entry = { id: m[1], at: lastStamp ? lastStamp.replace('Z', '.000Z') : fallbackAt, source: `backfill: ${file}` }
      if (found[slug][platform]) repeats.push(`${slug} ${platform}: ${found[slug][platform].id} and ${entry.id}`)
      else found[slug][platform] = entry
    }
  }
}

const ledger = readLedger()
let added = 0
for (const [slug, platforms] of Object.entries(found)) {
  for (const [platform, entry] of Object.entries(platforms)) {
    if (ledger[slug]?.[platform]) continue
    ledger[slug] = ledger[slug] || {}
    ledger[slug][platform] = entry
    added++
  }
}

const counts = {}
for (const platforms of Object.values(ledger)) for (const p of Object.keys(platforms)) counts[p] = (counts[p] || 0) + 1
console.log(`${added} new entr${added === 1 ? 'y' : 'ies'} from the logs; ledger now holds ${Object.keys(ledger).length} articles:`, counts)
if (repeats.length) console.log(`Already posted more than once (kept the first):\n  ${repeats.join('\n  ')}`)
if (dryRun) {
  console.log('(dry run: nothing written)')
} else {
  const tmp = `${LEDGER_PATH}.tmp-${process.pid}`
  fs.writeFileSync(tmp, JSON.stringify(ledger, null, 1) + '\n')
  fs.renameSync(tmp, LEDGER_PATH)
  console.log(`Wrote ${LEDGER_PATH}`)
}
