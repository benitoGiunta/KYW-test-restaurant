# DESIGN : La Bergerie de Lives, variante portfolio (gabarit « Velours »)

## Requalification (hypothèse retenue)
Le dossier (27/11/2026) constate que La Bergerie de Lives n'est pas un restaurant : maison d'hôtes, domaine de mariage,
séminaires. Aucune carte, aucun horaire de service. La maquette est donc un site de maison d'hôtes et de domaine
d'événements ; schema.org passe de `Restaurant` à `LodgingBusiness`.

## Choix du gabarit (notes sur 5)
| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Réservation | Signature | Total |
|---|---|---|---|---|---|---|---|
| velours | 3 | 4 | 5 (25 photos, nombres vrais) | 5 (pas de carte requise) | 4 (visite, téléphone) | 5 (chiffres + rideau) | **26** |
| guinguette | 1 | 2 | 3 | 1 | 2 | 2 | 11 |
| cahier | 2 | 2 | 3 | 1 | 2 | 3 | 13 |
| journee | 1 | 3 | 2 | 1 | 2 | 3 | 12 |
| collage | 2 | 2 | 3 | 1 | 3 | 3 | 14 |
Gabarits déjà utilisés (verger, ardoise, braise, nocturne, encre, maree, comptoir, forno, quatre-mains, affiche) écartés.
Décision : **velours**. Il ne dépend ni d'une carte ni d'un chef ; ses chapitres à nombre monumental valorisent des faits
prouvés (un weekend, trois espaces de détente, 20 €, 30 minutes, 2017) ; ses onglets conviennent à mariage / séminaire /
événement privé ; son ton feutré et posé est celui d'un lieu de cérémonie. Limite : esprit « table gastronomique », atténué
par la palette et le vocabulaire.

## Concept
Chaque chapitre est un rideau vert sapin qui se lève sur un nombre rose poudré à cheval sur une photo. Le nombre est un fait
du dossier, jamais inventé. Métaphore : le rideau qui s'ouvre sur le jour de la cérémonie. Verbe : « se dévoile ».

## Sections
- Conservées : hero (façade), bande presse (en place des guides), chapitres à chiffre, citation à mots allumés, onglets,
  galerie noir et blanc, carte de clôture, pages intérieures (HeroPage + offres alternées), 404.
- Retirées : menu, carte, équipe/chefs, distinctions Michelin, horaires de service, réservation en ligne, avis (aucun donné).
- Ajoutées : pages Chambres, Mariage, Séminaires, Le domaine, Contact ; chapitres « weekend », « détente », « piscine 20 € »,
  « visite 30 min » ; galerie de trois tirages (`.galerie-page`) sur la page Mariage.
- Citation de l'accueil : phrase tirée du site actuel (« ce moment passe trop vite… »), paraphrasée, source indiquée.

## Art direction
Accent cuivre remplacé par un rose poudré (`#d9a597`, texte clair `#efcfc4`) tiré des roses des photos, sur vert sapin
conservé (jardin). Typographie du gabarit inchangée (Boska, Source Serif 4). Favicon : monogramme BL. OG : façade en 1200x630.
Photos : 25 du dossier converties en WebP (<= 1800 px), 5 passées en noir et blanc pour la galerie. Logo bélier source de
109 px : non utilisé (trop petit), cercle monogramme « BL » à la place.

## Adéquation estimée : 70 %
1. Chiffres vrais et photos de cérémonie, véranda, piscine bien servis par le rideau et le nombre monumental.
2. Onglets Mariage / Séminaire / Événement privé adaptés au modèle d'affaires réel.
3. Ton feutré cohérent avec un domaine de mariage.
Limites : ni tarifs, ni nombre de chambres, ni capacité confirmée, ni avis, ni réseaux, ni horaires d'accueil ; gabarit conçu
pour la gastronomie ; Booking (~8,9/10, ~575 avis) non affiché car non confirmé.
