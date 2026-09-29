#!/usr/bin/env node
// Checks deploy/nginx/redirects.conf against a built site (default dist/).
// Every redirect must be a single hop to a page that exists:
//   - the target is not itself redirected (no chains),
//   - the target is a page or file in the build,
//   - a page target ends in "/" (otherwise nginx adds a second 301),
//   - no exact source is listed twice, and no source is also a live page.
// Usage: node scripts/check-redirects.mjs [distDir]
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const conf = readFileSync(new URL('../deploy/nginx/redirects.conf', import.meta.url), 'utf8');

const exact = new Map();
const regex = [];
const errors = [];

for (const m of conf.matchAll(/location = "?([^"\s{]+)"? \{ return 301 ([^;]+);/g)) {
  if (exact.has(m[1])) errors.push(`duplicate source ${m[1]}`);
  exact.set(m[1], m[2]);
}
for (const m of conf.matchAll(/location ~\*? "?([^"\s{]+)"? \{\s*return 301 ([^;]+);/g)) {
  regex.push({ re: new RegExp(m[1]), to: m[2] });
}

// nginx order: exact match first, then regex locations in file order.
function redirectOf(path) {
  if (exact.has(path)) return exact.get(path);
  for (const r of regex) {
    const m = path.match(r.re);
    if (m) return r.to.replace(/\$(\d)/g, (_, i) => m[i] ?? '');
  }
  return null;
}

function inBuild(path) {
  const p = join(dist, decodeURIComponent(path.split('?')[0]));
  if (path.endsWith('/')) return existsSync(join(p, 'index.html'));
  return existsSync(p) && statSync(p).isFile();
}

const sources = [...exact.keys()];
// Regex targets with $1 are checked with the values the pattern allows.
for (const r of regex) {
  const alts = r.re.source.match(/\(([a-z0-9|-]+)\)/);
  if (r.to.includes('$1') && alts) {
    for (const a of alts[1].split('|')) sources.push(r.re.source.replace(/^\^/, '').replace(alts[0], a).replace(/\/\?\$$|\$$/, '/').replace(/\\/g, ''));
  }
}

let count = 0;
for (const from of sources) {
  const to = redirectOf(from);
  if (!to) continue;
  count++;
  if (/^https?:/.test(to)) { errors.push(`${from} -> ${to}: absolute target, use a path`); continue; }
  if (redirectOf(to)) errors.push(`${from} -> ${to}: chain, target redirects to ${redirectOf(to)}`);
  if (!/\.[a-z0-9]+$/i.test(to) && !to.endsWith('/')) errors.push(`${from} -> ${to}: target has no trailing slash`);
  else if (!inBuild(to)) errors.push(`${from} -> ${to}: target not in the build`);
  if (from.endsWith('/') && inBuild(from)) errors.push(`${from}: is a live page but also redirected`);
}
for (const r of regex) {
  if (r.to.includes('$')) continue;
  if (redirectOf(r.to)) errors.push(`${r.re} -> ${r.to}: chain`);
  if (!inBuild(r.to)) errors.push(`${r.re} -> ${r.to}: target not in the build`);
}

if (errors.length) {
  console.error(errors.map(e => `FAIL ${e}`).join('\n'));
  console.error(`${errors.length} problem(s) in ${count} redirects`);
  process.exit(1);
}
console.log(`PASS ${count} exact/expanded redirects and ${regex.length} patterns: all single-hop to live pages`);
