// Writes per-route static HTML (own title/description/canonical/OG) + sitemap.xml into dist/ so crawlers and link previews see correct meta without running JS.
import fs from 'node:fs';
import path from 'node:path';

// Support Netlify auto-injected URLs or production domain
const SITE = (process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://virginiahomecraft.com').replace(/\/$/, '');
const B = 'Virginia HomeCraft';
const cfg = fs.readFileSync('src/config/siteConfig.ts', 'utf8');
const slugs = [...new Set([...cfg.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))];
const cap = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const routes = {
  '/': null,
  '/services': ['Home Remodeling Services in Arlington, VA', 'Kitchen, bathroom, painting, flooring and home improvement services in Arlington, VA and Northern Virginia.'],
  '/projects': ['Remodeling & Painting Projects in Arlington, VA', 'Browse kitchen, bathroom, painting and flooring projects completed in Arlington and Northern Virginia.'],
  '/about': ['About ' + B, 'Meet the team behind ' + B + ' and how we approach remodeling and renovation in Arlington, VA.'],
  '/contact': ['Contact & Free Quote', 'Request a free quote for remodeling, painting or flooring in Arlington, VA.'],
  '/privacy': ['Privacy Policy', 'Privacy policy for ' + B + '.'],
  '/terms': ['Terms of Service', 'Terms of service for ' + B + '.']
};

for (const s of slugs) {
  routes['/services/' + s] = [cap(s) + ' in Arlington, VA', cap(s) + ' by ' + B + ' in Arlington, VA and nearby Northern Virginia communities. Request a free quote.'];
}

const base = fs.readFileSync('dist/index.html', 'utf8');
const esc = (s) => s.replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);
let sm = '';

const ogImageUrl = `${SITE}/og-image.jpg`;

for (const [r, v] of Object.entries(routes)) {
  let h = base;
  const url = SITE + (r === '/' ? '/' : r);

  if (v) {
    const t = v[0] + ' | ' + B;
    const d = esc(v[1]);
    h = h
      .replace(/<title>.*?<\/title>/, '<title>' + t + '</title>')
      .replace(/(name="description" content=")[^"]*/, '$1' + d)
      .replace(/(property="og:title" content=")[^"]*/, '$1' + esc(t))
      .replace(/(property="og:description" content=")[^"]*/, '$1' + d)
      .replace(/(name="twitter:title" content=")[^"]*/, '$1' + esc(t))
      .replace(/(name="twitter:description" content=")[^"]*/, '$1' + d);
  }

  // Canonical & OG URLs
  h = h
    .replace(/(rel="canonical" href=")[^"]*/, '$1' + url)
    .replace(/(property="og:url" content=")[^"]*/, '$1' + url)
    .replace(/(property="og:image" content=")[^"]*/, '$1' + ogImageUrl)
    .replace(/(property="og:image:secure_url" content=")[^"]*/, '$1' + ogImageUrl)
    .replace(/(name="twitter:image" content=")[^"]*/, '$1' + ogImageUrl);

  if (r !== '/') {
    fs.mkdirSync(path.join('dist', r), { recursive: true });
    fs.writeFileSync(path.join('dist', r, 'index.html'), h);
  } else {
    fs.writeFileSync('dist/index.html', h);
  }

  sm += `  <url><loc>${url}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : r.startsWith('/services') ? '0.9' : '0.7'}</priority></url>\n`;
}

fs.writeFileSync(
  'dist/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sm + '</urlset>\n'
);
console.log('prerendered meta for', Object.keys(routes).length, 'routes with OG social cards');
