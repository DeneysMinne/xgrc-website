// =============================================================================
// Markdown twins — render clean Markdown versions of content pages from the
// same single source of truth used by the .astro pages (site.js,
// articleContent.js, useCaseRegistry.js). Consumed by the *.md.js static
// endpoints, which write /path.md files into dist/ at build time.
//
// Why: humans paste URLs into ChatGPT/Claude/Perplexity, and coding agents
// fetch docs, expecting readable Markdown rather than a marketing HTML bundle.
// Generating from data (not scraping rendered HTML) means no content drift.
// =============================================================================

import { articles, articleFaqs, solutions, solutionDetails } from '../data/site.js';
import { articleContent } from '../data/articleContent.js';
import { useCaseRegistry } from '../data/useCaseRegistry.js';

const SITE = 'https://xgrcsoftware.com';

// Turn any relative href into an absolute xgrcsoftware.com URL so the Markdown
// stands alone when read outside the site.
function absolute(href) {
  if (!href) return href;
  if (/^https?:\/\//i.test(href)) return href;
  return `${SITE}${href.startsWith('/') ? '' : '/'}${href}`;
}

// Convert the small amount of inline HTML that appears in article bodies
// (mainly <a href> links) into Markdown, and strip anything else.
function inlineHtmlToMarkdown(text) {
  return text
    .replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis, (_, href, label) => `[${label}](${absolute(href)})`)
    .replace(/<\/?(strong|b)>/gi, '**')
    .replace(/<\/?(em|i)>/gi, '_')
    .replace(/<[^>]+>/g, '') // drop any remaining tags
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”');
}

// Mirror the renderBody() heuristic in insights/[slug].astro so the Markdown
// structure matches the rendered HTML: bullet lists, short standalone lines as
// H2 headings, everything else as paragraphs.
function articleBodyToMarkdown(text) {
  return text
    .trim()
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      const lines = trimmed.split('\n');

      if (lines.length > 0 && lines.every((l) => l.trim().startsWith('- '))) {
        return lines.map((l) => `- ${inlineHtmlToMarkdown(l.trim().slice(2).trim())}`).join('\n');
      }

      if (lines.length === 1 && trimmed.length < 120 && !/[.,:;]$/.test(trimmed) && !trimmed.startsWith('-')) {
        return `## ${inlineHtmlToMarkdown(trimmed)}`;
      }

      return inlineHtmlToMarkdown(trimmed.replace(/\n/g, ' '));
    })
    .filter(Boolean)
    .join('\n\n');
}

function faqSection(faqs) {
  if (!faqs || !faqs.length) return '';
  const body = faqs.map((f) => `### ${f.q}\n\n${inlineHtmlToMarkdown(f.a)}`).join('\n\n');
  return `## Frequently asked questions\n\n${body}`;
}

function htmlLink(path, label) {
  return `[${label}](${absolute(path)})`;
}

// ── Insights articles ────────────────────────────────────────────────────────
export function articleToMarkdown(slug) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  const body = articleContent[slug] ?? '';

  const parts = [
    `# ${article.title}`,
    `> ${article.excerpt}`,
    `_Published ${article.date} · ${article.category} · XGRC® Software_`,
    articleBodyToMarkdown(body),
    faqSection(articleFaqs[slug]),
    `---\n\nSource: ${SITE}/insights/${slug}`,
  ];
  return parts.filter(Boolean).join('\n\n') + '\n';
}

