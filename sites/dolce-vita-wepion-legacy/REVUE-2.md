# Revue legacy · La Dolce Vita (Wépion) · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 1 F2, 4 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant italien familial vu de nuit, fond brun très sombre, titres serif épais crème, terracotta réservé aux actions et aux prix, photo plein écran de la façade et carte « Réserver par téléphone ».
Scores /10 :
- design 7 : hiérarchie nette et sobre (home-planche), vides réduits mais encore 240 à 350 px entre certaines sections (mesure ci-dessous) ; hero mobile encore mal cadré (m-hero.png).
- usabilité 8 : téléphone partout, statut d'ouverture, 0 cible < 24 px, 0 débordement (scrollWidth = clientWidth sur 5 pages × 1440 et 390).
- créativité 6 : parti pris propre mais éditorial standard, inchangé depuis la passe 1 (F3 non traités).
- contenu 8 : faits conformes, filler retiré, texte concret tiré du dossier (prix et plats recoupés dans `donnees.json`).
- technique 8 : build OK, JSON-LD et OG en place, 0 erreur console, 0 requête en échec, 0 contraste sous le seuil, LCP mobile 896 à 1024 ms, CLS 0,001 (QA-revue2).

Preuves : `QA-revue2.md` (accueil et carte, build 21:28 postérieur à `src/` 21:27) ; script maison sur son propre port (serveur arrêté) : 5 pages × 1440 et 390 px, console, réseau, h1, `lang`, axe-core complet, contraste canvas 1x1 + opacité cumulée sur 1 235 nœuds texte (0 sous 4,5 ; 3 pour grands corps), écarts entre sections, captures `.shots-dvwl-rev2/` (`home-planche.png`, `infos-planche.png`, `m-hero.png`, `hero-planche.png`).

## Vérification de REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 JSON-LD | CONFIRMÉ | 1 bloc `ld+json` sur index, carte, infos, la-dolce-vita, 0 sur 404 ; JSON valide : `Restaurant`, adresse (Chaussée de Dinant 1080, 5100 Wépion), téléphone, e-mail, sameAs Facebook et Instagram, 10 plages (lundi, jeudi à dimanche midi et soir, mercredi et samedi soir seul, mardi absent) = `donnees.json` ; ni geo ni aggregateRating |
| F2-1 OG + favicon | CONFIRMÉ | og:type/title/description/url/image/locale/site_name sur 5 pages ; image 1600×900 présente dans `dist/` (105 Ko) ; favicon 128×128 présent. Hypothèse de domaine `kyw-test-restaurant.vercel.app` acceptée (maquette noindex) |
| F2-2 filler | CONFIRMÉ | « passion », « tiennent parole », « en partageant » (titre) : 0 ; « savoir-faire » 1 (/la-dolce-vita/), « rencontre la chaleur » 1 (accueil) ; nouveaux textes (Margherita 12 €, Cappello di Toto 19,90 €, gambas et trois sauces froides, ardoise « au rythme du marché ») tous présents dans `donnees.json` et `dossier.md` |
| F2-3 zones vides | CONFIRMÉ en partie | écart contenu à contenu mesuré à 1440 : avis→emporter 168 px, infos quand→emporter 168 px, compteur→quand 80 px (améliorés ; chiffres du réviseur 104 et 80 sur une autre base) ; colonne titre `.table__tete` sticky. Restent 240 à 350 px (voir F3-6) |
| F2-4 hero mobile | PARTIEL | voir F2-1 ci-dessous : l'enseigne reste coupée, la terrasse cachée |

## Findings

### F2 mineurs
- **F2-1 Hero mobile : la correction annoncée ne tient pas** (`m-hero.png`, `hero-planche.png`). À 390×844 l'enseigne se lit « RESTAURA / 081 85 54 » (coupée à droite), « La Do » coupé, la terrasse et le parasol sont sous la carte ; à 360×740 la carte occupe 484 px sur 740 (65 %) et à 412×915 l'enseigne est coupée aussi. L'image 1920×1080 reste floue à cette échelle. `page.css:304` `object-position: 60% 40%`. Correction : essai à `75% 40%` (enseigne « RESTAURANT 081 85 54 20 » entière, parasol visible, mesuré sur `hero-390-p75.png`) ; sous 400 px de large, carte plus basse (retirer « Voir la carte » ou le statut du hero mobile, déjà dans le menu).

### F3 finition
- **F3-1 axe `landmark-no-duplicate-contentinfo` (modéré) sur les 5 pages** : deux `<footer>` de premier niveau (`Footer.astro:5` `<footer class="mast">` et `packages/kyw-footer` `<footer class="kyw-footer">`). Non critique ; correction : remplacer le `<footer class="mast">` du site par `<div role="group" aria-label="Coordonnées">` (ne pas toucher au paquet KYW).
- **F3-2 Non traités de la passe 1** (hors consigne de REVISION-1) : numéros décoratifs 01 à 05 de la liste de catégories de l'accueil ; alt « poster de la vidéo » (2 occurrences sur l'accueil) ; Google Fonts distant + TTF livrés, 0 `rel="preload"` (29 WARN audit) ; galerie /la-dolce-vita/ avec deux images proches (chariot à vin et ardoise) ; « Ouvrir l'itinéraire » sans survol visible.
- **F3-3 Vides encore marqués sur l'accueil à 1440** : maison→table 288 px, geste→ardoise 352 px, ardoise→avis 288 px, emporter→pied 264 px (`home-planche.png`) ; lisible mais l'accueil fait 7 284 px. Ramener ces `padding-block` à ~200 px.
- **F3-4 « authentique »** (/la-dolce-vita/, texte d'Armando) : mot du filler du prompt § B.2 ; à remplacer par « généreuse » seule.

## Ce qui est bien (à ne pas casser)
1. JSON-LD, OG et favicon corrects, 404 sans JSON-LD et noindex sur chaque page, mention « Maquette KYW, certaines données sont illustratives » et logo KYW unique en pied.
2. Texte sobre et concret, faits et carte conformes, avis et note attribués au restaurant ; réservation par téléphone uniquement, sans outil inventé.
3. Typographie et palette tenues, contrastes mesurés conformes, perfs excellentes, 0 débordement, menu mobile fonctionnel.

## Hypothèses et limites
- Sloplint non relancé (log de la révision : 0 FAIL). Survol et clavier jugés sur `report.json` de la QA (accueil et carte : 12 arrêts, 0 focus invisible) ; `/infos/` et `/la-dolce-vita/` non capturés par la QA, vérifiés par script maison.
- La sonde 404 de la QA est la réponse brute de `serve.mjs` (faux positif connu) ; la vraie `404.html` : title, `lang="fr"`, 1 h1, noindex, 0 erreur.
- Aucun F0 : publication possible ; le F2-1 est la seule correction attendue avant d'appeler le site PUBLIABLE.
