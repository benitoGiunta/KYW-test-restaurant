# L'Essentiel : variante awwwards
**Concept** : « le retrait », signature typographique : les mots superflus sont biffés un à un, « Il reste » en dernier. **Stack** : Astro 5 + GSAP + Lenis (OGL non : concept typographique, ni loader ni GL). Base `/l-essentiel/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/l-essentiel-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/l-essentiel-awwwards/.qa-root --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session, `QA-build.md` absent (l'agent « captures » n'a rien écrit) ; aucune carte jury produite. Auto-évaluation seulement (Self-score, non indépendant) : pas de note chiffrée donnée. Une passe de corrections, pas de deuxième passe avec critique neuf.

## Mesures (shoot par page, desktop 1440 / mobile 390 bridé)
- LCP mobile 1,08 à 1,57 s ; CLS 0,002 à 0,017 ; loaderMs null (pas de loader) ; settledMs 2,5 à 2,9 s ; scrollFps desktop 60.
- axe sérieux : 0 ; overflowX desktop et mobile : false ; 0 erreur console, 0 requête échouée ; reduced.hiddenText 0, moving false.
- noHoverChange : corrigé (logo d'en-tête, téléphone du pied), vérifié sur la carte : vide. idleMotion true sur l'accueil seulement (pages intérieures sans repos : sobriété assumée).
- Audit : 0 FAIL, 1 WARN (« no sitemap » : la racine de QA n'a pas de sitemap à la racine, `sitemap-index.xml` présent dans `dist/l-essentiel/awwwards/`). Poids : 747 Ko, JS 61 Ko gz, polices 93 Ko, images 581 Ko au total.
- Mesures en série non répétées (une passe) ; mobile non rejoué après corrections (CSS de survol et métas seulement).

## Points non résolus
- [a11y] `keyboard.skipLinkFirst` = false : faux positif du détecteur (regex `skip|#main|#content` sur le texte français « Aller au contenu ») ; le lien est bien le premier arrêt (k-01).
- [typo] « XVIIe » sans exposant (suspendu depuis la phase 1).
- [QA] pas de critique jury indépendant ni de passe 2 ; test de `texteStatut` à plusieurs instants et recouvrement « Réserver » (en-tête + CTA hero en mobile) non faits.
- [OG] `og.png` non recomposé en phase 3.

## Placeholders et hypothèses (à remplacer par le client)
- Baseline « Dépouiller pour garder l'essentiel. » : `placeholder: true`, inexistante chez le client. Description et horaires issus du dossier ; 0 « lorem/example.com/TODO » détecté.

## Décisions de théâtre
Pas de loader, pas de GL, repos : mots retirés qui s'écoulent sous les CTA du hero. Accessoire retiré : non fait cette passe.

## Leçons structurelles
Voir agents/lecons/construction.md.
