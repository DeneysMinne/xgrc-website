import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site, built with `astro build` and served from nginx (this VM),
// behind Cloudflare, at xgrcsoftware.com.
export default defineConfig({
  site: 'https://xgrcsoftware.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/login') && !page.includes('/pix'),
    }),
  ],
});
