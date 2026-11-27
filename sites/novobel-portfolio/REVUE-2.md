# Revue portfolio · Novobel · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un « tableau de chantier » sombre, jaune et crème : premier écran avec le nom en grand et une photo de benne à béton, quatre étapes de chantier reliées par un fil jaune, quatre projets en lignes, barre basse fixe « Devis gratuit / Appeler ».

Preuves : `QA-revue2.md` et ses planches (accueil, services ; `dist/` plus ancien que les captures, `src/` non modifié depuis le build, donc valables), plus un contrôle maison sur 7 pages x 2 profils (1440 ; 390 tactile) : axe-core complet, console, requêtes 4xx, débordement, tap targets, h1, noindex, mention, JSON-LD, liens (11 URL en 200) ; mesures de largeur à 320, 360, 375 px ; capture 1440 et 360. Port 4744 (serveur arrêté).

Scores /10
- Design 7 : premier écran désormais équilibré (h1 x=80 = logo x=80, photo x=835-1360 ; capture 1440 px), mais à 360 px le lien « Devis » est coupé (`nvb-p2-m360.png`).
- Usabilité 6 : 5 liens d'en-tête mobiles, mais le lien « Maison » n'a plus de nom accessible et l'en-tête déborde sous 375 px (N-1, N-2).
- Créativité 7 : inchangé (fil à plomb, jauge, bandeau, 404 « Démoli ») ; la structure reste un gabarit détourné.
- Contenu 7 : accroches reformulées (0 occurrence des formules génériques de la revue 1), badge « Photo illustrative » sur toutes les photos de stock ; reste un paragraphe identique sur accueil et maison.
- Technique 7 : build OK, 0 erreur console, 0 requête en échec, 11 URL en 200, LCP mobile 1,2 s, CLS 0 ; mais 1 violation axe serious (mobile) et un débordement à 360 px.

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constat | statut |
|---|---|---|---|
| F1-1 | consigné, non tranché | `data/restaurants/novobel/ETAT.md` porte la note ; aucune décision de la session mère | ouvert (reste F1, ne pas publier) |
| F1-2 | « Photo illustrative » sur toute photo `placeholder` | présent sur les 12 photos de stock : accueil 2 (silhouettes, mansarde), maison 2, services 2, projets 4 + badges d'aperçu, carrière 1 ; 0 sur contact (aucune photo) | corrigé |
| F2-1 | 5 liens en mobile | 5 liens présents, scrollWidth 390 à 390 px ; **mais régression** N-1 et N-2 | corrigé en partie |
| F2-2 | un seul contentinfo, bandeau en `aside` | 1 seul `FOOTER.kyw-footer`, `aside.etat` nommé « Métiers » ; il reste `region` (moderate) sur `.footer__in > .stack` (pied du site, `div` hors repère) | corrigé en partie (N-3) |
| F2-3 | mentions de source supprimées | 0 occurrence de « BCE », « Banque-Carrefour » ou « source » sur les 6 pages | corrigé |
| F2-4 | accroches reformulées | 0 formule générique (« qualité avant tout », « sur mesure pour vous », « grande envergure », « nos experts ») ; « remise des clés » : 1 occurrence visible (maison) + méta ; mais le paragraphe « Vous avez besoin de travaux de rénovation… » est identique sur l'accueil (hero) et la maison | corrigé en partie (N-4) |
| F2-5 | photo en colonne droite, bloc aligné | `d-01-hero.png` et capture 1440 : h1 x=80 (logo x=80), photo x=835-1360, pas de moitié vide | corrigé |

## Findings

### F0 : aucun (build OK).

