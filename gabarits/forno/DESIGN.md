# DESIGN — gabarit « Forno »

## Concept Card
- **Idée** : le site est une fournée. Il commence dans le noir du four (brun), la pâte lève (la photo de la pâte grossit
  jusqu'à remplir l'écran pendant que le nom se réduit dans le coin), le marquee crie les noms des plats, puis la farine
  (crème) prend tout l'écran pour la carte. Un compte à rebours du prochain service, calculé depuis les horaires réels,
  bat dans l'en-tête.
- **Métaphore** : le fournil, de la pâte au four. **Émotion** : la faim, l'odeur de pain qui sort.
- **Verbe de motion** : lève comme une pâte (tout grossit, rien ne glisse latéralement sauf le marquee).
- **Capture signature** : la levée aux deux tiers, photo presque pleine largeur, « AU FEU » en train de rétrécir en haut à
  gauche, le marquee qui pointe en bas.
- **Référence du restaurant** : Les Potes au Feu n'a pas de four à pizza. Le gabarit vise les pizzerias et les tables à
  pâtes ; ici, la pâte de la levée est la photo réelle des mains au travail, le marquee reprend les vrais services du menu,
  et tout ce qui relève du fournil (pâtes fraîches, fournées à emporter) est illustratif et marqué à l'endroit où il s'affiche.

## Système
- **Palette** (tokens.css) : four `#2B1E19` (fond des 3 premières sections, du footer), farine `#F3EDE2` (fond du reste),
  tomate `#C6362A` (seule couleur chaude : compte à rebours, soulignements, boutons), croûte `#B98558` (traits et marques
  sur brun), cendre `#8E8A84` (traits sur farine). Textes doux : `#625B54` sur farine (5,9:1), `#C9BFB3` sur brun (9:1) ;
  tomate sur farine 4,7:1 (texte ≥ 1 rem seulement).
- **Typo** : Big Shoulders Display 800 (Google, `public/fonts/big-shoulders-display-800-normal.woff2`) : titres, marquee,
  chiffres, capitales, line-height 0,85, tracking 0. Erode 400/500 + italiques (Fontshare, `erode-*.woff2`) : texte,
  carte, descriptions en italique, corps 17 px.
- **Grille** : 12 colonnes (`.g12`), blocs photo flottants en asymétrie (col. 1-5 puis 7-12), carte sur 8 colonnes ;
  `.wrap` 90 rem max, gouttière fluide 1 à 2,5 rem.
- **Radius** : 0 ; une seule exception, la carte du compte à rebours (12 px).
- **Texture** : poudre de farine (grain SVG, opacité 0,06) sur le brun uniquement.
- **Motion language** : loader = four tracé (stroke-dashoffset lié à la progression, 1,1 à 2,2 s) ; rideau = porte de
  four (panneau brun qui descend, puis continue vers le bas) ; hero = monte depuis le bas (transform + opacité, desktop
  seulement, tout est peint au premier rendu) ; levée = une variable CSS `--p` 0 → 1 scrubée par GSAP (clip-path, taille
  du titre, scale, marquee) ; marquee = deux pistes en sens inverse, `timeScale` lié à la vélocité Lenis, pause au
  survol, idle lent ; catalogue = stagger de scale 0,96 → 1 ; fournil = parallaxe différenciée ; footer = couches
  (photo qui glisse sous le nom).
- **Reduced motion** : `--p: 1` (photo pleine largeur, titre en coin), marquee statique une ligne, loader = logo fixe
  qui s'efface, compte à rebours mis à jour à la minute sans secondes, aucun reveal.

## Wireframes
```
HEADER (fixe, opaque, prend la couleur de la zone)      [LES POTES AU FEU]  Carte Pâtes Histoire Emporter Réserver  [■ 2j 05h 12m 33s]
HERO (brun, 100svh)      LES POTES                                                     farine ·  Namur
                         AU FEU                                     Bistronomie à Namur. L'histoire d'une rencontre…
                         [Voir la carte] [Réserver]  Descendre vers la levée ↓
                         ████████ photo des mains dans la pâte, collée en bas, bord à bord ████████
MANIFESTE (brun)         Une cuisine bistronomique à quatre mains, avec un ancrage local.
                                                     Et un mot d'ordre : le plaisir.   (deux mots soulignés épais = liens)
LEVÉE (brun, 350vh, scène sticky)    [vignette 320 px]  →  photo plein écran ; « AU FEU » 20vw → 4vw en coin ;
                                     marquee 2 lignes en sens inverse (services du menu) qui traverse l'image à la fin
MENU (farine)            LE MENU DU SOIR ———————————————————————— 08      ○ Mises en bouche      ◉ Saint-Jacques…
                         (fiches : vignette ronde ou disque chiffré, nom gras, description italique, prix)
FOURNIL (farine)         ▇▇▇▇▇ (1-5)        ▇▇▇▇▇▇ (7-12)    ▇▇▇ (2-4)   ▇▇▇▇▇▇ (6-12)    ▇▇▇▇ (1-6)   parallaxe différenciée
GENS (farine)            LES GENS ——— (◄)(►)   [Damien][François][Sara][Jordan] → déborde à droite
SERVICE (tomate)         Midi mer. et ven. 12:00-14:00 · Soir lun.→ven. 19:00-21:00  [Réserver]  +32 81 64 04 44
FIN (brun, couches)      LES POTES AU FEU (géant farine)  ← photo qui glisse par-dessous → colonnes adresse/horaires/suivre
KYW FOOTER
```
Carte : hero mots + 3 catégories en fiches + menus. Pâtes : bandeau « page d'exemple » peint sans JS, 3 catégories ×
4 produits en disques typographiques, aucun CTA de réservation. Histoire : 4 paragraphes réels, portraits, carrousel
des gens, 3 photos. À emporter : bandeau d'exemple, fournées illustratives, téléphone réel, aucun CTA de réservation.
Réservation : Zenchef, téléphone, formulaire de démonstration, horaires. 404 : four éteint.

## Test de généricité
Un modèle ferait un site crème avec une photo de pizza et une carte en trois colonnes. Ici la structure suit la fournée
(brun → farine), la pâte grossit sous les yeux jusqu'à prendre l'écran, les noms des plats traversent l'image en
capitales géantes, et le compte à rebours part des vrais horaires : rien n'est décoratif, tout raconte l'attente du four.

## Règles dures de la skill (preuves après QA, voir RAPPORT.md)
- [x] Polices locales, préchargées (Base.astro `polices`), `font-display: swap`.
- [x] Hero peint au premier rendu : nom, accroche et photo sans `data-reveal`/`data-intro`, photo 960 px préchargée
      `fetchpriority="high"`, entrée par transform/opacité en desktop seulement.
- [x] Reduced motion complet : `--p: 1`, marquee statique, loader fixe, compte à rebours sans secondes.
- [x] `width`/`height` sur chaque `<img>`, lazy sous la ligne de flottaison.
- [x] Liens et assets via `u()`/`asset()` ; noindex ; KywFooter ; `lang="fr"`.
- [x] Une donnée, un drapeau : `site.ts` (rolePlaceholder, pates.placeholder, emporter.placeholder, avis, email).
- [x] Rien de daté : le compte à rebours et le statut se calculent depuis `site.horaires` ; aucune date en dur.
- [x] 0 FAIL audit, 0 erreur console, 0 débordement, axe sans violation sérieuse (`.shots-forno/`, RAPPORT.md).
