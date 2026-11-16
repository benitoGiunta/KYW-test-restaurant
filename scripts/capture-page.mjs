// Capture légère d'une page (approche 4) : 4 vues desktop (1440×900) et 4 vues mobile (390×844) à des hauteurs
// de défilement réparties, après chargement et animations d'entrée. Remplace shoot.mjs pour la couverture de revue.
// Usage : node scripts/capture-page.mjs <url> <dossier>   → <dossier>/d-01..04.png, m-01..04.png
import fs from 'node:fs';
import { launch } from '../.claude/skills/awwwards/scripts/browser.mjs';
const [url, out] = process.argv.slice(2);
if (!url || !out) { console.error('usage : node scripts/capture-page.mjs <url> <dossier>'); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
const browser = await launch();
try {
  for (const [pre, w, h, mobile] of [['d', 1440, 900, false], ['m', 390, 844, true]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(1500);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    // défilement progressif pour déclencher les apparitions au scroll
    for (let y = 0; y < total; y += h) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(150); }
    const n = 4, pas = Math.max(0, total - h) / (n - 1);
    for (let i = 0; i < n; i++) {
      await page.evaluate((v) => window.scrollTo(0, v), Math.round(pas * i));
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${out}/${pre}-0${i + 1}.png` });
    }
    await page.close();
  }
} finally { await browser.close(); }
