#!/usr/bin/env node
// Validates src/data/useCaseRegistry.js against the invariants the content
// engine depends on. Run with `npm run validate-content` before every build.
// See docs/add-new-use-case.md for the full authoring workflow.

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const { useCaseRegistry, useCaseCategories } = await import(path.join(ROOT, 'src/data/useCaseRegistry.js'));
const { solutionDetails } = await import(path.join(ROOT, 'src/data/site.js'));

const errors = [];
const warnings = [];

const REQUIRED_FIELDS = ['slug', 'category', 'crumbLabel', 'title', 'metaDescription', 'h1', 'lede'];
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const slugs = useCaseRegistry.map((u) => u.slug);
const slugSet = new Set(slugs);

// no duplicate slugs
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) errors.push(`Duplicate slugs: ${[...new Set(dupes)].join(', ')}`);

for (const entry of useCaseRegistry) {
  const id = entry.slug || '(missing slug)';

  // required fields present
  for (const field of REQUIRED_FIELDS) {
    if (!entry[field]) errors.push(`${id}: missing required field "${field}"`);
  }

  // valid slug format (kebab-case) -> resolves to a valid /use-cases/<slug>/ URL
  if (entry.slug && !SLUG_RE.test(entry.slug)) {
    errors.push(`${id}: slug is not kebab-case`);
  }

  // valid category
  if (entry.category && !useCaseCategories.includes(entry.category)) {
    errors.push(`${id}: unknown category "${entry.category}"`);
  }

  // no missing framework tags
  if (!entry.frameworks || entry.frameworks.length === 0) {
    warnings.push(`${id}: no framework tags`);
  }

  // no missing related solution
  if (!entry.relatedSolution) {
    warnings.push(`${id}: no relatedSolution set`);
  } else if (!solutionDetails[entry.relatedSolution]) {
    errors.push(`${id}: relatedSolution "${entry.relatedSolution}" does not exist in solutionDetails`);
  }

  // related pages exist / no broken internal links
  for (const rel of entry.relatedUseCases || []) {
    if (!slugSet.has(rel)) {
      errors.push(`${id}: relatedUseCases references unknown slug "${rel}"`);
    }
  }

  // every use case has a CTA
  if (!entry.ctaHeadline && !entry.ctaBody) {
    warnings.push(`${id}: no custom ctaHeadline/ctaBody (layout default will be used)`);
  }

  // gated resource checks
  if (entry.resource) {
    const r = entry.resource;
    if (!r.title || !r.checklistSlug || !r.pdfPath) {
      errors.push(`${id}: resource is missing title/checklistSlug/pdfPath`);
    }
    if (r.pdfPath) {
      const pdfFile = path.join(ROOT, 'public', r.pdfPath.replace(/^\//, ''));
      if (!existsSync(pdfFile)) {
        errors.push(`${id}: resource PDF does not exist at public${r.pdfPath}`);
      }
      const isNewConvention = r.pdfPath.startsWith('/resources/');
      if (isNewConvention && !/^\/resources\/[a-z0-9-]+-v\d+-\d+\.pdf$/.test(r.pdfPath)) {
        warnings.push(`${id}: resource PDF path "${r.pdfPath}" doesn't match the xgrc-<slug>-v1-0.pdf naming convention`);
      }
      if (isNewConvention) {
        const jsonFile = path.join(ROOT, 'src/content/checklists', `${r.checklistSlug}.json`);
        if (!existsSync(jsonFile)) {
          errors.push(`${id}: no checklist JSON found at src/content/checklists/${r.checklistSlug}.json`);
        }
      }
    }
  }
}

console.log(`Validated ${useCaseRegistry.length} registry entries.\n`);

if (warnings.length) {
  console.log(`${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ⚠ ${w}`));
  console.log('');
}

if (errors.length) {
  console.log(`${errors.length} error(s):`);
  errors.forEach((e) => console.log(`  ✗ ${e}`));
  process.exit(1);
}

console.log('No errors. Content registry is valid.');
