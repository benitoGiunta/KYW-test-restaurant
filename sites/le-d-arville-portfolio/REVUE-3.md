# Revue portfolio · Le D'Arville · passe 3
Verdict : A_CORRIGER (0 F0, 0 F1, 2 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : une maison de campagne gastronomique en vert sapin et cuivre, où un rideau (loader, transitions) se lève sur de grands chiffres (2 menus, 73 €, 200 m) et sur les photos de la ferme, des plats et de la villa Barabas.

Scores /10
- Design 7 : texte de « Autour de la table » enfin lisible (6,0 à 8,5 : 1 mesuré sur capture sans texte) et plus de chevauchement « 200 » / h1 de Barabas (capture `b-390`) ; palette et chiffres tenus.
- Usabilité 8 : 0 débordement, 0 texte hors fenêtre, 0 lien mort (41 ressources internes en 200), 0 titre rogné réel, galerie au clavier acquise en passe 2.
- Créativité 7 : rideau, compteur, grands prix restent la signature ; eyebrow + chiffre décoratif sur chaque page inchangés (F3).
- Contenu 7 : tous les faits confrontés à `donnees.json` sont exacts, 0 renvoi « nous les demander » ; restent une phrase tournée vers la source (`/reservation/`) et une typographie sans U+00A0.
- Technique 8 : build OK (dist 05:06 postérieur à `src/`), 0 console, 0 requête en échec, axe 0 violation (8 pages x 1440 et 390), 1 seul `<footer>` par page, 1 logo, mention et noindex partout, loader bureau 2046 ms.

Méthode : QA-revue3.md lu (accueil, menu, 404 brute) et ses planches, dist postérieur à `src/` et captures postérieures au dist, réutilisés. Serveur propre port 4837 (PID 15064, arrêté). Scripts maison : (1) 8 pages (404.html réelle comprise) x 1440, 1024, 390, 320 après défilement à la molette : console, requêtes, `scrollWidth`, `Range` de chaque texte contre la fenêtre, titres rognés, cibles, h1, lang, robots, mention, logo, footers, JSON-LD, axe-core complet à 1440 et 390 ; (2) ciblé : h1 `/menu/`, Barabas 390 et 360, onglets de la home à 1440 (texte rendu transparent, échantillonnage de pixels), loader bureau et mobile (CPU x4 + 4G) ; (3) lignes orphelines (signe de ponctuation ou « € » en début de ligne, « en fin de ligne) sur 8 pages x 4 largeurs ; (4) grep Python du texte du `dist/`, liens internes, faits confrontés à `donnees.json`.

## Vérification des corrections annoncées (REVISION-2)

| id | annonce | constat passe 3 |
|---|---|---|
| F1-1 | filigrane « 200 » masqué sous 600 px | CONFIRMÉ : `.chiffre--filigrane` en `display: none` à 390 et 360 px, h1 « Barabas » y 161 à 202 sans recouvrement, `scrollWidth` = 390 / 360, « 200 mètres » reste dans le texte (capture `b-390`) |
| F1-2 | dégradé passé au-dessus des photos de « Autour de la table » | CONFIRMÉ : contraste pire point sur capture sans texte, à 1440 px : onglet actif cuivre 6,0 : 1, h2 crème 7,6 : 1, panneau 8,5 : 1, onglets 8,4 : 1 (seuil 4,5 : 1) ; lisible à l'œil (deux positions de défilement) |
| F2-1 | renvois « nous les demander », « à la demande », « Le site de la maison » retirés | CONFIRMÉ : 0 occurrence de ces formules ; « en option, 40 € ou 50 € » et Bon Plan par jours seuls présents sur `/carte/` |
| F2-2 | `<footer>` du site en `<section aria-label="Coordonnées">` | CONFIRMÉ : 1 `<footer>` par page sur 8 pages, axe 0 violation (dont `landmark-no-duplicate-contentinfo`) à 1440 et 390 |
| F3-5 | « affiche de la maison » retiré | CONFIRMÉ : 0 occurrence dans le `dist/` |

Aucune régression trouvée sur les corrections de la passe 1 : 0 `openingHoursSpecification`, JSON-LD `Restaurant` sur les 8 pages, CTA Barabas vers `facebook.com/LaSuiteDuDArville/`, images allégées (poids de la home 1384 Ko dont 1257 Ko d'images, QA-revue3), galerie focusable.

## Findings

### F2 mineur
- **F2-1 · aucune espace insécable dans tout le site (0 U+00A0 sur 8 pages) : guillemets, « € » et « : » se détachent en fin ou début de ligne.** Mesuré sur 32 contextes : 12 orphelins, par exemple « Tendance de saison » et « Balade » avec le « coupé en fin de ligne (`/menu/` 1440 et 390, `/carte/`, `/histoire/` « la « petite sœur » à 390 px), « 50 € » dont le « € » ou le nombre passe à la ligne (`/carte/` 1440, « 0 € ou 50 € »), « : le » en début de ligne à 768 (`/evenements/`). Le grep du `dist/` donne « 9 €/40 € » séparés par une espace ordinaire (carte 9, menu 16, home 6) et des « « » suivis d'une espace ordinaire. Correction : U+00A0 entre le nombre et « € », à l'intérieur des « » et avant « : ; ? ! » dans `site.ts`, `menu.astro`, `carte.astro`, `index.astro`, `histoire.astro` ; vérifier par code de caractère dans le `dist/`.
- **F2-2 · phrase tournée vers la source sur `/reservation/`** (`reservation.astro:23`) : « Les jours d'ouverture viennent du site de la maison ; les heures sont à confirmer. » C'est une note de suivi du dossier lue par le visiteur (même famille que « Le site de la maison annonce », F2-1 de la passe 2, traitée ailleurs). Correction : ne garder que le badge « heures illustratives » suivi de « Congés annoncés pour 2027 : … ».

### F3 finition
- **F3-1** Loader mobile sous CPU x4 + 4G lente : `is-loaded` à 5637 ms (bureau 2046 ms), inchangé depuis la passe 2 ; plafond de 2,6 s non tenu en conditions mobiles dégradées. À contrôler sur un vrai appareil ou réduire la sortie du rideau (0,8 s).
- **F3-2** `/menu/` s'intitule « La carte » et `/carte/` « Les menus » (URL, `<title>` et h1 inversés par rapport au nom de l'URL), inchangé depuis la passe 1 ; le nav dit « La carte » = `/menu/` et « Les menus » = `/carte/`, cohérent en interne mais contre-intuitif.
- **F3-3** Eyebrow au-dessus de chaque titre et chiffre décoratif (« 2 » sur `/menu/`, « 5 » sur `/histoire/`) : motif répétitif sur toutes les pages, non traité depuis la passe 1.
- **F3-4** Horaires du pied de page affichés sur 8 pages sans « heures illustratives » (seules la home et `/reservation/` l'indiquent) ; Gault&Millau 15/20 sans la réserve du dossier (16/20 chez Trouve Ton Resto, `site.ts:178`) ; la 404 a un `canonical`/`og:url` vers `/404/` (fichier `404.html`), sans effet sous noindex.

Faux positifs écartés : titre « La carte » signalé « rogné » par mon script sur `/menu/` (`scrollWidth` = `clientWidth` = 1143 / 359 / 289 px, texte de x 147 à 489 à 1440, visible en entier sur `d-01-hero`) ; « 404 sans h1 / sans lang » et WARN `robots.txt` / `sitemap` de `audit.mjs` sur la 404 brute de `serve.mjs` (`404.html` réelle : h1, lang, noindex, mention, logo présents) ; 1 violation `color-contrast` de la 404 brute dans QA-revue3 (0 sur `404.html`).

## Ce qui est bien (à ne pas casser)
1. Données exactes et sobres : téléphone, e-mail, adresse, menus 73/90/28 €, accords 40/50 €, congés 2027, Barabas confrontés au dossier ; 0 fait faux, 0 invention non marquée, 0 heure en données structurées.
2. Socle propre : 8 pages, `lang="fr"`, un h1 par page, noindex, mention KYW et un seul logo partout, 0 console, 0 requête en échec, 0 débordement de 320 à 1440 px, axe 0 violation, CLS 0, LCP mobile 1,2 à 1,4 s.
3. Signature tenue et lisible : rideau, compteur, grands prix, filigrane « 200 » en bureau, sections sur photo désormais contrastées.

## Fichiers
Aucun fichier source modifié. Serveur 4837 (PID 15064) arrêté. Scripts maison dans le scratchpad `/tmp/claude-0/darv-r3/`.
