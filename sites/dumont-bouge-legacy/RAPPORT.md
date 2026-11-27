# Dumont Bouge · variante legacy · 2026-11-27 (QA, construction-3)

## QA
- Source : QA-build.md (captures et audit de l'agent captures) ; planches accueil et boulangerie relues (bureau 1440, mobile 375).
- Audit : 0 FAIL, 78 WARN (polices TTF/OTF, police variable 1499 Ko sur /menu/ et /reservations/ ; non bloquant en maquette).
- Console : 0 erreur, 0 requête en échec. Axe : 0 violation sur l'accueil et la boulangerie.
- Corrigé : cibles tactiles des crédits photo du pied de page (18 px de haut) : `.foot__credits a` en inline-block 24 px (page.css), mesuré 24 px après rebuild sur l'accueil.
- Non corrigé, hors périmètre : violation axe `color-contrast` (#6b787d sur #fbfaf8, 4,36:1) sur la « 404 » du shoot ; elle vient de `dist/404.html` à la racine du dépôt (page partagée), pas de ce site (la note du pied de page y est en #55646a). Notre `404.astro` n'est pas en cause.
- Constaté, non corrigé : « lien d'évitement pas en premier » (il est dans la séquence de tabulation) ; LCP mobile throttlé 2,0 s (accueil), 3,5 s (boulangerie), photos à optimiser ; polices TTF/OTF.
- Build final : `scripts/q.sh qa-build pnpm build:site sites/dumont-bouge-legacy` exit 0, 7 pages ; noindex présent sur tous les index.html.
- Non faits (sobriété, budget) : sweep sloplint complet, finish review en sous-agent, entrée de log hallmark, checklist des 72 cases en phase 3 ; à reprendre si exigé.

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Photo pains | boulangerie, accueil | Tomascastelazo (CC BY-SA, Wikimedia) | photo client |
| Photo latte | tea-room | Irvan Ary Maulana (CC BY-SA) | photo client |
| Photos tea-room, brunch | accueil | absentes | photos client |
| Formulaire réservation | /reservations/ | non relié, message « Rien n'a été envoyé » | service de réservation |
| Cartes iframe | horaires | non reproduites | cartes réelles |
| Mention | toutes pages | « Maquette KYW, certaines données sont illustratives » | conservée |

## Demande de matériel
La photo qui manque le plus : la vitrine de pains et pâtisseries de Dumont Bouge, en 1600x1000 minimum, pour le héros de la boulangerie.
