// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Set SITE_URL env var at build time for correct OG link previews.
  // Default: http://localhost:629 for local dev/testing.
  site: process.env.SITE_URL || 'http://localhost:629',
  integrations: [tailwind()],
});
