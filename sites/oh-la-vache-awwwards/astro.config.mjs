import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// `site` et `base` sont injectés par scripts/build-site.mjs (KYW_SITE, KYW_BASE) : ne pas les figer ici.
export default defineConfig({
  site: process.env.KYW_SITE || 'https://kyw-test-restaurant.vercel.app',
  base: process.env.KYW_BASE || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
