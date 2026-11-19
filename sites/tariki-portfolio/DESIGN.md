# DESIGN, Tariki (variante portfolio, gabarit « Braise »)

## Choix du gabarit

Notes sur 5 (positionnement, ambiance, richesse du contenu, carte, réservation, signature). Lecture des FICHE de braise, nocturne, velours, encre, cahier, collage, comptoir, guinguette, journée, quatre-mains ; les autres gabarits écartés d'emblée (asiatique, gastronomique, italien, bar).

| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Signature | Total |
|---|---|---|---|---|---|---|
| braise | 5 (le feu est le sujet) | 5 | 3 (peu de photos) | 4 (carte courte) | 4 (température du feu) | 21 |
| nocturne | 3 | 4 | 1 (mosaïque de 12 photos) | 3 | 2 | 13 |
| guinguette | 2 | 2 | 3 | 3 | 2 | 12 |
| journée | 2 | 3 | 2 | 3 | 2 | 12 |
| cahier | 2 | 2 | 2 | 3 | 2 | 11 |
| velours, comptoir, encre | 1 | 1 | 2 | 2 | 1 | 7 |

Décision : **braise**, déjà reçu par grill-des-amis (`gabarits/UTILISATION.md`) mais aucun autre gabarit n'approche l'adéquation : Tariki est « cuisine levantine au feu de bois », grillades au charbon et à flamme ouverte. Le fil du gabarit (une soirée au feu, la température descend de 900 à 20 °C) est le récit du restaurant. Nocturne, seul rival sombre, exige 12 photos de lieu et le dossier n'en a aucune.

## Sections

- Conservées : hero (nom, baseline, pastille ouvert/fermé), manifeste, chapitre « cuisson » (signature), carte du soir (liste index), ambiance, bande marquee, pratique, pied de page finale, pages carte, histoire, réservation, 404.
- Retirées (aucune matière dans le dossier) : « Les mains » et l'équipe, avis, mur de 5 photos de salle, page privatisation, bon cadeau, plan schématique, coordonnées GPS (champ `geo` rendu optionnel).
- Remplacées : « Les mains » devient « Le chemin » (Syrie, Liban, Turquie, Grèce, Belgique, source : site du client) ; la bande d'avis devient une bande des cinq étapes de la route ; la page « Les potes » devient « Le chemin » avec la route étape par étape et les trois valeurs ; la ligne de presse (Moustique, 11/09/2026) est un fait cité sans extrait.
- Ajoutées : filtre midi / soir déjà fourni par la carte, utilisé pour les 5 rubriques (mezzés, partager, feu de bois, accompagnements et desserts, midi), carte « Formule midi » et « Le début du voyage » (à confirmer).

## Composants créés

- Illustration vectorielle du plat (4 couches 1200 px par `scripts/couches.mjs` : assiette, poulet grillé, légumes grillés, toum et sauce) : le gabarit découpe une photo de plat, le dossier n'en a pas. Marquée illustrative dans le texte, l'`aria-label` et le colophon.
- `scripts/photos.mjs` : WebP des visuels du client.

## Art direction

- Accent : le doré du logo (`#e0a458` sur fond sombre ; foncé `#7a5010` sur ivoire, à revalider au contraste) à la place du rouge-orange du gabarit ; le braise `#e8632c` reste en `--c-braise` pour les touches de feu.
- Typographie : Melodrama (titrage) et Literata inchangées, proches de la serif à fort empattement du logo. Le logo (calligraphie arabe) n'est pas repris en CSS : OG image = braises assombries + logo ; favicon = flamme dorée.
- Photos : braises en hero (1800 px), feu de camp en portrait duotone, arcades en bandeau ; les deux dernières marquées `placeholder: true` (banque d'images ou rendu IA probables).
- Pastille ouvert/fermé corrigée : heure Europe/Brussels (le gabarit lisait l'heure du visiteur).

## Adéquation estimée : 72 %

Raisons : (1) le concept du gabarit coïncide avec l'identité du restaurant ; (2) la carte est transcrite en entier avec prix, horaires et téléphone réels ; (3) le ton de la copie reste sur des faits prouvés.

Limites : aucune photo de plat ni de salle (hero et ambiance portent sur des visuels génériques), pas d'équipe ni d'avis, adresse du site (rue de l'Ouvrage 2) différente de la BCE (rue du Pont 15, c'est Bayti), carte du soir en deux versions de prix, module de réservation non intégrable (lien vers le site actuel).
