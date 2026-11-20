**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, one-page conservé (contenu, liens, Zenchef, mailto, tel, PDF gardés).
- Before : `.hallmark/before.txt` (202 FAIL, 90 REFLEX, 16 WARN), AUDIT.md.
- Keeps : one-page, ordre héros, À propos, carte, horaires, réservations, job, contact ; photo de salle en héros ; widget de réservation (lien Zenchef rid 367820) ; PDF de la carte.
- Files : `src/styles/{tokens,base,page}.css`, `src/components/*`, `src/pages/{index,404}.astro`, `src/data/*`.
- Shape : one-page en rangées (macrostructure conservée), hero Poster.
- Theme : Spore (dealt 1/3, seed restaurant-namur-family-brasserie-77f1·05513bf6·2026-11-20·r0). Écartés : Vellum (blackletter trop cérémonieux pour une brasserie familiale), Ink (teal civique, photos désaturées, aurait éteint les fauteuils orange).
- Chrome : barre fine collée en haut, logo, cinq ancres, un bouton cuivre.
- Hero : photo de salle plein cadre, titre en bas à gauche sur voile sombre, un bouton, un lien.
- Signature : les fauteuils orange en plein cadre, un accent cuivre repris de la marque (#ce5923 lu dans le CSS d'origine).
- Sections : À propos (split), Carte (Switcher + rows), bande de trois photos, Horaires (Schedule), Réservation (split inversé), Job (liste), Pied (mast).
- Material : photographies du client, grain Spore, filets.
- Comp : 2 built, no key · c1 chosen (comp.md).
- Sweep : phase 3.

# Approche
Macrostructure one-page, empreinte Heading|Body|Divider|Button|Image|Reveal. Posture : Poster conservé (le site d'origine ouvre sur la photo). Le draw proposait Index (carte en tête) : échangé, la carte vient juste après À propos pour garder l'ordre d'origine. Dérogations : bulle verte organique remplacée par un voile (8), flipbook remplacé par Switcher (le PDF reste en lien), formulaire d'emploi remplacé par mailto (70), bannière cookies supprimée (aucun traceur chargé). Test miroir : un voisin avec le même site aurait une carte en flipbook et une bulle verte ; ici la décision changée est la dalle de photo plein cadre avec carte en rangées.

# Thème
Spore, dark/roman-serif/warm : café noir grainé, encre parchemin, Young Serif sur Instrument Sans. L'accent rose huître est remplacé par un cuivre (oklch 72 % 0.13 50) lu sur la marque (#ce5923 dans le CSS d'origine) : échange nommé, seul écart au thème.

# Tokens
Voir `src/styles/tokens.css` : paper 15/19/24 %, ink 93 %, accent cuivre, voile du héros en tokens, `--container` 1440, gouttière 64 (16 au téléphone), gaps de section 120/144/176.

# Composants
- Carte : Switcher en six panneaux (À partager, Entrées, Plats, Enfants, Desserts, Boissons), `role="tablist"`, premier panneau visible sans script, tous les panneaux affichés en liste sans JS ; rows (nom col. 1, prix à droite en tabular-nums), filets seuls ; carte du 15 octobre mentionnée. Menus de fêtes à emporter en rows sous le Switcher. (layout.md § 5)
- Horaires : Schedule en `dl`, `time`, dits une fois dans la section et résumés au pied ; pas d'icône ; pas de jour fermé.
- Pied : mast (nom en grand), quatre colonnes courtes (adresse, contact, ouverture, réseaux), `data-credits`, puis KywFooter.
- Photo : `<figure data-slot data-alt>`, width/height, hero `fetchpriority="high"`, les autres lazy.

# Sur-utilisation
- [x] 1. Hallmark audit lancé · preuve : .hallmark/before.txt
- [x] 2. Deal puis draw tirés au journal partagé · preuve : .hallmark/log.json (draw 1cce36)
- [x] 3. Scaffold du thème, stamp en tête de page.css · preuve : src/styles/page.css:1
- [x] 4. Deux comps construites et capturées, choix écrit · preuve : comp.md
- [x] 5. sloplint --render sur le build servi avec base · preuve : .logs/legacy-sloplint3.log (1 FAIL source scaffold-only 34, 2 REFLEX 49b et 59, voir ETAT.md)
- [x] 6. Photos du client uniquement, pas de génération · preuve : public/photos/
- [x] 7. Mouvement : Spore dit « état seulement, rien ne se révèle ni ne grandit » ; aucun reveal au scroll, aucune boucle ; seules des transitions d'état de 120 à 220 ms (onglet, bouton, lien de nav, ouverture du menu) · preuve : page.css:36, :88 ; waive 22 (aucun reveal, thème Spore § Motion)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep `transition: all` = 0 ; transitions listées (couleur, bordure, opacity, transform)
- [x] 6. `:focus-visible` instantané (`transition: none`), contour 2 px clair sur fond sombre, sur lien, bouton, burger, onglet, panneau · preuve : page.css (règles `:focus-visible`)
- [x] 7b. Fallback reduced motion : règle globale `prefers-reduced-motion: reduce` (durées 0,01 ms) ; contenu visible sans script (six panneaux de carte affichés, menu en ligne, burger fonctionnel sans script par `popovertarget`) · preuve : page.css:162, test Playwright sans JS (6 panneaux)
- [x] 17. Hero en `svh` (min-height max(34rem, 100svh - nav)) · preuve : page.css:69, captures 375x740 et 1920x1080
- [x] 19. Un seul sticky (nav, `--z-sticky-nav`), `scroll-padding-top` = 72 px + 16 px · preuve : base.css ; mesure : l'ancre #horaires arrive à 88 px
- [x] 20. Pas de radios-onglets : Switcher à boutons `role="tab"`, flèches, Début/Fin, panneaux `tabindex="0"`, premier panneau visible sans script · preuve : Carte.astro
- [x] 21. Pas de vidéo de fond (photo seulement) · preuve : Hero.astro
- [x] 22. Pas de reveal (voir 7) · preuve : aucun `data-reveal` dans src
- [x] 23. États d'input : sans objet, aucun champ ; la réservation est le lien Zenchef conservé (rid 367820), le `tel:` et le mailto · preuve : Reservation.astro
- [x] 24. Pas de tooltip, pas d'auto-rotation · preuve : src
- [x] 29. Aucun faux envoi : aucun formulaire · preuve : src
- [x] 30. SVG décoratif (burger) `aria-hidden` · preuve : Nav.astro
- [x] 48. Hover : un signal par contrôle (bordure ou soulignement), sur le contrôle, jamais sur une photo ni un texte non interactif, aucun rebond, aucun toast · preuve : page.css (`@media (hover: hover)`)
- [x] 49. `:active` (décalage de 1 px et fond), `:disabled` défini sur `.btn`, cibles de 44 à 56 px (mesure à 375 : aucune cible de nav sous 44) · preuve : mesure Playwright
- [x] 56. Un primaire rempli par écran (bouton du héros ; la nav passe en contour cuivre `btn--line`, l'onglet choisi en bordure cuivre sur fond sourd) · preuve : page.css
- [x] 58. Une recette de conteneur (rangées à filets), pilule limitée aux contrôles ; aucune chorégraphie de scroll (l'original n'en avait pas) · preuve : page.css
- [x] 63. `::selection`, `caret-color`, `scrollbar-color`, `-webkit-tap-highlight-color` thémés · preuve : base.css
- [x] 72. Responsive : breakpoints en rem (70rem pour le menu, mesuré ; 60rem et 40rem pour la mise en page), `hover: hover`, `pointer: coarse`, `svh`, `overflow-x: clip` sur html et body, aucun défilement horizontal de 1440 à 320 · preuve : `scrollWidth` = `innerWidth` à 1440, 1024, 961, 800, 375, 320

# Phase 2 : nav, revue du héros, comp
- Nav : forme `slab` (différente des trois derniers du log : masthead, masthead, floating pill), sticky. Menu `<nav popover>` sous 70rem (cinq ancres, bouton et nom ne tiennent pas à 1024 px : mesuré, bouton écrasé), bouton « Menu » adjacent dans le DOM, ferme au clic sur une ancre, `aria-current` par IntersectionObserver (un état, pas un mouvement). Ancres préfixées par la base (404 comprise).
- hero-review: self · fix · 3 findings · 2 resolved (pas d'outil Agent en session : auto-notation). (1) bande vide sous le bouton à 1920x1080, hero plafonné à 860 px : resolved (svh sans plafond). (2) titre posé sur les verres clairs à droite, contraste faible : resolved (voile latéral gauche). (3) titre de 9 mots, accroche de 17 : unresolved, contenu fixé par l'original (redesign).
- comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800). Masse : photo plein cadre, titre en bas à gauche, reproduite. Intervalle : titre, accroche, bouton espacés de 24 px, bloc à 64 px du bord bas, reproduit. Entrée : la photo ouvre l'écran avant le texte, aucun reveal, reproduite. Plus grand écart : la comp montrait la salle claire non filtrée, le build applique le grain sépia du thème et un voile plus dense, la photo est plus sombre ; gardé, le titre doit rester lisible.

# Phase 3 : sweep et checklist
- Sweep : `sloplint src --genre atmospheric --render --kept` : 0 FAIL, 0 REFLEX (59 corrigé : bas de pied porté à `--section-gap-s`), 3 WARN (F15 gaps 24/32/64 : rangées, colonnes, sections, confirmé ; 2 WARN kept : l'avant est un site externe, compare.html), 3 NOTE 58 (contenu fixé).
- finish-review: self · 3 findings · 3 resolved 0 unresolved · gap: menus de fêtes illisibles à 375 (corrigé, rangées empilées).
- [x] 1. Tokens `:root` · preuve : grep couleurs en dur dans page.css = 0. [x] 4. `overflow-x: clip` html et body · base.css:2, mesure scrollWidth 375. [x] 5. `minmax(0, 1fr)` · page.css. [x] 8. Rien d'inventé · textes tracés dans donnees.json / site-actuel, avis `null`. [x] 9, 10, 11 · aucun eyebrow, flèche ni point de statut (captures 1440 et 375). [x] 12, 13, 14 · hero titre, phrase, actions ; `--container` 1440. [x] 15 · stamp page.css:1. [x] 16 · sloplint propre. [x] 18, 25 · neutres teintés, accent cuivre sur café. [x] 26 · aucune image cassée, crédits au pied. [x] 27, 28 · tiret cadratin : grep src = 0.
- [x] 31 à 54 · Reflex : Young Serif + Instrument Sans, gaps de section 120 minimum (mesuré), titres de section ≥ 40 px, pas de carte-tell, un seul sticky ; 38 accent cuivre rare. waive 22 (reveal) conservé.
- [x] 55 à 67 · Finish : guillemets, tabular-nums prix et horaires, un primaire rempli par écran, rien de caché à 375 (menu ouvert et ancre vérifiés, scrollWidth 375).
- [x] 68 à 71 · Craft : 2 familles, OKLCH, photos du client, hero `fetchpriority="high"`.
