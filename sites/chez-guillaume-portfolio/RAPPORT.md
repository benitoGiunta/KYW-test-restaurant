# RAPPORT · Chez Guillaume · portfolio (phase 1 de construction, 01/11/2026)

## Placeholders et données à confirmer
- Aucun champ `placeholder: true` dans `src/data/site.ts` : toutes les données affichées viennent de `dossier.md`,
  `donnees.json` ou `photos/index.json`.
- Formulaire de privatisation : démonstration sans envoi (signalé sur la page).
- Fiche « GuiHome » sans photo (sticker « photo à venir ») : aucune photo identifiée dans le dossier.
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

## Leçons structurelles
- Gabarit collage : `Logo.astro`, `Footer.astro`, `Loader.astro` et le h1 du hero supposent un nom en trois mots
  (case vide sinon) ; corrigé dans le site par rendu conditionnel. À reporter dans le gabarit (protégé ici).
- `Agenda.astro` force la variante `-640` de chaque photo : casse sur une photo source de moins de 640 px.
