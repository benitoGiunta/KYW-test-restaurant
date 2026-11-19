**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 4 pages (/, /menu/, /vins/, /contact/) + 404
- **Before** · Floor 217 FAIL (CSS WordPress), Reflex 36 · une page de 14 sections à modale, belle matière (carte, horaires, coffres) mal composée
- **Keeps** · tous les liens (tel, mailto, Facebook, Tripadvisor, pizzy.be, PDF à emporter), les 4 routes, toute la carte (181 lignes), les horaires, les 3 avis Tripadvisor verbatim · à vérifier : avis datés de 2023
- **Files** · create: sites/pizzeria-doria-legacy/** · delete: none
- **Shape** · Photographic + Index (macrostructure 08, empreinte `Gabarito 800|Rows|filet de rang|bouton pêche et contour|photo plein cadre|aucun reveal`), one-page gardée ; draw 6f9b68 (Split Studio) échangé contre la forme d’origine
- **Theme** · Squeeze, dealt 2/3 (vert forêt, encre blanc chaud, Gabarito 800 sur Manrope) · écartés : Vellum (parchemin, trop sage pour une pizzeria de famille), Atelier (calcaire et serif, parfumerie)
- **Chrome** · nav : slab (barre vert profond, marque et trois liens, Réserver) · footer : index columns
- **Hero** · Ledge : photo pleine largeur, plaque verte au pied avec titre, phrase, deux actions
- **Signature** · le mur de casiers : les horaires en tuiles de coffre (jour fermé en contour, jamais barré) au pied de la salle des coffres
- **Sections** · Hero · Suggestions et à emporter (carte blanche unique) · Midis (Rows) · Carte (prix 7,50 € en figure) · Histoire · Avis · Salle des coffres · Fin (réservation, horaires, emploi)
- **Material** · real : tout le dossier · pictures : 4 photos client (coffres, friture, roquette, bouchons) dont 2 utilisées, 4 Unsplash illustratives (`data-placeholder`) · absent : note Google, abonnés
- **Comp** · non construite (voir comp.md)
- **Sweep** · phase 3

# Approche

Macrostructure 08 Photographic mêlée à l’Index de la carte. Posture : routes gardées, calme, pas de scroll chorégraphié (une seule animation possible en phase 2, un reveal). Dérogations : modale supprimée (fond masquant, 18), carrousel absent, `vh` en `dvh` (6a), pas de formulaire. Test miroir : un voisin avec « pizzeria familiale » obtiendrait vert + pêche, mais pas le mur de casiers ni la salle des coffres ; la décision changée est de ne pas ouvrir sur la carte.

# Thème

Squeeze, `dealt 2/3, seed restaurant-namur-pizzeria-italian-b962·335f4bf6·2026-11-19·r0`. Il porte la matière de l’original : le vert sapin de l’affiche de novembre et le vert du logo (tricolore). Pas de couleur de marque imposée (logo noir, filet vert-blanc-rouge, fourni tel quel dans le pied).

# Tokens

Source de vérité : `src/styles/tokens.css` (paper oklch 41/47/34 % sur teinte 154, ink blanc chaud, accent pêche 83 % teinte 56, carte blanc crème). Polices : Gabarito 800, Manrope 500 et 700 (trois graisses). Rayons 24 et 16. Rangs : filet 1px entre lignes de carte uniquement.

# Composants

- **Carte** : Rows (`Rows.astro`), titre colonnes 1 à 5, description au milieu, prix Gabarito à droite en `tabular-nums` ; sur téléphone nom et prix sur la première ligne, description dessous (F25) ; navigation par ancres en pastilles (Index), tout est visible sans script ; jamais de tuile à icône ni de carte dans une carte.
- **Horaires** : Schedule en `<dl>` de sept tuiles « casiers » (`Fin.astro`), `<time>` par plage, mardi et mercredi en contour et `--color-muted`, jamais barrés ; dits une fois (en fin de page et sur chaque page via Fin), pas d’horloge. Jour courant par étape de surface : phase 2.
- **Pied** : index columns (logo carré fourni, le site, nous joindre, nous suivre, paiement et TVA), `data-credits`, ni « Tous droits réservés » ni newsletter, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>` avec dimensions, `srcset`, hero `fetchpriority="high"`, autres `lazy`, `data-placeholder` pour le stock.

# Sur-utilisation

- [x] 1. Hallmark SKILL.md et redesign.md lus · preuve : AUDIT.md, DESIGN.md
- [x] 2. sloplint --before lancé · preuve : .hallmark/before.txt
- [x] 3. deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-7, tokens.css
- [ ] 4. comps c1 et c2 construites · non faites en phase 1 (comp.md, ETAT.md)
- [x] 5. build statique des 4 routes + 404 · preuve : dist/pizzeria-doria/legacy/
- [x] 6. noindex, mention KYW et signature sur 5 pages · preuve : grep de dist
- [ ] 7. sloplint --render sur le build · phase 2
