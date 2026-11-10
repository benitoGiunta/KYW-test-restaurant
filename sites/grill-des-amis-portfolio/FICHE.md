# Gabarit « Braise »

**Pour qui** : restaurants où le feu est le sujet : grillades et viandes maturées, bistronomie au feu, four à bois,
ramen et bouillons. Référence construite : Les Potes au Feu (Namur).

**Concept** : le site est une soirée au feu. Une température (900 → 20 °C) descend au fil du défilement et règle le
fond (noir fumée → brun braise → ivoire), l'encre, le halo, le grain, le voile des photos et un thermomètre fixé en
bas à gauche. Signature : le chapitre « cuisson », scène sticky où le plat signature, découpé en 4 couches
(assiette, pièce, garniture, jus), se dépose au scrub pendant que la liste 01-04 s'allume.

## Pages et sections

| Page | Température | Sections |
|---|---|---|
| Accueil | 900 → 20 | Hero plein cadre (nom 14vw, pastille ouvert/fermé), Manifeste (mots qui s'allument), Cuisson (scène de couches, 250 svh), Carte du soir (liste index, vignette au survol), Les mains (portraits bichromie braise), Salle (mur de 5 photos en parallaxe), Avis (marquee), Pratique (horaires, plan schématique, boutons), Pied de page finale (nom géant sur brun) |
| Carte | 900 → 60 | Filtre tout / midi / soir, 4 catégories en liste index, 3 formules, 2 photos |
| Les potes (histoire) | 420 → 60 | Hero photo, récit en 4 paragraphes avec diptyque, équipe de 4, 2 photos |
| Réserver | 90 → 20 | Boutons Zenchef / téléphone, horaires, formulaire sans backend |
| Privatiser | 20 | Page claire (« le feu éteint »), 3 formules, photo de salle |
| 404 | 20 | « Le feu est éteint ici », trois retours |

## Composants

- `Thermo.astro` : valeur °C + libellé de chapitre + réglette avec repères cliquables (ancres) au survol ; valeur seule sur mobile.
- Scène de couches (`.cuisson`) : 4 `<img>` détourées (`public/couches/`, produites par `scripts/couches.mjs` à partir d'une photo carrée du plat).
- Ligne de carte (`.plat`) : numéro, nom, description, prix tabulaire ; s'embrase au survol, vignette qui suit le pointeur (inline sur mobile).
- Bouton pilule (`.btn`) : contour braise, remplissage depuis le point d'entrée du pointeur ; `.btn--solid`, `.btn--quiet`.
- `Barre.astro` : barre basse fixe mobile Réserver / Appeler.
- Driver `src/motion/braise.ts` : température par sections `data-temp` (+ `data-temp-end`), en-tête qui s'efface, pastille, cuisson, manifeste, carte, marquee, ancres.

## Adapter à un autre restaurant

1. `src/data/site.ts` : tout le contenu (nom, adresse, horaires, carte, menus, histoire, équipe, avis, photos, manifeste, cuisson, privatisation, colophon). Retirer les `placeholder: true` au fur et à mesure.
2. `public/photos/` : WebP ≤ 1800 px ; `public/couches/` : relancer `node gabarits/braise/scripts/couches.mjs <photo carrée> gabarits/braise/public/couches` après avoir ajusté `FORMES`.
3. `src/data/site.ts › cuisson` : les 4 couches (nom, détail, température indicative).
4. Températures des pages dans `data-temp` des sections ; palette dans `src/motion/braise.ts › STOPS` et `tokens.css`.

## Données exigées

Photos du plat signature (vue de dessus, fond uni) et de la cuisine au passe ; portraits des chefs ; 6 à 8 photos de salle ;
carte complète (midi, soir, desserts, boissons) ; horaires ; outil de réservation ; e-mail de contact.

## Limites

- Les couches sont découpées par masques elliptiques (pas de détourage pixel) : un plat sur assiette ronde et fond uni fonctionne, un plat en vrac demande un détourage manuel.
- Le plan est schématique (SVG), pas une carte réelle.
- La pastille ouvert/fermé lit l'heure du navigateur, sans jours fériés.
