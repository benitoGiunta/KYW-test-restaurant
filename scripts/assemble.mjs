#!/usr/bin/env node
// Reconstruit tous les sites et gabarits du workspace puis l'index. Usage : node scripts/assemble.mjs [--only sites|gabarits]
import { execSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
const racine = resolve(new URL('..', import.meta.url).pathname);
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
const groupes = only ? [only] : ['gabarits', 'sites'];
const echecs = [];
for (const g of groupes) {
  const d = join(racine, g);
  if (!existsSync(d)) continue;
  for (const nom of readdirSync(d).sort()) {
    if (nom.startsWith('_') || !existsSync(join(d, nom, 'astro.config.mjs'))) continue; // _socle et autres modèles ne se publient pas
    try { execSync(`node scripts/build-site.mjs ${g}/${nom}`, { stdio: 'inherit', cwd: racine }); }
    catch { echecs.push(`${g}/${nom}`); }
  }
}
execSync('node scripts/index.mjs', { stdio: 'inherit', cwd: racine });
if (echecs.length) { console.error('Échecs :', echecs.join(', ')); process.exit(1); }
