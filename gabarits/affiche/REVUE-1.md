# Revue gabarit affiche · Les Potes au Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de bistrot en aplats rouge, jaune et vert, titres massifs, étiquettes de prix collées, où la page défile comme on tourne des affiches et où la signature est un plat d'assiette rouge qui « s'empile » en couches.

Méthode : build OK (6 pages), captures `.shots-affiche-revue/<page>/` (6 shoots lancés en parallèle, donc timings pessimistes), planches `p-*.png`, vérifications Playwright ciblées en série (sans charge). Skill `jury` non lancée (critique frais trop long pour 40 réponses) : score personnel avec `quality-bar.md`.

Scores /10 (pondéré Awwwards : ~7,0 ; développeur : ~6)
- Design 7,5 : palette tricolore tenue, type affiche en capitale 900, ordre rythmé (`d-02-scroll` l'empilement 01 à 05 avec le 67 €, `d-04-scroll` horaires en tickets) ; perd des points sur les césures mobiles.
- Usabilité 6 : navigation claire, skip link, focus visible partout sauf le disque CTA de la galerie ; LCP mobile 5,9 à 8,8 s et 19 fps sur l'accueil mobile.
- Créativité 7,5 : concept propre au lieu (assiette rouge, bistrot, étiquettes « exemple »), pas déplaçable chez un autre ; l'horizontale épinglée est un trope de saison.
- Contenu 7 : texte spécifique, zéro filler, zéro tiret cadratin, vouvoiement ; les données fictives sont toutes balisées `exemple` (voir F3).
- Technique 6 : 0 erreur console, 0 requête en échec, 0 lien mort, noindex/mention/JSON-LD/lang sur 6 pages sur 6 ; mais axe serious et perf mobile.

## Findings

### F0 bloquant : aucun
Build OK ; pas de fait faux ni d'invention non marquée (adresse « bord de Meuse, côté Citadelle » et « bar en chêne, cuisine ouverte » sont dans dossier.md l. 95-96 et 128).

### F1 majeurs
- **F1-1 Disque CTA de la galerie hors écran au focus clavier** (confirmé). `a.disque` « Réserver une table » prend le focus à `left: 3504 px` pour un viewport de 1440 (desktop) et `left: 420` pour 390 (mobile, `scrollY` 8259 / 9772) : l'utilisateur clavier ne voit rien (`report.json` accueil `invisibleFocus`). Correction : au `focusin` dans la piste épinglée, recaler la progression du ScrollTrigger pour amener l'élément dans la vue (ou faire défiler la piste), et retester avec Tab.
- **F1-2 Césures au milieu des mots en mobile 390 px** sur les h1 et h2 : « RÈSE / RVER » et « HORA / IRES » (`reservation/m-01-hero`, `m-03-scroll`), « EMPO / RTER » et « COMM / ANDER » (`a-emporter/m-01-hero`, `m-05-scroll`). Correction : `overflow-wrap: normal; hyphens: none` et taille en `clamp()` calée sur le mot le plus long (RÉSERVER, HORAIRES, EMPORTER, COMMANDER), ou césure voulue avec `&shy;` aux bons endroits.
- **F1-3 Performance mobile** (`mobile` du throttle 4x CPU / 4G) : LCP accueil 8 840 ms (`p.hero__baseline`), carte 7 684, a-emporter 5 900, reservation 6 316, 404 6 256 (seule histoire passe : 1 556) ; `scrollFps` accueil 19 (pire image 700 ms). Les shoots tournaient 6 en parallèle, donc chiffres gonflés, mais même ordre de grandeur attendu : LCP sur le paragraphe d'accroche retenu par le loader. Correction : lever le loader dès que la police et le h1 sont prêts, ne pas retarder l'accroche, alléger l'accueil (12 992 px de haut, piste épinglée) et remesurer en série.
- **F1-4 Contraste axe serious** : `#visite-titre` #f4eedf sur #1f8a4c = 3,78:1 (accueil et reservation) ; `.display--l > .exemple` #3e1815 sur #e3352b = 3,57:1 (accueil). Correction : assombrir le vert (≤ #187a41) ou passer le titre en noir ; mettre l'étiquette `exemple` en noir sur fond clair.

### F2 mineurs
- **F2-1 Loader trop long** : 3,1 à 3,4 s mesurés sans charge (desktop et mobile), au-dessus de la règle 2,6 s ; sous charge 5 à 8 s (`loaderMs`). Réduire le plancher.
- **F2-2 Titre « LES POTES » en contour coupé à droite sur mobile** (`accueil/m-01-hero`, le S touche le bord) ; réduire la taille ou le tracking.
- **F2-3 Accent de « ARRACHÉE » invisible dans le h1 de la 404** (`404/m-01-hero`, `d-01-hero` : « ARRACHEE ») alors que le texte porte bien É : interligne trop serré / masque de split qui rogne l'accent. Même risque sur « RÉSERVER » desktop (accent écrasé).
- **F2-4 Cible < 24 px** : lien « Réalisé par » 178x22 sur les 6 pages (`smallTargets`) ; passer à 24 px de haut.
- **F2-5 Boucle de focus** : `skipLinkFirst: false` est le faux négatif connu (lecons.md) ; « Aller au contenu » est bien le premier arrêt. Rien à faire.
- **F2-6 Pastille « stuck » du marquee** : en `k-0*-focus` de l'accueil le bandeau défilant superpose des mots (« L'TATION, 4 SERVICES ») ; vérifier le raccord de la boucle.

### F3 finitions
- F3-1 `overflowX` signalé par le constructeur : NON reproduit. `scrollWidth` = `clientWidth` (1440 et 390) sur accueil, histoire et carte ; seuls les éléments de la piste épinglée (accueil) et les polaroïds inclinés (histoire, 1478 px, rognés) dépassent sans scroll. À garder surveillé.
- F3-2 Apostrophe droite dans la 404 (« n'est plus collée ») contre `’` ailleurs ; unifier. Titre de l'adresse « AVENUE DE LA PLANTE 4 5000 NAMUR » sans virgule (`reservation/m-05-scroll`).
- F3-3 Mention « Maquette KYW, certaines données sont illustratives » répétée deux fois dans le pied (colophon et barre basse) ; la ligne « Caractère Archivo (Google Fonts, licence OFL) » est du bruit pour un visiteur.
- F3-4 « Sara » porte la photo `bar-cocktails.webp` (deux cocktails) comme portrait : fausse piste ; prévoir un cadre sans photo comme Jordan.
- F3-5 Hover accueil `h-01` « Réserver » et `h-02` « La carte » : réponse en pixels sans changement CSS détecté ; vérifier que le geste est visible (les autres pages répondent par `transform`).

## Ce qui est bien (à ne pas casser à la révision)
1. Intégrité du contenu : toutes les valeurs fictives (prix à la carte, plats, avis, e-mail, page à emporter) portent l'étiquette « exemple » et sont dans `site.ts` en `placeholder: true` ; faits client exacts (horaires, téléphone, Zenchef rid=379477, Michelin).
2. Hygiène technique : 0 erreur console, 0 requête en échec, 0 lien mort testé, `noindex`, `lang="fr"`, un seul h1, JSON-LD `Restaurant` avec horaires, favicon, OG, reduced-motion complet (`hiddenText: 0`), 404 dessinée dans la langue du site.
3. Direction artistique : affiche tricolore avec ruptures en dents de scie, signature 01 à 05 + 67 €, horaires en tickets avec « AUJOURD'HUI », photos en polaroïds inclinés ; cohérent sur les 6 pages.
