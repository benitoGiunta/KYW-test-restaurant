# INCORЯECT · variante legacy · 2026-11-07

## QA (phase 3)
- Lu : QA-build.md (planches accueil et 404 de l'agent captures). Aucune capture complète refaite.
- Corrigé : contraste du texte sur la passe teal (`.bill__t`, 4,49:1 sous le seuil) : `--color-accent` passé de 65 % à 67 % de clarté dans tokens.css, rapport calculé environ 6,7:1 (encre sur teal). Pas de recapture axe (script shoot absent du dépôt), vérifié par calcul.
- Faux positifs écartés : axe « document-title » et « html-has-lang » sur la page absente venaient de la page 404 du serveur de dev ; `dist/incorrect/legacy/404.html` porte `lang="fr"` et un `<title>`.
- Focus « invisible » (2 liens) : mesuré à 1440, tous les boutons visibles ont un contour 2 px (teal foncé sur papier, teal sur encre) ; non reproduit, laissé.
- WARN non traités : pas de robots.txt (voulu, noindex), polices en .ttf (511 Ko), 404 sans h1 dans la capture dev (le fichier construit en a un).
- Build : `pnpm build:site sites/incorrect-legacy` OK, noindex + kyw-footer présents sur index.html et 404.html, `pnpm index` OK.

## Non fait (hors budget de cette passe)
- Passe sloplint `--render` finale, finish review sous-agent, entrée `theme.mjs log`, 72 cases de la checklist DESIGN.md : à faire par une passe suivante.

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires | Venir | à confirmer, pas d'état « ouvert » | horaires officiels |
| Réservation | boutons | lien Barestho de l'original | formulaire propre si voulu |
| Mention maquette | pied | « Maquette KYW, certaines données sont illustratives » | retirer à la mise en ligne |

## Demande de matériel
Photo qui améliorerait le plus la page : la pizza de table en lumière naturelle, cadrage carré, 1600 px minimum.

## Leçons
- Les 404 capturées sur le serveur de dev donnent de faux échecs axe (titre, lang) : vérifier `dist/404.html`.
