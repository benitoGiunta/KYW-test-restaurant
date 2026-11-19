**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 3 pages (/, /carte/, /404)
- **Before** · Floor 5 règles en échec (7a, 10a, 19, 34, 48) · Reflex 24b, 26b · gabarit hero centré + huit cartes ; la carte complète avec prix reste
- **Keeps** · adresse, téléphone `tel:`, lien de commande yayami.be/shop/, liens de rayons, horaires, zone de livraison, paiement, logo, rouge #df0505, toute la carte (47 plats, 9 menus)
- **Files** · create: tout `sites/yayami-legacy/` · edit: aucun autre dossier
- **Shape** · Letter (one-page gardée, ajout de /carte/ pour la carte complète), tirage 76dd77
- **Theme** · Darkroom, deal 2/3 (seed restaurant-namur-japanese-sushi-488c·a4ce100c·2026-11-19·r0), colourway red ; écartés : Squeeze (vert forêt et fruits, étranger à l'ardoise), Spore (grain de café et rose, plus doux que le noir et rouge du client)
- **Chrome** · nav : barre, logo, trois liens, une action (échange du « search-led bar » : le site n'a pas de recherche utile) · footer : colonnes d'index (horaires, adresse, liens, paiement)
- **Hero** · Ledge : titre à gauche, nigiri à droite, bande « adresse, ouvert 7 jours sur 7 » dessous
- **Signature** · Menu Matsu à 19,90 € en chiffre fin de 6 rem
- **Sections** · Hero · Menus · Livraison (figures en édition) · Index des rayons · Pied
- **Material** · real : carte, prix, adresse, horaires, zone, paiement · pictures : photos du client (11 utilisées) · absent : avis, histoire, réseaux, e-mail, photos de salle
- **Comp** · 2 built, no key · c1 chosen
- **Sweep** · phase 3

# Design system

## Thème et tokens
Darkroom : fond noir chaud `--color-paper` oklch(12.5% 0.008 55), encre `--color-ink`, filets `--color-rule`. Rouge de marque lu dans le CSS du client (`--primary-color: #df0505`) : `--color-accent` oklch(56% 0.235 29) en aplat avec texte `--color-accent-ink` ; `--color-accent-text` oklch(70% 0.19 29) pour survol et texte (le rouge pur donne 4,0:1 sur le fond). Polices : Sofia Sans Extra Condensed 200/400 (titres, chiffres), Barlow 300/400 (texte). Rayon 0, pas d'ombre. Écart au thème : photos en couleur (le saumon est le sujet), `mix-blend-mode: lighten` sur les assiettes à fond noir pour qu'elles se posent sur le fond sans rectangle.

## Composants
- **Carte** : Rows (nom en colonne gauche, détail en `--color-muted`, prix à droite en `tabular-nums`), filets 1 px, jamais de tuile ni de carte dans carte ; page /carte/ : un rayon par section, photo à gauche puis à droite en alternance, saut d'ancre en tête ; accueil : index des sept rayons avec « dès » le prix minimum.
- **Horaires** : le site a le même horaire sept jours sur sept ; deux lignes (midi, soir) sous « Ouvert 7 jours sur 7 » dans le pied, `<time>`, dits une fois. Jour courant : phase 2.
- **Pied** : colonnes d'index sur fond `--color-paper-2` (marque et baseline, horaires, adresse et téléphone, liens, paiement), `data-credits`, puis `KywFooter`.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, `sizes`, hero `fetchpriority="high"`, les autres `loading="lazy"`, légende seulement quand c'est un fait.
- **Nav, bouton, formulaire, reveal** : bouton plein rouge unique par vue, contour pour le second ; reveal en phase 2.

## Sur-utilisation
- [x] 1. Hallmark audit et `sloplint --before` lancés · preuve : AUDIT.md, .hallmark/before.txt
- [x] 2. Macrostructure et posture gardées, dérogations écrites · preuve : en-tête de src/styles/page.css, § Picks
- [x] 3. deal, draw, scaffold, stamp, log · preuve : .logs/deal.log, draw.log, scaffold.log, src/styles/page.css:1
- [x] 4. Deux comps, une choisie · preuve : comp.md, .hallmark/comps/c1 et c2
- [x] 5. Aucun tiret cadratin, insécables, prix « 18 € » · preuve : grep sur dist/yayami/legacy (0 occurrence)
- [x] 6. Noindex, KywFooter sur chaque page · preuve : grep dist (index, carte, 404 : kyw-signature 1, noindex 1, mention 1)
- [ ] 7. sloplint --render sur toutes les routes · phase 3
