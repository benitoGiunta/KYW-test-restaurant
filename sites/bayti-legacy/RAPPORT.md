# Bayti · variante legacy · 27/11/2026 (phase 3 : QA)

## 1. Approche conservée vs site d'origine
| | Origine (Wix) | Legacy |
|---|---|---|
| Type | multi-pages (8 routes) | idem, routes gardées |
| Hero | photo + titre | titre, phrase, actions, deux tuiles de prix |
| Nav | Wix | popover sous 70 rem, Réserver en contour |
| Réservation | lien Barestho | conservé |
| Animations | état seulement | idem (waive 22 documenté) |

## 2. Axes traités
Voir AUDIT.md et DESIGN.md (72 cases ajoutées en phases 1 et 2).

## 3. Sloplint
- Source : 0 FAIL, 0 REFLEX, 1 WARN (24ch de la citation display, assumée).
- Rendu, 7 routes (dev, 1440/1920) : avant correction 1 FAIL (44d chez-vous) et 22 REFLEX ; après : 0 FAIL, 10 REFLEX, tous levés par `waive` en tête de page.css (44c, 79, 77, 59 avec raison).
- Corrigés : hero de bayti-chez-vous plafonné (photo max-height), titres de pied de page en `<p>` (78), galerie 18 à 15 photos (83 reste approchant, waive non requis sur l'effectif ; poids réduit).
- Kept : « nothing recorded » (before 2421 FAIL / 465 REFLEX, now 0 / 10 waived) ; WARN : pages du before non toutes rendues.
- Build OK, 8 pages portent noindex et pied KYW ; `pnpm index` passé.

## 4. QA captures (agent captures + vérifs ciblées)
- Accueil, notre-histoire : 0 console, 0 axe, CLS 0, pas de débordement. La « 404 » de la planche est la 404 brute de serve.mjs ; la vraie `404.html` : 0 violation axe.
- Corrections : `twitter:card` ajouté (Base.astro), image par défaut des photos 800 px au lieu de 1100 px, hero chez-vous vérifié par capture (tient dans 900 px).
- Faux positifs : lien d'évitement « pas en premier » (lire keyboard.stops), robots.txt/sitemap sous base (sitemap présent).
- Restent en WARN : phrase d'horaires répétée 5 fois (horaires affichés par lieu), poids de la galerie ~4 Mo (images chargées en lazy).
- Pas de jury, pas de finish review par sous-agent (pas d'outil Agent) : auto-notation `self`.
- Log `.hallmark/log.json` en conflit de fusion (UU) : non écrit, à régler par la session mère.

## 5. Placeholders et faits manquants
Aucun nouveau. Chapeau de bayti-chez-vous raccourci (fin de phrase d'origine retirée) : à valider. Pas d'avis inventé. Slots `.fill` : voir ETAT phase 2 (aucun ajouté).

## 6. Demande de matériel
Photo qui manque le plus : la salle du restaurant (Pont 15) en lumière de service, pour le hero de notre-histoire ; format 1600x1200 min.

## 7. Leçons
Footers : ne pas utiliser h2 pour les titres de colonnes (gate 78). Voir data/usage/test-3/lecons-proposees/bayti.md.
