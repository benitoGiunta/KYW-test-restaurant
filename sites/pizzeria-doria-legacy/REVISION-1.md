# Révision 1 · Pizzeria Doria · legacy

Hypothèses : `donnees.json` est complété (`extraits_avis`, 3 entrées avec source Tripadvisor) comme le demande F2-1 ; `pnpm index` non lancé (hors révision ciblée). Pas de commit.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F0 | rien à corriger | – | revue : aucun bloquant |
| F1-1 | corrigé | `Base.astro` : aria-label « Doria pizzeria, accueil » | axe 0 violation sur 4 pages x 1440/390/320 (plus de `label-content-name-mismatch`) |
| F1-2 | corrigé | `index.astro`, `page.css` : hero en 2 colonnes (plaque verte + photo client de la salle des coffres, 640x800 natif, plus de photo de stock en hero) ; section « coffres » supprimée (doublon, texte fondu dans le lead du hero) ; avis : 1 grand + 2 empilés ; tuiles de la carte remplacées par une liste à filets ; photos pizza-coupe supprimées de `public/` | capture 1440 et 390 : titre à 313 px (desktop) et 112 px (mobile), actions finies à 659 et 486 px ; 0 débordement à 1440/390/320 |
| F2-1 | corrigé | `site.ts` (« Un client »), `index.astro` (titre « Avis publiés sur Tripadvisor en 2023 »), `donnees.json` (3 extraits + source) | grep `Roam6` : 0 dans dist |
| F2-2 | corrigé | `Base.astro` : og:type/locale fr_BE/site_name/title/description/url/image(+alt) ; `index.astro` : JSON-LD Restaurant avec openingHoursSpecification issu de `horaires` | grep dist : og:image sur accueil et menu, ld+json sur accueil. Favicon PNG laissé tel quel |
| F2-3 | corrigé | `Rows.astro` (prop `niveau`, h3 par défaut), `menu.astro` (h4 seulement sous un h3 de catégorie) | axe : plus de `heading-order` sur /menu/ et /vins/ |
| F2-4 | corrigé | `Base.astro` : `.pied` en `<section aria-label="Coordonnées de la pizzeria">` | 1 seul `<footer>` dans dist ; axe 0 (ni `contentinfo` double ni `region`) |
| F2-5 | corrigé | `index.astro` (histoire réécrite avec les faits du dossier : octobre 2017, Rocco et Luigi, mai 2023, ancienne banque, Eggusto bio, fior di latte sans lactose) | relecture du texte |
| F2-6 | corrigé | `index.astro` : légende « Photo d’illustration » sur la photo de pâte (seule photo de stock restante) ; `Base.astro` : « à remplacer … » retiré du pied | grep dist : 0 « à remplacer » |
| F2-7 | corrigé | `index.astro` : chiffre « dès 7,50 € » conservé, titre « De la marinara à la Maradona. » sans prix | capture de la section |
| F2-8 | partiel | hero refait (le « hero à 569 px » disparaît) ; `.hero` reçoit `color` ; sloplint relancé : 3 FAIL (faux positifs : `overflow-x: clip` et `overflow-wrap` déjà posés dans `base.css`), 1 REFLEX (écart de 20 px entre sections, non localisé), WARN hero levé après rebuild | `.logs/sloplint.log` |
| F3-1/F3-2 | corrigé | `&nbsp;` dans « 50 € », U+00A0 avant « : » dans `horairesNote` | – |
| F3-3 | non traité | polices ttf/otf : hors périmètre F0-F2 | – |

DESIGN.md : la décision « hero photo plein cadre sur stock » est remplacée par un hero 2 colonnes sur la photo client ; non réécrit dans le fichier (hors budget), à reporter.

Bilan : 11 corrigés, 1 partiel, 0 refusé, 0 impossible. Publiable : oui, sous réserve de la revue 2.
