# Revue awwwards · Le Panorama · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : brasserie au sommet de la Citadelle de Namur, titres géants, ardoise et vert Meuse, « règle des heures » (8 h à 23 h) parcourue par un soleil au défilement, reprise en pied de page, horaires et 404 (inchangée depuis la passe 1).

Méthode : pas de QA-revue2.md (aucun fichier) ; captures de `.shots` (16:36) antérieures au dist (17:09), donc non réutilisées. Mesures maison sur le `dist/` actuel, serveur propre (port 4906, PID 11567 arrêté) : axe-core de node_modules à 2 positions de défilement, console, requêtes, débordement, balises, 5 pages (accueil, carte, histoire, réservation, 404.html réel) x 1440/390/360 = 15 cas ; script ciblé (mur de photos : Tab, flèche droite, outline, doublons d'alt et de fichier, reduced-motion à 1440) ; extraction du texte du dist par Python (espaces insécables, apostrophes, tirets, mots creux, faits).

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | constaté |
|---|---|---|
| F1-1 | `.final__mur` focalisable | CONFIRMÉ. `role="group"`, `aria-label="Photos du lieu"`, `tabindex=0` dans le dist ; axe 390 et 360 : 0 violation (plus de `scrollable-region-focusable`) ; atteint au 13e Tab ; `ArrowRight` fait défiler (scrollLeft 0 à 295 à 390 px, 0 à 272 à 360 px) ; outline 2 px vert clair, offset 4 px (`mur-focus-390.png`), voir F3-6. |
| F2-1 | « (à confirmer) » dans le héros | CONFIRMÉ. Héros : « de 8 h à 23 h (à confirmer). » ; le pied de page porte aussi « (à confirmer) » sur les 4 pages ; JSON-LD toujours 08:00-23:00 sept jours (acceptable, même source que le site client). |
| F2-2 | doublons du mur remplacés | CONFIRMÉ. Mur = table et verres (12), terrasse aux guirlandes, longue table (11) ; 12 images dans `main`, 0 alt en double, 0 fichier en double (`mur-1440.png`). Poids : AVIF de 7 à 82 Ko, pas de régression. |
| F2-3 | U+00A0 avant `: ; ? !` et dans « » | CONFIRMÉ avec un reste. Texte visible extrait : 0 espace sécable avant la ponctuation haute sur accueil, histoire, réservation, 404 ; 0 apostrophe droite ; 0 tiret cadratin. Reste 1 cas, voir F3-5. |
| F3-3 | « devant les baies vitrées » retiré de La salle | CONFIRMÉ pour le texte de La salle. L'expression reste dans l'alt de la photo 11 (`photos.ts:30`), qui vient du `sujet` de `photos/index.json` : acceptable. |
| F3-1, F3-2, F3-4, F3-5 | non traités | CONFIRMÉ non traités (voir ci-dessous). |

Aucune régression trouvée : console 0, requêtes en échec 0, débordement 0 (scrollWidth = fenêtre sur 15 cas), axe 0 violation sur 15 cas, 1 `h1`, `lang="fr"`, `noindex, nofollow`, mention « Maquette KYW… » et 1 seul logo KYW sur chaque page, un seul `<footer>`, JSON-LD `Restaurant` présent. Reduced-motion à 1440 : 0 texte à opacité 0.

Scores /10 :
- Design 8 : inchangé, mur de photos désormais varié (`mur-1440.png`).
- Usabilité 8,5 : galerie mobile atteignable et défilable au clavier, 0 violation axe sur 15 cas.
- Créativité 8 : règle des heures intacte.
- Contenu 8 : héros et pied de page alignés sur « à confirmer », ponctuation insécable corrigée, faits (Bluntzer, groupes@, 7 personnes, 8 h à 10 h 30) confrontés au dossier : conformes.
- Technique 8 : build du 17:09 propre, 0 erreur ; LCP/CLS non remesurés (la révision n'a touché ni héros ni polices ; passe 1 : LCP mobile 2,2 s, CLS 0).

## Findings (tous F3 ; aucun F0, F1 ou F2)
- **F3-1 · Redondance horaires du pied de page** (reste de la passe 1) : « Ouvert Tous les jours, de 8 h à 23 h (à confirmer) » puis « Lundi à dimanche », sur 4 pages. Supprimer la seconde ligne.
- **F3-2 · Histoire** (reste) : intertitre « Les noms derrière la carte » (gérants et chef extérieur) et légende « En cuisine. » du portrait 18 (sujet « identité à confirmer »). Proposition : « Les personnes citées », légende « Portrait. » ou suppression.
- **F3-4 · 404.html** (reste) : `canonical` vers `/panorama-citadelle/awwwards/404/` (adresse inexistante), à retirer.
- **F3-5 · Une espace sécable restante** : carte, « Une table pour ce soir ? Réserver » (espace U+0020 avant « ? ») ; mettre U+00A0 (page `carte.astro`).
- **F3-6 · Contour de focus du mur rogné à gauche sur mobile** : le conteneur démarre à x = -16 px (390 et 360), donc le trait gauche de l'outline sort de la fenêtre (`mur-focus-390.png` : haut, droite et coins visibles, côté gauche absent). Corriger par `outline-offset: -4px` ou en rentrant le conteneur dans `.wrap`.
- **F3-7 · « à confirmer par téléphone »** (`reservation.astro`, note des horaires) : procédure non donnée par le dossier (il fournit seulement le numéro). Écrire « à confirmer » seul.
- **F3-8 · Poids** (reste) : accueil ~1,9 Mo d'images, jpg de repli jusqu'à 974 Ko servis aux seuls navigateurs sans AVIF/WebP ; pas d'action urgente.

## Non vérifié (limites)
- Contraste par canvas 1x1 non refait (axe : 0 violation `color-contrast` sur 15 cas à 2 positions de défilement).
- Survol, transitions et loader : non rejoués (non touchés par la révision).
- LCP/CLS mobile non remesurés (voir ci-dessus).

## Ce qui est bien (à ne pas casser)
1. La règle des heures, signature unique, lisible à 390 px.
2. Le mur de photos final : trois photos distinctes, défilable à la molette et au clavier (flèches), contour de focus net.
3. Honnêteté du contenu : « à confirmer » cohérent entre héros, règle, pied de page et réservation ; aucun avis ni donnée inventés ; mention KYW, logo unique, noindex partout.
