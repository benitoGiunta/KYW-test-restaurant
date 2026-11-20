# Revue awwwards · Épices & Nous · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 1 F2, 3 F3)
Lecture en une ligne de l'idée du site : le nom du restaurant se pose de part et d'autre d'un axe vertical (cuisine à gauche, salle à droite), le « & » safran fait office de passe ; brun nuit, lin et safran, Boska en affiche.

Méthode : `QA-revue2.md` absent et `.shots/` (04:13 à 04:18) antérieur à la révision ; dist (04:40:19) postérieur à `src/` (dernier fichier 04:39:27), donc je mesure moi-même sur le dist courant, serveur local port 47811 (PID 23515, arrêté). 1 script maison : 5 pages x 320, 390, 768, 1024, 1440 = 25 contextes (molette, axe-core, console, requêtes, `Range` contre fenêtre, titres rognés, cibles, images, texte à opacité 0, meta, mention, logo) ; 1 script ciblé (hero à 4 fenêtres, tous les `.cadre`, contraste des CTA de la nappe, espacement des libellés à 390, bande au clavier, CLS/LCP, mouvement réduit) ; captures lues en planches. Textes confrontés à `dossier.md`/`donnees.json` ; liens testés par curl.

## Vérification des corrections annoncées (REVISION-1)
| id | résultat | preuve |
|---|---|---|
| F1-1 cadres photo | OK | 12 + 3 + 1 + 2 cadres à 1440 et 390 : figure = img pour les 18 cadres (ex. 566x708 dans 566x708) ; capture `home-1440-bande` : photos pleines |
| F1-2 bouton Appeler (nappe) | OK | `rgb(31,22,19)` sur `rgb(217,213,204)` = 12,13:1 ; « Réserver une table » 6,85:1 |
| F2-1 bande défilante | **corrigé mais régression**, voir F2-1 ci-dessous | `scrollable-region-focusable` disparu ; tabindex 0, focus visible (outline 2 px safran foncé) |
| F2-2 métatexte | OK | 0 occurrence de « site actuel », « site du restaurant », « à confirmer », « Relevée » dans les 5 `dist/**/*.html` (restes seulement en commentaires de `site.ts`) |
| F2-3 procédure/fréquence | OK | « Par téléphone ou en ligne : la maison prend les réservations des deux façons » (conforme dossier) ; « suggestions selon le marché » ; plus de « arrivage » |
| F2-4 marges mobile | OK | `.voix` margin-top 24 px ; captures `home-390-entrees`, `histoire-390-pied` : respirations nettes avant ENTRÉES, VENIR, AILLEURS, RÉSERVER, HORAIRES |
| F2-5 nom mobile | OK | nom 350 x 180 px à 390, trois lignes Épices / & / Nous, `scrollWidth` = fenêtre (`hero-390x844`) |
| F2-6 `em` | OK | 2 `em` en source (signature accueil, « à deux. » du pied) ; 3 sur l'accueil rendu = ligne coupée par SplitText |
| F2-7 hero sans photo | OK avec réserve (F3-2) | photo de la verrière, haut à 642 px (1440x900), 594 (1280x720), 655 (390x844) |
| F3-2 (hors liste) | OK | « La signature de la maison, selon la saison : le ris de veau façon carbonara. » |

## Findings
**F2 (mineur)**
- **F2-1 · Régression d'accessibilité : `role="region"` sur le `ul` de la bande « Deux espaces »** · `src/pages/index.astro:92` (`<ul class="espaces__bande" tabindex="0" role="region" aria-label=…>`). Preuve : axe, 5 largeurs sur l'accueil : `listitem (serious) x3` sur `.espaces__bande > li` et `aria-allowed-role (minor)` ; absent en passe 1 à 768 et plus, donc introduit par la révision. Le `ul` perd sa sémantique de liste. Correction : laisser le `ul` nu et poser `tabindex="0" role="region" aria-label="Les deux espaces et la terrasse"` sur un `div` qui l'enveloppe (c'est lui qui défile : transférer `overflow-x: auto` et le style de focus), puis relancer axe (attendu : 0 violation).

**F3 (finition)**
- F3-1 · Non traité (annoncé) : espaces ordinaires avant « : » et entre nombre et « € » (0 U+00A0 sur histoire, 1 sur accueil et réservation ; `carte` en a 16, 3 « nombre espace € » restent). Risque de « : » ou « € » orphelin en début de ligne à 390 px.
- F3-2 · Hero 1280x720 : la photo n'apparaît que sur 126 px sous le bloc d'actions (haut à 594 px pour 720) ; à 1440x900 elle dépasse la fenêtre (bas à 1067). Resserrer le haut du hero (nom et bloc lede) de 60 à 80 px ou ramener le ratio à 21/6 pour que la photo se lise au premier écran.
- F3-3 · Non traités (annoncés) : doublon numéro / « Réserver en ligne » entre page Réservation et pied ; bas de page desktop vide (~500 px).

## Mesures de fond (25 contextes, hors F2-1)
0 erreur console, 0 requête en échec, 0 image cassée, 0 débordement (`scrollWidth` = fenêtre à 320 à 1440), 0 titre rogné, 0 cible < 24 px, 0 texte à opacité 0 en mouvement réduit (accueil 390), 1 `h1` par page (404 exclue : `h1` hors cas), `lang="fr"`, `noindex`, mention KYW et 1 logo sur chacune des 5 pages. Écart écarté : `poster__g` « Épices » à gauche < 0 dans le script après défilement au bas de page (scrub `x` du nom voulu ; à scroll 0, left = 20 px à 390). CLS accueil 0,006 (390) et 0 (1440), LCP 692 et 100 ms (serveur local). Liens : 5 pages + polices, `og.png`, favicon à 200 ; réservation, Facebook et plan conformes à `donnees.json` ; faits et ambiances (« dès que la météo le permet », « feutrée ») présents dans le dossier : 0 faux, 0 invention. Notes `self` (pas de critique jury indépendante).

Scores /10 : design 8 (cadres pleins, nom mobile fort, respirations ; hero 1280x720 encore court), usabilité 8 (CTA lisibles, bande au clavier mais liste cassée pour les lecteurs d'écran), créativité 8 (concept du passe intact sur mobile), contenu 9 (métatexte et procédures retirés, 0 faux), technique 8 (0 erreur, 0 débordement ; 1 violation axe serious introduite).

## Ce qui est bien (à ne pas casser)
1. Le nom en trois lignes sur mobile et la photo de la verrière sous les CTA : la signature tient à toutes les largeurs.
2. Les 18 cadres photo remplis, avec cadrage choisi (`object-position` 50% 60%) ; contraste des CTA de la nappe corrigé.
3. Contenu fidèle au dossier, sans métatexte de production, mention, noindex et logo unique sur chaque page.
