# Le Servais : variante awwwards
**Concept** : « La Ligne », une journée de 9 h à 1 h racontée comme un trajet de téléphérique sur un câble, avec une cabine collante qui allume les stations. **Stack** : Astro 5 + GSAP + Lenis (pas d'OGL : aucune photo par plat, pas de GL utile). Base `/le-servais/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/le-servais-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/le-servais-awwwards/.qa-root --port 4400`.

## Scores du critique jury
Self-score, non indépendant : l'outil Agent n'est pas disponible dans cette session, aucun critique neuf n'a lu les captures. Aucun score chiffré n'est donc annoncé ; `/jury http://127.0.0.1:4400/le-servais/awwwards/` doit re-noter le site avec un critique neuf.

## Mesures (passe finale, captures de l'agent « captures » + vérifications ciblées)
- Audit : 0 FAIL, 1 WARN (« no sitemap » : racine de QA temporaire, le sitemap-index existe dans `dist/le-servais/awwwards/` et est lié).
- Console 0 erreur, 0 requête en échec, 0 débordement horizontal (accueil, carte), CLS 0 / 0,004, LCP mobile 1100 ms (h1) et 1036 ms (carte), 60 fps bureau et mobile, 0 cible tactile trop petite, 0 focus invisible, WebGL non utilisé.
- Axe : 0 violation sur accueil et carte ; contraste « à revoir » 17 et 226 nœuds (texte muted et noms de plats sur béton, 7,1:1 calculé), non reproduit comme violation.
- Poids : page la plus lourde ~1084 Ko, JS 60 Ko gz, CSS 6 Ko gz, polices 68 Ko (woff2), images 945 Ko, aucune image > 500 Ko.
- Re-capture accueil après corrections : console 0, échecs 0, débordement non, `noHoverChange` vide, réduit 0 texte caché et aucun mouvement, `settledMs` 2619, LCP mobile 1116 ms, CLS 0, 60 fps.
- Corrections de la passe : `og.png` composée (1200x630, hero réel) ; lien du téléphone du pied de page maintenant souligné au survol (`hover.noHoverChange` ne remontait que lui) ; notes de carte répétées reformulées (« Extrait de la carte du bar » x3, « De 11 h 30 à 22 h… » x2).

## Points non résolus
- [keyboard] `skipLinkFirst` = false : faux négatif de `shoot.mjs` (regex /skip|#main|#content/ sur le libellé français) ; le lien « Aller au contenu » est bien le premier arrêt clavier.
- [idle] `idleMotion` = false : le repos est un pendule de 1,6 degré de la cabine, sous le seuil de différence de pixels ; l'immobilité visible au repos est assumée (Concept sobre, pas de loader ni de GL).
- [jury] pas de critique indépendant : à lancer avec `/jury`.
- [audit] la page 404 sondée par le crawl est la 404 brute du serveur de QA (sans h1, sans lang) ; la vraie `404.astro` a lang, title et h1 « Terminus ».
- [seo] `robots.txt` et `sitemap` absents de la racine de QA seulement ; meta noindex présent sur toutes les pages.
- [accessoire] pas de passe « retirer un accessoire » avec critique ; candidat : l'étiquette de station « 9 h » du menu (décorative, `aria-hidden`).

## Placeholders et hypothèses (à remplacer par le client)
- Photo 05 (véranda) « illustrative, origine à confirmer ».
- Margarita « à confirmer ».
- Téléphone 081 73 65 52 repris du dossier.
- Étiquettes du menu mobile (Départ, 9 h, Mai 2025, À quai) : décoratives, déduites du dossier.
- Notes de carte reformulées par la QA (« Au bar », « Servi toute la journée », « Mêmes heures de service que les plats ») : à valider.

## Décisions de théâtre
Pas de loader, pas de GL, pas de follower curseur ; repos : `idle.ts` (pendule de la cabine). Accessoire retiré : aucun (voir points non résolus).

## Leçons structurelles
Voir `agents/lecons/construction.md` (entrée du jour, phase 3).
