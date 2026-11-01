# Revue legacy · Partage · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un bistro namurois présenté comme une table posée, crème et encre, avec le portrait du chef en plein écran, la carte en vrai texte et la réservation en carte posée au milieu de la page ; le texte du site d'origine est repris tel quel, sans fioriture.

Preuves : `QA-revue1.md` et planches `.shots-partage-legacy-revue1/{home,partage-item}/planche.png` (agent « captures »), plus des mesures ciblées de cette passe : `rl1-cible` (5 pages x desktop 1440 et mobile 390 à DPR 2 : console, requêtes, débordement, images, cibles), `rl1-contraste` (contraste calculé sur tous les nœuds texte, 4 onglets de la carte compris), `rl1-menu` (menu mobile, ancre `#vins`, carte sans JS), `curl` de 27 liens locaux et `srcset`, `sloplint src --genre editorial`. Captures ciblées des pages que le crawl n'avait pas vues : `bon-cadeau`, `politique-de-confidentialite`, `404.html` (la « 404 » des captures est la page de repli de `serve.mjs`, pas la 404 du site).

Scores /10
- Design 7,5 : hero plein écran lisible (h = 900 px pour 900, bouton à 816 px), hiérarchie nette Sentient / Hanken, photos bien cadrées (`home` planche, d-01) ; la page `bon-cadeau` laisse la moitié droite vide sous la liste (capture `bon-d`).
- Usabilité 8,5 : 0 débordement à 1440 et 390 (`scrollWidth` 1440 / 390 sur 5 pages), menu mobile (popover) s'ouvre, se ferme à Échap, 4 liens ; onglets de la carte au clavier, `#vins` sélectionne le bon onglet, les 4 panneaux restent lisibles sans JS ; focus visible sur 12 arrêts (`noVisibleFocus: []`).
- Créativité 6,5 : variante legacy fidèle, sobre ; seul geste marqué : la carte de réservation posée et le tirage du portrait ; pas de signature mémorable au-delà.
- Contenu 6,5 : texte d'origine, carte et lunch conformes à `donnees.json` (118 plats vérifiés par script, 0 prix faux) ; mais la page bon cadeau et trois phrases de politique du restaurant ne sont pas dans le dossier (F1 ci-dessous).
- Technique 8,5 : build OK, 0 erreur console, 0 requête en échec, 27 liens locaux en 200, LCP mobile 848 à 1416 ms, CLS 0 à 0,002, 60 fps, 0 violation axe, contraste mesuré sans écart (15 « à vérifier » d'axe tranchés : 0 sous 4,5:1), `sloplint src` 0 FAIL 0 WARN.

## Findings

### F1 · majeurs
- **F1-1 · T-invente · page bon cadeau.** Le dossier ne dit rien de la page `/bon-cadeau/` du client, sinon « Bon cadeau en ligne » (`dossier.md:29`, `donnees.json:38`). Ces phrases ne sont ni dans le dossier ni marquées `placeholder` :
  - `src/pages/bon-cadeau/index.astro:12` « Un bon pour une table chez Partage, à la carte ou au lunch. »
  - `src/pages/bon-cadeau/index.astro:31` « Le bon se commande en ligne **ou par téléphone** au 081 81 00 98. La personne qui le reçoit réserve ensuite sa table comme d'habitude, **en précisant qu'elle vient avec un bon.** » (procédure inventée)
  - `src/data/site.ts:100` `bonsCadeaux[0]` : « Deux lunchs à 38 €, **un midi au choix.** » (la valeur 76 € est dérivée du lunch à 38 €, mais « un midi au choix » est une règle ajoutée) ; l'intitulé de section « Trois façons de l'offrir » présente comme réelles trois formules dont deux sont illustratives.
  - Preuve : `grep -ri "cadeau" data/restaurants/partage/{donnees.json,dossier.md}` ne remonte que le lien ; capture `bon-d.png`, `bon-m.png`.
  - Correction : garder le lien vers `restaurantpartage.be/bon-cadeau/` (réel), supprimer la phrase téléphone et la procédure de réservation, retirer « un midi au choix », ou marquer chaque phrase conservée `data-placeholder="true"` (avec la mention « illustratif » déjà gérée par `page.css:146`) ; titre de section neutre (« Quelques idées de montant », marqué illustratif).
- **F1-2 · T-invente · politiques du restaurant sur la carte.**
  - `src/pages/carte/index.astro:39` « … la proposition change **chaque semaine** (celle du 21 octobre 2026 ci-contre). » : le dossier ne donne que la date du 21/10/2026, aucune fréquence (`grep -i "semaine\|hebdo"` dans `donnees.json`, `dossier.md`, `site-actuel/` : 0 résultat).
  - `src/pages/carte/index.astro:66` « Une allergie, un régime : dites-le en réservant, **la cuisine s'adapte.** » : engagement du restaurant absent du dossier (`grep -i "allerg\|régime\|adapte"` : 0 résultat).
  - Correction : « … la proposition est celle du 21 octobre 2026. » ; supprimer la phrase allergie ou la marquer `data-placeholder="true"`.

### F2 · mineurs
- **F2-1 · Photos identifiées sans preuve.** Légende « La table près du citronnier. » et alt « Une table dressée près du citronnier » (`index.astro`, photo `06-table-dressee-citronnier`) : « citronnier » vient du nom de fichier posé par l'agent de recherche (`photos/index.json` : « table dressee citronnier »), pas du client ; la plante de la capture (`home` d-05) n'est pas identifiable. Même défaut pour « Au passe, le soir. » (photo 16 : rien n'indique le soir) et l'alt « au passe » de la photo 14 (`carte/index.astro`). Correction : « La table dressée. », « Au passe. », alt descriptif de ce qu'on voit.
- **F2-2 · Orthographe et typographie de la carte.** `src/data/site.ts` `nettoie` : l'expression `\boe` rate « boeuf » : la carte affiche « Filet pur de boeuf Holstein » (`dist/partage/legacy/carte/index.html`) alors que « œuf » est corrigé partout ; corriger en « bœuf » (`/\b[bB]?oe/` après contrôle qu'aucun autre mot ne saute). Treize apostrophes droites dans les descriptions de plats de `/carte/` (« huile d'herbes », « l'huile d'olive ») contre `’` ailleurs : `s.replace(/(\w)'(\w)/g, '$1’$2')` dans `nettoie`.

### F3 · finitions
- **F3-1 · Données à confirmer affichées sans réserve.** Numéro d'entreprise « BE 0451 659 813 » (pied de page et politique de confidentialité) : `donnees.json:938` le dit en conflit avec le BCE 0729834334 « à confirmer » ; lien `attablezvous.be` marqué « (à confirmer) » dans `donnees.json` (`Cloture.astro`). Marquer `data-placeholder` ou retirer le numéro.
- **F3-2 · Phrase d'usage de la réservation.** `Reservation.astro` « … se choisissent en ligne, en une minute » : durée non sourcée ; « en ligne » suffit.
- **F3-3 · JSON-LD** `priceRange: "€€"` (`Base.astro`) non sourcé ; l'ôter ou le justifier (plats de 24 à 45 €).
- **F3-4 · Page bon cadeau, composition.** À 1440, la liste des formules tient dans une colonne de ~500 px et la moitié droite sous le hero est vide (`bon-d.png`) ; aligner la liste sur la grille 12 colonnes ou la faire courir sur toute la largeur.

### Constats qui ne sont pas des défauts du site
- La 404 des captures n'est pas celle du site ; `404.html` : 1 `h1`, titre propre, 0 erreur, composition correcte (`n404-d.png`, `n404-m.png`). Vercel ne sert que `dist/404.html` à la racine : la 404 sous `base` n'est pas atteinte en production (déjà dans `lecons.md`).
- WARN d'audit « pas de robots.txt / sitemap » : le serveur de test sert `dist/` à la racine, alors que `robots.txt` et `sitemap-*.xml` existent sous `dist/partage/legacy/` (noindex présent sur les 5 pages) ; « police ttf » : feuille Fontshare / Google chargée par `Base.astro`, polices non préchargées mais CLS mesuré ≤ 0,002.
- `sloplint --render` non relancé (règle de sobriété) : les 12 REFLEX de `RAPPORT.md` restent à trancher à la révision ; le hero de l'accueil mesure maintenant 900 px (le chiffre 912 de `RAPPORT.md` est périmé). Mention « Maquette KYW… », logo `kyw-signature` (un par page) et `robots noindex` présents sur 5 pages sur 5, `lang="fr"`, un seul `h1`, JSON-LD `Restaurant` avec adresse et horaires.

## Ce qui est bien (à ne pas casser)
1. Le texte du site d'origine repris mot pour mot, en vouvoiement, sans filler ni tiret cadratin (0 « — » sur 5 pages), carte et prix exacts sur 118 plats.
2. Le hero du chef plein écran (900 px) et la carte de réservation posée : lisibles, contrastés, un seul bouton principal vers le vrai Zenchef du client (`rid=371394`, retrouvé dans `site-actuel/page.html`).
3. La carte en quatre onglets accessibles (flèches, `#hash`, lisible sans JS) et un site léger (2,0 Mo pour 5 pages), aucune requête en échec à DPR 1 et 2.
