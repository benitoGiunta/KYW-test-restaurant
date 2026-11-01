# RAPPORT · Chez Guillaume · portfolio (construction phases 1 à 3, 01/11/2026)

## Placeholders et données à confirmer
- Aucun champ `placeholder: true` dans `src/data/site.ts` : toutes les données affichées viennent de `dossier.md`,
  `donnees.json` ou `photos/index.json`.
- Formulaire de privatisation : prépare un e-mail (`mailto:` vers hello@chezguillaume.be), aucun envoi serveur.
- Fiche « GuiHome » sans photo (sticker « photo à venir ») : aucune photo identifiée dans le dossier.
- Fiche « En cuisine » (ex-« Notre cheffe ») : la photo montre une cuisinière dont l'identité n'est pas établie
  (`photos/index.json`), la légende ne l'identifie plus.
- À confirmer par le client : nom de la cheffe actuelle (le récit cite Tamara Truyts « à l'ouverture, ELLE.be, janvier
  2025 ») ; horaires (FAQ lun-sam 18h-00h, dim 10h-18h, retenus par le dossier) ; heure du lundi (18:00 = ouverture des
  portes) ; coordonnées GPS (non géocodées : JSON-LD sans `geo`, itinéraire par recherche d'adresse).
- Menus : relevé d'octobre 2026 (ils changent chaque mois).

## Shoot / audit
Non faits en phase 1 (consigne : pas de QA navigateur). Contrôles faits : build OK (7 pages), `noindex`, mention
« Maquette KYW, certaines données sont illustratives » et `kyw-signature` présents sur les 7 pages, tous les assets
référencés dans `dist/` existent, aucun reste du gabarit (grep Potes, MICHELIN, Zenchef, quatre mains, Meuse).

## Points ouverts
Voir ETAT.md (phases 2 et 3).

## Phase 2 (01/11/2026)
Contrôles scriptés sans erreur sur 7 pages (console, clics d'en-tête, bas de page KYW, débordements 320/360/390,
reduced motion) ; détail dans ETAT.md. Shoot et audit complets : agent « captures ».

## Phase 3 · QA (01/11/2026)
L'agent « captures » n'a shooté que l'accueil (shoot interrompu après 5 min, pas d'audit). Complété par :
- **Audit** (`audit.mjs`, serveur 4473) : **0 FAIL, 14 WARN**. WARN : horaires répétés (tableau d'horaires de la
  section « Pour venir » + pied de page, mer-sam identiques) ; dessert identique dans deux menus (donnée réelle,
  `donnees.json`) ; 404 sans h1 / robots / sitemap = faux positifs connus sous `base` (la 404 du site a un h1 « Décollé »).
- **Captures ciblées** (script maison, 6 pages hors accueil, 1440 et 390, pleine page) : 0 erreur console, 0 requête
  en échec, `scrollWidth` = largeur partout, h1, `noindex, nofollow`, mention et pied KYW présents sur 7 pages.
  Accueil : planche des captures de l'agent (desktop d-00 à d-07) sans défaut.
- **Corrigé** : réservation, bloc « Horaires / Adresse / contact » sous la photo du bar masqué par la section FAQ
  (l'image prenait `height: 100%` de la colonne, le texte débordait dessous) → `.damier__photo--infos` en colonne
  flex, image `flex: 1 1 18rem`. Vérifié par mesure (bas du bloc 1021 px < haut FAQ 1379 px à 1440 ; 1785 < 2056 à 390)
  et capture ciblée.
- **Corrigé** : fiche « Notre cheffe » renommée « En cuisine » (identité de la cuisinière photographiée non établie).
- Artefacts vus et écartés : en-tête et lien d'évitement au milieu des captures pleine page (en-tête fixe), absents
  en capture de fenêtre (404 vérifiée).

## Leçons structurelles
- Gabarit collage : la case d'activité du logo ne s'affiche jamais sur une page dédiée (`page-hero` plus court que
  45 % du viewport, le ScrollTrigger `top 45%`/`bottom 45%` ne s'active pas) ; poser la case d'office pour un `.page-hero`.
- Gabarit collage : `Logo.astro`, `Footer.astro`, `Loader.astro` et le h1 du hero supposent un nom en trois mots
  (case vide sinon) ; corrigé dans le site par rendu conditionnel. À reporter dans le gabarit (protégé ici).
- `Agenda.astro` force la variante `-640` de chaque photo : casse sur une photo source de moins de 640 px.
- Gabarit collage : `.damier__photo img { height: 100% }` suppose une photo seule dans la case ; tout contenu ajouté
  sous l'image déborde et passe sous la section suivante (invisible en capture de fenêtre du haut).
