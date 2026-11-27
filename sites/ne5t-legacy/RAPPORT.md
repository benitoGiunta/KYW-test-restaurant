# NE5T Hôtel & Spa · variante legacy · 2026-11-27 (phase 3, QA)

## QA (corrections)
| Constat (QA-build.md) | Action | Preuve |
|---|---|---|
| Axe sérieux `label-content-name-mismatch` sur `.nav__cta` (toutes pages) | `aria-label` retiré de `Nav.astro` (le texte visible suffit) | rebuild : 0 `aria-label="Réserver` dans `dist/`; `aria-label` nul en navigateur |
| Cibles tactiles desktop 20 px (3 liens `.link` accueil) | `.link` en `inline-flex`, `min-height: 24px` | mesure Playwright : 25 px x3 |
| 404 : contraste 4,36:1 `.kyw-footer__note` | Faux positif : mesuré pendant le reveal ; après 3 s la couleur est #55646a, opacité 1 | mesure Playwright |
| 404 : pas de lien d'évitement | Faux positif : « Aller au contenu » est le premier arrêt Tab | mesure Playwright |
| Erreur console 404 de ressource (bureau) | Non reproduite en build servi ; probablement la barre du serveur de dev | non corrigée |
| WARN audit : polices `.ttf` | Non corrigé (conversion woff2 hors périmètre de cette passe) | audit : 0 FAIL |

Build final : 7 pages, passé ; `noindex` et `kyw-footer` présents sur toutes les routes ; `pnpm index` passé. Non faits : sweep sloplint complet, finish review sous-agent, jury, axe/LCP après correction (budget sobriété, captures complètes interdites).

## Placeholders et faits manquants
| Élément | Où | Valeur actuelle | À remplacer par |
|---|---|---|---|
| Heures exactes | accueil, restaurant, infos (`.fill`) | provisoires | horaires confirmés |
| Adresse | pied de page, infos | reprise du site d'origine | à vérifier |
| Menu Éphémère | restaurant | placeholder | carte réelle |
| Avis | aucun | absent | avis vérifiés |
| Descriptions des suites | suites | absentes | textes du client |

Photo manquante la plus utile : une vue de la suite/duplex en lumière du soir pour la page suites.
