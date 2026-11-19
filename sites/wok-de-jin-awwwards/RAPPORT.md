# Wok de Jin : variante awwwards
**Concept** : « La semaine à volonté », une grille de la semaine qui se sert jour après jour, tarif du service en cours distribué partout. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL : le concept est typographique et photographique). Base `/wok-de-jin/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/wok-de-jin-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session, et le budget de réponses de cette passe était consacré à la QA par preuves. Aucun score affirmé (ni indépendant ni auto-notation). `/jury $U` re-note le site avec un critique neuf.

## Mesures (QA, preuves de l'agent captures + captures ciblées)
- Accueil / carte / a-propos / réservation : 0 erreur console, 0 requête échouée, aucun débordement horizontal, 0 violation axe (sérieuses 0), reduced : 0 texte caché, 0 mouvement ; focus : 0 sans indicateur ; `smallTargets` vide.
- LCP mobile bridé : accueil 1376 ms, carte 976, a-propos 1000, réservation 988 ; CLS 0 ; FPS 60 ; poids max 985 Ko (JS 62 Ko gz, polices 54 Ko, images 858 Ko).
- `idleMotion` vrai sur l'accueil (bande de vapeur).
- Audit final : 0 FAIL, 1 WARN (« no sitemap » sous racine QA : `sitemap-index.xml` présent dans `dist/`, faux positif connu). « no robots.txt » résolu par la racine de QA ; meta robots présent sur toutes les pages.

## Corrigé
- Réservation, `colorOnly` sur le téléphone (`.contact-gros`) : ajout d'un décalage de 8 px au survol en plus du soulignement. Vérifié par mesure Playwright (dx = 8, soulignement).

## Faux positifs écartés (page 404 de l'agent captures)
- Contraste de `.kyw-footer__note` (4,36), cible « la page d'accueil » 128x20, pied sans survol : mesurés sur la 404 brute de `serve.mjs`, pas sur `404.html` du site (qui n'a pas ce lien). Les pages réelles ne sortent aucune violation de contraste.

## Points non résolus
- [Content] `colorOnly` accueil (h-01, h-03, h-04, h-06) et carte (3) : non relus image par image dans cette passe, liens secondaires ; à relire à l'œil.
- [Creativity] pas de critique jury ; carte non établie.
- [Ship] image OG toujours provisoire (non recomposée), `pnpm index` et commit final `[publier]` laissés au superviseur.
- Pages a-propos et réservation : repos non animé (acceptable, la signature est sur l'accueil).

## Placeholders et hypothèses (à remplacer par le client)
- Correspondance jour/tarif déduite des trois onglets du site client (lundi, mercredi, jeudi, vendredi : 16,80 midi / 23,80 soir ; week-end 27,80), marquée `hypothese: true` et signalée sur la page. À confirmer.
- Téléphone : 081 30 68 88 (site client), pas le mobile de restaurants.json.
- Réservation générale : lien vers wokdejin.com. Aucun avis, e-mail, réseau ou histoire inventé.

## Décisions de théâtre
Pas de loader (premier écran immédiat), pas de GL, repos = bande de vapeur hachurée. Accessoire retiré : non fait dans cette passe (aucun critique pour désigner le plus faible).

## Leçons structurelles
Voir data/usage/test-1/lecons-proposees/wok-de-jin.md.
