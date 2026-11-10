# Le Servais, variante portfolio (gabarit « Journée » adapté)

## Choix du gabarit

Notes sur 5 (positionnement, ambiance, richesse du contenu, carte, réservation, signature). Seuls les candidats sérieux sont notés ; les autres gabarits sont écartés d'emblée (gastronomique : velours, encre ; mer : maree ; familial dessiné : guinguette ; pizza : forno, affiche ; histoire d'un lieu : quatre-mains, cahier).

| Gabarit | Positionnement | Ambiance | Contenu | Carte | Signature | Total |
|---|---|---|---|---|---|---|
| journee | 5 (bar-brasserie 7/7, du matin à 1h) | 4 | 4 | 5 (carte longue par moments) | 5 (cadran 9h à 23h = la vraie amplitude) | 23 |
| nocturne | 3 (cité par sa fiche pour le-servais) | 3 (aucune photo de jour, or 3 photos sur 5 sont de jour) | 3 | 3 | 3 | 15 |
| ardoise | 4 | 3 | 4 | 4 (MIDI / SOIR) | 3 | 18 |
| comptoir | 3 | 3 | 3 | 3 | 3 | 15 |
| collage | 3 | 4 | 2 (4 photos) | 3 | 3 | 15 |

Décision : **Journée**, jamais attribué à un autre restaurant. Le Servais ouvre à 9h et ferme à 1h ou 2h : petit-déjeuner, déjeuner, sharing, cocktails 3+1 de 18h à 20h, dîner, dernier verre. Les six moments du gabarit tombent sur des offres réelles du dossier. Nocturne, pourtant listé dans sa fiche, force à cacher les photos de jour (terrasse, petit-déjeuner, Verrière).

## Concept

Le site est la journée du bar. Un ciel change du matin à la nuit au scroll, le badge « ouvert jusqu'à 1:00 » est calculé sur les horaires réels (fermeture après minuit gérée), la frise va de 9h à 23h. Le nom en cadran, six chips de moments.

## Sections

- Conservées : hero cadran, split du matin (9h), médaillons (11h30, deux au lieu de trois : seulement deux photos de plat), bande de cartes (18h, cocktails), dîner en paire, dernier verre + horaires à flèches, pied de page finale, 404.
- Ajoutées : 16h « À partager » (split photo à gauche), composant `Lignes.astro` (factorise les lignes de carte), pages `groupes` (Verrière, privatisation, formules de groupe réelles, carte cadeau), `maison` (producteurs cités, presse RTBF, résumé d'un avis Tripadvisor).
- Remplacées : `brunch` devient `petit-dejeuner` (offre réelle du week-end), `histoire` devient `maison` (pas d'équipe ni d'histoire détaillée connues : aucune section équipe).
- Retirées : plats de la semaine illustratifs, menu dégustation, avis et équipe d'exemple.
- `carte` : neuf rubriques complètes (petit-déjeuner, sharing, brasserie, enfants, desserts, cocktails, bières, café) avec prix du PDF.

## Art direction

- Palette : ciel du jour conservé (ivoire, ocre, soleil ambre), nuit virée du bleu marine au turquoise sombre (#0f2d32, #1a4a50, #081c1f) pour faire écho au turquoise du site actuel et de la tasse du petit-déjeuner. L'ambre répond au cuir orange de la Verrière et au bois du comptoir.
- Typographie : Bricolage Grotesque (titres) et Rethink Sans conservées. Le site actuel est en condensé majuscule : option phase 2 si le temps le permet.
- Photos : 5 originales recadrées par `sharp` en 12 WebP (comptoir, détail du bar, terrasse, petit-déjeuner, tasse, jus, spaghetti, bière, Verrière). Aucune photo libre ajoutée. Photo de la Verrière marquée « illustratif » (origine à confirmer, préfixe de bibliothèque Wix).
- Favicon : monogramme LS (png du logo) ; OG : recadrage du comptoir.

## Taux d'adéquation estimé : 82 %

1. Les six moments correspondent à l'offre réelle et aux horaires 9h à 1h (la signature a un sens).
2. Carte et prix 100 % issus du dossier, producteurs locaux cités.
3. Photos réelles de jour comme de soir, palette turquoise et ambre cohérente avec l'identité.

Limites : seulement 4 photos propres (recadrages répétés), pas d'équipe ni d'histoire, pas de GPS (lien d'itinéraire par adresse), téléphone à confirmer, police condensée du client non reprise, pas de photo de cocktail.
