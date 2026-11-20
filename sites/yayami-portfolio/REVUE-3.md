# Revue portfolio · Yayami Sushi · passe 3
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : une enseigne au néon rouge sur ardoise noire (tubes en contour qui s'allument, volets de photos de plats, barre Appeler / Commander toujours visible), sobre et cohérente.

Hypothèses : `QA-revue3.md` absent (l'agent captures n'a rien déposé) : mesures et captures refaites par moi. `pnpm build:site` relancé (OK, 7 pages, `git status` propre : le `dist/` commité est identique à la source). Serveur propre sur le port 4861 (PID 3002, arrêté). Mesures : axe-core de node_modules sur 7 pages x 5 largeurs (320, 390, 768, 1024, 1440), `Range` contre fenêtre, console, requêtes, mention / logo / robots / footer, 31 liens internes, loader et LCP x2 desktop et x2 mobile (CPU x4 + 4G), reduced-motion sur 4 pages, planches mobiles accueil (9 vues), `/maison/` (5), `/livraison/` (4), planche desktop de l'accueil (8 vues), grep Python du `dist`.

Scores /10 : design 8 (planches `yay-p3-pl-home390`, `yay-p3-pl-homed` : identité intacte) · usabilité 8 (CTA permanents, liens internes 31/31 en 200, `tel:+3281343789` conforme) · créativité 7 (gabarit Nocturne reconnaissable) · contenu 8 (0 faux, 0 invention, le prix udon est cohérent ; une répétition de formules reste sur l'accueil) · technique 9 (0 erreur console, 0 requête en échec, 0 violation axe sur 35 cas, 0 débordement de texte, CLS ≤ 0,015, LCP mobile 1,6 s).

## Vérification des corrections annoncées (REVISION-2)
| Point | Résultat | Preuve |
|---|---|---|
| F1-A udon de `/maison/` | OK | `dist/maison/index.html` : « Nouilles udon aux viandes dès 15,80 € poulet, bœuf ou scampis » ; `donnees.json` n° 16, 17, 18 : 15,80 / 16,80 / 16,80 € ; « dès 15,80 € » exact ; « plat chaud » : 0 ; la ligne « Nouille udon légumes 5,00 € » ne reste que sur `/carte/` (donnée client) |
| F2-A répétitions livraison / 10 % | OK sur l'accueil | texte visible de l'accueil : « à partir de 30 € » ×1, « dès 30 € » ×1 (mode Livraison), « 10 % » ×2 (« À savoir », mode « -10 % ») ; `/commander/` : 0 « à partir de 30 », « 10 % » ×1 ; phrase de scène « À emporter ou livrés chez vous : la carte complète se commande en ligne, sept jours sur sept. » (voir F2-1) |
| F2-B loader | OK | `is-loaded` 1 291 / 1 282 ms depuis la navigation en desktop (`load` à ~0,12 s, soit ~1,15 s de loader ; avant 2,04 s) ; mobile CPU x4 + 4G : 1 095 / 1 101 ms après `load` (avant 1,87 s), LCP 1 640 / 1 576 ms ; h1 lisible après le loader, capture `yay-p3-pl-loader` ; reduced-motion : loader `display: none`, 0 texte à opacité 0 sur 4 pages |
| Non traités (F3) | restent ouverts | voir F3 |

Critères PUBLIABLE : build OK ; console 0 sur 35 cas ; requêtes en échec 0 ; liens internes 31/31 en 200, tous sous `/yayami/portfolio/` ; faits conformes (adresse, `081 34 37 89`, 12h à 14h et 18h à 22h sept jours sur sept, livraison dès 30 €, 10 % à emporter, lien commande `https://www.yayami.be/shop/`) ; 0 invention ; `scrollWidth` = fenêtre partout ; axe 0 ; mention « Maquette KYW, certaines données sont illustratives », 1 `.kyw-footer__logo`, `noindex, nofollow`, `lang="fr"`, 1 h1 présents sur 35/35 cas ; JSON-LD `Restaurant` (adresse, téléphone, 14 plages horaires). Le seul « hors fenêtre » (puces de catégories de `/carte/` à 320 et 390 px) est la rangée défilante, faux positif connu.

## Findings
### F0 : aucun. F1 : aucun.
### F2
- **F2-1 · Formules répétées sur l'accueil** (`src/data/site.ts`). « Se commande en ligne » revient 3 fois en moins d'un écran de texte (« On commande en ligne : le panier ouvre le site… » dans « À savoir », « toute la carte se commande en ligne » sous « Japanese Sushi & take away », puis la phrase de scène « la carte complète se commande en ligne, sept jours sur sept ») ; « à emporter ou livrés chez vous » apparaît dans le chapeau du héros et dans la scène (planche `yay-p3-pl-home390`, vues 1, 4 et 5). La révision a corrigé la livraison mais a remplacé la phrase par une nouvelle redite. Correction : phrase de scène plus courte et distincte, par exemple « Sept jours sur sept, midi et soir. » (vérifié dans `donnees.json`), ou retrait de la scène.

### F3 (non bloquants)
- **F3-1** numéros 01/02/03/04 décoratifs en rouge (accueil « À savoir » et menus, `/commander/`) : `yay-p3-pl-home390`, vues 2, 3 et 6.
- **F3-2** alt répétitifs « …, fond noir » (accueil, boissons, livraison, `/maison/`) ; alt « photo de la carte (Maki) » sur `/maison/`.
- **F3-3** 1 apostrophe droite visible sur `/carte/` (« Salade d'algues », nom repris du client) ; à passer en « ’ ».
- **F3-4** `/livraison/` : « gratuite à partir de 30 € » ×3 et « 10 % » ×2 sur une même page (chapeau, étiquette « dès 30 € », carte Livraison, étiquette « -10 % ») ; boissons : « Bière japonaise » en description et « BIÈRE » en étiquette sur chaque ligne, et nom « bière Kirin Ichiban » avec préfixe en minuscule sur l'accueil.
- **F3-5** nav mobile 390 px posée sur la photo du hero sans voile (`yay-p3-pl-home390`, vue 1) : lisible mais sur la texture des maki.
- **F3-6** `<link rel="canonical">` de `404.html` pointe vers `/404/` (page noindex, cosmétique).
- Non reproduit : F3-7 (« YAYAMI SUSHI » en double sur `/maison/` mobile) : le titre n'apparaît qu'une fois dans le pied ; la répétition vue en passe 2 venait du chevauchement des vues de capture. À retirer de la liste.
- Remarque, non finding : le titre du héros desktop (tube `--xl` en contour) s'allume lentement (opacité 0,38 à 1,5 s, 0,41 à 3 s, 1 à 6 s) : choix d'enseigne qui s'allume, mais les trois premières secondes montrent un titre terne ; accepté.

## Ce qui est bien (à ne pas casser)
1. Signature « enseigne » intacte : tubes, volets de photos, bandeau KYW clair ; reduced-motion sans texte caché.
2. Technique propre : axe 0 sur 35 cas dont 320 px, 0 débordement, loader ~1,1 s, LCP mobile 1,6 s, JSON-LD complet.
3. Contenu honnête et exact : prix de départ nigiri, maki, temaki, udon conformes à `donnees.json` ; pas de faux avis ni de réservation inventée (commande en ligne seulement).
