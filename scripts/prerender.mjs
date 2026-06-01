// ─── Post-build prerender (SSG) ──────────────────────────────────────────────
// Boots `vite preview`, crawls every internal route with a headless browser,
// and writes the fully-rendered HTML (incl. meta/OG/JSON-LD from useSeo) to
// dist/<route>/index.html. Also emits sitemap.xml and rss.xml.
//
// Version-agnostic: runs the real built SPA, so it works regardless of the
// React / React-Router versions and requires no changes to the app code.

import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import puppeteer from 'puppeteer';

const PORT = 4188;
const ORIGIN = `http://localhost:${PORT}`;
const SITE = 'https://mescobari.iq.com.bo';
const DIST = 'dist';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(ORIGIN);
      if (res.ok) return;
    } catch {
      /* not ready yet */
    }
    await sleep(400);
  }
  throw new Error('vite preview did not become ready in time');
}

// Trigger IntersectionObserver-based reveal animations before snapshotting
async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 120));
  });
}

function outPathFor(route) {
  if (route === '/') return join(DIST, 'index.html');
  // Decode each segment so Apache (which decodes %xx before filesystem lookup)
  // serves /blog/tag/Smart%20Contracts from the "Smart Contracts" folder directly.
  const decoded = route
    .replace(/^\//, '')
    .split('/')
    .map((seg) => {
      try {
        return decodeURIComponent(seg);
      } catch {
        return seg;
      }
    })
    .join('/');
  return join(DIST, decoded, 'index.html');
}

async function run() {
  console.log('› Starting vite preview…');
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
    shell: true,
  });

  const articles = [];
  const rendered = [];
  let browser;

  try {
    await waitForServer();
    console.log('› Preview ready. Launching headless browser…');
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });

    const seen = new Set();
    const queue = ['/'];

    while (queue.length) {
      const route = queue.shift();
      if (seen.has(route)) continue;
      seen.add(route);

      await page.goto(ORIGIN + route, { waitUntil: 'networkidle0', timeout: 45000 });
      await autoScroll(page);
      await sleep(250); // let useSeo / head updates settle

      const html = await page.content();
      const out = outPathFor(route);
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, html, 'utf8');
      rendered.push(route);
      console.log(`  ✓ ${route}`);

      // Collect blog article metadata from JSON-LD (for RSS)
      if (/^\/blog\/[^/]+$/.test(route) && !route.startsWith('/blog/categoria') && !route.startsWith('/blog/tag')) {
        const ld = await page
          .$$eval('script[type="application/ld+json"]', (els) => els.map((e) => e.textContent || ''))
          .catch(() => []);
        for (const txt of ld) {
          try {
            const data = JSON.parse(txt);
            if (data['@type'] === 'Article') {
              articles.push({
                url: SITE + route,
                title: data.headline,
                description: data.description,
                date: data.datePublished,
              });
            }
          } catch {
            /* ignore */
          }
        }
      }

      // Discover internal links (BFS)
      const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') || ''));
      for (const href of links) {
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) continue;
        const path = href.split('#')[0].split('?')[0];
        if (path.startsWith('/') && !seen.has(path)) queue.push(path);
      }
    }

    // ─── sitemap.xml ─────────────────────────────────────────────────────────
    const sitemap =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      rendered
        .map((r) => `  <url><loc>${SITE}${r === '/' ? '/' : r}</loc></url>`)
        .join('\n') +
      `\n</urlset>\n`;
    await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8');
    console.log(`› sitemap.xml (${rendered.length} URLs)`);

    // ─── rss.xml ─────────────────────────────────────────────────────────────
    articles.sort((a, b) => (a.date < b.date ? 1 : -1));
    const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const rss =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<rss version="2.0"><channel>\n` +
      `  <title>Blog · Max Escobari</title>\n` +
      `  <link>${SITE}/blog</link>\n` +
      `  <description>Tecnología, arquitectura, IA y gestión de proyectos.</description>\n` +
      articles
        .map(
          (a) =>
            `  <item><title>${esc(a.title)}</title><link>${a.url}</link>` +
            `<guid>${a.url}</guid>` +
            (a.date ? `<pubDate>${new Date(a.date).toUTCString()}</pubDate>` : '') +
            `<description>${esc(a.description)}</description></item>`
        )
        .join('\n') +
      `\n</channel></rss>\n`;
    await writeFile(join(DIST, 'rss.xml'), rss, 'utf8');
    console.log(`› rss.xml (${articles.length} posts)`);

    console.log(`✓ Prerendered ${rendered.length} routes.`);
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
