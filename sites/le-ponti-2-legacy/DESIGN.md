**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 3 pages (/, /menu/, /contact/) plus 404
- **Before** · 191 FAIL, 76 REFLEX (thème Divi/WordPress) ; la carte HTML et la palette crème et bordeaux restent
- **Keeps** · routes, lien Barestho, tel:, mailto:, Facebook, toutes les données de la carte et les horaires
- **Files** · create : tout le paquet sites/le-ponti-2-legacy ; delete : aucun. Dropped : sélecteur de langue FR/EN/NL (pas de contenu EN/NL fourni), bouton Barestho flottant (la réservation est dans l'en-tête et chaque section), 6 planches PNG de la carte (doublon de la carte HTML), bannière cookies Complianz (hors maquette)
- **Shape** · Catalogue, tirage 781aef, multipage conservé
- **Theme** · Solstice, dealt 3/3, seed restaurant-namur-italian-trattoria-472d·32280e9c·2026-11-10·r0. Écartés : Vellum (gothique, trop savant pour une trattoria), Spore (sombre, la table dressée claire du client en pâtirait)
- **Chrome** · nav : masthead en trois parties (liens, nom en Yeseva, téléphone et Réserver) · footer : index columns
- **Hero** · Ledge : champ photo pleine largeur, titre et action au pied
- **Signature** · le prix du menu 3 services, 40 €, en très grand sur la bande brune
- **Sections** · Hero · Façade (photo sans titre) · Catalogue de la carte (9 rubriques) · Menu 3 services (bande) · Horaires et adresse · Footer
- **Material** · real : photos du client (4), carte de 99 lignes, horaires, adresse · absent : histoire, équipe, avis, vins
- **Comp** · 2 construites, c1 retenue (comp.md)
- **Sweep** · phase 3

## Approche
Macrostructure Catalogue (11), empreinte Display serif|Sans|Filet noir 2 px|Pilule pleine|Pleine largeur|Aucun reveal. Posture calme, hero Ledge (tirage), réservation en tête de page. Dérogations : hero « texte et photo côte à côte » devient champ pleine largeur (Ledge) ; un seul pattern de scroll, aucun en phase 1. Test miroir : un voisin avec le même site ne combinerait pas Solstice cuit au bordeaux, un catalogue de neuf rubriques chiffrées et le prix du menu en signature ; changé : l'accent vermillon du thème devient le bordeaux du client (#701f2b, site-actuel/page.html).

## Thème
Solstice, long-light. Papier crème, encre brune, filets or, Yeseva One, Archivo, Archivo Narrow. Accent : bordeaux du client à la place du vermillon, jamais un second chaud ; l'or ne colore jamais un texte. Photos du client sans filtre sépia (`[data-slot] > img { filter: none }`), leur chaleur est la bonne.

```css
--color-paper: oklch(94% 0.03 80); --color-ink: oklch(27% 0.05 50);
--color-accent: oklch(34% 0.10 15); --color-gold: oklch(74% 0.14 75);
--font-display: "Yeseva One"; --font-body: "Archivo"; --font-outlier: "Archivo Narrow";
```
(source : src/styles/tokens.css)

## Composants
- **Carte** : sur l'accueil, grille de neuf cartes uniformes (filet noir, chiffre ou photo, nom, nombre de plats, fourchette de prix calculée des données) ; sur /menu/ Rows (nom et description à gauche, prix `tabular-nums` à droite, filets), index d'ancres, jamais de tuiles icône.
- **Horaires** : Schedule en `<dl>` avec `<time>`, lundi fermé en `--color-muted`, dit dans un puits (bordure 2 px, filet or, ombre dure) ; jour courant en phase 2.
- **Pied** : index columns (nom en Yeseva, adresse, contact, plan du site), crédits `data-credits`, puis KywFooter ; horaires non répétés.
- **Photo** : `<figure>` avec `data-slot` et `data-alt`, `width`/`height`, hero `fetchpriority="high"`, autres lazy, légende = un fait.
- **Boutons** : pilule bordeaux (Archivo Narrow 600) et lien souligné ; états hover, active, focus-visible.

## Sur-utilisation
- [x] 1. Hallmark SKILL.md, redesign.md, gates, patterns, layout, anatomy, genre, thème lus · preuve : cette phase
- [x] 2. deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-3, .hallmark/log.json
- [x] 3. audit sloplint --before · preuve : .hallmark/before.txt
- [x] 4. deux comps avant build · preuve : .hallmark/comps/o1, o2
- [x] 5. sloplint --render sur /, /menu/, /contact/ · preuve : 0 FAIL, 0 REFLEX (/menu/ : 1 NOTE)
- [ ] 6. motion, états, formulaires, revues · phase 2
- [ ] 7. balayage final, review finish · phase 3
