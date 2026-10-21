// Builds public/resources/xgrc-security-trust-overview-v3.pdf from cover.html +
// body.html + back.html (XGRC Security & Trust Overview v3.1, Oct 2026). The cover prints
// full-bleed with no footer; the body gets a running footer with page numbers.
// The two are merged with pypdf from scripts/generate-pdfs/.venv.
//
//   node scripts/generate-pdfs/security-overview/build.mjs
//
// Needs Playwright's Chromium (PLAYWRIGHT_BROWSERS_PATH where it is installed).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..', '..');
const out = join(root, 'public', 'resources', 'xgrc-security-trust-overview-v3.pdf');
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const footer = `<div style="width:100%;font-family:Inter,Arial,sans-serif;font-size:7.5px;color:#5d7083;
  padding:0 17mm;display:flex;justify-content:space-between;">
  <span>XGRC® Security &amp; Trust Overview · v3.1 · October 2026</span>
  <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;

const tmp = mkdtempSync(join(tmpdir(), 'xgrc-sec-'));
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const [name, opts] of [
    ['cover', { printBackground: true, preferCSSPageSize: true }],
    ['body', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
               headerTemplate: '<span></span>', footerTemplate: footer }],
    ['back', { printBackground: true, preferCSSPageSize: true }],
  ]) {
    await page.goto(pathToFileURL(join(here, `${name}.html`)).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: join(tmp, `${name}.pdf`), ...opts });
  }
} finally {
  await browser.close();
}

const py = join(root, 'scripts', 'generate-pdfs', '.venv', 'bin', 'python');
execFileSync(py, ['-I', '-c', `
import sys
from pypdf import PdfWriter, PdfReader
w = PdfWriter()
for f in sys.argv[1:4]:
    for p in PdfReader(f).pages: w.add_page(p)
w.add_metadata({'/Title': 'XGRC® Security & Trust Overview v3.1', '/Author': 'Strategix Application Solutions (Pty) Ltd',
                '/Subject': 'Security, privacy and resilience of the XGRC® platform', '/Keywords': 'ISO 27001, POPIA, PAIA, GDPR, security'})
with open(sys.argv[4], 'wb') as fh: w.write(fh)
`, join(tmp, 'cover.pdf'), join(tmp, 'body.pdf'), join(tmp, 'back.pdf'), out], { stdio: 'inherit' });
rmSync(tmp, { recursive: true, force: true });
console.log('Wrote', out);
