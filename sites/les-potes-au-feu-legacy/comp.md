# Comp avant build · Les Potes au Feu legacy

Sans `TOGETHER_API_KEY` (signal 9 absent, `imagegen.mjs` interdit) : deux comps HTML du premier écran, construites avec
`src/styles/tokens.css` et `base.css`, capturées par `capture.mjs --sizes desktop` (PNG 2x, 1440x900).

- `.hallmark/comps/c1.html` → `.hallmark/comps/c1.png` : le puits crème haut et étroit, à gauche, à cheval sur le portrait de François.
- `.hallmark/comps/c2.html` → `.hallmark/comps/c2.png` : le puits bas et horizontal, sous les deux visages : titre à gauche, phrase et actions à droite.

Une première c2 (puits centré sur la couture, comme la carte blanche d'origine) a été capturée puis remplacée : elle
mangeait la moitié de chaque visage.

**Axe varié** : la place et la forme du texte sur le diptyque (vertical latéral contre horizontal bas), le système fixe
(Solstice long-light, Yeseva One, vermillon, puits à filet d'or et ombre dure).

**Ce qui diffère** : c1 masque entièrement le visage de François, le diptyque perd sa moitié ; c2 laisse les deux visages
entiers au-dessus du puits et lit « la rencontre » d'un coup.

**Choix : c2**, parce que la signature est le duo : deux visages entiers, une moitié d'écran chacun.

## Inventaire des médiums (premier écran)
- Nav (logo, liens, Réserver) : `code` (le logo est le PNG du client, `raster` dans un `<img>`).
- Diptyque des deux portraits : `raster`, photos du client `02-chef-francois.jpg` et `01-chef-damien.jpg` (1500x1999, servies en WebP 640/1280).
- Puits crème (titre, phrase, actions) : `code`.
- Rien d'autre : la barre supérieure d'origine (Namur, téléphone, statut, partage) et la flèche de défilement sont coupées ici (63, 66) ; le téléphone passe dans le menu mobile, la réservation et le pied de page.

## Les trois questions de reproduction (hero construit, capture 1280x800 côte à côte avec c2)
- **Masse** : le puits occupe le tiers bas comme dans c2 ; à 1280 le titre tenait sur trois lignes et couvrait le menton de François → taille du h1 bornée (`clamp(2.75rem, 4.2vw + 0.5rem, 5rem)`, 16ch) : deux lignes, visages libres.
- **Intervalle** : 64 px entre le bas du puits et le bas de l'écran, 64 px entre titre et colonne d'actions : identiques à la comp.
- **Entrée** : l'œil entre par les deux visages, descend sur « L'histoire d'une rencontre », puis le bouton vermillon : identique.

**Plus grand écart** : le puits passait sous les photos (les `<img>` des slots sont positionnés avec `z-index: 1`) : le
premier rendu n'avait aucun texte. Corrigé par `.hero__frame { position: relative; z-index: var(--z-raised) }`.
Captures : `.hallmark/shots/localhost-4331-les-potes-au-feu-legacy-hero-{1280x800,1440x900,1920x1080,375x812}.png`.
