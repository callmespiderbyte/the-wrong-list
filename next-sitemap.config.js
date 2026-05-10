/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://thewronglist.com',
  generateRobotsTxt: true,
  exclude: ['/share/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/share/'] },
    ],
    additionalSitemaps: ['https://thewronglist.com/sitemap.xml'],
  },
}
