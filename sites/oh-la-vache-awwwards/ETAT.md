# ETAT · oh-la-vache · awwwards · phase 3 (QA) terminée
## Fait (phase 1)
- DESIGN.md, scaffold Astro 5 (engine du site huile-sur-le-feu-awwwards), contenu réel, 5 pages statiques, build.
## Fait (phase 2)
- Module pilote `src/motion/cadran.ts` (heure 11:00 à 23:45 au scroll, horloge d'en-tête, aiguille de la marque, tache du hero qui tourne, deux-points du pied qui battent) ; `idle.ts` et `menu.ts` repris du site frère (menu adapté : balayage conique, seuil 1024 px).
- `setup.ts` : transition de page en balayage d'aiguille (masque conique, 0,7 s par sens), intro de la tache du hero (`[data-pose]`).
- Reveals : h1 `data-split="words" data-intro` (5 pages), titres h2 `data-split="lines"`, figures de la paire et chiffres `data-reveal="up"`.
- Hovers réécrits (3 traitements, `(hover: hover)` + `:focus-visible` + `:active`), lien du pied KYW souligné au survol.
- Menu mobile plein écran hors `<header>` (évite le `mix-blend-mode`) ; horloge masquée sous 40 rem.
- Corrigé : espaces parasites de la ligne « Ouvert 7 jours sur 7, dès 11 h. » (texte en un seul enfant flex) ; débordement horizontal créé par la rotation (`.hero { overflow-x: clip }`, `.hero__media { overflow: clip }`).
- Vérifié par script Playwright (port 4417) : aucune erreur console ni requête échouée ; scrollWidth = fenêtre à 1440, 390, 360, 320 ; horloge 11:00 en haut, 23:45 au pied et sur la 404 ; navigation vers /carte/ : rideau caché après, h1 visible ; menu : focus sur « Fermer », Tab piégé, Échap ferme et rend le focus ; réduit : 0 élément caché, pas de rotation.
- Build OK (`scripts/q.sh build pnpm build:site sites/oh-la-vache-awwwards`).
## Reste (phase 3)
- Shoot complet (agent captures), lire `report.json` : `noHoverChange`, `idleMotion`/`idleAt`, `settledMs`, `loaderMs` (pas de loader), `d-90..92`, contraste, cibles ; checklist 35, 36, 45 et 42 à 63 ; RAPPORT.md ; `pnpm index` ; commit de `dist/`.
- À regarder : intro de la tache (un saut possible si le premier rendu précède le script), lisibilité de l'horloge d'en-tête sur photo (difference), sticky des titres de la carte avec le h2 découpé.
## Décisions
- Concept B (cadran), pas de loader ni de GL, réservation par téléphone uniquement.
- L'horloge reste visible en mouvement réduit (texte mis à jour, sans animation).
- Données douteuses notées en phase 1 (adresse 58/581, vendredi, mardi) inchangées.

## Phase 3
- Corrigé : meta descriptions, galerie focusable, cibles liens. Build OK, audit 0 FAIL. RAPPORT.md écrit. Reste : critique jury indépendant, relecture de l'en-tête (difference) sur photo claire.
