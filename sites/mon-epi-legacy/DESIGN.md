# Design : Monepi Boulangerie (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW** · Redesign : full · Before : `.hallmark/before.txt` (449 FAIL, 36 REFLEX, 8 WARN sur l'ancien site, thème WordPress de démonstration) · Keeps : routes (accueil, Monepi, produits, galerie, contact), lien Facebook, `tel:`, toute la carte et ses prix, avis du site · Files : `src/`, `public/photos/`, `.hallmark/` · Shape : Catalogue (tirage 14e65e) · Theme : Solstice, dealt 1/3 (écartés : Vellum, car le gothique et le bleu outremer ne portent pas une boulangerie au feu de bois ; Ink, car le noir sans teinte et le teal sont ceux d'un catalogue de bureau) · Chrome : bandeau (enseigne, téléphone, Facebook) sur une barre de navigation (retrait au scroll en phase 2) · Hero : Index (la carte ouvre : cinq familles et leur prix de départ) · Signature : lignes de prix à pointillé doré · Sections : hero, four (bande brune), farines, six pains, boulanger (frise), avis, horaires et adresse, pied en lettre · Material : photographies du client, lumière chaude et basse · Comp : c1 choisie · Sweep : phase 3.

## Approche
- Macrostructure : Catalogue (tirage), site multi-pages WordPress conservé : accueil, Monepi (à propos), produits, galerie, contact, 404. Les cinq pages produit d'origine sont réunies dans une seule route `/produits/` avec ancres par famille (dérogation : les URL `products-grid-2`, `pie-chart` venaient d'un thème de démonstration). Page Quiches : `dropped` (404 chez le client, aucun produit dans les données).
- Posture : calme, statique, un seul reveal prévu en phase 2 (craft.md § 5) ; aucune chorégraphie de scroll (le slider d'origine n'en était pas une).
- Dérogations : slider de 5 images remplacé par une photographie fixe (18) ; `waive 8` (séquence conservée, composition neuve) ; `waive 83` ; bandeau rose-ocre d'origine remplacé par le cadre brun et crème.
- Test miroir : un voisin avec un site de boulangerie obtiendrait « crème, serif gras, photo de pain ». Décision qui change : la carte est le hero (index de prix) et le pointillé doré est la signature, pas la photo.
- Genre : editorial. Pas de réservation de table : l'action unique est l'appel téléphonique (job book adapté, décision notée).

## Thème
Solstice (Yeseva One, Archivo, Archivo Narrow), lumière `long-light`. L'ocre du site d'origine (#e8b370) est retrouvé dans l'or `--color-gold`, utilisé en filet et jamais en aplat ; le vermilion `--color-accent` ne sert qu'au bouton et aux chiffres.
Swap du tirage 14e65e : réservation, « chambre » et créneaux remplacés (pas de table à réserver) ; hero Index conservé, nav et pied conservés.

## Tokens
`src/styles/tokens.css` fait foi (scaffold Solstice) : papier `oklch(94% 0.03 80)`, encre `oklch(27% 0.05 50)`, accent `oklch(54% 0.20 24)`, or `oklch(74% 0.14 75)`. Polices par `<link>` Google Fonts (Build hint du thème) ; aucune couleur ni police littérale après le bloc de tokens.

## Composants
- **Carte** : Rows (`Rows.astro`), nom à gauche, pointillé doré, prix `tabular-nums` à droite, description en petit dessous ; jamais tuile ni carte dans carte ; filets, pas d'ombre (F24) ; nom et prix visibles à 375 px. Les cinq familles ont chacune leur section, photo en colonne latérale collante, alternance gauche/droite.
- **Horaires** : Schedule (`<dl>`, `<time>`), vendredi 9 h 00 à 18 h 00 seul fait connu ; lundi à jeudi et week-end en `--color-muted`, `data-placeholder`, deux `.fill` au plus par page. Dits au pied et en fin de page.
- **Pied** : lettre (« À vendredi, à Loyers. »), adresse, téléphone, Facebook, navigation, `data-credits`, puis `<KywFooter />`.
- **Photo** : `Photo.astro`, `<figure>`, `width`/`height`, `srcset` 800/1600, hero `fetchpriority="high"`, autres lazy, légende = un fait du champ `sujet`. Aucun nom de personne ni de plat déduit d'un nom de fichier.
- Nav, bouton, reveal : états de base ici, motion en phase 2.

## Sur-utilisation
- [x] 1. Floor 1 à 16 relus avant écriture · preuve : `src/styles/page.css` passe `sloplint` (0 FAIL, 0 REFLEX, 0 WARN)
- [x] 2. `deal` puis `draw` journalisés dans `$LOG` · preuve : `.logs/deal.log`, `.logs/draw.log`
- [x] 3. `audit` : `sloplint --render --before` sur l'ancien site · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 4. `scaffold` Solstice et stamp en première ligne · preuve : `src/styles/page.css:1`
- [x] 5. Deux comps du premier écran · preuve : `.hallmark/comps/c1.html`, `c2.html`, `comp.md`
- [x] 6. Photographies du client avant tout stock · preuve : `public/photos/`, aucune image tierce
- [x] 7. Rien d'inventé : tout chiffre et nom vient de `donnees.json` ou `dossier.md` · preuve : `src/data/site.ts`, `src/carte.json`
- [ ] 8. Rendu navigateur, sloplint `--render`, comparaison `--kept` : phase 3 (non faite ici, consigne de la phase 1)
