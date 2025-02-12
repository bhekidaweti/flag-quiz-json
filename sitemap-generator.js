const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');

// Create a sitemap stream
const sitemap = new SitemapStream({ hostname: 'https://funwithworldflags.com' });

// Create a writable stream to the sitemap.xml file
const writeStream = createWriteStream('./public/sitemap.xml');

// Pipe the sitemap to the output stream
sitemap.pipe(writeStream);

// Write URLs to the sitemap
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/quiz', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/flaglist', changefreq: 'weekly', priority: 0.6 });

// End the stream
sitemap.end();