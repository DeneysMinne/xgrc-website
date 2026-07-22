// Emits /{slug}.md — a clean Markdown twin of each solution page (root-level
// slugs like /sheqx, /msx), generated from solutionDetails. See src/lib/markdown.js.
import { solutionDetails } from '../data/site.js';
import { solutionToMarkdown } from '../lib/markdown.js';

export function getStaticPaths() {
  return Object.keys(solutionDetails).map((slug) => ({ params: { slug } }));
}

export function GET({ params }) {
  const body = solutionToMarkdown(params.slug);
  if (!body) return new Response('Not found', { status: 404 });
  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
