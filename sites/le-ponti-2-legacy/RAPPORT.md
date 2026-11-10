# Le Ponti 2 · variante legacy · 2026-11-10

## 1. Approche conservée vs site d'origine
| Élément | Origine | Legacy |
|---|---|---|
| Type | site vitrine multi-pages | idem : /, /menu/, /contact/, 404 |
| Hero | photo, texte, réservation | Ledge : texte, photo, réservation d'abord |
| Nav | classique | masthead à trois parties, collante, menu `<dialog>` mobile |
| Carte | liste longue | neuf rubriques, index collant, menu 3 services à 40 € en signature |
| Animations | aucune notable | reveal discret à l'entrée, repli statique sans JS et en mouvement réduit |

## 2. Axes traités
Voir AUDIT.md et DESIGN.md (phases 1 et 2). Phase 3 : QA navigateur ciblée, correction des statistiques de rubrique.

## 3. Sloplint (self, sans sous-agent)
- Before : 191 FAIL, 76 REFLEX. After : 0 FAIL, 0 REFLEX, 3 WARN (F15 trois écarts de colonnes 24/32/64 px, non tranché ; 2 WARN kept : rapport `--kept` non comparable, mêmes pages non rendues), 1 NOTE (lead de 19 mots, texte du client).
- Render : sloplint `--render` non relancé (échoue en root, voir leçons) ; QA Playwright à la place.
- Build : vert, `dist/le-ponti-2/legacy/` ; noindex, kyw-signature et mention KYW sur les 4 pages.

## 4. QA phase 3 (QA-build.md absent : captures faites ici, ciblées)
- 5 largeurs (320, 375, 768, 1280, 1920) x 3 pages : aucune erreur console, aucune requête en échec, aucune image cassée, aucun débordement de page. Seul le défilement horizontal voulu de l'index de la carte (menu) dépasse, dans son conteneur.
- Reveal : 9 cartes visibles après défilement (0 cachée). Une capture pleine page sans défilement les montre vides : artefact de capture, pas un défaut.
- Défaut corrigé : les rubriques comptaient les suppléments et accompagnements comme plats ; « Pizzas : 22 plats, de 2 € à 23 € » devient « 20 plats, de 14 € à 23 € », « Viandes : 9 plats, de 3 € à 30 € » devient « 3 plats, de 22 € à 30 € » (src/data/site.ts). Vérifié dans le HTML construit.
- Cibles tactiles : les liens de pied et d'adresse mesurent moins de 24 px sous pointeur fin ; le remplissage 44 px est sous `(pointer: coarse)` (voulu).
- Non fait : revue finish par sous-agent (pas d'outil Agent), jury, gates jugées une à une, entrée du journal `.hallmark/log.json`.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| 5 rubriques sans photo | carte (/) | nombre de plats en grand corps | photos des entrées, pâtes, salades, desserts, cocktails |
| Jours fériés | horaires | état « d'après les horaires habituels » | calendrier de fermetures du client |
| Facebook | pied | lien du site d'origine | à confirmer |

## 6. Demande de matériel
Photo la plus utile : une photo de pâtes ou d'entrée en grand format (au moins 1600 px) pour la rubrique Pâtes, la plus fournie après les pizzas ; puis une photo de la salle.

## 7. Leçons
Un regroupement de catégories (Pizzas + Suppléments) fausse les comptes et prix minimum : exclure suppléments et accompagnements des statistiques. Une capture pleine page sans défilement montre les blocs à reveal vides : défiler à la molette avant. Playwright : `executablePath: '/opt/pw-browsers/chromium'` (le headless shell attendu est absent).
