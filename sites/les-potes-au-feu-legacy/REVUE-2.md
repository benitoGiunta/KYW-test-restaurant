# Revue legacy · Les Potes au Feu · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : refonte éditoriale sobre du site multipage d'origine (diptyque des deux chefs en hero, papier crème, brun café, rouge hotte, carte soir/midi à onglets, horaires et réservation en clôture de chaque page), maintenant avec une 404, une tête SEO complète et des polices auto-hébergées.

Hypothèses de méthode : `DESIGN.md` non lu ; `REVUE-1.md` et `REVISION-1.md` lus d'abord (passe 2 oblige). Build refait (`node scripts/build-site.mjs sites/les-potes-au-feu-legacy` : 6 pages, OK, `dist/` inchangé dans git). Serveur `serve.mjs dist` sur le port 4493, arrêté par PID. `shoot.mjs --nav --hovers 3` lancé page par page (6 sorties à code 0, captures dans `.shots/r2l-legacy/<page>/`), `audit.mjs` par URL, `sloplint src --url` (4 pages), mini-script Playwright (onglet midi, envoi du formulaire, module Zenchef, burger, débordement à 320/390/1024/1920 sur les 6 pages, supprimé ensuite). Liens externes (Zenchef, Facebook, YouTube, OSM, bon cadeau du site d'origine) non testés hors réseau mais conformes à `donnees.json`.

## Mise en service et mesures
- Build OK. Console : 0 erreur, 0 requête en échec sur les 6 pages (desktop et mobile). Liens internes et `src`/`srcset` extraits de dist : 0 manquant. Axe : 0 violation (histoire : 4 contrastes « needs review », aucune violation). Débordement horizontal : aucun à 320, 390, 1024, 1920 (et `overflowX` faux à 1440/390 dans shoot).
- LCP desktop 0,14 à 0,36 s, mobile throttlé 1,1 à 1,6 s ; CLS 0 partout ; reduced-motion : `hiddenText: 0`, rien ne bouge au repos ; clavier : aucun focus invisible, aucune cible tactile < 24 px (`smallTargets` vide) ; burger Popover : 6 liens de 44 à 48 px, se ferme à Échap. Page la plus lourde ≈ 496 Ko (polices 63 Ko).
- `audit.mjs` : 0 FAIL, 8 WARN (horaires « 12:00 à 14:00 19:00 à 21:00 » répétés par nature ; robots.txt et sitemap cherchés à la racine de l'origine ; « 404 sans h1 » est celle de l'origine, la 404 du site a son h1). `sloplint src --url` : 0 FAIL, 0 WARN, 2 WAIVED, 2 DISMISSED, 4 NOTE (gate 58, mots par écran et chapôs de 13 à 15 mots).
- Mention « Maquette KYW, certaines données sont illustratives. » : 1 par page sur 6/6 ; `meta robots noindex` : 6/6 ; un seul logo KYW (bandeau clair du paquet).

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constaté | verdict |
| --- | --- | --- | --- |
| C1 | numérotation 1 à 4, extras sans numéro | `le-menu-des-potes/d-02-scroll` : « Mises en bouche » sans numéro, 1 à 4 sur les services, « Mignardise » sans numéro | OK |
| C2 | canonical, og:*, twitter, JSON-LD | présents sur les 6 pages (sauf canonical de la 404, voulu) ; JSON-LD `Restaurant` : adresse, géo (50.4586737 / 4.8643452), tél., 7 jours dont midi mer./ven., `priceRange €€`, Zenchef, Facebook ; `og.jpg` 200, noindex conservé | OK |
| C3 | 404 | `404.html` : h1 « Cette page n'existe pas », réserver + retour accueil, photo, axe 0 (`404/d-01-hero`) | OK |
| C4 | « L'aftermovie « Alfonse » », image ≤ 1140 px | `home/d-04`/`d-05` : titre exact, image à 1140 px (bord droit à 1204), bouton YouTube dZtMOajOefE | OK |
| C5 | contact recomposé | `contactez-nous/d-01-hero` : chapô avec téléphone, bannière 320 px, note « formulaire de maquette » à y 733, adresse à y ≈ 810 à 1440×900 ; objets Question / Privatisation du samedi / Autre ; envoi testé : message « Rien n'a été envoyé… » dans une zone `aria-live` | OK (voir N1) |
| C6 | prix du menu dans le premier écran | `le-menu-des-potes/d-01-hero` : « 67 € » à y ≈ 750-830 à 1440×900, onglets à y 600 ; la liste des plats démarre à y 857 (juste sous le pli) | OK |
| C7 | titre factuel, chapô, cadre sans min-height | « Réserver avec Zenchef », chapô « Choisissez le jour, l'heure et le nombre de couverts » ; module chargé au clic : iframe `rid=379477`, 640 px, `scrollHeight` 2214 avant et après, CLS 0 | OK (voir N2) |
| C8 | texte du client allégé | « Les chefs servent eux-mêmes leurs plats… » ; « quatre mains » une fois ; h2 menu « À table, du lundi au vendredi » ; reste « Un vrai moment de cuisine » en h2 (voir N4) | OK |
| C9 | « Bœuf » | « Bœuf confit » dans la carte, l'alt et la légende | OK |
| C10 | rythme | plus de double marge ; vides de 140 à 190 px entre sections de papier, 300 px aux changements de surface (bande brune, bande claire) | OK |
| C11 | cible tactile du téléphone | `smallTargets` vide ; mais régression de interligne (voir N1) | OK avec réserve |
| C12 | refusé | palette conservée ; sloplint ne sort plus de REFLEX | accepté |
| C13 | polices woff2 auto-hébergées | 63 Ko, préchargées, plus de Google Fonts ; titres et corps s'affichent dans les bonnes familles sur toutes les captures | OK |
| C14 | refusé | `hallmarkSlots` conservé (F3 laissé au choix) | accepté |
| C15 | filet du diptyque | `home/d-01-hero` : filet crème de 4 px à x = 720, l'objet flou n'est plus coupé net | OK |
| C16 | mobile citation et cadre | `le-menu-des-potes` mobile : citation en 4 lignes sans retrait ; cadre de réservation à pleine largeur (16 px de padding) | OK |
| C17 | rythme du formulaire | champs de même pas sur desktop et mobile | OK |
| C18 | légendes sans « le soir » | « Au passe, les deux chefs dressent les assiettes. », « Le bar et la salle. » | OK |
| C19 | sans objet | sans objet | OK |