### F1 (majeurs)
- **F1-1 · (reporté) Hors périmètre du dépôt, décision humaine.** Novobel n'est pas un restaurant (`dossier.md`). Toujours non tranché ; publier telle quelle une page de rénovation dans l'index des restaurants reste interdit tant que la session mère n'a pas décidé. Hors de portée du réviseur.
- **N-1 · Lien « Maison » sans nom accessible en mobile (axe `link-name`, serious, 7 pages x 390 px).** `Header.astro:24` : `<span class="nav__long">La maison</span>` est masqué (`base.css:53`, `display:none`) et `<span class="nav__court" aria-hidden="true">Maison</span>` est ignoré des lecteurs d'écran : le lien est muet. Régression de la correction F2-1. Correction : retirer `aria-hidden` du court et masquer le long visuellement sans `display:none`, ou poser `aria-label="La maison"` sur le `<a>`.
- **N-2 · Débordement horizontal et lien « Devis » coupé sous 375 px.** `scrollWidth` 368 à 360 px et 369 à 320 px (390 : 390) ; les 5 liens ont une position fixe (« Devis » x=333-368) et la marque « NOVOBEL » prend x=16-82, `nvb-p2-m360.png` montre « DEVI » coupé. Régression de F2-1 (la revue 1 mesurait 0 débordement). Correction : réduire l'espacement/la taille des liens sous 375 px, ou passer la marque en icône/raccourci, ou faire défiler la nav ; re-mesurer à 320, 360, 375.

### F2 (mineurs)
- **N-3 · axe `region` (moderate) sur 7 pages x 2 largeurs** : `.footer__in > .stack` (pied du site) est hors de tout repère depuis que le pied est un `div`. Correction : le mettre dans un `<div role="presentation">` sans effet n'y suffit pas ; envelopper le contenu du pied du site dans un `<section aria-label="Coordonnées">` ou un `nav`/`aside` nommé (sans second `contentinfo`).
- **N-4 · Paragraphe dupliqué accueil/maison.** « Vous avez besoin de travaux de rénovation pour votre maison ou vos locaux ? Novobel accompagne ses clients dans la transformation et l'embellissement de leurs espaces… » apparaît mot pour mot dans le hero de l'accueil et sur la page La maison, repris du site Wix. Correction : une formulation différente sur La maison (par exemple les 4 projets, les 28 logements, les six corps de métier).

### F3 (finition, reportés de la revue 1, non traités par REVISION-1 qui l'annonçait)
- **F3-1** Apostrophes droites `'` dans le texte visible (« d'un », « l'étude ») ; passer en `’`.
- **F3-2** `dist/novobel/portfolio/photos/outils-1600.webp` : 394 Ko (> 300 Ko).
- **F3-3** Bandeau des métiers : phrase répétée 6 fois dans le DOM (WARN `sentence repeated 6x` de l'audit, 6 pages), copies `aria-hidden` donc sans effet pour les lecteurs d'écran.
- **F3-4** Carrière : 6 offres non cliquables ; seul « Postuler par e-mail ».

## Faux positifs du QA (ne pas corriger)
- « no robots.txt » / « no sitemap » : `robots.txt`, `sitemap-index.xml` en 200 (vérifié).
- 404 de la capture QA (2 violations de contraste, cible 1 trop petite, « focus left the page ») : réponse brute du serveur ; la vraie `404.html` (« Démoli ») a 0 violation de contraste, 0 cible < 24 px, un h1, noindex, mention (vérifié sur le contrôle maison).
- « 0 violation axe » du QA sur accueil/services : le QA ne remonte pas les violations moderate ni, ici, celles du profil 390 ; elles existent (N-1, N-3).

## Vérifié sans défaut
Console : 0 erreur ; réponses ≥ 400 : 0 ; 1 `h1` par page ; `lang="fr"` ; noindex et mention « Maquette KYW, certaines données sont illustratives » sur 7 pages ; pied KYW (`kyw-footer` + logo `kyw-signature`) ; 0 tap target < 24 px ; titres uniques ; JSON-LD `GeneralContractor` + `PostalAddress` (sans horaires, aucun n'est donné) ; faits : adresse, téléphone, e-mail, 6 offres, 4 projets, 28 logements inchangés ; aucune invention (horaires « à communiquer par Novobel », équipe « ajoutés avec les informations validées »). 1440 px : 0 débordement, axe sans violation autre que `region`.

## Ce qui est bien (à ne pas casser)
1. Le premier écran refait (nom, accroche, boutons à gauche alignés sur le logo, benne à béton à droite) et la signature fil à plomb/jauge.
2. Le badge « Photo illustrative » : discret, lisible, systématique, cohérent avec « image illustrative » des projets.
3. L'honnêteté du contenu (formulaire de démonstration annoncé, 404 « Démoli », pas de donnée inventée).
