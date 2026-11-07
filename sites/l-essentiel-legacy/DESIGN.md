**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes + 404 (/, /les-chambres/, /carte-menus/, /reservation/, /contact/, /recrutement/)
- **Before** · Floor FAIL en masse (thème WordPress sans CSS au rendu), Reflex 24 ; photos de salle et carte complète à garder
- **Keeps** · liens externes (Facebook, Instagram, mentions légales, calendrier d’origine, « réserver une chambre » vers /contact-2/), `tel:`, `mailto:`, six routes, champs du formulaire de réservation (name1, email1, phone1, date_booking1, rangetime1, details1)
- **Files** · tout est neuf dans `sites/l-essentiel-legacy/` ; aucun autre dossier touché
- **Shape** · Bento Grid (draw 109d8c), routes d’origine gardées
- **Theme** · Vellum, dealt 1/3, seed restaurant-namur-creative-seasonal-5457·d708bb1b·2026-11-07·r0, colourway parchment. Écartés : Hedgerow (vert sombre, original clair), Carnival (jaune, display poster, ton faux)
- **Chrome** · nav : bandeau sur barre fine (téléphone, réseaux), action « Réserver » à droite ; pied : colonnes d’index sur fond encre
- **Hero** · Counter (comptoir de réservation sur la photo de salle)
- **Signature** · la salle aux tulipes et le comptoir en gothique, première chose vue
- **Sections** · Hero · Lieu (bento) · Distinctions (bande ultramarine) · Carte (Rows) · Chambres (Split) · Horaires (Schedule) · Réservation (Split) · Pied
- **Material** · real : photos client, carte, prix, horaires, Michelin, Gault&Millau · absent : avis, chef (à confirmer), baseline
- **Comp** · c1 choisi (voir comp.md)
- **Sweep** · phase 3

# DESIGN.md

## Approche
Macrostructure d’origine : multipage de restaurant, hero slider puis blocs courts. Gardé : six routes, ordre place, chambres, carte, réservation. Posture calme. Dérogations : slider supprimé pour une photo (18), `waive 8` (séquence gardée, composition neuve), formulaires avec `data-endpoint=""` (70), `vh` jamais utilisé (`dvh`). Test miroir : un voisin avec le même site n’aurait pas un comptoir gothique sur une photo de brique et de tulipes ; changé par rapport au tirage : comptoir chevauchant la photo.

## Thème
Vellum parchment : tokens dans `src/styles/tokens.css` (papier oklch 94 % 0,024 82, encre 23 %, accent ultramarine 43 % 0,17 268). Polices Grenze Gotisch 600 (h1, h2), Grenze 400 (chiffres des distinctions), Hanken Grotesk 400/500/600. Rayon 2 px, filets 1 px, double filet 4 px, pas d’ombre. Une bande ultramarine par page au plus.

## Composants
- **Carte** : Rows (titre col. 1 à 4, détail 5 à 10, prix tabulaire à droite) ; page carte : Switcher menus/carte (`role="tablist"`, deux panneaux visibles sans script). Plats de la carte en deux colonnes ruled.
- **Horaires** : Schedule `<dl>`, jours fermés en `--color-muted`, jamais barrés ; fermetures annuelles dites une fois, dans le pied.
- **Pied** : index columns (site, contact, horaires, fermetures), `data-credits`, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, hero `fetchpriority="high"`, les autres lazy, légendes factuelles ; photos de plats datées de 2018, dites.
- **Nav, bouton, formulaire, reveal** : états complets en phase 2.

## Sur-utilisation
- [x] 1. Hallmark lu : SKILL.md, redesign.md, layout.md, anatomy § book, thème Vellum et image · preuve : cette session
- [x] 2. Audit et before enregistrés · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 3. deal / draw / scaffold / stamp · preuve : `src/styles/page.css:1-5`, log partagé
- [x] 4. Deux comps, un choix écrit · preuve : `comp.md`
- [x] 5. Entrée du journal `.hallmark/log.json` · preuve : voir ETAT.md (à compléter phase 3 par `theme.mjs log`)
- [ ] 6. sloplint --render : phase 3
