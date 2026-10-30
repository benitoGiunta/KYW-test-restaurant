# `cahier` : gabarit KYW construit depuis `_socle` (voir DESIGN.md, FICHE.md, RAPPORT.md)

Socle **neutre** (zéro design) mais **complet** (toute la plomberie) à partir duquel chaque gabarit de `gabarits/<id>/` est
construit. Il est vérifié : build, `shoot.mjs` et `audit.mjs` passent avec 0 erreur console, 0 lien cassé, 0 FAIL,
aucun débordement, reduced-motion et navigation clavier OK. Le socle lui-même ne se publie pas.

## Démarrer un gabarit

```bash
cp -r gabarits/_socle gabarits/<id>          # depuis la racine du dépôt
sed -i 's/"name": "gabarit-socle"/"name": "gabarit-<id>"/' gabarits/<id>/package.json
pnpm install                                  # enregistre le paquet dans le workspace (pnpm-workspace.yaml : gabarits/*)
node scripts/build-site.mjs gabarits/<id>     # → dist/gabarits/<id>/ ; contrôle noindex + pied de page KYW
node .claude/skills/awwwards/scripts/serve.mjs dist --port 4400 &
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node .claude/skills/awwwards/scripts/shoot.mjs http://127.0.0.1:4400/gabarits/<id>/ --crawl --nav
node .claude/skills/awwwards/scripts/audit.mjs http://127.0.0.1:4400/gabarits/<id>/
```

`gsap`, `lenis`, `astro`, `@astrojs/sitemap` et `sharp` sont des dépendances de la racine (hoistées) : ne pas les
redéclarer. Le socle n'a qu'une dépendance propre, `@kyw/footer` (workspace).

## Arborescence

```
astro.config.mjs        site/base injectés par scripts/build-site.mjs (KYW_SITE, KYW_BASE) ; sitemap ; prefetch
src/engine/             moteur de motion de la skill awwwards (copie fidèle de references/engine.md, sans le module GL)
src/engine/astro.ts     adaptateur ClientRouter (references/astro.md)
src/styles/engine.css   fondation + CSS du moteur (copie fidèle)      → NE PAS TOUCHER
src/styles/tokens.css   jetons de design : les NOMS sont le contrat, les VALEURS sont à réécrire
src/styles/base.css     styles neutres du socle                        → À REMPLACER par le design du gabarit
src/motion/setup.ts     motion globale : setTransition, setLoaderFormat, setLoaderExit (à écrire par gabarit)
src/lib/url.ts          u('/carte/') et asset('/photos/x.webp') : préfixent import.meta.env.BASE_URL
src/data/site.ts        type Restaurant + données réelles des Potes au Feu (placeholder: true sur les trous comblés)
src/layouts/Base.astro  head SEO (title, description, canonical, OG, twitter, noindex, JSON-LD Restaurant, favicon,
                        préchargement de polices), script de flags avant le premier rendu, ClientRouter, couches persistées
                        (#gl, #curtain, #cursor), Loader, Header, <main id="main">, Footer (+ KywFooter), start du moteur
src/components/         Loader (crochets data-loader-*), Header (nav, aria-current), Footer (restaurant + KYW)
src/pages/              index, carte, histoire, reservation (formulaire sans backend → outil réel, tel:, mailto:), 404
public/                 robots.txt (Disallow: /), favicon.svg, og.jpg (1200x630), photos/*.webp (≤ 1800 px, sharp)
```

## Ce qu'un gabarit personnalise

- `tokens.css` (toutes les valeurs), `base.css` (tout), les polices (fichiers dans `public/fonts/`, `@font-face` dans
  `tokens.css`, chemins dans la liste `polices` de `Base.astro`), `favicon.svg`, `og.jpg`.
- `motion/setup.ts` : le rideau de transition, le format et la sortie du loader. Les valeurs par défaut du moteur ne
  doivent jamais être livrées telles quelles.
