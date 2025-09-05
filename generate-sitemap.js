import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://xigiled.in' });

sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/products', changefreq: 'weekly', priority: 0.8 });
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.6 });
sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.5 });

sitemap.end();

streamToPromise(sitemap).then((data) => {
  createWriteStream('./public/sitemap.xml').write(data);
  console.log('✅ Sitemap generated successfully: public/sitemap.xml');
});
