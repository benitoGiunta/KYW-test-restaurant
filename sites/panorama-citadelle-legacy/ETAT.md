# ETAT · panorama-citadelle-legacy · phase 1 sur 3

## Fait
Audit, deal (re-deal 1), draw, scaffold Solstice, stamp, DESIGN.md, AUDIT.md, comp.md ; données (src/data/site.ts, carte.ts transcrite de donnees.json : 11 rubriques, 44 plats) ; photos WebP 800/1600 (10 sur 20) ; 4 pages plus 404, Nav, Footer, Fig, Horaires ; KywFooter et noindex vérifiés sur les 5 routes ; build OK (`scripts/q.sh build pnpm build:site sites/panorama-citadelle-legacy`) ; sloplint rendu : 1 FAIL (34, faux positif connu), REFLEX 44c/59/79 waived.

## Reste (phases 2 et 3)
Comps c1/c2 ; nav (menu mobile), états des contrôles, jour courant du Schedule, un reveal éventuel, sticky booking bar ; QA navigateur 375/768/1440, jury ; RAPPORT.md ; entrée finale du journal ; sloplint sur chaque route ; photos 18/19 (chef, cuisinier) non utilisées : identité non confirmée.

## Décisions et hypothèses
- Horaires : 8 h 00 à 23 h 00 tous les jours, petits-déjeuners 8 h 00 à 10 h 30, brasserie dès 11 h 00 ; signalés « à confirmer ».
- Réservation : lien vers la page de réservation du site actuel (Zenchef non intégré) ; formulaire sans envoi.
- Aucun avis, note ni témoignage ; « Prix du jour » repris tel quel pour le bar de ligne. Aucun dessert (absent du dossier).
- Serveur de contrôle sur le port 4731 (PID dans .logs/legacy-pano-serve.pid), à arrêter.
