# Revue legacy · Partage · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un bistro namurois présenté comme une table posée, crème et encre, portrait du chef en plein écran, carte en vrai texte, réservation en carte posée ; le texte d'origine est repris sans fioriture, désormais sans les règles que le dossier ne donne pas, sauf trois restes (F2 ci-dessous).

Preuves : `QA-revue2.md` (build exit 0, 0 erreur console, 0 requête en échec, 0 débordement, 0 violation axe sur accueil et carte, 12 arrêts clavier sans focus invisible, mouvement réduit sans texte caché) ; planches `.shots-partage-legacy-revue2/{home,partage-item}/planche.png` (illisibles à cette taille, déjà dans `lecons.md` : lues pour la composition d'ensemble seulement) ; mesures ciblées de cette passe sur `dist/` servi par mon propre serveur (port 4811, PID noté, `kill` fait) : 4 pages x 1440 et 390 (console, requêtes, `scrollWidth`, `h1`, robots, lang, mention, logo), captures `rl2-bon-d-0..2` et `rl2-bon-m-0..3` (scratchpad), extraction du texte visible par Python (apostrophes, « oe », tirets cadratins), `curl` de tous les liens internes (0 hors 200), `sloplint src --genre editorial` (0 FAIL, 0 WARN, 4 DISMISSED, 1 NOTE). La page `bon-cadeau` et la politique, absentes du crawl de l'agent « captures », sont couvertes ici.

## Vérification des corrections annoncées dans REVISION-1.md
| id | verdict | preuve |
|---|---|---|
| F1-1 bon cadeau | **corrigé** | `dist/.../bon-cadeau/` : 0 « par téléphone », « avec un bon », « un midi au choix », « Trois façons » ; chapô « Le bon cadeau de Partage se commande en ligne. » ; meta description neutre ; titre « Quelques idées de montant (illustratif) » ; 3 `li.rang[data-placeholder="true"]` avec « (illustratif) » visible sur nom et prix à 1440 et 390 (`rl2-bon-d-0`, `rl2-bon-m-1`) ; lien réel `restaurantpartage.be/bon-cadeau/` (2 occurrences, 200 côté site d'origine non testé : URL du dossier) ; 0 débordement. |
| F1-2 carte | **corrigé** | 0 « chaque semaine », 0 « adapte », 0 « allergie » ; texte « la proposition est celle du 21 octobre 2026 » ; pied de carte limité à « Réserver une table ». |
| F2-1 photos | **corrigé** | Légendes « La table dressée. » et « En cuisine. » ; alt photo 06 « verres à vin, gobelets ambrés, serviette roulée… » et alt photo 14 de la carte « Une main parsème des herbes sur un bol garni… » ; « citronnier » ne reste que dans `data-slot` et le chemin `06-table-dressee-citronnier-600.webp` (invisible). |
| F2-2 orthographe | **corrigé en partie** | « Filet pur de bœuf Holstein » : 0 « boeuf », 1 « bœuf » ; mais l'annonce « 0 apostrophe droite dans le texte visible » est fausse : 3 restent (F2-1 ci-dessous). |

## Findings

### F0 · F1 : aucun

### F2 · mineurs
- **F2-1 · Apostrophes droites restantes (résidu de F2-2).** `src/data/site.ts:59` `nettoie` : `/(\w)'(\w)/` : en JavaScript `\w` est ASCII, donc l'apostrophe suivie de « œ », « É » ou « à » n'est pas corrigée. Texte visible : « crémeux de jaunes d'œufs » (accueil et `/carte/`), « Les Vignes d'à Côté » et « Chant d'Éole » (`/carte/`). Preuve : extraction Python du texte visible après `html.unescape` (home 1, carte 3, bon-cadeau 0, politique 0). Correction : `s.replace(/(\p{L})'(\p{L})/gu, '$1’$2')`, puis recompter à 0 sur `dist/`.
- **F2-2 · T-invente · « elle change avec les saisons ».** `src/pages/carte/index.astro:20` « Carte du 28 septembre 2026, elle change avec les saisons ». Le dossier donne la date (`dossier.md` « Carte du 28/09/2026 ») et rien sur la fréquence de changement (`grep -i saison donnees.json` : 0) ; seule la méta description du site d'origine parle de « produits de saison » (`site-actuel/pages/carte/page.html`), ce qui ne dit pas que la carte change. Même défaut que le « chaque semaine » retiré en passe 1. Correction : « Carte du 28 septembre 2026. »
- **F2-3 · T-invente · lettre signée.** `src/components/Cloture.astro:9-10`, présent sur 5 pages sur 5 : « À bientôt à table, et à plusieurs. » signé « Charles Jeandrain, Luca Recloux, Loïc Goumet et l'équipe de Partage ». Une parole attribuée à des personnes réelles qui n'est ni dans le dossier ni dans le site d'origine (`grep -ri bient` : 0), non marquée `data-placeholder`. Correction : retirer la signature nominative (garder « L'équipe de Partage » seulement si marquée `data-placeholder`), ou remplacer la phrase par un texte du dossier (« Imaginé par Charles Jeandrain… »).

### F3 · finitions (reportés de la passe 1, non traités par la révision, conformes à la règle de sobriété)
- **F3-1** Numéro d'entreprise « BE 0451 659 813 » affiché sans réserve (pied de toutes les pages, politique de confidentialité) alors que `donnees.json:938` le dit en conflit avec le BCE 0729834334 « à confirmer » ; lien `attablezvous.be` « (à confirmer) » idem. Marquer `data-placeholder` ou retirer.
- **F3-2** « se choisissent en ligne, en une minute » (`Reservation.astro:12`) : durée non sourcée.
- **F3-3** JSON-LD `priceRange: "€€"` (`Base.astro:13`) non sourcé.
- **F3-4** Composition de `bon-cadeau` : améliorée (liste et « Commander le bon » côte à côte à 1440, `rl2-bon-d-0`), plus de moitié vide ; reste un doublon : le bouton « Commander le bon en ligne » apparaît dans le hero et dans la section « Commander le bon » (même lien), à retirer d'un des deux endroits.
- **F3-5** L'accueil répète « Ici, l'expérience se vit dans le partage » en titre puis en tête de second paragraphe (texte d'origine) : couper la reprise dans le paragraphe.
- **F3-6** `sloplint --render` non exécutable ici : le Chromium préinstallé refuse de démarrer en root sans `--no-sandbox` et l'outil n'a pas d'option pour cela ; les 12 REFLEX de `RAPPORT.md` (44c, 49b, 59, 77…) ne sont donc ni levés ni tranchés. À faire par un agent qui sait passer `--no-sandbox` ou à waiver explicitement.

### Constats sans défaut
Lien « 404 » des captures = repli de `serve.mjs` (déjà noté) ; `404.html` : 1 `h1`, noindex, mention, logo. Avertissements d'audit (robots.txt, sitemap, ttf) : artefacts du serveur racine ou polices externes, CLS ≤ 0,002.

## Scores /10
- Design 7,5 : hero 900 px lisible, hiérarchie Sentient / Hanken nette, `bon-cadeau` maintenant en deux colonnes sans trou (`rl2-bon-d-0`).
- Usabilité 8,5 : 0 débordement (`scrollWidth` 1440 / 390 sur 4 pages), menu mobile et onglets de la carte fonctionnels (passe 1 inchangée, 12 arrêts clavier sans focus invisible dans `QA-revue2.md`), 0 lien interne hors 200.
- Créativité 6,5 : sobre et fidèle à la variante legacy ; carte de réservation posée comme seul geste marqué, inchangé.
- Contenu 7,5 : 118 plats et prix exacts, inventions majeures retirées et marquées illustratives ; restent « change avec les saisons » et la lettre signée (F2-2, F2-3).
- Technique 8,5 : build exit 0, 0 erreur console et 0 requête en échec sur 4 pages x 2 largeurs, 0 axe sur accueil et carte, LCP mobile 908 à 1272 ms, CLS ≤ 0,002, `sloplint src` 0 FAIL 0 WARN ; rendu hallmark non vérifié (F3-6).

## Ce qui est bien (à ne pas casser)
1. Les corrections de passe 1 sont propres : texte du bon cadeau réduit à ce que le dossier dit, brouillons marqués « (illustratif) » visibles à 390 px.
2. Hero du chef plein écran, carte de réservation posée, un seul bouton principal vers le vrai Zenchef (`rid=371394`).
3. Carte en quatre onglets lisibles sans script, vouvoiement, 0 tiret cadratin sur 4 pages, mention « Maquette KYW… », un seul `kyw-signature` et `noindex` sur 5 pages sur 5.
