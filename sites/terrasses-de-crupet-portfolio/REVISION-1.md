# REVISION-1 · Les Terrasses de Crupet · portfolio

Hypothèse : F0 absent ; F1 et F2 tous corrigés ; F3 laissés sauf apostrophes droites listées (F3-3, partiel : data/site.ts non touché pour garder la correspondance avec donnees.json).

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 LCP mobile 3,8 s | corrige | variante `public/photos/xs/facade-ete.webp` (480 px, 72 Ko), `srcset` + `sizes` + `fetchpriority="high"` (`pages/index.astro`) ; `font-display: optional` (`layouts/Base.astro`) | CDP CPU x4 + 4G lente, 2 passes : LCP 2364 et 2340 ms (avant 3808/3780), CLS 0,003 (avant 0,046) |
| F1-2 parasol sur le titre | corrige | parasol du manifeste sans `obj--mobile` : masqué sous 768 px (`pages/index.astro`) | `display:none` mesuré à 390 px sur les `.obj` de `#manifeste` |
| F2-1 titre « Bistronomie » | corrige | `Brasserie à …` (`layouts/Base.astro`) | grep dist : 0 « bistronomie » |
| F2-2 faux avis | corrige | titre « Exemples d’avis (illustratifs) », étoiles retirées, étiquette « Exemple d’avis, texte illustratif » (`pages/index.astro`) | grep dist : 0 « Ils en parlent », 0 étoiles |
| F2-3 procédure emporter | corrige | « Renseignements : +32 83 655 111 » (`pages/emporter.astro`) | grep dist : 0 « Pour commander » |
| F2-4 « arrivée jusqu'à » | corrige | « service jusqu'à » (`motion/setup.ts`) | grep dist : 0 « arrivée jusqu » |
| F2-5 note méta + bouton | corrige | note supprimée (`pages/histoire.astro`), bouton « La maison » (`pages/index.astro`) | grep dist : 0 « ne sont pas documentés », 0 « Toute l'histoire » |
| F2-6 répétitions | corrige | histoire[0] et manifeste sans doublon (`data/site.ts`), accueil : paragraphe propre au lieu de histoire[2] (`pages/index.astro`) | « fera bon » : 1 occurrence sur accueil + La maison (avant 4) |
| F2-7 axe contentinfo/region | corrige | pied du site en `<section aria-label="Contact et horaires">` (`components/Footer.astro`) | grep dist : 1 seul `<footer` (kyw-footer) ; axe non relancé (pas de QA complète) |
| F3-3 | partiel | apostrophes typographiques dans 404, carte, accueil, terrasse | — |

Build : passe. Serveur arrêté. DESIGN.md inchangé (aucune décision de design modifiée).
