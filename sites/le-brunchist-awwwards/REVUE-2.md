# Revue awwwards · Le Brunchist · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : un brunch est un créneau (9 h 30 à 15 h 30) et tout le site est un cadran dont le fond (jaune d'œuf, vert, brun), l'heure de l'en-tête et le disque à trotteuse suivent le défilement ; aucune photo, tout en typographie.

Scores /10 :
- Design 7,5 : palette jaune / vert / brun cohérente, titre « Brunchist » massif (planche `r2-bru-planche-d.png`, haut gauche), titre horaires désormais net sur 3 lignes ; hero desktop toujours vide au centre, aucune image de plat.
- Usabilité 7,5 : CTA « Voir la carte » et « Appeler » visibles à 1440 et 390 px, 63 liens internes résolus (0 mort), le CTA du pied dit maintenant « Nous trouver » et la page « Venir » ne promet plus de réservation.
- Créativité 8 : concept horaire propre à ce restaurant (en-tête 9 h 30 → 15 h 30, tableau d'horaires en barres, 404 « 15 h 31 ») ; rien de gabarit.
- Contenu 7,5 : plus d'invention non marquée (F1-1 et F2-1 levés), horaires contestés signalés dans le pied de chaque page ; reste la ponctuation sans insécable (F3-2) et deux blocs doublonnés sur « Venir » (F3-7).
- Technique 8,5 : build OK, 0 erreur console, 0 requête en échec, axe complet 0 violation (5 pages x 1440/390/360), contraste canvas 0 nœud sous le seuil (nœud par nœud après défilement), CLS 0 et LCP mobile 932-952 ms (CPU x4 + 4G, 2 passes, accueil et Venir), reduced-motion : 0 texte à l'opacité < 0,5.

Preuves : `QA-revue2.md` (build, report.json accueil et carte) et deux scripts maison de la passe (axe-core de `node_modules` complet, console, requêtes, débordement, balises, liens, contraste canvas 1x1, lignes réelles des titres, CDP x4 + 4G, reduced-motion) sur accueil, carte, histoire, Venir et le vrai `404.html`. dist (02:43) postérieur à `src/` (`find -newer` vide) ; captures de la passe : `r2-bru-planche-d.png` et `r2-bru-planche-m.png` du scratchpad. Faux positifs du QA ignorés : sa « 404 » est la réponse brute de `serve.mjs` (le vrai `404.html` : h1, lang, noindex, mention, 1 logo, 0 axe), « pas de sitemap » (il existe, 4 pages), « 8 WARN répétition » (l'heure est le concept). Le QA n'a pas capturé histoire ni Venir : mesurées à part.

## Vérification des corrections annoncées (REVISION-1.md)

| id | annoncé | constat |
|---|---|---|
| F1-1 | corrigé | Confirmé. `reservation/index.html` : meta description « téléphone, horaires du mercredi au dimanche, plan, terrasse », lede « Pour savoir si une table peut être réservée, appelez. », `<title>` « Venir », CTA du pied « Nous trouver » sur les 5 pages ; grep du dist : 0 occurrence de « Réserver ou venir » ou « pour réserver une table ». Le slug `/reservation/` reste, sans effet. |
| F2-1 | corrigé | Confirmé. Le pied dit « On range les tasses à 15 h 30. » sur les 5 pages, « se commande avant » absent du dist. |
| F2-2 | corrigé | Confirmé. `reveal.ts:28` `aria: 'none'` ; axe complet 0 violation (dont `aria-prohibited-attr`) sur accueil à 1440, 390 et 360, aucun `aria-label` sur un élément sans rôle. |
| F2-3 | corrigé | Confirmé. Lignes réelles de `#titre-semaine` à 1440, 1024, 768, 390 et 360 px : « Du mercredi / au dimanche, / 9 h 30 à 15 h 30 » ; l'heure tient sur une ligne, boîte = texte (793/793 à 1440). Capture `d-semaine`. |
| F2-4 | corrigé | Confirmé. « Horaires à confirmer : les sources divergent. » sous le tableau du pied sur les 5 pages ; lisible (planche, `d-pied`). |
| F3-1 | corrigé | Confirmé. Accueil : « Ouvert en 2022 par Mélisande et Arnaud (à confirmer). » |
| F2-5 | non traité | Décision de variante typographique, acceptée : `donnees.json` dit « photos/index.json vide : aucune photo récupérée » et le pied l'annonce. Reclassé F3 (voir ci-dessous). |
| F3-2 à F3-5 | non traités | Confirmé non traités (mesures ci-dessous). F3-6 : le disque porte `aria-hidden="true"`, résolu. |

## Findings

### F0 / F1 / F2
Aucun.

### F3 (finition, non bloquant)
- **F3-2 · ponctuation.** 40 occurrences de « mot : » avec espace ordinaire sur les 5 pages (7 sur l'accueil ; ex. « Du jaune d'œuf au dernier café : une matinée », « c'est un créneau : le moment »). 0 espace insécable avant « : ». Correction : U+00A0 (ou U+202F) dans `src/data/site.ts` et les `.astro`.
- **F3-3 · hero desktop.** `.hero__meta` : `line-height` calculé 23,25 px pour un corps de 15 px (1,55), soit des interlignes larges sur « Brunch et cafés de / spécialité » ; le « Le » reste décalé de ~8 px à gauche de « Brunchist » (planche `d-hero`). Correction : `line-height` de `.split-line` du bloc meta à ~1,2.
- **F3-4 · disque.** `.hero__disque` right = 399 px à 390 et 367 à 360 (dépasse la fenêtre de 9 et 7 px) ; masqué par `overflow: clip` du hero, `scrollWidth` = `clientWidth` aux 3 largeurs, 0 élément débordant hors SVG. À surveiller seulement.
- **F3-5 · SEO.** Pas de `robots.txt` pour la variante (sitemap présent, 4 pages) : sans effet, maquette `noindex, nofollow` (conforme au prompt de production).
- **F3-7 · répétition sur « Venir ».** La page affiche son bloc Adresse + Horaires, puis le pied répète Venir / Place d'Armes 8 / Horaires / Contact juste dessous (texte extrait de `reservation/`) ; la réserve « à confirmer » n'apparaît que sur le tableau du pied. Correction : sur cette page, faire porter la réserve au tableau du corps de page ou retirer l'un des deux blocs.
- **F3-8 · image (ex-F2-5).** Aucune image de plat sur le site ; assumé et annoncé dans le pied, la source n'a pas de photo. Piste si on veut aller plus loin : un visuel dessiné (SVG) du jaune d'œuf ou de la tasse ; ne pas inventer de photo.

## Ce qui est bien (à ne pas casser)
1. Le concept horaire de bout en bout : fond qui change au scroll, heure vivante dans l'en-tête (9 h 30, 12 h 40, 15 h 30 sur les captures), tableau d'horaires en barres lisible à 390 px, 404 « 15 h 31 ».
2. Honnêteté des données : carte et prix « illustratifs » avec leur cadre, réserves « à confirmer » sur fondateurs, horaires et réservation, 0 fait faux (téléphone, adresse, réseaux, presse, budget confrontés à `donnees.json` et `dossier.md`), mention « Maquette KYW, certaines données sont illustratives » + 1 logo + `noindex, nofollow` + `lang="fr"` + 1 h1 + 1 `<footer>` sur les 5 pages ; JSON-LD `Restaurant` avec adresse et horaires.
3. Sobriété technique : page la plus lourde ~135 Ko, CLS 0, LCP mobile < 1 s même sous CPU x4 + 4G, reduced-motion complet, 0 tiret cadratin, 0 tutoiement.

## Critères PUBLIABLE
Build OK (QA : exit 0, 5 pages), 0 erreur console, 0 lien mort (63 liens internes, 7 externes dont Facebook, Instagram, ELLE.be, namur.top conformes au dossier), 0 fait faux, 0 invention non marquée, 0 débordement, 0 violation axe, mention + logo + noindex présents : tous tenus. Aucun F0.

Hypothèses : le slug `/reservation/` conservé avec le titre « Venir » est un choix de nommage, pas un défaut ; le descriptif de plats de la carte (« Pressé à la commande », « Espresso, lait mousseux ») est couvert par la mention « descriptions illustratives » en tête de carte. Serveur de mesure : port 4763, PID 9805, arrêté.