// ── Solutions ────────────────────────────────────────────────────────────────
export function solutionToMarkdown(slug) {
  const d = solutionDetails[slug];
  const s = solutions.find((x) => x.slug === slug);
  if (!d || !s) return null;

  const parts = [`# XGRC® ${d.name}`, `_${d.tag}_`];
  if (d.headline) parts.push(`**${d.headline}**`);
  if (d.lede) parts.push(d.lede);
  if (d.geo?.definition) parts.push(`## What it is\n\n${d.geo.definition}`);
  if (d.overview) parts.push(`## Overview\n\n${d.overview}`);
  if (d.geo?.usage) parts.push(`## When organisations use it\n\n${d.geo.usage}`);
  if (d.geo?.notThis) parts.push(`## What it is not\n\n${d.geo.notThis}`);

  if (d.challenges?.length) {
    const rows = d.challenges.map((c) => `- **${c.title}** — ${c.body}`).join('\n');
    parts.push(`## Challenges it addresses\n\n${rows}`);
  }
  if (d.moduleGroups?.length) {
    const rows = d.moduleGroups.map((g) => `- **${g.category}:** ${g.modules.join(', ')}`).join('\n');
    parts.push(`## Modules\n\n${rows}`);
  }
  if (d.standards?.length) {
    parts.push(`## Standards & frameworks\n\n${d.standards.map((x) => `- ${x}`).join('\n')}`);
  }
  const faq = faqSection(d.geo?.faqs);
  if (faq) parts.push(faq);

  const related = (d.related || [])
    .map((r) => solutions.find((x) => x.slug === r))
    .filter(Boolean)
    .map((x) => htmlLink(`/${x.slug}`, x.name));
  if (related.length) parts.push(`## Related solutions\n\n${related.map((l) => `- ${l}`).join('\n')}`);

  parts.push(`---\n\nSource: ${SITE}/${slug}`);
  return parts.filter(Boolean).join('\n\n') + '\n';
}

// ── Use cases ────────────────────────────────────────────────────────────────
export function useCaseToMarkdown(slug) {
  const e = useCaseRegistry.find((x) => x.slug === slug);
  if (!e) return null;

  const parts = [`# ${e.h1 || e.title}`];
  if (e.lede) parts.push(e.lede);
  if (e.frameworks?.length) {
    parts.push(`**Frameworks:** ${e.frameworks.join(', ')}`);
  }
  if (e.problems?.length) {
    const head = e.problemHeadline ? `## ${e.problemHeadline}` : '## The problem';
    const intro = e.problemIntro ? `${e.problemIntro}\n\n` : '';
    parts.push(`${head}\n\n${intro}${e.problems.map((p) => `- ${p}`).join('\n')}`);
  }
  if (e.approach?.length) {
    const head = e.approachHeadline ? `## ${e.approachHeadline}` : '## The approach';
    parts.push(`${head}\n\n${e.approach.map((p) => `- ${p}`).join('\n')}`);
  }
  if (e.howItWorks?.length) {
    parts.push(`## How it works\n\n${e.howItWorks.map((p) => `- ${p}`).join('\n')}`);
  }
  if (e.platformNote?.body) {
    const t = e.platformNote.title ? `**${e.platformNote.title}** — ` : '';
    parts.push(`## On the platform\n\n${t}${e.platformNote.body}`);
  }
  if (e.manual?.length && e.withXgrc?.length) {
    const rows = e.manual.map((m, i) => `| ${m} | ${e.withXgrc[i] ?? ''} |`).join('\n');
    const head = e.compareHeadline ? `## ${e.compareHeadline}` : '## Manual vs XGRC®';
    parts.push(`${head}\n\n| Manual approach | With XGRC® |\n| --- | --- |\n${rows}`);
  }
  if (e.scope?.length) {
    const head = e.scopeHeadline ? `## ${e.scopeHeadline}` : '## Scope';
    parts.push(`${head}\n\n${e.scope.map((p) => `- ${p}`).join('\n')}`);
  }
  const faq = faqSection(e.faqs);
  if (faq) parts.push(faq);

  if (e.relatedSolution) {
    const sol = solutions.find((x) => x.slug === e.relatedSolution);
    if (sol) parts.push(`## Related solution\n\n- ${htmlLink(`/${sol.slug}`, sol.name)}`);
  }

  parts.push(`---\n\nSource: ${SITE}/use-cases/${slug}`);
  return parts.filter(Boolean).join('\n\n') + '\n';
}
