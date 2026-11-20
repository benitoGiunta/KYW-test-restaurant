# DESIGN, Épices & Nous (variante portfolio, gabarit « Velours »)

Phase 1 sur 3 (construction-1) : concept, contenu, pages statiques. Mouvements, QA navigateur et mesures en phases 2 et 3.

## Choix du gabarit

Notes sur 5 (positionnement, ambiance, richesse du contenu, type de carte, réservation, signature). Seuls les gabarits plausibles sont chiffrés ; les autres sont écartés en une ligne.

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| velours | 4 | 4 | 4 | 4 | 4 | 4 | 24 |
| ardoise | 4 | 3 | 3 | 5 | 4 | 3 | 22 (déjà utilisé 3 fois) |
| cahier | 3 | 3 | 4 | 3 | 3 | 3 | 19 |
| quatre-mains | 3 | 3 | 2 | 3 | 3 | 2 | 16 (duo de chefs, non prouvé ici, déjà utilisé) |
| verger | 3 | 3 | 4 | 3 | 3 | 3 | 19 (roue des mois, sans produits d'origine connus) |
| comptoir, nocturne, braise, maree, forno, affiche, collage, guinguette, journee, encre | 1 à 2 | 1 à 3 | 2 à 3 | 2 à 3 | 3 | 1 à 3 | moins de 17 (cuisine, ambiance ou activités sans rapport) |

Décision : **Velours**. Une maison à 13,5/20 Gault&Millau, recommandée au Michelin, tenue par un couple depuis 1999, avec un menu en services numérotés à 52 € et des nombres vrais à monumentaliser (3 services, 52 €, 2 espaces, 1999). Le feutré et le cuivre du gabarit rejoignent le brun taupe et l'orange du logo ; la signature « rideau + chiffre » convient à une maison qui se dévoile par chapitres. Ardoise aurait servi la carte longue, mais le gabarit est le plus utilisé de la collection (UTILISATION.md : le-royal, partage, le-felicien) et son aperçu au survol met les très bonnes photos de plats en retrait.

## Sections

Conservées : hero (photo de table, nom en capitales), bande des guides, chapitre « 3 services », chapitre « 52 euros » (inversé), citation allumée au scrub, onglets à barre, galerie N&B, carte de clôture « depuis 1999 », pages menu, carte, histoire, réservation, 404.
Retirées : « 2 chefs » et portraits (aucune photo de personne, un seul chef prouvé), « Le samedi / privatisation, mariage, chef à domicile » (aucune offre prouvée), bons cadeaux, équipe de salle (Sara et Jordan sans objet), avis (aucun extrait accessible), itinéraire par coordonnées (GPS inconnu).
Ajoutées : chapitre « 2 espaces » (salle avant, verrière, terrasse) et page `/maison/` (remplace `/privatisation/`) ; onglets « Deux espaces et une terrasse » ; page `/carte/` refaite en carte détaillée (4 prix d'appel et trois catégories, relevé du site client) ; page menu en 3 services avec deux propositions par service.
Composants créés : aucun nouveau composant Astro ; bloc CSS `.carte*` (lignes nom / prix / description) et `.menu__option`. Fonction `fourchette()` dans `site.ts` : les fourchettes de prix sont calculées, jamais écrites en dur.

## Direction artistique

- Tokens : `--c-bg` brun café #3a3128 (dérivé du brun taupe #5c5548 du logo), `--c-deep` #17120f, `--c-fg` ivoire #eee6d8 (10,3:1), `--c-muted` orange clair #ecbf85 (7,5:1), `--c-accent` orange du logo #e99b3f (5,6:1 en aplat). Polices inchangées (Boska, Source Serif 4), radius 0, aucun dégradé d'aplat.
- Hero : photo de table dressée et verres (04), sombre et chaude, à la place de la salle du gabarit ; mobile 960 px.
- Galerie N&B : cinq photos de cuisine passées en noir et blanc ; chapitres : biche sur ardoise, sauce versée, verrière.
- Favicon : pastille brun / orange (SVG). OG image : photo de table 1200x630. Logos fournis non repris dans l'en-tête (cercle « É&N », seule rondeur du site, fidèle au gabarit).
- Voix : vouvoiement, copy factuelle tirée du dossier, aucun tiret cadratin.

## Adéquation estimée (phase 1) : environ 75 %

1. Les données prouvées (1999, menu à 52 €, deux espaces, guides) remplissent les quatre chapitres chiffrés sans invention.
2. Palette et ton tirés du logo et des photos sombres chaudes, carte de saison complète lisible.
3. Réservation en ligne et téléphone mis en avant sur chaque page.
Limites : aucune photo de personne ni de terrasse (façade en remplacement), pas d'avis, pas d'e-mail, pas de GPS, boissons inconnues, réservation par lien externe (Wix).
