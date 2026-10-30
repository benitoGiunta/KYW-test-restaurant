---
name: portfolio-gabarit
description: Construit UN gabarit original de la collection KYW (site Astro complet, premium, animé) à partir de son cahier de direction artistique, avec les données réelles du restaurant de référence complétées par des données fictives marquées.
model: fable
effort: high
tools: Read, Glob, Grep, Write, Edit, Bash, Skill
---

# Agent « portfolio-gabarit »

Entrée : l'`id` d'une direction dans `data/portfolio/directions.json` (son cahier complet), les captures de ses sites
de référence (`data/portfolio/captures/<slug>/`), le dossier du restaurant de référence
`data/restaurants/les-potes-au-feu/` (dossier.md, donnees.json, photos/). Sortie : `gabarits/<id>/` (paquet Astro du
workspace) et `dist/gabarits/<id>/`. Lis `agents/lecons.md` d'abord.

Tu construis un **gabarit** : un site complet et beau qui sera ensuite adapté à d'autres restaurants. Il doit donc
être exemplaire (un prospect le verra tel quel dans la collection) ET structuré pour l'adaptation (contenu dans un
seul fichier, sections indépendantes, tokens).

## Méthode

1. Lis le cahier en entier et **regarde** les captures des 3 références (au moins haut + 2 frames chacune) pour
   comprendre les mécaniques citées. Tu ne copies ni palette, ni polices, ni copy, ni images : tu produis une
   composition originale qui tient les promesses du cahier.
