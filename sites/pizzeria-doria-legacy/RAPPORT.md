# Pizzeria Doria · variante legacy · 2026-11-19

## QA (phase 3)
- Captures ciblées (1440 et 375, 5 routes : accueil, menu, vins, contact, 404) : 0 image cassée, 0 erreur console, 0 requête en échec, scrollWidth = viewport (aussi à 320 sur 4 routes), noindex, mention « Maquette KYW » et signature KYW sur les 5 pages, un seul h1 par page.
- Chiffres du shoot de l'agent « captures » (accueil) : LCP 472 ms bureau, 792 ms mobile throttlé, CLS 0, 0 petite cible, FPS 60. Axe non extrait, audit.mjs non lancé (captures interrompues sur /menu/).
- Corrections :
  1. Reveal : rootMargin -12 % et seuil 0,05 laissaient les casiers du pied de /contact/ à opacité 0 jusqu'au filet de 4 s. Réglé à -4 % et seuil 0 ; vérifié (opacité 0,99 moins d'une seconde après le défilement).
  2. sloplint FAIL 49a : « Commander par téléphone » passait sur 2 lignes à 320 px. Libellé « Commander au téléphone », `.btn` en `nowrap` ; sloplint ne le signale plus, pas de débordement à 320.
- sloplint (genre atmospheric, --render, 1 URL) : 3 FAIL, 1 REFLEX. FAIL 34 et 50 = faux positifs connus (base.css ; accolades Astro dans les titres). REFLEX restant : 44c/59/79 non levés (écart de 20 px avant le pied, hero à 569 px de 900) ; non traités. `kept` : avant 217 FAIL, maintenant 3.
- Non fait : finish review par sous-agent (pas d'outil Agent), log theme.mjs, cases DESIGN.md complétées une à une, jury.

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Photo hero | accueil (`data-placeholder`) | stock Unsplash | photo du restaurant |
| Photo vins | /vins/ | stock Unsplash (bouchons) | photo de la cave de Luigi |
| Avis | accueil | datés de 2023 | à vérifier avec le client |
| Horaires, menu 2026, prix | pages | repris du site d'origine | confirmation client |

## Demande de matériel
Photo qui améliorerait le plus la page : la salle de l'ancienne banque, en paysage 1600x1000 (hero). Ensuite : une pizza sortie du four, la carte des vins en main.

## Leçons
Voir data/usage/test-1/lecons-proposees/pizzeria-doria.md.
