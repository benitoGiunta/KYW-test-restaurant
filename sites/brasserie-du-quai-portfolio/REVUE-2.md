# Revue portfolio · La Brasserie du Quai · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 2 F2, 9 F3 dont 8 reportés de la passe 1 et 1 nouveau)

Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une brasserie au bord de la Meuse racontée par la houle et une frise des services en « marée », bleu Meuse sur blanc cassé, photo de terrasse plein écran, carte sérieuse.

## Méthode et réserves
- Preuves : `QA-revue2.md` de l'agent « captures » (build exit 0, 7 pages, audit 0 FAIL / 5 WARN, accueil et fiche carte : 0 erreur console, 0 violation axe sérieuse), plus mes mesures sur `dist/` (serveur `serve.mjs` port 4631, PID 12409, arrêté par `kill`) : mini-script Playwright 7 pages × 5 largeurs (320, 390, 768, 1024, 1440, reduced-motion) avec axe-core 4.14.0 à 390 et 1440, `curl` des liens, extraction du JSON-LD, grep sur `dist/`, 10 captures ciblées (`scratchpad/r2/s/`, planches `pm.png`, `pd.png`).
- La « 404 » du shoot de l'agent « captures » est la page de repli de `serve.mjs` (titre vide, pas de `h1`, 2 violations axe) : non retenue. J'ai testé la vraie `404.html` : title « Page introuvable | La Brasserie du Quai », un `h1`, 0 erreur, 0 requête en échec.
- Le crawl de `shoot.mjs` n'a couvert que 3 pages sur 7 : les 5 pages intérieures sont vérifiées par mon script (erreurs, débordement, axe, nav) et par `audit.mjs` (6 pages, 0 FAIL). L'avertissement « pas de sitemap / robots.txt » de l'audit est un faux positif : `robots.txt` (`Disallow: /`) et `sitemap-index.xml` existent dans `dist/`.

## Vérification des corrections annoncées dans REVISION-1.md
| Finding | Annoncé | Constaté | Verdict |
|---|---|---|---|
| F1-1 JSON-LD | `openingHoursSpecification` retiré | `Restaurant` présent sur 7 pages, adresse et téléphone justes, 0 `OpeningHoursSpecification`, 0 `openingHours` | confirmé |
| F2-1 horaires sans réserve | phrase de pied de page, note de frise, badge neutre | phrase du pied sur 7 pages sur 7 ; badge un dimanche (1/11/2026) : « Aujourd'hui : horaires à confirmer par téléphone » ; plus de « Ouvert / Fermé » ; **mais la note de la frise se contredit (voir F2-1 ci-dessous)** | partiel |
| F2-2 « en salle » | retiré | 0 occurrence dans `dist/` ; « Pierre-Alexandre et son équipe », « L'équipe de la maison » | confirmé |
| F2-3 pastille « P » | carte texte | `media--vide` = 0 ; carte « Une expérience au fil de l'eau. » (accroche citée dans le dossier, site actuel) alignée sur les deux photos à 1440 (`d-equipe.png`), sans initiale ; à 390 la carte passe sous les photos | confirmé |
| F2-4 navigation mobile | 4 liens sur une seconde ligne | 4 liens visibles à 320 (16 à 304 px), 390 (16 à 374), 768 et 1024 (5 liens sur une ligne) ; débordement 0 sur 7 pages × 5 largeurs ; en-tête 91 à 94 px sans chevauchement du h1 (carte : h1 à 112 px) ; `m-carte.png`, `m-terrasse.png` | confirmé |
| F2-5 surtitres | 15 retirés | `class="eyebrow` : accueil 1, écailler 1, maison 1, carte 0, réservation 0, terrasse 0 (conforme) ; terrasse : un `h2` « Bon à savoir » (h1 puis h2) | confirmé |
| F2-6 plan | mention à 14 px + lien itinéraire | mention « Schéma, pas à l'échelle… » présente sur l'accueil et la réservation, lien Google Maps vers 50.4656346, 4.8794989 (coordonnées du dossier) | confirmé (tracé toujours supposé, signalé) |

Corrections vérifiées : 6 confirmées sur 7 lignes, 1 partielle (F2-1). Aucune régression de build, console, liens (12 URL internes distinctes toutes en 200) ou débordement.

## Scores /10
- Design 7,5 : identité tenue (houle, Gambetta, bleu Meuse), en-tête mobile désormais net sur deux lignes ; pages intérieures toujours aérées, carte en liste plate (`m-carte.png`).
- Usabilité 7,5 : 4 rubriques atteignables à 320 px, 0 cible tactile < 24 px, focus visible (QA : 0 sans contour) ; le nom du hero se coupe en reduced-motion à 320 px (F2-2).
- Créativité 7,5 : la frise de marée avec curseur « maintenant » porte le concept ; reste attendu ailleurs.
- Contenu 7,5 : faits conformes au dossier, JSON-LD sans horaires inventés, badge neutre ; une note de frise qui se contredit (F2-1) et les F3 de contenu non traités.
- Technique 8,5 : build OK, 0 erreur console et 0 requête en échec sur 7 pages × 5 largeurs, 0 débordement, axe : 0 violation sérieuse ou critique (seulement `landmark-no-duplicate-contentinfo` modérée), LCP mobile throttlé 1 192 ms, CLS 0,004, noindex, mention et signature KYW sur 7 pages.

## Findings

