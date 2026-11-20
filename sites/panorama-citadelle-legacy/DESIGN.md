**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full, contenu et wiring gardés, système et composition neufs
- **Before** · AUDIT.md (site WordPress brun, héros photo + bandeau, cartes en PDF)
- **Keeps** · 4 routes (accueil, le-panorama, la-carte, reservation-contact), tel, mailto groupes, Facebook, Instagram, Maps, lien de réservation du site actuel, PDF des cartes
- **Files** · src/styles/{tokens,base,page}.css, src/layouts/Base.astro, src/components/*, src/pages/*, src/data/{site,carte}.ts
- **Shape** · Photographic (draw 263af1), job: book
- **Theme** · Solstice, dealt 2/3, seed restaurant-namur-brasserie-bistronomy-fb23·08cd4f7e·2026-11-20·r1 (re-deal 1 fois : le premier tirage Vellum, Ink, Sport ne portait ni brun chaud ni cuisine de brasserie). Écartés : Darkroom (noir et blanc, contredit des photos couleur de la vue), Brutal (affiche jaune, hors de la tonalité d'une table élégante).
- **Chrome** · nav : bandeau, wordmark, deux liens, un bouton Réserver · footer : colonnes d'index sur brun, adresse, contacts, réseaux, crédits
- **Hero** · Counter : titre en colonnes 1 à 5, vue sur la Meuse en 4:3, guichet adresse, téléphone, accès
- **Signature** · la vue sur la Meuse au guichet de réservation, première chose vue
- **Sections** · Hero, Split (lieu), Rows (carte), Band (chef, four à bois, Pano), Schedule (horaires), Split (réservation + photo)
- **Material** · real : 20 photos du client, carte transcrite, adresse, tel, groupes@, horaires du site · pictures : photos du client · absent : avis, notes, métriques, témoignages
- **Comp** · non construites (phase 1), voir comp.md
- **Sweep** · phase 3

## Approche
Macrostructure : multi-pages calme, quatre routes gardées. Posture : héros Counter (la réservation ouvrait le site), aucun mouvement en phase 1. Dérogations : widget Zenchef remplacé par le lien du site actuel (`dropped`), bandeau cookies et vidéo plein écran retirés (`dropped`), faux envoi du formulaire `data-endpoint=""` (70). Hypothèse : le tirage proposait « les prochains horaires libres en boutons » : refusé, aucune disponibilité réelle. Test miroir : un voisin au même site n'aurait pas un héros 4:3 avec guichet à trois cellules sur Solstice, brun encre et or.

## Thème
Solstice (crème, encre brune, Yeseva One, Archivo, filets or, ombres dures, vermillon). Le brun du site d'origine est repris en encre ; le vermillon remplace le beige-rose du logo comme unique signal.

## Tokens
Voir src/styles/tokens.css (palette, échelle d'espaces, `--text-*`, `--dur-*`). Aucune couleur en dur dans page.css.

## Composants
- **Carte** : Rows (nom à gauche, prix `tabular-nums` à droite, description en dessous), onze rubriques, index d'ancres en tête ; aucune tuile, aucun encadré ; filets 2 px ink et 1 px rule (F6, F24, F25).
- **Horaires** : Schedule en `dl` + `<time>`, sept jours, dits une fois par page ; jour courant : phase 2.
- **Pied** : colonnes d'index sur bande encre, adresse, téléphone, groupes, réseaux, `data-credits`, puis KywFooter.
- **Photo** : `Fig.astro`, `<figure data-slot data-alt>`, srcset 800/1600, width/height, hero `fetchpriority="high"`, légende = un fait.
- **Nav, bouton, formulaire, reveal** : états de base posés, comportement en phase 2.

## Sur-utilisation
- [x] 1. Audit et captures de l'original lus · preuve : AUDIT.md
- [x] 2. Deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-9, .hallmark/log.json
- [x] 3. Fonts via Build hint, tokens seulement · preuve : Base.astro, page.css (aucun hex)
- [x] 4. sloplint --render sur le build · preuve : .logs/legacy-lint-x.log (1 FAIL 34 faux positif, @import non suivi ; REFLEX 44c, 59, 79 waived)
- [ ] 5. Comps c1/c2 · reporté en phase 2 (budget)
