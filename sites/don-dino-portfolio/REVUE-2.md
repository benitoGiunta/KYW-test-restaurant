# Revue portfolio · Don Dino · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 1 F2, 4 F3)

Lecture de l'idée en une ligne : une guinguette italienne ludique (objets dessinés au trait, tirages photo à ranger sur fond vert, carte HTML complète filtrable, palette crème / vert / corail), cohérente avec une brasserie-pizzeria familiale.

Hypothèses : `dist/don-dino/portfolio` (17:04) est postérieur à `src/` et `public/` (`find -newer` vide) et les captures de `QA-revue2.md` (17:10) sont postérieures au dist : réutilisées (3 planches ouvertes : accueil, carte, 404). La « 404 » de cette planche est la réponse brute de `serve.mjs` (« Refontes de sites… ») : le vrai `404.html` est mesuré à part (serveur propre port 4761, arrêté par `kill`). Build non relancé (dist cohérent avec le commit de révision cb13371).

## Vérification des corrections annoncées dans REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 `<title>` | confirmé | `<title>` accueil = « Don Dino \| Brasserie-pizzeria à Naninne (Namur) » ; 0 « Bistronomie » dans le dist |
| F1-2 marquee | confirmé | « Midi et soir, 7 jours sur 7 » et « Ouvert 7 jours sur 7 » dans les 6 pages ; 0 « Service du soir du lundi » ; capture 1440 (404.html) et 390 (accueil) : bandeau lisible, état calculé « Ouvert, arrivée jusqu'à 23:30 » (vendredi : juste) |
| F2-1 coquilles | confirmé | carte : « Végétarienne », « gorgonzola », espace après chaque virgule (grep : 0 `mozzarella,x`, 0 « Végétariene », 0 « gorgonzala ») ; « carbonnara » conservé volontairement (dossier) |
| F2-2 contraste `.lead` | confirmé | `#120e0c` sur `#e8483a` = 4,98 : 1 (calcul), identique mesuré par `getComputedStyle` sur accueil et terrasse à 390 px ; axe : 0 violation sur 6 pages x 1440 et 390. Le 4,36 : 1 de la « 404 » du QA vient de la page de repli du serveur : `404.html` réel, 0 violation |
| F2-3 perf mobile | partiel (comme annoncé) | CDP CPU x4 + 4G lente, 2 passes : `is-loaded` 5148 et 5042 ms, LCP 2780 et 2772 ms (`img` pizzaiolo-four.webp, dont `fetchpriority="high"` présent), CLS 0,0038, DCL 3,3 à 3,4 s. Cause confirmée : JS d'accueil, non le loader. Sans throttle, le QA mesure LCP mobile 2748 ms |
| F2-4 | sans objet | note sur le QA, aucun défaut du site |

## Scores /10
- Design 7,5 : hero sobre, tirages vifs sur fond vert, carte en pastilles nette (planches `home` d-02 à d-07, `carte`).
- Usabilité 8 : `404.html` designée avec retour accueil et carte, nav pilule mobile, recherche et rubriques de la carte ; 0 débordement, 0 cible < 24 px (QA et mesure).
- Créativité 8 : objets au trait, tirages à ranger, marquee d'état calculé.
- Contenu 8 : titre et marquee corrigés, 0 coquille reprise hors « carbonnara » voulu ; adresse (826), tél +32 81 74 15 60, dondino.be, parking vélos et accès PMR retrouvés dans `dossier.md` (l. 25 et 53) ; aucune invention non marquée.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe sur 6 pages x 2 largeurs, 161 liens internes du dist sans lien mort, un `h1` par page, `lang="fr"`, noindex, mention et logo KYW unique, JSON-LD et OG sur les 6 pages ; seul le LCP mobile throttlé reste > 2,5 s.

## Findings

### F2 (mineur)
- **F2-3 · LCP mobile throttlé 2,77 s (> 2,5 s)**, loader mobile 5,0 s sous CPU x4 + 4G lente. Préchargement et priorité déjà posés ; le goulot est le JS de l'accueil (DCL 3,3 s). Correction attendue (hors périmètre de cette passe, non bloquante) : alléger ou différer le JS de l'accueil (carte, tirages) ou préloader l'image LCP par `<link rel="preload" as="image">` dans le `head`.

### F3 (finitions, non traitées car hors périmètre de la révision 1)
- **F3-1** Eyebrows répétés (« Le menu », « La maison », « Avis », « Horaires ») ; « Le menu » alors que la page dit « La carte ».
- **F3-2** Filigrane « Avis » à moitié masqué par les cartes (planche `home` d-05, m-04).
- **F3-3** Titre « Ils en parlent » (toujours présent) au-dessus d'avis marqués « Exemple d'avis » : préférer « Exemples d'avis ».
- **F3-4** « Ouvert 7 jours sur 7, midi et soir » reste dit plusieurs fois (histoire, marquee x2 dont libellé sans JS) ; audit.mjs signale ces répétitions en WARN.

Note de mesure sans défaut : sur l'accueil à 390 px, des tirages inclinés et `.table__rail` dépassent la fenêtre de quelques px, mais `body { overflow-x: clip }` : `scrollTo(300, 600)` laisse `scrollX = 0`, `scrollWidth = 390` (pas de défilement horizontal, composition voulue). Axe `incomplete` : `aria-prohibited-attr` sur le `<span class="illu" aria-label="exemple">*</span>` des cartes (carte et histoire), à passer en `aria-hidden` ou à retirer le `aria-label` (F3, sans impact de conformité mesuré).

## Ce qui est bien (à ne pas casser)
1. La carte HTML complète (pastilles de prix, recherche, rubriques) et ses prix conformes aux données.
2. L'identité guinguette : tirages à ranger, objets au trait, mobile pensé (nav pilule fixe, hero lisible à 390 px).
3. Le marquee d'état calculé sans date en dur et la 404 « Cette table n'existe pas » dans le ton du site.
