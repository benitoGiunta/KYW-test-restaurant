# ETAT · terrasses-de-crupet · variante legacy · phase 1 (construction-1)

## Fait
- AUDIT.md, comp.md (c1 choisie), DESIGN.md (Picks, Approche, Thème, Composants, Sur-utilisation).
- Thème Spore, accent cuivre de la marque ; stamp en tête de `src/styles/page.css`.
- Paquet Astro : `src/data/{site.ts,carte.json,menus.json,photos.json}`, composants Nav, Hero, Apropos, Carte (Switcher), Bande, Horaires, Reservation, Job, Pied, Fig ; pages `index` et `404` ; photos du client dans `public/photos/`, PDF de la carte et du menu de fêtes dans `public/`.
- Build OK : `dist/terrasses-de-crupet/legacy/` (index + 404, noindex, KywFooter, mention KYW présents sur les deux).
- sloplint --render (build servi avec base) : 0 FAIL de rendu ; reste FAIL 34 de la lecture des sources (faux positif, `html, body { overflow-x: clip }` existe, rendu sans scroll horizontal à 375), REFLEX 49b (e-mail sur deux lignes à 1024 px), REFLEX 59 (écart de 60 px mesuré entre deux sections, non localisé), WARN F15 (quatre gaps de colonnes), F4 (boutons d'onglet remplis).

## Reste (phases 2 et 3)
- Phase 2 : un reveal (IntersectionObserver), états de nav mobile (les ancres sont masquées sous 1100 px, aucun menu : à ajouter), focus et hover du Switcher à vérifier, QA navigateur (captures 375 / 1440, fold du héros), alt réel des photos, `pnpm index`.
- Phase 3 : sweep, RAPPORT.md, entrée de `.hallmark/log.json` finalisée, `preflight.json`.
- Corriger les restes sloplint ci-dessus.

## Décisions et hypothèses
- Adresse réelle : Rue Basse 13, 5330 Crupet (Assesse) ; l'adresse BCE de restaurants.json (Namur/Naninne) n'est pas utilisée. E-mail : resto@lesterrassesdecrupet.be (site), pas celui de restaurants.json.
- Aucune donnée inventée : pas d'avis ni de note (Restaurant Guru non confirmé), pas d'histoire ni d'équipe ; aucun slot `.fill` ni placeholder nécessaire.
- Carte du 15 octobre (année à confirmer) mentionnée sous le titre ; boissons : sélection partielle du dossier seulement.
- Formulaire d'emploi remplacé par un lien mailto « Candidature ». Bons cadeaux : une phrase (dossier : « s'offre au restaurant »), pas de procédure inventée.
- Hero Index du draw échangé contre Poster (posture d'origine). Pas de commit `[publier]` : phase de test.
- Seul motif d'attention : deux photos 675 × 1200 affichées en grand format peuvent paraître molles (bande, chalet).
