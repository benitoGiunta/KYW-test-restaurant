# Révision 1 · gabarit « comptoir » · Les Potes au Feu

Traite `REVUE-1.md` (A_CORRIGER, aucun F0). Build `node scripts/build-site.mjs gabarits/comptoir` OK. Captures
`.shots-comptoir-rev/<page>` (index, histoire, carte, menu, reservation ; port 4428, en série, 5 × exit 0), planches
`.shots-comptoir-rev/planche-*.png`, contrôle Playwright 390 et 1440 px (scrollWidth, éléments cachés après défilement,
console). La 404 n'est pas recapturée (seuls l'en-tête mobile et le pied de page, communs, y changent).

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F1-1 services 4/6 | corrige | `site.ts` : `menus[0].services = 4`, `horsService` sur Mises en bouche et Mignardise, helpers `nbServices()` et `numeroService()` ; `index.astro`, `menu.astro` ne lisent plus `length` ; lead du menu « 4 services, 67 €, mises en bouche et mignardise comprises » ; dressage « Au menu dégustation, entre la Saint-Jacques et le soufflé » (plus de « Quatrième service ») | dist : « 4 services » sur index, menu, carte, aucun « 6 services » ; numéros `·, I, II, III, IV, ·` (planche-menu-resa d-01/m-01, m-02 « III Bœuf confit ») |
| F1-2 données datées | corrige | `site.ts` : « Il y a quatorze ans » → « Dès leurs débuts » ; distinction : texte « Restaurant sélectionné par le Guide MICHELIN », source « Guide MICHELIN Belgique 2026 » (plus de « fiche consultée le ») | grep dist : 0 « quatorze », 0 « consultée » ; planche-index m-05 (bande) |
| F1-3 faux avis nommés, e-mail mailto | corrige | `site.ts` : avis 2 et 3 sans auteur, sans source, sans note ; `histoire.astro` : étiquette « Exemple d'avis, texte illustratif » en capitales avant la citation, pas de `<cite>` pour un exemple ; `Footer.astro` : l'e-mail n'est affiché que s'il est prouvé (jamais de `mailto:` illustratif) | grep dist : 0 « Claire », « Thomas V », « Avis Google », « mailto: », « bonjour@ » ; planche-histoire m-03 |
| F2-1 détails non prouvés | corrige | « Fait maison, tous les jours » → « Fait maison » ; bon cadeau : « Demande sur le site du restaurant » (plus « par téléphone ») ; titre équipe « Quatre au service » → « Autour des chefs » | grep dist 0 occurrence ; planche-menu-resa m-04 |
| F2-2 photos des formules midi | corrige | `carte.astro` : midi = photos de cuisine et de service (dressage, sauce à table) en cadre plein ; l'assiette détourée reste au seul menu du soir | planche-carte d-02 à d-04, m-02 à m-04 |
| F2-3 en-tête mobile | corrige | `base.css` (bloc Révision 1) : marque sur une ligne, nav en une barre de 4 liens sans retour ; marque à 24 px de haut (cible) | Playwright 390 px : 4 liens au même `top` sur les 5 pages, marque 131×24 ; m-01 de chaque planche |
| F2-4 LCP mobile histoire | corrige | `histoire.astro` : `<picture>` 800 px en mobile, `data-reveal` retiré de la photo au-dessus de la ligne de flottaison ; `Base.astro` : prop `preloadImage` (préchargement `media` mobile) | LCP mobile histoire 2 650 → 1 136 ms (report.json) ; carte 2 600 ms inchangé (assiette 900 px, à la limite) |
| F2-5 mouvement au repos | corrige (décision) | idle maintenu à « aucun », décision écrite dans `DESIGN.md` ; ajout : le composant mis en avant depuis la liste du dressage grossit de 4 % (`base.css`) | `reduced.moving: false` sur 5 pages ; DESIGN.md « Décisions de la révision 1 » |
| F2-6 légendes = alt | corrige | `site.ts` : `legendes` courtes par photo ; galerie `histoire.astro` les utilise ; avis Michelin : « Guide MICHELIN Belgique 2026, avis d'inspecteur » (plus de doublon) | planche-histoire m-03 à m-05 (« L'équipe », « En salle », « La salle ») |
| F3 heures | corrige | `heure()` dans `site.ts` (« 19 h à 21 h ») ; textes de `reservation.astro` | grep dist : « 19:00 » seulement dans le JSON-LD (format schema.org) |
| F3 Bœuf | corrige | ligature dans les textes de `site.ts` et des pages, chemins `*boeuf*.webp` inchangés | captures : « Bœuf confit » ; 0 image en échec |
| F3 champ date | corrige | `lang="fr-BE"` + aide visible « jj/mm/aaaa » (`aria-describedby`) | planche-menu-resa m-02 (le sélecteur natif reste dans la locale du navigateur) |
| F3 lien actif sans survol | refuse | l'état actif (trait céladon permanent) est l'état ; un survol sur la page courante n'a rien à annoncer | — |
| F3 skipLinkFirst, contrastNeedsReview, robots/sitemap | refuse | faux négatifs connus de l'outil sous `base` (lecons.md) | — |

Bilan : 13 corrigés, 2 refusés (F3, faux positifs ou état voulu), 0 impossible. `apercu.png` non régénéré : le haut de
l'accueil desktop est inchangé (planche-index d-01).
