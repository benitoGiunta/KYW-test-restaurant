# DESIGN — El Greco, variante portfolio (gabarit « Guinguette » adapté)

## Choix du gabarit
Notes /5 (positionnement, ambiance, contenu disponible, type de carte, réservation, signature). Seuls les gabarits non utilisés ou plausibles sont notés ; fiches `FICHE.md` lues partiellement (sobriété).

| Gabarit | Pos. | Amb. | Contenu | Carte | Résa | Signature | Total |
|---|---|---|---|---|---|---|---|
| guinguette | 5 | 4 | 4 | 4 | 3 | 4 | 24 |
| maree (déjà utilisé : huile-sur-le-feu) | 4 | 5 | 2 (exige photos d'eau) | 3 | 3 | 3 | 20 |
| journee (6 moments du jour, horaires inconnus) | 3 | 3 | 2 | 3 | 3 | 3 | 17 |

Décision : **guinguette** (non encore attribué). Brasserie familiale à terrasse, carte longue et conviviale, et surtout un site fondé sur des **objets dessinés au trait**, ce qui compense l'absence totale de photos du restaurant (3 photos de stock + logo).

## Concept
Une table de taverne grecque : on y attrape une amphore, une branche d'olivier, une brochette, un verre, un citron. Verbe de motion : rebondit (hero et boutons) ; la signature « La table » (tirages + objets saisissables, GSAP Draggable) est conservée telle quelle.

## Adaptation de la direction artistique
- Palette (noms de jetons hérités, valeurs changées) : chaux `#F4F0E6` (fond), bleu ciel `#7FB3E6` (surfaces, bandeau, texte encre dessus), bleu cobalt `#0D5BA8` (texte grand corps, traits), bleu marine `#0E3F7A` (bandes et pied de page, texte chaux dessus), ocre miel `#F2D27A` (badges), encre `#1F1A17`.
- Typo inchangée (Zodiak + Satoshi) ; le logo manuscrit (489 px, `public/photos/logo.png`) n'est pas affiché en grand (trop petit).
- Objets au trait ajoutés dans `Objet.astro` : amphore, brochette, branche d'olivier (même viewBox et trait). Parasol, verre, bouteille, citron, fourchette, frites conservés (frites : menus enfant).
- Favicon et OG redessinés (bleu marine, coupole bleue de stock).

## Sections
- Conservées : marquee d'état (ouvert/fermé calculé), hero poster (titre « Saveurs grecques », repris du site actuel), la maison, la table (signature), menu (extrait : entrées chaudes, spécialités, grillades), avis, manifeste, horaires, pied de page, 404.
- Pages : accueil, `/carte/` (carte complète réelle, 12 catégories, 62 lignes, séparée « À table » / « À boire »), `/histoire/` (la maison), `/reservation/` (téléphone, e-mail, horaires, adresse), 404.
- Retirées (aucune matière au dossier) : équipe, page terrasse, page à emporter, formules/menus, formulaire de démonstration, avis d'exemple.
- Ajoutées : ligne de notes d'avis sourcées (Tripadvisor 4,0/5 sur 121 avis ; Trouve Ton Resto 4,3/5 sur 5 avis), carte « À boire » (cocktails, apéritifs, vins grecs, bières).

## Données et placeholders
- Réel : adresse, GPS, téléphone, e-mail, carte et prix, réseaux, 4 avis positifs cités (Trustindex, sans nom), « depuis 1986 » (site du client).
- Placeholder : les 7 photos (stock Cyclades, légendes « photo de stock »), le slogan « à partager, comme à la maison » (copy proposée, marquée « exemple »), horaires jeudi à dimanche « à confirmer » (annuaire), horaires lundi à mercredi inconnus (affichés « à confirmer »), mention terrasse « à confirmer ».
- Non montrés : avis négatifs (signalés dans le dossier ; à arbitrer par la revue), changement de propriétaire (à confirmer), équipe, chef.

## Test de généricité
Un modèle ferait un site bleu et blanc avec des photos de Santorin. Ici les photos de stock sont étiquetées comme telles, et l'identité vient des objets dessinés à saisir (amphore, olivier, brochette) autour d'une carte réelle complète.

## Taux d'adéquation estimé : 62 %
1. Positionnement et carte réels très bien servis (carte entière, prix, boissons grecques).
2. Ambiance familiale et conviviale du gabarit cohérente avec « traditions familiales » et accueil de la patronne.
3. Signature (objets à attraper) fonctionne sans photos.
Limites : aucune photo du restaurant (−20 pts), horaires incomplets, pas de réservation en ligne, logo trop petit pour un usage visuel.
