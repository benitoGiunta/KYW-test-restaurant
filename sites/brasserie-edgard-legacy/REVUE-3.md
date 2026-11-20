# Revue legacy · Brasserie Edgard · passe 3
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie de quartier présentée par sa façade de nuit sur fond crème, carte à prix en serif et bloc de réservation répété en pied de page ; propre, sobre, peu mémorable (inchangé depuis la passe 2).

Scores /10 :
- Design 6 : inchangé, hiérarchie calme, palette crème et brun (`d-01-hero.png`, `p-mob.png`).
- Usabilité 7 : 0 débordement (scrollWidth = fenêtre) sur 7 pages x 1440/390/320 px, skip link au focus (`k-01-focus.png`), un `h1` par page, menu et boutons lisibles à 390 px.
- Créativité 5 : le bandeau « À très vite, Chaussée de Waterloo. » ouvre toujours le pied de chaque page (`d-07-scroll.png`, F3-4).
- Contenu 7 : 0 « NaN », 0 prix à point décimal sur 7 pages x 3 largeurs, « 11,50 € / 12,50 € » rendu, faits conformes à donnees.json (téléphone, e-mail, Barestho, Facebook, Tripadvisor).
- Technique 8 : build OK (`.logs/brasserie-edgard-legacy-revue3-build.log`, 7 pages), axe complet 0 violation sur 20 vues, 0 erreur console, 0 requête en échec, 0 image cassée, 0 alt manquant ; LCP mobile 1,9 s, CLS 0,018 (`.shots-brasserie-edgard-legacy-revue3/summary.json`).

Méthode : `QA-revue3.md` n'existe pas ; le `summary.json` du QA couvre l'accueil seulement (`la-carte` et la 404 en `shootFailed`, navigateur fermé). `dist` (22:05) postérieur à `REVISION-2.md` (22:04), `src/` plus ancien que `REVISION-2.md` (`find -newer` vide), donc dist à jour. Captures d'accueil du QA lues par planche (`p-desk.png`). Script maison `rev3-mesure.mjs` : axe-core complet (node_modules), console, requêtes, débordement, cibles < 24 px, images, balises, textes ; 7 pages dont `404.html` réel x 1440/390/320 px (20 vues sorties, la 21e `404.html` à 1440 px au-dessus des 20 dernières lignes du journal, journal complet `.logs/rev3-mesure.log`) ; planche mobile `p-mob.png` (accueil, carte, contact à 390 px). Liens internes testés en HTTP : 7 pages et le logo en 200. Sloplint non relancé (CSS inchangé depuis la passe 2).

## Vérification des corrections annoncées par REVISION-2
- F1-1b prix texte brut : confirmé. `grep -c '11\.50'` sur `la-carte/index.html` = 0 ; rendu « Sabayon minute au Marsala, avec ou sans glace — 11,50 € / 12,50 € » (classe `portion`) ; mesure : 0 prix à point décimal dans le texte visible des 7 pages. L'ordre glace / sans glace n'est pas inféré : acceptable.
- F2-2b région `.close` : confirmé. `<section class="close" aria-label="Coordonnées et liens">` sur 7 pages sur 7, `role="group"` absent, axe : 0 violation sur toutes les vues mesurées (1440, 390, 320 px).
- F3-1, F3-2 à F3-5 : non traités (annoncé), état inchangé, voir ci-dessous.

## Findings (aucun F0, F1 ni F2)
**F3-1 · Typographie · guillemets orphelins.** Les guillemets « » sont séparés du texte par une espace sécable dans le dist (accueil 2, la carte 10, menu groupe 2 occurrences, ex. « Épaule de porcelet rôtie « Porketto » », « Jules « César » », « Commandant « Cousteau » »). Correction : U+00A0 après « et avant ».
**F3-2 · Polices externes** (Fontshare, Google Fonts) : requêtes tierces, sans impact mesuré (LCP 1,9 s).
**F3-3 · Survol** : `noHoverChange` = 2 cibles sans changement visible (`summary.json`).
**F3-4 · Bandeau de pied répété** « À très vite, Chaussée de Waterloo. » sur les 7 pages.
**F3-5 · Prix** : mélange possible de prix entiers et à deux décimales (« 15 € » / « 25,60 € »), non revérifié ; aligner le format.
**F3-6 · SEO 404** : `404.html` déclare `canonical` = `…/legacy/404/` ; retirer la canonique ou la laisser vide (noindex déjà présent, sans effet).

Vérifié sans écart : mention « Maquette KYW, certaines données sont illustratives », 1 logo KYW et `meta robots noindex` sur 7 pages ; `h1` unique, JSON-LD `Restaurant` sur 7 pages, `<title>` uniques ; adresse, téléphone, e-mail et liens externes conformes à donnees.json.
Non mesuré : contraste détaillé nœud par nœud (axe 0 violation `color-contrast` en motion réduite, après 2,5 s de repos).

## Ce qui est bien (à ne pas casser)
1. Les lignes à deux portions alignées à droite, sans débordement à 320 ni 390 px.
2. Le JSON-LD complet et sans avis inventé.
3. La façade en hero et le pied structuré en région nommée, accessibles au clavier (skip link visible).
