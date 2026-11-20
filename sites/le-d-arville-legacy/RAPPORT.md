# Le D’Arville · variante legacy · 2026-11-20

## 1. Approche conservée vs site d'origine
| Élément | Origine (Divi) | Legacy |
|---|---|---|
| Type | multi-pages, 8 routes | idem, 8 routes + 404 |
| Hero | slider | poster photo plein cadre, plaque de papier (dérogation : un seul visuel, gate 6b) |
| Nav | menu Divi | barre fixe 72 px, popover sous 60 rem, barre Réserver/Appeler en bas |
| Carte | pages et PDF | carte en lignes filetées, PDF des vins conservé |
| Animations | slider, widget Zenchef | un seul reveal calme, passe-partout signature |
Réservation : lien Zenchef conservé.

## 2. Axes traités (AUDIT.md)
Voir AUDIT.md : tous les axes faits (nav mobile, focus, contraste, hiérarchie, poids images). Non traité : hébergement des polices.

## 3. Résultat sloplint
- Before : 283 FAIL, 102 REFLEX. After : 1 FAIL (34, faux positif : clip sur html et body présent), 0 REFLEX ouvert, 32 WAIVED (8, 44c, 59, 77, 79, 83 en tête de page.css), render tier tourné sur 9 URL.
- Kept : « nothing recorded », WARN site-actuel non rendu. Dropped/Reworded : lignes en tête de page.css. Build : 9 pages, noindex, `kyw-signature` sur chaque route.
- Corrections QA : og:image et twitter:card ajoutés ; marge basse des titres de sous-pages 64 à 40 px (bande morte 185 à 161 px). Faux positifs de l'agent captures : contraste 404 (404 du serveur statique), focus invisible (défilement doux, anneau 2 px vérifié), cible 128x20 (liens mesurés 44 px).
- Menu popover : recouvre la barre du bas à 360x480 (couche supérieure, défilable), acceptable.

## 4. Reviews
Hero review `self` en phase 2 ; finish review sous-agent non disponible (pas d'outil), faite à la main : captures 1440 (chambres) et focus (carte). Ancien site faisait mieux : widget de réservation intégré (remplacé par lien). Jury non lancé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Heures d'ouverture | horaires (`.fill`) | slots texte | horaires réels du restaurant |
| Avis repris | page d'accueil | mot pour mot, avec attribution | à vérifier avec le client |
Reste : TTF des polices distantes, pas de robots.txt (noindex voulu).

## 6. Demande de matériel
Photo qui manque le plus : portrait du chef en lumière naturelle (slot signature, 1600x2400) ; sinon photos de la carte de saison par plat.

## 7. Leçons structurelles
Dans data/usage/test-1/lecons-proposees/le-d-arville.md.
