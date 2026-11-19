# ETAT — wok-de-jin · portfolio · phase 3 sur 3 (QA terminée)

## Fait en phase 2
- Signature « La grande tablée » : bug corrigé (le rail mobile s'affichait aussi en desktop, +650 px de hauteur et titre décentré : `.table .table__rail`) ; 12 tirages repositionnés (haut, bas, deux flancs) pour laisser le titre lisible au centre ; bouton « Ranger la table » (desktop, remet tirages et objets en place avec rebond, aussi en reduced motion, sans animation) ; curseur `grab` sur les tirages.
- Motion : vapeur animée (`.vap`, opacité + translation décalées) sur le bol (hero, tarifs, loader) et le wok ; animation coupée hors `html.motion`.
- États : `:active` des boutons, survol d'une ligne de tarif (prix corail), formulaire de réservation (`:user-invalid` bordure corail + « À compléter », ligne `role="status"` après envoi).
- Mobile : barre de nav du bas réduite à 4 liens (Accueil et Contact masqués sous 768 px : la marque et « Réserver » couvrent ces cibles), 353 px utiles, cibles 34 px.
- Reduced motion : repli à plat de la table (écarts, gouttière), aucun élément caché sur /, /tarifs/, /reveillon/ (mesure opacité/visibility après défilement).
- Mesures (mini-scripts, 1440/1024/768/390/360/320 × 7 pages) : 0 erreur console, 0 débordement visible ; les `scrollWidth` > 0 sur l'accueil viennent du `data-reveal="scale"` (clip-path, `overflow-x: clip`), pas d'un défilement horizontal réel. Clics réels sur les 6 liens d'en-tête : OK ; bas de page 1440 : bande KYW et mention visibles.
- Build OK (`scripts/q.sh wok-p2-build node scripts/build-site.mjs sites/wok-de-jin-portfolio`).

## Reste (phase 3)
- Shoot complet par l'agent « captures » (non fait ici), audit axe (contraste texte sur bordeaux et corail).
- Capture reduced motion de la table revue après la dernière règle CSS : OK (grille à plat, gouttière).
- Typographie : U+00A0 dans les guillemets, apostrophes ; relire les textes.
- RAPPORT.md (placeholders : aucun `placeholder: true` côté contenu ; e-mail jamais affiché).
- Décider du logo rond (`public/photos/logo.png`) : non utilisé.
- `gabarits/UTILISATION.md` : ajouter « guinguette | wok-de-jin » (gabarits/ protégé, à faire en fin de lot). Le défaut `.table__rail` est à corriger dans `gabarits/guinguette/` (protégé).

## Pièges
- Ne pas rebuilder pendant un shoot ou une mesure de fond (dist vidé sous le serveur).
- Serveur de test (PID 5213) arrêté en fin de passe.

## Phase 3 (QA)
- Fait : axe ciblé 7 pages (0 violation), 404 réelle vérifiée, apostrophes de la 404 corrigées, build final OK, RAPPORT.md écrit.
- Reste : UTILISATION.md et gabarits/guinguette (protégés), commit [publier] et pnpm index par l'orchestrateur.
- Serveur de test PID 15648 arrêté.
