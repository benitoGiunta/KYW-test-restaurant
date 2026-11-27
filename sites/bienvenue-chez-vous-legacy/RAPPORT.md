# Bienvenue chez vous · variante legacy · 2026-11-27

## 1. Approche conservée vs site d'origine
| | Origine (Wix) | Legacy |
|---|---|---|
| Type | multi-pages, 6 routes | idem (/, presentation, resto, boutique, traiteur, contact) |
| Hero | photo du dessert smiley plein cadre | idem, plaque papier basse, mobile : photo au-dessus |
| Nav | barre Wix | dalle d'encre, six liens, « Réserver » cerclé, menu Popover sous 60rem |
| Carte | formules en texte | switcher midi/soir, prix réels |
| Animations | aucune notable | entrée de plaque CSS, posture calme |
Dérogation : forme nav edge-aligned écartée (3 derniers logs, gate 8/32).

## 2. Axes traités
Axes d'AUDIT.md traités en phases 1 et 2 (typographie, couleur, nav, boutons, mobile, a11y) ; preuves dans DESIGN.md. Non traité : poids des polices (WARN audit, ttf/otf à convertir en woff2).

## 3. Résultat sloplint
- Before : 97 FAIL, 22 REFLEX. After : 1 FAIL (34, faux positif : overflow-x: clip présent sur html et body), 0 REFLEX ouvert.
- Corrigés en phase 3 : 39b (bouton 56 à 52 px), 49b (e-mail à 320 px : libellé réduit à l'adresse, nowrap, taille fluide). Vérifié par mesure à 320 et 1440 : une ligne, aucun débordement, bouton 52 px.
- WAIVED : 8, 77 (citation, presse, événements), 81 (slot boutique). 6 waivers REJECTED sur « reason shares no word » dans le rendu de pages secondaires, sans REFLEX ouvert.
- Kept : « nothing recorded » (sloplint ne compare pas site-actuel/index.html). Dropped : pages copie-de-*, Presse vide, liens J'aime, © 2013. Build : OK, 7 routes avec noindex et kyw-signature, aucun tiret cadratin.
- Axe : 1 violation color-contrast sur la 404 brute servie par serve.mjs (faux positif connu, pied KYW du paquet, non modifié).

## 4. Reviews
Hero review et finish review en auto-notation (self, pas d'outil Agent). Ce que l'ancien site faisait mieux : rien de net ; il avait des pages « copie » vides, abandonnées.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Photo boutique | boutique, slot `.fill` | vide | photo de la vitrine ou des produits |
| Téléphone | accueil, contact | +32 477 29 96 83, relevé chez des tiers | numéro confirmé |
| Horaires, e-mail | contact | relevés chez des tiers | à confirmer |

## 6. Demande de matériel
Slot boutique 728x546 : produits de bouche en rayon. Photo qui améliorerait le plus la page : la boutique, aujourd'hui vide.

## 7. Leçons structurelles
Waiver sloplint : trois champs (gate, preuve du garde, raison avec un mot de la page) ; une raison par gate, pas de regroupement.
