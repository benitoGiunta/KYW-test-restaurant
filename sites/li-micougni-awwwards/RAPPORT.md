# Li Micougni : variante awwwards
**Concept** : « Les demi-fous », chaque titre est coupé en deux moitiés décalées qui se recollent à la lecture. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun GL : le concept est typographique). Base `/li-micougni/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/li-micougni-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session d'agent, et pas de passe jury indépendante dans cette phase. Aucun score affirmé ; `/jury` avec un critique neuf reste à lancer.

## Mesures (QA phase 3, captures de l'agent captures + histoire re-shootée après correction)
- Audit : 0 FAIL, 2 WARN (sitemap et robots.txt de la racine de QA, faux positifs sous base : sitemap-index.xml présent, meta noindex partout).
- Histoire : 0 erreur console, 0 requête échouée, axe 0 violation, reduced hiddenText 0 et moving false, clavier sans focus invisible ni blocage, idleMotion true, settledMs 2585, LCP mobile 1044 ms, CLS 0, pas de loader.
- Accueil (agent captures) : LCP mobile 2416 ms, CLS 0, FPS 60, 0 débordement, 0 cible minuscule. Poids : JS 60 Ko gz, page la plus lourde 1089 Ko.

## Corrections de la phase 3
- 4 FAIL d'audit « titre dupliqué » : la moitié basse de `Demi` était du texte (`<span>{m}</span>`) ; elle est désormais générée par `::before { content: attr(data-t) }`.
- Axe `label-content-name-mismatch` sur la marque de l'en-tête : disparu avec la même correction.
- Titre de l'accueil de 73 à moins de 70 caractères.
- `og.png` recomposée depuis le hero réel (nom, accroche, photo du grill).
- Axe sur la 404 de `serve.mjs` (title, lang) : réponse brute du serveur, faux positif connu ; `404.html` a lang et title.

## Points non résolus
- [Creativity] premier frame du hero (moitiés basses décalées de 0,39 em) non jugé par un critique indépendant ; si illisible, baisser `OUVERTURE` (`recoller.ts`) et `html.motion h1` (`site.css`).
- [Contenu] `contrastNeedsReview` (40 à 52 par page) non relus un à un.
- Pages carte, réservation et 404 : captures de l'agent captures seulement, non re-shootées après correction (audit à 0 FAIL).

## Placeholders et hypothèses (à remplacer par le client)
- Aucun contenu fictif. Données douteuses non corrigées : adresse (Rue des Brasseurs 110 contre Rue des Framboises 11), horaires contradictoires (affichés « à confirmer »), téléphone issu d'un annuaire, avis et prix du menu de la semaine absents.

## Décisions de théâtre
Ni loader, ni GL, ni curseur suiveur (concept typographique, repos par souffle des titres). Accessoire retiré : non fait, faute de passe jury.

## Leçons structurelles
- Un texte de décor dupliqué dans un titre déclenche le FAIL « heading duplicated » et axe `label-content-name-mismatch` : générer la copie par `::before { content: attr(data-t) }`.
