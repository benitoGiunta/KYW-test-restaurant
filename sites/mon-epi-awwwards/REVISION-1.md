# REVISION-1 · mon-epi awwwards (révision ciblée, passe 1)
Aucun F0 dans la revue. Build `pnpm build:site` OK.

| id | décision | changement | vérification |
|---|---|---|---|
| F1-1 | corrige | `index.astro` : « C'est le four de l'atelier Monepi, à Loyers, construit au début des années 2000. » | grep `dist/` : « depuis la reprise » absent |
| F1-2 | corrige | `site.ts` : rayon sans gluten `photo: null` (type nullable), `carte.astro` n'affiche la photo que si présente | aucune photo de seigle dans ce rayon |
| F1-3 | corrige | `site.ts` notes blé blanc (« Blé blanc, 800 g, à la levure ») et épeautre demi-gris (pur épeautre, épeautre et seigle) ; `index.astro` « La plupart des pains de la carte nomment l'une d'elles » | grep `dist/` : « pain de mie », « Chaque pain de la carte » absents |
| F2-1 | corrige | mention « selon les pages du site client » retirée de `site.ts` | grep `dist/` : 0 |
| F2-2 | corrige | `site.css` : fond d'en-tête `rgb(23 16 12 / .92)` jusqu'à 80 % | capture bureau : l'en-tête se masque au défilement (frame-away), fond renforcé non visuellement confirmé |
| F2-3 | corrige | `site.css` : `.lien` en inline-block, min-height et line-height 24 px | mesuré 24 px (OSM, Facebook) à 390 et 1440 px |
| F2-4 | corrige | le nom de Dirk Longin n'accompagne plus le portrait d'inconnu à l'accueil | texte vérifié |
| F2-5 | impossible | contraste non mesuré (budget) ; `--c-muted` documenté à 7,9:1 sur suie ; violation axe 404 non investiguée | - |
| F2 H1 | corrige | H1 « Monepi, pain au levain cuit au feu de bois » | grep `dist/` : « tamisé à 75 » absent |

Bilan : 8 corrigés, 0 refusé, 1 impossible (F2-5). F3 non traités. DESIGN.md inchangé.
