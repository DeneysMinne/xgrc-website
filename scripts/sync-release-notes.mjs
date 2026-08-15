// ENH-106 (XRM side) / website "What's New" sync. Regenerates
// src/data/whatsNew.js from every XRM release note flagged public_facing,
// read directly from xrm_db -- no new API surface needed, since this only
// ever runs locally on the same box. Called by
// xgrc-scheduled-deploys/sync-and-deploy-whats-new.sh; "did anything
// change" is left to that wrapper's `git diff` on the generated file, not
// tracked here.
//
// XLOGIC has no equivalent source yet (its own "What's New" feature is
// being built separately) -- the `xlogic: []` key is a placeholder to keep
// the data shape stable for when that lands.

import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'whatsNew.js');

// Chosen because it can't plausibly appear in plain-language release-note
// prose, unlike a tab or comma.
const FIELD_SEP = '|~|';

const QUERY = `
  SELECT version || '${FIELD_SEP}' || release_date || '${FIELD_SEP}' || category || '${FIELD_SEP}'
         || regexp_replace(title, '[\\n\\r]+', ' ', 'g') || '${FIELD_SEP}'
         || regexp_replace(description, '[\\n\\r]+', ' ', 'g')
  FROM xrm_release_note
  WHERE public_facing = true
  ORDER BY release_date DESC, id DESC;
`;

function fetchXrmNotes() {
  const raw = execFileSync(
    'psql',
    ['-U', 'xrm_user', '-h', 'localhost', '-d', 'xrm_db', '-t', '-A', '-c', QUERY],
    { encoding: 'utf8' },
  );

  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [version, release_date, category, title, description] = line.split(FIELD_SEP);
      return { version, date: release_date, category, title, description };
    });
}

function renderFile(whatsNew) {
  const header = `// GENERATED FILE -- do not hand-edit.
// Produced by scripts/sync-xrm-release-notes.mjs from xrm_db's
// xrm_release_note table (rows flagged public_facing). Re-run that script
// to refresh; the hourly cron job (see xgrc-scheduled-deploys/) already
// does this automatically. xlogic entries will populate once XLOGIC ships
// its own release-notes feature.
`;
  return `${header}\nexport const whatsNew = ${JSON.stringify(whatsNew, null, 2)};\n`;
}

function main() {
  const xrmNotes = fetchXrmNotes();

  let previousXlogic = [];
  if (existsSync(OUT_FILE)) {
    try {
      const prevSrc = readFileSync(OUT_FILE, 'utf8');
      const match = prevSrc.match(/export const whatsNew = ({[\s\S]*});\s*$/);
      if (match) previousXlogic = JSON.parse(match[1]).xlogic || [];
    } catch {
      // Ignore -- a malformed previous file just means we fall back to [].
    }
  }

  const whatsNew = { xrm: xrmNotes, xlogic: previousXlogic };
  writeFileSync(OUT_FILE, renderFile(whatsNew));
  console.log(`Wrote ${xrmNotes.length} XRM entries to ${path.relative(process.cwd(), OUT_FILE)}`);
}

main();
