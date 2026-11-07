# INCORЯECT : variante awwwards
**Concept** : « Le demi-tour », un seul R retourné (Я) par titre, qui se balance au repos dans le h1 et fait un demi-tour à l'entrée des autres titres.
**Stack** : Astro 5 + GSAP + Lenis (OGL non : aucun concept GL, pas de loader). Base `/incorrect/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/incorrect-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/incorrect-awwwards/.qa-root --port 4400` (racine QA : copie de `dist/incorrect/awwwards` sous `incorrect/awwwards/`, plus `404.html` et `robots.txt`).

## Scores du critique jury (auto-notation, Self-score, non indépendant)
Aucun outil Agent en session d'agent : pas de critique neuf, une seule passe de notation sur preuves (captures et rapports de `.shots/`). L'agent « captures » du workflow avait échoué (`shootFailed`, pas de `QA-build.md`) : captures et audit refaits ici, page par page.

| Critère | Score | Preuve citée |
|---|---|---|
| Design (40 %) | 8 | Hero : mot-poster INCORЯECT pleine largeur, photo du four, accent orange sur vert nuit ; `home/d-01-hero.png`, `m-01-hero.png` |
| Usability (30 %) | 8 | `skipLink` présent et premier, 0 focus invisible, 0 cible minuscule, 0 `noHoverChange` après correction, 0 débordement |
| Creativity (20 %) | 8 | Le Я est lisible comme idée (nom du lieu, rock), `fin.png` : demi-tour en cours sur « À L'ENDROIT ? » |
| Content (10 %) | 7 | 3 photos seulement, aucun avis ni portrait, horaires « à confirmer » |
| Sem/SEO | 8 | `lang="fr"`, un h1, JSON-LD Restaurant, sitemap-index lié, canonical, OG |
| Anim | 8 | `idleMotion` true, `settledMs` 2342 à 2500, 60 fps desktop et mobile |
| A11y | 8 | axe 0 grave (après correction du `dl`), reduced : `hiddenText` 0, `moving` false |
| WPO | 9 | page la plus lourde 596 Ko, JS 61 Ko gz, images 428 Ko, polices 98 Ko, pas de ttf |
| Responsive | 8 | `scrollWidth` = largeur à 320/360/390 (phase 2), overflow false desktop et mobile |
| Markup | 8 | 0 erreur console, 0 requête échouée sur 5 pages |

Critique pondéré environ 7,9. Estimation jury « environ 9,0 » (critique + 1,1), à prendre avec prudence car auto-notation. Lecture de l'idée : « une pizzeria rock dont le nom se retourne », concorde avec la Concept Card. Évolution : une seule passe, deux corrections après audit (voir plus bas).

## Mesures (passe finale)
- LCP mobile 888 à 988 ms (img sur l'accueil, texte sur la carte), CLS 0, loaderMs null (pas de loader).
- settledMs 2342 à 2500 (non null), scrollFps 60 desktop et mobile, idleMotion true.
- axe sérieux : 1 sur l'accueil avant correction (`definition-list`), 0 après (vérifié par shoot ciblé de l'accueil, voir ETAT.md), 0 ailleurs.
- overflow : false partout. `noHoverChange` : vide sur les 5 pages après correction. `colorOnly` vide.
- Audit : 0 FAIL, 1 WARN (« no sitemap » : la racine de QA n'a pas de sitemap à sa racine, `sitemap-index.xml` est présent et lié dans `dist/incorrect/awwwards/`).

## Corrections de la passe
1. Accueil : `<p>` directement dans `<dl>` (axe `definition-list`, grave) remplacé par un `<dd class="chiffre__note">`.
2. Hover : lien de nav de la page courante (carte) et téléphone du pied sans changement au survol, ajout d'un survol et d'un focus (soulignement épaissi, couleur accent).
3. Réservation : horaires regroupés (mardi à vendredi, samedi, dimanche et lundi) et note reformulée, supprimant les WARN « sentence repeated 4x » et « 2x ».
4. Mot du pied « À L'ENDROIT ? » : l'accent du À était coupé par le masque SplitText (interligne 0,82) ; `.split-line { padding-top: .16em; margin-top: -.16em }`. Vérifié par capture ciblée.

## Points non résolus
- [Content] `home` et toutes les pages : seulement 3 photos libres du dossier, pas de portrait d'Alex et Estelle. Des photos fournies par le client feraient monter Content.
- [Jury] Score en auto-notation, pas de critique indépendant ni de seconde passe avec critique neuf. Le superviseur peut ajouter `Agent` aux outils pour une passe indépendante.
- [Test] `skipLinkFirst` vaut false dans `report.json` : faux négatif de l'outil (il teste le nom accessible contre `skip|#main|#content`, ici « Aller au contenu », alors que le lien `a.skip-link` vers `#main` est bien le premier arrêt de tabulation).
- [Contraste] 6 à 8 `contrastNeedsReview` par page non relus un à un ; le texte courant est clair sur vert nuit (visible sur les planches). La petite note d'horaires du pied est le candidat le plus faible.
- [OG] `og.png` de la phase 1 conservé, non recomposé.

## Placeholders et hypothèses (à remplacer par le client)
- Aucun placeholder détecté (0 « lorem », « example.com », « TODO », aucun champ `placeholder: true`).
- Horaires du Fooding (mar-ven 18 h 30 à 21 h 30, sam 12 h à 14 h et 18 h 30 à 21 h 30, fermé dim-lun) : sources divergentes, affichés « à confirmer ».
- E-mail non repris, aucun avis, aucune note, aucun chiffre de places. Initiales en typographie à la place de portraits.

## Décisions de théâtre
Pas de loader (marque courte, LCP < 1 s), pas de WebGL (le concept est typographique), repos du h1 par balancement du Я (± 26°) avec `idleMotion` true. Accessoire retiré : non fait dans cette passe (une seule passe, pas de seconde lecture critique) ; candidat nommé : la parallaxe d'image dans son cadre, le plus faible des effets décoratifs.

## Leçons structurelles
- Un `<p>` dans un `<div>` d'un `<dl>` est une violation axe grave : utiliser un second `<dd>`.
- `line-height` < 1 sur un titre `data-split="lines"` coupe l'accent des capitales : `padding-top`/`margin-top` sur `.split-line` dans le site.
- L'agent « captures » peut échouer sans `QA-build.md` (`shootFailed`) : un shoot de page complet dure ~2 min, le lancer en `run_in_background`.
