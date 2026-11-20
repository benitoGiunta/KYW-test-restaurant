# Les Terrasses de Crupet · variante legacy · 2026-11-20

## 1. Approche conservée vs site d'origine
| | Origine | Legacy |
|---|---|---|
| Type | one-page | one-page (garde) |
| Hero | photo de salle, titre | photo de salle plein cadre, titre sur voile, un bouton (Poster) |
| Nav | ancres, bouton Réserver | barre `slab` sticky, menu Popover sous 70rem, CTA en contour |
| Carte | sections + PDF | Switcher à six panneaux, PDF gardés |
| Réservation | widget Zenchef (rid 367820) | lien Zenchef conservé, téléphone |
| Animations | aucune notable | aucune (Spore : états seulement) |
Dérogation : hero Index tiré au sort échangé contre Poster (posture d'origine).

## 2. Axes traités
Voir AUDIT.md et DESIGN.md : système (Spore, cuivre #ce5923 lu sur la marque), composition en rangées, nav, pied, photos client. Non traité : aucune photo de remplacement, pas de formulaire (Zenchef).

## 3. Résultat sloplint
Before 202 FAIL, 90 REFLEX. After : 0 FAIL, 0 REFLEX (59 corrigé en QA), 3 WARN (F15 gaps ; kept non comparé car l'avant est externe), 3 NOTE 58 (titre 9 mots, accroche 17 mots, 106 mots écran carte : contenu du client). Render : tourné, 5 captures dans `.hallmark/shots/`. Build : `dist/terrasses-de-crupet/legacy/` (index et 404 : noindex, kyw-signature).

## QA phase 3
QA-build.md absent : captures de sloplint relues (1440 pleine page, 375 pleine page). Corrections : (1) espace sous le pied portée à 120 px (REFLEX 59) ; (2) menus de fêtes à 375 : rangées empilées (le nom était écrasé en colonne étroite). Vérifié par capture ciblée : `.fetes` à 375, menu ouvert à 375, clic d'ancre (menu se ferme, section à 88 px du haut), scrollWidth 375. Nav 1440 : liens espacés (40 px) ; l'aspect collé de la planche sloplint est un artefact de capture.

## 4. Reviews
hero-review self (2 sur 3 résolus), finish-review self (3 résolus). Aucun sous-agent disponible. Ce que l'ancien site faisait mieux : widget de réservation intégré (ici un lien Zenchef).

## 5. Placeholders et faits manquants
Aucun `data-placeholder`, aucun slot `.fill`. Avis : aucun repris. À vérifier : légende « Convivialité au cœur du village » et mention du bon cadeau (tirées du site actuel, à faire confirmer) ; prix de la carte datés du 15 octobre.

## 6. Demande de matériel
Photo qui améliorerait le plus la page : un portrait d'équipe ou plat signature en 2400 x 1600 pour la bande ; les photos 675 x 1200 (bande, chalet) paraissent molles en grand.

## 7. Leçons structurelles
Voir data/usage/test-1/lecons-proposees/terrasses-de-crupet.md.
