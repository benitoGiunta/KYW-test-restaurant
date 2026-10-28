#!/usr/bin/env node
// Capture un site : HTML rendu, captures desktop (haut, 4 frames de défilement, pleine page) et mobile, liste des ressources.
// Usage : node scripts/capture-site.mjs <url> <dossier-sortie> [--frames 4] [--timeout 45000]
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const [url, out] = process.argv.slice(2);
if (!url || !out) { console.error('Usage : capture-site.mjs <url> <dossier>'); process.exit(1); }
const frames = Number(process.argv[process.argv.indexOf('--frames') + 1]) || 4;
const timeout = Number(process.argv[process.argv.indexOf('--timeout') + 1]) || 45000;
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const infos = { url, date: new Date().toISOString(), erreurs: [], requetes: 0, titre: '', description: '', technos: [], finalUrl: '' };
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'fr-BE', userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') infos.erreurs.push(m.text().slice(0, 200)); });
  page.on('request', () => infos.requetes++);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
  await page.waitForTimeout(3500);
  infos.finalUrl = page.url();
  infos.titre = await page.title();
  infos.description = await page.$eval('meta[name="description"]', (e) => e.content).catch(() => '');
  let html = await page.content();
  // Masque les jetons d'API embarqués dans les pages tierces (Mapbox, Google, Stripe…) avant écriture sur disque.
  html = html.replace(/\b(sk|pk)\.[A-Za-z0-9_-]{20,}\b/g, '[jeton-masque]').replace(/\bAIza[0-9A-Za-z_-]{30,}\b/g, '[jeton-masque]').replace(/\b(sk|pk)_(live|test)_[A-Za-z0-9]{10,}\b/g, '[jeton-masque]').replace(/\bgh[pousr]_[A-Za-z0-9]{30,}\b/g, '[jeton-masque]');
  writeFileSync(join(out, 'page.html'), html);
  for (const t of ['gsap', 'lenis', 'three', 'ogl', 'locomotive', 'framer', 'webflow', 'wix', 'squarespace', 'wordpress', 'elementor', 'shopify', 'next', 'nuxt', 'astro', 'react', 'vue', 'swiper', 'barba', 'spline', 'lottie', 'jquery', 'bootstrap', 'tailwind'])
    if (new RegExp(t, 'i').test(html)) infos.technos.push(t);
  await page.screenshot({ path: join(out, 'desktop-haut.png') });
  const hauteur = await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
  infos.hauteurPage = hauteur;
  for (let i = 1; i <= frames; i++) {
    const y = Math.round((hauteur - 900) * (i / (frames + 1)));
    await page.evaluate((y) => { document.scrollingElement.scrollTop = y; }, y); // scrollTop plutôt que window.scrollTo, que certains sites (jQuery scrollTo) écrasent
    await page.mouse.wheel(0, 1); await page.waitForTimeout(900);
    await page.screenshot({ path: join(out, `desktop-frame-${i}.png`) });
  }
  await page.evaluate(() => { document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight; }); await page.waitForTimeout(900);
  await page.screenshot({ path: join(out, 'desktop-bas.png') });
  await page.evaluate(() => { document.scrollingElement.scrollTop = 0; }); await page.waitForTimeout(600);
  await page.screenshot({ path: join(out, 'desktop-pleine-page.png'), fullPage: true }).catch(() => {});
  infos.liens = await page.$$eval('a[href]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))].slice(0, 80));
  infos.texte = (await page.evaluate(() => document.body.innerText)).replace(/\s+\n/g, '\n').slice(0, 20000);
  await ctx.close();
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-BE' });
  const pm = await mob.newPage();
  await pm.goto(url, { waitUntil: 'domcontentloaded', timeout }); await pm.waitForTimeout(3000);
  await pm.screenshot({ path: join(out, 'mobile-haut.png') });
  await pm.screenshot({ path: join(out, 'mobile-pleine-page.png'), fullPage: true }).catch(() => {});
  await mob.close();
} catch (e) { infos.erreurs.push('CAPTURE: ' + e.message.slice(0, 300)); }
await browser.close();
writeFileSync(join(out, 'infos.json'), JSON.stringify(infos, null, 1));
console.log(`✓ ${url} → ${out} (${infos.erreurs.length} erreurs, ${infos.requetes} requêtes, technos: ${infos.technos.join(',') || '-'})`);
