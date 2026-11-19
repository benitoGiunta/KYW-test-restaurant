# REVISION-1 · yayami-portfolio

Révision ciblée (F0, F1, F2 de REVUE-1.md). Rebuild final via scripts/q.sh : 7 pages, OK.

- F0 : aucun point.
- F1-1 corrigé : « au centre de Namur » et « de quartier » retirés (`site.ts`) ; grep dans `dist` : 0 occurrence (accueil, maison).
- F2-1 corrigé : méta de l'accueil « Ouvert 7 jours sur 7, de 12h à 14h et de 18h à 22h. » (vérifiée dans dist).
- F2-2 corrigé : pied du site en `<section aria-label>` ; un seul `<footer>` (celui du paquet KYW) par page.
- F2-3 corrigé : `Coins.astro` enveloppé dans `<nav aria-label="Contact rapide">`.
- F2-4 corrigé : accueil, tableau d'horaires du bloc « Venir » et phrase de livraison supprimés, seconde bande de livraison remplacée par une phrase sans prix ; `/commander/` : liste « À savoir » sans la règle livraison (`slice(2)`).
- F2-5 corrigé : loader MIN 0,6 s, MAX 0,9 s, sortie 0,65 s ; `is-loaded` à 2,0 s après `load` (mesure ponctuelle desktop, 0 erreur console ; avant 2,7 s). Non remesuré sous CPU x4 + 4G.
- F2-6 corrigé (non capturé) : mobile, scène collante `min-height: 62svh` (stage) et 220svh (origine) au lieu de 100svh / 300svh. Vérification visuelle à faire.
- F2-7 corrigé : `/maison/` perd la scène d'origine répétée de l'accueil et gagne « Prix de départ » (nigiri 4,50 €, maki dès 5,50 €, temaki 6 €, udon dès 15,80 €, prix lus dans carte.json). Capture 1440 vérifiée.
- F2-8 corrigé : `.tube--l` plein (sans contour) en mode lampe ; touche aussi les titres de catégories de `/carte/`.

Bonus : apostrophes ’ (site.ts, 404, livraison) ; « limonade japonaise à bille » devient « limonade japonaise » (F3-4).
Non traité : F3-1, F3-2, F3-5, F3-6, hors périmètre. Hypothèse : « Yayami Sushi » (titre de la scène) n'a plus de page dédiée sur `/maison/`.
