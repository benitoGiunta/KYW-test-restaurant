import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('CONSOLE', m.type(), m.text()); });
p.on('pageerror', (e) => console.log('PAGEERROR', e.message, e.stack?.split('\n').slice(0,3).join(' | ')));
await p.goto(process.argv[2], { waitUntil: 'networkidle' });
await p.waitForTimeout(3500);
console.log('loader hidden:', await p.evaluate(() => document.getElementById('loader')?.hidden), 'html class:', await p.evaluate(() => document.documentElement.className));
console.log('bg var:', await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-bg')));
await b.close();
