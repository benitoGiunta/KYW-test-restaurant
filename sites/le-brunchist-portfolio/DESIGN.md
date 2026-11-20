# Le Brunchist, variante portfolio : DESIGN

## Choix du gabarit
Matrice (note /5) sur les cinq gabarits non encore attribués (UTILISATION.md) :
| Gabarit | Positionnement | Ambiance | Contenu dispo | Carte | Signature |
|---|---|---|---|---|---|
| journee | 5 (café, brunch, lunch) | 4 | 4 (peu de matière, tient avec 5 moments) | 4 | 5 (la matinée qui avance) |
| cahier | 3 | 4 | 2 (exige fournisseurs) | 3 | 3 |
| guinguette | 2 | 3 | 3 | 3 | 2 |
| collage | 3 (multi-activités) | 3 | 2 | 3 | 3 |
| velours | 1 | 1 | 1 | 1 | 1 |

Décision : **journee** (jamais utilisé, brunch et cafés = cœur du gabarit). Mise à jour de `gabarits/UTILISATION.md` laissée à l'orchestrateur (mode figé, gabarits/ protégé).

## Adaptation
- Cadran de 6 moments (7h à 23h) ramené à **5 moments entre l'ouverture et la fermeture** : 9h30 café, 11h brunch, 12h30 salé, 14h30 terrasse, 15h30 rideau (fermeture). Frise 9h à 16h (`PLAGE` dans site.ts, base.css, Frise.astro, CIELS de journee.ts).
- Sections retirées : dîner (menu soir), dernier verre, bar, happy hour, plat de la semaine, équipe de 4, coulisses. Ajoutées : index des boissons, bande « terrasse », composant `Ligne.astro` (étiquette « exemple » ou « prix illustratif »).
- Pages : accueil, carte, brunch (vraie page), histoire, reservation (« Venir, réserver » : téléphone, pas d'outil de réservation connu), 404.
- DA : palette et typographie du gabarit conservées (crème, ocre, corail ; Bricolage / Rethink), sans changement d'accent faute de logo ni de site client lisible (site bloqué par anti-robot). Favicon du gabarit conservé, OG générée depuis la photo de latte.
- Photos : 9 photos libres Unsplash (picsum), toutes `placeholder: true`, crédit en pied de page. Aucune photo client.

## Adéquation estimée : ~60 %
1. Nature du lieu (café-brunch, matinée) = concept du gabarit. 2. Carte courte tenant dans les lignes et médaillons. 3. Terrasse et horaires mis en scène par frise et badge calculé.
Limites : aucune photo réelle, carte et prix inconnus, logo et palette de la maison inconnus, horaires contradictoires selon les sources.
