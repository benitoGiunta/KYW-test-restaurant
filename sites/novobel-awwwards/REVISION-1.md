# Révision 1 · Novobel awwwards (ciblée F1, F2)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `src/engine/reveal.ts` : `aria: 'none'` pour les éléments hors h1-h6 | axe complet 5 pages × 1440/390 : 0 violation |
| F1-2 | corrigé | `data/site.ts` (4 services du dossier, textes neutres), `index.astro` (« Quatre services », « Ce que fait Novobel »), `a-propos.astro` (valeurs reformulées, plus d'engagement de délais, « offres à consulter »), `contact.astro` (liste de conseils supprimée, chapo reformulé) | grep source : plus de « un seul interlocuteur », « coup de masse », « cadrer » |
| F2-1 | corrigé | `Footer.astro` : `<footer class="pied">` devient `<section aria-label>` (leçon : un div ferait apparaître `region`) | axe : 0 violation, `landmark-no-duplicate-contentinfo` disparu |
| F2-2 | corrigé | `site.css` : image à 0,4, `.plein__note` en `--c-bg` | capture `.shots-novobel-awwwards-rev/plein.png` lisible |
| F2-3 | corrigé | `contact.astro` : chapo « Téléphone ou e-mail : … », titre « Écrire à Novobel » ; formulaire mailto conservé avec sa note | lecture source |
| F2-4 | corrigé | `site.ts` + `index.astro` + `projets.astro` (« 5 » en dur retiré) | grep « Cinq lots » absent |

F3 traités au passage : F3-1 légendes « Image d'illustration » sur /projets/ ; F3-2 `.paire__b` aligné colonne droite ; F3-3 en-tête opaque ; F3-4 marge 1,5 rem sur actions 404 (écart mesuré 24 px).
Régression évitée : un libellé de cote trop long débordait l'accueil à 390 px (419 px), raccourci en « Quatre services » : scrollWidth 390.
Build OK (`scripts/q.sh`). Hypothèse : textes de services volontairement minimaux, `placeholder: true` conservé.
Publiable : oui.
