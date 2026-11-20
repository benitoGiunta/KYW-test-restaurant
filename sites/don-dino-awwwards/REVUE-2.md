# Revue awwwards · Don Dino · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : le restaurant comme un rythme hebdomadaire, « quatorze services par semaine » (7 jours x midi et soir), avec une grille d'horaires dont la case du service en cours ou à venir s'allume, vert bouteille, crème et rouge, capitales condensées Big Shoulders.

Périmètre : `dist/don-dino/awwwards/` du 20/11 17:07, postérieur à tout fichier de `src/` et `public/` (`find -newer` vide) ; QA-revue2 (17:16) et ses planches lus ; mesures propres sur mon port 4871 (serveur arrêté, PID 13913), 5 pages réelles x 1440 et 390 px, axe-core à 2 positions de défilement après 2,6 s de repos. Scripts : scratchpad de session (`mesure.mjs`, `titres.mjs`, `clock.mjs`).

Scores /10
- Design 8 : parti pris inchangé et tenu ; les accents des capitales sont maintenant lisibles (`t-res`, `t-404`, `t-pates`, `t-venir`, `t-pizzas`, `t-table` à 1440 et 390 px).
- Usabilité 8,5 : 0 cible < 24 px sur 5 pages x 2 largeurs, `scrollWidth` = fenêtre partout, 1 seul `h1` par page.
- Créativité 8 : pilote horaire intact, 4 horloges testées sur 4 justes (ven. 12:00 « Service du midi en cours, jusqu'à 14 h 30 », ven. 22:31 « Service du soir en cours, jusqu'à 23 h 30 », sam. 14:30 « ce soir, dès 18 h », dim. 23:45 « demain midi, dès 12 h »).
- Contenu 8,5 : phrase corrigée, note de production et portrait non identifié retirés, faits conformes au dossier (Scalisi dit « Dino », 2014, « Il Condottiere », 23:30 vendredi et samedi).
- Technique 8,5 : 0 erreur console, 0 requête en échec, 0 violation axe (10 cas), LCP mobile 1,25 s et CLS 0,007 au maximum (QA) ; reste le poids de quelques images (F3-1).

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 accents coupés | CONFIRMÉ | captures d'élément après 4,5 s, 1440 et 390 px : « RÉSERVER », « PLUS À LA CARTE » (404.html), « PÂTES ET GRATINÉS MAISON », « VENIR À NANINNE », « LES PIZZAS, DU FOUR À LA TABLE », « À TABLE. » : accents entiers, sans contact avec la ligne du dessus. `engine.css:107` et interligne 0,92 présents |
| F2-1 OG | CONFIRMÉ | `og.png` 1200 x 630 ouverte : « QUATORZE / SERVICES / PAR SEMAINE. » entier en Big Shoulders, sous-titre dans la zone verte, photo sur le tiers droit ; `og:image` présent sur les 5 pages |
| F2-2 note de production | CONFIRMÉ | histoire : « Photos : Don Dino. » seul ; texte extrait du `dist/` relu |
| F2-3 phrase | CONFIRMÉ | « Spaghetti, lasagne et cannelloni côtoient les escalopes, les poissons et les viandes grillées. » ; 0 « aux lasagne » |
| F2-4 photo du patron | CONFIRMÉ | `t-salle-sec-1440` : photo de la salle (comptoir, tables dressées, aucune personne) à côté du texte sur Placido Scalisi ; l'alt décrit la photo ; `photos/index.json` : 11-salle-comptoir, « ambiance, salle » |
| F3-2 couvert | CONFIRMÉ | « par couvert, minimum 2 » ; 0 « cvts » |
| F3-3 espace avant « : » | CONFIRMÉ | « Il Condottiere »&nbsp;: dans le HTML de l'histoire |
| F3-5 réservation | CONFIRMÉ | « Réservez par téléphone ou par demande en ligne, depuis le site du restaurant. » ; 0 « un appel suffit » |
| F3-1 virgule/interligne | CONFIRMÉ | interligne 0,92 ; aucune collision visible sur « Sept jours, deux services » (planche QA) |
| F3-4, F3-6 | non traités, acceptés | voir F3-1 ci-dessous |

## Findings

### F0 (bloquant)
Aucun. Build OK (QA exit 0, 5 pages), 0 fait faux, 0 invention non marquée, mention « Maquette KYW, certaines données sont illustratives » + logo KYW unique (`kyw-signature-720.webp`, alt « KYW, Know Your Website ») + `noindex, nofollow` sur les 5 pages, `lang="fr"`, JSON-LD présent, 0 tiret cadratin.

### F1 (majeur)
Aucun.

### F2 (mineur)
Aucun.

### F3 (finition)
- **F3-1 · Images lourdes (repris de la passe 1, non traité).** Dans `dist/_astro/` : `12-plat-escalope-salade` jpg 459 Ko, `03-pizza-planche-bois` jpg 401 Ko, `10-pizza-anchois-epinards` webp 362 Ko et jpg de repli 643 Ko, `06-bar-tireuses` jpg 332 Ko, `11-salle-comptoir` jpg 315 Ko. Sans effet mesurable : page la plus lourde ~722 Ko, LCP mobile 1,25 s. Correction : baisser la qualité des variantes servies (webp ~80, jpg ~72) si une prochaine passe a lieu.
- **F3-2 · Histoire mince** : assumé par le dossier, rien à inventer.

## Faux positifs du QA (revue 2) à ne pas corriger
- « 404 : color-contrast serious (`.kyw-footer__note`, 4,36:1) » et « cible 128 x 20 » : mesurés sur la page générique de `serve.mjs` (`__shoot-missing-page-…`), pas sur `404.html` du site. Le vrai `404.html` : 0 violation axe à 1440 et 390 px, 0 cible < 24 px, h1, noindex, mention et logo présents.
- « Lien d'évitement en premier : non » : le script ne reconnaît pas le lien « Aller au contenu » (vérifié en passe 1 : premier Tab = lien d'évitement).
- WARN « no robots.txt / sitemap » : sitemaps présents dans `dist/don-dino/awwwards/` ; `robots.txt` est à la racine du dépôt, hors périmètre.

## Ce qui est bien (à ne pas casser)
1. La signature « quatorze services » : état et case courante pilotés par l'heure de Bruxelles, justes aux 4 instants retestés.
2. Contenu rigoureux et sobre : faits conformes, 115 plats, aucune donnée inventée, photos sans personne non identifiée sous un nom.
3. Technique propre : 0 erreur console, 0 axe, pas de débordement, pied KYW unique, OG recomposée.
