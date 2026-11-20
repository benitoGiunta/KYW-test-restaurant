# ETAT : le-lodge-wepion, variante portfolio, passe construction-3 (phase 3 sur 3, QA terminée)

## Fait (phase 1)
- Gabarit guinguette adapté (7 pages, carte réelle, 12 photos, bandeau d'annonce, composants `Annonce`, `Lieux`), voir `DESIGN.md`.

## Fait (phase 2)
- Signature « la table » : tirages réorganisés (6 en haut, 6 en bas) pour que le titre reste lisible ; bouton « Ranger la table » (desktop, `aria-disabled` jusqu'à la fin de l'intro, retour animé, message `role=status`) ; curseur « Attrapez » (paille) masqué pendant le drag ; le badge « attrapez-moi » s'efface à la première prise (`is-pris`) ; flèches clavier conservées (testées).
- Signature Meuse : composant `Vague` (deux nappes canard qui glissent en sens inverse) au bord haut de la table et du pied de page ; statique en reduced motion.
- Bandeau défilant : copies jusqu'à couvrir la fenêtre (testé à 2560), bouton Pause (aria-pressed), pause au survol et au focus, version statique centrée sans doublon en reduced motion.
- États : `:active` des boutons, survol des cartes `Lieux` et `carte-avis`, focus visibles conservés.
- Mobile : barre de nav du bas tient en une ligne à 360 et 390 (« La maison » devient « Maison », corps réduit) ; à 320 elle défile (repli) ; parasol du manifeste ne recouvre plus le titre.
- Correctif de gabarit local : `.table .table__rail` (le rail mobile s'affichait en desktop et décalait le titre de la table).
- Favicon : soleil corail sur vague lin, fond canard (`public/favicon.svg`).
- Build : `pnpm build:site sites/le-lodge-wepion-portfolio` passe (7 pages). Mesures 1440, 1024, 390, 360, 320 sur 7 pages : pas de débordement horizontal, aucune erreur console.
- Contrôles : clics réels sur chaque lien d'en-tête à 1440 (voir fin), reduced motion sans animation active hors objets, pause du bandeau testée.

## Reste (phase 3 et captures)
- OG image sans texte (composer un visuel avec le nom, via HTML de scratchpad + polices de `public/fonts`).
- Alt et légendes à relire ; `RAPPORT.md` ; sloplint ; shoot et audit complets par l'agent « captures ».
- Vérifier en capture : hero 1440 (objets), nav 960 à 1200 px (6 liens), bas de page (mention Maquette KYW, logo) sur toutes les pages, `carte-avis` à 3 cartes en 768.
- `.carte` de l'accueil mesurée à -9/369 px en 360 (transitoire du reveal `scale` ? à confirmer par capture).
- `pnpm index` et commit final avec `[publier]` en fin de restaurant seulement.

## Décisions et hypothèses
- Identiques à la phase 1 (aucun horaire, accueil provisoire Erpent à confirmer, avis sans note, aucun placeholder).
- Pas de pause « manuelle » pour la vague : décor seul, animation lente, supprimée en reduced motion.

## Pièges
- `gabarits/UTILISATION.md` à mettre à jour par l'orchestrateur : « guinguette | le-lodge-wepion » ; défaut `.rail`/`.table__rail` à reporter dans `gabarits/guinguette` (protégé).
- Test de clic d'en-tête : lent (6 pages × 6 liens), à lancer en arrière-plan.

## Phase 3 (QA)
- Fait : contraste pied de page, méta description, formulation « à confirmer » ; vérifications ciblées dans RAPPORT.md. Build final OK (7 pages).
- Reste : `pnpm index`, mise à jour de `gabarits/UTILISATION.md`, commit `[publier]` (orchestrateur).

## Revue passe 1 (relecteur-site) : REVUE-1.md écrite, verdict A_CORRIGER
- Fait : lecture QA-revue1 + planche home, mesure 7 pages x 4 largeurs, balayage hero 640 à 1280, captures 1440/390 des pages absentes du QA, texte du dist confronté à donnees.json. Serveur 4617 arrêté (kill du PID noté).
- Reste pour le réviseur : F1-1 (base.css:95 slogan coupé 768-1060), F2-1 à F2-6, F3 selon temps. Mesures utiles : scratchpad `lodge-r1-mesure.mjs`, `lodge-r1-sweep.mjs` (non versionnés).
- Pièges : captures 390 des 5 pages non relues une à une ; prix vérifiés par échantillon.

## Revue passe 2 (relecteur-site) : REVUE-2.md écrite, verdict PUBLIABLE (0 F0, 0 F1, 2 F2, 6 F3)
- Fait : 7 corrections de REVISION-1 vérifiées (slogan sur 16 largeurs, citation, presse, « à confirmer », formulaire, contraste, eyebrows) ; mesure 7 pages x 4 largeurs ; serveur 4861 arrêté (kill du PID noté).
- Reste (optionnel) : F2-A section « Votre demande » à supprimer, F2-B redondance de fermeture / cartes d'avis, F3 (role region du bandeau, canonical 404, JSON-LD vide, apostrophes, og.jpg).
- Pièges : leçon proposée dans data/usage/test-1/lecons-proposees/le-lodge-wepion.md ; rien commité par le relecteur.
