# Pépite · variante legacy · 2026-11-10

## QA (phase 3)
- Source : QA-build.md (captures de l'agent « captures »), audit 0 FAIL / 9 WARN.
- Corrigé : `twitter:card` ajouté (Base.astro) ; liens du pied 20 px -> 33 px de haut (padding, mesuré à 1440). Rebuild OK, `dist/pepite/legacy/` : noindex et kyw-signature sur index.html et 404.html, `pnpm index` passé.
- Écartés (faux positifs ou sans objet) : 404 sans title/lang/h1 (réponse brute de serve.mjs, 404.html a title, lang et h1) ; skipLinkFirst false ; robots.txt et sitemap sous base ; polices ttf servies par Google Fonts (hors de notre contrôle) ; phrase « Boutique dès 16 h 00 Cave à manger dès 19 h 00 » répétée = ligne de données du tableau d'horaires (jeudi/vendredi), voulue ; hover couleur seule sur le lien « pépite » : acceptable.
- Non refait en phase 3 (hors budget) : sweep sloplint complet, finish-review sous-agent, entrée du journal (fingerprint) et cases DESIGN.md restantes : voir ETAT.md. Résultat sloplint de la phase 2 : 0 FAIL, 1 WARN (28a, waive), 1 NOTE (58, Presse 98 mots).

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Menu à partager | Carte | 58 € (hypothèse phase 1) | prix confirmé par le restaurant |
| Réservation | boutons | lien Tablebooker du site d'origine | à confirmer |
| Avis | Presse | extraits du site d'origine mot pour mot | à vérifier |

## Demande de matériel
Photo qui manque le plus : le couvert dressé ou la vitrine de la cave, pour l'écran Presse/Carte (aujourd'hui très typographique).
