# ETAT · tariki-legacy · phase 2 sur 3 (construction-2), 2026-11-19

## Fait en phase 2
- Hero : bug de phase 1 corrigé (photo sur 800 px seulement : `.fig__slot` en `aspect-ratio: 1`), grille étirée, plaque haut droite ; hauteur `min(100dvh, 1080px)`. Hero review `self` : 1 finding, resolved ; sloplint hero 0 FAIL, 0 WARN, 2 WAIVED (44c, comp c1 reproduit). `comp.md` : trois questions et stamp.
- Nav pill + menu Popover sous 60 rem (`Menu`, `Fermer le menu`, lien d'appel) ; barre de réservation collante au téléphone (`data-bar`, masquée devant `#reservation` et le pied, absente sans script) ; huit états des boutons et onglets dont `:disabled`.
- Formulaire sans envoi : validation blur puis input, selects natifs, dimanche refusé, message « Rien n'a été envoyé… » ; aide `1lh`.
- Un reveal (photos feu et arcades), onglet de carte par défaut selon jour et heure, clavier Home/End, reduced motion, `accent-color`.
- Mesures Playwright (script `tariki-p2-mesure`) : pas de débordement x à 1280 et 375, menu s'ouvre et se ferme, barre on/off, reveal visible sans script et en `reduce`. Build `scripts/q.sh build` OK ; pied KYW, noindex, mention sur les 3 pages ; aucun tiret cadratin.
- DESIGN.md : § Composants complété, Sur-utilisation 2, 6, 7, 17, 19 à 24, 29, 30, 48, 49, 56, 58, 63, 72 cochés.

## Reste (phase 3)
- sloplint `--render` sur `/`, `/la-carte/`, 404 ; `--kept` ; contraste ; fold 1280x800 ; cibles 44 px à 375 des liens en ligne ; RAPPORT.md ; `pnpm index` ; axe sur le menu ouvert et le formulaire en erreur.
- Le shoot complet est celui de l'agent captures (non fait ici).
- Non vérifié : ordre de tabulation réel du menu Popover au clavier (DOM : bouton, puis menu, puis Réserver) ; saisie d'une heure hors créneaux non contrôlée (seul le dimanche l'est) ; date affichée en mm/dd/yyyy en Chromium anglais.

## Pièges
- Astro supprime le backslash d'un attribut `pattern="\+?…"` : écrire `[+]?[0-9 ]{8,16}`.
- Le `grep '[—–]'` sans locale UTF-8 donne de faux positifs (€, ’) : contrôler en Python.
- Les modifications de `dist/tariki/portfolio/` et `awwwards/` vues par `git status` ne sont pas de moi.

## Décisions et hypothèses
- Thème Darkroom, ambre remplacé par l'ocre du logo (212 168 100). Le logo (texte noir, PNG transparent) est posé sur une plaque crème `--color-cream`, comme sur le site d'origine ; la nav utilise un nom en texte plus « طريقي » (Amiri, rôle outlier).
- Photos du client : braises en couleur (hero, seule couleur), feu de camp et arcades en noir et blanc (règle du thème). Arcades et feu marqués `data-placeholder="true"` (visuels d'ambiance, arcades probablement générées, ce n'est pas la salle) ; aucune photo de plat, de salle ou d'équipe n'existe.
- Prix du soir : version de `/la-carte` (kefta 19, magret 32, maquereau 26) ; la version d'accueil du client est plus chère et propose « Le début du voyage » à 18 € par personne (non repris) : à confirmer avec le client.
- Allergènes : phrase reformulée à partir de l'affiche (fruits à coque, lait, sésame ; signaler toute allergie), à vérifier.
- Adresse : rue de l'Ouvrage 2 (site du client), jamais rue du Pont 15 (= Bayti).
- Supprimé (`dropped`, listé dans le stamp) : `/cart-page`, `/blank`, `/blank-1` (modèles vides), lien wix.com, « © 2035 by mysite ».
- Formulaire de réservation : markup statique avec `data-endpoint=""` et une note visible (pas de système de réservation relié) ; l'ancien module Wix n'est pas reproductible.
- Textes à vérifier : « Une carte courte, cuite au feu de bois » et « Une carte volontairement courte, du midi au soir » (reformulations du dossier, pas de citation du site).
- Les modifications de `dist/tariki/portfolio/` vues par `git status` ne sont pas de moi.
