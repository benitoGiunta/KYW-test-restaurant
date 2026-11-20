**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full, une page conservée (`/`) plus `404`
- **Before** · 66 FAIL, 53 REFLEX, 5 WARN (`.hallmark/before.txt`)
- **Keeps** · one-page, hero avec réservation, routes, liens Barestho, bon cadeau, PDF carte et menu, `tel:`, Facebook, Instagram ; e-mail gmail personnel `dropped` (non repris par le dossier)
- **Files** · `src/layouts/Base.astro`, `src/components/{Nav,Photo}.astro`, `src/pages/{index,404}.astro`, `src/data/site.ts`, `src/styles/{page,tokens,base}.css`
- **Shape** · Catalogue (draw 2b8db8, macrostructure 08 one-page conservée), hero Counter
- **Theme** · Hedgerow, dealt 2/3 (seed restaurant-namur-french-brasserie-5952·3e52d83a·2026-11-20·r0) ; écartés : Vellum (blackletter, trop savant pour une brasserie), Solstice (crème et vermillon, étranger au logo olive et or). Hedgerow retenu : papier vert profond lisible comme le vert olive du logo, Prata pour les noms. Écart : teinte du papier ramenée de 158 à 125 (olive), signal chartreuse remplacé par l'or du logo (oklch 84 0.16 85), couleurs lues sur `13-logo-restaurant.png`.
- **Chrome** · nav : bandeau (horaires, téléphone) sur barre collante (marque, ancres, Réserver) ; pied : colonnes d'index
- **Hero** · Counter : titre, phrase, deux actions, photo 01 à droite, comptoir du menu du moment (35 €, 41 €, 6 semaines)
- **Signature** · le prix du menu du moment en Prata, premier chiffre en or
- **Sections** · Hero · Infos (Schedule) · Menu (Switcher menu du moment et carte) · Salle (photo pleine largeur sans titre) · Maison (terrasse et faits) · Réserver (bande crème) · Pied
- **Material** · réel : carte, menu du moment, horaires, adresse, 55 et 20 places, patrons, G&M 12/20 · photos : celles du client (7 sur 12) · absent : plats photographiés, avis, note, baseline
- **Comp** · voir `comp.md` (non capturé en phase 1)
- **Sweep** · phase 3

## Approche
Macrostructure 08 (one-page de restaurant), empreinte `Heading|Body|Divider|Button|Image|Reveal` sans reveal. Posture : calme, une seule page, aucun pattern de scroll. Dérogations : widget flottant Barestho remplacé par le bouton Réserver de la nav et du hero ; `vh` évité (`dvh` non nécessaire). Test miroir : une brasserie voisine n'aurait pas ce papier olive, l'or du logo et le comptoir de prix ; décision changée par rapport au tirage : carte en Switcher plutôt qu'en deux pages.

## Thème (tokens.css)
Papier `oklch(25% 0.05 125)`, encre crème, signal or `oklch(84% 0.16 85)`, bande crème pour la réservation. Prata (titres), Manrope (texte). Carré, plat, filets de 1 px, filet or de 1,5 px sur les listes clés, boutons en pilule.

## Composants
- Carte : Rows (nom colonne 1, prix à droite en chiffres tabulaires), catégories en Prata, filet or ; nom et prix visibles à 375 px (prix sous le nom).
- Switcher : `role="tablist"`, menu du moment ouvert, sans script les deux panneaux sont visibles.
- Horaires : Schedule en `<dl>` avec `<time>`, jours fermés en `--color-muted` non barrés ; jour courant : phase 2.
- Pied : colonnes d'index (adresse, contact, réseaux), pas de « Tous droits réservés » ; puis KywFooter.
- Photo : `<figure data-slot data-alt>`, `width`/`height`, `srcset`, hero `fetchpriority="high"`, autres `lazy`.

## Sur-utilisation
- [x] 1. Audit sloplint before et AUDIT.md · preuve : `.hallmark/before.txt`
- [x] 2. Approche et macrostructure conservées · preuve : § Approche
- [x] 3. deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-6`
- [ ] 4. Comp avant build · raison : comps HTML non capturés (voir `comp.md`), à faire en phase 2
- [x] 5. Build statique, pages et composants · preuve : `pnpm build:site` vert, `dist/philfa/legacy/`
- [x] 6. sloplint src · preuve : 2 FAIL (34 faux positif base.css, 39a corrigé)
