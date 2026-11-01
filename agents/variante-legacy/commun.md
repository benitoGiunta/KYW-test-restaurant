Partie commune de la variante legacy, à lire par les 3 agents de construction avant leur fichier phase-N.md (référence complète : agents/variante-legacy.md).

# Variante legacy : règles communes

Variante 3 « inspi legacy » de KYW (Namur), en français. Tu refuses l'AI slop : chaque décision est prise, écrite, prouvée, jamais héritée d'un défaut. Tu SUR-UTILISES la skill `hallmark` : **si Hallmark a une référence ou un script pour une étape, tu le lis ou le lances et tu laisses une trace.** `agents/sobriete.md` prime.

```
$ROOT=/home/user/KYW-test-restaurant   $SKILL=$ROOT/.claude/skills/hallmark   $IN=$ROOT/data/restaurants/$SLUG
$OUT=$ROOT/sites/$SLUG-legacy          $LOG=$ROOT/.hallmark/log.json (journal PARTAGÉ des 20 restaurants : rotation des thèmes et formes)
```

## Principe

Entrée : `$IN/dossier.md`, `donnees.json`, `site-actuel/` (captures, HTML et CSS sauvegardés), `photos/` (prioritaires). Sortie : paquet Astro `$OUT/` (`"@kyw/footer": "workspace:*"`, `astro.config.mjs` copié de `sites/_test-legacy/`, base par `KYW_BASE` jamais codée en dur), build `cd $ROOT && scripts/q.sh build pnpm build:site sites/$SLUG-legacy` → `dist/$SLUG/legacy/`. Livrables : `AUDIT.md`, `DESIGN.md`, `comp.md`, `RAPPORT.md`, `.hallmark/`, entrée de `$LOG`. Lis `agents/lecons/{commun,construction}.md`.

Mode `redesign` **full** (`redesign.md` § Depth : contenu et wiring restent, système et composition changent), et on GARDE macrostructure et posture : one-page reste one-page, multi-pages garde ses routes, immersif reste immersif, animé au scroll garde UNE chorégraphie, statique reste calme. Dérogations justifiées (phase 1).

Hallmark : (1) **le Floor** (`SKILL.md` § The Floor, 16 points) lie tout ; (2) direction tirée au sort (`deal`/`draw`) via `$LOG` contre la convergence ; (3) une idée par écran ; gates Floor (jamais levable), Reflex (levable avec vraie raison, `waive`), Finish (`answered`). Rien ne part avec un `FAIL` ou un `REFLEX` ouvert.

## Environnement (une fois, idempotent)

`mkdir -p $ROOT/.hallmark` ; depuis `$ROOT` : `scripts/q.sh install pnpm install --offline || scripts/q.sh install pnpm install`. Chromium refuse le root sans `--no-sandbox` : wrapper `scripts/chrome-nosandbox.sh`. Jamais `playwright install`. **Préfixe chaque commande de rendu** (sloplint, capture.mjs ; les variables ne survivent pas entre appels) par
`HALLMARK_PUPPETEER=/home/user/KYW-test-restaurant/node_modules/puppeteer-core CHROME_PATH=/home/user/KYW-test-restaurant/scripts/chrome-nosandbox.sh` (noté `ENV` dans les phases) et passe-la par `/home/user/KYW-test-restaurant/scripts/q.sh`. Si sloplint imprime `render tier not run`, interdit d'écrire « render : pass » : corrige l'environnement. `TOGETHER_API_KEY` absent : `imagegen.mjs` interdit, jamais d'export de clé.

Toujours `--log $LOG` pour `deal`, `draw`, `photos`, `check`, `log` (`--log` est relatif au cwd).

## Règles KYW

- **Langue** : français, casse de phrase, aucun tiret cadratin ni demi-cadratin (gate 19), apostrophe typographique, insécable avant « : ; ! ? » et « € », guillemets « », heures constantes (« 12 h 00 » ou « 12:00 »), prix « 18 € ».
- **Données réelles** : `dossier.md`, `donnees.json`, HTML sauvegardé, captures ; rien d'inventé. Floor 46a : jamais métrique, témoignage, mur de logos, nombre d'avis, note Google inventés ; un avis du site d'origine est repris mot pour mot avec son attribution et listé à vérifier.
- **Fictif** seulement pour compléter (un plat, une date, une heure) : `data-placeholder="true"` dans le composant, `placeholder: true` au rapport ; un échantillon (`anatomy.md`), jamais un fait crédible. Fait indispensable absent (horaires, téléphone) : slot texte `.fill` (`patterns.md` § A fact the prompt did not give), deux par page au plus, listés.
- **Photos** : celles du client gagnent chaque slot (`$OUT/public/photos/`, WebP via `sharp` si > 400 ko, `width`/`height`). Sinon `node $SKILL/scripts/theme.mjs photos "<sujet anglais concret>" --theme <slug> --seed <seed du draw> --log $LOG --save $OUT/public/photos` (relance un « partial match » hors sujet ; jamais Unsplash/Pexels ni URL de mémoire), créditée (`data-credits`), `data-alt` = ce que la vraie photo devra montrer.
- **Noindex et mention** : `<meta name="robots" content="noindex">` dans `Base.astro` ; la mention « Maquette KYW, certaines données sont illustratives » est portée par `<KywFooter />` (prop `note`), sans duplication.
- **Pied KYW** : `import KywFooter from '@kyw/footer'`, `<KywFooter base={import.meta.env.BASE_URL} />` dernier élément de chaque page, couleur et police héritées du thème, jamais modifié. `build-site.mjs` ne vérifie que `index.html` : grep les autres routes.
- **Astro** : chemins d'asset par `import.meta.env.BASE_URL` ; pas de framework UI ni de Tailwind ; pas de GSAP/Lenis (`craft.md` § 5 : CSS d'abord, un reveal, IntersectionObserver), sauf un pattern `scroll-choreography.md` en CSS pur (`animation-timeline`) si l'original était animé au scroll.
- **Wiring conservé** (`redesign.md` § What a redesign keeps) : liens externes, `tel:`, `mailto:`, routes gardent leur destination ; rien de supprimé sans ligne `dropped` et mention au rapport.
- **Git** : jamais `git add -A` ; `dist/` commité ; `.hallmark/` est filtré par le `.gitignore` de sloplint ; commite `AUDIT.md`, `DESIGN.md`, `comp.md`, `RAPPORT.md`, `preflight.json`, les comps HTML.

## Checklist et fin de phase

DESIGN.md § Sur-utilisation : chaque phase ajoute ses points numérotés au format `- [x] <n>. <règle> · preuve : <fichier:ligne | sortie sloplint | capture>` ; une case non cochée cite un `waive`/`answered` ou une raison. Chaque phase finit par DESIGN.md et ETAT.md à jour et un commit. Leçon structurelle : **ajoute** à `agents/lecons/construction.md` sous `## <date> · <slug> · variante legacy`.
