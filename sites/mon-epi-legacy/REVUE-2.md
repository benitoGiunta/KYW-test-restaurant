# Revue legacy · Monepi Boulangerie (mon-epi) · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : une vitrine de boulangerie en « registre de prix » (Yeseva One, lignes à points de conduite, papier crème et brun) qui met le four à bois en vedette et présente le pain comme une carte chiffrée ; inchangée depuis la passe 1.

Scores /10 :
- Design 7,5 : hero index-carte + photo du four toujours au premier écran (`home/d-01-hero.png`), photos 03 et 20 désormais servies en 1280 px (45 Ko et 38 Ko) ; la galerie garde ses rangées inégales (`mon-epi-p2-gal-1440.png`).
- Usabilité 8 : 6 pages x 3 largeurs (1440, 390, 1920) sans débordement, 0 cible < 24 px, 135 liens internes du dist, 0 mort, aucun lien hors du préfixe `/mon-epi/legacy/`.
- Créativité 6,5 : inchangée (index-carte réussi, reste attendu).
- Contenu 8 : titre de pied « Venir à Loyers. » conforme au dossier (autres jours à confirmer), frise « 1980 : boulanger-pâtissier, chocolatier et glacier de formation » conforme à `dossier.md:16`, aucune invention ajoutée (diff `src/pages` limité à cette ligne).
- Technique 9 : 0 erreur console et 0 requête en échec sur 18 cas, axe complet 0 violation sauf `image-redundant-alt` minor (galerie), CLS mobile 0,000 en 2 passes (CPU x4 + 4G lente) sur accueil et à-propos, LCP 692-716 ms (accueil) et 1012-1028 ms (à-propos), contraste canvas 0 nœud sous seuil sur 327 nœuds (accueil, produits, contact, à-propos).

## Vérification des corrections annoncées (REVISION-1)
- F1-1 label-content-name-mismatch : CONFIRMÉ. `Header.astro` sans `aria-label` ; axe complet 0 sur 6 pages à 1440, 390 et 1920.
- F1-2 favicon : CONFIRMÉ. `public/favicon.svg` (« M » Georgia), `<link rel="icon">` sur 6 pages, 0 erreur console avec un contexte neuf par cas, `dist/mon-epi/legacy/favicon.svg` présent.
- F2-1 contentinfo dupliqué : CONFIRMÉ. Un seul `<footer>` par page, `<section aria-labelledby>` ; axe sans `landmark-no-duplicate-contentinfo`, `landmark-unique` ni `region`.
- F2-2 CLS mobile : CONFIRMÉ. CLS 0,000 en 2 passes sur accueil et à-propos (avant 0,112 / 0,035) ; polices Yeseva One, Archivo et Archivo Narrow à l'état `loaded` en réseau normal. Risque résiduel : `display=optional` sans `preload` peut garder le repli Georgia au tout premier chargement à froid sur réseau lent (compromis déclaré par la révision, non mesuré ici).
- F2-3 JSON-LD : CONFIRMÉ. 1 `ld+json` valide par page (6/6), type `Bakery`, adresse Rue Es Fays 43, 5101 Loyers, tél. +32 491 18 29 35, horaires vendredi 09:00-18:00 seul ; `og:type` présent. `og:image` toujours absent (voir F3-A).
- F2-4 photos molles : CONFIRMÉ (partiel mais suffisant). 03 et 20 existent en 800 et 1280 px, srcset généralisé, 0 `srcset` vers un fichier absent. La source plafonne à 1280 x 853 : l'agrandissement reste possible à DPR 3 sur mobile, mais ce n'est plus visible sur les captures (`mon-epi-p2-gal-390.png`).
- F2-5 titre du pied : CONFIRMÉ. « Venir à Loyers. » sur 6 pages, « À vendredi » absent.
- Hors périmètre F3-4 (frise 1980) : CONFIRMÉ.
- Non traités, comme annoncé : F3-1 (galerie), F3-2 (alt redondants), F3-3 (avis), F3-5.

## Findings

### F0 / F1 / F2 : aucun
Build OK (QA : exit 0, 6 pages ; dist 08:48, postérieur à `src/`, captures QA 08:55 postérieures au dist, réutilisées). 0 fait faux, 0 invention non marquée, 0 débordement, 0 lien mort, 0 violation axe critique ou sérieuse, mention KYW, logo et `noindex` sur les 6 pages.

### F3 (finition, non bloquant)
- **F3-A · pas d'`og:image` ni de `twitter:card`** sur les 6 pages (WARN audit). Inutile pour une maquette `noindex`, à ajouter avant une mise en ligne réelle.
- **F3-1 · galerie à 1440 px : rangées inégales qui laissent des vides** (une vignette basse à côté d'une haute, par exemple sous « Deux pains ronds à croûte farinée » et sous « Boulanger enfournant devant le four à bois », `mon-epi-p2-gal-1440.png`). Aligner par `align-items: start` avec hauteurs égales ou rangées homogènes.
- **F3-2 · `image-redundant-alt` (minor, 23 nœuds)** sur la galerie : alt identique à la légende ; mettre `alt=""` quand la légende est visible.
- **F3-3 · avis repris avec leurs fautes de saisie** (« l authenticité », « un lieux », « Jolie petit atelier ») : fidèles à monepi.be, à normaliser ou à signaler « mot pour mot ».
- **F3-4 · 404 du QA** : le seul `color-contrast` (4,36:1 sur `.kyw-footer__note`, paquet partagé) vient de la réponse brute de `serve.mjs`, absent de la vraie `404.html` (axe 0 à 3 largeurs) ; faux positif.
- **F3-5 · divers** : lien de navigation « Monepi » identique au logo, polices servies par Google Fonts (WARN audit), .ttf/.otf signalés par l'audit sur les pages non capturées.

## Ce qui est bien (à ne pas casser)
1. Fidélité du contenu : carte conforme à `donnees.json` (126 nœuds de la page produits sans écart de contraste), horaires hors vendredi « à confirmer », téléphone seul pour réserver.
2. Hero « index de prix » avec photo du four, identité reconnaissable, sans eyebrow ni cartes égales.
3. Robustesse : CLS 0, 0 axe sérieux, 0 débordement à 390, 1440 et 1920, menu mobile popover, 404 designée avec mention et noindex.

## Hypothèses et limites
- QA-revue2 ne couvre que 3 pages ; produits, galerie, contact, 404.html ont été mesurés ici (script maison axe-core + débordement + console + 4xx, 18 cas) et capturés à 1440 et 390 px (lues : produits, galerie ; contact et 404 mesurés par script sans lecture de planche).
- Serveur de mesure (port 4823) arrêté par `kill`.
