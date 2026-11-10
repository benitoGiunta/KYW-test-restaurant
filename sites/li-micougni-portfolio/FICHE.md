# Gabarit « Guinguette »

**Pour qui** : brasserie familiale avec terrasse, friterie et grill convivial, pizzeria de quartier ; toute maison où
l'on vient en famille le dimanche et où l'on veut un site joyeux, dessiné, « attrapable ».

**Concept** : le site est une table de terrasse. On y attrape et déplace des objets dessinés au trait (cornet de
frites, fourchette, verre, parasol, bouteille, citron), des tirages à cadre blanc et des cartes d'avis. Lin, corail,
bleu canard, paille ; Zodiak (titres, italique du slogan) et Satoshi (texte, carte). Le verbe : rebondit (entrée du hero
et boutons seulement).

## Pages et sections
- **Accueil (one-page)** : marquee d'état (ouvert / fermé calculé côté client depuis les horaires) · hero poster
  (titre 2 lignes, slogan italique corail décalé, adresse, 2 boutons ovales, 6 objets au trait qui tombent, rebondissent
  et deviennent saisissables ; 3 en mobile) · la maison (tirage + texte à ornements de coins) · la table (signature :
  12 tirages + 3 objets saisissables sur bande canard, badge rotatif « attrapez-moi » ; rail scroll-snap en mobile) ·
  le menu (carte blanche, pictos au trait, lignes nom / pointillés / prix cerclé corail, badge végé) · avis (« Avis »
  géant flou → net au scrub, cartes inclinées qui glissent et se redressent au survol) · manifeste corail · horaires en
  carte à pointillés (FERMÉ en corail, ligne terrasse) · pied de page finale « À table ! » coupé par le bas.
- **Carte** : menu réel, formules, carte longue d'exemple marquée, 4 tirages de plats.
- **La maison** : histoire, équipe (fiches, rôles illustratifs marqués), galerie 6 tirages.
- **Terrasse et événements** : page d'exemple (bandeau peint sans JS), privatisation du samedi (réelle).
- **À emporter** : page d'exemple (bandeau), sans CTA de commande ni de réservation.
- **Réserver et contact** : bouton vers l'outil réel, téléphone, formulaire de démonstration, horaires et adresse.
- **404**.

## Composants
`Objet.astro` (6 SVG au trait, id typé), `Marquee.astro` (état sans date en dur), `Ornements.astro` (coins), tirage
(`.tirage`, cadre blanc 24 px, rotation `--r`, se redresse au survol), objet saisissable (`.obj`, `data-obj`), scène de
table (`data-table-scene`), carte blanche (`.carte`, `.plat`, `.plat__prix`, `.vege`), carte d'avis (`.carte-avis`),
bouton ovale (`.btn`, flood corail avec rebond), carte horaires (`.hcarte`), bandeau d'exemple (`.bandeau-ex`),
pied de page finale (`.footer__finale`). Motion dans `src/motion/setup.ts` : `saisissable()` (Draggable + inertie par
quickTo + flèches clavier + zone d'exclusion du texte), `heroObjets()`, `table()`, `avis()`, `marquee()`.

## Données exigées à l'adaptation
- Carte réelle avec prix par catégorie (la carte longue d'exemple est à remplacer ou retirer).
- 12 photos lifestyle carrées ou recadrables en carré pour la table, 3 à 6 photos de plats, 1 photo d'équipe.
- Slogan de la maison (le slogan du gabarit est un exemple), texte « la maison » (2 paragraphes).
- Terrasse : oui / non, places, jours (`guinguette.terrasse.exemple` à remplacer) ; service à emporter : oui / non (sinon retirer la page).
- Nombre de services, prix et période du menu unique : constantes `guinguette.menuUnique`.
- Avis réels avec autorisation (les 4 cartes d'avis sont des exemples sans nom ni source) ; e-mail de contact (non affiché tant qu'il est inconnu).

## Limites
- Les objets dessinés sont ceux d'une guinguette (frites, parasol, verre…) : pour une pizzeria, redessiner 2 ou 3 objets
  dans `Objet.astro` (même trait, même viewBox).
- Les photos du restaurant de référence sont des photos de reportage sombres, pas des photos au flash en extérieur :
  l'adaptation gagne beaucoup avec des photos de terrasse.
- La saisie des tirages est desktop ; en mobile la table devient un rail (les 3 objets du hero restent saisissables).
