# Revue legacy · Le Servais · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le site Wix turquoise du bar est refait en brutalisme lisible (capitales Anybody étirées, filets épais, photos en bichromie turquoise ou orange, carré orange de repérage), avec la carte en lignes filetées et un statut « ouvert maintenant ».

Scores /10 :
- Design 7 : identité nette et cohérente (encre, crème, turquoise, orange), hiérarchie claire (`planche.png` accueil et carte) ; titres de pages coupés en milieu de mot et pages vides en bas.
- Usabilité 8 : 0 cible < 24 px, Tab 1 = lien d'évitement sur 7 pages, menu 390 px net, statut d'ouverture juste sous horloge (6 cas, fuseau Europe/Brussels).
- Créativité 6 : bichromie et carré orange donnent une signature, mais pages intérieures (contact, carte cadeau, événements) = titre + liste, peu d'idée.
- Contenu 6 : faits et 80 plats conformes à `donnees.json` (carte relue en entier, 0 écart de nom ou de prix), mais « concerts gratuits » attribué au Chalet sans preuve et incohérence sur la cuisine.
- Technique 9 : build OK, 7 pages x 3 largeurs (1440, 390, 360) : 0 erreur console, 0 requête en échec, 0 violation axe, scrollWidth = clientWidth, 177 liens internes 0 mort, LCP mobile accueil 1620 ms, CLS 0, JSON-LD `Restaurant` avec adresse et horaires, 1 seul `h1`, `lang="fr"`, noindex, mention et logo KYW partout.

## Findings

### F1 majeurs
- **F1-1 · Titres `h1` coupés en milieu de mot.** Preuve : captures `/tmp/.../lsv-legacy-r1-planche-m.png` à 390 px : « ÉVÉNEMEN / TS », « PRIVATISAT / ION », « INTROUVAB / LE » ; à 1440 px : « PRIVATISATIO / N » (groupes-privatisation). Cause : `src/styles/base.css:9` (`overflow-wrap: break-word`) + `src/styles/page.css:16` (`clamp(2.5rem, 5vw, 5rem)`) avec `font-stretch` large. Correction : réduire le `h1` des pages intérieures (ex. `clamp(1.75rem, 7vw, 4rem)` ou `font-stretch` plus étroit sous 40 rem), `overflow-wrap: normal` ; vérifier à 360, 390, 768 et 1440 px sur événements, groupes et privatisation, page introuvable. Les mots les plus longs sont « PRIVATISATION » et « ÉVÉNEMENTS ».
- **F1-2 · T-invente : « concerts gratuits » dans le Chalet du Servais.** `src/pages/evenements.astro:19` : « vin chaud, bulles, tartiflette, concerts gratuits, terrasse couverte et chalet chauffé ». Le post Chalet de `site-actuel/page.html` dit « ambiance après-ski, musique et spécialités de Noël … vin chaud, bulles, tartiflette, musique » ; les « concerts gratuits » viennent d'un autre post (Sonic Vibes, dates 25/09 à 20/11, hors Chalet). Correction : remplacer par « musique » ; ajouter aussi « Du 27 novembre au 31 décembre » avec année absente du dossier : laisser tel quel mais ne rien ajouter.

### F2 mineurs
- **F2-1 · Contradiction sur la cuisine.** Accueil, carte, contact : « Dès 9 h, la cuisine reste ouverte non stop. » juste au-dessus de « Cuisine : 11 h 30 à 22 h 00 … Petit-déjeuner le samedi et le dimanche, de 9 h 30 à 11 h 30 » (`donnees.json` : `horaires_cuisine`). Correction : « Le bar ouvre dès 9 h, la cuisine est ouverte sans interruption de 11 h 30 à 22 h 00 » ou supprimer la phrase.
- **F2-2 · Pages vides ou sous-remplies.** `carte-cadeau` : un titre, un bouton, une boîte « à confirmer » puis 330 px d'encre vide au 1440 (planche `lsv-legacy-r1-planche-d.png`) ; `evenements` : trou de ~140 px (1440) et ~100 px (390) entre le chapeau « Ce qui se prépare au Servais. » et le premier filet ; `contact` : moitié droite du haut vide à 1440 px. Correction : réduire la hauteur minimale des en-têtes de page (`page.css`, bloc d'en-tête) et placer la photo de la terrasse (déjà dans `public/photos/terrasse-*`) sur contact ou carte cadeau.
- **F2-3 · Contenu hérité du Wix, générique.** Accueil, bloc « Au départ du téléphérique » : « l'endroit idéal pour se retrouver entre amis, célébrer les petites et grandes occasions … les meilleurs souvenirs se créent au fil de la journée » (deux phrases qui iraient à n'importe quel bar, sans fait du dossier). Correction : remplacer par les faits du dossier (ouvert 7/7 dès 9 h, petits-déjeuners le week-end, cocktails 3+1, Verrière).
- **F2-4 · Faux positifs du QA à ne pas corriger.** 10 WARN `audit.mjs` : 7 sont des lignes de tableau d'horaires répétées ; « pas de robots.txt / sitemap » est faux (`dist/le-servais/legacy/robots.txt`, `sitemap-index.xml` existent) ; « 404 sans h1 » et axe `document-title` / `html-has-lang` sont la réponse brute de `serve.mjs` : le vrai `404.html` a `lang`, `title`, `h1`, 0 violation axe. Le QA n'a capturé que 3 pages sur 7 : les 4 autres relues ici (captures ciblées 1440 et 390 px).

### F3 finitions
- **F3-1** `carte` : « supplément bacon 3.00 » (Œufs au plat, Toast œufs brouillés) garde le point décimal du JSON : écrire « supplément bacon 3 € ». Même ligne : « 6 mini » (Spycroc) contre « Six mini » (accueil) : harmoniser.
- **F3-2** `carte` : Margarita « 25 € » affiché à côté de « prix à confirmer » ; afficher le prix en `à confirmer` ou le retirer (dossier : prix ambigu).
- **F3-3** Statut d'ouverture entre minuit et l'heure de fermeture (ex. mardi 00 h 30) : « Ouvert maintenant, jusqu'à 1 h 00 » est juste mais la ligne surlignée est « Mardi », alors que le service est celui de lundi ; surligner le jour du service en cours.
- **F3-4** Téléphone `081 73 65 52` affiché sans réserve alors que le dossier note un second numéro (+32 492 93 87 96) à confirmer ; déjà dans RAPPORT.md § 5, ajouter la mention dans le site ou la garder en réserve client.
- **F3-5** `groupes-privatisation` : la photo de la Verrière est légendée « Photo d'illustration, à remplacer par celle de la Verrière » : correct, à conserver tant que l'origine n'est pas confirmée.

## Ce qui est bien (à ne pas casser)
1. La carte : 80 plats en lignes filetées, prix alignés à droite, prix multiples repliés sous 40 rem (mobile 390 net, `m-02` à `m-04` de la carte), liens PDF conservés.
2. Statut « Ouvert maintenant / Fermé » calculé en fuseau Europe/Brussels, juste sur les 6 horloges testées (ouverture, passage minuit, fermeture à 1 h, 2 h le samedi).
3. Technique propre : menu mobile en deux boutons (Réserver, Menu), liens d'évitement, 3 polices, photos en webp avec `srcset`, héros 249 Ko au plus, LCP 1,6 s mobile throttled, pied KYW avec un seul logo.
