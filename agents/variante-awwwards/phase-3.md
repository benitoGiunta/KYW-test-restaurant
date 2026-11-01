Phase 3 sur 3 de la variante awwwards (construction-3) : QA sur preuves, score jury, corrections, ship, RAPPORT.md. À lire après commun.md.

# Phase 3 : QA, jury, ship

Lis `$SITE/ETAT.md`, puis `$SITE/QA-build.md` (captures et audit faits par l'agent « captures » : lis ses planches, ne refais pas de shoot complet). Références (`$SKILL/references/`) : `quality.md` (checklist développeur, budgets WPO, « Bugs found in real test builds »), `quality-bar.md` (rubrique, « An 8 needs », brief du critique), `ship.md`, `astro.md` § Config ; `$JURY/SKILL.md` (cible, preuves, score, carte ; « sans preuve, pas de point » ; critique neuf à chaque passe). `$JURY/references/calibration.md` seulement pour la carte (jury estimé = critique + 1,1), jamais donné au critique.

## 1. Servir la production et preuves ciblées

Jamais le serveur de dev. `serve.mjs` cherche `404.html` et `robots.txt` à sa racine et le `base` impose `/<slug>/awwwards/` : racine de QA temporaire.

```bash
QA=$SITE/.qa-root && rm -rf $QA && mkdir -p $QA/$SLUG && cp -r $OUT $QA/$SLUG/awwwards
cp $OUT/404.html $QA/404.html && printf 'User-agent: *\nDisallow: /\n' > $QA/robots.txt
cd $REPO && node $SKILL/scripts/serve.mjs $QA --port $PORT &      # note le PID, kill <PID> en fin
U=http://127.0.0.1:$PORT$BASE
scripts/q.sh shoot node $SKILL/scripts/shoot.mjs ${U}<page>/ --out $SITE/.shots/<page>     # une page, après correction
scripts/q.sh audit node $SKILL/scripts/audit.mjs $U ; cp .logs/audit.log $SITE/.shots/audit.txt   # exit 1 = au moins un FAIL
```

- `shoot.mjs --crawl` type les pages par premier segment : sous `base` toutes les intérieures deviennent `<slug>-item` et une seule est photographiée ; chaque page (carte, histoire ou a-propos, reservation) a son dossier. `--hovers 0` saute les cibles de pointeur ; `--no-throttle` interdit pour la passe finale.
- Par page : `d-*` desktop 1440, `m-*` téléphone 390 bridé (CPU 4x, 4G lente), `r-*` réduit, `k-01..04` clavier, `h-NN-rest/hover`, `d-90..92` transition, `report.json` ; `summary.json` une ligne par page. Lis `report.json` par `jq` sur les champs utiles, jamais en entier.
- Passe « Bugs found in real test builds » ligne par ligne : texte sombre sur fond devenu sombre en fin de page, premier frame faible, titre dédoublé, paragraphe en zigzag, page courte qui saute à l'état final, UI fixe sur le contenu, copie répétée, « survolez » sur mobile, cibles minuscules, loader hors budget, planes GL vides, site qui semble statique, aperçu curseur bloqué, en-tête invisible sur photo claire, trou de hero mobile, mot display coupé.

## 2. Score extérieur (skill jury)

Tu vois l'intention au lieu de l'écran : à chaque passe, un **critique neuf** qui ne reçoit que le « Critic brief » de `quality-bar.md` avec ses trois chemins remplis (rubrique, `$SITE/.shots/`, `$SITE/.shots/audit.txt`) : ni DESIGN.md, ni code, ni Concept Card, ni score précédent.
- Outil `Agent`/`Task` disponible : lance-le avec ce brief. Sinon `Skill: jury` sur `$U` avec `--out $SITE/.jury/127.0.0.1-$PORT/shots`, carte au format `$JURY/SKILL.md` § 5 dans `$SITE/.jury/127.0.0.1-$PORT/scorecard.md` (renomme l'ancienne `scorecard-<n>.md` avant). Auto-notation : écris « Self-score, non indépendant » sur la carte, dans RAPPORT.md et lecons/construction.md (le superviseur doit ajouter `Agent` aux outils).
- Compare « The idea, as the critic read it » à la Concept Card : discordance = problème de Creativity à corriger dans le site. Ne négocie jamais à la hausse ; conteste seulement une capture mal lue. Sa liste de corrections est le travail de la passe suivante.
- Deux passes minimum (passe 1, corrections vérifiées par capture ciblée, passe 2 avec critique neuf), trois au plus.

## 3. Critères de sortie (tous, preuve dans DESIGN.md)

- `audit.txt` : 0 FAIL ; chaque WARN corrigé ou justifié (« no robots.txt » de la racine de QA : justifié par le meta noindex et le robots.txt du dépôt ; « only n words » : étoffer 404/réservation de vrai contenu ou justifier).
- 0 erreur console, 0 requête échouée (`report.failed` : presque toujours un chemin hors `BASE_URL` ou un `fetch` de formulaire), aucun débordement horizontal (`overflowX`) desktop ni mobile.
- `reduced.hiddenText` = 0, `reduced.moving` = false ; 0 violation axe sérieuse ou critique, chaque `contrastNeedsReview` vu à l'œil.
- `keyboard.skipLinkFirst` = true, `noVisibleFocus` et `invisibleFocus` vides, pas `stuck` ; `smallTargets` vide.
- `hover.noHoverChange` vide ; chaque `colorOnly`, `pixels`, `masked` lu à l'œil (un remplissage qui inonde le bouton est un traitement, un lien principal qui change seulement de couleur ne l'est pas) ; `covered` traité à la main.
- `desktop.idleMotion` = true, ou immobilité écrite dans DESIGN.md.
- `mobile.vitals.lcpMs` < 2500 (élément LCP texte ou `<img>`, jamais canvas), `mobile.vitals.cls` < 0,05 (`font-display: swap`), `mobile.loaderMs` ≤ 2600 ou null, `desktop.settledMs` non null et raisonnable, `scrollFps` ≥ 55 desktop et fluide sur téléphone bridé.
- Poids : JS < 300 Ko gzippé (Astro + engine ≈ 75 Ko), page < 3 Mo, aucune image > 500 Ko, aucune police ttf/otf (ligne « heaviest page »).
- Chaque score du critique ≥ 8 avec preuve ; sinon après trois passes, RAPPORT.md dit lequel, pourquoi, ce qui le ferait monter.
- Passe finale « retirer un accessoire » : coupe l'effet décoratif le plus faible et nomme-le. Hover, press et focus ne sont pas des accessoires (on les restyle, on ne les coupe pas).

## 4. Ship

1. `site` reste celui de `KYW_SITE` (canonical, OG, sitemap) ; aucun domaine inventé.
2. Image OG composée depuis le hero réel, serveur de QA lancé : `cd $REPO && node $SKILL/scripts/og.mjs $U --out $SITE/public/og.png --wait 3000` (attend le loader, 9 s max), puis rebuild ; vérifie à l'œil une composition lisible (nom, plat ou lieu), pas un recadrage mou.
3. Favicon SVG du concept présent (PNG 32 px, `apple-touch-icon` 180 px si possible).
4. `grep -L 'name="robots"' $(find $OUT -name '*.html')` vide ; `$OUT/sitemap-index.xml` présent et lié avec `BASE_URL`. `build-site.mjs` refuse (« meta robots noindex », « pied de page KYW ») si le layout manque à une page ou si le meta est posé en JS.
5. Rebuild `scripts/q.sh build pnpm build:site sites/$SLUG-awwwards`, `audit.mjs` → 0 FAIL, un dernier shoot de l'accueil.
6. `cd $REPO && pnpm index`, commit en français (dist commité ; `.shots/`, `.jury/`, `.qa-root/` non). Pas de déploiement : Vercel sert `dist/`, la publication relève du superviseur. Arrête le serveur (`kill <PID>`).

## 5. Checklist (ajoute à DESIGN.md, preuve pour chaque point, puis vérifie que les points 1 à 47 des phases 1 et 2 sont tous prouvés)

42. Sémantique (`lang="fr"`, un h1, titres ordonnés, landmarks, listes, boutons/liens). 43. Titre et description uniques, canonical, OG, `twitter:card`, favicon, sitemap lié, JSON-LD `Restaurant`. 48. Images `width`/`height`, formats modernes, hero `fetchpriority="high"`, lazy, alt.
49. LCP mobile < 2500, texte ou `<img>`. 50. CLS < 0,05, `font-display: swap`. 51. JS < 300 Ko gz, page < 3 Mo, image ≤ 500 Ko, pas de ttf/otf. 52. `settledMs` non null, `scrollFps` ≥ 55.
53. 0 « em/en dash ». 54. 0 « filler », 0 « cliche », 0 « sentence repeated », pas de « survolez » mobile. 55. Accroche < 20 mots, noms concrets, chiffres vrais, « Réserver » partout. 56. Compléments `placeholder: true` listés ; 0 placeholder détecté (« lorem », « example.com », « TODO »). 57. Crédit « photos : <restaurant> » et colophon.
58. Meta robots partout (grep vide). 59. `KywFooter` partout, un logo `kyw-signature`, mention rendue, absent de `noHoverChange`. 60. `BASE_URL` partout, 0 requête échouée sous `/<slug>/awwwards/`.
61. Deux passes minimum, critique neuf à chaque fois. 62. Lecture de l'idée par le critique = Concept Card. 63. Scores ≥ 8 ou écart justifié ; accessoire retiré et nommé.

## 6. RAPPORT.md (`$SITE/RAPPORT.md`)

```markdown
# <Nom du restaurant> : variante awwwards
**Concept** : une ligne. **Stack** : Astro 5 + GSAP + Lenis (+ OGL oui/non, pourquoi). Base `/<slug>/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/<slug>-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.
## Scores du critique jury (passe finale, critique <indépendant | auto-notation>)
| Critère | Score | Preuve citée | : Design (40 %), Usability (30 %), Creativity (20 %), Content (10 %), Sem/SEO, Anim, A11y, WPO, Responsive, Markup.
Critique pondéré x,x. Estimation jury « environ y,y » (critique + 1,1). Lecture de l'idée : « … » (concorde ou non). Évolution par passe.
## Mesures (passe finale)
LCP mobile, CLS, loaderMs, settledMs, FPS desktop/mobile, axe sérieux, overflow, noHoverChange, colorOnly, idleMotion, FAIL/WARN audit.
## Points non résolus
- [catégorie] capture ou champ : ce qui reste, pourquoi, ce qui le résoudrait.
## Placeholders et hypothèses (à remplacer par le client)
## Décisions de théâtre
Loader, GL, repos (raison de chacun) ; accessoire retiré.
## Leçons structurelles
(Vide si rien ; sinon recopiées dans agents/lecons/construction.md.)
```

Réponse finale : concept en une ligne, chemin de RAPPORT.md, score final et sa nature (indépendant ou auto-notation), les deux corrections qui le feraient le plus monter, les placeholders, et « `/jury $U` re-note le site avec un critique neuf une fois les placeholders remplacés ».
