#!/usr/bin/env node
// Découpe « à la main » la photo du plat signature en 4 couches détourées (fond, pièce, garniture, sauce)
// pour la scène de cuisson du gabarit Braise. Les masques sont des ellipses/cercles adoucis, dessinés en SVG
// à partir des coordonnées relevées sur la photo (pas de rendu 3D, pas de segmentation automatique).
// Usage : node gabarits/braise/scripts/couches.mjs <photo carrée> <dossier de sortie> [taille=1200]
// Pour adapter à un autre plat : relever les zones (assiette, pièce, garniture) et ajuster FORMES ci-dessous.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [src, out, tailleArg] = process.argv.slice(2);
if (!src || !out) { console.error('Usage : couches.mjs <photo> <dossier> [taille]'); process.exit(1); }
const T = Number(tailleArg) || 1200;
mkdirSync(out, { recursive: true });

// Formes en coordonnées de la photo source 1600 x 1600 (boeuf confit, assiette rouge, Les Potes au Feu).
const S = 1600;
const FORMES = {
  assiette: { cx: 792, cy: 762, r: 612 },
  puits: { cx: 790, cy: 785, r: 292 },
  piece: { cx: 880, cy: 775, rx: 150, ry: 205, rot: 8 },
  puree: { cx: 605, cy: 425, rx: 125, ry: 200, rot: -22 },
  garniture: { cx: 655, cy: 770, rx: 185, ry: 225, rot: 0 },
  pique: [[815, 1000], [850, 995], [975, 1345], [940, 1352]],
};
const ell = ({ cx, cy, rx, ry, rot }, fill = 'white') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="${fill}"/>`;
const cir = ({ cx, cy, r }, fill = 'white') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
const poly = (pts, fill = 'white') => `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${fill}"/>`;
const svg = (inner, blur = 5) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><defs><filter id="b"><feGaussianBlur stdDeviation="${blur}"/></filter></defs><rect width="100%" height="100%" fill="black"/><g filter="url(#b)">${inner}</g></svg>`);

async function couche(nom, masqueSvg, fondSvg, rapiecage) {
  // masque (luminance → alpha) appliqué à la photo ; fondSvg = peinture ajoutée sur la photo (puits vide de la couche 1) ;
  // rapiecage = masque SVG des zones à recouvrir par la photo retournée horizontalement (la purée et la pique qui
  // débordent sur le rebord sont remplacées par le rebord symétrique : l'assiette redevient « vide »).
  const base = sharp(src).resize(S, S);
  const masque = await sharp(masqueSvg).resize(S, S).greyscale().toBuffer();
  let img = base;
  if (rapiecage) {
    const m = await sharp(rapiecage).resize(S, S).greyscale().toBuffer();
    const miroir = await sharp(src).resize(S, S).flop().ensureAlpha().joinChannel(m).png().toBuffer();
    img = sharp(await base.composite([{ input: miroir, blend: 'over' }]).toBuffer());
  }
  if (fondSvg) img = sharp(await img.composite([{ input: fondSvg, blend: 'over' }]).toBuffer());
  const png = await img.ensureAlpha().joinChannel(masque).png().toBuffer();
  await sharp(png).resize(T, T).webp({ quality: 82, alphaQuality: 90 }).toFile(join(out, `${nom}.webp`));
  console.log(`✓ ${nom}.webp`);
}

const { assiette, puits, piece, puree, garniture, pique } = FORMES;
// 1. Fond : l'assiette entière, le puits repeint en jus sombre (l'assiette « vide » avant le dressage).
const puitsVide = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><defs><radialGradient id="g" cx="48%" cy="46%" r="60%"><stop offset="0" stop-color="#3a1a10"/><stop offset="0.7" stop-color="#2a120c"/><stop offset="1" stop-color="#1b0a06"/></radialGradient></defs>${cir({ ...puits, r: puits.r + 4 }, 'url(#g)')}</svg>`);
await couche('fond', svg(cir(assiette), 3), puitsVide, svg(ell({ ...puree, rx: puree.rx + 25, ry: puree.ry + 25 }) + poly([[798, 1000], [864, 995], [992, 1345], [924, 1358]]) + ell({ cx: 548, cy: 600, rx: 55, ry: 50, rot: 0 }), 8));
// 2. Pièce : le boeuf confit.
await couche('piece', svg(ell(piece), 6));
// 3. Garniture : purée de carotte, carottes, chou, cromesquis.
await couche('garniture', svg(ell(puree) + ell(garniture), 6));
// 4. Sauce : le jus du puits et la pique, sans la pièce ni la garniture.
await couche('sauce', svg(cir(puits) + poly(pique) + ell(piece, 'black') + ell(puree, 'black') + ell(garniture, 'black'), 6));
