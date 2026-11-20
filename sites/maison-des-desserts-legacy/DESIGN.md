# Design: La Maison des Desserts (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** : full (contenu et wiring gardés, système et composition changés). Multi-pages : `/`, `/carte`, `/galerie`, `/contact`, `/jobs` gardées, `/404` ajoutée.
- **Before** : `.hallmark/before.txt` et `before.json` (93 FAIL, 38 REFLEX, 39 WARN sur la sortie Tailwind d'origine ; voir `AUDIT.md`).
- **Keeps** : tous les liens (boutique externe, `tel:`, `mailto:`, Instagram, Facebook, carte PDF), les cinq routes, les horaires, la FAQ de commande, l'histoire, les trois métiers, la carte complète (13 rubriques, 142 lignes).
- **Files** : `src/styles/{page,tokens,base}.css`, `src/layouts/Base.astro`, `src/components/{Nav,Footer,Photo,Schedule}.astro`, `src/pages/*.astro`, `src/data/{site.ts,carte.json,photos.json}`.
- **Shape** : Split Studio, tiré au sort (draw e128aa) ; macrostructure du site d'origine : multi-pages calme à hero photo, empreinte `Heading|Body|Divider|Button|Image|Reveal` conservée dans l'ordre (hero, histoire, trois métiers, appel).
- **Theme** : Atelier, dealt 2/3 (seed restaurant-namur-tea-room-fbc2·0115a272·2026-11-20·r0). Écartés : Vellum (lettre gothique, étrangère à la didone d'origine), Garden (vert verger, hors du registre pâtisserie de luxe tranquille). Choisi sur l'image : papier de chaux, encre brune, serif léger, tirage sur passe-partout : la vitrine de Noël y devient une pièce de catalogue.
- **Chrome** : nav alignée aux bords (nom de la maison à gauche, liens, une action « Boutique en ligne ») · pied : statement (l'adresse en grand sur encre) puis KywFooter.
- **Hero** : Index (draw), swap de la posture Poster d'origine : une photo de vitrine chargée sous un titre en texte clair échoue au contraste ; la photo reste le plus grand élément (7 colonnes sur 12). Titre de six mots, une phrase, deux actions, index de quatre rubriques de la carte.
- **Signature** : la façade tirée comme une épreuve sur passe-partout de coton, son état pencillé sous l'image (« vitrine de Noël »).
- **Sections** : Hero (Index) · Salle (Showcase 7 et 4, deux portraits) · Histoire (Statement, lettrine ardoise) · Métiers (Rows) · Suggestions (Split : Rows de plats, photo) · Commander (Q/R et dates des fêtes) · Venir (Schedule) · Pied (statement).
- **Material** : real : adresse, téléphone, horaires, carte, histoire, FAQ, dates de commande · pictures : photos du client, 15 sur 19 (3 vignettes de banque d'images et le logo non repris) · absent : avis, notes, presse, équipe, métriques (aucun inventé) · fictif : aucun.
- **Comp** : 2 built, no key · c1 chosen (`comp.md`).
- **Sweep** : phase 3.

## Approche
- Macrostructure : multi-pages calme, hero photo, sections courtes empilées ; garde les routes d'origine. Mirror test : un voisin avec la même vitrine obtiendrait un hero plein écran sombre ; ici, papier clair, tirage encadré, index de carte : décision changée, la couleur de fond et la place de la photo.
- Dérogations : hero Poster vers Index (contraste, voir plus haut) ; carrousel : aucun ; `vh` remplacé par `dvh` (max-height du tirage) ; faux envoi : `data-endpoint=""` (formulaires contact et jobs, sans handler) ; vignettes de banque d'images : non reprises (gate 83) ; bascule clair/sombre : supprimée (Atelier est une matière claire), ligne `dropped` dans le stamp ; logo bitmap doré : remplacé par le nom en Sentient (échoue sur papier clair) ; widget Turnstile : supprimé (pas d'endpoint) ; bandeau « Noël — 25 déc. » : repris comme ligne de la section Commander (dates des fêtes de la carte PDF).

## Thème
Atelier, tokens lus dans `src/styles/tokens.css` (jamais depuis le thème).

```css
:root {
  --color-paper: oklch(94.5% 0.010 76); --color-paper-2: oklch(91.8% 0.013 74); --color-paper-3: oklch(88% 0.015 72);
  --color-ink: oklch(19% 0.024 52); --color-ink-2: oklch(31% 0.018 54); --color-muted: oklch(47% 0.014 60); --color-rule: oklch(81% 0.011 70);
  --color-accent: oklch(41% 0.075 248); --color-accent-ink: oklch(96% 0.008 76); --color-focus: oklch(50% 0.095 248);
  --font-display: "Sentient", Georgia, serif; --font-body: "Hanken Grotesk", system-ui, sans-serif;
  --radius-card: 0; --radius-pill: 3px; --rule-hair: 1px; --shadow-card: (tirage sur coton, voir tokens.css);
}
```
Genre editorial · axes light/roman-serif/cool · posture restrained. Polices : Sentient 300 et 400 (Fontshare), Hanken Grotesk 400 (Google Fonts), trois graisses au total. Photos : filtre `warm con=-6 vib=-10` du thème appliqué par `base.css`. Couleur de marque : aucune imposée (le doré du logo n'est pas repris, voir dérogations).

## Controls
- Primary : fond ardoise (`--color-accent`), rayon 3 px, 44 px de haut.
- Secondary : filet d'encre, même rayon et même hauteur.

## Motion
- Character : still. Aucune animation en phase 1 ; phase 2 : un reveal au plus, Switcher des métiers et jour courant dans les horaires, nav `popover` sous 60 rem. Sous `prefers-reduced-motion`, tout est immédiat.

## Composants
- **Carte** : Rows (titre colonne 1, prix à droite en Sentient 400 `tabular-nums`, description sous le titre), précédée d'un Index sticky des 13 rubriques ; filets d'encre en tête de liste, jamais de tuile ni de carte dans une carte. Nom et prix visibles au téléphone (grille `1fr auto`). Prix nuls (pâtisseries du comptoir, chocolat chaud viennois, galette, biétrumés) : ligne sans prix, rien d'inventé. Apercu en accueil : 5 suggestions de l'automne.
- **Horaires** : Schedule (`layout.md` § 5.16), `<table>` avec `<time>`, jour fermé en `--color-muted` sans rature, dits une fois par page (accueil : section Venir ; contact : colonne gauche) ; le pied ne les répète pas. Jour courant : phase 2. Pas d'icône horloge.
- **Pied** : statement, 200 à 400 px, adresse en grand, téléphone, e-mail, Instagram, Facebook, boutique, `data-credits`, puis KywFooter ; ni « Tous droits réservés » ni newsletter.
- **Photo** : `<figure>` avec `<div data-slot data-alt>` + `<img width height srcset sizes>`, hero `fetchpriority="high"` non lazy, autres lazy, légende hors du slot (= le champ `sujet` de `photos/index.json`).
- **Formulaires** : champs ruled sur carte de coton, `data-endpoint=""`, états complets en phase 2.

## Sur-utilisation
- [x] 1. Hallmark sur-utilisé : audit, deal, draw, scaffold, stamp, comp, build · preuve : `AUDIT.md`, `.hallmark/log.json`, `src/styles/page.css:1`, `comp.md`
- [x] 2. Stamp en première ligne de `page.css`, critique et waivers dans les 40 premières lignes · preuve : `src/styles/page.css:1-9`
- [x] 3. Floor 1 (jetons) : aucune couleur ni police littérale après le bloc de jetons · preuve : `grep` sur `page.css` (sloplint src : 0 FAIL hors faux positif 34)
- [x] 4. Gate 34 : `overflow-x: clip` sur html et body dans `base.css` (le FAIL 34 de `Base.astro` est le faux positif connu de `sloplint src`, prouvé en navigateur en phase 3) · preuve : `src/styles/base.css:3`
- [x] 5. Aucun tiret cadratin ni demi-cadratin dans `src/` · preuve : `grep -rn "—\|–" src` vide
- [x] 6. Noindex et mention : meta robots dans `Base.astro`, mention portée par KywFooter, pied sur les 6 routes · preuve : `grep` des `dist/` (kyw-signature présent sur 6 pages)
- [x] 7. Aucune donnée inventée : 0 placeholder, 0 avis, 0 métrique · preuve : `src/data/site.ts` (sources dans l'en-tête), `carte.json` généré depuis `donnees.json`
- [ ] 8. Qualité en navigateur (fold 1280 x 800, 375, contraste, axe) : phase 3 (réservée) · raison : pas de QA navigateur en phase 1
- [ ] 9. Animations, nav mobile, états des contrôles : phase 2
