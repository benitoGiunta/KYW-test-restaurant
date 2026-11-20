# Revue legacy · Don Dino · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une carte de brasserie-pizzeria lisible avant tout, sur un fond vert profond, avec la liste des pizzas et les prix dès l'écran d'accueil et une pastille orange « Réserver » toujours à portée.

Méthode : captures QA-revue1 (accueil, carte, « 404 ») relues par planches ; la « 404 » du crawl est celle de la RACINE du dépôt (titre « maquettes de sites de restaurants namurois », fond clair), pas celle du site. J'ai donc fait des captures ciblées (bureau 1440 et mobile 390, axe, console, débordement) de /reservations/, /groupes/, /a-propos/, /contact/ et de la vraie `404.html`, que la QA n'avait pas couvertes. Textes confrontés à `dossier.md` et `donnees.json` (115 plats comparés par script : 0 écart de nom ou de prix). Liens internes confrontés à `dist/` : 0 mort. Liens externes confrontés au dossier : Facebook, réservation, visite virtuelle, jobs, Maps conformes. Serveur de revue arrêté par `kill`.

Scores /10
- Design 6 : cohérent, net et lisible (Gabarito + Manrope, contrastes bons, hero/carte soignés) mais monochrome vert, sans photo en tête de page, et de grands vides sur contact et groupes (`d-groupes_`, `d-contact_`).
- Usabilité 7 : réservation et téléphone à chaque écran, menu mobile, rubriques de la carte en rangée défilante, jour courant mis en évidence ; casse : tuiles « occasions » illisibles au mobile (F1).
- Créativité 5 : l'idée « la carte est le hero » est bonne ; ensuite les pages internes restent des listes et des tuiles égales.
- Contenu 8 : 115 plats exacts, faits conformes (adresse, téléphone, horaires 23:30 ven.-sam., 2014, Dino), lacunes du dossier non inventées, vouvoiement, pas de tiret cadratin ; léger filler sur /groupes/.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement, LCP mobile 852 ms accueil / 960 ms carte, CLS ≤ 0,007, 1 h1 par page, `lang="fr"`, noindex et mention KYW partout, JSON-LD Restaurant avec adresse et horaires, 0 violation axe sérieuse ou critique ; manquent les balises Open Graph.

## Findings

### F1 majeur
- **F1-1 · /groupes/ mobile : les quatre tuiles « occasions » s'écrasent en colonnes de lettres.** Fichier : `src/pages/groupes/index.astro:28`. Le `style="…grid-template-columns:repeat(4,minmax(0,1fr))"` en ligne l'emporte sur la règle responsive de `.facts` (page.css) : à 390 px les mots « Anniversaires », « Fêtes », « Mariages », « Cocktails » se cassent lettre par lettre dans 4 colonnes de 60 px (`m-groupes-occ.png`, `m-groupes_.png`). Pas de débordement de page, mais section illisible. Correction : retirer le style en ligne et définir 4 colonnes en bureau, 2 colonnes (ou 1) sous 40rem dans page.css ; contrôler à 390 et 320 px.

### F2 mineur
- **F2-1 · Axe `moderate` sur 5 pages testées (réservations, groupes, à propos, contact, 404 du site) : `landmark-contentinfo-is-top-level` (`.kyw-footer`) et `landmark-no-duplicate-contentinfo` (`.foot`).** Deux `<footer>` (celui du site, `SiteFooter.astro:7`, et celui de `packages/kyw-footer`) donnent deux landmarks `contentinfo`. La QA1 donnait 0 violation sur accueil et carte (mesure faite avant que l'animation d'entrée se pose ?) : à revérifier sur ces deux pages après correction. Correction : transformer le pied du site en `<div class="foot">` pour ne garder qu'un seul `contentinfo` (celui de `kyw-footer`), hors de tout autre landmark ; ne pas modifier le composant partagé.
- **F2-2 · Open Graph absent sur les 7 pages** (`og:` : 0 occurrence dans `dist/don-dino/legacy/index.html` ; audit.mjs : 48 WARN dont `og:title`, `og:description`, `og:image`, `twitter:card`). Correction : ajouter dans `Base.astro` og:title/description/type/url, `og:image` (photo existante en WebP/JPEG ≥ 1200 × 630 dans `public/photos/`) et `twitter:card`.

