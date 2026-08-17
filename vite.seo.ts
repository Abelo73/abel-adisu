import { writeFileSync } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { sitemapRoutes } from './src/content/sitemapRoutes.ts'

export function seoFilesPlugin(siteUrl?: string): Plugin {
  const origin = () => (siteUrl || process.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '')

  return {
    name: 'seo-files',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', origin())
    },
    closeBundle() {
      const site = origin()
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = sitemapRoutes
        .map(
          (route) => `  <url>
    <loc>${site}${route === '/' ? '/' : route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
        )
        .join('\n')
      writeFileSync(
        path.join(path.resolve('dist'), 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
      )
      writeFileSync(
        path.join(path.resolve('dist'), 'robots.txt'),
        `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`,
      )
    },
  }
}
