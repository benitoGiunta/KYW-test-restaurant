# Révision 1 · Champs Elysées · legacy (révision ciblée F1, F2)

Hypothèses : code postal 5100 conservé (à confirmer, déjà marqué dans `site.ts`) ; « Gin de Namur » du dossier absent de `carte.json`, donc non repris dans le texte ; F3 non traité (hors liste de la consigne).

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 JSON-LD | corrige | `src/layouts/Base.astro` : `Restaurant` (adresse, geo, horaires lun-sam 11-22, dim 11-16, `sameAs` Facebook, aucun avis) | 5/5 pages : JSON-LD valide, 2 plages horaires, postalCode 5100 |
| F2-1 LCP mobile | corrige | `public/photos/hero-tables-{640,960,1440}.webp` (38/74/120 Ko), `srcset` via `Photo.astro` (prop `srcset`), `preload` image avec `imagesrcset` | LCP 2,80 s vers 1,64 à 1,68 s (4 passes, CPU x4, 1,6 Mbit/s) ; image servie : `hero-tables-960.webp` |
| F2-2 CLS carte | corrige | polices auto-hébergées `public/fonts/` (Sentient 300/400, Hanken Grotesk), preload des deux principales, `@font-face` de repli (Georgia, Arial) à métriques ajustées ; plus aucune CSS tierce (grep `fontshare`/`googleapis` = 0 dans `dist`) | CLS carte mobile 0,099 vers 0 (2 passes), accueil 0 |
| F2-3 double contentinfo | corrige | `Footer.astro` : `<section class="foot" aria-label="Coordonnées de la brasserie">` | axe : 0 violation sur 5 pages (1440 px), 1 `<footer>`, pas de `region` |
| F2-4 « À propos » | corrige | `index.astro` : 3 phrases du dossier (13/07/1984, ancien café Le Sportman, Maurice et Teresa associés, 120 couverts, Burger des Champs bœuf de Famenne et Maredsous, présent dans `carte.json`) ; pas de citation | grep dist : filler « suspendu », « unique » absent |
| F2-5 index carte | corrige | `la-carte/index.astro` : index des 15 rubriques sorti de la bannière, `<nav class="index-bar">` sticky sous l'en-tête, défilement horizontal, scroll-margin des ancres ; `page.css` | capture `.shots-champs-elysees-legacy-rev/p1-carte-d.png` et `-m.png` : barre collée à 76 px (desktop) / 64 px (mobile) après 6000 px de défilement, scrollWidth 1440 / 390, ancre `#desserts` visible sous la barre |

Sloplint (genre atmospheric, accueil) : 0 FAIL, 0 REFLEX. Carte : 0 FAIL, 1 REFLEX 44c (« hero ends at 531px ») : l'index ayant quitté la bannière, la bannière de la page carte est plus courte, la barre sticky suit immédiatement ; accepté (pas de remplissage par du texte).
Décision de design : index de la carte devenu barre persistante (DESIGN.md non modifié : sobre, mêmes filets et tokens).
Bilan : 6 corrigés, 0 refusé, 0 impossible. Publiable : oui.