### F3 finition
- **F3-1 · Cible tactile de 22 px de haut** : « Voir la carte complète » (167 × 22) dans la fiche du hero (`home/d-01-hero.png`) ; les autres liens < 24 px relevés (Facebook, téléphone, « rejoignez l'équipe », « visite virtuelle ») sont dans une phrase et exemptés (WCAG 2.5.8). Correction : `min-block-size: 24px` (ou padding-block) sur ce lien.
- **F3-2 · Mention visible « Titres et dates des articles à compléter. »** sur /a-propos/ (`a-propos/index.astro:28`) : balisée `data-placeholder`, conforme à la règle de marquage, mais c'est une note de chantier lisible par le client. Correction : la remplacer par un texte neutre (« Titres des articles bientôt en ligne. ») ou masquer la phrase.
- **F3-3 · Filler sur /groupes/** : « Un lieu unique et privatisable… », « dans un cadre convivial et privatisé » (reprise du site actuel, sans fait propre au restaurant). Correction : appuyer sur un fait du dossier (salle spacieuse, bar, parking privé, terrasse, jusqu'à 12 personnes en ligne).
- **F3-4 · « ambiance italienne »** (/a-propos/, concept) : absent du dossier (qui donne « décontracté, streetwear, idéal pour les familles »). Correction : reprendre l'ambiance du dossier ou retirer.
- **F3-5 · Composition répétitive des pages internes** : 3 cartes égales (Sur place / Paiement / Nous contacter) sur /contact/, 4 tuiles égales sur /groupes/, grands vides verticaux sur ces deux pages et à droite des rubriques de /carte/ ; photos du hero absentes (le hero est typographique). Correction : donner à la page groupes une photo pleine largeur (salle ou bar) à la place d'un vide, grouper « Paiement » dans « Sur place ».
- **F3-6 · Doublon de libellé** sur /reservations/ : le bouton « Devis et réservation » (vers dondino.be) et le titre du formulaire illustratif portent le même nom ; au premier regard on croit que le bouton ouvre le formulaire voisin. Correction : libeller le bouton « Demande sur dondino.be » ou « Formulaire d'origine ».
- **F3-7 · Polices chargées depuis Google Fonts** (`fonts.googleapis.com`, Gabarito 800 + Manrope 500/700, ~286 Ko) : dépendance externe et IP du visiteur transmise à un tiers. Correction : auto-héberger en WOFF2 avec `preload` de Gabarito.

### Hors périmètre / constaté sans effet
- `keyboard.skipLinkFirst: false` du rapport : faux négatif, le premier arrêt est bien « Aller au contenu » (accueil, carte, réservations, groupes, à propos, contact).
- Cible mobile et violation `color-contrast` de la « 404 » du crawl : appartiennent à la 404 de la racine ; la vraie `404.html` du site : axe sérieux 0, 1 h1, nav et pied présents, pas de débordement à 1440 ni 390.
- Logo KYW absent des captures pleine page des pages internes : artefact (`loading="lazy"` non déclenché par `fullPage`) ; après défilement l'image est chargée (720 px, `complete`), identique à l'accueil.

## Ce qui est bien (à ne pas casser)
1. La fiche « Les pizzas de la carte » du hero (6 pizzas, prix réels du dossier, lien vers la ligne de carte) : la proposition du restaurant en une seconde, avec un titre qui reprend l'accroche réelle du site actuel (« paraît-il »).
2. La page /carte/ : 115 plats en 12 rubriques, prix alignés, rubrique en cours cernée, rangée de rubriques défilante au mobile, aucun écart avec `donnees.json`.
3. Le bloc horaires avec le jour courant (« Aujourd'hui »), le téléphone et « Réserver » constamment visibles ; formulaire honnête (« L'envoi n'est pas branché dans cette maquette »), pied KYW et mention présents, noindex partout.
