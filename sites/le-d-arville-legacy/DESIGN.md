**Hallmark · v2.0.0 · variante legacy KYW**
- **Redesign** : full, contenu et wiring gardés, système et composition neufs.
- **Before** : `.hallmark/before.txt` (283 FAIL, 102 REFLEX, 23 WARN sur le HTML Divi) ; `AUDIT.md`.
- **Keeps** : huit routes (accueil, carte, photos, séminaires, chambres, chèque cadeau, réservation, traiteur), lien de réservation Zenchef (page ledarville.be/reservation), `tel:`, `mailto:`, Facebook (deux pages), PDF des vins, hero plein écran, copie du client.
- **Files** : `src/styles/{tokens,base,page}.css`, `src/layouts/Base.astro`, `src/components/{Nav,Fig,Horaires,Pied}.astro`, `src/data/site.ts`, `src/pages/*.astro`, `public/photos/*.webp`.
- **Shape** : Photographic (08), gardée. Empreinte : `Heading petit sur plaque|Body bandes photo et sections de papier|Divider bord de l’image|Button lien typographique et filet|Image plein cadre|Reveal aucun`.
- **Theme** : Atelier (deal 2/3, seed `restaurant-namur-gastronomic-seasonal-e85e·ef2833fe·2026-11-20·r0`). Écartés : Vellum (lettre gothique, étrangère à une ferme de briques), Hedgerow (vert sombre, exige des photos en basse lumière alors que celles du client sont claires, HDR 2018). Atelier : papier chaux, encre brune, Sentient léger, passe-partout sur carton ; la lumière des photos du client y tient.
- **Chrome** : barre de nav collante (nom, six pages, bouton Réserver) ; barre de réservation fixe sous 60 rem (Réserver, Appeler).
- **Hero** : Poster, photo du bâtiment et de l’étang, plaque de papier à la base (h1, une phrase, un bouton, un lien).
- **Signature** : le portrait du chef posé sur un passe-partout de carton avec son étiquette de mur.
- **Sections** : hero, déclaration (dropcap), menus et carte, bandeau terrasse, villa Barabas (index), horaires et réservation, pied en déclaration.
- **Material** : photos du client (22, WebP 800 et 1600 px) ; aucune photo de bibliothèque. Filtre du thème `warm con=-6 vib=-10` via `base.css`.
- **Comp** : 2 construits, sans clé, c1 retenu (`comp.md`).
- **Draw** : `73cd2c`. Pris : job book, barre de réservation, horaires et adresse en fin de page. Échangés : forme Catalogue contre Photographic (l’original est une table avec photos, pas un inventaire de variantes) ; hero Stage contre Poster (posture gardée).
- **Sweep** : phase 3.

## Approche (conservée)
Macrostructure 08 Photographic. Routes inchangées. Hero Poster. Calme : aucune animation en phase 1, un reveal au plus en phase 2. Dérogations : slider supprimé pour une photographie (18), `vh` remplacé par `dvh` (6a), widget Zenchef remplacé par un lien (la maquette ne branche aucun service). Test miroir : un voisin avec « restaurant gastronomique en ferme » prendrait le vert ou le noir et l’or ; ici le papier chaux et le passe-partout, changement nommé : Hedgerow écarté.

## Thème et tokens
Atelier, tokens dans `src/styles/tokens.css` : papier `oklch(94.5% 0.010 76)`, encre `oklch(19% 0.024 52)`, signal ardoise `oklch(41% 0.075 248)` (moins de 4 % de l’écran : soulignements, lettrine, focus), Sentient 300 (têtes) et 400 (h3, noms de plats, jours), Hanken Grotesk 400. L’orange du site d’origine est abandonné : Atelier interdit un accent chaud et le logo n’existe qu’en favicon.

## Composants
- **Carte** : Rows (nom col. 1 à 5 en Sentient 400, description 6 à 10, prix à droite en `tabular-nums`), filet d’encre en tête, filets fins entre lignes ; desserts sans prix : rien rendu. Menus en deux colonnes, prix au format display. Ni tuile ni carte dans carte. Nom et prix restent visibles à 375 (description sous le nom).
- **Horaires** : Schedule en `<dl>`, jour fermé en `--color-muted` sans barrage, pas d’icône horloge, dits une fois sur l’accueil (le pied n’en donne qu’une phrase sur les autres pages), congés 2027 sur la page réservation. Jour courant : phase 2.
- **Pied** : statement (une phrase en Sentient 300 puis quatre colonnes : adresse, contact, ouvert, suivre), `data-credits`, pas de « Tous droits réservés », puis `KywFooter`.
- **Photo** : `<figure>` avec `data-slot` et `data-alt`, `width`/`height`, `srcset` 800/1600, `object-position`, hero `fetchpriority="high"`, autres lazy, légende = un fait.
- **Index (villa Barabas)** : lignes à filets, numéro au crayon, titre Sentient 300, flèche ardoise.
- Nav mobile, états du bouton, reveal : phase 2.

## Sur-utilisation
- [x] 1. Audit lancé avec `--before` · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. Macrostructure nommée, empreinte écrite · preuve : DESIGN.md § Picks, Shape
- [x] 3. Deal 3 thèmes, choix sur l’image, écartés nommés · preuve : `.logs/legacy-deal.log`, DESIGN.md § Picks
- [x] 4. Draw et seed notés dans le stamp · preuve : `src/styles/page.css:1-3`
- [x] 5. Scaffold depuis le thème, tokens non réécrits · preuve : `src/styles/tokens.css`
- [x] 6. Deux comps, choix écrit · preuve : `comp.md`, `.hallmark/comps/c1.png`, `c2.png`
- [x] 7. Photos du client seulement, alt depuis `sujet` · preuve : `src/data/site.ts`, `public/photos/`
- [x] 8. Aucun tiret cadratin ni demi-cadratin · preuve : balayage Python de `src/` et `dist/` sans résultat
- [x] 9. Noindex et mention KYW sur chaque route · preuve : grep des 9 `index.html`/`404.html` (noindex, `Maquette KYW`, `kyw-signature` à 1)
- [x] 10. Aucun chiffre ou avis inventé · preuve : avis Tripadvisor et notes écartés (`dropped`), Gault&Millau non repris (15/20 contre 16/20)
- [ ] 11. Sloplint de rendu sur `src` · reste en phase 3 (balayage final)
- [ ] 12. Animations, nav mobile, jour courant · phase 2
