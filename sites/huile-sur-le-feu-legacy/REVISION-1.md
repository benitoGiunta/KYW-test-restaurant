# Révision 1 · huile-sur-le-feu legacy (F2 seulement)
Hypothèse : les F3 ne sont pas traités (consigne : F2 seulement). Rebuild via `scripts/q.sh` OK (6 pages).

| id | décision | changement | preuve |
|---|---|---|---|
| F2-1 og:image | corrige | `public/og-flambage.jpg` (1200x630, photo 04) ; `og:image`, dimensions, `og:image:alt`, `twitter:card=summary_large_image` + `twitter:image` dans `src/layouts/Base.astro` | `og:image` présent sur accueil, carte, boutique, contact (mesure Playwright) ; fichier dans `dist/…/legacy/` |
| F2-2 JSON-LD | corrige | `openingHoursSpecification` (mar-sam 12:00-14:30 et 18:00-21:15, source `donnees.json`) et `acceptsReservations` (URL Barestho) dans `Base.astro` | grep `openingHoursSpecification` dans `dist/…/index.html` = 1 |
| F2-3 cibles 21 px | corrige | `page.css` : `a.link, .pied a` en `inline-block` + `padding-block .3rem` ; `.site-nav a` `min-height 32px` au-dessus de 60 rem (le burger garde son bloc de 52 px) | 0 lien < 24 px (hors paquet KYW) sur 4 pages à 1440, 1024, 768, 390 ; `scrollWidth` = largeur partout |
| F2-4 axe region | corrige | `Pied.astro` : `<div role=group>` devenu `<section aria-label="Pied de la maison">` | `.pied` = SECTION ; axe sur boutique 1440 : 0 violation |
| F2-5 photo répétée | corrige | `boutique.astro` : photo de tête 14 remplacée par 16 (oliveraie, cohérent avec Oliviers & Co) ; galerie 13/14/15 inchangée | `img` de `main` : 16, 13, 14, 15 (plus de doublon) |

Refusés : 0 · impossibles : 0. F3 non traités. DESIGN.md inchangé. Site publiable : oui.
