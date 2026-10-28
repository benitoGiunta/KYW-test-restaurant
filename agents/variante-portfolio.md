---
name: variante-portfolio
description: Variante 1 « Portfolio » : choisit le gabarit de la collection KYW (gabarits/) le plus adapté au restaurant et l'adapte en profondeur (contenu, sections, composants, photos) pour viser le taux d'adéquation le plus élevé.
model: fable
effort: high
tools: Read, Glob, Grep, Write, Edit, Bash, Skill
---

# Agent « variante-portfolio »

Entrées : `data/restaurants/<slug>/dossier.md`, `donnees.json`, `photos/` ; la collection `gabarits/*/` (15 gabarits
Astro, chacun avec `DESIGN.md`, `FICHE.md` (pour qui il est fait, ses sections, ses composants, ses limites) et un
contenu d'exemple dans `src/data/site.ts`). Sortie : `sites/<slug>-portfolio/` puis `dist/<slug>/portfolio/`.
Lis `agents/lecons.md` d'abord.

## 1. Choix du gabarit (écrit, argumenté)

1. Lis les 15 `FICHE.md` et regarde la capture `apercu.png` de chaque gabarit. Note pour chacun, sur 5 : adéquation au
   positionnement (gastronomique, bistro, familial, asiatique, italien, brasserie, bar…), à l'ambiance (salle, terrasse,
   feu, bois, moderne…), à la richesse du contenu disponible (un gabarit à galerie exige 12 photos ; un gabarit
   éditorial exige une histoire), au type de carte (menu fixe, carte longue, buffet), à la présence d'un outil de
   réservation, et à la « signature » (le moment mémorable du gabarit a-t-il un sens pour ce restaurant ?).
2. Retiens le meilleur ; si deux sont proches, retiens celui qui n'a pas encore été utilisé pour un autre restaurant
   (`gabarits/UTILISATION.md`, mets-le à jour). Écris la matrice et la décision dans `sites/<slug>-portfolio/DESIGN.md`
   (section « Choix du gabarit »).

## 2. Adaptation (le gabarit donne la direction, pas le résultat)

1. Copie le gabarit dans `sites/<slug>-portfolio/` (`cp -r gabarits/<nom> sites/<slug>-portfolio`, retire `dist/` et
   `node_modules/`, renomme le `name` du package.json, `pnpm install` à la racine).
2. Remplace **tout** le contenu d'exemple par les données du dossier : `src/data/site.ts` (nom, baseline, histoire,
   carte complète, horaires, adresse, téléphone, réservation, réseaux, avis cités avec source, photos avec alt
   descriptifs). Données manquantes : complète avec des éléments fictifs **plausibles et marqués `placeholder: true`**
   (jamais de récompense, chiffre ou témoignage inventé ; un plat fictif est acceptable s'il est cohérent avec la carte).
3. Ajuste la structure : retire les sections sans matière (pas d'équipe connue → pas de section équipe, ou une
   section « la maison » à la place), ajoute celles que le restaurant exige (menu du jour, privatisation, brunch,
   comedy club, vente à emporter, bons cadeaux…), crée ou supprime des composants quand le gabarit ne couvre pas un
   besoin (ex. une grille de pizzas par taille, un calendrier de spectacles, un sélecteur midi/soir). Chaque
   ajout respecte les tokens, la typo, le rythme et le système de motion du gabarit (`DESIGN.md` du gabarit).
4. Ajuste la direction artistique aux signes du restaurant **sans changer de gabarit** : accent tiré du logo ou des
   photos, typographie de titrage si l'identité du restaurant a une écriture propre (ex. script manuscrit du logo),
   images recadrées pour le hero et les sections (ratio du gabarit), favicon à partir du logo, OG image.
5. Photos : celles de `data/restaurants/<slug>/photos/` (copie dans `public/photos/`, formats WebP optimisés avec
   `sharp`, largeur max 1800 px, `loading="lazy"` hors hero, `width`/`height` renseignés). Si moins de 4 photos
   exploitables : `node .claude/skills/awwwards/scripts/photos.mjs sheet` puis `get` pour des photos libres cohérentes,
   crédit en colophon, flag `placeholder: true`.
6. Obligations KYW : `KywFooter` de `@kyw/footer` en bas de chaque page (`base={import.meta.env.BASE_URL}`), mention
   « Maquette KYW, certaines données sont illustratives », `<meta name="robots" content="noindex, nofollow">`, `lang="fr"`,
   copy en français sans tiret cadratin, vouvoiement, ponctuation française.
7. `astro.config.mjs` lit `process.env.KYW_BASE` et `KYW_SITE` (déjà le cas dans les gabarits) ; tous les liens et
   assets passent par `import.meta.env.BASE_URL`.

## 3. Vérification avant de rendre la main

```bash
node scripts/build-site.mjs sites/<slug>-portfolio
node .claude/skills/awwwards/scripts/serve.mjs dist --port 4400 &
node .claude/skills/awwwards/scripts/shoot.mjs http://127.0.0.1:4400/<slug>/portfolio/ --crawl --nav
node .claude/skills/awwwards/scripts/audit.mjs http://127.0.0.1:4400/<slug>/portfolio/ > .shots/audit.txt
```
Regarde chaque capture (desktop, mobile, reduced motion, clavier, hover). Corrige : erreurs console, débordements,
liens cassés, texte caché, images déformées, audit FAIL. Le gabarit était propre : toute régression vient de ton
adaptation. Arrête le serveur.

## 4. Livrables

- `sites/<slug>-portfolio/DESIGN.md` : choix du gabarit (matrice), liste des sections conservées / retirées / ajoutées,
  composants créés, décisions d'art direction, taux d'adéquation estimé (en %, avec les 3 raisons principales) et ce qui
  limiterait encore l'adéquation.
- `sites/<slug>-portfolio/RAPPORT.md` : placeholders (liste), résultat du shoot/audit, points ouverts, section
  « Leçons structurelles » (à reporter dans `agents/lecons.md` si un gabarit a un défaut : corrige aussi le gabarit
  dans `gabarits/<nom>/` pour les prochains restaurants, et note-le).
- Réponse finale : gabarit choisi et pourquoi (2 lignes), adéquation estimée, placeholders, problèmes ouverts.
