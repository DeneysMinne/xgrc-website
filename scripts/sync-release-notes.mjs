// Website "What's New" sync. Regenerates src/data/whatsNew.js from every
// XRM and XLOGIC release note flagged public_facing, read directly from
// each product's own database -- no new API surface needed, since this
// only ever runs locally on the same box. Called by
// xgrc-scheduled-deploys/sync-and-deploy-whats-new.sh; "did anything
// change" is left to that wrapper's `git diff` on the generated file, not
// tracked here.

import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'whatsNew.js');

// Chosen because it can't plausibly appear in plain-language release-note
// prose, unlike a tab or comma.
const FIELD_SEP = '|~|';

function selectQuery(table) {
  return `
    SELECT version || '${FIELD_SEP}' || release_date || '${FIELD_SEP}' || category || '${FIELD_SEP}'
           || regexp_replace(title, '[\\n\\r]+', ' ', 'g') || '${FIELD_SEP}'
           || regexp_replace(description, '[\\n\\r]+', ' ', 'g')
    FROM ${table}
    WHERE public_facing = true
    ORDER BY release_date DESC, created_at DESC;
  `;
}

function parseRows(raw) {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [version, release_date, category, title, description] = line.split(FIELD_SEP);
      return { version, date: release_date, category: category.toLowerCase(), title, description };
    });
}

// XRM: connects as the app's own OS-trusted local role, same as every
// other XRM maintenance script on this box.
function fetchXrmNotes() {
  const raw = execFileSync(
    'psql',
    ['-U', 'xrm_user', '-h', 'localhost', '-d', 'xrm_db', '-t', '-A', '-c', selectQuery('xrm_release_note')],
    { encoding: 'utf8' },
  );
  return parseRows(raw);
}

// XLOGIC: separate Postgres instance/port, credentials in its own
// production env file (read directly, never hardcoded here).
function fetchXlogicNotes() {
  const envPath = '/opt/www/xlogic/.env.production';
  const envSrc = readFileSync(envPath, 'utf8');
  const match = envSrc.match(/^DATABASE_URL=(.+)$/m);
  if (!match) throw new Error(`DATABASE_URL not found in ${envPath}`);
  const dsn = match[1].trim().replace(/\?.*$/, '');

  const raw = execFileSync(
    'psql',
    [dsn, '-t', '-A', '-c', selectQuery('release_note')],
    { encoding: 'utf8' },
  );
  return parseRows(raw);
}

function renderFile(whatsNew) {
  const header = `// GENERATED FILE -- do not hand-edit.
// Produced by scripts/sync-release-notes.mjs from XRM's and XLOGIC's own
// databases (rows flagged public_facing in each). Re-run that script to
// refresh; the hourly cron job (see xgrc-scheduled-deploys/) already does
// this automatically.
`;
  return `${header}\nexport const whatsNew = ${JSON.stringify(whatsNew, null, 2)};\n`;
}

function main() {
  const xrmNotes = fetchXrmNotes();
  const xlogicNotes = fetchXlogicNotes();

  const whatsNew = { xrm: xrmNotes, xlogic: xlogicNotes };
  writeFileSync(OUT_FILE, renderFile(whatsNew));
  console.log(
    `Wrote ${xrmNotes.length} XRM + ${xlogicNotes.length} XLOGIC entries to ${path.relative(process.cwd(), OUT_FILE)}`,
  );
}

main();
