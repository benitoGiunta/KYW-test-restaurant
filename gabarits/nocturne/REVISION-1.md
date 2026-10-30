# Révision 1 · gabarit nocturne · Les Potes au Feu

Source : `REVUE-1.md`. Vérité : `data/restaurants/les-potes-au-feu/donnees.json` et `dossier.md`.
Build : `node scripts/build-site.mjs gabarits/nocturne` OK. Contrôles : mini-script Playwright (scratchpad
`test-nocturne.mjs`, `launch()` de browser.mjs) : badge à 12 instants (`page.clock.install`, `timezoneId: Europe/Brussels`),
formulaire à 7 cas, 7 pages × 390/1440 (hero, h1, `scrollWidth`, éléments révélés encore cachés après défilement,
console) ; captures `.shots-nocturne-rev/<page>/` lues en planche (`.shots-nocturne-rev/planche-*.png`).

Bilan : 17 corrigés, 3 refusés, 0 impossible.

| Finding | Décision | Changement (fichier) | Preuve |
| --- | --- | --- | --- |
| F1-1 badge ouvert 30 min trop tôt | corrigé | `src/motion/setup.ts` : `statutTexte()` pure, « ouvert » seulement de l'ouverture à la dernière arrivée incluse, heure de Bruxelles par `Intl.DateTimeFormat` | lun 18:45 « Fermé pour l'instant, ouverture ce soir à 19h » ; lun 19:00 et 21:00 « Ouvert ce soir, dernières arrivées à 21h » ; lun 21:01 « Fermé, prochain service demain soir à 19h » |
| F1-2 formulaire sans midi | corrigé | `src/pages/reservation.astro` : plus de `min`/`max`, contrôle par jour et par créneau (`setCustomValidity`), créneaux du jour affichés sous le champ, phrase midi/soir sous le titre | mer 12:30 et ven 13:45 valides ; lun 19:30 et 21:00 valides ; lun 12:30, mar 22:00 refusés ; sam refusé (« fermé le samedi ») |
| F1-3 avis fabriqués | corrigé | `src/data/site.ts` : avis « Claire D. » et « Thomas V. » (« Avis Google ») supprimés ; `histoire.astro` : section « Le guide en dit », seul l'extrait MICHELIN réel | `grep` dist : 0 « Avis Google », 0 « Claire » |
| F2-1 formulations du badge | corrigé | `statutTexte()` : « ce midi / ce soir », « Fermé aujourd'hui » les jours sans service, 21h inclus (heure d'arrivée) | mer 10:00 « ouverture ce midi à 12h » ; mer 15:00 « ouverture ce soir à 19h » ; sam 12:00 « Fermé aujourd'hui, prochain service lundi soir à 19h » ; jeu 22:00 « demain midi à 12h » ; dim 20:00 « demain soir » ; ven 23:30 « lundi soir » |
| F2-2 « il y a quatorze ans » | corrigé | `site.ts` : `originStory[0]` « Tout commence à la Plage d'Amée… », `histoire[0]` « Au départ, … » | `grep quatorze` dist : 0 |
| F2-2 bis millésime MICHELIN 2026 | refusé | — | c'est la source exacte de la citation (`extraits_avis[0].source`) ; une citation sans édition serait moins vérifiable |
| F2-3 « repas entre amis », « on adapte » | corrigé | `site.ts` : soirée « mariage, événement. » ; règle « Allergies et intolérances : à signaler lors de la réservation. » (texte du dossier) | `grep` dist : 0 |
| F2-4 catégorie Boissons | corrigé | `site.ts` : catégorie retirée de `carte` ; les exemples de boissons vivent seulement sur la page Cocktails | carte : Menu + Options seulement |
| F2-5 blocs gris Sara et Jordan | corrigé | `histoire.astro` + `base.css` : initiale en tube dans un cadre filet ; vignettes carrées, 2 colonnes en mobile | planche histoire |
| F2-6 hero des sous-pages à moitié vide | corrigé | `base.css` : cause réelle, la règle mobile `.hero { min-height: 100svh }` écrasait `.hero--page { min-height: 0 }` ; desktop : titre et chapô côte à côte, section suivante à 3 unités | bas du hero mobile 844 → 278 à 410 px ; desktop 286 à 452 px ; premier contenu visible dès l'arrivée (carte : « Les formules » à 329 px en 390) |
| F2-7 e-mail illustratif en mailto | corrigé | `site.ts` : `email.valeur` vide (aucune adresse publique, `donnees.json` email null) ; `Footer.astro` et `soirees.astro` n'affichent le lien que si une adresse existe ; bouton « Écrire » remplacé par « Réserver en ligne » (Zenchef) | `grep mailto` dist : 0 |
| F2-8 portrait d'origine trop sombre | corrigé | `index.astro` : photo des deux chefs au dressage (luminance moyenne 96 contre 35) ; `base.css` : filtre N&B adouci | planche index (scène origin) |
| F3-1 « oeuf » | corrigé | `site.ts` : « blanc d'œuf » (cocktail) ; « Boeuf confit » gardé tel que le client l'écrit | — |
| F3-2 « pommes de terre » pour « pdt » | refusé | — | développement fidèle de l'abréviation, accepté par la revue |
| F3-3 libellé YouTube | corrigé | `site.ts` : « Vidéo YouTube » | pied de page |
| F3-4 formules 3 + 1 | corrigé | `base.css` : `.menus` en 2 × 2 dès 768 px | planche carte |
| F3-5 volet gauche flou | refusé | — | photo du bar (cocktails rouges) au cœur du concept (`DESIGN.md`, métaphore) ; seule source en 1140 px : demander l'original HD au client |
| F3-6 bouton « Continuer sur Zenchef » | corrigé | `reservation.astro` : « Ouvrir Zenchef » + phrase « rien n'est envoyé, le bouton ouvre Zenchef où vous choisissez votre table » | — |
| F3-7 contraste du pied KYW | refusé (hors périmètre) | — | composant commun `packages/kyw-footer`, 0 violation axe ; à traiter dans le composant pour tous les sites |
| F3-8 h1 des sous-pages mobiles | corrigé | `base.css` : `clamp(2.1rem, 10vw, 2.6rem)` → 39 px, `right` ≤ 374 px, `scrollWidth` 390 sur 7 pages | mesure Playwright |

Non-régression : 0 erreur console (390 et 1440), `scrollWidth` 390/1440 sur les 7 pages, 0 élément `[data-reveal]`,
`.membre`, `.avis` resté caché après défilement complet.
