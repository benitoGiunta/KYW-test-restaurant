**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 pages (/, /restaurant/, /menu/, /boutique/, /contact/, 404)
- **Before** · Floor 515 FAIL (dont 269 de gate 48) · Reflex 42 · tout en bordeaux nuit, capitales espacées, focus absent ; la carte, le flambage et la voix restent
- **Keeps** · routes, liens (Barestho, tel:, mailto:, Facebook, Instagram, Itinéraire), la carte complète, horaires, les photos, la couleur bordeaux et la flamme de la marque, la police Marcellus
- **Files** · create : tout `sites/huile-sur-le-feu-legacy/` · edit : aucun autre dossier · delete : aucun
- **Shape** · Photographic (08, kept) avec corps Bento (draw 47923d), genre editorial, job : réserver, l'action dans la nav, le hero et la fin
- **Theme** · brand (couleurs lues dans le CSS du site : #3f1420, #2a0d16, #aaab3d, #f08a32, #e32929 ; polices Marcellus + Nunito Sans), dealt 0/3, seed restaurant-namur-mediterranean-italian-b345·716cc7a0·2026-11-10·r0. Écartés : Vellum (blackletter ultramarine : mauvaise matière), Squeeze (marché de fruits vert forêt : ton enfantin), Atelier (calcaire luminous bleu ardoise : fait oublier le feu). Aucun ne porte le bordeaux, la marque est imposée, scaffold `--brand`.
- **Chrome** · nav : barre bordeaux, logo à gauche, cinq liens, un seul bouton flamme · footer : statement (une phrase, puis liens, réseaux, mentions) puis KywFooter
- **Hero** · Poster (kept) : 04 flambage plein cadre, texte bas gauche, titre 5 mots, une phrase de 11 mots, une action pleine et un lien
- **Signature** · le cadre flambé sous voile bordeaux avec l'unique bouton orange flamme
- **Sections** · Hero · Teaser carte (Rows) · Salle (photo pleine largeur, sans titre) · Bento 4 tuiles (huile, pâtes, boutique, histoire) · Horaires (Schedule) + réservation · Pied statement
- **Material** · real : adresse, horaires, tel, carte, menus, 2005, Pouilles, Oliviers & Co, 13 photos du client · pictures : photos client, aucune photothèque · absent : note, avis, presse, chiffres, logos
- **Comp** · 2 built, no key · c1 chosen (`comp.md`)
- **Sweep** · phase 3

## Approche (conservée)
Macrostructure 08 Photographic, empreinte `Heading small on plate|Rows and Bento|Image edge|Typographic link|Full bleed client photo|None`. Posture : mêmes routes (/, /restaurant, /menu, /boutique, /contact) ; hero Poster ; calme (le site animé WebGL passe à un reveal au plus, phase 2). Dérogations : sélecteur de langue EN/IT/NL, bannière de cookies, /privacy, /cookies et widget Barestho en page abandonnés (`dropped`, maquette sans traduction ni mentions ; la réservation garde l'URL Barestho et le téléphone) ; gabarit hero + 3 atouts + CTA gardé en séquence, composition neuve (waive 8 non nécessaire, Bento) ; `vh` en `dvh` ; carte menu en rangées. Test miroir : un voisin avec le même site, même hero et bandes bordeaux ? Le papier crème à bande bordeaux et la tuile Bento sans photo en tête sont le choix propre ; changé : le hero ne centre pas (bas gauche) et l'histoire passe en tuile, pas en section.

## Thème
Brand sur papier clair (`--color-paper` crème huile), bandes drenchées bordeaux (`--color-paper-3`), olive pour le filet de citation, flamme orange pour l'action sur fond sombre, flamme rouge profond (`--color-accent`) pour l'action sur fond clair. Marcellus (marque) en titres, Hanken Grotesk en texte (Nunito Sans d'origine remplacée pour sortir du gabarit d'origine). Valeurs : `src/styles/tokens.css`.

## Composants
- **Carte** : Rows (nom col. 1, prix à droite `tabular-nums`, description dessous, filet), `Rows.astro` ; index de catégories collant sur /menu ; menus Gourmet et Enfants en deux tuiles (7 et 5), pas de carte dans carte. Switcher midi/soir refusé : la carte ne les distingue pas.
- **Horaires** : Schedule en `<dl>` sept jours, fermé en `--color-muted` (pas barré), pas d'icône ; jour courant en phase 2. Dits une fois, à la fin de chaque page.
- **Pied** : statement « Une huile choisie pour chaque plat. » (phrase du site /menu), colonnes liens, réseaux, mentions, crédit photo ; pas de « Tous droits réservés », pas de newsletter ; un `<div role="group">`, jamais un second `<footer>`.
- **Photo** : `Photo.astro`, `<div data-slot data-alt data-credits>` avec `width`/`height`, `srcset` 800w/native, `object-position`, hero `fetchpriority="high"`, autres `loading="lazy"`.
- **Nav, bouton, formulaire, reveal** : états finis en phase 2 (menu mobile popover, jour courant, un reveal).

## Sur-utilisation
- [x] 1. Tokens uniquement, aucune couleur ni police au-delà du bloc :root · preuve : sloplint page.css, 0 FAIL 48
- [x] 2. Pas de capitales espacées ni points médians, tirets cadratins nuls · preuve : scan Python des six pages, 0 tiret
- [x] 3. Hero ≤ 7 mots, une phrase, deux actions, visible à 1280 x 800 · preuve : `src/pages/index.astro:16-24`, sloplint sans 44b
- [x] 4. Pied KYW sur chaque page, `noindex` partout · preuve : grep `kyw-signature` et `noindex` sur les six HTML de dist
- [x] 5. Aucun chiffre ni avis inventé · preuve : `src/data/carte.json` issu de donnees.json ; aucune note, aucun avis
- [ ] 6. Contraste et focus mesurés en navigateur · phase 2
- [ ] 7. Reveal, menu mobile, jour courant · phase 2
- [ ] 8. Revue hero, sloplint final, captures · phase 3
