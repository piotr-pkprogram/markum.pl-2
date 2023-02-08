/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://marcinkumiszczo.pl/',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/polityka-prywatnosci'],
  changefreq: 'weekly'
};
