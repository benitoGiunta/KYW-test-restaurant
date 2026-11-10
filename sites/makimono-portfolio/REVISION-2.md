# REVISION-2 (makimono-portfolio, passe 2)

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 + F2-3 horaires | corrigé | `base.css` : carte en `container-type: inline-size`, heure `min(2.6rem, 17cqi)` (surcharges 1024 et 767 retirées) | script : `right` des `dd`/`dt` ≤ `right` carte − 2 à 390, 768, 1024, 1280, 1440, 1920 sur 5 pages : 0 écart |
| F1-2 bento | corrigé | `repeat(3, minmax(0,1fr))` et `repeat(2, minmax(0,1fr))`, `overflow-wrap: anywhere` sur `h3` | `right` des cartes ≤ fenêtre aux 6 largeurs : 0 écart |
| F1-3 « COMPOSEZ » | corrigé | `.display--mot` à `min(mega, 6.4vw)` dès 768 px (8,6vw en dessous) | `range.right` ≤ boîte du h1 (composer, commander) aux 6 largeurs : 0 écart |
| F2-1 gestes à 1024 | corrigé | `ol.etapes__trois` en 1 colonne jusqu'à 1199 px, 3 colonnes dès 1200 | `right` des `strong`/`li` ≤ fenêtre : 0 écart |
| F2-2 casse | corrigé | `carte.json` : ingrédients composables en minuscules après le premier mot (Oignons frits, Coco râpé, Tempura flakes, Saumon snacké, Cream cheese, Tofu frit, Nori frit, etc.) ; noms de rouleaux conservés | grep du dist : 0 ancienne forme |
| F3 | non traité | hors périmètre F0-F2 | |

Hypothèses : mesure sans capture visuelle (scripts de géométrie) ; F3-1 à F3-4 laissés à une passe suivante. Rebuild via `scripts/q.sh` : exit 0.
