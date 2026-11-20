# ETAT : le-lodge-wepion, variante portfolio, passe construction-1 (phase 1 sur 3)

## Fait
- Gabarit guinguette copié dans `sites/le-lodge-wepion-portfolio/`, matrice et concept dans `DESIGN.md`.
- Contenu : `src/data/site.ts` (+ `carte.json` tiré de donnees.json, `photos.json`), 12 photos WebP (1800 px max) et 12 carrés 640 px, `og.jpg`.
- 7 pages : accueil, carte, tea-room, la maison (avec « Après l'incendie » et presse), terrasse, réservation, 404.
- Composants ajoutés : `Annonce`, `Lieux` ; `Marquee` et `Footer` réécrits (statut fermé, sans horaires).
- Build : `pnpm build:site sites/le-lodge-wepion-portfolio` passe (7 pages), `dist/le-lodge-wepion/portfolio/` écrit, 2,2 Mo.
- Contrôles statiques : noindex, mention Maquette KYW et un seul footer par page, aucun tiret cadratin, un h1 par page.

## Reste (phases 2 et 3)
- Favicon (encore celui du socle), alt/légendes à relire, OG sans texte.
- Mise en page à vérifier en navigateur : hero (titre « Au bord de / la Meuse » sur 2 lignes), bandeau d'annonce en 390 px, nav à 6 liens (960 à 1200 px), cartes `Lieux`, `carte-avis` à 3 cartes, tirages dont 8 portraits recadrés.
- Animations : conservées du gabarit, non vérifiées (scène de tirages, objets saisissables, loader).
- QA complète (shoot, audit, clics d'en-tête, bas de page), sloplint, RAPPORT.md.
- `pnpm index` et commit final avec `[publier]` en fin de restaurant seulement.

## Décisions et hypothèses
- Aucun horaire affiché pour l'accueil provisoire ; les horaires de Wépion sont donnés comme « avant l'incendie » avec la contradiction site / annuaire.
- Accueil provisoire : Wine & More, Chaussée de Marche 496, Erpent, tél. 0496 92 55 13 (fenêtre du site, relevé du 20/11/2026) : à confirmer, sans code postal.
- Avis : 3 extraits Trouve Ton Resto sans date ni auteur ; aucune note reprise.
- Cause de l'incendie non reprise. E-mail hotmail non affiché.
- `placeholder: true` : aucun usage dans ce contenu (tout est tiré du dossier) ; point à confirmer : 160 couverts et ouverture 2008 (annuaire).
- Pas de page à emporter ni de privatisation (non documentées). Page `/emporter/` supprimée, `/tearoom/` ajoutée.

## Pièges
- `pnpm install --offline` échoue (typescript hors cache) mais le build passe sans réinstaller.
- `gabarits/UTILISATION.md` à mettre à jour par l'orchestrateur (gabarits/ protégé) : « guinguette | le-lodge-wepion ».
- Le dossier `sites/le-lodge-wepion-awwwards/` n'est pas de cette passe : non touché.