## Scores /10
- Design 8 : hero diptyque et puits crème nets (`home/d-01-hero`), hiérarchie Yeseva One / Archivo claire, rythme régulier ; légère asymétrie de la vidéo (1140 px alignée à gauche) et deux héros (menu, réservation) un peu vides sous le chapô.
- Usabilité 8 : prix du menu dans le premier écran, réservation en deux actions (module à la demande + lien direct), burger propre, formulaire qui annonce d'emblée qu'il n'envoie rien ; seul le module Zenchef demande un clic de plus.
- Créativité 6 : le diptyque, l'onglet soir/midi et le Samedi surligné donnent une identité ; le reste est un gabarit éditorial correct et prévisible (site « legacy » voulu fidèle à l'original).
- Contenu 8 : tous les faits conformes à `donnees.json` (adresse, tél., 7 jours d'horaires, 67 / 52 / 40 €, +7 / +15 €, Zenchef, Facebook, YouTube, avis Michelin verbatim) ; aucune donnée inventée ; reste quelques phrases du client génériques (N4).
- Technique 9 : 0 erreur, 0 axe, 0 débordement, CLS 0, LCP mobile ≤ 1,6 s, 496 Ko max, JSON-LD, og, 404 ; reste N3.

## Findings
F0 : 0. F1 : 0. F2 : 0. F3 : 6.

### F3 finition
- **N1 · Interligne gonflé dans le chapô de la page contact** (régression de C11) · `src/styles/page.css` (règle `inline-block` + `padding-block` du téléphone, appliquée aussi au lien du chapô contact). Preuve : `contactez-nous/d-01-hero` : deux lignes de chapô à 43 px d'écart (y 159 et 202) ; mesure : `.lead` 21 px / interligne 30,5 px mais hauteur 85 px pour 2 lignes (61 attendus) ; mobile (`m-01-hero`) idem avec un blanc avant la ligne du numéro. Correction : le lien du chapô en `display: inline; padding: 0` (garder l'`inline-block` pour le téléphone de la clôture), ou `vertical-align: baseline` avec `padding-block` en `em` réduit.
- **N2 · Module Zenchef plus large que son cadre** · `reservation-en-ligne.astro`. Preuve : `reservation-en-ligne/x-module.png` (module ouvert) : bordure rouge de l'iframe de x = 58 à 779 pour un cadre de 64 à 773, soit 6 px dehors des deux côtés (non détecté par `overflowX`). Correction : `width: 100%; border: 0; display: block` sur l'iframe et `overflow: clip` sur `.book__frame`.
- **N3 · Tête de la 404 et sitemap** · `src/layouts/Base.astro`. Preuve : `404.html` : `og:url` = `…/legacy/404/` (adresse qui n'existe pas) et JSON-LD `Restaurant` répété ; `dist/…/sitemap-0.xml` et `sitemap-index.xml` générés alors que toutes les pages sont `noindex`. Correction : pas d'`og:url` ni de JSON-LD sur la 404 ; retirer l'intégration sitemap de `astro.config.mjs` (ou assumer).
- **N4 · Phrases du client restées génériques ou répétées** · `index.astro`, `le-menu-des-potes.astro`. Preuve : `home/d-03-scroll` : h2 « Un vrai moment de cuisine » + « une carte soignée, une atmosphère généreuse et propice à la rencontre » (irait sur n'importe quel site) ; `le-menu-des-potes/d-01-hero` : « du lundi au vendredi » trois fois en 80 px (h2, sous-titre, ligne de l'onglet) ; « Home made — Tout est fait ici » renforce « fait maison » (dossier : « Home made (fait maison) »). Correction : h2 « Les chefs au service » ou suppression du h2 et de la phrase « atmosphère généreuse » ; sous-titre du menu « Le soir » seulement ; « Tout est fait maison, dans la cuisine ouverte sur la salle. ».
- **N5 · Légendes qui prêtent une action non prouvée** · `les-potes-au-feu.astro:12-13`. Preuve : `photos/index.json` (16 « Main salant une pièce de viande tranchée sur plaque », 20 « Sauce versée à la cuillère sur un plat à table ») contre « Le geste juste avant l'envoi » et « La sauce se verse devant vous ». Correction : « Une pièce de viande salée sur la plaque. », « La sauce, versée à la cuillère à table. ».
- **N6 · Contact : redondances et civilité par défaut** · `contactez-nous.astro`. Preuve : `contactez-nous/d-03-scroll` et `m-02-scroll` : la privatisation du samedi dit trois fois (tableau, note sous le tableau, option d'objet) ; « TVA BE 0741.540.749, RPM Namur 0741.540.749 » répète le même numéro ; civilité préremplie « Monsieur » (`value` du select) ; note du formulaire (584 px) plus étroite que les champs (709 px). Correction : garder tableau + objet, retirer la note sous le tableau ou le chapô ; « TVA BE 0741.540.749, RPM Namur » ; première option « Civilité (facultatif) » vide ; note en pleine largeur.

## Ce qui est bien (à ne pas casser)
1. Le hero de l'accueil : diptyque plein cadre et filet crème de 4 px, puits crème qui porte titre, offre à 67 € et réservation sans masquer les visages (`home/d-01-hero`, `m-01-hero`).
2. La page menu : numérotation exacte des 4 services, extras sans numéro, prix « 67 € » dans le premier écran, onglet soir/midi opérationnel (midi : 52 € et 40 €, « mercredi et vendredi midi ») et citation Michelin verbatim.
3. La rigueur factuelle et technique : aucun faux avis, formulaire honnête, module Zenchef à la demande avec lien direct, JSON-LD cohérent avec le tableau des horaires, 0 erreur / 0 axe / CLS 0.
