# Wok de Jin · variante legacy · 2026-11-19 (phase 3, QA)

## 1. QA (captures de l'agent « captures » + vérifications ciblées)
| Constat QA-build | Verdict | Action |
|---|---|---|
| `twitter:card` absent (accueil, réveillon) | réel | ajouté dans `Base.astro` (`summary_large_image`), vérifié dans les 3 pages du build |
| Violation axe contraste sur la « 404 » | faux positif : réponse brute de `serve.mjs` | `404.html` réel capturé à 1280x800 : titre, phrase, bouton lisibles |
| Focus invisible « Découvrir la soirée » | faux positif (mesure pendant le reveal) | focus clavier testé après le reveal : outline 2 px solid, `--color-focus` |
| Cibles < 24 px (tel dans une phrase, lien « page d'accueil ») | non corrigé : liens en ligne dans une phrase (exemption WCAG 2.5.8), 44 px en `pointer: coarse` déjà en place | aucune |
| CLS 0,046 accueil / 0,03 mobile | sous le seuil 0,1 (échange de police) | aucune |
| robots.txt, sitemap, phrase d'horaires 6x, fontes TTF | faux positifs connus / noindex voulu, répétition = horaires par jour | aucune |
| Erreurs console, requêtes en échec, débordement horizontal, WebGL | 0 | rien à faire |

Build final : `scripts/q.sh wokleg-build pnpm build:site sites/wok-de-jin-legacy` passe (3 pages, noindex, kyw-footer présents sur chaque route).

## 2. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Lien de commande à emporter | slot `.fill` accueil | « à fournir » | URL réelle du restaurant |
| Données illustratives | mention de pied de page | — | validation client |
| Réservation | `tel:` et lien externe de l'original | repris | confirmer avec le client |

## 3. Non fait (hors périmètre de cette passe QA)
Sweep sloplint complet, finish review par sous-agent, log hallmark et checklist 72 cases n'ont pas été relancés ici (QA ciblée uniquement, phase test).
