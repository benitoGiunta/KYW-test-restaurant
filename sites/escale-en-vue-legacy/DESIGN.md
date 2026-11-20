**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring gardés (téléphone, e-mail, Facebook, Instagram, carte Google), système et composition neufs.
- **Before** · `.hallmark/before.txt` (229 FAIL, 86 REFLEX, 21 WARN, surtout du CSS Divi) ; `AUDIT.md`.
- **Keeps** · one-page, nom « Escale en Vue ! », baseline, horaires 2026, adresse de Dave, téléphone `tel:+32493467971`, `mailto:info@escale-en-vue.be`, Facebook, Instagram, lien itinéraire `maps.app.goo.gl/ZLBSuP111Ss6wFLc9`. Dropped : « Sample Page », double « Accueil », flux de cinq posts Facebook (remplacé par les liens), bandeau « en construction », carrousel automatique (la planchette et les photos portent le lieu).
- **Files** · `src/pages/index.astro`, `404.astro`, `src/components/*.astro`, `src/styles/{tokens,base,page}.css`, `src/data/site.ts`.
- **Shape** · Feature Stack (draw 99e2b7), one-page, job : book, action : appeler (réservation par téléphone seulement).
- **Theme** · Squeeze, dealt 1/3, seed `restaurant-namur-seasonal-terrace-028c·65042563·2026-11-20·r0`. Écartés : Solstice (crème et brun, déjà quatre fois au journal partagé, et le site d'origine n'est pas chaud), Atelier (calcaire et ombre, trop froid pour une terrasse d'été). Squeeze : vert forêt saturé, comme la photo de héro et le logo vert d'origine, et un horaire en tuiles de jours (Range du thème).
- **Chrome** · nav : pilule flottante (nom, trois ancres, bouton « Réserver » en `tel:`) · pied : colophon block (nom, adresse, horaires en lien, réseaux, crédits) puis KywFooter.
- **Hero** · Stage (swap documenté : le draw donnait Poster, la meilleure photo source fait 1024 px, trop petite pour un plein cadre à 1920) : titre en trois lignes sur les colonnes 1 à 7, planchette portrait sur 8 à 12.
- **Signature** · quatre tuiles de jours en Gabarito 800 sur la bande verte claire : le jeudi au dimanche en un coup d'œil.
- **Sections** · Hero (planchette) · Horaires (tuiles, bande `--color-paper-2`) · Carte (Rows + fiche blanche + bandeau trappistes) · Lieu (mur de pierre, adresse) · Pied.
- **Material** · real : nom, horaires 2026, adresse, téléphone, plats cités sur Facebook (parmigiana, tagliatelles, poulet mariné), bières trappistes, produits locaux, végé · pictures : planchette, trappistes, mur de pierre, client (aucune photo de bibliothèque) · absent : prix, histoire, équipe, avis, abonnés (rien d'inventé, aucun `.fill`, aucun placeholder).
- **Comp** · 2 comps, c1 retenu (`comp.md`).
- **Sweep** · phase 3.

## Draw : échanges
- Poster, devient Stage (photo source 1024 px).
- « Prochaines heures libres en boutons » refusé : aucune réservation en ligne ; le bouton appelle.
- « Carte en Switcher midi et soir » refusé : aucune carte publiée ; Rows par offre, sans prix.
- Band et Figures évités, suivi. Photos : toutes celles du client, pas de `theme.mjs photos`.
- Test miroir : un voisin avec le même site (terrasse, bière, vue) n'obtiendrait pas un vert forêt drenched avec horaires en gros chiffres ; la combinaison tient.

## Tokens
Générés par le scaffold dans `src/styles/tokens.css` (jamais depuis le thème) : papier `oklch(41% 0.100 154)` + deux pas (`paper-2` 47 %, `paper-3` 34 %), encre `oklch(99% 0.005 90)`, muted `oklch(90% 0.030 150)`, filet `oklch(55% 0.100 154)`, accent pêche `oklch(83% 0.115 56)` (hover `accent-2` `oklch(74% 0.150 46)`, encre `oklch(30% 0.070 40)`), focus `oklch(88% 0.14 85)`, carte `oklch(97% 0.012 85)`. Polices : Gabarito (display, 800) et Manrope (500, 700), auto-hébergées dans `public/fonts/` (variables, sous-ensemble latin). Rayons 24 / 16 / 999. Échelle d'espacement et de texte du scaffold ; conteneur 1440, gouttière 64.

## Composants
- **Nav** : pilule `paper-3`, liens en pilules `paper-2` au survol, un seul bouton primaire pêche ; sous 40 rem les liens disparaissent (menu Popover en phase 2). Réf. `layout.md` § 7.
- **Hero** : Stage, un titre de six mots, une phrase de onze, deux actions, ligne de saison après les actions (note 58). Réf. `layout.md` § 6.
- **Horaires** : Schedule en `<ol>` de tuiles `paper-3` sur bande `paper-2`, `<time>` pour chaque borne, jours fermés dits en une ligne `--color-muted` (jamais barrés), pas d'icône. Dits une fois ici ; le pied renvoie par un lien. Jour courant : phase 2 (surface seule). Réf. `layout.md` § 5.16.
- **Carte** : Rows (titre col. 1, détail à droite, disponibilité en label), aucun prix publié donc aucune colonne de prix ; fiche blanche unique du thème (« alternative végé », appel) ; bandeau trappistes 16/7 avec légende-fait. Pas de tuile icône, pas de carte dans carte.
- **Lieu** : photo portrait sur 4 colonnes, texte sur 6, `<address>` en Manrope 700, bouton itinéraire et lien Facebook.
- **Pied** : colophon block, 3 colonnes, adresse, téléphone, mail, réseaux, `data-credits`, jamais de « Tous droits réservés ».
- **Photos** : `<figure>` + `data-slot`, `width`/`height`, hero `fetchpriority="high"`, autres `lazy`, `object-position`.

## Sur-utilisation
- [x] 1. Audit lancé (sloplint `--before`) · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. SKILL.md, redesign, anatomy book, gates lus · preuve : choix du hero, de la carte, de la fin
- [x] 3. Approche conservée nommée et dérogations · preuve : Keeps, Draw : échanges
- [x] 4. deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1`, journal partagé
- [x] 5. Deux comps construits et un choisi · preuve : `comp.md`, `.hallmark/comps/c1.png`
- [x] 6. Pas de tiret cadratin ni demi-cadratin · preuve : contrôle Python sur `src/` et `dist/`
- [x] 7. Données : rien d'inventé, aucun prix · preuve : `src/data/site.ts` relu contre `dossier.md`
- [x] 8. sloplint source `--genre playful` · preuve : 0 FAIL, 0 WARN (après fusion des deux boutons primaires)
- [ ] 9. sloplint `--render`, QA navigateur, motion, nav mobile : phase 2 et 3