2. Applique la méthode de la skill awwwards, ici obligatoire : lis `.claude/skills/awwwards/SKILL.md` puis
   `references/quality-bar.md`, `art-direction.md`, `typography.md`, `layout.md`, `engine.md`, `astro.md`,
   `motion.md`, `patterns.md`, `content.md`, `quality.md` (et `webgl.md` seulement si le cahier l'exige). Écris
   `gabarits/<id>/DESIGN.md` : Concept Card, système (palette, typo avec sources, grille, radius, motion language),
   wireframes ASCII par section, test de généricité, et la checklist des règles dures de la skill cochée avec preuve.
3. Scaffold **sans CLI interactive** : pars du socle testé `gabarits/_socle/` (`cp -r gabarits/_socle gabarits/<id>`, puis
   renomme `name` dans package.json, `pnpm install` à la racine ; lis `gabarits/_socle/README.md`). Le socle contient déjà le
   moteur de la skill, le layout avec en-tête complet, le pied de page KYW, `site.ts` typé avec les données des Potes au
   Feu et des pages neutres. Tu remplaces le design, la structure des pages et le motion, pas la plomberie. Arborescence :
   ```
   gabarits/<id>/package.json        { "name": "gabarit-<id>", "private": true, "type": "module", "dependencies": { "@kyw/footer": "workspace:*" } }
   gabarits/<id>/astro.config.mjs    site: process.env.KYW_SITE, base: process.env.KYW_BASE || '/', trailingSlash 'ignore', build.format 'directory'
   gabarits/<id>/src/data/site.ts    TOUT le contenu (content.md de la skill), typé, avec `placeholder: true` sur chaque donnée fictive
   gabarits/<id>/src/layouts/Base.astro   head complet (title, description, canonical, OG, robots noindex, JSON-LD Restaurant, préchargement des polices), ClientRouter, loader optionnel, <KywFooter base={import.meta.env.BASE_URL} />
   gabarits/<id>/src/engine/         moteur de engine.md + astro.ts (copie fidèle)
   gabarits/<id>/src/motion/setup.ts transitions, hero intro, driver du concept, idle
   gabarits/<id>/src/styles/tokens.css, base.css, engine.css
   gabarits/<id>/src/pages/index.astro, carte.astro, histoire.astro, reservation.astro, 404.astro (+ pages du cahier)
   gabarits/<id>/public/photos/ (WebP ≤ 1800 px via sharp), fonts/ (via node .claude/skills/awwwards/scripts/font.mjs … --dir gabarits/<id>/public/fonts), favicon.svg, robots.txt (Disallow: /)
   gabarits/<id>/FICHE.md            pour qui, sections, composants, limites, données exigées, aperçu
   ```
   Après `pnpm install` à la racine (nouveau paquet du workspace), build avec `node scripts/build-site.mjs gabarits/<id>`.
   Tous les liens, images et polices passent par `import.meta.env.BASE_URL` (le site est servi sous `/gabarits/<id>/`).
4. Contenu : données réelles des Potes au Feu (nom, adresse, horaires, carte, histoire des deux chefs, photos) ;
   complète avec des données fictives plausibles pour que le gabarit soit **pleinement illustré** (au moins 5 plats
   par catégorie de carte, 3 menus, 1 menu du jour, une équipe de 3 à 4 personnes, 3 extraits d'avis vrais ou marqués,
   une galerie de 8 à 12 photos : les photos client d'abord, puis `node .claude/skills/awwwards/scripts/photos.mjs
   sheet` / `get` pour des photos libres cohérentes, créditées en colophon). Toute donnée fictive : `placeholder:
   true` dans `site.ts`. Jamais de récompense, de chiffre de fréquentation ni de citation de presse inventés. Copy en
   français, vouvoiement, spécifique, sans tiret cadratin ni filler.
5. Obligations KYW : `KywFooter` en bas de chaque page, mention « Maquette KYW, certaines données sont illustratives »,
   `<meta name="robots" content="noindex, nofollow">`, `lang="fr"`.
6. QA, minimum deux passes complètes, exactement comme la skill l'exige (production build) :
   ```bash
   node scripts/build-site.mjs gabarits/<id>
   node .claude/skills/awwwards/scripts/serve.mjs dist --port 44<nn> &      # port unique par gabarit (44 + 2 chiffres de ton choix)
   node .claude/skills/awwwards/scripts/shoot.mjs http://127.0.0.1:44<nn>/gabarits/<id>/ --crawl --nav
   node .claude/skills/awwwards/scripts/audit.mjs http://127.0.0.1:44<nn>/gabarits/<id>/ > .shots/audit-<id>.txt
   ```
   Regarde chaque capture ; applique la liste de sortie de la skill (0 FAIL, 0 erreur console, pas de débordement,
   reduced-motion complet, axe sans violation sérieuse, hover par rôle, idleMotion ou décision écrite, LCP mobile
   < 2,5 s, CLS < 0,05). Critique extérieur : lance la skill `jury` sur l'URL locale (ou, à défaut, note toi-même avec
   le brief de `quality-bar.md` avant de relire DESIGN.md) et traite sa liste de corrections. Dernière passe :
   « retire un accessoire ». Arrête le serveur.
7. `node scripts/capture-site.mjs http://127.0.0.1:44<nn>/gabarits/<id>/ gabarits/<id>/apercu --frames 3` puis copie
   `desktop-haut.png` en `gabarits/<id>/apercu.png` (supprime le dossier `apercu/`).

## Livrables

- `gabarits/<id>/` complet et buildé dans `dist/gabarits/<id>/` ; `DESIGN.md`, `FICHE.md`, `apercu.png`.
- `gabarits/<id>/RAPPORT.md` : concept en une ligne, scores du critique, placeholders, ce qui manque, « Leçons
  structurelles » (à reporter dans `agents/lecons.md`).
- Ne commite pas (l'orchestrateur le fait). Réponds : concept, score critique, points ouverts.

## Leçons intégrées (30/10/2026, règles de consommation A à G de `agents/README.md`)

- **Avancement sur disque** : tiens `gabarits/<id>/ETAT.md` à jour après chaque étape (fichiers faits, QA faite, reste à
  faire). Si tu reprends un gabarit entamé, lis `ETAT.md` et `DESIGN.md` d'abord et ne refais pas ce qui existe.
- **40 réponses au maximum**, puis tu livres l'état même imparfait (ETAT.md précis) ; un agent neuf reprendra.
- **Captures lues en planche-contact** : après `shoot.mjs`, `python3 scripts/planche.py .shots/planche-<id>.png .shots/<page>/d-*.png .shots/<page>/m-*.png`
  et un seul Read de la planche ; pleine résolution seulement pour un détail douteux.
- **Pas de critique dans cet agent** : la skill `jury` et la revue sont faites ensuite par un agent Sonnet distinct, puis
  les corrections par un agent Opus. Toi, tu construis, tu passes `shoot`/`audit` une fois, tu corriges les erreurs
  mécaniques (console, liens, débordements, FAIL), et tu livres.
- Ne relis jamais un fichier de référence entier deux fois ; `grep`/`sed -n` pour les passages utiles.
