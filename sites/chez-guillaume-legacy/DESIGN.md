**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes (/, /restaurant/, /agenda/, /privatisation/, /bon-cadeau/, /faq/) + 404
- **Before** · Floor 2 FAIL, Reflex 18 (45 FAIL au total, un site WordPress rendu en repli) ; la marque rouge et crème, l'humour et l'agenda complet restent
- **Keeps** · tous les liens (billetterie, fiches `/evenements/<slug>/`, `tel:`, `mailto:`, Facebook, Instagram, carte, mentions) · la copie du client (hors gates 19, 54, 58, 63, 69) · le rouge `#cd3b08` du logo · les routes
- **Files** · create : tout `sites/chez-guillaume-legacy/` · edit : aucun fichier d'un autre site · delete : none
- **Shape** · Feature Stack (draw 4e5b8c) · routes conservées · job : book, action : barre de billetterie collante
- **Theme** · Hum, dealt 3/3, seed `restaurant-comedy-club-namur-e369·81de64f5·2026-11-01·r0` ; accent poire remplacé par le rouge de marque (lu dans `photos/12-logo.svg`). Écartés : Overprint (papier journal gris, passes bleu et orange : l'identité rouge et crème du client y disparaîtrait) ; Squeeze (papier vert forêt, aucun rapport avec la marque). Re-deal : non.
- **Chrome** · nav : pilule flottante (logo, 5 liens, Réserver) · footer : lettre (soir, adresse, contact, liens, crédits) puis KywFooter
- **Hero** · Stage : titre « On va voir qui ? » sur 5 colonnes, photo de scène déchirée sur 7, billet « Prochains spectacles » posé bas-gauche
- **Signature** · le billet de papier des trois prochains spectacles posé sur la photo de scène
- **Sections** · Hero (Stage) · La salle (photo pleine largeur sans titre) · Trois moments (Feature Stack : volet collant, trois cartes) · Agenda (Index) · Privatisation (Band rouge, Statement) · Horaires et adresse (Schedule + photo) · Footer (lettre)
- **Material** · real : toute la copie, les menus d'octobre, l'agenda de novembre, les horaires de la FAQ · pictures : 8 photos du client (scène, salle, plat, brunch, cocktails, cuisine, banquette, salle rideaux) · absent : avis, nombre de couverts, noms de l'équipe, abonnés (aucun inventé)
- **Comp** · 2 built, no key · c1 chosen (voir `comp.md`)
- **Sweep** · phase 3

## Approche

Macrostructure d'origine : un site WordPress en séquence « hero, split, spectacles, calendrier, bandeau, contact » ; empreinte `Heading|Body|Divider|Button|Image|Reveal` conservée : `Big script head|Short text + list|Wavy edge|Pill button|Photo + illustration|Lottie`. Nouvelle empreinte : `Chillax 600|Rows and an index|Torn paper edge|Card-stock press button|Stage photograph|One reveal (phase 2)`. Macrostructure retenue : Feature Stack (draw), avec les routes d'origine.

Posture : hero Stage (la billetterie est visible dans le hero : Counter gardé), calme, un seul pattern de scroll (volet collant, CSS `position: sticky`, phase 2 le règle). Dérogations : carrousel Swiper → Index ; Lottie → rien (animation décorative) ; `vh` → `dvh` à vérifier ; gabarit en séquence gardé, composition neuve (`waive 8`) ; calendrier en tableau 8 colonnes → liste Index (F25) ; hero « Programme » fusionné au bouton Réserver.

Test miroir : un voisin avec « restaurant et comedy club, brunch, cocktails » obtiendrait plutôt Overprint ou Hum jaune ; ici Hum porte le rouge de marque, le billet de spectacles et la barre collante. Changement décidé : l'accent passe du poire au rouge `#cd3b08` (lu dans le logo).

## Tokens (depuis `src/styles/tokens.css`)

Papier crème `--color-paper oklch(97% 0.012 95)` avec grain et fibres SVG ; encre bleu-noir ; accent de marque `--color-accent oklch(55% 0.185 37)` (rouge du logo), `--color-accent-deep` pour l'arête des boutons, `--color-accent-soft` pour un aplat doux ; liens et focus en bleu `--color-accent-2` ; nappe bleue `--color-sugar` (rappel des boutons bleu poudre de l'original). Chillax 500 et 600 (Fontshare, une famille). Rayons 24, 16, 14 px et pilule ; échelle d'espacement de 4 px ; conteneur 1440 px, gouttière 64 px.

## Composants

- **Carte** : Rows (nom du menu en `--text-section` à gauche, prix « 2 services 29 €, 3 services 39 € » à droite en `tabular-nums`, une ligne par service avec le libellé en colonne 1 à 2) ; Switcher Menu du soir / Brunch (`role="tablist"`, premier panneau visible sans script, les deux panneaux empilés sans script) ; filets, pas de bordure plus ombre ; jamais de carte dans une carte ; nom et prix visibles au téléphone.
- **Horaires** : Schedule en `<dl>` (`dt` jour, `dd` `<time>`), jour courant par un cran de surface (`data-jour` posé par un script de 3 lignes), pas d'icône, dits une fois sur l'accueil (section Horaires et adresse), une ligne dans le pied des autres pages.
- **Pied** : lettre (titre « À bientôt chez Guillaume. », adresse, téléphone, mail, liens, réseaux, `data-credits`, mentions légales) puis KywFooter ; pas de « Tous droits réservés », pas de newsletter.
- **Photo** : `<figure data-slot data-alt>` avec `width` et `height`, `object-position`, hero `fetchpriority="high"`, les autres `lazy` ; photos du client en WebP ; légende = un fait.
- **Agenda** : Index (date, titre, type, action), « Complet » pour les soirées complètes, chaque ligne garde le lien de sa fiche d'origine.
- **Nav, bouton, formulaire, reveal** : bouton carton en place ; nav pilule en place (menu `<details>` sous 60 rem) ; reveal et états fins en phase 2. Aucun formulaire (le site d'origine n'en a pas).

## Sur-utilisation

- [x] 1. Hallmark SKILL.md, redesign.md, deal, draw, scaffold, stamp, comp lancés · preuve : `.hallmark/log.json`, `src/styles/page.css:1`, `comp.md`
- [x] 2. Audit avant/après avec sloplint `--before` · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 3. Couleur de marque lue dans les fichiers du client · preuve : `public/logo.svg` (fill `#cd3b08`) → `tokens.css:--color-accent`
- [x] 4. Aucun tiret cadratin, apostrophes typographiques, insécables à vérifier en phase 3 · preuve : `grep '[—–]' src` vide
- [x] 5. Pied KYW, noindex et mention sur les 7 pages · preuve : grep de `dist/chez-guillaume/legacy/**/*.html`
- [x] 6. sloplint statique sur `src` : 0 FAIL après correctif · preuve : `.logs/sloplint.log`
- [ ] 7. Contraste, fold, rendu `--render` des 7 pages · à faire en phase 3
- [ ] 8. Motion : un reveal, volet collant, barre de billetterie, focus et états · phase 2
