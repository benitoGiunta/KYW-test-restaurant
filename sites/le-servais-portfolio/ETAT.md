# ETAT, phase 1 sur 3 (construction-1), le-servais portfolio

## Fait
- Gabarit Journée copié, choix argumenté dans DESIGN.md (matrice). Package renommé `le-servais-portfolio`.
- `src/data/site.ts` entièrement réécrit depuis donnees.json : six moments (9h, 11h30, 16h, 18h, 20h, 23h), carte complète par rubriques, horaires réels du bar (fermeture après minuit), horaires de cuisine, formules de groupes, privatisation, presse. Seul élément `placeholder` : la photo de la Verrière (origine à confirmer). Téléphone marqué « à confirmer » (081 73 65 52 du site ; restaurants.json donne un autre numéro).
- Pages : accueil, carte, petit-dejeuner, groupes, maison, reservation, 404. Nav : Accueil, La carte, Petit-déj, Groupes, Réserver ; la maison est dans le pied de page.
- Moteur : frise et disque recalés sur 9h à 23h (base.css, Frise.astro, tokens.css, CIELS de journee.ts) ; badge ouvert/fermé corrigé pour une fermeture après minuit (`fin()` et débordement de la veille dans `journee.ts`) ; nuit en turquoise sombre.
- 12 recadrages WebP dans public/photos (script du scratchpad `servais-photos.mjs`), favicon, OG.
- Build OK : `pnpm build:site sites/le-servais-portfolio` écrit `dist/le-servais/portfolio/` (7 pages). Mention « Maquette KYW… » et noindex présents.

## Phase 2 (construction-2), faite
- Photos des Potes au Feu, logo.png et logo-pictogramme.svg supprimés de `public/photos/` (12 WebP restent, tous référencés) ; rebuild, dist 2,8 Mo.
- Signature ajoutée : « astre » du hero (≥ 1200 px) : photo du bar en disque (`bar-detail`, `fetchpriority=high`, sans reveal) entourée d'une orbite où un petit soleil se place à l'heure réelle (9h gauche, 23h droite, `--angle` tweené 1,6 s, replacé chaque minute ; avant 9h et après 23h il reste aux extrémités) ; zoom de la photo au défilement (scrub, `--zoom`). Code : `astre()` dans `src/motion/journee.ts`, CSS dans `base.css` (bloc « Astre du hero »), markup dans `index.astro`. Masqué sous 1200 px (recouvrement avec l'accroche à 1100).
- Motion existante du gabarit vérifiée avec le contenu réel : médaillons à 2 éléments, chips, frise, ciel, loader : OK. Reduced motion : pas de classe `motion`, aucun texte caché, loader absent, 0 erreur.
- Mesures (1440, 1280, 1024, 390, 360, 320 ; 7 pages) : aucun débordement horizontal, 0 erreur console, 0 image cassée, 0 cible < 24 px. Le signalement « figure à r=400 » à 390 est le reveal `scale` en cours (clip-path), sans effet.
- Clics réels de l'en-tête à 1440 (après loader) : les 5 liens changent d'URL, `elementFromPoint` renvoie le lien. Bas de page (accueil, carte, réservation) : mention « Maquette KYW… » et pied KYW visibles, un seul logo. Clavier : focus visible sur les 8 premières tabulations.
- État ouvert testé par `page.clock` + Europe/Brussels : mer 10h ouvert jusqu'à 01:00 ; ven 0h30 ouvert jusqu'à 01:00 ; sam 1h30 ouvert jusqu'à 02:00 ; sam 3h et mer 8h « ouvre à 09:00 » ; jeu 23h30 ouvert. Invitation « moment présent » cachée hors 9h-23h.
- audit.mjs accueil et groupes : 0 FAIL (WARN restants : faux positifs 404/robots/sitemap). Phrase répétée sur la carte corrigée (note du sharing).
- Pas de shoot complet (agent « captures »). Planches de contrôle dans `.shots/servais2/` (non commité).

## Reste (phase 3)
- Sur mobile, le hero ne montre pas l'astre mais l'image est quand même téléchargée (display: none) : 149 Ko, option `<picture>` à revoir si le LCP mobile pose problème.
- Option non faite : police condensée majuscule du site actuel ; photos libres (cocktail).
- Lire `QA-construction-2.md` de l'agent captures (contrastes de la nuit turquoise, médaillons, `photo--4x5` du comptoir à 20h).
- sloplint, RAPPORT.md, `pnpm index`, `gabarits/UTILISATION.md` (ajouter `journee | le-servais`, gabarits/ protégé), commit de `dist/le-servais/portfolio/`.

## Décisions et hypothèses
- Journée plutôt que Nocturne (listé dans sa fiche) : photos de jour majoritaires, horaires 9h à 1h.
- « 3+1 » écrit tel quel, sans expliquer la mécanique (non prouvée). Boulet liégeois affiché à 16,50 € (1 pièce) et 20,50 € (2 pièces). Bière à 33 cl pour « dernier verre ».
- Margarita à partager (25 €, ligne ambiguë du PDF) non reprise. Pas d'avis cité : un résumé d'avis Tripadvisor (1 avis, 4,0/5) est présenté comme résumé, sans guillemets.
- Itinéraire OpenStreetMap par recherche d'adresse (pas de GPS). JSON-LD sans `geo`.
- Aucun défaut du gabarit à reporter (gabarits/ non touché) ; le gabarit suppose des horaires sans fermeture après minuit : correctif fait dans le site, à reporter dans gabarits/journee si autorisé.

## Phase 3 (QA), faite
- Corrections : surcharge sombre du pied KYW retirée (contraste), pied passé en `position: relative; z-index: var(--z-content)` (masqué par #ciel). Vérifié par capture ciblée (carte, 1440) et axe 0 violation. Build OK, 7 pages. RAPPORT.md écrit.
- Reste : `gabarits/UTILISATION.md` et correctif gabarits/journee (protégé), image astre mobile.
