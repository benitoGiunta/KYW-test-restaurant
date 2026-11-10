# Pépite, cave à manger : variante awwwards
**Concept** : le filon, un fil de cuivre qui descend la page et laisse affleurer les pépites (plats, vins, adresse). **Stack** : Astro 5 + GSAP + Lenis (sans OGL : pas de WebGL, le fil est en CSS/DOM). Base `/pepite/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/pepite-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session d'agent et aucun critique neuf disponible. Pas de score inventé ; `/jury <url>` à lancer par le superviseur. Les critères mesurables de la phase 3 sont prouvés ci-dessous.

## Mesures (passe finale, accueil, mobile bridé CPU 4x / 4G lente)
LCP mobile 1084 ms (`p.lead`, texte), CLS 0, loaderMs null (pas de loader), settledMs desktop 2657, scrollFps 60 (pire image 17 ms), idleMotion true, 0 erreur console, 0 requête échouée, pas de débordement horizontal, reduced : 0 texte caché, rien en mouvement, axe 0 violation (15 contrastNeedsReview sur l'accueil, 11 sur la carte, à revoir à l'œil), clavier sans focus invisible ni bloqué, 0 cible tactile petite, hover sans changement nul. Audit : 0 FAIL, 1 WARN (sitemap : faux positif de la racine de QA, `sitemap-index.xml` présent dans `dist/`). Poids : page la plus lourde 629 Ko (JS 60 Ko gz, polices 91 Ko woff2, images 466 Ko), aucune image > 500 Ko.

## Corrections de la passe
- LCP mobile 2768 -> 1084 ms : le bloc `hero__bas` (phrase d'accroche) n'est plus en opacité 0 au chargement ; seuls horaires et CTA gardent le reveal.
- Meta description de l'accueil 178 -> moins de 160 caractères (et description du site raccourcie).
- Phrase « Samedi midi et privatisation sur demande. » répétée sur l'accueil et la réservation : remplacée par « Fermé du dimanche au mercredi. » dans ces deux sections (le pied de page garde la phrase complète).
- og.png recomposée depuis le hero réel (nom, photo de la cave, accroche) ; rebuild fait.
- Faux positifs non corrigés : `skipLinkFirst` false (lien « Aller au contenu » présent), 404 sans h1 (la vraie `404.html` a un h1, un title et `lang`), robots.txt et sitemap de la racine de QA.

## Points non résolus
- [a11y] `contrastNeedsReview` (15 accueil, 11 carte) : non relus un à un faute de budget.
- [design] page carte : grand vide sous le chapeau à 1440×900, noté en phase 2, non revu.
- [qa] page réservation non capturée par l'agent captures ; auditée seulement (0 FAIL).
- [jury] aucun score de critique.

## Placeholders et hypothèses (à remplacer par le client)
Aucun contenu fictif ni placeholder. Données douteuses : fondation 2017 (presse) contre 2023 (Mapstr) ; téléphone 0476 62 01 82 repris contre 081/22 91 81 ; outil de réservation Tablebooker ou Zenchef (lien vers le site du client) ; parking du Casino « à confirmer » ; prix des assiettes et carte des vins absents, non publiés. Photos du client : 8 (07 atelier, 08 logo non utilisées).

## Décisions de théâtre
Pas de loader ni de GL. Repos : lueur sur le fil du hero et dernière pépite qui vacille. Accessoire retiré : non fait dans cette passe (aucune coupe décidée sans critique).

## Leçons structurelles
Un bloc de hero en `opacity: 0` (data-reveal + data-intro) retarde le LCP mobile de plus d'une seconde : ne pas révéler le paragraphe LCP.
