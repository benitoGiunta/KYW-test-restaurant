# Revue portfolio · Yayami Sushi · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : une enseigne au néon rouge sur ardoise noire (titres en tubes, volets de photos de plats, commande en ligne omniprésente par la barre Appeler / Commander), sobre et cohérente.

Hypothèses : `dist/` (00:00:32) postérieur à `src/` ; `QA-revue2.md` (00:05) postérieur au `dist/` : réutilisé (accueil, carte, 404 brute). Mesures refaites par scripts maison sur serveur propre (port 4837, arrêté) : axe-core de node_modules sur 7 pages x 5 largeurs (320, 390, 768, 1024, 1440), `Range` contre fenêtre, console, requêtes, mention/logo/robots/footer ; loader x2 desktop et x2 mobile CPU x4 + 4G ; captures mobiles par pas de 640 px (accueil, `/maison/`), captures 1440 (boissons, carte, maison), reduced-motion sur 4 pages ; grep Python du `dist`.

Scores /10 : design 8 (identité intacte, planches `p2-planche-desk` et `p2-planche-home-390`) · usabilité 8 (Tab 12 stops, 0 focus invisible, nav de contact rapide) · créativité 7 (gabarit Nocturne reconnaissable, `/maison/` désormais utile) · contenu 7 (0 invention, mais un prix contredit par la carte et des répétitions résiduelles) · technique 9 (0 erreur console, 0 requête en échec, 0 violation axe sur 35 cas, 0 débordement de texte, CLS ≤ 0,021, LCP mobile CPU x4 + 4G 1,55 à 1,9 s).

