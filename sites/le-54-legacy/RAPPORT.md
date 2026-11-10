# Le 54 · variante legacy · 2026-11-10

## 1. Approche conservée vs site d'origine
| Élément | Origine | Legacy |
|---|---|---|
| Type | multi-pages | multi-pages, 7 routes (accueil, carte, à propos, galerie, réservations, contact, 404) |
| Hero | photo de salle | photo noir et blanc plein cadre, plaque papier avec titre, phrase, action |
| Nav | menu classique | barre sticky, menu mobile `popover` |
| Carte | menus 3 et 4 services | conservés (48 €, 65 €) |
| Animations | aucune notable | reveal unique, entrée de salle ; visible sans script et sous `reduce` |
Dérogation : aucun bouton plein (thème Atelier), le survol remplit d'encre.

## 2. Axes
Traités : voir AUDIT.md (typographie, hiérarchie, mobile, formulaire honnête, contraste). Non traité : WebGL « air » (décision : papier uni).

## 3. sloplint (phase 3, `--render --kept`, 6 URL)
Before : 21 FAIL, 28 REFLEX. After : 0 FAIL, 0 REFLEX, 2 WARN (kept non comparé : `site-actuel` hors cible, confirmé sans objet), 8 WAIVED (gate 77, sections minces de fin de page), 3 NOTE (58, 95 à 134 mots par écran sur accueil, à propos, carte : acceptés, texte client).
Reworded : h2 d'accueil « Une cuisine raffinée et savoureuse… » devenu « Une carte de saison, souvent renouvelée, qui va à l'essentiel. » (gate 19, tell français ; fait tiré de la page à propos du client).
Contrôles Playwright (7 routes x 375 et 1440) : 0 débordement, 0 image cassée, 1 h1, 0 bloc de reveal resté transparent après défilement, 0 erreur console (hors 404 voulue).
Build : OK ; noindex, `kyw-signature`, mention « Maquette KYW » sur les 7 pages ; aucun tiret cadratin ; `pnpm index` passé.

## 4. Reviews
Hero review `self` : ship, 0 finding (phase 2). Finish review : sous-agent indisponible en session, auto-notation `self` sur captures phase 2 et 375/1440 de phase 3 : ship. Ce que l'ancien site faisait mieux : rien d'établi, sa photo de salle est reprise. Jury : non lancé. QA-build.md de l'agent « captures » absent : contrôles refaits ciblés ci-dessus.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Lundi | horaires | « à confirmer » | horaires confirmés par le restaurant |
| Horaires | tout le site | source Trouve Ton Resto | horaires du client |
| Avis | accueil | aucun extrait | avis vérifiés (non repris) |
| Date | pied | mention maquette KYW | à retirer à la mise en ligne réelle |
Aucun slot `.fill` vide. « Mardi » en jour courant : calcul client, à revérifier un autre jour.

## 6. Demande de matériel
Photo qui améliorerait le plus : une photo de plat dressé en lumière naturelle, 1600 x 1000, pour l'accueil (hero actuel : salle seule). Aussi : portrait du chef (4:5) pour à propos.

## 7. Leçons
Playwright : le navigateur préinstallé est `chromium_headless_shell-1243` ; une version différente de `playwright` cherche -1248 : passer `executablePath` explicite. Voir agents/lecons/construction.md.
