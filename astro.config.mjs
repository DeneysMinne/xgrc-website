import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sitemapLastmod from './src/integrations/sitemap-lastmod.mjs';

// Static site, built with `astro build` and served from nginx (this VM),
// behind Cloudflare, at xgrcsoftware.com.
export default defineConfig({
  site: 'https://xgrcsoftware.com',
  output: 'static',
  integrations: [
    sitemap({
      // Keep retired-product and preview URLs out of the sitemap. /preview
      // holds unlisted internal tools (also noindex); raw public/ files aren't
      // Astro routes, so this is defence in depth. /login/ is indexed and
      // listed since 2026-10-03: Bing showed ~7,400 impressions a year on
      // "sheqx log in" / "xgrc login" with almost no clicks, because the
      // login page was hidden and customers landed on the SHEQX sales page.
      filter: (page) => !page.includes('/pix') && !page.includes('/preview'),
    }),
    // Real lastmod dates (must come after sitemap)
    sitemapLastmod(),
  ],
});
