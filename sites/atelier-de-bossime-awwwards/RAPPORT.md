# L'Atelier de Bossimé : variante awwwards

**Concept** : « Les trois accents ». Le é de Bossimé porte trois accents, un par pilier de la durabilité (logo réel du client) ; le site entier s'écrit avec ces trois traits corail : progression de lecture dans l'en-tête, trois chapitres de l'accueil (la terre, les gens, la maison), Moments de la carte comptés en traits, trois façons de réserver, 404 « bossime » sans accents. Verbe : se posent d'un trait, en biais.
**Stack** : Astro 5 + GSAP (SplitText, ScrollTrigger) + Lenis. OGL : non (les photos du client portent l'image, un shader n'ajoute rien au geste d'écrire). Base `/atelier-de-bossime/awwwards/`.
**Lancer** : `pnpm build:site sites/atelier-de-bossime-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/atelier-de-bossime-awwwards/.qa-root --port 4400` (racine de QA décrite au § 4.1 du prompt).

## Scores du critique jury (passe finale, critique : auto-notation)
| Critère | Score | Preuve citée par le critique |
| --- | --- | --- |
| Design (40 %) | 8 | home/d-01-hero (mot bord à bord, accents corail, paire photo), home/d-03 et d-04 (grand é), footer home/d-07, paires h-* |
| Usability (30 %) | 8 | LCP mobile 1,07 à 1,25 s, CLS 0, FPS 60 partout, cibles ≥ 24 px, menu mobile vérifié |
| Creativity (20 %) | 8,5 | concept tiré du logo réel, présent jusqu'à la carte, la réservation, la 404 et la transition |
| Content (10 %) | 7,5 | prix, horaires et faits réels ; aucun plat nommé (livret non public) |

| Sem/SEO | Anim | A11y | WPO | Responsive | Markup |
| --- | --- | --- | --- | --- | --- |
| 8 | 8 | 8 | 8,5 | 8 | 8 |

Critique pondéré : 8,0. Estimation jury : « environ 9,1 » (critique + 1,1, calibration.md, deux sites ; auto-notation, donc à minorer).
Lecture de l'idée par le critique : « les trois accents corail du é deviennent l'unité du site, la 404 est le mot qui les a perdus » (concorde avec la Concept Card).
Évolution par passe : passe 1 7,3 → passe 2 7,9 → passe 3 8,0. Cartes : `.jury/127.0.0.1-4467/scorecard-1.md`, `scorecard-2.md`, `scorecard.md` (non commitées).

**Nature du score** : auto-notation, non indépendante. La session de l'agent n'a ni `Agent` ni `Task` ; le superviseur doit ajouter `Agent` aux outils de cet agent (voir lecons.md).

## Mesures (passe finale)
- LCP mobile throttlé : 1 072 à 1 252 ms selon la page (élément : `<img>` ou le mot du hero) ; CLS 0 partout.
- loaderMs : null (pas de loader). settledMs desktop : 2 364 à 2 630 ms.
- FPS : 60 desktop et 60 mobile throttlé sur les 6 rapports (passe 1 : 23 à 51 sur mobile, corrigé).
- Axe : 0 violation sérieuse ou critique ; `contrastNeedsReview` 4 à 7 nœuds par page, lus sur les captures (texte grès sur aubergine 13,4:1, scrim de la façade).
- Débordement : aucun, desktop et mobile. `smallTargets` : vide.
- `noHoverChange` : vide sauf la marque sur l'histoire (en-tête escamoté pendant le test, vérifié à la main). `colorOnly` : « La carte » (accent tracé visible sur la paire h-05, non lu par le script).
- `idleMotion` : true sur l'accueil, la réservation et la 404 ; false sur la carte et l'histoire (seuls les petits accents de l'en-tête bougent : décision écrite).
- `reduced.hiddenText` 0, `reduced.moving` false ; `keyboard.stuck` false, focus visible partout.
- Audit : 0 FAIL, 1 WARN (« no sitemap » : sondé à la racine de l'origine, le sitemap est sous `base` et lié dans `<head>`). JS 61 Ko gz, page la plus lourde ≈ 688 Ko.
- Menu mobile (script) : `aria-expanded` true, focus sur « Fermer », focus piégé après 8 Tab, Échap ferme et rend le focus au bouton.

## Points non résolus
- [Content] Aucun plat nommé : le livret change à table et n'est pas publié. La carte montre les formules et leurs prix réels ; les photos d'assiettes sont légendées comme « assiettes passées ». Le client peut fournir le livret de la semaine.
- [Animations] `idleMotion` false sur la carte et l'histoire : leurs heros n'ont pas de grand accent ; ajouter les trois accents en grand dans ces heros les ferait bouger au repos.
- [Outil] `shoot.mjs` classe « La carte » en `colorOnly` et la marque en `covered` : artefacts vérifiés (échelle d'un enfant non lue ; en-tête escamoté par `frame-away`).
- [Donnée] Contradictions de la source laissées hors du site : 40 ou 70 producteurs, ouverture en 2010 ou 2011 (2011 retenu, site du client), année du titre Gault&Millau (cité sans année).

## Placeholders et hypothèses (à remplacer par le client)
- `site.ts › piliers` (`piliersPlaceholder: true`) : la lecture « la terre, les gens, la maison » des trois piliers du logo est celle de KYW ; le site du client dit seulement « un accent par pilier de la durabilité ».
- `site.ts › site.email` (`emailPlaceholder: true`) : info@bossime.be vient de `data/restaurants.json`, non vu sur le site du client.
- `site.ts › services` (`horairesFermeturePlaceholder: true`) : heures de fin (16 h, 23 h 30) du Guide MICHELIN, utilisées seulement dans le JSON-LD ; le texte visible dit « dès 12 h » et « dès 19 h » comme le client.
- Aucune photo n'est légendée « Ludovic Vanackere » (portrait n° 18 « à confirmer », non utilisé).
- Soirée NeZ ZeN (22/10/2026) non affichée : passée à la date de la maquette.

## Décisions de théâtre
Loader : non (restaurant ; le premier frame est le mot lui-même, peint au premier rendu). GL : non. Repos : les trois accents oscillent comme trois pousses au vent, le pointeur (ou la vitesse de défilement au toucher) donne la direction ; nul en mouvement réduit. Accessoire retiré en passe finale : le zoom d'entrée de la photo du hero.

## Leçons structurelles
- `setProperty` par frame sur `<html>` (variable de repos) : FPS mobile throttlé à 23 à 47 ; l'écrire sur les seuls porteurs visibles (IntersectionObserver) rend 60.
- `ScrollTrigger.onToggle` ne signale pas un élément déjà visible à la création : `idleMotion` false ; IntersectionObserver à la place.
- `keyboard.stuck` de `shoot.mjs` : faux positif sur deux arrêts consécutifs de même libellé ; et un lien dans un `data-reveal` sort de la tabulation tant qu'il n'est pas révélé.
- `covered` sur un en-tête qui s'écarte au défilement : artefact, à trancher par un défilement inverse réel.
- Titre en `grid-column: 1 / 10` dans un sous-conteneur grille sans colonnes : colonnes implicites, chapô écrasé.
- `<Picture>` génère un repli JPG par largeur : `fallbackFormat="webp"` (dist 18 → 12 Mo).
- Pas d'outil de sous-agent : critique en auto-notation.
(Recopiées dans `agents/lecons.md`, entrée « 2026-10-31 · atelier-de-bossime · variante awwwards ».)
