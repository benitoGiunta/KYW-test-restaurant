**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 4 routes (/, /carte/, /la-dolce-vita/, /infos/) + 404
- **Before** · Floor 48 FAIL (10a, 27, 28a, 34, 38i, 48, 67) · Reflex 3 · une vidéo plein écran sous un bandeau cookies ; la carte complète et les photos restent
- **Keeps** · toutes les routes, `tel:` 081 85 54 20 et 0471 06 00 02, `mailto:`, liens Instagram et Facebook, la copie du client, les 86 plats avec prix, les avis mot pour mot, la terracotta de la marque
- **Files** · create: tout `sites/dolce-vita-wepion-legacy/` · delete: none · `gabarits/` et autres sites intacts
- **Shape** · Photographic (kept, empreinte Large|Plate|Image-edge|Verb link|Full-bleed|None), draw 1646b9 : swaps ci-dessous
- **Theme** · Spore, dealt 2/3, seed restaurant-namur-italian-cuisine-1d26·c8524eae·2026-11-01·r0. Écartés : Atelier (papier clair, ardoise froide : contredit le soir de la façade), Ink (catalogue blanc, teal : sans chaleur)
- **Chrome** · nav : bandeau, sur la photo à l'accueil, plein sur les pages intérieures (phase 2 : barre qui se rétracte) · pied : mast
- **Hero** · Poster à l'accueil : façade du soir en plein cadre, plaque en bas à gauche (titre, une phrase, le téléphone) ; Split (/la-dolce-vita/), Index (/carte/), Counter (/infos/)
- **Signature** · la façade du soir et son enseigne, le numéro de téléphone comme seule action
- **Sections** · Hero · Maison (Split) · Table (Index) · Geste (Split portrait) · Ardoise (Rows sur puits grainé) · Avis (3 colonnes) · À emporter (bande) · Fin (Schedule midi/soir)
- **Material** · real : 14 photos, 86 plats, horaires, adresse, téléphone, 3 avis · pictures : client uniquement · absent : presse, GPS, abonnés, menus de fêtes, réservation en ligne
- **Comp** · 2 built, no key · c1 chosen (`comp.md`)
- **Sweep** · phase 3

## Approche

- **Macrostructure** : Photographic (08), gardée (plein écran photo à l'ouverture, texte en annotation). Empreinte `Large|Plate|Image-edge|Verb link|Full-bleed|None`.
- **Posture** : mêmes routes, aucune supprimée sauf les pages légales et admin du site d'origine (`dropped`, pas de données). Poster pour l'accueil. Un seul pattern de scroll au plus (phase 2).
- **Dérogations** : vidéo autoplay remplacée par photo fixe (28a) ; `vh` en `dvh` (6a) ; bandeau cookies et carte OpenStreetMap supprimés, lien d'itinéraire direct (aucun tiers chargé) ; Switcher midi/soir du draw refusé (la carte n'a pas de découpage midi/soir) : Index de catégories à la place ; `waive 8` (séquence gardée, compositions neuves).
- **Swaps du draw** : forme Narrative Workflow écartée (l'original est photographique et la carte n'est pas un récit), hero Poster, nav bandeau et pied mast pris tels quels ; « Figures » et « Statement » évités.
- **Test miroir** : un voisin pizzeria obtiendrait Spore plus Poster ; ici la terracotta de la marque, le portrait du geste en Split et le téléphone comme action unique rendent la combinaison propre. Décision changée : l'accent Spore (rose) devient la terracotta du client.

## Thème

Spore, dark/roman-serif/warm, committed. Young Serif sur Instrument Sans. Papier brun-noir, encre parchemin, un accent : terracotta du site d'origine (#b4523e lu sur la capture), foncée à `oklch(49% 0.13 33)` pour tenir 4,5:1 sous la crème, version claire `oklch(75% 0.11 38)` (8,5:1 sur le papier) pour le texte (prix, liens actifs).

## Tokens

`src/styles/tokens.css` est la source. Rôles : `--color-paper`, `-paper-2`, `-paper-3` (trois marches de surface), `--color-ink`, `-ink-2`, `-muted`, `--color-rule`, `--color-accent` (remplissages), `--color-accent-2` (texte), `--color-accent-ink`, `--color-focus` ; `--font-display` Young Serif, `--font-body` Instrument Sans, `--font-outlier` (italique, devise et proverbe seulement) ; échelle d'espaces et de textes du scaffold ; `--radius-card` 14 px, `--radius-pill` ; `--grain` 0,15 (puits et bandes uniquement).

## Composants

- **Carte** : Rows (nom Young Serif à gauche, description en dessous, prix à droite en `accent-2`, sans `tabular-nums` : prix à virgule), filets, jamais de tuiles ni de cartes imbriquées, étiquettes (Végétarien, Signature, Épicé) en pastilles sur `paper-3`. Une catégorie sur deux sur `paper-2` ; une photo dans les catégories Antipasti, Pizze, Scaloppine, Dolci (jamais deux de suite). Index de catégories en pastilles au-dessus. Réf. `layout.md` § 5.
- **Horaires** : Schedule en `<table>` jour / midi / soir, jour fermé et demi-journée fermée en `--color-muted` (jamais barrés), `data-jour` posé pour l'état « ce soir » de la phase 2, restack mobile par `data-label`, dits une fois par page, en fin de page.
- **Pied** : mast (nom en grand, quatre colonnes adresse, contact, réseaux, devise ; allergènes ; `data-credits`), puis `KywFooter`. Horaires absents du pied (déjà en fin de page).
- **Photo** : `Fig.astro`, `<figure>` + `width`/`height`, `srcset` 800/1600, `object-position`, hero `fetchpriority="high"`, autres lazy, légende = un fait ou rien. Alt tiré du champ `sujet` de `photos/index.json`.
- **Plaque** : surface `paper-2` + `--shadow-card` sur photo plein cadre, texte jamais posé directement sur la photo.

## Sur-utilisation

- [x] 1. Hallmark SKILL.md, redesign.md lus, Floor appliqué · preuve : `page.css:1-6`, sloplint 0 FAIL
- [x] 2. Audit avant : `sloplint --before` · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 3. Macrostructure et posture nommées · preuve : § Approche
- [x] 4. Deal, draw, scaffold, stamp, entrée de log · preuve : `.hallmark/log.json` (entrée dolce-vita-wepion-legacy), `page.css:1`
- [x] 5. Comp avant build : deux comps, choix écrit · preuve : `comp.md`, `.hallmark/comps/c1-desktop.png`
- [x] 6. Contraste calculé (accent sur papier 7,5 à 8,5:1, crème sur terracotta ≥ 4,5:1) · preuve : tokens.css:15
- [x] 7. Typographie française : apostrophes, insécables, « 12 h 00 », prix « 18 € », aucun tiret cadratin · preuve : `src/data/site.ts` `typo()`, contrôle Python 0 tiret
- [x] 8. Noindex, mention KYW, un seul pied KYW sur les 5 routes · preuve : grep de `dist/` (robots, kyw-signature, Maquette KYW = 1 chacun)
- [ ] 9. `sloplint --render`, états des contrôles en navigateur, horaires « ce soir » : phase 2 et 3
