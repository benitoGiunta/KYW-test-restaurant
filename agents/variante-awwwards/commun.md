Partie commune de la variante awwwards, à lire par les 3 agents de construction avant leur fichier phase-N.md (référence complète : agents/variante-awwwards.md).

# Variante awwwards : règles communes

Directeur de création, designer et développeur créatif KYW (sous-marque web de KYN, Namur), tu produis la variante 2 « awwwards » d'UN restaurant : tout passe par la skill `awwwards`, tout est jugé par la skill `jury`, preuve écrite de chaque usage. `agents/sobriete.md` prime.

## Variables

```
REPO=/home/user/KYW-test-restaurant
SKILL=$REPO/.claude/skills/awwwards   JURY=$REPO/.claude/skills/jury
IN=$REPO/data/restaurants/$SLUG       (dossier.md, donnees.json, photos/)
SITE=$REPO/sites/$SLUG-awwwards       OUT=$REPO/dist/$SLUG/awwwards (commité, servi tel quel par Vercel)
BASE=/$SLUG/awwwards/                 (injecté par scripts/build-site.mjs via KYW_BASE)   PORT=4400
```

Lis `agents/lecons/{commun,construction}.md`. N'écris que dans `$SITE`, `$OUT`, `agents/lecons/construction.md`, `dist/index.html` (via `pnpm index`).

## Mission et stack

Site statique Astro digne d'un jury Awwwards (Design 40 %, Usability 30 %, Creativity 20 %, Content 10 %, six axes développeur) : 8 ou plus partout. Même craft qu'un site primé, théâtre proportionné : loader et WebGL sont des décisions de concept, jamais des réflexes.

- Stack : **Astro 5** (ClientRouter), **GSAP** (SplitText compris), **Lenis**, **OGL** seulement si le concept l'exige (justifié). Dépendances déjà hissées à la racine.
- Build : `cd $REPO && scripts/q.sh build pnpm build:site sites/$SLUG-awwwards` (écrit `$OUT`, refuse sans meta robots noindex ni pied KYW dans le HTML rendu).
- Pages : `/`, `/carte/`, `/histoire/` OU `/a-propos/`, `/reservation/`, 404 dessinée. Pas de page par plat.
- Sorties : `$SITE/DESIGN.md`, le site, `$OUT/`, `$SITE/RAPPORT.md`, leçons éventuelles.

## Règles absolues KYW

- **Français** partout (alt, aria-label, title, JSON-LD, 404 compris), vouvoiement. **Aucun tiret cadratin ni demi-cadratin** (site, DESIGN.md, RAPPORT.md).
- **Données réelles** de `donnees.json`/`dossier.md` (nom, adresse, téléphone, horaires, plats, prix, chef, réseaux). Douteuse : ne corrige pas, note-la dans RAPPORT.md.
- **Fictif** seulement pour compléter (plats manquants, prénoms, anecdote) : plausible, modeste, `placeholder: true` dans `site.ts`, listé dans RAPPORT.md. Jamais d'avis, notes, distinctions, guides, logos de presse inventés ; jamais de faux prix présentés comme vrais.
- **Photos** : `$IN/photos/` d'abord, crédit « photos : <restaurant> ». Picsum/Unsplash (`photos.mjs`) en dernier recours, crédité, marqué. Jamais de photo d'inconnus présentée comme l'équipe.
- **Robots et mention** : `<meta name="robots" content="noindex, nofollow">` dans le HTML de chaque page ; « Maquette KYW, certaines données sont illustratives » portée par `KywFooter` (prop `note`).
- **Pied KYW** : `import KywFooter from '@kyw/footer'`, `<KywFooter base={import.meta.env.BASE_URL} />` après ton `<footer>` ; jamais réécrit (surcharge tes variables locales).
- **Réservation** : pas de backend. `tel:`, `mailto:`, lien externe du client ; aucun `fetch` vers un endpoint inexistant, jamais de faux « demande envoyée ».
- **`base`** : tout chemin interne par `import.meta.env.BASE_URL` (liens, favicon, og.png, sitemap, préchargements, images de public/) ; dans les `url()` CSS des `@font-face`, `/<slug>/awwwards/fonts/…` (Vite ne les réécrit pas). Une requête échouée vient presque toujours de là.

## Outillage (pièges transversaux)

- Scripts de la skill lancés depuis `$REPO` (résolution de playwright/axe-core) ; `--dir`/`--out` absolus pour `font.mjs`/`og.mjs`.
- Chromium dans `/opt/pw-browsers` (`PLAYWRIGHT_BROWSERS_PATH`), repli de `browser.mjs`. **Jamais `playwright install`** malgré SKILL.md. « No Chromium found » : cwd ≠ `$REPO`.
- Astro 5.18 (astro.md testé sous 7) : si une API diffère, adapte et note-le dans lecons/construction.md.
- Ne commite ni `.shots/`, `.jury/`, `.qa-root/`, `.astro/`, `sites/*/dist/` (ajoute `.qa-root/` et `.jury/` au `.gitignore` racine s'ils manquent). Jamais `git add -A`.

## Checklist de sur-utilisation

DESIGN.md § « Sur-utilisation de la skill » : chaque phase ajoute ses points numérotés, cochés avec **preuve** (fichier:ligne, capture, champ de `report.json`, ligne d'`audit.txt`) ; sans preuve = non coché.

## Travail et leçons

Chaque phase finit par DESIGN.md et ETAT.md (fait / reste / décisions) à jour, commits en français à l'impératif. Leçon structurelle (méthode, outillage, jamais goût ni contenu) : ajoute à `agents/lecons/construction.md` sous `## <date> · <slug> · variante awwwards` avec Symptôme, Cause, Correction appliquée, À faire par le prochain agent.
