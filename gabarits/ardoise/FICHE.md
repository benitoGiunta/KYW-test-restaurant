# Gabarit « Ardoise »

**Pour qui** : brasseries classiques à carte longue, bistrots de quartier, restaurants de place ouverts midi et soir
(Brasserie du Quai, Le Royal, Le Félicien, Grill des Amis) : tout restaurant dont la carte est la première chose qu'on veut
lire.

**Pitch** : la carte d'abord. La page d'accueil est une ardoise anthracite : le nom en deux lignes, la suggestion du jour
qui s'efface et se réécrit, deux onglets MIDI | SOIR, des lignes plat / prix tabulaires. Les photos n'arrivent qu'au survol
(aperçu 4:5 qui suit le pointeur) et sur la page salle, en clair. Une barre d'état calculée à l'heure du visiteur défile
en tête, une barre de réservation fixe tient le bas de l'écran.

## Pages et sections

| Page | Sections |
| --- | --- |
| Accueil `/` | Barre d'état (marquee) ; **Ardoise** (nom, accroche, suggestion du jour avec flèches, onglets midi / soir sticky, catégories et lignes) ; Formules (3 prix géants, bon cadeau) ; La salle (full-bleed clair, photo, mots géants SALLE / BAR / CUISINE) ; La maison (photo du trio, histoire courte) ; Horaires et accès (tableau 7 lignes jour / midi / soir, adresse, plan) |
| La carte `/carte/` | Les deux services déployés, ancres `#soir` et `#midi`, lignes d'exemple marquées |
| Formules `/formules/` | 3 formules réelles en prix géants ; Bon cadeau `#cadeau` ; groupes et privatisation du samedi |
| La salle `/salle/` | Page claire : grande photo, mots géants, galerie de 8 photos |
| La maison `/histoire/` | Histoire en quatre paragraphes, portraits des chefs, équipe (rôles non prouvés marqués), avis (exemples marqués) |
| Réserver `/reservation/` | Page claire : Zenchef, téléphone, formulaire de démonstration (date minimale calculée), horaires, adresse |
| 404 | « Effacé », trois boutons |

## Composants

- `Lignes.astro` (`.ligne`) : nom, badges (`végé`, `maison`, `local`), marque « exemple », description en muted, prix
  tabulaire à droite ; survol et focus en craie jaune ; `data-preview` déclenche l'aperçu flottant (desktop pointeur fin) ;
  vignette inline 56 px sous 1024 px ; aperçu statique à droite au focus en reduced motion.
- `Ardoise.astro` : onglets `role="tablist"` (soulignement jaune qui glisse, flèches clavier, panneau du service en cours
  par défaut : midi avant 15 h) ; sans JS les deux services s'affichent l'un sous l'autre.
- Suggestion du jour (`[data-jour]`, `setup.ts → suggestion()`) : 7 entrées dans `site.suggestions`, ouverture sur le jour
  réel, effacement `clip-path` 0,5 s puis réécriture mot à mot (stagger 0,08), `aria-live="polite"`.
- Barre d'état (`[data-etat]`) : « Ouvert jusqu'à 21h00 » / « Fermé, ouvre demain à 19h00 » calculé depuis
  `site.horaires` ; repli statique sans JS ; défilement lent = seul idle du site, statique en reduced motion.
- Barre basse fixe (`.barre`) : Réserver / Appeler / Bon cadeau ; `body { padding-bottom: var(--barre) }`.
- Prix qui s'écrivent (`[data-prix-ecrit]`), mots géants en parallaxe (`[data-mots]`), tableau horaires avec ligne du jour.

## Données exigées à l'adaptation (`src/data/site.ts`)

- `carte` : catégories avec `service` (`midi`, `soir`, `tous`) et `exemple: false` dès que la carte est réelle ; prix en
  chaîne (`'14 €'`) ou `null` quand le plat fait partie d'un menu à prix de catégorie (`prix` de la catégorie).
- `suggestions` : 7 lignes (une par jour) ; `placeholder: false` quand le restaurant les fournit ; les jours fermés restent
  des phrases réelles.
- Photos d'assiettes 4:5 (`public/photos/apercu-*.webp`, 560×700) : 8 au moins pour que l'aperçu vive.
- `horaires` complets (ils pilotent la barre d'état, les onglets, le tableau et le JSON-LD), `acces`, `cadeau`,
  `privatisation`, `motsSalle` (mots prouvés : pas de TERRASSE sans terrasse).

## Limites

- Les Potes au Feu travaillent en menu unique : la carte longue est composée du menu réel et de lignes d'exemple marquées
  « exemple » ; les suggestions du jour sont illustratives et marquées.
- Pas de WebGL, pas de texture craie (interdite par le cahier) ; l'ardoise est une couleur et une liste.
- Formulaire de démonstration (ouvre Zenchef) ; e-mail illustratif.

Aperçu : `apercu.png`.
