# Rapport « Braise »

**Concept en une ligne** : le site est une soirée au feu qui refroidit, de 900 °C (le passe, noir fumée) à 20 °C (la
table, ivoire) ; une seule température pilote fond, encre, halo, grain, voile des photos et thermomètre, et le plat
signature se dresse en quatre couches au scrub.

## État

- Gabarit complet : accueil (9 sections), carte, histoire, réservation, privatisation, 404 ; `dist/gabarits/braise/` buildé.
- `node scripts/build-site.mjs gabarits/braise` : OK (6 pages, noindex et pied de page KYW contrôlés).
- QA mécanique (une passe shoot + audit, voir « Mesures ») : 0 erreur console sur les 6 pages, 0 lien cassé, 0 FAIL,
  pas de débordement horizontal, CLS 0,01-0,02, idleMotion vrai (halo qui respire), hover par rôle vérifié
  (bouton : remplissage braise ; lien : couleur ; ligne de carte : fond brun + vignette), reduced-motion sans mouvement.
- Critique `jury` : non lancée ici (règle des agents : revue par un agent distinct).

## Mesures (shoot accueil, passe 2 après corrections)

MESURES_A_COMPLETER

## Placeholders (`placeholder: true` dans `src/data/site.ts`)

e-mail de contact ; rôles de Sara et Jordan ; plats de la formule du midi et du lunch ; trois desserts ; accord mets et
vins et cocktail ; deux avis clients (marqués « avis illustratif ») ; 28 couverts et formule « chef à domicile » ;
températures de cuisson des quatre couches ; droits de trois photos reprises de la fiche Guide MICHELIN.

## Ce qui manque ou reste ouvert

- LCP : le loader (plancher 1,1 s + sortie 1,7 s) place le LCP desktop vers 4,5 s et le mobile bruité (CPU partagé
  entre trois agents) bien au-delà de 2,5 s ; l'élément LCP est `p.hero__lead`. Pistes pour l'agent de corrections :
  raccourcir la sortie du loader (0,8 s), rendre le hero sous le loader (`data-critical` est posé), ou retirer le loader
  sur mobile.
- Le zéro de Melodrama est barré (« 9ØØ ») : les chiffres (thermomètre, numéros 01-04, loader) sont passés en
  Literata 600 ; à valider par la revue.
- `scrollFps` desktop mesuré à 21 fps sous contention CPU (trois agents, trois Chromium) : à remesurer seul.
- Contraste pendant la bascule d'encre (130 → 110 °C) : transitoire, entre la section « Salle » et la bande d'avis.
- Pas de critique extérieure ni de passe « retire un accessoire » : à faire par l'agent de revue.
- Le plan est un SVG schématique ; la pastille ouvert/fermé lit l'heure locale du navigateur.

## Leçons structurelles (à reporter dans agents/lecons.md)

- `.shots/` est partagé entre les agents du tour (un agent frère y écrivait quatre-mains et affiche pendant mon
  shoot) : toujours `shoot.mjs … --out .shots/<id>` et un `audit-<id>.txt`, sinon `summary.json` et les `d-*.png`
  sont ceux d'un autre gabarit.
- Lenis émet un événement `scroll` dès `initScroll()`, avant le premier `onPage()` : un driver branché sur `onScroll`
  doit tolérer l'absence de ses clés (sinon l'exception dans `boot()` bloque le loader à sa valeur initiale, page noire).
- `pkill -f "<motif>"` depuis Bash tue aussi le shell courant si le motif figure dans la commande (exit 144) : lancer
  les captures via un script dans le scratchpad et tuer par PID.
- Un script Playwright maison doit vivre dans `scripts/` et lancer Chromium avec
  `executablePath: '/opt/pw-browsers/chromium'` (le binaire `chromium_headless_shell-1248` attendu par la version
  installée de Playwright n'existe pas).
- Un `<button>` seul dans un `<li>` en `display:grid` à deux colonnes tombe dans la première colonne (2,5 rem) :
  vérifier les planches mobiles pour les listes à grille imbriquée.
- Un marquee flex : poser `flex: 0 0 auto` sur chaque item et `white-space: nowrap` sur les `<p>` (le `text-wrap: pretty`
  de la fondation les fait replier en colonne).
