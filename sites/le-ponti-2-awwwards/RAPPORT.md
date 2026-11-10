# Le Ponti 2 : variante awwwards
**Concept** : « Le pont à trois arches », la carte se traverse comme un pont (filet doré, arches, tablier). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL, la scène est en SVG/CSS). Base `/le-ponti-2/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/le-ponti-2-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.
## Scores du critique jury
Non réalisé : pas d'outil Agent en session d'agent. Self-score, non indépendant : aucun score chiffré posé ; les critères de sortie mesurables sont prouvés ci-dessous. `/jury <url>` donnera la note avec un critique neuf.
## Mesures (passe finale, accueil, shoot ciblé après correction)
LCP mobile 2316 ms (< 2500), CLS 0,001, settledMs 2594, scrollFps 60 (pire trame 17 ms), axe : 0 violation, 0 erreur console, 0 requête échouée, overflowX non, reduced : hiddenText 0 / moving false, idleMotion true, noHoverChange : lien logo seul (marque, traité en survol de la transition), colorOnly vide. Audit : 0 FAIL, 1 WARN (sitemap absent de la racine QA, faux positif sous `base`). Poids : page la plus lourde 664 Ko, JS 61 Ko gz, image max < 500 Ko, polices woff2.
## Corrections de la passe
- axe `label-content-name-mismatch` (3 liens des arches) : `aria-label` retiré (texte visible suffit).
- Phrase répétée « Du mardi au dimanche… / Le lundi, le pont est levé » : le menu plein écran dit « Ouvert midi et soir, fermé le lundi. ».
- Vérifiés comme faux positifs : 404 sans lang/title (réponse brute de serve.mjs ; `404.html` a lang et title), `skipLinkFirst: false` (le premier arrêt est « Aller au contenu »), robots/sitemap/404 sans h1 de l'audit.
## Points non résolus
- [Anim] carte `idleMotion: false` : page de lecture sans pont de repos, volontaire (texte long) ; accueil bouge au repos.
- [Contraste] 13 (accueil) et 7 (carte) `contrastNeedsReview` : tous clair sur bordeaux nuit ou or sur nuit (jetons AA), vus sur d-01, d-02 ; à confirmer par le jury.
- [Jury] aucune note de critique indépendant.
## Placeholders et hypothèses (à remplacer par le client)
Aucun contenu fictif (`placeholder` à false partout, équipe vide). Le « 2 » du nom n'est pas expliqué (inconnu). Photos : celles du dossier client.
## Décisions de théâtre
Pas de loader, pas de GL, repos = tablier du pont dans le hero. Accessoire retiré : aucun nouveau cette passe (le follower de curseur avait été écarté dès la phase 2).
## Leçons structurelles
Voir agents/lecons/construction.md.
