# RAPPORT : La Bergerie de Lives, variante awwwards (phase 3, QA)

Self-score, non indépendant : aucun critique neuf (outil Agent absent) ; aucune carte jury produite. La QA repose sur les mesures de `report.json` et `audit.txt`.

## Corrections de la passe
1. Cibles tactiles : « Parcourir le domaine » (168x23) et le lien « bergerielives.be » (85x16) corrigés (`.lien`, `.pied a` : `inline-block` + `padding-block`). `smallTargets` desktop et mobile vides.
2. LCP mobile de l'accueil 2664 ms : image du hero préchargée (`<link rel="preload" as="image">` avec `imagesrcset`) et variantes 640/960/1280 au lieu de 640 à 2000 (la 2000 pesait 563 Ko). Mesure finale : 2460 ms (< 2500), élément `img`.
3. Survol : le nom de l'en-tête ne changeait pas ; trait d'accent qui se dessine (hover, focus, active). 
4. Piscine : variante 2000 remplacée par 1800.

## Mesures (accueil, voir `.shots/home/report.json`)
0 erreur console, 0 requête en échec, 0 violation axe, pas de débordement horizontal, réduit : 0 texte caché, rien ne bouge, `idleMotion` true, FPS 60/60, CLS 0,016, aucun loader, clavier sans focus invisible ni blocage.
Faux positifs non corrigés : `skipLinkFirst: false` (lien d'évitement présent, voir `keyboard.stops`), WARN robots/sitemap de la racine de QA.
404 : le contraste 4,36:1 et la cible « la page d'accueil » du QA-build venaient de la réponse brute de `serve.mjs` ; `404.html` réel (`.shots/404`) : 0 violation, 0 cible petite.

## Écarts connus
- Poids : `dist/.../_astro/` contient les JPEG sources Astro (jusqu'à 594 Ko) non référencés par le HTML ; aucune image servie > 500 Ko. À purger si le stockage Vercel presse.
- `mobile.settledMs` 5389 (accueil, mobile bridé CPU 4x) : élevé, sans effet sur le contenu visible.
- Pages intérieures (histoire, réservation) : non re-shootées ici (pas de modification de leur structure) ; seules les corrections CSS communes s'y appliquent.
- Deux passes de critique indépendant non faites (Agent indisponible) : scores jury non établis.

## Placeholders
Aucun `placeholder: true` dans `src/data/site.ts` ; aucun contenu fictif ajouté. Données douteuses de la phase 1 : voir DESIGN.md. Seul prix réel affiché : journée piscine 20 EUR par personne.
