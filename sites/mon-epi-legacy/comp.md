# Comp · Monepi · premier écran

Fichiers : `.hallmark/comps/c1.html` (texte à gauche, photo verticale 4/5 à droite) et `c2.html` (photo plein cadre, panneau crème en bas à droite). Axe qui varie : poids texte ou image (type-led contre image-led). Les deux captures ont écrit le même nom de fichier ; seule celle de c2 reste sur disque, c1 est jugée sur son HTML.

Choix : **c1**. Raison : le hero Index du tirage demande l'index des cinq familles sous le titre, ce que c1 porte sans masquer la photo ; c2 écrase le four sous un panneau et rejoue le hero Poster que l'ancien site avait déjà (slider plein cadre).

Inventaire des médiums : hero = `raster` (06-four-flammes-large, source réelle) ; four = `raster` (07) ; boulanger = `raster` (03) ; familles = `raster` (17, 16, 18, 13) ; sans gluten = `neither` (pas de photo pour ce pain, région retenue en texte) ; frise et farines = `code`. Les trois questions de reproduction : phase 2.

## Phase 2 : reproduction (capture 1280x800, `comp-c1` contre la page, deux vues vues côte à côte)
- **Masse** : la comp pose une photo verticale 4/5 qui prend toute la hauteur de l'écran, à droite, face à un titre seul. La page garde la photo à droite (même position, même largeur de colonne) mais plafonnée à `100svh - 350px` pour tenir l'index des cinq familles dans le premier écran : elle est plus basse et plus large (recadrage 4/3 au lieu de 4/5).
- **Intervalle** : la comp a une marge de 32 px à gauche et le titre à mi-hauteur sans rien autour ; la page a le bandeau et la barre (128 px) au-dessus, un titre à 60 px au lieu de 84 px et l'index sous les actions : l'intervalle entre le titre et la photo (gouttière 32 px) est identique, l'intervalle vertical est celui de l'index (filets de 48 px).
- **Entrée** : la comp n'en a pas ; la page entre par la barre de navigation puis le titre, sans reveal (thème Solstice, mouvement calme : « no reveal »). Le contenu est peint dès le premier rendu, la photo en `fetchpriority="high"`.
- **Plus grand écart** : la hauteur de la photo (environ 560 px contre 780 px). Décision : le prompt de la phase 1 fait de la carte le hero, donc l'index doit être au-dessus de la ligne de flottaison ; on garde le recadrage plutôt que de repousser l'index.
- Stamp : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.

