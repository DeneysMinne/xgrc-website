// Emits /insights/{slug}.md — a clean Markdown twin of each insights article,
// generated from the same data as insights/[slug].astro. See src/lib/markdown.js.
import { articles } from '../../data/site.js';
import { articleToMarkdown } from '../../lib/markdown.js';

export function getStaticPaths() {
  return articles.map((a) => ({ params: { slug: a.slug } }));
}

export function GET({ params }) {
  const body = articleToMarkdown(params.slug);
  if (!body) return new Response('Not found', { status: 404 });
  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
