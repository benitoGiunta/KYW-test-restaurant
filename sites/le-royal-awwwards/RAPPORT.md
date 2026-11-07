# Le Royal Namur : variante awwwards
**Concept** : « Face à face », une brasserie face au Théâtre, deux faces en contre-défilement le long d'un axe (place 13). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun besoin de GL). Base `/le-royal/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/le-royal-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/le-royal-awwwards/.qa-root --port 4400`.

## Scores du critique jury (critique : auto-notation, « Self-score, non indépendant »)
Pas d'outil Agent en session : aucun critique neuf n'a été lancé, une seule passe de QA sur preuves (critères 61 à 63 non satisfaits). Estimation propre, à contester par `/jury`.
| Critère | Score | Preuve |
|---|---|---|
| Design | 8 | planche accueil : hiérarchie nette, deux faces brique/ardoise, display lisible |
| Usability | 8,5 | 0 petite cible, clavier sans piège, lien d'évitement en tête, « Réserver » en 44 px |
| Creativity | 7,5 | axe et faces originaux, mais sans loader ni GL (choix) : théâtre sobre |
| Content | 7,5 | contenu réel mais maigre (pas d'histoire ni d'équipe dans le dossier) |
| Sem/SEO, Anim, A11y, WPO, Responsive, Markup | 8 à 9 | audit 0 FAIL, axe 0, 927 Ko, JS 60 Ko gz, 60 fps |
Pondéré environ 8,0 ; jury estimé environ 9,1 (+1,1). Lecture de l'idée : non vérifiée par critique extérieur.

## Mesures (passe finale, port 4400)
LCP mobile 2316 ms accueil (img), 876 à 936 ms ailleurs ; CLS 0 ; loaderMs null (pas de loader) ; settledMs 2212 à 2555 ; FPS 60 desktop et mobile ; axe sérieux 0 (4 pages) ; overflow aucun ; noHoverChange vide ; colorOnly vide ; idleMotion true sur l'accueil seulement ; audit 0 FAIL, 1 WARN (« no sitemap » : faux positif de la racine de QA, `sitemap-index.xml` présent et lié) ; page la plus lourde 927 Ko, aucune police ttf/otf.

## Corrigé en phase 3
- axe `label-content-name-mismatch` (accueil, carte) : `aria-label` retiré de la marque. 
- Cibles de 22 px (« Voir toute la carte », « Ouvrir le plan », e-mail) : `.lien` en inline-block avec 0,55 rem de marge verticale.
- Survols manquants : marque (numéro 13 et nom) et téléphone du pied (déplacement + soulignement).
- Phrase répétée accueil : seconde paire de boutons renommée « Réserver » / « Téléphoner au … ».
- og.png recomposée depuis le hero réel, lisible (nom, adresse, terrasse).

## Points non résolus
- [Anim] `idleMotion` false sur a-propos, réservation et 404 : pages courtes de lecture et de réservation, immobilité volontaire (le repos vit sur l'accueil et la carte).
- [Process] pas de critique indépendant ni de seconde passe ; accessoire à retirer non désigné (candidat : le déplacement de la marque au survol).
- [Audit] 404 « sans h1/title/lang » en crawl : réponse brute de serve.mjs ; `404.html` a `lang="fr"` (vérifié).

## Placeholders et hypothèses (à remplacer par le client)
Aucun contenu fictif (`placeholder: true` jamais utilisé). Données douteuses laissées telles : numéro 13 (une source dit 2), « ouvert de 11 h à 23 h » (carte) contre cuisine 12 h à 14 h 30 et 18 h à 22 h, ardoise à 20 € « à confirmer ». Histoire, équipe, chef absents du dossier.

## Décisions de théâtre
Pas de loader (rideau à deux volets seulement entre pages), pas de GL, pas de curseur suiveur : la brasserie vend la table, pas l'effet.

## Leçons structurelles
Voir agents/lecons/construction.md (2026-11-07 · le-royal · awwwards phase 3).
