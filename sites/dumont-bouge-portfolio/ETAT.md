# ETAT : dumont-bouge-portfolio, phase 3 sur 3 (QA) : terminée

## Fait en phase 2
- **Signature : l'astre du hero** (>= 1200 px) : photo de la tarte en disque, orbite pointillée, soleil rose posé à l'heure réelle (rotation pilotée par `--heure`, donc il suit le moment affiché). Entrée dans la timeline d'intro (`--astre-in` 0 vers 1), dérive du disque vers le pointeur (`quickTo`, hover + >= 1200 px seulement), halo qui respire. Reduced motion : état final statique (vérifié). Code : `astre()` dans `src/motion/journee.ts`, bloc « Astre du hero » en fin de `base.css`, markup `[data-astre]` dans `index.astro`.
- Hero : badge « ouvert » en doublon avec l'en-tête retiré du hero ; marges resserrées (l'invitation « moment présent » tient dans 900 px) ; mobile : pastilles de moments avec snap et bord droit estompé.
- **Défauts de phase 1 corrigés** : (1) pied de page KYW repeint en foncé par le gabarit (mention et logo illisibles) : bandeau clair du paquet restauré ; (2) page élargie à 400 px en mobile par les reveals `scale` non joués (accueil, réservation) : `overflow-x: clip` sur `.hero, .moment, .section` (scrollWidth 390 sur les 5 pages) ; (3) texte courbé des médaillons qui se recouvrait (titre long) : texte répété jusqu'à ~70 signes puis étiré par `textLength` ; (4) photo `tarte-framboises.webp` : capture vidéo avec bandes noires et mention « Activer le son » recadrées (1800x864), variante `tarte-900.webp` pour l'astre ; (5) `.ligne:hover` sous `@media (hover: hover)` ; (6) CSS mort `.menu-soir` retiré ; photo du tea-room en 4/3 en mobile.
- Vérifié (Playwright ciblé, pas de shoot complet) : 6 pages sans erreur console ; clic réel sur les 5 liens d'en-tête (elementFromPoint = lien, navigation OK) ; bas de page 1440 : bandeau KYW, mention et logo visibles ; reduced motion (accueil) sans texte caché ; scrollWidth = largeur sur les 5 pages en 390. Build OK (`scripts/q.sh dumont-build pnpm build:site`).

## Reste (phase 3 / captures)
- Shoot et audit complets par l'agent « captures » (pas fait ici), puis RAPPORT.md (placeholders : aucun ; limites : voir DESIGN.md).
- Photo du tea-room : la tarte (capture vidéo 1800x864) est floue en portrait 4/5 sur desktop (15h30) ; acceptable, à remplacer si de meilleures photos arrivent.
- Logo `public/photos/logo.png` toujours non utilisé (en-tête = nom + disque rose) : décision conservée, à supprimer en phase 3 si inutile.
- `gabarits/UTILISATION.md` : ajouter `journee | dumont-bouge` (session mère). `pnpm index`, push et publication non faits ici (session mère).

## Pièges
- Le test de clic d'en-tête doit attendre `html.is-loaded` (loader ~5,5 s).
- Mobile : `isMobile` Playwright agrandit le viewport si un élément déborde (scrollWidth 400) ; mesurer aussi en contexte non mobile pour trouver le fautif.
- Hero : le badge d'en-tête est masqué en mobile sous 767 px dans `.badge--compact` seulement si la place manque ; ne pas remettre un badge dans `.hero__haut`.

## Phase 3 (QA)
- Fait : lecture QA-build.md et planches, 404 recapturé (0 violation), tirets des horaires remplacés, rebuild OK, RAPPORT.md écrit.
- Reste : session mère (index, UTILISATION.md, publication). Aucun défaut bloquant.