- `components/Loader.astro`, `Header.astro`, `Footer.astro` : le markup et le style, en gardant les crochets
  (`data-loader-out`, `data-loader-count`, `data-loader-bar`, `#main`, `KywFooter`).
- Les pages : composition, sections, attributs `data-split`, `data-reveal`, `data-intro`, `data-parallax`,
  `data-magnetic`, `data-cursor` (API dans `.claude/skills/awwwards/references/engine.md`).
- `data/site.ts` : au moment d'adapter le gabarit à un restaurant, on remplace les données ; le type `Restaurant` est
  le contrat commun à tous les gabarits (ne pas le réduire ; l'étendre si besoin).

## Ce qui ne se touche pas

- `src/engine/*` et `src/styles/engine.css` : le moteur. Pour ajouter le WebGL, suivre `references/webgl.md` (fichiers
  `src/engine/gl/` + remettre les lignes `// GL` dans `src/engine/index.ts`) ; `#gl` est déjà dans le layout.
- Les invariants du layout : `lang="fr"`, `<meta name="robots" content="noindex, nofollow">`, le lien d'évitement
  « Aller au contenu », `transition:persist` sur `#gl`, `#curtain`, `#cursor`, `transition:animate="none"` sur
  `<html>`, `<KywFooter base={import.meta.env.BASE_URL} />` en pied de page, `import.meta.env.BASE_URL` pour tout lien
  interne (via `u()` / `asset()`), `width`/`height` sur chaque `<img>`.

## Pièges connus (Astro 5.18, `base`, moteur)

- **Tout lien ou asset doit passer par `u()` / `asset()`** : le site vit sous `/gabarits/<id>/` (ou
  `/<slug>/<variante>/`), jamais à la racine. Un `href="/carte/"` en dur casse. `Astro.url.pathname` contient déjà la
  base au build (le canonical le reprend tel quel). `import.meta.env.BASE_URL` peut arriver avec ou sans `/` final selon
  la version d'Astro : `url.ts` normalise.
- Le logo du pied de page KYW est copié dans `public/kyw/` par `scripts/build-site.mjs` : en `astro dev` lancé à la
  main, copier `packages/kyw-footer/kyw-signature-720.webp` dans `public/kyw/` pour le voir.
- `<script>` Astro : bundlé et exécuté **une seule fois** par site. Tout code DOM passe par `onPage()` (voir
  `pages/reservation.astro`), avec un test de présence puisque la fonction tourne sur chaque page.
- `data-split` uniquement sur du texte statique (SplitText réécrit le DOM). Les éléments `[data-split]` et
  `[data-reveal]` sont `visibility: hidden` sous `html.motion` : si un élément reste invisible, c'est qu'il n'a pas
  été initialisé (il est hors de `document` au moment d'`initPage`, ou ajouté après coup).
- Le loader joue au premier chargement seulement (l'adaptateur le retire après chaque swap). Il relève le LCP d'environ
  2,5 s (plancher 1,1 s + sortie) : c'est voulu par le moteur ; ne pas le « corriger » en supprimant le `#loader`.
- `shoot.mjs --crawl` classe les pages par premier segment de chemin : sous `base`, toutes les pages internes sont
  « gabarits-item » et une seule est capturée. Capturer les autres une par une (`shoot.mjs <url de la page>`), et la
  404 via `<base>/404` (la 404 de l'origine est celle de `dist/`, pas du gabarit).
- `shoot.mjs` note `skipLinkFirst: false` parce qu'il cherche « skip » ou « #main » dans le libellé : le lien
  « Aller au contenu » est bien le premier arrêt clavier (voir `keyboard.stops`).
- `audit.mjs` cherche `robots.txt` et le sitemap à la racine de l'origine : sous `base`, ces deux WARN sont normaux ;
  les fichiers existent sous `/gabarits/<id>/`.
- Le lien « Réalisé par » du pied de page KYW fait 22 px de haut (`smallTargets`) : composant partagé, à ne pas modifier
  dans un gabarit.
