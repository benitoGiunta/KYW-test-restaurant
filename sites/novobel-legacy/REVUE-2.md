# Revue legacy · Novobel · passe 2
Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : entreprise de rénovation namuroise en éditorial calme (photo plein cadre et carte de titre, fond crème, serif, listes à filets), propre et crédible, mais sans geste propre au métier.

Méthode : build `dist/novobel/legacy/` de 10:08, postérieur à `src/` (10:05) ; QA-revue2 et ses planches lus (3 pages seulement, 404 brute) ; script maison `novobel-legacy-rev2-mesure.mjs` sur les 6 pages (dont `404.html` réel) à 1440 et 390 px : axe complet, console, requêtes, débordement, cibles, images, opacité 0, méta ; texte extrait de `dist/` ; 18 liens internes testés ; planches `.shots-novobel-legacy-revue2/r2-A.png` à `r2-D.png` (accueil, services, projets, carrière, articles, 404 en desktop et mobile) ouvertes.

Mesures : 0 erreur console, 0 requête en échec, 0 lien mort (18 liens, dont l'ancre `#a-propos` présente), 0 débordement (scrollWidth = largeur à 1440 et 390), 0 violation axe sur 12 cas (5 « à revoir » de contraste à 1440, déjà classés dans REVUE-1), 0 image cassée, 1 `h1`, `lang="fr"`, `noindex`, mention « Maquette KYW… » et un seul logo KYW sur les 6 pages, 0 cible < 24 px (le lien de la 404 mobile est conforme), 0 texte à l'opacité 0 en desktop. Pas de F0.

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constat |
|---|---|---|
| F1-1 | corrigé | CONFIRMÉ : `grep` de `stock|compléter|viendront|n'a pas été repris` sur `dist/` = 0 ; `data-credits` de Photo neutralisé (« Photo illustrative ») ; ligne Horaires absente du pied (planches C et B). |
| F1-2 | corrigé | PARTIEL. Articles sorti de la nav et du pied : confirmé (nav = Accueil, Services, À propos, Projets, Carrière). Carrière : note de candidature spontanée présente : confirmé. **Projets : la photo « visite de chantier » annoncée n'existe pas dans `dist/`** (voir F1-A). |
| F2-1 | corrigé | CONFIRMÉ desktop : carte à droite, ouvrier entier visible entre l'échelle et le velux (`r2-A`). Mobile : carte sur la photo, voulu. |
| F2-2 | corrigé | CONFIRMÉ : étapes Conception, Accompagnement, Finitions réécrites, la contradiction « propriétaire d'un terrain / rénovation » a disparu (extrait de `services/index.html`). |
| F2-3 | corrigé | PARTIEL : h2 « Devis gratuit » et délai déplacé, mais la mention est devenue une note d'atelier (F2-A). |
| F2-4 | corrigé | CONFIRMÉ : accueil = métiers en titres seuls et Livraison en une phrase ; détail seulement sur /services. |
| F2-5 | corrigé | PARTIEL : canonical, `twitter:card`, JSON-LD présents sur les 6 pages ; `og:image` reste relatif (F2-B), que REVISION signale lui-même. |
| F3-3 | fait | CONFIRMÉ : h1 « Quatre projets, vingt-huit logements » (4+14+6+4 = 28) ; alt de `halle` neutre. |
| F3-4 | fait | PARTIEL : numéros retirés des métiers de l'accueil ; restent 01 à 05 sur /services et 01 à 04 sur /projects (F3-A). |

## Scores /10
- Design 6 : hiérarchie nette, hero lisible avec ouvrier visible (`r2-A`), mais gabarit éditorial générique et pages internes très aérées.
- Usabilité 7 : menu popover, un seul primaire par écran, cibles ≥ 24 px, 0 débordement à 390 ; formulaire toujours sans envoi réel.
- Créativité 4 : rien de propre au chantier, inchangé depuis la passe 1.
- Contenu 6 : faits exacts, notes d'atelier retirées, textes Wix réécrits ; reste une note « à confirmer » visible et la page Projets sans image.
- Technique 8 : 0 erreur, 0 axe, 0 lien mort, 0 débordement ; polices Google en TTF sans préchargement, `og:image` relatif.

## Findings

### F0
Aucun.

### F1 (majeur)
- **F1-A · La photo ajoutée à /projects n'est pas rendue (correction annoncée non effective).** `src/pages/projects.astro:30-32` : deux `<Photo slot="visite">` et `<Photo slot="cuisine">` sont enfants directs de `<Base>`. Astro lit `slot="…"` comme nom de slot de la mise en page, `Base.astro` n'a qu'un slot par défaut : les deux blocs sont supprimés sans erreur. Preuve : `grep -c 'visite-chantier\|cuisine' dist/novobel/legacy/projects/index.html` = 0 ; seul `<img>` de la page = logo KYW ; planche `r2-B` et `r2-A` (mobile) : 4 lignes de texte et un blanc d'environ 90 px au-dessus de la liste, aucune image. Le « build OK » de REVISION ne le détecte pas. Correction : renommer la prop `slot` du composant Photo (`name`, `zone`) ou envelopper les deux `<Photo>` dans une `<section class="band">` ; vérifier par `grep -c '<img' dist/…/projects/index.html` = 3. Les captions « photo illustrative » sont déjà prévues.

### F2 (mineurs)
- **F2-A · Note d'atelier dans le texte public de l'accueil.** « réponse sous 24 h (délai illustratif, à confirmer) » (`index.html` section Devis gratuit, planche `r2-D`) : « à confirmer » s'adresse au client, pas au visiteur. Correction : « réponse sous 24 h (délai illustratif) » ou retirer le délai.
- **F2-B · `og:image` relatif** (`content="/novobel/legacy/photos/combles.webp"` sur les 6 pages) : invalide pour les robots de partage, alors que le canonical est absolu (`https://kyw-test-restaurant.vercel.app/…`). Correction : préfixer par l'origine du canonical dans `Base.astro`.
- **F2-C · Promesse de procédure non prouvée.** Page Carrière : « une candidature spontanée est lue de la même façon » : le dossier ne dit rien du traitement des candidatures (leçon commune : une procédure est une invention). Correction : « Pas de poste qui vous correspond exactement ? Écrivez-nous. »
- **F2-D · JSON-LD sans la boîte de l'adresse** : `streetAddress` = « 14, Rue Emile Cuvelier » alors que `donnees.json` donne « 14 boîte 1 ». Correction : « 14 boîte 1, Rue Emile Cuvelier » ou laisser comme le pied de page, mais aligner les deux.

### F3 (finitions, non traitées ou partielles)
- **F3-A** Numéros décoratifs 01 à 05 sur /services (métiers) et 01 à 04 sur /projects (`r2-B`) ; ne garder que les étapes.
- **F3-B** Bande crème de ~90 px sous le hero à 1440 x 900 (`r2-A`) ; grand vide sous la liste de Carrière et au-dessus des projets (mobile et desktop).
- **F3-C** Polices : `fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400`, 0 `preload`, fichiers TTF (WARN audit) ; héberger en woff2 avec préchargement.
- **F3-D** Formulaire : le message de non-envoi n'a pas été retouché (F3-6 de REVUE-1 non traité, non annoncé comme fait).
- **F3-E** Articles : page quasi vide (titre, une phrase, un lien) ; acceptable hors navigation, mais à supprimer du sitemap si l'on garde noindex partout.

## Ce qui est bien (à ne pas casser)
1. Hero 1440 : carte à droite, ouvrier visible, un seul bouton primaire ; carte mobile lisible.
2. Rigueur des faits : adresse, téléphone, e-mail, 4 projets et 28 logements, 6 offres ; « 25 ans » toujours omis ; notes d'atelier retirées du pied de page.
3. Technique : 0 erreur, 0 axe, 0 lien mort, 0 débordement, LCP léger (page la plus lourde ~675 Ko), menu popover et reduced-motion sains.
