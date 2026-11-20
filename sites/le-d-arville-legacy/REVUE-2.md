# Revue legacy · Le D’Arville · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : un restaurant de campagne présenté sobrement, fond greige, serif Sentient, plaque posée sur la photo de l'étang, passe-partout pour le portrait du chef, neuf pages éditoriales (inchangé depuis la passe 1).
Scores /10 :
- design 7 : hiérarchie calme conservée (`.shots/darv-rev2/p-d.png`) ; le pied sans phrase géante sur les 8 autres pages allège les pages courtes (seminaires, 404).
- usabilité 8 : 0 débordement sur 9 pages x 1440, 768, 390, 320 ; menu et barre fixe inchangés ; cibles téléphone et courriel encore 115 x 21 et 129 x 21 px (F3-2).
- créativité 5 : pas de changement de fond ; seule signature : le passe-partout du portrait.
- contenu 8 : F1-1 et la suite Orientale (légende) corrigés ; reste trois pages courtes (« à confirmer ») faute de données.
- technique 9 : build OK, 0 violation axe (9 pages x 4 largeurs, dont `landmark-no-duplicate-contentinfo` disparu), 0 erreur console, 0 requête en échec, 0 titre rogné, 1 `h1`, 1 `<footer>`, `lang="fr"`, `noindex`, mention et 1 logo KYW par page.

Méthode : `QA-revue2.md` absent et captures `.shots/darv2` (03:51) antérieures au dist (04:51), donc non réutilisées. Mesures maison sur `dist/le-d-arville/legacy/` (postérieur à `src/`, 04:47) : axe-core de node_modules, console, requêtes, débordement (éléments et titres), balises, 9 pages x 4 largeurs après défilement ; 14 captures ciblées (accueil, séminaires, réservation, 404, chambres ; pied) en planches `.shots/darv-rev2/p-d.png` et `p-m.png` ; grep sur le dist pour chaque correction annoncée. Serveur propre sur port libre aléatoire (`serve()` fermé par le script, aucun processus restant). sloplint non relancé (révision limitée au texte et aux balises, comme annoncé).

## Vérification des corrections annoncées par REVISION-1
| id | annoncé | constaté |
|---|---|---|
| F1-1 | « Chasse, poissons et homard du vivier. » | confirmé (dist/index.html) ; « arrivages » : 0 occurrence dans le dist |
| F2-1 | légende « Une chambre colorée de la villa Barabas. » | confirmé ; « Suite Orientale » reste comme nom d'une suite dans une liste, ce qui est prouvé par `donnees.json` ligne 243 (« suites Glamour, Orientale, … ») : correct |
| F2-2 | un seul `<footer>` | confirmé : 1 `<footer>` sur 9 pages, 0 violation axe sur 36 cas |
| F2-3 | `url`, `image`, `sameAs` ajoutés, pas d'heures | confirmé (2 pages Facebook du dossier, `url` et `image` sur le domaine Vercel utilisé par les autres sites) ; absence d'`openingHoursSpecification` justifiée (aucune heure au dossier) |
| F2-4 | phrase géante uniquement sur l'accueil | confirmé : `pied__sentence` sur 1 page sur 9 ; la 404 et la réservation n'ont plus que le bloc adresse |
| F2-5 | numéros 01 à 04 retirés | confirmé : `class="n"` : 0 |
| F2-6 | phrase « la table se prend au restaurant » retirée, pas de regroupement | confirmé pour la phrase (0 occurrence) ; regroupement refusé, justification acceptée (hors révision ciblée, données absentes) |

## Findings

### F0 (bloquant) : aucun
### F1 (majeur) : aucun

### F2 (mineur)
- **F2-6 (reste) · contenu mince · séminaires, chèque cadeau, traiteur de fêtes** : une phrase, une ligne en pointillé « … à confirmer », téléphone, courriel, une photo (`1440-seminaires-bas.png`). Ces trois pages restent dans la barre principale. Honnête vis-à-vis du dossier, mais pauvre ; à traiter au niveau du produit (regrouper en « Événements et cadeaux ») si le client ne fournit rien.

### F3 (finition, non traités par la révision, non bloquants)
- **F3-2 · Cibles** : liens téléphone et courriel des pages séminaires, chèque cadeau, traiteur, réservation : 115 x 21 et 129 x 21 px à 1440 et 390 (mesure). Passer à 24 px de haut (`min-block-size`).
- **F3-3 · Typographie** : espace ordinaire avant « ; » ou « : » encore présent (3 occurrences sur l'accueil) ; mettre U+00A0.
- **F3-4 · Photo du chef** : filigrane « © Morgane Ball » toujours incrusté dans `16-chef-facade`.
- **F3-5 · Hors-ligne et SEO** : pas de `robots.txt` ; polices distantes sans préchargement.
- **F3-6 · « Congés 2027 »** : « 20-31 décembre » est noté traiteur dans le dossier (`donnees.json` ligne 33, note d'horaires) mais figure parmi les congés du restaurant sur `1440-reservation-bas.png`.
- **F3-7 · Page photos** : 17 images toutes en `loading="lazy"` (mesure), 16 vues sans légende ; « Heures d'ouverture à confirmer par le restaurant » souligné en pointillé comme un lien non cliquable (visible aussi dans `1440-reservation-bas.png`).
- **F3-9 (nouveau) · pied mobile** : sur les pages sans phrase géante, un vide d'environ 80 px sépare la règle du bloc « Adresse » à 390 px (`p-m.png`, 1re, 2e, 5e vignettes) ; réduire le `padding-block-start` du pied quand `phrase` est faux.
- Corrigés depuis la passe 1 sans nouvelle intervention : corps du texte désormais 16 px et légendes 14 px (mesure sur séminaires, F3-1 résolu).

## Ce qui est bien (à ne pas casser)
1. Données exactes : prix, adresse, téléphone, courriel, Facebook x2, domaine de 5 hectares et villa à 200 m conformes au dossier ; aucun tiret cadratin ; vouvoiement tenu.
2. Technique propre : 0 axe, 0 console, 0 débordement à 320, 390, 768 et 1440 sur les 9 pages ; un seul pied de page et un seul logo KYW.
3. Hero de l'étang avec plaque lisible, portrait en passe-partout et pied sobre ; la phrase de pied sur l'accueil seule rend les pages secondaires plus nettes.
