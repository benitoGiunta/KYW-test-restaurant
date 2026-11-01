Phase 1 sur 3 de la variante awwwards (construction-1) : brief, concept, système DESIGN.md, scaffold, engine, layout, contenu, pages statiques, build. À lire après commun.md.

# Phase 1 : du brief aux pages statiques

Sans animation avancée ni QA navigateur complète. Lis d'abord en entier `$SKILL/SKILL.md` (principes, **règles dures**, carte des références) et `$SKILL/references/quality-bar.md` (« What gets punished », grille, « An 8 needs »). Références ci-dessous : `$SKILL/references/<nom>`.

## 1. Brief (`content.md`, SKILL.md § Phase 0)

1. Lis `dossier.md`, `donnees.json`, regarde chaque photo de `$IN/photos/` (sujet, lumière, cadrage ; planche-contact `python3 scripts/planche.py`) avant tout concept.
2. DESIGN.md § Brief : sujet, publics (midi, soir, touristes, habitués), métier (réserver, venir, carte), ressources, contraintes (statique, `base`).
3. Faits manquants = hypothèses explicites ; tout complément `placeholder: true` (content.md « Honest placeholders »). Aucune question : décide et note.

## 2. Concept (`concepts.md`, quality-bar.md Creativity)

1. **Trois concepts de trois territoires** : nom/étymologie, matière du métier (feu, pâte, service, cave, marée, saison), lieu et culture (Namur, Meuse, Sambre, citadelle, ruelles, marché, pierre bleue, wallon), métaphore du travail (brigade, coup de feu, mise en place), système formel (la carte comme seule structure, un corps de texte, rythme horaire).
2. Pour chacun : phrase, règle de mise en page, verbe, voix typo, source de palette, signature + recette `motion.md`/`webgl.md`, frame partageable, **ancre** (fait réel propre au restaurant).
3. **Test de l'échange** : si la phrase tient avec un autre restaurant, c'est un style. Note originalité, adéquation, faisabilité, portabilité de 1 à 5 (portabilité : bas = mieux), choisis (raison d'une ligne) ; un concept écarté ne fournit qu'un détail (404, loader, pied).
4. **Interdits** : les exemples travaillés de concepts.md (page qui refroidit comme une braise, carte en pavage, mise en place qui glisse sur le gril, cadre, solde courant, phrase unique). Tue un concept qui n'existe que dans le hero : il doit tenir jusqu'au pied, à la carte et à la 404.
5. **Concept Card** dans DESIGN.md, format exact : `Idée / Métaphore / Signature (et recette) / Émotion (3 premières secondes) / Verbe / Capture / Ancre / Théâtre (loader oui/non et pourquoi ; GL oui/non et pourquoi)`.

## 3. Système (`art-direction.md`, `typography.md`, `layout.md`, `anatomy.md` : pas de figure explicative)

- **Palette** 4 à 6 hex par rôle (`ground`, `ink`, `muted`, `line`, `accent`, `curtain`), dérivée du monde du concept, références réelles nommées ; `#000`/`#fff` permis. Défaut n° 1 (crème #F4F1EA + serif contrasté + terracotta) interdit sauf justification écrite ; idem acide sur noir, dégradés violets, verre dépoli, eyebrow sur chaque titre, 01/02/03 décoratifs, Inter/Fraunces/Instrument Serif/Playfair par réflexe.
- **Typo** 1 à 2 familles à rôles, sources de la bibliothèque de typography.md téléchargeables par `font.mjs` ; échelle fluide `--t-mega`…`--t-xs` ; display : interlettrage négatif par taille, interligne 0,85 à 1,05, alignement optique, `text-wrap: balance`, descendantes non coupées ; corps 16 à 18 px, interligne 1,45 à 1,6, mesure 45 à 70 car. ; UI 12 à 14 px en AA ; prix `tabular-nums` ; insécables « 24 € », « 12 h 30 » ; « » et vraies apostrophes.
- **Grille** 12 colonnes (4 ou 6 au téléphone), 2 ou 3 lignes verticales fortes, 3 ou 4 humeurs d'espacement (jamais un padding constant). Une règle de rayon.
- **Mouvement (à planifier)** : famille d'easing de l'engine (`ease.out|inOut|soft|spring`), durées du tableau Timing, traduction du verbe ; **rôles de hover** (CTA « Réserver »/« Appeler », nav, plats/images, liens texte, utilitaires), 2 ou 3 traitements au total ; **état de repos** (objet qui bouge au repos, ou immobilité décidée et motivée).
- **Plan de composition** : wireframe ASCII par section, familles différentes dans une page (poster, index, paire asymétrique, mur, filmstrip si vraie séquence, narration collante, statement, données, média plein cadre, pied final) ; patron de la carte (liste index avec aperçu curseur et vignettes au toucher, paires décalées, mur). **Mobile 390 px** composé, signature adaptée.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Change chaque oui, note-le.

## 4. Scaffold, engine, layout (`astro.md`, `engine.md`, `content.md`)

```bash
mkdir -p $SITE/src/{layouts,pages,components,styles,engine,motion,data,assets/photos} $SITE/public/fonts
# package.json : { "name": "site-<slug>-awwwards", "private": true, "type": "module", "dependencies": { "@kyw/footer": "workspace:*" } }
# astro.config.mjs : defineConfig({ site: process.env.KYW_SITE || 'https://kyw-test-restaurant.vercel.app', base: process.env.KYW_BASE || '/',
#   trailingSlash: 'ignore', build: { format: 'directory', inlineStylesheets: 'auto' }, integrations: [sitemap()] (@astrojs/sitemap),
#   prefetch: { prefetchAll: true, defaultStrategy: 'hover' } })
cd $REPO && scripts/q.sh install pnpm install
node -e "require.resolve('playwright'); require.resolve('axe-core'); require.resolve('gsap'); require.resolve('lenis')"
```

- **Engine** : `src/engine/{env,scroll,reveal,loader,interactions,transition,index}.ts` **verbatim** d'engine.md, `astro.ts` d'astro.md. Sans GL, supprime les lignes `// GL` d'`index.ts` (avec GL : `src/engine/gl/{index,shaders}.ts` de webgl.md, `imageFragment`/`revealMask` au concept). `tokens.css`, `engine.css` dans `src/styles/` : noms = contrat, valeurs = ton système (livrer les défauts = échec).
- **Base.astro** : `<html lang="fr" transition:animate="none">`, script inline `.js` + `.motion` avant le paint, `<ClientRouter fallback="swap" />` ; `<body>` : skip link « Aller au contenu » (`#main`) en premier, `#gl` (si GL), `#curtain`, `#cursor` facultatif en `transition:persist`, `<Loader />` seulement si le concept en a un, `<header>`, `<main id="main" tabindex="-1">`, ton `<footer>`, `KywFooter`.
- **Head** : titre unique `<page> | <restaurant>`, description unique 120 à 160 car., canonical, `theme-color`, OG (title, description, url, image absolue), `twitter:card`, favicon SVG, lien sitemap, meta robots ; JSON-LD `Restaurant` (name, address PostalAddress, telephone, servesCuisine, openingHoursSpecification, url, image, sameAs), `Menu` facultatif.
- **Polices** (depuis `$REPO`) : `node $SKILL/scripts/font.mjs fontshare <slug> <graisses> --as "<Nom>" --dir $SITE/public/fonts` ou `font.mjs google "<Famille>" <graisses|100..900> --as "<Nom>" --dir … [--italic]`. `@font-face` dans tokens.css (url `/<slug>/awwwards/fonts/…`), préchargements `${import.meta.env.BASE_URL}fonts/…` + `crossorigin`. Latin suffit (pas de `--ext`). ≤ 4 fichiers, ≤ 2 préchargés (utilisés, au-dessus de la flottaison).
- **Contenu** `src/data/site.ts` : `restaurant` (coordonnées, horaires, réseaux, `reservationUrl`), `plats[]` (nom, description, prix nombre, catégorie, `placeholder?`), `equipe[]`, `histoire[]`, `photos[]` (fichier, alt, crédit) ; hypothèses en commentaire de tête.

## 5. Pages statiques et images

HTML sémantique, mise en page **complète et belle sans `.motion`** (mouvement en phase 2).
- Accueil : nom, cuisine, action en 3 s. Carte : plats réels, prix tabulaires, catégories en listes, un patron. Histoire : 60 à 120 mots honnêtes, photos du client, équipe réelle ou placeholder marqué.
- Réservation : CTA `tel:` (+ lien externe de donnees.json), `mailto:`, adresse, horaires en liste, plan en lien externe (pas d'iframe). Formulaire seulement `action="mailto:…"` (« Ouvrir mon e-mail »). Vrai contenu (accès, parking, terrasse) contre le WARN « only n words ».
- 404 dans la voix du concept, `<h1>` et chemin de retour.
- **Images** : dans `src/assets/photos/`, `<Image>`/`<Picture>` d'`astro:assets` (AVIF/WebP, `width`/`height`, `sizes`, lazy sous la flottaison, hero `fetchpriority="high"`, `decoding="async"`), ≤ 2000 px, < 500 Ko ; alt descriptif, `alt=""` si décoratif. Manquante : composition typo ou couverture GL ; `photos.mjs` en dernier recours (`credits.json` au colophon). Jamais de faux écrans en `div`.
- **Grille et marges** : un `.wrap` ne reçoit jamais `padding: X 0` (annule le gutter), seulement `padding-block`. Hero en grille : texte et média `grid-row: 1` sur des colonnes disjointes. Avant de rendre la main, mesure par mini-script Playwright (`launch()` de browser.mjs) le `getBoundingClientRect()` du h1, des CTA et du média du hero à 1440×900, 1280×720, 1024×768, 390×844, et le `left` de chaque `.display` (≥ gutter). Jamais de `src/pages/` vide en fin de phase.

## 6. Build et checklist

`cd $REPO && scripts/q.sh build pnpm build:site sites/$SLUG-awwwards` doit passer. Ajoute à DESIGN.md § Sur-utilisation (règles détaillées ci-dessus), prouvés :
1. Trois concepts, trois territoires, notés, ancre, test de l'échange. 2. Aucun exemple travaillé. 3. Concept Card exacte, verbe compris. 4. Concept au pied, carte, réservation, 404. 5. Un moment signature et sa recette. 6. Palette 4 à 6 rôles, références réelles. 7. Aucun des 8 « defaults to avoid » (ou justification). 8. Test de généricité. 9. « Details that separate 7 from 8 » : sélection, focus dans l'accent, favicon de l'identité, OG composée, pied comme composition finale, 404 dans le concept.
10. Polices. 11. Échelle fluide unique, grands sauts. 12. Display réglé. 13. Corps et UI. 14. Typographie française.
15. Grille, lignes fortes, cadre quatre coins ou équivalent justifié. 16. Famille de section au plus une fois par page. 17. Hero en 3 s. 18. Mobile 390 recomposé (type re-réglé, lignes `auto`, strips `overflow-x` + `scroll-snap`, signature adaptée).
(Les points 42 à 63 sont ajoutés en phase 3, mais leurs règles, ci-dessus et dans commun.md, s'appliquent dès maintenant.)

Termine par ETAT.md et un commit.
