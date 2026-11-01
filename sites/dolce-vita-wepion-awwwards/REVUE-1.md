# Revue awwwards · La Dolce Vita (Wépion) · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une pizzeria de Wépion racontée comme une enseigne au néon rose sur fond vert forêt, où le titre de chaque page s'écrit en tube lumineux (« la dolce vita », « la carta », « la storia », « pronto ? ») et où un tube grille sur la 404.

Preuves : le shoot de l'agent captures a échoué (`summary.json` : `shootFailed`, « browser has been closed », aucun `QA-revue1.md`, aucun report.json). Les captures et mesures viennent d'un script maison sur `dist/` (build du 21:25, plus récent que `src/`), serveur port 4611 (PID 32644, arrêté) : 5 pages × 1440 et 390 px, 3 à 9 captures par page par défilement (`.shots-dolce-vita-wepion-awwwards-revue1/self/`, planches `pl-*.png`, `mesure.json`), axe-core complet par page, contraste nœud par nœud (canvas 1x1, opacité cumulée), `reducedMotion`, menu mobile, 8 Tab, 8 liens internes en curl.

Scores /10 :
- Design 8 : identité tenue du début à la fin (néon Sacramento sur vert forêt, accent rose, galerie en collage, bandeau « più bella » commun), `home-d-00.png` et `404-d-00.png` ont un vrai parti pris ; retrait pour la carte desktop, longue et répétitive (`carte-d-03` à `-07`, deux colonnes vides).
- Usabilité 7 : menu mobile (popover, Échap) fonctionnel, skip link au premier Tab, liens tous en 200, horaires et téléphone partout ; mais pas d'action de réservation sur le hero mobile (`home-m-00.png`) et deux régions défilantes mobiles inaccessibles au clavier.
- Créativité 8 : le néon qui s'écrit, la devise italienne traduite, la 404 « Un tube a grillé » (`404-m-00.png`) ; les fonds neutres de la carte et de la réservation reprennent peu l'idée.
- Contenu 7 : tous les faits (adresse, deux numéros, e-mail, horaires, 86 plats, 2017, Armando, Antigone, plats maison, livraison dès deux plats) concordent avec `dossier.md` et `donnees.json` ; un ajout hors dossier (« prix TVA comprise »), une statistique « 2 » vide de sens, un « Réserver » orphelin dans les crédits.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement horizontal (scrollWidth = clientWidth sur 10 cas), 0 image cassée, 0 cible < 24 px, reduced-motion : 0 texte à opacité < 0,5 sur 4 pages, JSON-LD `Restaurant` sur chaque page, `lang="fr"`, un seul h1, noindex, title/description uniques, OG ; reste 2 violations axe « serious » récurrentes.

## Findings (par gravité)

F0 : aucun. Build OK (`dist/` du 21:25 cohérent avec `src/`), 0 fait faux, 0 lien mort, mention « Maquette KYW, certaines données sont illustratives » et logo KYW (`.kyw-signature` ×1, `aria-label="Site réalisé par KYW…"`) présents sur les 5 pages, `noindex, nofollow` sur les 5 pages (conforme au prompt § 3.3).

