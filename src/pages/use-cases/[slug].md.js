// Emits /use-cases/{slug}.md — a clean Markdown twin of each use-case page,
// generated from useCaseRegistry. See src/lib/markdown.js.
import { useCaseRegistry } from '../../data/useCaseRegistry.js';
import { useCaseToMarkdown } from '../../lib/markdown.js';

export function getStaticPaths() {
  return useCaseRegistry.map((entry) => ({ params: { slug: entry.slug } }));
}

export function GET({ params }) {
  const body = useCaseToMarkdown(params.slug);
  if (!body) return new Response('Not found', { status: 404 });
  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