## Vérification des corrections annoncées (REVISION-1)
| Point | Résultat | Preuve |
|---|---|---|
| F1-1 « au centre de Namur » / « de quartier » | OK | 0 occurrence dans les 7 pages du `dist` ; description de `/maison/` « …au 15 Rue de Bruxelles à Namur » |
| F2-1 méta de l'accueil | OK | « Ouvert 7 jours sur 7, de 12h à 14h et de 18h à 22h. » |
| F2-2 double `contentinfo` | OK | 1 `<footer>` par page (6 pages comptées + 404), axe 0 violation `landmark-no-duplicate-contentinfo` |
| F2-3 `region` des coins | OK | `<nav aria-label="Contact rapide">` présent ; axe 0 violation sur 35 cas (la violation `color-contrast` de la 404 vue par le QA est le fondu d'entrée : 0 à 900 ms) |
| F2-4 répétitions | PARTIEL | voir F2-A ci-dessous ; horaires de l'accueil et règle de `/commander/` corrigés (0 occurrence « dès 30 € » / « gratuit » sur `/commander/`) |
| F2-5 loader | PARTIEL | voir F2-B ; desktop 2,04 s après `load` (2,7 s avant, seuil 2,6 s tenu, cible 1,8 s non atteinte) |
| F2-6 vides mobile | OK | planches `p2-planche-home-390` (9 vues) et `p2-planche-maison-390` (5 vues) : plus de bande de ~300 px de noir ; scène plus courte, contenu enchaîné |
| F2-7 `/maison/` | OK | « Prix de départ » (4 lignes) + « Au menu » (6 plats) ; nigiri 4,50 €, maki dès 5,50 €, temaki 6 € conformes à `donnees.json` ; udon : voir F1-A |
| F2-8 tubes en contour | OK | `.tube--l` : `-webkit-text-stroke 0`, `color rgb(255,68,56)`, 40 px (boissons et carte) ; planche `p2-planche-desk` |
| Bonus apostrophes, « à bille » | PARTIEL | « à bille » : 0 ; apostrophes droites : 0 sur 6 pages, 1 reste sur `/carte/` |

Aucun F0 : build `dist/` présent, 0 erreur console, 0 requête en échec, 0 lien mort (pages internes servies en 200), mention « Maquette KYW, certaines données sont illustratives » + 1 `.kyw-footer__logo` + `noindex, nofollow` + `lang="fr"` + 1 h1 sur 35/35 cas, reduced-motion : 0 texte à opacité 0 sur 4 pages, `scrollWidth` = fenêtre partout. Le seul « hors fenêtre » mesuré (puces de catégories de `/carte/` à 320/390 px) est la rangée défilante, faux positif connu.

## Findings
### F1
- **F1-A · `/maison/` « Nouilles udon · dès 15,80 € » contredit la carte** (`src/pages/maison.astro:9`). `donnees.json` et `/carte/` listent « Nouille udon légumes » à 5,00 € (plat n° 50). Un visiteur qui passe de `/maison/` à `/carte/` voit un prix plus bas que le « dès ». Correction : « Nouilles udon aux viandes, dès 15,80 € » ou ligne « Nouilles udon, dès 5 € » ; au plus simple remplacer la note « plat chaud » par « au poulet, au bœuf, aux scampis » et le prix par « 15,80 € » sans « dès ». À signaler à l'équipe : 5,00 € est peut-être une coquille du site client.

### F2
- **F2-A · Répétitions encore présentes sur l'accueil** (F2-4 partiel). « Livraison gratuite à partir de 30 € » apparaît 3 fois (« À savoir » n° 2 avec « dans sept codes postaux autour de Namur », bande de la scène « À emporter avec 10 % de remise, ou livré gratuitement dès 30 € », mode « Livraison » avec « dès 30 € » + « Gratuite à partir de 30 € … dans sept codes postaux autour de Namur ») ; « 10 % » 4 fois (scène, « À savoir » n° 3, mode « -10 % », méta). Preuve : grep du `dist/index.html`. Correction : retirer la règle livraison de « À savoir » (le mode « Livraison » la porte) et la remise de la phrase de scène, qui devient « À emporter ou livré chez vous, sept jours sur sept ».
- **F2-B · Loader encore long sous contrainte** (F2-5 partiel). `is-loaded` = 2,04 s après `load` en desktop (2 passes : 2041 / 2045 ms) ; mobile CPU x4 + 4G : `load` à 3,7 s puis `is-loaded` à 5,5 s (1,87 s de plus ; avant 4,3 à 6,1 s). `MIN`/`MAX` (0,6/0,9 s) ont bien baissé, mais la sortie personnalisée (`setLoaderExit`) ajoute ~1,1 s. Correction : raccourcir la sortie à ~0,5 s (cible totale ≤ 1,3 s après la fin des tâches critiques) ; en mobile, ne pas attendre `document.fonts.ready` au-delà de `MAX`.

### F3 (non traités, hors périmètre de la révision, restent ouverts)
- **F3-1** numéros 01/02/03 décoratifs encore présents (accueil « À savoir », carte des menus, `/commander/`).
- **F3-2** alt : « …, fond noir » ×8 sur l'accueil (+1 boissons, +1 livraison, +2 `/maison/`), « …photo de la carte (Maki) » ×1 sur `/maison/`, « boeuf » sans ligature ×1 sur l'accueil.
- **F3-3** 1 apostrophe droite restante sur `/carte/` (texte visible).
- **F3-5** nav mobile 390 px posée sur la photo du hero sans voile (planche `p2-planche-home-390`, vue 1).
- **F3-6** `<link rel="canonical">` de `404.html` sur `/404/` (page noindex, cosmétique).
- **F3-7** « YAYAMI SUSHI » en grand deux fois sur `/maison/` mobile (titre du bloc contact puis pied) : léger doublon.

## Ce qui est bien (à ne pas casser)
1. Signature « enseigne » (tubes pleins en mode lampe, volets de photos, bandeau KYW clair) intacte après révision ; reduced-motion sans texte caché.
2. Technique propre : axe 0 sur 35 cas dont 320 px, 0 débordement de texte (Range), LCP mobile ≤ 1,9 s, JSON-LD Restaurant complet (adresse, géo, 14 plages horaires).
3. Contenu honnête et exact : prix de départ nigiri, maki, temaki conformes ; pas de faux avis ni de réservation inventée ; `/maison/` enrichie sans invention.