F1-1 · `aria-prohibited-attr` (serious) sur la devise de l'accueil, desktop et mobile. `index.astro:37` : `<p class="devise__it" lang="it" data-split="lines">` ; le SplitText de `engine/reveal.ts` (l. 77) pose un `aria-label` sur un `<p>` sans rôle, interdit. Preuve : axe-core sur `/awwwards/`, 1 nœud `.devise__it`, 1440 et 390 px. Correction : ne pas poser d'`aria-label` sur le conteneur, ou lui donner un rôle valide (`role="text"` n'est pas fiable : préférer garder le texte réel lisible et mettre `aria-hidden` sur les copies éclatées).

F1-2 · `scrollable-region-focusable` (serious) en mobile : `ul.table__mur` (accueil, `index.astro:71`, `site.css:417`, `overflow-x: auto`) et `.salle__bande` (histoire). Preuve : axe-core à 390 px, `home-m` et `histoire-m`. Un utilisateur clavier ou lecteur d'écran ne peut pas faire défiler la bande de photos. Correction : `tabindex="0"` plus `role="region"` et `aria-label` (« Photos de la table »), ou rendre les photos focalisables.

F2-1 · « prix TVA comprise » (`carte.astro:19`, aussi dans `carte-d-00.png` et `carte-m-00.png`) : aucune mention de TVA dans `dossier.md`, `donnees.json` ni `site-actuel/` (grep « TVA » : 0 occurrence). C'est une invention (T-invente) sur un point à portée légale. Correction : supprimer, ou écrire « prix en euros ».

F2-2 · Statistique « 2 / Sur place ou à emporter, livraison dès deux plats » (`index.astro:42`, `home-d-01.png`) : le « 2 » n'est ni un compte ni une donnée, c'est un chiffre décoratif collé à deux faits sans lien. Correction : remplacer par une vraie donnée du dossier (par exemple « 18 h à 22 h : livraison gratuite dès deux plats ») ou retirer la troisième colonne.

F2-3 · Mobile, hero de l'accueil sans appel à réserver : `home-m-00.png` ne montre que « Voir la carte » (le bouton « Réserver au 081 85 54 20 » du desktop disparaît) et le téléphone n'est que dans le menu (`menu-m-open.png`). Pour un restaurant qui prend les réservations uniquement par téléphone, l'action principale manque au premier écran mobile. Correction : afficher le bouton d'appel dans le hero mobile ou dans l'en-tête.

F2-4 · `reservation-m-00.png` : l'étiquette « RÉSERVER UNE TABLE » touche la descente du « p » du néon « pronto ? » (pas de marge entre le tube et le libellé). Même disposition en desktop (`reservation-d-00.png`), où l'étiquette flotte à droite du tube sans alignement. Correction : ajouter 16 à 24 px sous le titre néon en mobile.

F2-5 · Redondance des libellés de titre : néon italien plus étiquette française à côté (`la carta` / « LA CARTE », `la storia` / « HISTOIRE », `pronto ?` / « RÉSERVER UNE TABLE »). Utile pour l'accessibilité mais lu deux fois par l'œil dans `carte-d-00.png` ; acceptable si l'étiquette reste discrète. À garder tel quel si le client valide l'idée.

F3-1 · Crédits du pied (`home-d-08.png`, toutes pages) : « … Construit avec Astro, GSAP et Lenis. Réserver » : le mot « Réserver » est un lien isolé sans phrase ni séparateur, qui se lit comme une coquille. Correction : l'intégrer à une phrase (« Réserver une table ») ou le retirer du bloc de crédits.

F3-2 · `landmark-no-duplicate-contentinfo` (moderate) sur les 5 pages : le pied du site et le pied KYW portent chacun le rôle `contentinfo`. Le composant `packages/kyw-footer` ne se modifie pas ici ; côté site, donner au pied du site `role="presentation"` n'est pas valable : utiliser `<footer>` dans un `<section aria-label>` ou signaler au paquet. À traiter en dernier.

F3-3 · Contraste mesuré à 2,5 à 2,84 sur des lettres de néon éteintes (`.neon__l`, « più bella » en bas de page, `home-m` 1 nœud, `carte-d` 8 nœuds, 404 : « o » et « i » grillés 2,16). Ce sont les lettres qui clignotent ou qui sont volontairement mortes sur la 404, texte décoratif répété par un libellé accessible : ne pas corriger, noter seulement.

F3-4 · Mentions du texte : « sont faits ici » (`site.ts`, histoire) dit plus que le dossier (« maison ») ; reformuler en « sont maison ». Le champ date natif s'affiche « mm/dd/yyyy » selon la langue du navigateur (`reservation-d-03.png`) : ajouter `lang="fr"` au formulaire ou accepter.

F3-5 · Pas de `robots.txt` ni de sitemap sous la base : faux positifs connus (leçon commune), à ne pas corriger.

## Ce qui est bien (à ne pas casser)
1. Le néon comme écriture des titres, avec reduced-motion irréprochable (0 texte masqué sur 4 pages) et aucun loader qui bloque : `is-loaded` n'est jamais posé, la page est lisible dès l'ouverture.
2. La 404 « Un tube a grillé » avec trois sorties (accueil, carte, appel) et le bandeau « più bella » qui donne horaires, adresse, téléphone sur toutes les pages (`404-m-00.png`, `home-m-08.png`).
3. Fidélité du contenu : horaires jour par jour, deux numéros, plats et prix de la carte conformes (« Cappello di Toto », « Nduja »…), aucun avis ni distinction inventé, dates et note sur le mois d'ouverture écartées volontairement.
