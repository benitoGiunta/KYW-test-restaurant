**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full ; Before : `.hallmark/before.txt` (356 FAIL, 99 REFLEX, 57 WARN sur le site d’origine) ; Keeps : routes (/, /menu/, /carte/, /banquets-et-receptions/, /photos/, /reservation/), tel, mailto, Facebook, iframe Zenchef rid=382492, textes du client ; Files : `src/`, `public/photos/`.
- Shape : Bento Grid (draw 02b4d0) sur l’accueil, multipage conservé. Theme : Atelier (deal 3/3, seed `restaurant-namur-belgian-seasonal-7a42·e87afd81·2026-11-20·r0`) ; écartés : Vellum (blackletter, trop archaïque pour un menu du chef), Spore (sombre, les photos du client sont lumineuses).
- Chrome : barre flottante (le « pill » du draw, coins du thème) ; Hero : Counter ; Signature : le comptoir, trois faits réglés et le bouton de réservation sous le jardin ; Sections : Hero Counter, Statement, Bento, plein cadre sans titre, Switcher + Rows, Schedule + lieu, pied statement.
- Material : photographies du client (9 sur 10 utilisables, la 10 a une bande blanche) ; Comp : c1 de 2 ; Sweep : phase 3.

# Approche
Macrostructure d’origine : one-page d’accueil à slider plein écran + 5 pages (Enfold/WordPress). Gardées : routes, posture calme (le slider WebGL est abandonné : dérogation, carrousel auto → un seul plein cadre, gate 18). Échanges avec le draw : « room as full-bleed with no head » pris ; Switcher midi/soir remplacé par Switcher des formules 3/4 services (la carte n’a pas de séparation midi/soir) ; boutons de créneaux libres non pris (aucun service de disponibilités, rien d’inventé). Test miroir : un voisin au même site n’aurait pas le prune du logo sur papier chaux ni un comptoir à trois faits ; décision changée : accent glissé de l’ardoise au prune.

# Thème
Atelier, tokens dans `src/styles/tokens.css`. Accent : prune `oklch(36% 0.09 325)` (hue lue sur la capture du logo d’origine), focus hue 325. Polices : Sentient 300/400 (titres), Hanken Grotesk 400 (texte).

# Composants
- Carte : Rows (`Rows.astro`), titre col. 1 à 5, description col. 6 à 11, supplément à droite en `tabular-nums`, filets, aucune tuile, aucune carte dans une carte ; au téléphone nom et prix sur la même ligne.
- Switcher : `Formules.astro`, `role="tablist"`, premier panneau visible sans script.
- Horaires : Schedule (`Horaires.astro`), `<dl>` + `<time>`, jours fermés en `--color-muted` jamais barrés, dits ici et au pied ; jour courant : phase 2.
- Pied : statement (phrase, quatre colonnes adresse, contact, horaires, réservation), `data-credits`, puis KywFooter.
- Photo : `Photo.astro`, `<figure>` + `srcset` 800/1600, `width`/`height`, hero `fetchpriority="high"`, légende = un fait.

# Sur-utilisation
- [x] 1. Audit lu avant de juger · preuve : AUDIT.md
- [x] 2. Deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-5
- [x] 3. Pas de tuile icône, pas de carte dans carte · preuve : Rows.astro
- [x] 4. Contenu réel seulement, aucun fictif · preuve : src/data/site.ts
- [x] 5. Pas de tiret cadratin, apostrophes typographiques · preuve : contrôle Python sur src/
- [ ] 6. Nav mobile, formulaire de contact, reveal, jour courant : phase 2
