# ETAT, philfa-portfolio (phase 1 sur 3, construction-1)

## Fait
- Gabarit guinguette choisi et copié ; DESIGN.md (matrice, art direction, adéquation 78 %).
- Contenu : `src/data/site.ts` + `src/data/carte.json` (carte tirée de donnees.json par jq, prix « 17 € »).
- 5 pages + 404 : accueil, carte, la maison (`/histoire/`), terrasse et salle, réservation/contact. Page « À emporter » supprimée, nav mise à jour.
- Photos WebP + recadrages carrés, OG, favicon, jetons de palette PhilFa.
- Build OK (`scripts/q.sh philfa-build node scripts/build-site.mjs sites/philfa-portfolio`) ; noindex, mention « Maquette KYW » et pied KYW présents.

## Reste (phases 2 et 3)
- QA navigateur : captures desktop/mobile, objets saisissables, table de tirages, marquee, contraste (palette changée : texte encre sur ocre, rose `#a23c5d` sur crème, crème sur olive), clic réel des liens d'en-tête et bas de page 1440.
- Vérifier le débordement des pastilles de prix longues (« 17 € (2 pers.) / 22 € (3-4 pers.) », « 21,50 € (entrée) / 26 € (plat) ») en mobile 320-390.
- Le hero ne montre aucune photo (poster d'objets) : envisager une photo de salle en phase 2 si le rendu est pauvre.
- Slogan « cuisine revisitée, épices du monde » repris du site actuel ; baseline reformulée (à confirmer). RAPPORT.md à écrire.
- Facade 400 px (qualité 2) : tirage petit.

## Décisions et hypothèses
- Aucun avis vérifié : seule la fiche Gault&Millau (12/20, paraphrase) est présentée comme réelle ; 3 cartes d'exemple étiquetées.
- E-mail du site actuel (adresse personnelle) non repris ; formulaire de démonstration renvoie vers Barestho.
- Menu du moment : date inconnue, « change toutes les 6 semaines » repris du PDF.
- `gabarits/UTILISATION.md` (protégé) : ajouter guinguette : philfa.

## Placeholders
Cartes « Exemple d'avis » (3, `avisExemples`). Rien d'autre d'inventé ; équipe sans photo.
