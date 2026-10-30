# Gabarit « Comptoir »

**Pour qui** : tables gastronomiques, omakase et sushi, tables d'auteur à menu unique ; tout restaurant dont l'assiette est le
seul sujet (Atelier de Bossimé, L'Essentiel, Le 54, Li Micougni, Makimono).

**Pitch** : blanc, silence et précision. Le site est un passe : les assiettes arrivent une à une sur une surface blanche ;
la hiérarchie vient de la graisse (200 contre 400) et de l'espace. Un seul geste animé, le dressage du plat du restaurant.

## Pages et sections

| Page | Sections |
| --- | --- |
| Accueil `/` | Hero (assiette collée au bord, titre 200 à droite, lien sur filet) ; phrase manifeste ; **Dressage** (scène épinglée, 5 composants, légendes reliées, liste accessible) ; Le menu (services numérotés) ; Les chefs (split 50/50, portrait N&B, aplat gris) ; La salle (quinconce, traits d'angle céladon) ; Distinctions (bande) ; Réserver |
| Le menu `/menu/` | Services en grand, numérotés en chiffres romains, 2 assiettes, suppléments et options |
| Formules `/carte/` | Cadence de 3 blocs 50/50 photo / aplat (soir, midi, lunch), boissons (illustratives), bon cadeau |
| Les chefs `/histoire/` | Deux splits portraits N&B + récit, équipe, trois citations, galerie éditoriale (une image par écran) |
| Réserver `/reservation/` | Formulaire à champs soulignés sur une ligne de base (date minimale calculée), note groupes et privatisation, horaires, bon cadeau `#cadeau` |
| 404 | Message court, deux boutons |

## Composants

- `Dressage` (`[data-dressage]`, `motion/setup.ts`) : pin 220 % + scrub 0,8 ; composants `scale 1.15 → 1 + autoAlpha`,
  traits SVG `stroke-dashoffset`, légendes Sentient italique. Mobile : assiette 80 vw, légendes remplacées par la liste
  sous la scène. Reduced motion : tout affiché, posé.
- `Logo vertical` : nom tourné à 90°, fixé en bas à gauche dans la voie `--lane` (4,5 rem desktop) ; horizontal dans
  l'en-tête en mobile.
- `Lien sur filet` (`.filet[data-filet]`) : italique posé sur un trait qui se dessine (`--trait`) ; survol : trait 2 px,
  flèche +4 px.
- `Pastille réserver` (`.pastille`) : pilule noire + cadeau fixe en bas à droite ; barre basse en mobile.
- `Split 50/50`, `Quinconce` (+ `.angle` traits céladon), `Bande`, `Menu-liste`, `Form-ligne`.

## Données exigées à l'adaptation (`src/data/site.ts`)

- Un plat réel en 4 à 5 composants avec médaillons détourés (`public/photos/composant-*.webp`, carrés RGBA, fond
  transparent ou rond) et leurs noms : champ `dressage`.
- Menu unique de 6 à 8 services (noms suffisent ; descriptions vides si non fournies).
- 3 photos de plats vues de dessus, détourées (`assiette-*.webp`), portrait N&B du ou des chefs.
- Distinctions réelles uniquement (`distinctions`), sinon tableau vide : la bande disparaît.
- Toute donnée non prouvée : `placeholder: true` sur le champ exact (plat, rôle, composant, avis).

## Limites

- Les médaillons sont des découpes rondes de la photo du plat, pas des détourages fins ; un vrai détourage par
  composant (photo studio sur fond blanc) donne au dressage toute sa force.
- Pas de WebGL, pas d'idle : site calme par choix du cahier.
- Formulaire de démonstration (ouvre l'outil de réservation réel).

Aperçu : `apercu.png`.
