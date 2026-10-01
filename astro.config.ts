import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  // Keep the previous HTML-aware whitespace behaviour: JSX-style compression
  // strips the space between inline elements (e.g. `<span>a</span> <em>b</em>`).
  compressHTML: true,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  markdown: {
    // Plain monospace blocks styled by the design system. No Shiki payload,
    // no hard-coded theme colours inside the prose.
    syntaxHighlight: false,
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
