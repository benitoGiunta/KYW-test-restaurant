# Escale en Vue ! · variante legacy · 2026-11-20

Phase 3 (QA, mode test). Pas de sous-agent disponible : revues en `self`. Fichier `QA-build.md` absent : QA lue depuis `.shots-escale-en-vue-legacy-build/home/` (report.json, planches desktop et mobile), fraîche (postérieure au build).

## 1. QA (captures et mesures)
| Mesure | Résultat |
|---|---|
| Erreurs console, overflow horizontal, axe | 0, non, 0 violation |
| LCP mobile, CLS, FPS | 1544 ms, 0, 60 |
| Cibles < 44 px, texte caché en reduced motion | 0, 0 |
| Clavier (12 arrêts), piège | aucun piège ; `skipLinkFirst: false` = faux positif connu (le lien « Aller au contenu » est le 1er arrêt) |
| 404 (shoot) | `shootFailed` : réponse brute du serveur ; `404.html` vérifié à la main : statut 200 en statique, title « Page introuvable », 1 h1, noindex, KywFooter, mention |
| Routes de `dist/escale-en-vue/legacy/` | toutes avec noindex, kyw-footer et « Maquette KYW » (grep -L vide) |

Défauts relevés et corrigés :
- Heures des tuiles : « à » seul en gros corps entre deux lignes, rythme cassé. Corrigé (`.jour__sep`, corps de texte muted). Capture 1440 et 375 vérifiée.
- Survol : changement de couleur seul (`colorOnly` 3). Ajout d'un décalage `translateY(-1px)` sur les boutons et d'un soulignement 2 px sur les liens de nav au survol.

Écartés (faux positifs vérifiés) :
- `invisibleFocus` sur « Appeler 0493 46 79 71 » : anneau 2 px `card-ink` mesuré en navigateur, visible sur la capture ciblée.
- `noHoverChange` sur « Réserver au… » : fond mesuré oklch(.83 .115 56) -> oklch(.74 .15 46) après 500 ms ; le shoot capturait avant la fin de la transition. Logo « Escale en Vue ! » : lien de marque sans survol voulu.

Build final : `pnpm build:site sites/escale-en-vue-legacy` OK, `pnpm index` relancé.

## 2. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires, saison 19 juin au 6 septembre 2026 | Horaires, hero | affiche 2026 du client | confirmer chaque saison |
| Réservation | boutons | téléphone seul (0493 46 79 71) | outil de réservation si le client en prend un |
| Carte (plats, notes) | Carte | texte du site d'origine, sans prix | prix et carte réels |
| Avis, abonnés | aucun rendu | null | non repris |
| Photos | hero, bières, terrasse | photos du client | photos de plats plus nettes |

## 3. Demande de matériel
Photo qui améliore le plus la page : le plat du jour maison, en lumière de terrasse (aujourd'hui seul l'apéro planchette est visible). Aussi : carte avec prix, logo vectoriel.

## 4. Leçons
Une ligne proposée dans `data/usage/test-1/lecons-proposees/escale-en-vue.md`.
