# Le Lodge Wépion : variante awwwards
**Concept** : « Deux rives », une onde ambre (le passage) relie la berge fermée de Wépion au relais ouvert d'Erpent. **Stack** : Astro 5 + GSAP + Lenis (sans OGL ni loader : aucun plan GL utile, contenu rapide). Base `/le-lodge-wepion/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/le-lodge-wepion-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.
## Scores du critique jury
Aucun score de critique rendu : pas d'outil Agent en session, et QA-build.md de l'agent « captures » était absent (phase 3 faite sur captures propres, 4 pages). Self-score, non indépendant : non établi. `/jury <url>` à lancer avec un critique neuf.
## Mesures (passe finale, 4 pages)
LCP mobile 0,9 à 1,3 s ; CLS ≤ 0,005 ; loaderMs null ; settledMs 2,3 à 2,5 s ; FPS 60 desktop, 61 mobile bridé ; axe : 0 (2 critiques corrigées, voir plus bas) ; overflow : aucun ; noHoverChange : 0 ; colorOnly : liens téléphone et « La carte » (liens de texte soulignés, acceptés) ; idleMotion true ; reduced : hiddenText 0, moving false ; 0 erreur console, 0 requête échouée ; audit : 0 FAIL, 1 WARN (« no sitemap » de la racine de QA, faux positif : sitemap-index.xml présent). Poids : JS 61 Ko gz, page ~513 Ko, image max 380 Ko, polices 61 Ko.
## Corrections de cette passe
- axe critique : tableau « passage » de l'accueil (rôles table/cell sans lignes) : rôles retirés, `role="group"`.
- FAIL og:image : `public/og.png` composée depuis le héros (1200x630, lisible).
- Titre de l'accueil 72 vers moins de 70 caractères ; crédit photos répété (légendes) : conservé dans le colophon seul.
## Points non résolus
- [jury] pas de score de critique neuf : à lancer.
- [capture] la 404 n'a pas été photographiée (réponse brute de serve.mjs) ; 404.html présent.
## Placeholders et hypothèses (à remplacer par le client)
- Numéro du relais 0496 92 55 13 à confirmer ; aucun horaire du relais (« jours et horaires à confirmer ») ; date de réouverture de Wépion « fin 2026, voire début 2027 » non confirmée ; réservation « par Barestho » à confirmer ; photos d'avant l'incendie ; 0 `placeholder: true`.
## Décisions de théâtre
Ni loader ni GL ; repos : l'onde coule en continu (idleMotion true, immobile en mouvement réduit). Accessoire retiré : non fait (pas de passe jury).
## Leçons structurelles
- `sed` ne reconnaît pas l'espace insécable d'un « Photos : » : passer par Python.
