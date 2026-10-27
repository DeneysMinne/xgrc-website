#!/usr/bin/env node
/**
 * Schedules planned Facebook Page posts (older articles, resources) from a plan
 * file, using Facebook's own scheduled publishing, so the back catalogue reaches
 * the Page a few posts a week instead of all at once. Facebook only: new Insights
 * articles keep going to every platform through meta-share-post.mjs and
 * linkedin-share-post.mjs at publish time.
 *
 * Each plan item is checked against the social share ledger
 * (scripts/social-share-ledger.mjs) first, under its key (an article slug, or
 * "page:<path>" for a resource), and recorded there once scheduled, so nothing is
 * ever posted to the Page twice and the publish-time scripts skip these articles.
 *
 * Usage: node scripts/meta-schedule-posts.mjs <plan.json> [--dry-run] [--within-days N]
 *   Plan: [{ "key", "at" (ISO time, future), "link", "message" }]
 *   Only items due within N days (default 21) are scheduled, which keeps every
 *   request inside Facebook's scheduling window; run it again later for the rest.
 *
 * Credentials: .secrets/meta-social.json (as meta-share-post.mjs).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, recordShare, sharedEntry } from './social-share-ledger.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONFIG_PATH = path.join(__dirname, '..', '.secrets', 'meta-social.json')
const GRAPH = 'https://graph.facebook.com/v24.0' // same version as meta-share-post.mjs

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
    const e = data.error || {}
    const detail = [e.type && `type ${e.type}`, e.code && `code ${e.code}`, e.fbtrace_id && `trace ${e.fbtrace_id}`].filter(Boolean).join(', ')
    throw new Error(`${method} ${pathname} failed (${resp.status}): ${e.message || 'no message'}${detail ? ` [${detail}]` : ''}`)
  }
  return data
}

async function main() {
  const args = process.argv.slice(2)
  const planPath = args.find((a) => !a.startsWith('--') && !/^\d+$/.test(a))
  const dryRun = args.includes('--dry-run')
  const wi = args.indexOf('--within-days')
  const withinDays = wi >= 0 ? Number(args[wi + 1]) : 21
  if (!planPath || !Number.isFinite(withinDays)) {
    console.error('Usage: node scripts/meta-schedule-posts.mjs <plan.json> [--dry-run] [--within-days N]')
    process.exit(1)
  }
  const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'))
  const now = Date.now()
  const horizon = now + withinDays * 86400000

  let pageId, pageToken
  let scheduled = 0
  for (const item of plan) {
    const at = Date.parse(item.at)
    if (!item.key || !item.message || !item.link || !Number.isFinite(at)) {
      console.error(`ALERT: [plan] Item ${JSON.stringify(item.key)} needs key, at, link and message; skipped.`)
      continue
    }
    const entry = sharedEntry(item.key, 'facebook')
    if (entry) {
      console.log(`[facebook] ${item.key}: skipping, ${describe(entry).replace(/; add --force.*/, '')}.`)
      continue
    }
    if (at < now + 15 * 60000) {
      console.error(`ALERT: [facebook] ${item.key}: ${item.at} is in the past or under 15 minutes away; not scheduled.`)
      continue
    }
    if (at > horizon) {
      console.log(`[facebook] ${item.key}: due ${item.at}, beyond ${withinDays} days; left for a later run.`)
      continue
    }
    if (dryRun) {
      console.log(`[dry-run] ${item.key}: would schedule for ${item.at}\n  link: ${item.link}\n  ${item.message.replace(/\n/g, '\n  ')}`)
      continue
    }
    if (!pageToken) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
      pageId = config.page_id
      ;({ access_token: pageToken } = await graph('GET', pageId, { fields: 'access_token', access_token: config.system_user_token }))
    }
    const { id } = await graph('POST', `${pageId}/feed`, {
      message: item.message,
      link: item.link,
      published: 'false',
      scheduled_publish_time: String(Math.floor(at / 1000)),
      access_token: pageToken,
    })
    try {
      recordShare(item.key, 'facebook', { id, at: item.at, source: `meta-schedule-posts: scheduled ${item.at}` })
    } catch (err) {
      console.error(`ALERT: [facebook] ${item.key}: scheduled (${id}) but not recorded in the share ledger, so a re-run would schedule it again: ${err.message}`)
    }
    console.log(`[facebook] ${item.key}: scheduled for ${item.at}, post ${id}`)
    scheduled++
  }
  if (!dryRun) console.log(`${scheduled} post(s) scheduled.`)
}

main().catch((err) => {
  console.error('Facebook scheduling failed:', err.message)
  process.exit(1)
})
