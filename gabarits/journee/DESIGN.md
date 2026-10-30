# DESIGN.md : gabarit « Journée »

## Concept Card

- **Idée** : la page d'accueil est un cadran. Six moments (7h café, 9h brunch, 12h déjeuner, 17h apéro, 19h dîner,
  23h dernier verre) se suivent au scroll ; le ciel (dégradé à deux arrêts, aube → blanc → ocre → corail → nuit) tourne
  avec eux, un disque soleil/lune descend sur une frise sticky, et le site s'ouvre à l'heure réelle du visiteur
  (loader qui compte jusqu'à l'heure, badge « ouvert jusqu'à… » calculé sur les horaires réels, invitation cliquable « aller au
  moment présent » dans le hero ; jamais de défilement automatique, révision 1).
- **Métaphore** : une journée de service vue depuis la terrasse.
- **Émotion** : la disponibilité, « à n'importe quelle heure, il y a quelque chose pour vous ».
- **Verbe de motion** : tourne comme une horloge.
- **Signature** : le ciel qui tourne (gsap.to sur `--ciel-haut`, `--ciel-bas`, `--encre` déclenché par 6 ScrollTrigger
  `onToggle`) + le disque de la frise qui passe de soleil à lune en 6 crans + l'horloge du hero dont les chiffres
  défilent de 00:00 à l'heure réelle.
- **Capture rêvée** : le moment 17h, fond corail, « L'apéro, dès 17h » en Bricolage 800, trois verres, la frise à droite
  avec le soleil bas.

## Références (ce qu'on retient, sans copier)

- florporto : frise du jour sticky à droite, heure locale en direct, sections « from 10:00 ».
- delice : horaires par jour à flèches avec lignes salle / bar, médaillons ronds à titre courbé.
- hangar-7 : badge « ouvert aujourd'hui 09:00 - 22:00 » à point coloré, chips sous le hero.

## Système

- **Palette** (jetons `tokens.css`) : aube `#FBF6EC`, midi `#FFFFFF`, soleil `#E79A2E`, crépuscule `#D9614E`, nuit
  `#13203A`, nuit profonde `#0B1324`, ink `#1B1B1B`, ivoire `#FBF6EC` (texte inversé). Ciel = deux arrêts, jamais de
  flou, jamais de violet.
- **Typo** : Bricolage Grotesque (Google, variable opsz 12..96 / wght 400..800, auto-hébergée
  `public/fonts/bricolage-400_800-normal.woff2`) en display 800, tracking -0.03em, `font-optical-sizing: auto` ;
  Rethink Sans (Google, variable 400..800, `rethink-400_800-normal.woff2`) pour le texte et l'UI, 400 et 600,
  `tabular-nums` sur les chiffres.
- **Échelle** : `--t-mega` clamp(3.4rem … 11rem) plafonnée 4.6rem en mobile (mot le plus long « Potes » / « Déjeuner »
  tient en 390 px) ; `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`.
- **Grille** : 12 colonnes ; frise sticky dans la colonne 12 (desktop), contenu sur 1-10 ; en mobile, frise horizontale
  fixée sous l'en-tête.
- **Radius** : 999px chips et boutons, 24 px cartes de moment, 16 px photos.
- **Motion language** : easing `ease.out` / `ease.inOut` du moteur ; ciel tweené 1,1 s ; soleil 0,9 s ; révélations
  par masque (`data-split`, `data-reveal`) ; aucune texture, aucun flou.

## Wireframes

```
HERO (100vh, ciel réglé à l'heure réelle)          FRISE (sticky droite)
┌───────────────────────────────────────┬──┐       7h ─●  (disque soleil)
│ ● ouvert jusqu'à 21:00     19:42:07   │  │       9h ─
│                                       │  │      12h ─
│ LES POTES AU FEU  (mega, Bricolage)   │  │      17h ─
│ Bistronomie à Namur, du matin au soir │  │      19h ─
│ (chips) ☕7h  🍳9h  12h  🍸17h  19h  23h │  │      23h ─
└───────────────────────────────────────┴──┘
7h CAFÉ (split)        [titre+heure | photo salle de jour] + 3 lignes de carte
9h BRUNCH (médaillons) [3 cercles d'assiettes vues du dessus, titre courbé en textPath, formule + prix]
12h DÉJEUNER (liste)   [7 lignes lundi…dimanche, plat + prix tabulaire ; formules réelles 52 € / 40 €]
17h APÉRO (bande)      [rangée de cartes cocktails/bières défilable, badge happy hour, photo bar]
19h DÎNER (pair asym.) [photo cuisine | menu dégustation 67 € (réel) + réserver] texte inversé
23h DERNIER VERRE      [phrase courte, horaires à flèches ‹ jour › lignes cuisine / bar]
FOOTER finale          [nom géant, adresse, réseaux] + KywFooter
```

