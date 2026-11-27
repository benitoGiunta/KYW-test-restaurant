# ETAT · bergerie-lives · variante legacy · fin de phase 2 (construction-2)

## Fait (phase 2)
- Nav : masthead sticky 72 px, menu Popover sous 60 rem (bouton Menu/Fermer, Échap, fermeture au clic sur un lien, Réserver pleine largeur en pied de menu), repli sans Popover. Skip link conservé.
- Script `src/scripts/site.ts` (chargé par Base.astro) : menu, un seul reveal posé par le script (rien de caché sans JS ni sous reduced motion), rail galerie (Précédent/Suivant), validation du formulaire.
- Formulaire Réservations : états, messages, aide 1lh, aucun faux envoi (message « Rien n’a été envoyé : ce formulaire n’est pas encore relié. »).
- Boutons : hover sous `(hover: hover)`, active, disabled ; hover retiré des lignes d'index sans lien ; hero en svh ; panneau hero 27 rem (moutons entiers à 1280).
- Mesures Playwright : aucun débordement horizontal à 320/375/768/1024/1440 sur les 3 pages ; menu OK au toucher et au clavier ; ancres non masquées par le sticky.
- sloplint hero (render) : 0 FAIL réel, 0 REFLEX ; reste NOTE 58 (115 mots sur l'écran des services) et FAIL 34 sur Base.astro (faux positif connu, la règle est aussi posée en `<style is:global>`).
- Hero review : sous-agent indisponible, auto-notation `self` : ship, 1 finding (moutons masqués à 1280) résolu. DESIGN.md, comp.md (trois questions) à jour. Build passe, noindex, pied KYW et mention sur les 4 pages.

## Reste (phase 3 + captures)
- Agent captures : shoot desktop/375 des 3 pages et QA.
- Phase 3 : sloplint --render complet sur dist, jury des gates judgées, RAPPORT.md, ligne Sweep du Picks, case 8, `pnpm index`.
- À vérifier : le menu à 375 sous le panneau du hero (OK en capture), rail au clavier, `h2` ancre services à 144 px du haut (padding de section + scroll-padding, un peu généreux).

## Pièges
- `.btn` (display inline-flex) bat une règle `.masthead__cta--menu` de même spécificité : préfixer `.masthead`.
- Un `[popover]` reset en `display: block` pour le bureau reste visible fermé sur mobile : ajouter `:not(:popover-open) { display: none }`.
- Slot `.fill` horaires d'accueil toujours à renseigner (un par page).

## Phase 3 (QA, 2026-11-27)
- Corrigé : favicon (404 console), titre accueil raccourci, og:image + twitter:card, cible tactile du nom du masthead. Vérifié par mesure ciblée à 375 px : 0 erreur, 0 petite cible, pas de débordement. Build passe, noindex et pied KYW sur 4 pages.
- Non fait (hors QA) : sloplint --render complet, finish review, log Hallmark, checklist 72 cases. RAPPORT.md écrit.
