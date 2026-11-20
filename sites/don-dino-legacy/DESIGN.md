**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes (/, /carte/, /reservations/, /groupes/, /a-propos/, /contact/) + 404
- **Before** · Floor 395 FAIL, Reflex 415 · site blanc à split photo/texte, carte en PDF, bandeaux cookies et navigateur ; les horaires 7 j/7 et le logo manuscrit restent
- **Keeps** · liens externes (Facebook, itinéraire Google Maps, visite virtuelle, recrutement, demande en ligne), `tel:`, routes, tout le contenu réel de `donnees.json`
- **Files** · create : tout `sites/don-dino-legacy/` · delete : none
- **Shape** · Feature Stack (draw 16177b), macrostructure d'origine Photographic/Split, multi-pages gardé
- **Theme** · Squeeze, dealt 1/3, seed restaurant-namur-italian-pizzeria-a89d·07358e77·2026-11-20·r0. Écartés : Overprint (papier gris journal, ne porte ni la chaleur ni le vert du logo), Hum (crème jaune et papier déchiré, trop de matière pour une carte de 115 plats). Squeeze : le vert plein reprend le vert du logo, la pêche des contrôles tient la place du rouge.
- **Chrome** · nav : bord à bord, logo, pastilles et une action (échange du draw « search-led bar » : aucun champ de recherche à porter) · footer : colophon block puis KywFooter
- **Hero** · Index : le texte sur 5 colonnes, la liste de six pizzas avec prix sur 7 (signature)
- **Signature** · la liste de prix des pizzas, de 10,50 € à 17,80 €, posée en hero
- **Sections** · Hero (Index) · Horaires (Figure + Schedule) · Du four à la table (Stack, 3 photos) · La carte en douze rubriques (Rows) · La salle et le bar (Stack, 2 photos + tuile) · Réservation (carte blanche unique, adresse) · Footer
- **Material** · real : carte de 115 plats, horaires, adresse, téléphone, équipements, paiements, 13 photos · pictures : photos du client, logo masqué · absent : avis, presse (titres), desserts, boissons, e-mail
- **Comp** · c1 choisi (voir comp.md)
- **Sweep** · phase 3

## Tokens

Lus dans `src/styles/tokens.css` (scaffold Squeeze) : papier `--color-paper` vert 41 % ; `--color-paper-2` et `-3` ; encre `--color-ink` blanc chaud ; accent pêche `--color-accent` ; carte `--color-card`. Faces : Gabarito 800 (titres, prix), Manrope 500 et 700. Rayons 24 et 16 px.

## Approche

Macrostructure d'origine : split photo/texte avec photos au centre, nommée Photographic (empreinte `petit titre|texte court|aucun filet|bouton plein|photo pleine|aucun reveal`). Posture gardée : site calme, aucune chorégraphie de scroll en phase 1 (volet sticky en CSS pur seulement). Dérogations : bandeau cookies et avertissement navigateur supprimés (dropped), sélecteur FR/EN/NL supprimé (dropped, maquette en français), h1 de 11 à 7 mots (58, `reworded`), faux envoi du formulaire `data-endpoint=""` (70), gabarit « hero, cartes, CTA » évité (`waive 8`). Test miroir : un voisin pizzeria obtiendrait un hero photo + horaires ; ici le hero est une liste de prix sur vert plein, décision changée : la photo ne vient qu'au deuxième écran.

## Thème

Squeeze, vert forêt plein, encre blanc chaud, Gabarito et Manrope, tuiles un cran plus clair, un seul bloc blanc par page (carte de réservation).

## Composants

- **Carte** : Rows (nom en Gabarito à gauche, prix `tabular-nums` à droite, description en dessous), rubriques en colonne sticky à gauche sur /carte/ ; sur l'accueil six rubriques en lignes liées. Pas de Switcher midi/soir : aucune formule connue. Prix lisibles à 375 px.
- **Horaires** : Schedule en `<dl>` avec `<time>`, aucun jour fermé, jour courant par `data-today` (script en phase 2), dits une fois par page ; le pied ne les répète pas.
- **Pied** : colophon block (logo masqué, adresse, téléphone, réseaux, crédits `data-credits`), puis KywFooter.
- **Photo** : `<figure>` avec `data-slot`, `data-alt`, `width`, `height`, `srcset` 800/1600, lazy sauf hero ; légende = un fait.

## Sur-utilisation

- [x] 1. Lire SKILL.md, redesign.md, layout.md, macrostructure 16, genre playful, thème Squeeze · preuve : trace de lecture, session
- [x] 2. Audit `sloplint --before` · preuve : `.hallmark/before.txt`, AUDIT.md
- [x] 3. Deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-3`
- [x] 4. Comp avant build, deux variantes · preuve : `.hallmark/comps/c1.png`, `c2.png`, comp.md
- [x] 5. Données réelles seulement, trous marqués `data-placeholder` · preuve : `src/pages/a-propos/index.astro` (titres de presse)
- [x] 6. KywFooter dernier élément, noindex, 404 · preuve : build (6 pages, `grep kyw-signature` = 1 par page)
- [ ] 7. sloplint --render et jury : phase 3
