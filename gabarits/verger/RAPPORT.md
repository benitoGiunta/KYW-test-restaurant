# RAPPORT — gabarit « Verger »

**Concept en une ligne** : la page est un calendrier agricole ; une roue des 12 mois tourne au scroll, le mois réel (horloge
du visiteur) reste en haut en vert, et les plats de la carte réelle y sont accrochés par leurs ingrédients.

## Construit
- 7 pages (accueil, carte, saisons, producteurs, histoire, réservation, 404), `dist/gabarits/verger/`, build OK.
- Signature : `Roue.astro` (SVG 12 secteurs + 24 vignettes HTML, une seule variable CSS `--rot` pilotée par GSAP :
  pin + scrub 300 % desktop / 200 % mobile, contre-rotation des vignettes par `calc()`, dérive idle 0,2°/s seulement
  quand la section est visible, 12 boutons de mois au clavier qui déplacent le scroll dans la piste, secteur survolé →
  produits du mois). Reduced motion : roue fixe sur le mois courant (règles CSS `html[data-mois]`), sans pin.
- Mois réel : `html[data-mois]` posé par un script inline avant le premier rendu ; `Mois.astro` affiche le nom par CSS
  (« de saison » sans JS). Aucune date en dur.
- Loader branche (12 feuilles qui se remplissent, 2,5 s mesuré), rideau qui pousse depuis le bas, hero peint au premier
  rendu (photo 800 px préchargée `fetchpriority=high`, mots sans `data-reveal`, intro par transform/opacité desktop
  seulement).

## QA (shoot + audit, deux passes, port 4409, `.shots-verger/`)
- 0 erreur console, 0 requête échouée, 0 FAIL audit (WARN restants : phrases d'horaires répétées pied de page + section,
  robots/sitemap à la racine et 404 de l'origine, normaux sous `base`).
- Aucun débordement horizontal, aucune cible < 24 px, reduced motion : 0 texte caché, rien ne bouge.
- Accueil : LCP desktop 160 ms, mobile (4x CPU, slow 4G) 2,33 s, CLS 0 / 0,007 ; loader 2,53 s ; 59-60 fps au scroll.
- axe : passe 1 = contraste du rose radis (#dd7a8e) sur crème pour les marques « exemple » et les vignettes du mois →
  corrigé (marques en terre, vignettes du mois en encre bordée de rose, bouton du mois courant en terre souligné rose).
  Reste : « contrastNeedsReview » 15 (textes SVG de la roue, non calculables par axe ; encre sur crème ≈ 7:1).
- Survols : liens (soulignement qui pousse), boutons (encre → terre), étiquette (se soulève 2 px), mois (couleur + trait).
- Corrections mécaniques passe 1 → 2 : contraste, survol de l'étiquette du hero, sortie du loader (2,85 s → 2,53 s),
  photo de hero 800 px (LCP mobile 4,57 s → 2,33 s), vide de 600 px avant le pied de page.

## Scores du critique
Pas de critique dans cet agent (règle du 30/10/2026) : `jury` et revue par l'agent suivant.

## Placeholders (une donnée, un drapeau)
- `ingredients` (24, calendrier indicatif, marque « * calendrier indicatif » sous la roue et sur /saisons/).
- `producteurs` (6, page entièrement illustrative : bandeau + « exemple » par ligne, étiquette d'origine « exemple »).
- `saisons` (4 exemples de carte, « exemple de carte * » par saison).
- `questions[4]` (enfants, « exemple »), `site.email` (« adresse illustrative »), `equipe[2..3]` (« rôle à confirmer »,
  vignette « photo à fournir »), `carte[2]` boissons (« exemple »).
- Réel et vérifié dans dossier.md : menu 4 services et prix, formules, options, horaires, adresse, téléphone, Zenchef,
  privatisation du samedi, bons cadeaux, histoire (4 paragraphes), citations Michelin et site, valeurs, photos.

## Ce qui manque
- Macros d'ingrédients (vignettes typographiques en attendant), producteurs réels, réponse « enfants », e-mail.
- Vignettes de la roue en mobile réduites à des pastilles (34 px) : les noms se lisent dans la légende.

## Leçons structurelles (reportées dans agents/lecons.md)
- Une roue qui tourne avec contre-rotation de N éléments se pilote par une seule variable CSS (`--rot`) et `calc()` ;
  GSAP ne touche qu'un objet JS et `style.setProperty`, aucun layout par vignette.
- Le mois courant posé en `data-` sur `<html>` avant le premier rendu permet un état « réel » sans date en dur, en CSS
  pur (secteur, feuille, étiquette), avec repli « de saison » sans JS.
- Le rose radis (#dd7a8e) ne passe pas le contraste 4.5:1 sur crème pour du texte : réserver les accents clairs aux
  surfaces et aux traits, jamais au texte.
