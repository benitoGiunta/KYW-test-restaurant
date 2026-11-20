# Audit Hallmark · PhilFa · 2026-11-20

Source : https://www.philfa.be (HTML sauvegardé `data/restaurants/philfa/site-actuel/page.html`, captures desktop et mobile), rendu par sloplint `--render --before`. Genre inféré : editorial (brasserie de centre-ville, réservation en ligne).

## Lecture en quatre lignes
1. Pour : réserver une table (Barestho) et trouver horaires, adresse, téléphone ; action unique : réserver.
2. Reste : l'identité olive et or du logo, les photos de salle (ocres, rose, plantes), l'ordre one-page, la réservation, les PDF carte et menu, le bon cadeau.
3. Se lit généré : 7a/7b (noir et blanc purs), 48 (littéraux couleur), 58 (124 mots sur un écran), 63 (flèches collées « Réservation → »), 67 (capitales), 77-79 (écrans fins, accroche illisible).
4. Cassé : accroche du hero grise sur photo, bague de focus à 1,46:1, coquilles (« eut », « etabli », « récompensé »), carte et menu seulement en PDF, aucune photo de plat.

## Structure d'origine
One-page Duda : hero plein écran (photo de salle sombre, logo, bouton Réservation), À propos de nous, Nos services (terrasse, air conditionné), Contactez-nous (adresse, téléphone, e-mail, horaires, carte Mapbox). Boutons Carte et Menu (PDF), Bon cadeau, widget Barestho flottant. Pas d'animation notable. Mobile : même ordre.

## Findings (sloplint before : 66 FAIL, 53 REFLEX, 5 WARN, détail dans `.hallmark/before.txt`)
- Floor : 7a/7b couleurs pures, 26a focus 1,46:1, 48 littéraux, 58 mots, 63 flèches, 67 capitales.
- Reflex : 24b échelle 4 px, 26b états :active/:disabled absents, 37 cinq familles, 44c/79 hero vide, 59 écarts de section, 77/78 sections fines, titres 35 px.
- Jugées : 8 (gabarit hero/services/contact), 54 et 58 (copie sommaire), 69 (horaires redits), 80-85 non applicables (pas de métrique ni de témoignage).

## Axes d'amélioration
Peu coûteux : accroche lisible, contrastes, carte et menu en HTML. Moyens : composition par section, photos au bon cadrage. Seul full règle : système typographique et chromatique complet.
