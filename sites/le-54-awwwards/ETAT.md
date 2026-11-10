# ETAT · Le 54 · awwwards · fin de la phase 2 (construction-2)

## Fait (phase 1)
- DESIGN.md (concept « Trente-quatre couverts », système), 5 pages statiques, engine sans GL ni loader, favicon, OG provisoire, polices, RAPPORT.md.

## Fait (phase 2)
- `src/motion/couverts.ts` : pilote unique (variable `n`) : signature « la salle se dresse » (nappes puis 34 places, puis `n` places allumées), repos (place cherchée + halo, `gsap.ticker`, pause hors écran), pointeur (place désignée), registre du pied qui se pose et suit `n`, champ « Nombre de couverts » de la réservation qui allume N places (+ phrase `aria-live`).
- `src/motion/menu.ts` + `Header.astro` : menu mobile `<dialog>` plein écran sous 48 rem (« Menu », `aria-expanded`, focus piégé, Échap, retour du focus, « Appeler »).
- Reveals déclaratifs (`data-split`, `data-reveal`, `data-intro`) sur toutes les pages ; h1 et accroches non animés.
- Survols : trait qui se pose (`.lien`, `.trait`), CTA qui se vide, photos du mur qui se posent ; `:focus-visible` et `:active` ; pied KYW souligné au survol ; `.split-line` pour les capitales accentuées.
- Réservation : plan déplacé dans la colonne gauche du formulaire (à côté du champ couverts) ; horaires et accès sur deux colonnes.
- Build OK (`scripts/q.sh aw2-build pnpm build:site sites/le-54-awwwards`). Contrôle navigateur (`.logs/aw2-check.log`) : 0 erreur console ni requête échouée ; dressage 0 place à 0,3 s, 34 + 2 allumées à 3,3 s ; halo qui évolue ; pointeur désigne ; réservation 6 → 6 places et 6 ronds, 40 → 34 et message ; `scrollWidth` = 390 sur les 5 pages ; menu conforme ; réduit : tout visible, pas de Lenis.
- DESIGN.md : § « Mouvement construit (phase 2) » et checklist 19 à 47 avec preuves.

## Reste (phase 3)
- Shoot complet (agent captures) puis lecture de `report.json` : points 35 (`noHoverChange`), 36 (`idleMotion`, le halo + la place en veille doivent dépasser le seuil de 0,05 % de pixels ; sinon agrandir le halo), 39, 44, 45, 47.
- LCP (h1 « Le 54 »), CLS, axe, OG à recomposer avec le plan dressé (nom, plan, sans interface), sloplint, points 42 à 63, `pnpm index`, RAPPORT final.
- Vérifier au clavier le lien actif de la nav et la nappe du menu sur un vrai téléphone (clip-path sur `<dialog>`).

## Décisions et pièges
- Pas de loader, pas de GL, pas de curseur suiveur, pas de `data-magnetic` (table qui joue la retenue).
- État de départ du dressage posé en CSS (`.motion .plan__place { opacity: 0 }`) : si le pilote échoue, le plan reste vide ; sans `.motion` (réduit, sans JS) il est servi dressé.
- Le pilote éteint les plans au départ (motion) puis rallume `n` à la fin du dressage ; sur la 404 `n = 0` (registre éteint aussi).
- Repos sur toucher : pas d'entrée de vélocité (la place cherchée tourne seule).
