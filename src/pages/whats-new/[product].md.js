// Emits /whats-new/{product}.md -- a clean Markdown twin, generated from the
// same whatsNew.js data as [product].astro. See src/lib/markdown.js.
import { whatsNew } from '../../data/whatsNew.js';
import { whatsNewToMarkdown } from '../../lib/markdown.js';

export function getStaticPaths() {
  return Object.keys(whatsNew)
    .filter((key) => whatsNew[key].length > 0)
    .map((key) => ({ params: { product: key } }));
}

export function GET({ params }) {
  const body = whatsNewToMarkdown(params.product);
  if (!body) return new Response('Not found', { status: 404 });
  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