## Test de généricité

Un modèle ferait trois blocs petit-déjeuner / déjeuner / dîner avec une photo chacun. Ici l'heure réelle entre dans
la page : le loader compte jusqu'à l'heure, le badge dit ce qui est ouvert maintenant à partir des horaires réels, le
ciel et la frise sont à l'heure, le hero invite à rejoindre le moment courant (au clic). Cela n'a de sens que pour un lieu qui vit toute la
journée, ce que le gabarit assume (les moments non prouvés pour Les Potes au Feu sont marqués illustratifs).

## Checklist des règles dures (preuves dans RAPPORT.md après QA)

- [x] Polices auto-hébergées, préchargées (`Base.astro` liste `polices`).
- [x] Hero LCP peint au premier rendu (horloge et nom sans `data-reveal`/`data-intro` sur l'accroche).
- [x] Loader < 2,6 s (plancher 1,1 s + sortie 0,8 s).
- [x] Reduced motion : pas de scrollTo automatique, ciel par section sans tween, heure affichée sans défilement.
- [x] Hover par rôle : chips (fond soleil), flèches (4 px), liens (soulignement), boutons (inversion), cartes apéro (lever).
- [x] Idle : la seconde tourne sur l'anneau de l'horloge du hero, le point de l'invitation « moment présent » respire (2,4 s) ; le hero reste à l'écran au chargement, donc le mouvement au repos est visible.
- [x] `noindex`, `lang="fr"`, KywFooter sur chaque page, une seule mention « Maquette KYW ».
- [x] Tout lien/asset via `u()`/`asset()`.
- [x] 0 FAIL shoot/audit, 0 erreur console, pas de débordement, axe sans violation sérieuse : passe 1 sur 6 pages (`.shots-journee/`, `audit-journee.txt` : 0 FAIL, 3 WARN normaux sous base) ; 1 violation `scrollable-region-focusable` corrigée (tabindex) ; mesures dans RAPPORT.md.
- [x] LCP : h1 du hero peint sous le loader (292 ms desktop, 1,6 s mobile throttlé) ; photos de hero des pages intérieures sans reveal.

## Décisions de la révision 1 (30/10/2026, REVUE-1 → REVISION-1.md)

- **Plus d'arrivée automatique** : l'ancien `arrivee()` faisait défiler vers le moment courant 0,9 s après le loader, le
  hero (nom, accroche, horloge, chips) n'était jamais vu et la nuit on tombait en bas de page. Remplacé par
  `invitation()` : un lien « Il est 17h30 : aller au moment présent, l'apéro (illustratif) » sous les chips, suivi au
  clic seulement ; caché avant 7h et dès 23h. Un moment non prouvé est annoncé « (illustratif) » dans l'invitation même.
- **Texte doux** : `--encre-doux` à 0,72 sur les ciels clairs (≥ 6,0:1 sur aube-basse et ocre pâle) et encre pleine sur
  le corail (4,73:1 sur `#d9614e`, 7,4:1 sur `#e79a2e`) ; nuit inchangée (≥ 5,4:1). Calcul sur les deux arrêts de chaque
  dégradé, pas sur la moyenne. Sur le corail, la hiérarchie passe par la taille et la graisse, plus par la couleur.
- **Brunch** : le restaurant est fermé le week-end. La page reste comme démonstration du moment « 9h » mais est
  entièrement marquée exemple (bandeau plein en tête, peint sans JS, tags sur accroche, assiettes, formule), sans heures,
  sans CTA de réservation (« Voir les horaires réels » et « Le dîner, du lundi au vendredi »), titre « Brunch, page
  d'exemple ». Pour un client qui sert un brunch, retirer le bandeau et les tags.
- **E-mail** : une adresse `placeholder` n'est jamais un `mailto:` (bouton retiré de Réservation, texte simple + tag dans
  le pied de page).
- **En-tête mobile** : fond opaque (`--ciel-haut` plein, 96 % en desktop, toujours sans flou), rangées resserrées,
  frise 2,7 rem avec ses heures dans la boîte (elles débordaient sous l’en-tête) ; les 3 rangées restent (la frise
  mobile est la signature du concept), ≈ 120 px sur 844. Photo de hero du brunch en 960 px (LCP mobile 1,95 s).
