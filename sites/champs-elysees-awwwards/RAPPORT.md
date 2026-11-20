# Champs Élysées : variante awwwards
**Concept** : « Le jour sans pause », la page suit les heures d'ouverture (11 h à 22 h) avec horloge fixe, trait des heures et sols qui passent du midi à la nuit. **Stack** : Astro 5 + GSAP + Lenis (sans OGL : aucun besoin de WebGL pour ce concept). Base `/champs-elysees/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/champs-elysees-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/champs-elysees-awwwards/.qa-root --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session d'agent et budget de réponses limité. Aucun score indépendant ni auto-notation n'est donné ; la QA repose sur les mesures ci-dessous. `/jury <url>` donnera un score avec un critique neuf.

## Mesures (passe finale, après corrections)
- Accueil : 0 erreur console, 0 requête échouée, aucun débordement, LCP mobile 1644 ms (img), CLS 0, pas de loader, FPS scroll 60, `idleMotion` true (corrigé), cibles petites 0, `noHoverChange` vide, axe 0 violation (contraste à vérifier : 28 à l'œil non faits).
- Histoire : 0 erreur, axe 0, cibles petites 0, `noHoverChange` vide, `settledMs` 2420, LCP mobile 1076 ms. Carte (capture de l'agent captures) : axe 0, LCP mobile 1020 ms.
- 404 réelle (`404.html`) : axe 0, 0 erreur ; la violation axe du QA-build venait de la réponse brute de serve.mjs (faux positif connu).
- Audit : 0 FAIL, 1 WARN (sitemap : faux positif sous `base`, `sitemap-index.xml` présent). Page la plus lourde 906 Ko, JS 61 Ko gz, polices 74 Ko, aucune image > 500 Ko.
- Réduit : texte caché 0, rien d'animé.

## Corrections de la passe
- Cibles petites (logo d'en-tête 154x20, liens `.tlink` 23 px) : hauteur minimale 2,75 rem pour le logo, `padding-block` sur `.tlink`.
- Logo d'en-tête sans retour au survol : soulignement orange au survol et au focus.
- Histoire : phrase « Source : La DH, 4 août 2024. » répétée deux fois, remplacée par une seule ligne « Portraits d'après La DH, 4 août 2024 ».
- `idleMotion` false (secteur de la trotteuse trop petit pour le seuil du shoot) : secteur de 36 à 70 degrés, `IDLE_AFTER` 1200 à 800 ms.

## Points non résolus
- [a11y] `contrastNeedsReview` (28 accueil, 21 carte) non revu à l'œil.
- [process] Pas de critique jury : scores non établis, passes 1 et 2 de la phase 3 non faites.
- [process] Pages carte, réservation : pas de nouvelle capture après les corrections (CSS commun, mesuré sur accueil, histoire, 404).
- [ship] og.png existant, composition non revérifiée à l'œil.
- [process] Accessoire à retirer non désigné.

## Placeholders et hypothèses (à remplacer par le client)
Aucun contenu fictif (`placeholder: true` : 0). Hypothèses : code postal 5100 (données) contre 5000 (site client) non corrigé ; horaires du site client ; carte du PDF d'octobre à confirmer ; photo 08.

## Décisions de théâtre
Pas de loader, pas de GL (décision de concept). Repos : trotteuse de l'horloge. Accessoire retiré : non fait.

## Leçons structurelles
Voir data/usage/test-2/lecons-proposees/champs-elysees.md.
