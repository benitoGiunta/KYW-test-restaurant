# Revue legacy · Le Servais · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : le site Wix turquoise du bar refait en brutalisme lisible (capitales Anybody étirées, filets épais, photos en bichromie turquoise ou orange, carré orange de repérage), carte en lignes filetées et statut « ouvert maintenant » calculé.

Fraîcheur : `dist/` (08:30) postérieur à `src/` et `public/` (`find -newer` vide), `QA-revue2.md` (08:38) postérieur au `dist/` : captures du QA réutilisées ; mesures complémentaires par script maison (serveur propre sur le port 4871, PID tué en fin de passe).

Scores /10 :
- Design 8 : titres de page désormais entiers et lisibles (planches `lsv2-pl-1440.png` et `lsv2-pl-390.png` : 4 pages intérieures), photo terrasse sur contact et carte cadeau, identité cohérente ; la carte cadeau reste mince.
- Usabilité 8 : 0 cible < 24 px sur 7 pages x 5 largeurs, menu « Menu / Réserver » à 390 px, clavier propre au QA (12 stops, 0 piège) ; deux liens secondaires absents de la barre entre 60 et 75 rem (F3).
- Créativité 6 : signature bichromie plus carré orange conservée, mais pages intérieures restent « titre + liste ».
- Contenu 8 : « concerts gratuits » et « non stop » retirés, bloc Lieu réécrit avec des faits du dossier (7/7 dès 9 h, 3 + 1 de 18 h à 20 h, bières pression, Verrière), 0 tiret cadratin, 0 tutoiement, 0 apostrophe droite, 0 espace manquant avant « h ».
- Technique 9 : build OK (QA, exit 0), 7 pages x 5 largeurs (1440, 1024, 768, 390, 360) : 0 erreur console, 0 requête en échec, 0 violation axe, `scrollWidth` = `clientWidth`, 77 liens internes distincts 0 mort, 1 seul `h1` par page, `lang="fr"`, `noindex`, mention KYW et logo (IMG 110 px, chargé) sur 7 pages, JSON-LD présent ; LCP mobile 1628 ms accueil, CLS 0 (QA).

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | vérifié |
|---|---|---|
| F1-1 | h1 `clamp(1.6rem, 7.2vw, 4rem)` sous 48 rem, `overflow-wrap: normal` | OUI : `page.css:16-17` ; 7 pages x 5 largeurs, 0 mot coupé (test des rectangles de chaque mot), rapport mot/boîte du h1 ≤ 0,89 à 360 et 390 px, ≤ 0,62 à 768 px ; captures 390 px : « GROUPES ET / PRIVATISATION », « ÉVÉNEMENTS » entiers |
| F1-2 | « concerts gratuits » retiré | OUI : 0 occurrence dans les 7 pages de `dist/` ; texte Chalet = « ambiance after ski, musique et spécialités de Noël … vin chaud, bulles, tartiflette, terrasse couverte et chalet chauffé » |
| F2-1 | contradiction cuisine levée | OUI : « Le bar ouvre dès 9 h, la cuisine est ouverte sans interruption de 11 h 30 à 22 h. » (accueil, contact) ; 0 « non stop » ; `donnees.json` : cuisine 11:30-22:00 |
| F2-2 | pages sous-remplies | OUI en grande partie : photo terrasse (alt « La terrasse devant… », conforme au `sujet` de `photos/index.json`) en colonne droite de carte cadeau et contact ; en-tête d'événements resserré (plus de trou entre chapeau et premier filet) ; reste un vide d'environ 140 px entre la photo et la mention « Montants et durée de validité » de la carte cadeau à 1440 px (F3-6) |
| F2-3 | Lieu : faits du dossier | OUI : « ouvert 7 jours sur 7, dès 9 h », petit-déjeuner week-end, 3 + 1 de 18 h à 20 h, bières pression (menu Bar du dossier), Verrière ; plus de phrase générique |
| F2-4 | refusé (faux positifs) | Accord : `robots.txt` et `sitemap-index.xml` existent dans `dist/le-servais/legacy/`, `404.html` réel a `lang`, `title`, `h1`, 0 violation axe |

## Findings
Aucun F0, F1 ni F2. Restent des finitions, non bloquantes :
- **F3-1** `carte` : « supplément bacon 3.00 » garde le point décimal (écrire « 3 € ») ; « 6 mini » (Spycroc) contre « Six mini » (accueil). Non traité en révision 1 (F3 hors périmètre).
- **F3-2** `carte` : Margarita « 25 € » affiché à côté de « prix à confirmer » ; afficher « à confirmer » seul.
- **F3-3** Statut d'ouverture après minuit : la ligne surlignée est le jour civil, pas le jour du service en cours (mardi 0 h 30 = service du lundi).
- **F3-4** Téléphone `081 73 65 52` sans réserve alors que le dossier note un second numéro à confirmer (déjà dans RAPPORT.md § 5).
- **F3-5** (nouveau) Entre 60 et 75 rem (ex. 1024 px) les liens « Groupes et privatisation » et « Carte cadeau » disparaissent de la barre sans être dans le menu (`page.css:58-59`, `.nav__second`) ; ils restent atteignables par le pied de page et les boutons de l'accueil. Correction : les garder dans la barre dès 60 rem en réduisant l'espacement, ou afficher le bouton « Menu » dès 75 rem.
- **F3-6** (nouveau) Carte cadeau à 1440 px : page encore mince (titre, bouton, photo, mention), vide d'environ 140 px sous la photo avant le bloc « à confirmer ».
- **F3-7** (nouveau) `groupes-privatisation` à 1024 et 1440 px : « PRIVATISATION » dépasse de 7 à 13 % la boîte du `h1` (805 px pour 752 px à 1440 px) sans toucher la photo ni déborder de la page (captures `lsv2-gp-1440.png`, `lsv2-gp-1024.png`) ; à surveiller si la colonne de texte rétrécit.

## Ce qui est bien (à ne pas casser)
1. Les `h1` des pages intérieures : entiers à 360, 390, 768, 1024 et 1440 px, hiérarchie nette avec le chapeau.
2. La carte (80 plats en lignes filetées, prix repliés sous 40 rem) et le statut d'ouverture calculé en fuseau Europe/Brussels.
3. La technique : 0 erreur, 0 violation axe, 77 liens vivants, pied KYW avec un seul logo, mention et `noindex` sur chaque page.
