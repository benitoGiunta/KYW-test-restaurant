# Novobel · variante legacy · 2026-11-27

## 1. Approche conservée vs site d'origine
| | Origine (Wix) | Legacy |
|---|---|---|
| Type | multipage Wix, 5 routes | idem : /, /services, /projects, /jobs, /blog |
| Hero | photo + titre | Poster : carte de papier sur photo des combles |
| Nav | barre Wix | slab papier, popover sous 60 rem, Devis en ghost |
| Animations | quasi statique | un reveal et un filet qui se trace, calme |
Dérogations : filtre Wix de /jobs et chat Wix abandonnés (dropped, remplacés par mailto et tel) ; gabarit hero + cartes recomposé (waive 8).

## 2. Axes traités
AUDIT.md : routes, wiring (tel, mailto, Facebook), textes des services et projets gardés ; système visuel Atelier neuf.

## 3. Résultat sloplint
Final (src + 2 URL, render tourné) : 0 FAIL, 0 REFLEX, NOTE 58 sur chapeaux de pages internes (acceptées). `--kept` : pas de before.json valide dans ce dossier (FAIL « no before record » de l'outil, non résoluble en phase 3). Build : OK, 6 pages, noindex et pied KYW partout.
Corrections QA : aria-label du logo aligné sur le texte visible (axe label-content-name-mismatch) ; pied de coordonnées passé de `<footer>` à `<section>` (double contentinfo) ; bordure des champs en `--color-pencil` (3:1) ; orphelin des faits du pied ; section « Qui sommes-nous ? » dotée d'une photo ; hero de /services avec photo et hauteur d'écran ; débordement mobile du dropcap.
axe final : 0 violation sur /, /services/, /404.html, /projects/, /jobs/, /blog/. Le contraste de la 404 signalé par captures n'a pas été reproduit.

## 4. Reviews
Hero review et finish review en auto-notation `self` (pas d'outil Agent). Ancien site meilleur sur : rien de mesuré. Jury non lancé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires d'accueil | pied (.fill) | « À compléter avec le client » | horaires réels |
| Articles | /blog (.fill) | « Articles à fournir » | articles du client |
| Photos | tout le site | stock du site d'origine | photos de chantiers Novobel |
| « Devis gratuit sous 24 h » | accueil | délai supposé | à confirmer |
| Champs du formulaire | devis | choisis par l'agent, aucun envoi | à valider, endpoint à brancher |
Audit : canonical, og:image, twitter:card, robots.txt absents (WARN, maquette noindex) ; police TTF livrée (woff2 à convertir).

## 6. Demande de matériel
Photo prioritaire : l'équipe Novobel sur un chantier namurois (hero, 1800x1200). Puis un avant/après de rénovation (projets) et le logo vectoriel.

## 7. Leçons structurelles
Une photo avec `aspect-ratio` + `min-height` force la largeur et fait déborder une grille mobile : fixer `height`. Proposée dans data/usage/test-3/lecons-proposees/novobel.md.
