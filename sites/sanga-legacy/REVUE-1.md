# Revue legacy · Sanga · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une carte de ramen posée sur du papier crème à encadrés encre et rouge laque, une seule page qui sert à appeler ou à commander en ligne, avec une bande brune pour les entrées et les boissons.
Scores /10 :
- design 7 : hero net (h1 en Yeseva, photo verticale, cartouche téléphone), carte lisible, bande brune qui change le rythme ; sections un peu uniformes (`1440-hero`, `d-05-scroll`, `d-06-scroll`).
- usabilité 7 : un seul parcours (appeler / commander), menu mobile fonctionnel (popover ouvert puis refermé au clic, mesuré à 390 px), mais 404 aux ancres mortes et cible de 22 px.
- créativité 6 : identité sobre et cohérente (kanji, filets doubles), peu de signature au-delà du hero ; légitime pour un legacy, aucun slop détecté (pas de dégradé, pas de trois cartes, pas d'eyebrow systématique).
- contenu 8 : tous les prix, horaires, zones de livraison, téléphone et liens vérifiés contre donnees.json et site-actuel/page.html ; aucune invention ; une réserve sur le crédit photo (F2-5).
- technique 7 : 0 erreur console, 0 requête en échec, 0 débordement de 390 à 1920 px, LCP 468 ms / 1140 ms, CLS 0,009 / 0,033, 591 Ko ; défauts axe et débordement à 320 px.

Build OK (QA-revue1 : exit 0, dist 14:49 antérieur aux captures 14:54, src non modifié depuis). Vérifié : title unique, `lang="fr"`, un `h1`, `noindex` et mention « Maquette KYW… » sur les 2 pages, un seul logo KYW, 5 liens externes (Commander, CGV, confidentialité, 2 catégories) en 200.

## Findings
**F0 : aucun. F1 : aucun.**

### F2 (à corriger)
- **F2-1 · 404 : ancres mortes dans l'en-tête.** `src/components/Nav.astro:11-13,20-22` : `href="#carte"`, `#livraison`, `#horaires` (menu bureau et menu mobile) ; la page 404 n'a aucune de ces sections (`grep id="carte"` dans dist/sanga/legacy/404.html : 0, 6 ancres mortes). Correction : préfixer par `{base}` (`${base}#carte`) ou passer une prop `ancres` à `Nav` et ne pas les rendre sur la 404.
- **F2-2 · axe sérieux `label-content-name-mismatch` sur `.nav__brand`** (accueil et 404, 1 nœud, 390 et 1440 px). `Nav.astro:9` : `aria-label="Sanga, accueil"` alors que le texte visible est « Sanga 山河 ». Correction : retirer l'`aria-label` (ou le faire commencer par le texte visible : « Sanga 山河, accueil »).
- **F2-3 · axe modéré `landmark-no-duplicate-contentinfo`** (accueil, 1 nœud) : `Pied.astro:5` `<footer aria-label="Coordonnées">` + `<footer class="kyw-footer">` du paquet = deux `contentinfo`. Absent du QA-revue1. Correction : remplacer le `footer.pied` par `<section aria-label="Coordonnées">` (ne pas toucher `packages/kyw-footer`).
- **F2-4 · débordement à 320 px (clip masqué par `overflow-x: clip`, `scrollWidth` = 320).** Mesuré à 320 px : `table.schedule` right 351 (31 px hors fenêtre, colonne du soir rognée, bordure droite coupée, `320-hor`) et `button.nav__menu` right 344 (24 px hors fenêtre, bordure du bouton « Menu » coupée, `320-top`). 390 px et plus : 0. Correction : sous 360 px, `.schedule td { padding-inline: var(--space-sm); white-space: nowrap }` ou horaires en une colonne (créneaux sur deux lignes), et réduire le padding/gap de `.nav__bar` (ou masquer `Commander` sous 340 px, le menu le propose déjà).
- **F2-5 · crédit photo non prouvé.** `Pied.astro:17` : « Photographies : le restaurant (sanganamur.be, Order & Eat) ». Le hero bas (`hero-ramen.webp`, issue de la photo 05, nom de type banque d'images `748029-PSQ22Z-441.jpg`) est signalée « origine à confirmer » dans photos/index.json et dossier.md. Correction : crédit neutre (« Photographies : sanganamur.be »), ou marquer cette photo « illustrative » dans sa légende.
- **F2-6 · JSON-LD `Restaurant` sans horaires.** `layouts/Base.astro:11-16` : adresse et téléphone présents, pas d'`openingHoursSpecification` (exigé par le prompt § C). Correction : ajouter les deux créneaux `12:00-14:00` et `18:00-22:00` pour Tu, We, Th, Fr, Sa, Su (lundi absent), éventuellement `image` (ramen.jpg).

### F3 (finition)
- **F3-1 · cibles < 24 px** : lien téléphone de la section Horaires (`.adresse__tel a`) 115 × 22 px à toutes les largeurs (axe-like, rapport QA « 1 petite cible » desktop) ; lien d'adresse 273 × 20 px à 320 px. Correction : `display: inline-flex; min-height: 24px` (idéalement 44 px).
- **F3-2 · survol** : le rapport signale aucun changement sur `Appeler 081 24 10 38`, `Commander : ramen` et `081 24 10 38` (Horaires). Le CSS déclare pourtant `.counter__tel:hover` et `.lien:hover` (`page.css:28,77`) : probablement un artefact de mesure pendant la transition ; le lien téléphone de `.adresse__tel` n'a aucune règle de survol. À vérifier à la révision, ajouter `.adresse__tel a:hover`.
- **F3-3 · répétitions de texte et d'appels à l'action** : « Livré chez vous, gratuitement » (h2) puis « Livraison gratuite. » (début du lead, `site.ts` `livraison.note`) ; « Commander en ligne » 4 fois + 6 liens « Commander : <rubrique> » + footer = 12 liens vers Order & Eat. Sloplint WARN 58 : 451 mots (limite 450). Correction : retirer « Livraison gratuite. » du lead (« Dans un rayon de 6 km autour de Namur, la livraison démarre dès 35 € »), garder un seul bouton par section.
- **F3-4 · méta et poids** : `twitter:card` absent (audit WARN) ; polices Google Fonts servies en TTF (4 fichiers, 376 Ko, audit WARN) : vérifier qu'elles sont bien en WOFF2 hors headless, sinon auto-héberger 3 graisses ; `public/photos` contient 3 fichiers non utilisés (`donburi.jpg` 205 Ko, `gyoza.jpg` 224 Ko, `udon.jpg` 97 Ko) copiés dans `dist/` : les supprimer ou les placer dans la carte (ETAT.md le prévoit).
- **F3-5 · sloplint** : relance `--render` sur fichiers locaux inexploitable (CSS non chargé, 10 FAIL parasites : focus, overflow-x, `kyw-signature` « non chargé » sous file://) ; le verdict sloplint reste celui du constructeur (0 FAIL, ETAT.md), non revérifié ici. Auto-notation (`self`), pas de jury.

## Ce qui est bien (ne pas casser)
1. Contenu fidèle : 33 plats et prix, horaires (lundi fermé), zones et paliers de livraison (25 € / 35 €, 6 km), « Irashaimase ! Bienvenue ! », rien d'inventé, aucune réservation affichée (conforme à `reservation: null`).
2. Hero et typographie (Yeseva One + Archivo) : h1 sur la baseline du client, cartouche appel / commande, légende de photo qui décrit la photo (alt vérifié contre `sujet` de photos/index.json).
3. Technique propre : 0 console, 0 échec réseau, pas de débordement de 390 à 1920 px, menu mobile en Popover, focus visible sur 12 arrêts, reduced-motion sans texte masqué, LCP < 1,2 s.
