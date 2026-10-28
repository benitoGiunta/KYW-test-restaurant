#!/usr/bin/env node
// Construit un site Astro du workspace et place la sortie dans dist/<slug>/<variante>/ (ou dist/gabarits/<nom>/).
// Usage : node scripts/build-site.mjs sites/<slug>-<variante> | gabarits/<nom>
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';

const racine = resolve(new URL('..', import.meta.url).pathname);
const arg = process.argv[2];
if (!arg) { console.error('Usage : node scripts/build-site.mjs sites/<slug>-<variante> | gabarits/<nom>'); process.exit(1); }
const dossier = resolve(racine, arg);
if (!existsSync(join(dossier, 'astro.config.mjs'))) { console.error(`Pas de astro.config.mjs dans ${dossier}`); process.exit(1); }

const nom = basename(dossier);
let cible;
if (arg.startsWith('gabarits/')) cible = join('gabarits', nom);
else {
  const m = nom.match(/^(.*)-(portfolio|awwwards|legacy)$/);
  if (!m) { console.error('Le dossier doit se nommer <slug>-portfolio|awwwards|legacy'); process.exit(1); }
  cible = join(m[1], m[2]);
}
const base = `/${cible.replace(/\\/g, '/')}/`;

// Le logo KYW est copié dans public/kyw/ du site pour que le pied de page le trouve sous `base`.
mkdirSync(join(dossier, 'public', 'kyw'), { recursive: true });
for (const f of ['kyw-signature-720.webp', 'kyw-signature-720.png'])
  cpSync(join(racine, 'packages', 'kyw-footer', f), join(dossier, 'public', 'kyw', f));

console.log(`→ build ${arg} (base ${base})`);
execSync(`pnpm exec astro build --root "${dossier}"`, { stdio: 'inherit', cwd: racine, env: { ...process.env, KYW_BASE: base, KYW_SITE: 'https://kyw-test-restaurant.vercel.app' } });

const sortie = join(racine, 'dist', cible);
rmSync(sortie, { recursive: true, force: true });
mkdirSync(sortie, { recursive: true });
cpSync(join(dossier, 'dist'), sortie, { recursive: true });
// Garde-fou : chaque page doit porter noindex et le pied de page KYW.
const html = readFileSync(join(sortie, 'index.html'), 'utf8');
const manques = [];
if (!/name="robots" content="noindex/.test(html)) manques.push('meta robots noindex');
if (!/kyw-footer/.test(html)) manques.push('pied de page KYW');
if (manques.length) { console.error(`✗ ${arg} : manque ${manques.join(', ')}`); process.exit(2); }
console.log(`✓ ${arg} → dist/${cible}/`);
