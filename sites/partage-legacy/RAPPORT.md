# Partage · variante legacy · 01/11/2026 · phase 3 (QA)

Base : `QA-build.md` (agent « captures », planches `.shots-partage-legacy-build/{home,partage-item,404}/planche.png`).
Vérifications après correction : script Playwright ciblé (axe sur `/`, `/carte/`, `/404.html`, hauteur des liens du pied, survol), captures ciblées du 404, du pied et de la table des horaires (1440 et 375), `sloplint src --render --kept --url` sur `/` et `/carte/` servis depuis `dist/`.

## Corrections QA
| Constat (QA-build) | Correction | Preuve |
| --- | --- | --- |
| axe serious `label-content-name-mismatch` sur `.nav__logo` | `aria-label` retiré (le texte visible « Partage Charles Jeandrain » nomme le lien) | axe : 0 serious sur `/`, `/carte/`, `/404.html` |
| 404 sans `lang`, sans `title`, sans `h1` (page du serveur) | `src/pages/404.astro` sur `Base` (noindex, kyw-footer, mention) : h1 « Cette page n’est pas à table », retour accueil + carte | capture 404 à 1440, axe 0 |
| `og:image` et `twitter:card` absents (4 pages) | `og:image` (portrait du chef 1200), `og:image:alt`, `twitter:card summary_large_image` dans `Base.astro` | grep sur les 5 `index.html` |
| pas de `robots.txt` | `public/robots.txt` (`Disallow: /`, cohérent avec noindex) | `dist/partage/legacy/robots.txt` |
| survol sans changement : « Lire la carte » (hero), « 081 81 00 98 » | soulignement 1 → 2 px au survol (`.lien--clair`, `a.num`, liens du pied) | mesure : 1px → 2px sur les deux |
| cibles < 24 px dans le pied (Instagram, Facebook, Politique) | `inline-block` + `padding-block` 4 px compensé par une marge négative (pas de décalage de ligne) | hauteurs 34 / 34 / 30 px ; alignement vérifié sur capture |
| sloplint FAIL 73 : `th` de l’en-tête des horaires masqué (visually-hidden) peint sous la ligne suivante | en-tête Jour / Midi / Soir rendu visible, petit et en gris | sloplint 0 FAIL ; capture horaires 1440 et 375 |

Écartés : `ttf/otf font shipped` (Hanken Grotesk servie par Google Fonts : le crawler d’audit reçoit un TTF faute d’agent navigateur, Chromium reçoit du woff2) ; cibles inline « 081 81 00 98 » (phrase de réservation) et « Attablez-vous » (phrase du pied) : exception WCAG 2.5.8 des liens dans le texte ; `skipLinkFirst: false` (le premier arrêt est bien « Aller au contenu ») ; « Lunch du midi » et « Menus et carte » sans survol : onglet actif et page courante.

## Résultat sloplint (après QA)
Before   444 FAIL · 174 REFLEX (site d’origine, `.hallmark/before.txt`)
After    0 FAIL · 12 REFLEX ouverts · 5 WARN · 4 DISMISSED · 4 NOTE (`.logs/partage-legacy-qa-sloplint2.log`)
REFLEX restants (non levés faute de budget, à traiter ou à waiver par la revue suivante) : 44c (hero accueil 912 px pour 900 ; hero de /carte/ : texte et visuel décalés, 208 px vides, gate 79), 49b (lien adresse sur 2 lignes, voulu : `<br>` rue / ville), 59 (écart minimal de 56 px entre sections : réservation → en images), 77 (section horaires jugée « mince »).
Kept     `--kept` ne compare pas (le before record porte les fichiers `.hallmark/site-actuel/*.html`, pas les URL) : câblage vérifié à la main en phase 1 (Zenchef rid=371394, tel:, Instagram, Facebook, Maps, routes).
Render   10 captures dans `.hallmark/shots/` (folds 1280, 1440, 1920 ; pleine page 1440 et 375).
Build    `pnpm build:site sites/partage-legacy` OK → `dist/partage/legacy/` (5 pages dont 404) · `pnpm index` OK.

## Hero review et finish review
Non faites en sous-agent (pas d’outil de sous-agent dans cette session) : à faire par la revue suivante.

## Placeholders et faits manquants
| Élément | Où | Valeur illustrative | À remplacer par |
| --- | --- | --- | --- |
| heures de service (soir, et midi) | Accueil, horaires ; JSON-LD | 12:00 à 14:00, 18:30 à 22:00 (`data-placeholder`) | heures confirmées par le restaurant |
| bon « Une soirée à partager » 120 € | /bon-cadeau/ | placeholder: true | formules réelles |
| bon « Montant libre, à partir de 25 € » | /bon-cadeau/ | placeholder: true | formules réelles |
| bon « Le lunch pour deux » 76 € | /bon-cadeau/ | dérivé du lunch à 38 € | confirmation du restaurant |
| politique de confidentialité | /politique-de-confidentialite/ | texte illustratif (`data-placeholder`) | texte du restaurant |
Slots `.fill` : aucun. Avis repris : aucun. Menus presse 49 € / 67 € non affichés (non confirmés).

## Demande de matériel
La photo qui changerait le plus la page : une vue des plats posés ensemble au milieu d’une table, servie de haut (le concept du lieu), pour le hero de /carte/ (720 × 540 rendu). Puis un visuel 1200 × 630 dédié au partage social (aujourd’hui le portrait du chef).

## Leçons structurelles
- Un `thead` en `.visually-hidden` (1 px clippé) déclenche `FAIL 73` de sloplint render (« text painted under another element ») : rendre l’en-tête visible et discret plutôt que masqué.
- `.tete-page .btn { margin-top }` l’emporte sur `.x__actions .btn` déclaré plus haut (même spécificité, ordre) : dans un rang d’actions flex, remettre la marge à zéro avec un sélecteur plus spécifique.
