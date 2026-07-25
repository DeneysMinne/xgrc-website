// Dump the fields the infographic generator needs from solutionDetails (site.js)
// to a JSON file the Python/WeasyPrint generator can read.
// Run: node scripts/generate-pdfs/dump_solutions.mjs
import { solutionDetails } from '../../src/data/site.js';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const out = {};
for (const [slug, v] of Object.entries(solutionDetails)) {
  out[slug] = {
    name: v.name || slug,
    tag: v.tag || '',
    headline: v.headline || '',
    lede: v.lede || '',
    logo: v.logo || null,
    standards: v.standards || [],
    moduleGroups: (v.moduleGroups || []).map((g) => ({ category: g.category, modules: g.modules })),
    challenges: (v.challenges || []).map((c) => ({ title: c.title, body: c.body })),
    stats: (v.stats || []).map((s) => ({ value: s.value, label: s.label })),
  };
}
writeFileSync(join(here, 'solutions.json'), JSON.stringify(out, null, 1));
console.log(`Wrote solutions.json (${Object.keys(out).length} solutions)`);
