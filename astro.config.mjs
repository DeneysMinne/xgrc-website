import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site, built with `astro build` and served from nginx (this VM),
// behind Cloudflare, at xgrcsoftware.com.
export default defineConfig({
  site: 'https://xgrcsoftware.com',
  output: 'static',
  integrations: [
    sitemap({
      // /login is intentionally indexable — it's the destination we want to
      // rank for branded "xgrc login" / "sheqx login" searches. /pix is a
      // retired product and stays out.
      filter: (page) => !page.includes('/pix'),
    }),
  ],
});
