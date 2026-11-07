# ETAT · incorrect · variante legacy · fin de la phase 1 (construction-1)

## Fait
- AUDIT.md, DESIGN.md (Picks, thème, composants, checklist), comp.md, deux comps (`.hallmark/comps/`), entrée du journal `.hallmark/log.json`.
- Thème Overprint (newsprint), stamp et critique en tête de `src/styles/page.css`, tokens et base du scaffold.
- One-page conservée : Nav, Hero (Stage), Maison, Pâte (3 chiffres), Carte (Switcher 4 rubriques, tout depuis `donnees.json`), Venir (photo salle, adresse, horaires, réservation, téléphone), Pied colophon, KywFooter ; `404`.
- Photos clientes en WebP 800 et 1600 (`public/photos/`), logo en masque. Build OK (`dist/incorrect/legacy/`), noindex et KywFooter présents sur les 2 pages.

## Reste (phases 2 et 3)
- Motion : un reveal, état d'ouverture, menu mobile (liens de nav au téléphone : simple ligne sous le logo pour l'instant), états des boutons à vérifier, `prefers-reduced-motion`.
- QA navigateur : captures 1440 et 375, débordements (titre du hero, plats à prix long), hauteur du hero à 1280×800, contraste du texte sur passe teal, sloplint `--render` avec `--url`, axe.
- Les trois questions de reproduction du comp, RAPPORT.md, § Sweep du Picks, `pnpm index`, commit de `dist/`.

## Décisions et hypothèses
- Overprint choisi (Darkroom et Midnight écartés, raisons au DESIGN.md). Draw : Index et recherche refusés, Switcher midi/soir refusé (carte par rubriques), photo salle déplacée dans Venir (pas deux photos de suite).
- Prix de `donnees.json` (carte PDF récente), pas ceux du HTML sauvegardé (anciens). Horaires : sources contradictoires, affichage Fooding avec ligne « à confirmer » (`.fill`, `data-placeholder`). Pas d'`openingHoursSpecification`.
- Fournisseurs et « à la maison » repris du texte du site d'origine ; aucun avis, note, e-mail ni chiffre inventé. Les chiffres 48 h, 22,50 € et 14,50 € viennent du site, de la carte et du Fooding.
- Lien carte PDF : URL du CDN Webflow d'origine (`carte.pdf` local non servi). Téléphone `tel:+3281138561` (même numéro que 081/13.85.61).
- Fonts par Google Fonts (Build hint), pas d'auto-hébergement.

## Pièges
- sloplint WARN 23 sur `.hero__photo::before` : passe teal du thème, volontaire.
- `build-site.mjs` ne contrôle que `index.html` : le pied KYW de `404.html` vérifié à la main (présent).
