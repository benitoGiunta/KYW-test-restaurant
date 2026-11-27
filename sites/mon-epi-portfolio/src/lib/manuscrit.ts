// Conversion d'un texte en tracés SVG (Caveat) au moment du build : les lignes manuscrites du menu du jour sont
// « pré-exportées » dans le HTML, puis tracées par stroke-dashoffset côté client (src/motion/cahier.ts).
// Pas de crénage (fontkitten n'expose que les glyphes) : acceptable pour une écriture manuscrite.
import { create } from 'fontkitten';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const font = create(readFileSync(fileURLToPath(new URL('../../public/fonts/caveat-500-normal.woff2', import.meta.url))));
const UPM = font.unitsPerEm || 1000;

export interface Trace { d: string; transform: string }
export interface Manuscrit { paths: Trace[]; largeur: number; hauteur: number; baseline: number }

/** Texte → glyphes positionnés. `taille` en unités SVG (px du viewBox). */
export function manuscrit(texte: string, taille = 40): Manuscrit {
  const s = taille / UPM;
  const asc = (font.ascent ?? 960) * s;
  const desc = Math.abs(font.descent ?? -300) * s;
  const hauteur = Math.round(asc + desc);
  let x = 0;
  const paths: Trace[] = [];
  for (const ch of texte) {
    const cp = ch.codePointAt(0)!;
    const g = font.glyphForCodePoint(cp);
    const d = g.path?.toSVG?.() || '';
    if (d && ch !== ' ') paths.push({ d, transform: `translate(${x.toFixed(1)} ${asc.toFixed(1)}) scale(${s.toFixed(4)} ${(-s).toFixed(4)})` });
    x += (g.advanceWidth || UPM * 0.25) * s;
  }
  return { paths, largeur: Math.ceil(x), hauteur, baseline: asc };
}
