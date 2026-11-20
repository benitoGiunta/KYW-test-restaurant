**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 5 pages (/, /our-menu/, /carte-des-boissons/, /about-us/, /contact/) + 404
- **Before** · Floor 264 FAIL cumulés (CSS WordPress), Reflex 62 · carte lisible, palette bleu et blanc, « Saveurs grecques » : restent ; hero centré, dégradés, blanc pur, avis vide : partent
- **Keeps** · les 5 routes, liens externes (Facebook, Instagram), `tel:` 081 20 07 47, `mailto:`, la copie « Depuis 1986… », toute la carte et ses prix, la palette bleu marine et blanc (l'ink-blue de Specimen)
- **Files** · create : tout `sites/el-greco-legacy/` · delete : none
- **Shape** · Catalogue (tirage c9eb51) à la place de Photographic (macrostructure d'origine) : l'original n'a aucune photo du restaurant, seulement du stock ; la carte porte donc la page. Posture calme gardée.
- **Theme** · Specimen, dealt 1/3 (seed restaurant-namur-greek-family-4640·a914d13e·2026-11-20·r0) : papier avoine, encre chaude, Bodoni Moda, un bleu encre qui reprend le bleu marine du client. Écartés : Vellum (gothique, trop nordique pour du grec), Ink (teal, perd le bleu du client).
- **Chrome** · nav : barre alignée à gauche, logo du client, liens, Réserver (tirage : barre de recherche, écartée, aucun contenu à chercher) · footer : statement (nom à l'échelle d'affiche, adresse, liens)
- **Hero** · Index : titre sur les colonnes 1 à 7, les six spécialités avec prix sur 9 à 12 (le tirage dit « saison ou date », absent des données). Original : Poster.
- **Signature** · « Saveurs grecques » à l'échelle d'affiche, traversé de repères bleu encre à la ligne de base et à la hauteur d'x
- **Sections** · Hero (index) · Split (histoire + photo) · Rows (accès menu et boissons) · Grid (trois avis) · Band + Schedule (horaires et adresse) · Footer. Pages internes : en-tête, Rows par rubrique, bande de réservation ink.
- **Material** · real : carte et prix, adresse, téléphone, e-mail, « Depuis 1986 », trois avis Trustindex mot pour mot · pictures : 2 photos de stock Pexels (coupole bleue, clocher), `placeholder`, duotone encre sur avoine · absent : photos du restaurant, équipe, note et nombre d'avis, horaires lundi à mercredi
- **Comp** · 2 built, no key · c1 chosen
- **Sweep** · phase 3

## Approche (conservée)
- Macrostructure d'origine : 08 Photographic (hero photo plein cadre + liste de spécialités). Empreinte kept : `Heading: display centré | Body: courts | Divider: filet | Button: bleu marine | Image: plein cadre | Reveal: slider`. Nouvelle : Catalogue, `Heading: Bodoni à l'échelle d'affiche | Body: Geist 17 px | Divider: filets 1 px et double filet | Button: rectangle encre | Image: une plaque duotone | Reveal: aucun`.
- Posture : mêmes cinq routes ; calme ; aucun pattern de scroll.
- Dérogations : hero Poster vers Index (pas de photo du lieu, la carte ouvre) ; slider auto retiré (18) ; `vh` jamais utilisé (6a) ; photo plein cadre retirée, une plaque par page (Specimen : une photo au plus, 83) ; `waive 8` (séquence gardée, composition neuve).
- Test miroir : un voisin Specimen en restauration ferait un hero Poster sur photo. Ici : index de prix au premier écran, repères sur le titre ; décision changée : le hero ne porte aucune photo.

## Thème (tokens.css, lu dans le fichier)
Papier `--color-paper` oklch(96,5 % 0,016 82), encre `--color-ink`, accent `--color-accent` oklch(45 % 0,18 262) (bleu encre, moins de 5 % de l'écran : liens, focus, repères). Titres Bodoni Moda 400, `opsz` 96, corps Geist 17 px (base 16 px minimum), chiffres en Geist Mono tabulaire. Surfaces : filets 1 px, double filet une fois par page (index du hero, pied), bande `--color-paper-2` pour les horaires, bande encre pour la réservation. Pas d'ombre, pas d'arrondi.

## Composants
- **Carte** : Rows, titre en `--text-title` colonne 1, prix à droite en mono tabulaire, description dessous en `--color-muted` ; rubriques ancrées (liens en tête de page) ; pas de tuile icône, pas de carte dans carte ; filets seuls ; nom et prix visibles à 375 px (grille `1fr auto`). Les pages carte lisent `src/data/carte.json` (issu de `donnees.json`, apostrophes et insécables corrigés).
- **Horaires** : Schedule en `<dl>` avec `<time>`, jour sans horaires en `--color-muted` (jamais barré), pas d'icône ; dits une fois par page (accueil et contact), mention « à confirmer » ; un `.fill` (lundi à mercredi).
- **Pied** : statement, nom à l'échelle d'affiche, adresse, e-mail, téléphone, liens, réseaux, `data-credits` ; horaires par un lien vers `/contact/#horaires` (dits une fois) ; puis `<KywFooter />`.
- **Photo** : `<figure data-slot data-alt data-placeholder>`, `width`/`height`, `srcset`, hero de page interne `fetchpriority="high"`, autres `lazy`, légende = un fait (« photographie de stock, pas le restaurant »).
- Nav, bouton, formulaire, reveal : phase 2 (nav mobile en ligne de liens en phase 1).

## Sur-utilisation
- [x] 1. Audit `sloplint --before` sur les 5 pages · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. Lecture de SKILL.md, redesign.md · preuve : trace de l'agent, picks ci-dessus
- [x] 3. Deal, draw (seed c9eb51), scaffold `--redesign full` · preuve : `src/styles/tokens.css`, `base.css`, stamp `page.css:1`
- [x] 4. Deux comps avant build · preuve : `.hallmark/comps/c1.html`, `c2.html`, `comp.md`
- [x] 5. Photos du client d'abord (stock Pexels fourni), pas d'imagegen · preuve : `public/photos/`
- [x] 6. `sloplint src` : 1 FAIL (34, faux positif : la règle est dans base.css via @import), REFLEX 26b traité (`:active`) · preuve : `.logs/legacy-lint.log`
- [ ] 7. Rendu navigateur et motion · phase 2
- [ ] 8. Reviews et sweep final · phase 3
