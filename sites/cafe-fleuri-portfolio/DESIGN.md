# Café Fleuri, variante portfolio : DESIGN

## Choix du gabarit
Matrice (adéquation /5, lecture des FICHE.md, aucun gabarit n'a de photo cliente ici) :
| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Signature | Total |
|---|---|---|---|---|---|---|
| journee | 5 (café/brunch ouvert 7j/7) | 4 | 4 (peu de photos requises) | 4 | 5 (le cadran du jour = moments de la journée) | 22 |
| guinguette | 3 | 4 | 1 (12 photos exigées) | 3 | 3 | 14 |
| cahier | 3 | 3 | 2 | 3 | 2 | 13 |
| verger | 2 | 3 | 1 | 2 | 2 | 10 |
Décision : **journee**, jamais utilisé encore (UTILISATION.md : non modifié, gabarits/ protégé).

## Adaptation
- Six moments (7h à 23h) réduits à **cinq** : 9h Le café, 10h30 Le brunch, 12h Le déjeuner, 14h Le goûter, 16h La fermeture. La frise passe de 7-23 à 9-17 (base.css, Frise.astro, CIELS, tokens).
- Ciel : aube, midi, ocre, corail, nuit conservés ; le corail passe au rose framboise (#d4607a) en clin d'œil au nom et à la limonade framboise.
- Sections retirées : dîner (menu dégustation), plat de la semaine, happy hour, équipe (inconnue). Ajoutées : mardi étudiants, photo du déjeuner, page « Nous trouver » (remplace Réserver : aucun outil de réservation connu).
- Photos : 10 photos libres (Lorem Picsum / Unsplash), toutes `placeholder: true`, crédits dans `public/photos/credits.json` (colophon à ajouter en phase 2).
- Favicon : fleur à cinq pétales ; OG : terrasse recadrée.

## Adéquation estimée : 70 %
1. Un cadran de la journée colle à un café ouvert tous les jours du matin à l'après-midi.
2. Contenu réel du dossier repris (brunchs, gravlax, pancakes, limonades, mardi étudiants).
3. Limites : aucune photo du client, horaires et prix inconnus, statut du lieu à confirmer (probablement fermé), pas de logo ni de palette connus.
