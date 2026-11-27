# ETAT · oh-la-vache · legacy · phase 3 (QA) terminée

## Fait
- Audit (AUDIT.md, `.hallmark/before.txt`), deal/draw/scaffold/stamp (Atelier, draw 79bce8), comp c1 retenue (comp.md), DESIGN.md (Picks, approche, thème, composants).
- Contenu : `src/data/site.ts` + `carte.json` (226 lignes de carte, 5 groupes plus menus), 13 photos WebP dans `public/photos/`.
- Pages : `/` (hero Poster, horaires et adresse, présentation et terrasse, carte à onglets, salle en bande, photos accrochées, réservation) et 404, KywFooter sur les deux, noindex, mention maquette.
- Build OK (`dist/oh-la-vache/legacy/`), sloplint src : 0 FAIL réel (FAIL 34 faux positif, base.css porte `overflow-x: clip`).

## Reste (phases 2 et 3)
- Aucune vérification en navigateur de la page rendue (seules les comps ont été vues) : 375, 1280, 1920, débordements, hauteurs de bande.
- Phase 2 : nav mobile (liens masqués sous 60 rem), jour courant des horaires, un reveal, états des contrôles, trois questions de reproduction, sloplint --render et --kept.
- Phase 3 : Sweep, revues, DESIGN.md case 5, RAPPORT.md, fingerprint de l'entrée `.hallmark/log.json`.

## Décisions et hypothèses
- Shape Photographic et hero Poster au lieu de Bento Grid et Index (draw), justifiés dans DESIGN.md.
- Une seule route gardée (one-page) ; #event supprimé (vide), noté `dropped`.
- Horaires : lundi à jeudi 11:00 à 22:30, vendredi à dimanche 11:00 à 23:45 (donnees.json) ; vendredi et mardi à confirmer. Aucun slot `.fill`, aucun placeholder fictif.
- mailto de la société (`sprl-lacroix@hotmail.com`) gardé pour le câblage, à confirmer ; lien Facebook corrigé vers `restoohlavache`.
- Polices Sentient (Fontshare) et Hanken Grotesk (Google) par `<link>` : non vérifiées en rendu (repli serif en comp). Sans clé d'images, aucune photo générée, uniquement celles du client (qualité smartphone 2020).
- Lectures de référence Hallmark réduites par sobriété (SKILL.md, redesign.md, thème Atelier, macrostructure 08 lus ; layout, anatomy, craft, imagery, gates § 1-4, patterns survolés par leurs règles du Floor seulement).
- Avis, histoire, équipe, presse : absents des données, non inventés.

## Phase 2 (construction-2) : fait
- Nav : pilule flottante gardée ; sous 60 rem un `<button popovertarget>` ouvre un `<nav popover>` (liens, téléphone), l'icône se croise, Escape et clic sur un lien referment, passage en grand écran referme ; `--z-sticky-nav`, une seule couche fixe ; marque et liens à 44 px au tactile.
- Boutons : primaire plein unique (hero), nav en contour ; hover sous `(hover: hover)`, `:active`, `:disabled` (aucun bouton désactivé), `transition` listée.
- Horaires : ligne du jour (fuseau Bruxelles) en `aria-current="date"`, barre accent plus mention « Aujourd'hui ».
- Un reveal (`data-reveal`, sous `.js`) : plaque du hero au chargement, tirage de la terrasse et photos accrochées à l'entrée à l'écran (stagger 60 ms), état final sans script ni sous reduced motion. Carte : sans script, tous les panneaux visibles et onglets masqués ; avec script, onglets (flèches, Home, End), fondu du panneau 220 ms.
- Finitions : filet intérieur sur la plaque du hero (signature « tirage »), légende du hero lisible, `::selection` et `scrollbar-color` du pied, aspect de la photo Spritz en 3/4 sous 60 rem (elle faisait 750 px de haut à 375), titre du hero sans coupe dans « 7 jours sur 7 ».
- Hero review : sloplint `--render --stage hero` lancé, revue `self` (pas d'outil Agent), stamp dans comp.md ; comp reproduite (planche `.hallmark/shots/olv-p2-comp-vs-build.png`).
- Mesures : `scrollWidth = innerWidth` à 375, 768, 1280, 1920 ; aucune erreur console ; menu mobile testé (ouverture, clic, Escape) ; sans JS et reduced motion testés.
- Build OK (`dist/oh-la-vache/legacy/`), noindex et pied KYW présents sur `/` et 404.

## Reste (phase 3)
- sloplint `--render` sur le build complet (case 5), Sweep, revues, RAPPORT.md, fingerprint de l'entrée `.hallmark/log.json`.
- Captures complètes par l'agent « captures » (non faites ici) ; vérifier le menu mobile et le jour courant sur ses planches.

## Pièges
- sloplint FAIL 34 persiste en `src` et en `--url` (faux positif : `base.css` importé porte la règle) ; FAIL 50 sur un h1 avec `&nbsp;` contourné par un `<span class="nb">` nowrap.
- La barre sombre en bas des captures `--url` est la barre de dev d'Astro, pas du site.
- NOTE 58 de sloplint à 1440 (130 mots à y=2700) : zone carte et photos, non traitée.

## Phase 3 (QA) : fait
- Hero mobile recadré (photo en bloc sur l'enseigne), balises og/twitter ajoutées, build et index OK, RAPPORT.md écrit.
- Reste : sweep sloplint --render, finish review, checklist DESIGN.md, canonical/og:image à la mise en ligne.
