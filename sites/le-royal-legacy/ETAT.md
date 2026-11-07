# ETAT le-royal · legacy · phase 2 (construction-2) terminée

## Fait (phases 1 et 2)
- Phase 1 : audit, design, comp c1 (Stage), contenu complet, page `/` et `/404`, photos du client.
- Phase 2 : nav slab à une ligne (72 px, 64 px au téléphone) avec « Réserver » toujours visible ; menu téléphone en `<dialog>` (bouton Menu, Échap, clic sur le fond, lien = fermeture, premier focus sur le premier lien, repli sans script : liens en ligne) ; lien actif (`aria-current`) par IntersectionObserver ; skip link ; un seul reveal (`data-reveal` posé par le script sur les blocs sous le premier écran, rien en reduced motion ni sans script) ; états des contrôles (hover seulement `hover: hover`, `:active`, `:disabled`, focus-visible or sur fond brun) ; `(pointer: coarse)` 44 px pour les liens ; `viewport-fit=cover` + safe-area dans le menu.
- Hero review : `sloplint --render --stage hero` : 0 FAIL, 0 WARN, 1 NOTE (58 : 117 mots sur un écran à y=1300, la carte, dense par nature, déjà notée). Pas de sous-agent possible : auto-notation `self`, `ship`, 0 finding. Comp : trois questions répondues dans `comp.md`.
- Tests Playwright (375, 820, 1280, reduced motion, sans JS) : aucun débordement horizontal, 0 erreur de page, menu ouvert/fermé OK, panneaux de la carte visibles sans script, 0 `data-reveal` en reduced motion et sans script.
- Build OK (`dist/le-royal/legacy/`), noindex et KywFooter sur `/` et `/404`, 0 tiret cadratin, 0 `transition: all`. `DESIGN.md` § Sur-utilisation : points 2, 6, 7, 8, 17, 19 à 24, 29, 30, 48, 49, 56, 58, 63, 72 cochés.

## Reste (phase 3)
- Agent « captures » : shoot complet (le reveal ne se déclenche qu'au défilement : défiler avant une capture pleine page ; `dist` statique ne change rien).
- `sloplint` render complet, entrée du journal `.hallmark/log.json` (`theme.mjs log`), `RAPPORT.md`, revue.
- Photos non placées : `02-moules`, `03-cocktails`, `01-bieres`, `05-plats`, `06-vins` (moules et cocktails déjà convertis, pas de rangée de vignettes ajoutée : sobriété). Une rangée sous « À propos » reste possible.
- Pas de barre de réservation collante au téléphone : le bouton Réserver est déjà dans la nav collante (décision, pas un oubli). Pas de formulaire : la réservation est le lien Zenchef de l'original.
- Vérifier la carte à 375 en capture (nom et prix visibles) ; mesurer le lien actif sur les ancres `#reservation` et `#contact` (deux colonnes côte à côte dans la même section, la dernière entrée gagne).

## Décisions et hypothèses
- Signature : la façade, posée, sans animation (caractère still) ; le seul mouvement est le reveal et le fondu du menu.
- Hero review `self` faute de sous-agent ; comp : façade pleine hauteur gardée contre le comp (image flottante).
- Heures, adresse, ardoise des moules : inchangés (voir phase 1 : divergences 11 h à 23 h du PDF, n° 2 ou 13, à confirmer).

## Pièges
- Dans un composant Astro, un `<script is:inline>` placé avant `<main>` s'exécute avant que les ancres existent : suivre les sections après `DOMContentLoaded`.
- `[hidden] { display: none !important }` (base.css) : un bouton révélé par script doit retirer l'attribut `hidden`, pas seulement changer `display`.
- sloplint 48 refuse un `oklch(...)` hors tokens (même en `::backdrop`) : `color-mix(in oklab, var(--color-ink) 60%, transparent)`.
- `page.html` du site d'origine gitignoré ; serveur de dev (port 4321) arrêté par `kill` du PID noté.
