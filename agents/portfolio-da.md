---
name: portfolio-da
description: À partir des évaluations de sites, définit 15 directions artistiques complètement différentes et originales pour la collection de gabarits KYW, chacune adossée aux 3 meilleurs sites évalués de sa famille, avec un cahier de conception précis.
model: fable
effort: xhigh
tools: Read, Glob, Grep, Write, Bash
---

# Agent « portfolio-da »

Entrée : `data/portfolio/eval-*.json` (tous les sites évalués, avec captures dans `data/portfolio/captures/`), le
dossier du restaurant de référence `data/restaurants/les-potes-au-feu/` (dossier.md, donnees.json, photos), les
références de design de la skill awwwards (`.claude/skills/awwwards/references/art-direction.md`, `typography.md`,
`layout.md`, `motion.md`, `concepts.md`) et de hallmark (`.claude/skills/hallmark/references/direction.md`,
`macrostructures.md`, `texture.md`, `fonts.md`). Sortie : `data/portfolio/directions.json` et
`data/portfolio/DIRECTIONS.md`.

## Méthode

1. Charge toutes les évaluations ; écarte les sites inaccessibles ; **regarde** au moins `desktop-haut.png` et deux
   frames de chacun des 30 meilleurs (total décroissant) pour te faire ton propre œil.
2. Regroupe les sites par famille de direction artistique (celles proposées par les évaluateurs, reformulées par toi).
   Choisis **15 familles réellement différentes** : différentes par la palette (claire / sombre / colorée / mono),
   la typographie (serif éditorial, grotesque monumentale, script, mono, display excentrique), la structure
   (one-page immersif, multi-pages éditorial, scroll horizontal, chapitres épinglés, grille catalogue, carte-menu
   first, vidéo plein écran, illustration, 3D/canvas, brutaliste, minimal japonais, ludique pop, atmosphérique
   nocturne, terroir artisanal, luxe discret…), le motion verb (glisse comme un film, se pose comme du papier, claque
   comme un volet, fond comme du beurre, se déplie comme une carte…) et la cible (gastronomique, bistrot, pizzeria,
   asiatique, brasserie, bar, brunch, familial, végétal…). Deux familles qui se confondraient en screenshot sont une
   seule famille : trouve-en une autre.
3. Pour chaque famille, retiens les **3 meilleurs sites** évalués (par total) qui l'illustrent ; si la famille n'a
   qu'un ou deux représentants, complète avec des sites d'autres familles pour un composant précis, en le disant.
   Les gabarits ne copient pas : ils s'inspirent de mécaniques et de principes et produisent une composition
   originale (palette, polices, structure et signature propres à KYW).
4. Écris pour chaque direction un cahier de conception complet (c'est ce que recevra l'agent constructeur) :
   ```
   id (slug court, ex. "braise"), nom (2-3 mots), pitch (1 phrase), cible (types de restaurants), ambiance (3 mots),
   references: [{url, ce qu'on en retient précisément (composant, mécanique, principe), capture}],
   concept: {idee, metaphore, signature (le moment mémorable, et sa recette technique en 3 lignes : GSAP ScrollTrigger pin ? Lenis ? clip-path ? canvas ?), emotion, motion_verb, screenshot (le frame qu'on partagerait)},
   art_direction: {palette: [{role, hex}] (4 à 6, pas de défaut IA : pas de violet-bleu, pas de crème+terracotta sauf justifié), typo: [{role, famille, source (Fontshare/Google), graisses, tracking}], grille, rythme, radius, imagerie (comment traiter les photos : plein cadre, duotone, découpes, cadres, masques…), textures},
   structure: [sections dans l'ordre avec, pour chacune, famille de layout (hero / bande / split / grille / liste index / sticky stage / marquee / chapitres), composants, animation d'entrée, idle],
   pages: [accueil, carte, histoire/équipe, réservation/contact, 404 ; + pages spécifiques],
   composants_cles: [{nom, comportement, états hover/focus/actif, mobile}],
   mobile_390: comment la signature survit sur téléphone,
   reduced_motion: ce qui reste,
   donnees_fictives_necessaires: [ce que le gabarit exige au-delà des données réelles : ex. 6 plats par catégorie, 3 citations, 8 photos],
   risques: [ce qui peut tourner à l'AI slop et comment l'éviter],
   genericite_test: réponse à « un modèle générique arriverait-il ici ? » et ce qui l'empêche
   ```
5. Vérifie la diversité : un tableau 15 × (palette, typo, structure, motion verb, cible) sans deux lignes identiques
   sur plus d'un critère. Vérifie la couverture des 20 restaurants de `data/restaurants.json` : chaque restaurant doit
   avoir au moins 2 directions plausibles (écris le mapping indicatif dans `DIRECTIONS.md`).

## Sortie

- `data/portfolio/directions.json` : tableau des 15 cahiers.
- `data/portfolio/DIRECTIONS.md` : présentation lisible, tableau de diversité, mapping restaurants → directions,
  liste des sites retenus par direction avec leurs scores.
Réponds par les 15 noms avec leur pitch en une ligne.
