**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring gardés, système et composition neufs.
- **Before** · AUDIT.md : one-page vert foncé, mono en capitales justifiées, marquees, polaroïds.
- **Keeps** · one-page, ordre maison, pâte, carte, réservation ; liens Barestho, tel, Instagram, Facebook, PDF de la carte ; ton rock ; les 3 photos clientes ; logo R inversé (SVG client).
- **Files** · `src/layouts/Base.astro`, `src/components/*`, `src/pages/{index,404}.astro`, `src/styles/{tokens,base,page}.css`, `src/data/{donnees.json,site.ts}`.
- **Shape** · Narrative Workflow (draw 2dda11), empreinte `Heading|Body|Rows|Button|Image|none`, one-page conservée.
- **Theme** · Overprint, dealt 2/3 (seed restaurant-namur-rock-n-roll-pizzeria-fb55·ab3eef39·2026-11-07·r0). Écartés : Darkroom (capitales hairline 200 en contradiction avec les capitales lourdes d'origine, ambre étranger à la marque), Midnight (bleu nuit, la marque est verte, ton trop feutré). Overprint : capitales larges lourdes comme l'original, teal et orange proches du vert et du saumon du client, ton affiche de concert.
- **Chrome** · nav : barre filetée, logo, ancres, un seul bouton (draw proposait une barre de recherche, refusée : aucune recherche sur une page) · footer : colophon block.
- **Hero** · Stage (le draw proposait Index, refusé : la carte n'ouvrait pas l'original ; Poster refusé : sources de 1687 px). Titre sur 6 colonnes, photo de table passée par la couche teal.
- **Signature** · la photo de table imprimée en duotone teal, et la figure « 48 h » sur la facture.
- **Sections** · Nav · Hero · Maison (texte + tableau des fournisseurs) · Pâte (photo, texte, trois chiffres) · Carte (Switcher par rubrique) · Venir (bande d'encre : photo salle, adresse, horaires, réservation) · Pied.
- **Material** · réel : carte, prix, adresse, téléphone, Barestho, 48 h, fournisseurs du site, 3 photos · pictures : photos clientes (aucun stock) · absent : avis, note, horaires fiables, e-mail.
- **Comp** · 2 built, c1 chosen (`comp.md`).
- **Sweep** · phase 3.

## Thème (tokens.css)
Overprint, newsprint : papier `--color-paper` 91,5 %, encre 17 %, passe 1 teal `--color-accent`, passe 2 orange `--color-accent-2`, moiré `--color-mix` non utilisé (aucune superposition peinte en phase 1). Anybody 900 à 140 % en capitales, Archivo 400 et 600, Archivo Narrow 600 pour les labels. Rayon 0, ni ombre ni dégradé. Photos en niveaux de gris, multipliées sur une passe.

## Composants
- **Carte** : Switcher en 4 rubriques (Pizzas, À grignoter, Desserts, À boire) en `role="tablist"`. Le draw proposait midi et soir : refusé, la carte n'a pas ce découpage. Chaque plat est une ligne : nom (Archivo 600), description dessous, prix tabulaire à droite en Anybody ; filets, pas de bordure ni d'ombre. Sans script, tous les panneaux sont visibles et la liste d'onglets est masquée.
- **Horaires** : `<dl>` de trois lignes (mardi à vendredi, samedi, dimanche et lundi), jour fermé en `--color-muted` sans barre, texte « à confirmer » en `.fill` car les sources se contredisent ; dits une fois, dans Venir.
- **Pied** : colophon block (logo masqué en grand, phrase de marque, liens Instagram, Facebook, téléphone, carte PDF, crédit photos), puis `<KywFooter />`.
- **Photo** : `<figure data-slot data-alt>`, `width` et `height`, `srcset` 800 et 1600, hero `fetchpriority="high"`, les autres `loading="lazy"`, légende = ce que la photo montre.
- Nav, bouton, formulaire, reveal : états et motion en phase 2 (états de base posés : survol, actif, focus).

## Sur-utilisation
- [x] 1. Hallmark audit lancé · preuve : AUDIT.md (sloplint --before non lancé, CSS externe)
- [x] 2. Macrostructure et posture nommées · preuve : Picks
- [x] 3. Deal, draw, scaffold, stamp · preuve : page.css:1-3, `.hallmark/log.json`
- [x] 4. Comp avant build · preuve : comp.md, `.hallmark/comps/c1.png`
- [x] 5. Floor tokens seulement (1) · preuve : sloplint page.css, 0 FAIL
- [x] 6. Aucun tiret cadratin (19) · preuve : contrôle Python sur `src/`
- [x] 7. Noindex et KywFooter sur chaque page · preuve : grep dist, index.html et 404.html
- [ ] 8. sloplint --render · en attente (phase 3) ; WARN 23 sur `.hero__photo::before` : c'est la passe 1 du thème, volontaire
