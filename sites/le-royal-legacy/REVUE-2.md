# Revue legacy · Le Royal Namur · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 1 F2, 6 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une page unique brun et crème qui pose la façade en brique de la brasserie en demi-écran, puis la carte complète (62 lignes, prix en chiffres gras), les moules jumbo, le menu des fêtes et les horaires.

Méthode : `REVISION-1.md` relu point par point ; captures de l'agent captures (`QA-revue2.md`, `.shots-le-royal-legacy-revue2/home/`, prises à 01:06 après le build de 01:03, donc valables) ; mesures ciblées sur mon propre serveur (port 4561, PID 10112, arrêté) : CLS et LCP sous CPU x4 + 4G lente (2 passes, 390 et 1440 px), axe complet 2 pages x 2 largeurs, contraste canvas nœud par nœud (171 nœuds texte), dimensions réelles des fichiers par PIL, familles et graisses réellement demandées, héros à 1920, 1280, 820, 360 px, liens internes, texte du dist. Aucun shoot complet relancé.

## Vérification des corrections annoncées (REVISION-1)
| id | annonce | constat | verdict |
|---|---|---|---|
| F1-1 CLS mobile | 0 et 0 | confirmé : CLS 0 et 0 à 390 px, et 0 et 0 à 1440 px sous throttle ; aucun `layout-shift` ; les 3 polices passent à `loaded` et le h1 s'affiche en Yeseva One (la bascule de police a disparu). QA : CLS 0 desktop et mobile | corrigé |
| F2-1 façade étirée | image 806 x 602 sans étirement | confirmé : figure 806 x 602 à 1440 px (ratio 1200/896 respecté), fichier `facade-1200.webp` réellement 1200 x 896 (PIL), `facade-800.webp` 800 x 597 ; à 1920 px figure 1075 x 803, à 390 px 390 x 293 : jamais de recadrage vertical ni d'agrandissement du fichier (x1,5 de réduction). La capture `d-01-hero.png` est nette. Le halo bleu circulaire en coin vient de la photo source (F3-6) | corrigé |
| F2-2 polices | woff2 latin, 3 preload, 0 Google | confirmé : `fonts/` 3 woff2, 3 `rel="preload" as="font" crossorigin` dans `index.html`, 0 `fonts.googleapis` dans `index.html` et `404.html`, 63 Ko de polices (QA) | corrigé |
| F2-3 images lourdes | 98 / 146 / 295 Ko | confirmé sur disque : terrasse 640 = 96 Ko, 800 = 143 Ko, 1200 = 287 Ko (< 300) ; autres variantes de 60 à 160 Ko ; le mobile charge `terrasse-640` et `facade-800` | corrigé |

## Scores /10
- Design 7 : la façade n'est plus molle ni étirée, le héros respire ; carte lisible (`d-03-scroll.png`, `m-03-scroll.png`) ; reste l'espace mort de ~120 px sous le héros à 1440 x 900 et la vignette bleue de la photo.
- Usabilité 8 : 0 débordement (scrollWidth = largeur à 1440 et 390 px, et à 1920, 1280, 820, 360), 0 cible < 24 px à 390 px, focus visible, 12 arrêts clavier sans piège (QA), « Réserver » toujours dans la nav.
- Créativité 5 : propre mais prudent ; une seule idée (héros 50/50 et bande des fêtes), carte très longue sans respiration.
- Contenu 8 : texte inchangé depuis la passe 1 (62 plats conformes, 0 invention non marquée, vouvoiement, 0 tiret cadratin) ; coordonnées encore répétées (F3-1).
- Technique 9 : 0 erreur console, 0 requête en échec, CLS 0, LCP mobile 1,4 s sous throttle (1,0 s desktop), 0 texte sous contraste (171 nœuds), JSON-LD Restaurant, 686 Ko pour la page, polices préchargées.

## Findings

### F2 mineur
- **F2-1 · Deux `<footer>` de premier niveau : axe `landmark-no-duplicate-contentinfo` (moderate) sur `/` et sur `/404.html`.** Preuve : axe complet à 1440 et 390 px ; le `dist/index.html` contient `<footer class="pied">` (composant `Pied.astro`) et `<footer class="kyw-footer" aria-label="Réalisation">` (paquet `kyw-footer`). Non vu par `shoot.mjs`/QA (leçon revue.md du 01/11). Correction : dans `Pied.astro`, remplacer `<footer class="pied">` par `<div class="pied">` (ou lui donner un `aria-label` distinct et le sortir du rôle `contentinfo` par `role="group"`), sans toucher au paquet `kyw-footer`. N'interdit pas la publication (impact moderate, 0 critique).

### F3 finition
- **F3-1 · Coordonnées répétées** (inchangé depuis REVUE-1) : le téléphone figure 5 fois dans le texte, l'adresse et l'e-mail dans « Une table au Royal » puis dans le bloc de clôture. Garder les réseaux et la phrase dans le bloc de clôture.
- **F3-2 · Apostrophes droites dans 4 noms de plats** (inchangé) : « d'Anvers », « l'italienne », « d'acacia », « d'Oc » ; normaliser en `’` au rendu de la carte.
- **F3-3 · Divergence d'horaires du dossier non signalée** (inchangé, 11 h-23 h du PDF contre cuisine 12 h-14 h 30 et 18 h-22 h) ; n° 13 contre 2 : à confirmer avec le client, déjà dans ETAT.md.
- **F3-4 · `heading-order` (moderate)** : le premier `<h4>` « En-cas » (`#c-manger-0`) est signalé par axe à 1440 px (h2 « La carte » → h3 « À manger » → h4 ; le h3 est probablement dans le contrôle d'onglet). Vérifier que chaque rubrique est précédée d'un titre de niveau supérieur dans le DOM ou la remplacer par un `role="heading"` cohérent.
- **F3-5 · Archivo Narrow demandé en 400 sans fichier 400** : 2 `figcaption` (famille « Archivo Narrow », graisse 400) retombent sur le seul fichier 600 déclaré ; soit déclarer ces légendes en 600 sur Archivo (variable 400-500), soit assumer.
- **F3-6 · Vignette bleue circulaire dans la photo de façade** (`d-01-hero.png`, coin supérieur) : défaut de la source `08-facade.png`, pas du rendu ; un recadrage de quelques pour cent en haut et sur les côtés la masquerait. Espace mort de ~120 px sous le héros à 1440 x 900 : réduire le `padding-bottom` du héros.

## Vérifications sans écart (ne pas rouvrir)
- Build servi : `index.html` et `404.html` 200 ; liens internes 200 ; `lang="fr"`, un h1, `title` unique (« Le Royal Namur, brasserie Place du Théâtre » ; « Page introuvable, Le Royal Namur »), description et `og:image` présents ; noindex, mention « Maquette KYW, certaines données sont illustratives » et un seul `.kyw-footer__logo` sur les deux pages ; reduced motion : 0 `[data-reveal]`, 0 texte masqué.
- Liens externes : Zenchef rid 383850, Facebook, Instagram, Google Maps, PDF carte et PDF fêtes (inchangés depuis la passe 1).

## Ce qui est bien (à ne pas casser)
1. Le héros réglé : façade sans recadrage vertical, `aspect-ratio` qui réserve la place (CLS 0), polices préchargées et auto-hébergées (63 Ko).
2. La carte en rubriques à filets et prix en Yeseva alignés à droite, lisible à 1440 comme à 390 px.
3. La nav collante à une ligne avec « Réserver » toujours visible, menu dialog sur téléphone, 0 débordement de 360 à 1920 px.
