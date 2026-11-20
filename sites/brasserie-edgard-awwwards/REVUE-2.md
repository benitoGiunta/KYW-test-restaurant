# Revue awwwards · Brasserie Edgard · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : le cadran d'une horloge de brasserie sert d'emblème et d'explication des horaires (10 h à 22 h 30, cuisine en pause de 15 h à 18 h en semaine), avec un statut « ouvert maintenant » à l'heure de Namur.

Scores /10 :
- Design 7,5 : inchangé, hero au cadran net à 1440 et 390 (`1440-home-haut.png`), en-tête désormais opaque (`m-carte-600.png`, `m-carte-1500.png`) ; la bande de trois chiffres égaux subsiste.
- Usabilité 7,5 : onglets de la carte estompés à droite (« Le coin du » fondu, `m-carte-600.png`), 404 avec « Aller au contenu » en premier arrêt, CTA 47 px (6 Tab sur `404.html`), 0 cible < 24 px sur 5 pages x 2 largeurs.
- Créativité 8 : idée du cadran intacte, rien cassé par la révision.
- Contenu 7 : la voix de l'agence et le pléonasme sont corrigés, mais la correction « banquettes » a introduit une inexactitude visible sur la photo (F2-1).
- Technique 8 : build identique au `dist/` commité (`diff -rq` vide, dist 21:56 postérieur à `src/`), 0 erreur console, 0 requête en échec, 87 liens internes dont 0 mort, 0 débordement (`scrollWidth` = largeur sur 5 pages x 1440 et 390), 0 texte sous le seuil de contraste (canvas, 6 positions de défilement), 1 seul `h1`, 1 seul logo KYW, noindex, mention et `lang` présents ; reste 1 règle axe moderate (F2-2).

## Vérification de REVISION-1.md (point par point)
| Point | Verdict | Preuve |
|---|---|---|
| F1-1 `aria-label` sur `p.pied__mot` | confirmé corrigé | 0 `p[aria-label]` et 0 `aria-label="Dix heures` sur 5 pages x 2 largeurs ; axe complet : plus de `aria-prohibited-attr` |
| F2-1 voix de l'agence | confirmé | plus de « transmises » ni de « nous » sur a-propos ; « le chef Titi » seul |
| F2-2 « bâtiment bas », chaises/banquettes | partiel : « bâtiment bas » retiré, mais l'harmonisation sur « banquettes en cuir caramel » est fausse (F2-1 ci-dessous) | `11-salle-banquettes.jpg` |
| F2-3 pléonasme | confirmé | accueil : « Jusqu'à 16 Convives. Table de groupe à partir de 11 personnes, trois formules de 34,00 € à 49,00 € » (11 = « plus de 10 » du dossier) |
| F2-4 heures répétées | partiel : « 7 j / 7 » remplacé par « + 0,60 € » (fait du dossier, juste) ; « 10 h » passe de 6 à 4 occurrences ; mais la bande reste trois chiffres égaux (F3-1) | texte extrait du dist |
| F2-5 onglets tronqués | confirmé (fondu `.carte-nav::after`, mobile) ; pas de `scrollIntoView`, acceptable | `m-carte-600.png` |
| F2-6 404 | confirmé : 0 contraste faible, skip link premier arrêt, CTA 47 px, 0 texte caché en reduced-motion ; le mot « Tous les jours » est déjà dans le pied de la 404 | `m-404-rm.png`, 6 Tab |
| F2-7 en-tête translucide | confirmé : `background-color: rgb(241, 231, 207)` opaque, aucune ligne lisible dessous | `m-carte-600.png` |
| F3-3 libellé | confirmé : « avec leurs prix relevés le 20 novembre » | texte accueil |
| Débordement 5 pages | confirmé | script de mesure, 10 cas |
Non traités annoncés (F3-1, F3-2, F3-4, F3-5) : constat inchangé, voir ci-dessous.

## Findings (par gravité)
### F0 bloquant
Aucun.
### F1 majeur
Aucun.
### F2 mineur
- **F2-1 · « banquettes en cuir caramel » est contredit par la photo** (`src/pages/index.astro:109`, `src/data/site.ts:39`, `src/pages/a-propos.astro:7` description) : sur `11-salle-banquettes.jpg` les chaises sont caramel et l'unique banquette visible est gris-brun ; l'alt de la même page dit « banquettes grises » (`src/lib/photos.ts:36`). Le dossier dit seulement « banquettes cuir ». Régression de la révision 1 (la version d'origine, « chaises en cuir caramel », était juste). Correction : « des chaises en cuir caramel, des banquettes en cuir » (accueil, maison, description) ; commentaires `tokens.css:2` et `:28` déjà justes (« cuir caramel des chaises »).
- **F2-2 · axe `landmark-no-duplicate-contentinfo` (moderate)** sur les 5 pages, 1440 et 390 : `<footer class="pied">` (`src/components/Footer.astro:7`) et `<footer class="kyw-footer" aria-label="Réalisation">` (composant partagé) sont deux `contentinfo` de premier niveau. Absent de REVUE-1 et de REVISION-1 (axe limité à wcag2a/aa). Correction : même traitement que la variante legacy (commit 989bbdf7, « région du pied de page ») : donner au pied du site un rôle `region` avec nom (ou le sortir du `<footer>` de premier niveau), sans toucher à `packages/kyw-footer`. Remesurer avec axe complet.
### F3 finition
- **F3-1 · Bande « 14,50 € / Jusqu'à 16 / + 0,60 € »** : toujours trois chiffres égaux (trio décoratif) ; le contenu est exact. À varier (taille ou mise en page) si le temps le permet.
- **F3-2 · Réservation** : 7 lignes « Lundi à Dimanche 10 h à 22 h 30 » identiques (non traité) ; une ligne « Tous les jours » comme dans le pied.
- **F3-3 · 404** : `og:url` = `…/awwwards/404/` (page inexistante), non traité.
- **F3-4 · Audit** : sitemap-index sans `sitemap.xml` ; sans conséquence pour une maquette noindex.

## Ce qui est bien (à ne pas casser)
1. Le cadran et le statut calculé (idée propre au lieu), repos animé sans texte caché en mouvement réduit.
2. Contenu fidèle au dossier : prix, téléphone, Barestho, Facebook, e-mail avec son avertissement, aucune histoire ni avis inventé ; 0 tiret cadratin, 0 filler repéré (grep), 5 `<title>` distincts.
3. Technique propre : 0 console, 0 échec réseau, 0 débordement, en-tête opaque, fondu des onglets, 404 accessible, JSON-LD présent sur les 5 pages.

## Méthode et limites
Pas de `QA-revue2.md` pour cette variante (seul celui du portfolio existe) : captures et mesures refaites par deux scripts maison sur mon propre serveur (port 4811, PID 2367, arrêté). Non re-mesurés : LCP/CLS (aucune modification de poids, non modifiés par la révision), statut du hero sous horloge (inchangé, validé en passe 1).
