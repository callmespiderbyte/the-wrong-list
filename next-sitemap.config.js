/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://thewronglist.com',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: ['https://thewronglist.com/sitemap.xml'],
  },
}
