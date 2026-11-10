# Révision 1 · Sanga portfolio

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 plan fictif | corrigé | `Plan.astro` : 5 rectangles supprimés, ne restent la rue et le point ; cadrage resserré ; légende de rue 9 à 13 px (`base.css`) | capture ciblée de `/commander/` : rue, point, nom, légende ; plus de rectangles (`plan__trait` : 1 tracé par page) |
| F1-2 espaces insécables | corrigé | `site.ts`, `carte/commander/maison/index.astro`, `Plan.astro` : U+00A0 avant « € », « : », « ! », et dans « » | `dist/` : 0 « chiffre + espace + € », 0 espace simple avant « : ! ? » dans le texte, 78 U+00A0 |
| F2-1 rouleau vide | corrigé | `Rouleau.astro`, `base.css` : grand numéro en contour (`.plat__grand`) pour les plats sans photo | build OK ; non recapturé (rendu du rouleau non vérifié à l'œil) |
| F2-2 mêmes photos | corrigé en partie | `Footer.astro` : pied avec edamame + gyoza au lieu de chashu + teriyaki | grep source ; reste des recoupements gyoza/edamame ailleurs |
| F2-3 photos de stock | refusé | aucun changement | pas de source plus sûre au dossier ; reste à signaler au client |
| F2-4 répétitions | corrigé | `index.astro`, `maison.astro` (phrase « cinq ramen… », « premier restaurant… », « Chacun se choisit… », méta de la maison) | relecture des sources |
| F2-5 chapeaux numérotés | corrigé | 13 chapeaux retirés des pages (404 et compteur du rouleau gardés) ; cartes égales non refaites | `dist/` : 0 `class="chapeau"` sur carte, maison, commander |
| F2-6 hero terne | corrigé | `base.css` `.hero__voile` : dégradé haut/bas + ellipse centrée | capture du hero 1440 : bols plus colorés, texte lisible |
| F2-7 nav sur photos claires | corrigé | `base.css` `.header` : text-shadow (désactivé sur la 404) | non recapturé en 390 |
| F2-8 contentinfo | corrigé | `Footer.astro` : `<section aria-label="Contact et horaires">` | axe 0 violation, 4 pages × 1440/390 ; 0 `scrollWidth` > largeur |
| F3-3 | corrigé | `index.astro` : « dans les codes postaux listés sur la page Commander » | grep |

Hypothèses : F3 non traités sauf F3-3. Les « trois cartes égales » de `/maison/` restent. DESIGN.md inchangé.
