# L’Huile sur le Feu : variante awwwards
**Concept** : « à chaque plat son huile » : un filet d’huile fixe dans la marge s’allonge avec la lecture et prend la couleur de l’huile du plat en vue. **Stack** : Astro 5 + GSAP + Lenis (pas d’OGL : le filet et la goutte sont en CSS/DOM, un canvas n’apporterait rien). Base `/huile-sur-le-feu/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/huile-sur-le-feu-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : aucun outil Agent/Task dans cette passe, donc pas de critique neuf ni de carte. Score non fourni (ni auto-notation) ; à faire par le superviseur.

## Mesures (passe finale, accueil, ciblée après corrections)
LCP mobile 2308 ms, CLS 0, loaderMs null (pas de loader), settledMs 2543, FPS desktop 60, axe sérieux 0, overflow non, noHoverChange vide, colorOnly vide, erreurs console 0, requêtes en échec 0, cibles < 24 px : 0 (2 corrigées), reduced : 0 texte masqué. Audit : 0 FAIL, 1 WARN (sitemap, voir plus bas). Poids : JS 61 Ko gz, page ~1 Mo, fonts woff2 132 Ko.
Carte et 404 : mesures de QA-build (0 erreur, 0 échec) ; la carte partage les corrections CSS, non recapturée.

## Corrigé dans cette passe
- Cibles tactiles mobile : `.lien` (Ouvrir le plan, Réserver en ligne) étendu en hauteur.
- Phrases répétées : crédit photo des légendes retiré (le colophon du pied le porte), adresse de l’histoire reformulée.
- Goutte au repos trop petite pour être mesurée : amplitude du gonflement ×4 (prouvé par mesure DOM, largeur 17 à 29 px en 6 s).

## Points non résolus
- [Clavier] `keyboard.skipLinkFirst` = false : faux négatif de l’outil (regex anglaise `skip|#main|#content` sur le texte « Aller au contenu ») ; le lien d’évitement est bien le premier arrêt de tabulation.
- [Anim] `desktop.idleMotion` = false : la goutte (≈ 25 px) reste sous le seuil de différence de pixels (0,05 %) ; le mouvement existe (mesure DOM). Le relancer sur toutes les pages n’a pas été fait.
- [404] violations axe `document-title` et `html-has-lang` : ce sont celles du 404 du serveur statique ; la 404 du site a `lang="fr"`, un `<title>` et un h1.
- [SEO] WARN « no sitemap » / « no robots.txt » : le build produit `sitemap-index.xml` sous la base, l’audit cherche à la racine ; robots.txt du dépôt, meta noindex partout.
- [Contraste] 7 (accueil) et 4 (carte) « à vérifier » axe non revus à l’œil ; `<em>` ail/truffe sur papier à revoir.
- [Score] pas de critique jury (voir plus haut). OG `public/og.png` toujours provisoire, apple-touch à reprendre.
- Accessoire retiré : non fait.

## Placeholders et hypothèses (à remplacer par le client)
Aucun placeholder détecté. Hypothèses : 2005 « selon le site » ; formulaire en `mailto:info@lhuilesurlefeu.be` ; alt d’après `sujet` des photos ; aucun avis ni note ; parking, terrasse, privatisation absents ; photos d’aspect lisse (génération possible, non confirmée).

## Décisions de théâtre
Pas de loader (contenu immédiat), pas de GL (filet DOM), repos = goutte qui gonfle et lâche une perle.

## Leçons structurelles
Voir `agents/lecons/construction.md` (2026-11-10, awwwards phase 3).
