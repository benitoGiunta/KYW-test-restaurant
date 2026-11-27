# ETAT : ne5t · awwwards · construction-1

## Fait
- DESIGN.md : brief, 3 concepts (choix : « Première impression »), Concept Card, palette, typo, grille, plan de composition, checklist 1 à 18.
- Scaffold Astro 5 (engine verbatim copié d'un site frère, sans GL ni loader), tokens, Base (head, JSON-LD sans heures), Header, Footer (« Dernière impression » + KywFooter), Photo.
- Contenu `src/data/site.ts`, `src/lib/photos.ts` (15 photos du client, alt d'après photos/index.json).
- 5 pages statiques : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404. Build OK (`pnpm build:site sites/ne5t-awwwards`), mesure du hero à 4 tailles et débordement horizontal à 0 sur 5 pages.

## Reste (phases 2 et 3)
- Signature : impression typographique (SplitText deux temps), reveals, hovers déjà en CSS, rideau déjà branché.
- Retirer Boska 700 (inutilisée), composer l'OG, relire captures desktop et mobile, audit axe, clavier, LCP.
- RAPPORT.md (aucun fichier encore) ; vérifier le contraste du texte d'index sur nappe.
- `ailes.jpg` pèse 520 Ko à la source (plafond 500) : à recompresser.

## Décisions et pièges
- Adresse : Avenue Vauban 46 (site client) ; restaurants.json dit Allée de Menton 26 : à confirmer par le client.
- Heures de service inconnues : jours seulement, pas d'openingHoursSpecification, mention « à confirmer par téléphone ».
- Aucun prix de plat (formules seulement), aucun avis, presse ni distinction. Couple de la cour et chef du service non nommés.
- Placeholders : jours « Lundi, mardi : fermé » (à confirmer), phrase « le lundi et le mardi, la maison se repose » (fait 'jours', `placeholder: true`), « Parking et accès : à confirmer », attribution des intérieurs à « Christine Gersdorff » (nom de famille déduit de l'époux, `placeholder: true`).
- Pas de page par plat ; le menu est celui du mois, sans date en dur.
- Piège : hook de lecture (cat > 80 lignes refusé) ; engine copié depuis `sites/atelier-de-bossime-awwwards/src/engine/` (identique à engine.md).
