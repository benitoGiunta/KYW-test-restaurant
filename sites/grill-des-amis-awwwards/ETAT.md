# ETAT : Grill des amiS, variante awwwards (fin de la phase 3)

## Fait (phase 1)
- DESIGN.md (concept « Du brut au feu »), scaffold, contenu réel (68 plats), 5 pages, head complet, photos, build. Voir DESIGN.md.

## Fait (phase 2)
- Pilote `src/motion/tranche.ts` (feu des gestes, tranche des photos, intro et repos du hero, rubriques de la carte) + `src/motion/idle.ts` ; `setup.ts` (transition lame corrigée : la lame est sortie du panneau pour rester visible à l'arrivée) ; menu en `expo` (plus de `steps`).
- Reveals déclaratifs : `data-split="lines"` sur les titres de section, la citation et le mot du pied ; `data-reveal="up"` sur blocs sans lien ; `data-tranche` sur 13 photos.
- Hovers réécrits sous `@media (hover: hover)` + `:focus-visible` + `:active` ; lien KYW souligné au survol ; `::selection` braise.
- En-tête à hauteur fixe `--tete-h` (4,5 rem), opaque sur la carte : la bande des rubriques colle dessous (avant : texte visible entre en-tête et bande).
- Contrôles Playwright (1440, 390, réduit) : aucune erreur console, `scrollWidth` = largeur sur les 5 pages, texte caché 0 après défilement, coupes toutes terminées, menu accessible, transition 1,14 s.
- Build OK (`.logs/awwwards2-build.log`).

## Fait (phase 3)
- QA-build.md absent (shoot de l'agent captures échoué) : shoot ciblé des 4 pages + audit par moi. 0 FAIL, 2 WARN justifiés. Deux corrections vérifiées (repos du hero, survol du lien courant). RAPPORT.md écrit. Build final OK, `pnpm index`.

## Reste
- Critique jury indépendant (Agent indisponible ici), scores non chiffrés ; `og.png` non recomposée ; DESIGN.md points 42 à 63 non mis à jour (preuves dans RAPPORT.md).

## Décisions et pièges
- Pas de loader, de GL, de curseur suiveur ni de magnétisme (contraire au verbe « trancher »). Pas d'aperçu au curseur des index : aucune photo par plat.
- Le haut de la photo des flammes est naturellement noir : ce n'est pas un trou de mise en page.
- Repos : si `settledMs` passe à null en phase 3, baisser l'opacité ou la vitesse de `.hero__lame` (tranche.ts, période 7 s).
- Horaires, photo des patrons, `.pied__col` en `nth-of-type` : voir phase 1 (inchangé).

## Relecture passe 1 (relecteur-site, 10/11/2026)
- Fait : REVUE-1.md écrit, verdict A_CORRIGER (0 F0, 2 F1, 4 F2, 5 F3). QA-revue1.md absent : mesures maison sur `dist/` (serveur port 4471 arrêté).
- À corriger en révision : F1-1 état d'ouverture faux (`menu.ts:21`), F1-2 deux phrases hors dossier (`site.ts:40`, `index.astro:78`), puis F2 (en-tête translucide, og.png, terrasse, cible du logo).
- Piège : ne pas relancer de shoot complet, vérifier F1-1 sous `page.clock.install` (mardi 12 h, lundi 23 h, samedi 23 h).

## Relecture passe 2 (relecteur-site, 10/11/2026)
- Fait : REVUE-2.md écrit, verdict PUBLIABLE (0 F0, 0 F1, 0 F2, 3 F3). Les 11 corrections de REVISION-1 vérifiées (10 confirmées, F2-2 partielle : og.png sans photo ni polices du site ; F3-4 sans effet mais sans gravité). Serveur port 4768 arrêté.
- Reste (facultatif) : og.png avec Anton, Newsreader et photo de braise ; alt de la terrasse (« autour des tables »).
- Piège : « Fermé, rouvre demain » un mercredi est juste (jeudi ouvert).
