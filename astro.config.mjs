import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site, built with `astro build` and served from nginx (this VM),
// behind Cloudflare, at xgrcsoftware.com.
export default defineConfig({
  site: 'https://xgrcsoftware.com',
  output: 'static',
  integrations: [
    sitemap({
      // Keep utility pages out of the sitemap — it should list content pages,
      // not login/retired-product/preview URLs. /login is still linked from
      // the nav + footer on every page, so Google discovers it without a
      // sitemap entry. /preview holds unlisted internal tools (not linked
      // anywhere, also carries its own noindex meta tag) — kept out here too
      // as defense in depth, though raw public/ files aren't Astro routes so
      // this filter likely never sees them anyway.
      filter: (page) => !page.includes('/login') && !page.includes('/pix') && !page.includes('/preview'),
    }),
  ],
});
