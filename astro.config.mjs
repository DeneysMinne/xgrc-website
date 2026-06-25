import { defineConfig } from 'astro/config';

// Static site. Vercel auto-detects Astro and runs `astro build`.
// Team preview deployments come for free on Vercel pull requests.
export default defineConfig({
  site: 'https://xgrcsoftware.com',
  output: 'static'
});