### F2 mineur
- **F2-1 · T-faux · note de la frise des horaires.** `components/Maree.astro:33` : « en trait plein, les jours du banc d'écailler (jeudi au lundi) ; en pointillé, les jours sans information ». Or `data/site.ts:67` marque dimanche `aConfirmer: true` : sur la frise, dimanche est en pointillé (`m-maree.png`, rangée « Dimanche ») alors que, par la note, dimanche (jeudi au lundi inclus) devrait être en trait plein. Le texte contredit son propre graphique. Correction : écrire « en trait plein, le lundi et du jeudi au samedi ; en pointillé, le mardi, le mercredi et le dimanche, sans information publiée » (le banc d'écailler du dossier court du jeudi au lundi, mais le dimanche reste « inconnu » dans `donnees.json`), ou passer dimanche en trait plein si on lui accorde le banc d'écailler.
- **F2-2 · Technique · reduced-motion · nom du hero mal ajusté.** `motion/setup.ts:40-55` (`fitNom`) avec `prefers-reduced-motion: reduce` : à 320 px, le mot « La Brasserie » est réglé à 96 px (plafond 0,3 × largeur) et mesure 516 px dans une fenêtre de 320 px, il est coupé (« La Brasser… ») ; à 1440 et 1024 px, le nom ne mesure que 917 px (64 % de la largeur) au lieu de la pleine largeur obtenue sans reduced-motion (1 422 px) (`s/d-index.png`, `.shots-…-revue2/home/r-01-hero.png`). Mesures : `getBoundingClientRect` des `.nom__w`, attente 5 s. À 360 et 390 px le fit est correct (352 à 382 px). Le calcul prend vraisemblablement une boîte parente mesurée trop tôt avant mise en page définitive en reduced-motion (le CSS à 18,3 vw ou 10,8 vw serait le bon repli). Correction : en reduced-motion, rappeler `fit()` après `requestAnimationFrame` et à `load`, ou ne pas poser de `font-size` en ligne quand `prefers-reduced-motion` est actif et laisser les tailles CSS (18,3 vw / 27,7 vw mobile, 10,8 vw desktop), que la passe 1 a calées sur le fit. Hors reduced-motion : correct de 320 à 1440.

### F3 finition
- **F3-1** (passe 1, non traité) Numéros décoratifs `index__num` : 36 sur la carte, 10 sur l'écailler, 9 sur l'accueil. Retirer.
- **F3-2** (non traité) Formats d'heure mélangés : 18 « 12:00 » et 7 « 12h00 » sur l'accueil.
- **F3-3** (non traité) Notes publiques sans date de relevé : aucun « juillet 2026 » dans le bloc des notes de `/histoire/` (la mention de juillet 2026 présente concerne un autre élément).
- **F3-4** (non traité) « avis résumé » répété 3 fois sur `/histoire/` (WARN de `audit.mjs`, « phrase répétée 3 fois »).
- **F3-5** (non traité) Le nom du hero touche le bord gauche (x = 0) à 390 et 1440 (`d-01-hero.png`, `m-01-hero.png`).
- **F3-6** (non traité) « Année d'ouverture à confirmer » toujours présent sur `/histoire/` (1 occurrence).
- **F3-7** (non traité) Légende ou alt « au poste de l'écailler » : 1 occurrence sur `/ecailler/`, 1 sur `/histoire/`, alors que le dossier décrit un cuisinier qui ouvre des coquilles Saint-Jacques.
- **F3-8** (non traité) `loaderMs` mobile throttlé 3 972 ms en passe 1 ; non remesuré.
- **F3-9** (partiel) Terrasse : un `h2` désormais présent. Libellé « MAINTENANT » rouge #d73c2c à 4,43:1 : non traité (axe : 29 contrastes « à vérifier » sur l'accueil, aucune violation).
- **F3-10 (nouveau)** `landmark-no-duplicate-contentinfo` (moderate, axe, 7 pages à 1440) : deux `<footer>` de niveau page, le pied du site (`Footer.astro:9`) et `packages/kyw-footer/KywFooter.astro:12`. Correction : `role="presentation"`/`div` pour l'un des deux ou `<aside aria-label="Réalisation">` pour le pied KYW (composant partagé : à régler dans `packages/kyw-footer`, hors du site).

## Ce qui est bien (à ne pas casser)
1. Le Header mobile sur deux lignes : 4 rubriques lisibles et atteignables de 320 à 390 px, sans burger ni chevauchement (`m-index.png`, `m-carte.png`).
2. L'honnêteté des horaires : plus d'« ouvert / fermé » affirmatif, JSON-LD sans horaires, phrase de réserve en pied de page, badge « à confirmer par téléphone ».
3. La carte texte de l'équipe (« Une expérience au fil de l'eau. ») : remplace proprement le faux avatar et reprend une accroche réelle du site actuel.

## Vérifications faites (faits, sans réserve)
Build `dist/` (17:19, 7 pages) postérieur à toute modification de `src/` et `public/`. 0 erreur console, 0 requête en échec, 0 débordement horizontal sur 7 pages × 320/390/768/1024/1440 (reduced-motion). `lang="fr"`, un `h1`, `meta robots noindex, nofollow`, mention « Maquette KYW, certaines données sont illustratives » et `kyw-signature` (une occurrence) sur chacune des 7 pages. Aucun tiret cadratin dans le HTML. 12 URL internes distinctes en 200, aucune sans préfixe `/brasserie-du-quai/portfolio/`.
