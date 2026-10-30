# DESIGN « Cahier »

## Concept Card

- **Idée** : le site est le cahier de la cuisine. Couverture kraft avec étiquette collée, pages quadrillées (CSS 24 px),
  textes tapés en mono, titres en slab, annotations d'origine en bille bleue, photos collées en timbres dentelés ou en
  polaroids, chaque section est une page numérotée (folio en bas à droite).
- **Métaphore** : le cahier de recettes et de fournisseurs que les deux chefs tiennent au passe.
- **Signature** : le menu du jour s'écrit sous les yeux : trois lignes (entrée, plat, dessert) en Caveat, converties en
  tracés SVG au build (fontkitten, `components/Manuscrit.astro`), tracées par `stroke-dashoffset` quand la bande entre à
  l'écran, puis la date est tamponnée (scale 1.4 → 1, rotation -6°, back.out, 0,25 s).
- **Émotion** : la confiance de lire les notes de quelqu'un qui sait d'où vient ce qu'il cuisine.
- **Verbe de motion** : se pose comme du papier (étiquette qui se colle, photos qui se posent, cartes qui tombent).
- **Capture d'écran** : la page carte, sommaire pointillé 01-12, annotation bleue « de chez Mathieu, Wépion », timbre incliné.

## Système

- **Palette** (cahier) : papier `#F5F0E4`, quadrillage `#E3DCCB`, encre bille `#2448A6`, rouge correcteur `#D43D2E`,
  mine `#5E5B55` (texte courant : contraste 5,9:1 sur papier), kraft `#D8C39B` (couverture et dos), encre noire
  `#1E1C19` pour les titres. Marqueur jaune pâle `#F7E9A3` pour le surlignage des lignes du sommaire.
- **Typo** : Sometype Mono 400/700 (Google, `public/fonts/`) pour texte, nav, prix, sommaire, corps 16 px, chiffres
  tabulaires ; Bespoke Slab 700 (Fontshare) pour les titres, tracking -0,01em ; Caveat 500 (Google) pour les annotations
  qui portent une information (origine, date, correction, signature, citation), 20-28 px, couleur bille.
- **Grille** : `.feuille` = colonne de lecture `minmax(0, 64ch)` + marge d'annotations `minmax(14rem, 1fr)` ; en mobile
  la marge passe sous le bloc. Gouttière fluide, largeur maximale 76 rem.
- **Rythme** : blocs courts séparés par des filets pointillés ; chaque section est une « page » avec folio ; couverture
  et dos sur kraft, pages intérieures sur papier quadrillé.
- **Radius** : 2 px sur les photos, 0 ailleurs. **Textures** : uniquement le quadrillage CSS (pas de grain, pas de tache).
- **Motion language** : poser (scale 1.05 → 1 ou rotation vers l'angle final, ease.out 0,8 s) ; tracer (dashoffset,
  1,1 s par ligne) ; tamponner (back.out 0,25 s). Idle : aucun, page calme (décision : un cahier posé ne bouge pas).
  Reduced motion : tout est affiché posé et tracé, timbres droits.

## Wireframes

```
HEADER (cellules fixes, filet bille)  [adresse | tél]  [ NOM ]  [Réserver] [Commander]
COUVERTURE (kraft)   ┌ étiquette ───────┐          ╭ photo collée -2° ╮
                     │ Les Potes au Feu │          │                  │
                     │ cahier n° 6      │          ╰──────────────────╯
                     │ saison automne   │   « Bistronomie à Namur… »   [Voir la carte]
MENU DU JOUR (bande) Entrée  ~~~~tracé Caveat~~~~        (tampon date)
                     Plat    ~~~~~~~~~~~~~~~~~~~~        prix mono
                     Dessert ~~~~~~~~~~~~~~                              p. 2
SOMMAIRE             01 Plat ........................ 18 €   | ↑ de chez Mathieu, Wépion
                     02 Plat ........................ 24 €   |                           p. 3
FOURNISSEURS         [timbre] [timbre] [timbre]   nom + village mono, flèche manuscrite
                     [timbre] [timbre] [timbre]                                          p. 4
CARTE POSTALE        ┌ photo ┐  ┌─ cadre coins ornés ─┐ texte 1re personne, signature
ÉQUIPE               (card -2°)(card 1.5°)(card -1°)(card 2°) prénom slab, photo ronde, phrase
AVIS EN MARGE        « citation Caveat »  source mono  ×3
PRATIQUE             horaires tableau mono | plan au trait SVG | [Réserver] [Appeler]
DOS (kraft)          NOM en slab, fin du cahier, p. 9, colonnes contact, KywFooter
```

## Test de généricité

Un modèle produirait un site crème avec une police manuscrite dans les titres. Ici la manuscrite est réservée à
l'information (origine, date, signature), le cahier est une structure (couverture kraft, sommaire, folios, marge
d'annotations, dos) et le menu du jour tracé n'existe que parce que la maison change sa carte chaque jour.

## Règles dures de la skill (preuve)

- [x] Moteur de la skill (gsap + lenis, loader, transitions, reveals) : `src/engine/` du socle, non modifié.
- [x] Loader personnalisé (étiquette qui se colle, compteur « p. » ) et transition personnalisée (page kraft qui se tourne) : `src/motion/setup.ts`.
- [x] Polices auto-hébergées, `font-display: swap`, préchargées : `Base.astro`, `public/fonts/`.
- [x] Reduced motion : classes `.motion` du moteur ; `cahier.ts` teste `prefersReducedMotion()` et pose l'état final.
- [x] Hover par rôle : cellules qui s'inversent (bille sur papier), lignes du sommaire au marqueur, timbres qui se redressent, liens soulignés en bille.
- [x] Focus visible : contour bille 2 px (`base.css`).
- [x] `lang="fr"`, noindex, JSON-LD, canonical, OG : `Base.astro`.
- [x] Pied de page KYW sur chaque page, une seule mention « Maquette KYW ».
- [x] Copy sans tiret cadratin, vouvoiement, placeholders marqués dans `site.ts`.
- [ ] Preuves QA (shoot/audit) : voir RAPPORT.md.
