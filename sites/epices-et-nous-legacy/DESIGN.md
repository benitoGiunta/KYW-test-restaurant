# Design : Épices & Nous (variante legacy KYW)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 7 pages (/, /carte/, /menu/, /reservation/, /a-propos/, /actualites/, 404)
- **Before** · 1024 FAIL, 195 REFLEX, 8 WARN (CSS Wix) · une bande brune, de l'italique centré et une photo plaquée ; la carte, le menu et les horaires en texte sont clairs et restent
- **Keeps** · toutes les routes, le lien de réservation Wix, `tel:`, Facebook, Michelin, Gault&Millau, la carte et le menu complets, les horaires, l'histoire, le logo et la couleur orange
- **Files** · create: tout le paquet `sites/epices-et-nous-legacy/` · edit: aucun autre dossier · delete: none
- **Shape** · Split Studio (15), draw 81c201, genre editorial, job: book (action dans la barre sticky et au rebord du hero)
- **Theme** · marque, matière Atelier (dealt 2/3, seed restaurant-namur-french-cuisine-8693·914306b8·2026-11-20·r0). Écartés : Vellum (gothique, cool, trop médiéval), Ink (grotesque blanc et noir, aucune chaleur)
- **Chrome** · nav : barre sticky couleur du logo, liens du site, téléphone et action « Réserver » · pied : letter close puis KywFooter
- **Hero** · Ledge : champ photo haut, titre sur un rebord de papier ; l'offre (menu 52 €) au rebord
- **Signature** · le menu à 52 € posé au rebord du hero sur la photo sombre de la table
- **Sections** · Hero · Histoire (split) · Menu à 52 € (rows) · Ambiances (trio asymétrique) · Énoncé (ris de veau) · Actualités (rows) · Horaires et adresse (schedule) · Pied (lettre)
- **Material** · real : adresse, téléphone, horaires, carte, menu, histoire, liens · pictures : photos du client (23 + logos) · absent : avis, note, e-mail, carte des vins, capacité (aucun inventé)
- **Comp** · 2 built, no key · c1 chosen (`comp.md`)
- **Sweep** · phase 3

## Approche
- **Macrostructure** : Split Studio (draw), empreinte `Hanging|Two-column asymmetric|Hairline|Solid orange + outlined|Margin-aligned|None`. Le site d'origine, un Wix multipage sans macrostructure nommée, ressemblait à 03 Marquee Hero sur l'accueil ; on le garde dans le hero Ledge.
- **Posture** : mêmes routes qu'avant (accueil, carte, menu, réservation, on parle de nous, actualités) ; calme ; aucun pattern de scroll (phase 2 : un reveal au plus).
- **Dérogations** : slider Wix, polaroïd et effets supprimés ; `vh` remplacé par `dvh` (6a) ; Saint-Valentin et « Se connecter » abandonnés (lignes `dropped` en tête de `page.css`) ; barre « search-led » du draw remplacée par une barre de liens (pas de recherche utile sur six pages) ; « prochains créneaux en boutons » refusé (aucune disponibilité réelle : le module Wix reste la réservation).
- **Test miroir** : un voisin avec le même site obtiendrait-il un hero photo plein cadre et un menu en trois rangées ? Pour s'en écarter : le rebord de papier porte le prix, et la lettre de clôture reprend le texte du client.

## Thème
Brand imposée : bande brun taupe du logo `oklch(45.2% 0.022 83)`, orange `oklch(76.9% 0.157 65)` (lus dans le CSS Wix, #F79C31 et #5C5548 mesuré sur le logo), crème `oklch(91.3% 0.032 85)`. Matière Atelier : papier calcaire, encre brun profond, Sentient 300 en titres, Hanken Grotesk en texte, filets, aucune carte flottante. Orange en aplat sous encre sombre (jamais en petit texte sur la bande : 3,2:1) ; texte d'accent sur papier en `--color-accent-deep`.

## Tokens
`tokens.css` est la source de vérité.
```css
:root {
  --color-error: oklch(52% 0.19 27); --color-success: oklch(50% 0.12 150);
  --color-paper: oklch(95.5% 0.018 86); --color-paper-2: oklch(91.3% 0.032 85); --color-paper-3: oklch(86.5% 0.036 82);
  --color-ink: oklch(23% 0.022 62); --color-ink-2: oklch(34% 0.024 64); --color-muted: oklch(46% 0.026 68);
  --color-rule: oklch(79% 0.03 80);
  --color-bark: oklch(45.2% 0.022 83); --color-bark-ink: oklch(94% 0.025 86); --color-bark-muted: oklch(80% 0.025 84); --color-bark-rule: oklch(56% 0.022 83);
  --color-accent: oklch(76.9% 0.157 65); --color-accent-ink: oklch(23% 0.022 62); --color-accent-deep: oklch(47% 0.125 52); --color-focus: oklch(47% 0.125 52); --color-focus-on-bark: oklch(88% 0.12 75);
  --font-display: "Sentient", Georgia, "Times New Roman", serif; --font-body: "Hanken Grotesk", system-ui, sans-serif; --display-weight: 300; --small-serif-weight: 400; --font-outlier: var(--font-body);
  --radius-card: 0; --radius-pill: 3px; --rule-hair: 1px; --shadow-card: none;
}
```

## Composants
- **Carte** : Rows, nom et description à gauche, prix à droite en `tabular-nums` (Sentient 400), filets et non cadres, l'en-tête de catégorie collé à gauche ; nom et prix restent visibles au téléphone (une colonne, prix en bout de ligne). Pas de ♥. Référence : `layout.md` § 5.5.
- **Menu 52 €** : trois blocs Rows, pas de prix par plat ; prix dans le titre.
- **Horaires** : Schedule en `<dl>`, une rangée par groupe de jours, jour fermé en `--color-muted` jamais barré, dits une fois par page, en fin de page (69) ; pas d'icône horloge. Jour courant par étape de surface : phase 2.
- **Pied** : letter close (texte du client en grand, signature « Le duo passionné ! », liens, adresse), puis `KywFooter` ; section et non `footer` (un seul contentinfo).
- **Photo** : `<figure>` avec `data-slot data-alt`, `width`/`height`, `srcset`/`sizes`, hero `fetchpriority="high"`, autres `loading="lazy"`.
- **Boutons** : un plein orange sous encre sombre, un filet d'encre ; 48 px, rayon 3 px ; lien souligné orange foncé.
- **Nav, formulaire, reveal** : phase 2.

## Sur-utilisation
- [x] 1. Audit lancé (`sloplint --render --before`) · preuve : `.hallmark/before.txt`
- [x] 2. Références lues (SKILL, redesign, macrostructures, theme atelier, layout, anatomy, design-md, comp) · preuve : ce fichier
- [x] 3. Deal, draw, scaffold --brand, stamp en ligne 1 · preuve : `src/styles/page.css:1`, `.hallmark/log.json` partagé
- [x] 4. Comp avant build, deux comps, choix écrit · preuve : `comp.md`, `.hallmark/comps/c1.png`
- [x] 5. Données réelles, rien d'inventé · preuve : `src/data/site.ts` (source `donnees.json`, pages Wix)
- [x] 6. Pied KYW sur chaque page, noindex · preuve : grep des 7 pages `dist/epices-et-nous/legacy/`
- [ ] 7. Sweep sloplint rendu, hero review, QA navigateur · phase 3
