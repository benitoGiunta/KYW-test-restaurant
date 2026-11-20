# PhilFa · variante legacy · 2026-11-20

## 1. Approche conservée vs site d'origine
| Élément | Origine | Legacy |
|---|---|---|
| Type | one-page brasserie, Namur | one-page conservée (thème Hedgerow, forme Catalogue) |
| Hero | texte et réservation | Counter : prix du menu du moment (35 € / 41 €), réserver, voir la carte |
| Nav | liens d'ancres | bandeau + barre ; Popover natif sous 60 rem |
| Carte | menu du moment et carte | onglets (clavier complet, sans script les deux panneaux visibles) |
| Animations | aucune | aucune (Hedgerow : pas de reveal) |
Dérogations : aucune. Liens externes (Barestho, Facebook, Instagram, philfa.be, PDF, tel:) conservés.

## 2. Axes traités
Voir AUDIT.md : tous les axes faits en phases 1 et 2. QA phase 3 : favicon inline (supprime le 404 console de l'accueil), twitter:card, cibles de liens en ligne portées à 24 px (8 sous le seuil sur l'accueil avant, 0 mesuré après).

## 3. Résultat sloplint
Before : 66 FAIL, 53 REFLEX. After : 1 FAIL (34, faux positif : `overflow-x: clip` est posé dans base.css, pas dans Base.astro), 0 REFLEX, 0 Finish ouvert, 2 WARN kept (page d'origine non rendue : non comparable), 1 NOTE 58 (95 mots à 1440). Render : tourné, 5 captures dans .hallmark/shots. Axe accueil : 0 violation. Build : vert, dist/philfa/legacy/ régénéré.
Restes connus : 404 avec contraste 4,36:1 sur `.kyw-footer__note` (composant packages/kyw-footer, non modifié) ; 1 erreur console résiduelle probablement polices Google hors réseau ; pas de robots.txt/sitemap (faux positif sous base) ; polices en ttf (Google Fonts), 376 Ko.

## 4. Reviews
Hero : auto-évaluation (pas d'outil Agent). Finish review : auto-notation `self`, non faite par sous-agent. Ce que l'ancien site faisait mieux : n'avait pas de photos de plats non plus ; rien de perdu relevé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Photos de plats | carte | absentes (photos client de salle uniquement) | photos des plats du menu |
| Avis | aucun repris | aucun | à valider avec le client |
Slots `.fill` : aucun. Aucune donnée inventée.

## 6. Demande de matériel
Photo la plus utile : un plat signature du menu du moment, 1600x1000 minimum, lumière naturelle ; puis une photo de la terrasse en service.

## 7. Leçons structurelles
Voir data/usage/test-2/lecons-proposees/philfa.md.
