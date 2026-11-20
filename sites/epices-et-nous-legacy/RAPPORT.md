# Épices & Nous · variante legacy · 2026-11-20

Phase 3 (QA) en mode test : sweep sloplint complet, finish review et log hallmark non refaits (budget QA). Seule la QA sur `QA-build.md` est traitée.

## QA : constats et corrections
| Constat (QA-build) | Action | Vérification |
|---|---|---|
| 404 : contraste `.kyw-footer__note` 4,36:1 | surcharge de couleur dans `page.css` (encre sombre) | capture ciblée 404 : couleur calculée rgb(60,74,79) sur #fbfaf8 (> 4,5:1) |
| actualites : saut h1 vers h3 | h3 devenus h2 (même style via `.rows--dated h2`) | rendu : h2 à 25 px (`--text-xl`) |
| `twitter:card` absent | ajouté dans `Base.astro` (`summary`) | présent dans `dist/.../actualites/index.html` |
| Lien d'évitement « pas en premier » | non modifié : il est le premier élément du DOM (`Nav.astro`) ; heuristique de l'audit probablement en cause | à revérifier par la revue |
Build final : OK, 7 pages, noindex et KywFooter présents.

## Non corrigé (justifié)
- Liens `kyw-footer__link` de 24 px : paquet partagé, non modifiable.
- Pas de `robots.txt` ni de sitemap au niveau site : hors périmètre d'un site de maquette (noindex sur chaque page).
- Fontes `.ttf` (2 par page) : non converties en woff2, choix reporté.
- Polices Sentient / Hanken Grotesk par lien externe : repli Georgia hors ligne.

## Placeholders et faits manquants
| Élément | Où | Valeur actuelle | À remplacer par |
|---|---|---|---|
| Réservation | lien module Wix externe | lien conservé, pas de formulaire | module de réservation réel du restaurant |
| Actualités (dates, textes) | `actualites.astro` | reprises du site d'origine, certaines illustratives | contenu à jour fourni par le restaurant |
| Photos | accueil, carte | photos du site d'origine | photos propres au restaurant (haute définition) |
Mention « Maquette KYW, certaines données sont illustratives » présente.

## Demande de matériel
Photo qui améliorerait le plus la page : le plat signature (ris de veau façon carbonara) en plan serré, 1600x1000, lumière chaude, pour le hero.

## Leçons
Voir `data/usage/test-1/lecons-proposees/epices-et-nous.md`.
