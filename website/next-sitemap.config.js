/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.zuuz.ai',
  generateRobotsTxt: false,
  exclude: ['/api/*', '/app/*'],
  changefreq: 'monthly',
  priority: 0.7,
  transform: async (config, path) => {
    // Homepage — highest priority
    if (path === '/') return { loc: path, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() }
    // Core product and solution pages
    if (path.startsWith('/products/') || path.startsWith('/solutions/')) return { loc: path, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() }
    // Blog and resources
    if (path.startsWith('/resources/')) return { loc: path, changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() }
    // Default
    return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() }
  },
}
