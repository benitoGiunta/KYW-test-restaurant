# KYW · Know Your Website

Sous-marque de KYN pour l'offre site web. Même forme de logo, même ardoise, même clair et mêmes polices que KYN ;
le **pêche remplace le turquoise**. Validé le 20/10/2026 dans l'artefact « Marque KYW » :
https://claude.ai/artifact/B6HTRiMqhRtahJZfYEJVWW (positionnement, palette, bac à sable des logos).

## Positionnement (proposition à valider)

- **Nom** : KYN pose la question de vos besoins (Know Your Needs) ; KYW en fait un site que vous connaissez (Know Your Website).
- **Promesse** : un site qui répond à ce que vos clients cherchent, et que vous comprenez.
- **Pour qui** : indépendants, commerces et PME de la région de Namur, en priorité ceux qui n'ont pas encore de site
  (repérés dans `../../searchentreprise/`).
- **Ton** : direct, concret, sans jargon, vouvoiement.

## Couleurs

| Rôle | HEX | Usage |
| --- | --- | --- |
| Ardoise | `#314044` | Lettres du logo, textes, fonds sombres (commune avec KYN) |
| Clair | `#E1E2E3` | Branche du Y, tuiles, fonds clairs (commune avec KYN) |
| Pêche | `#FFB38A` | Accent : courbe du K, boutons (texte ardoise ou nuit, jamais blanc), barre de la baseline |
| Pêche 500 | `#F0935F` | Lueur du logo |
| Pêche des grands textes | `#C9693A` | « Website » de la baseline, titres de 24 px et plus (3,8:1 sur blanc) |
| Liens sur clair | `#B35A2E` | Liens et petits textes pêche sur fond clair (4,8:1) |
| Liens sur Nuit | `#FFD7C2` | Liens sur fond sombre (13,3:1 sur `#101A1D`) |

Gamme pêche 50 → 950 : `#FFF6F1` `#FFEADF` `#FFD7C2` `#FFC4A6` `#FFB38A` `#F0935F` `#D9773F` `#B35A2E` `#8A4424` `#5E2F1A` `#33190E`.
Palette Nuit et nuances ardoise : celles de KYN (`../couleurs/`). Le turquoise n'apparaît pas dans les supports KYW.

## Structure

| Dossier | Contenu |
| --- | --- |
| `marque.json` | Réglages de la marque : couleurs, gamme, 3e lettre, mot de la baseline |
| `logo/png/` | Pièces raster : le KY (N retiré) et le K seul, en couleur, blanc, blanc-accent et noir |
| `logo/svg/` | SVG maîtres de chaque version |
| `exports/` | Un dossier par version, mêmes numéros que `../exports/` (KYN) ; vidéos et animations exclues (n° 14, 16, 17) |

Les scripts sont communs à toutes les sous-marques : `../sous-marques/source/`. Régénérer :
`cd branding/sous-marques/source && node generer.mjs ../../kyw`.

## Méthodes retenues

- **Couleur (méthode F)** : chaque nuance du turquoise est remplacée par la nuance pêche adoucie (chroma −30 %) de même
  clarté. La transition ardoise → pêche dans le fût du K reste celle du dessin turquoise.
- **Blanc, courbe pêche (n° 7 bis, variante D)** : fondu blanc → pêche long et progressif, sans passer par le sombre.
- **Lueur** : pêche 500 `#F0935F`, renforcée (flou 52, intensité 2,4 dans le repère du logo), sur toutes les versions qui en ont une.
- **Tuiles** (n° 2, 9, 10 bis, 10 ter) : bordure pêche fine et un reflet de flash sur le bord du bas, découpé sur la bordure.

## Limites connues

- Le **W** est un tracé d'essai à la hauteur et à l'épaisseur du N, sans le rendu 3D du K et du Y : à retracer.
- Les SVG intègrent le K, le Y et la courbe en **PNG** (base64) : ils s'affichent partout mais ne sont pas entièrement
  vectoriels. Le W, les barres, les bordures et les textes (convertis en tracés) restent vectoriels.
- Pas de **PDF CMJN** : Ghostscript n'est pas installé dans l'environnement de génération. Les PDF sont en RVB.
- Blanc et noir sont **calculés** à partir du logo couleur, pas retracés à la main.
