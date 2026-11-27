**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 7 routes (/, /notre-histoire, /menu, /carte-restaurant, /avis, /galerie, /bayti-chez-vous) + 404
- **Before** · Floor et Reflex du CSS Wix (voir AUDIT.md) ; la carte complète et les photos restent
- **Keeps** · toutes les routes, liens Barestho, tel:, mailto:, réseaux, formulaire de contact (champs Prénom, E-mail, Téléphone, Message), la carte et ses prix, l'avis de Brenda C. mot pour mot
- **Files** · create : tout le paquet `sites/bayti-legacy/` ; edit : rien hors de ce dossier ; delete : aucun
- **Shape** · Photographic (kept), draw 60d80a (Letter proposé, écarté : le site d'origine est multipage et photographique)
- **Theme** · Squeeze, dealt 1/3, seed restaurant-namur-middle-eastern-2323·3a7fc9f2·2026-11-27·r0 (vert forêt chromatique : porte l'herbe et les feuilles des photos). Écartés : Vellum (blackletter, trop patrimonial pour une cuisine du quotidien), Atelier (limewash calme, déjà beaucoup tiré au journal).
- **Chrome** · nav : dalle (slab), logo à gauche, liens, Réserver à droite · footer : mast (le nom en très grand, quatre colonnes)
- **Hero** · Counter sur l'accueil (réservation et texte à gauche, photographie à droite, deux tuiles de prix juste dessous) ; Banner sur les autres routes
- **Signature** · deux prix en figures géantes (45 € le soir, 28 € de jour) sous la photographie
- **Sections** · Hero · Adresses (deux tuiles) · Foyer · Trois façons (Index) · Horaires (Schedule) · Réservation · Contact · Mast
- **Material** · réel : 33 photos du client, carte et prix, horaires Mar à Sam, avis de Brenda C. · absent : salle, façade, équipe, presse, date d'ouverture
- **Comp** · non construit (voir comp.md)
- **Sweep** · phase 3 ; sloplint src + URL : 0 FAIL, 0 REFLEX ouvert au dernier passage de phase 1

## Système (depuis tokens.css)
Papier vert `--color-paper` oklch(41% .10 154), tuile `--color-paper-2`, bande profonde `--color-paper-3`, encre blanc chaud, accent pêche `--color-accent`, carte blanc chaud une fois par page (`--color-card`). Polices : Gabarito 800 (titres, chiffres), Manrope 500/700 (corps). Rayons 24 / 16 / pill. Espacements : échelle partagée ; colonnes 48 px.

## Composants
- **Carte** : Rows (titre col. 1, description, régimes en texte, prix à droite en tabular-nums, `layout.md` § 5) ; menu 8 services numéroté ; carte traiteur en Switcher (`role="tablist"`, toutes les rubriques lisibles sans script).
- **Horaires** : Schedule en `<dl>`, `<time>`, jour fermé en muted non barré, jour courant sur `--color-paper-3`.
- **Réservation** : bande profonde, titre à gauche, texte et bouton à droite.
- **Pied** : mast, adresses, horaires, contact, réseaux, `data-credits`, puis KywFooter.
- **Photo** : `<figure>` + `data-slot` + `data-alt`, `srcset` 800/1600, hero eager + `fetchpriority="high"`, autres lazy.

## Sur-utilisation
- [x] 1. Audit lu avec captures · preuve : AUDIT.md
- [x] 2. deal/draw/scaffold via theme.mjs, journal $LOG · preuve : `.hallmark/log.json`, stamp page.css:1
- [x] 3. Hallmark SKILL.md, redesign.md lus · preuve : stamp et Picks
- [x] 4. sloplint src + URL rendue · preuve : 0 FAIL, REFLEX 44c et 26b corrigés
- [ ] 5. Comps c1/c2 · non construits, raison et réponses de reproduction dans comp.md (waive : budget de réponses, composition vérifiée en navigateur)
- [x] 2. Pas de `transition: all` ni de géométrie animée (10a) · preuve : page.css:19-31 (transform et opacity seulement, survol par pseudo-élément en opacité)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : base.css:`:focus-visible` jaune sur vert ; anneau inset des champs page.css (`.field input:focus-visible`), anneau des onglets
- [x] 7. Fallback reduced motion, contenu visible sans script (27, 62) · preuve : base.css dernière règle `prefers-reduced-motion` ; test sans JS : 5/5 panneaux visibles, nav visible ; aucun contenu caché au repos
- [x] 17. Hero en `dvh` (6a) · preuve : page.css `.hero__grille` calc(100dvh ...)
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (`.nav`, `--z-sticky-nav`), `scroll-padding-top` = hauteur de nav + 16px (base.css)
- [x] 20. Radios-onglets gardés (53) · preuve : onglets en `role="tablist"` créés par JS ; sans script tous les panneaux se lisent (test noJS 5/5)
- [x] 21. Vidéo de fond (28a, 28b) · sans objet : aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · waive : le thème Squeeze interdit le reveal (« No reveal, no parallax, no loop ») ; aucun reveal, donc rien de caché
- [x] 23. États d'input (39a) · preuve : page.css `.field` : défaut, focus (anneau inset), erreur (bordure, libellé, message « Erreur : … »), désactivé (fond, encre, bordure pointillée, curseur)
- [x] 24. Tooltip et auto-rotation (17, 18) · sans objet : aucun tooltip ni rotation
- [x] 29. Aucun faux envoi (70) · preuve : Base.astro, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié… », `data-endpoint=""`, `novalidate`, mailto
- [x] 30. SVG décoratifs `aria-hidden` (33) · aucun SVG dans le paquet hors favicon
- [x] 48. Hover : un signal, sur le conteneur, pas de rebond, pas de toast (11, 12, 16) · preuve : tuiles et boutons s'éclaircissent d'un cran de vert (opacité), appui de 1px ; `@media (hover: hover)`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52px (26b, 39b) · preuve : page.css `.btn` 48px, nav 44px, liens de menu 52px, mesure Playwright 320/375/768 : aucun contrôle sous 44px, aucun bouton replié
- [x] 56. Un primaire rempli (F4) · preuve : sloplint src : 0 FAIL, 0 WARN F4 (Réserver de la nav passé en contour)
- [x] 58. Une recette de conteneur ; un pattern de scroll : aucun (F7, F8) · preuve : tuile, carte papier, formulaire en rayon 24
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : base.css
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem (nav : 70rem, sept liens), `(hover: hover)`, `(pointer: coarse)`, `dvh`, gouttière 16px ; scrollWidth = largeur à 320, 375, 768 sur les 8 routes

## Phase 2 : décisions
- Mouvement : caractère du thème Squeeze, « état seulement » : appui de 1px (`--dur-micro`), tuile qui s'éclaircit d'un cran (`--paper-hover`), onglet choisi cerclé (`--dur-short`). Aucun reveal ni boucle.
- Nav : dalle (slab, inchangée), menu Popover sous 70rem (Échap et clic extérieur natifs, libellé Menu/Fermer, se referme au clic d'un lien) ; Réserver en contour pour qu'un seul bouton plein soit à l'écran.
- Pied de site : `<footer>` remplacé par `<section aria-label>` (un seul contentinfo, celui de KywFooter).
- Signature : le hero est raccourci pour que les deux prix affleurent dans le premier écran (1280x800, 1920x1080).
- hero-review: self · 1 finding (signature hors de l'écran à 1280x800) · resolved (hero raccourci de 200px, tuiles à 40px). Pas d'outil Agent en session d'agent : auto-notation sur les quatre captures `--stage hero`.
