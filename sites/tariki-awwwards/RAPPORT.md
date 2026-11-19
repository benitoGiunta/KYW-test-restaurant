# Tariki : variante awwwards
**Concept** : « la route », un fil ocre tracé par le défilement relie Syrie, Liban, Turquie, Grèce, Namur ; un voyageur chemine dessus. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun besoin de GL), pas de loader. Base `/tariki/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/tariki-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Aucun score de critique : l'outil Agent n'est pas disponible dans cette session et le budget de la phase test ne prévoit qu'une passe. Auto-notation, non indépendante, estimée sans carte : Design et Usability environ 8, Creativity 8 (route portée par le scroll), Content 7,5 (peu de texte, pas de chef ni d'avis, par honnêteté). Aucune passe de critique neuf n'a eu lieu : critères 61 à 63 non prouvés.

## Mesures (captures de l'agent captures, plus la page réservation)
- Accueil : 0 erreur console, 0 requête échouée, axe 0, CLS 0, LCP mobile 2044 ms (texte), loaderMs null, settledMs 2494, idleMotion true, FPS 60 desktop / 58 mobile, overflow aucun, noHoverChange vide, réduit : hiddenText 0 et immobile.
- Carte : mêmes zéros ; LCP mobile 1936 ; idleMotion false (page de lecture, fil rempli par le défilement, immobilité assumée).
- Réservation (captée en phase 3) : 0 erreur, 0 échec, axe 0, LCP mobile 1824, overflow aucun, cibles petites 0 ; idleMotion false (même raison) ; `keyboard.stuck` true : faux positif connu du `type="date"` du formulaire.
- Audit final : 0 FAIL, 3 WARN. Poids : page la plus lourde environ 267 Ko, JS et CSS gzippés légers, aucune police ttf/otf.

## Corrigé en phase 3
- Accueil mobile : « Accompagnements » (index des étapes) débordait de 25 px sur son prix à 390 px. `.index__nom` plafonné à `6.9vw` sous 40rem ; mesuré `scrollWidth` = `clientWidth` à 390 et 360 (320 : 15 px de marge restante, hors cibles). Corrigé dans `src/styles/site.css`.

## Points non résolus
- [audit] WARN « sentence repeated 4x : 11 h 30 à 14 h » (accueil, réservation) : justifié, ce sont les 4 lignes du tableau d'horaires du mercredi au samedi (données réelles).
- [audit] WARN « no sitemap » : faux positif sous `base` ; `sitemap-index.xml` est dans `dist/tariki/awwwards/`. « no robots.txt » : justifié par le meta noindex.
- [axe] 404 : `.kyw-footer__note` en #6b787d sur #fbfaf8 (4,36:1) relevé sur la 404 brute de serve.mjs, c'est le paquet `kyw-footer`, non modifié ici ; à corriger dans le paquet (seuil 4,5).
- [clavier] 404 brute : lien « la page d'accueil » 128x20, `skipLinkFirst` false : faux positif de lecture (`stops[0]` est le lien d'évitement) ; la 404 réelle (`404.html`) n'a pas été re-photographiée.
- [contenu] « ş » de « turşu » hors du sous-ensemble des polices (repli système).
- [processus] Pas de critique jury indépendant ; carte jury non produite ; `og.png` non refaite (inchangée depuis la phase 1).
- [à juger] Écart CTA/route dans le héros à 1440x900 (environ 100 px), fil de la carte rempli par la page et non par rubrique.

## Placeholders et hypothèses (à remplacer par le client)
- Aucun complément `placeholder: true` : téléphone, e-mail info@tarikirestaurant.be, adresse Rue de l'Ouvrage 2, horaires, plats et prix viennent de `donnees.json`.
- Photo d'ambiance (couloir d'arcades) : illustration libellée « pas une photo du restaurant », à remplacer par les photos de Tariki.
- Carte du soir = page « La carte » ; « Le début du voyage » 18 € omis ; aucun avis, chef, date, citation.

## Décisions de théâtre
Pas de loader (LCP), pas de GL, repos : pointillés qui coulent et halo du voyageur sur l'accueil (verbe « cheminer »). Accessoire retiré : non fait faute de passe finale ; candidat, le halo du voyageur.

## Leçons structurelles
Voir `data/usage/test-1/lecons-proposees/tariki.md`.
