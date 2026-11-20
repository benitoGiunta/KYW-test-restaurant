# Revue awwwards · Wok de Jin · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un buffet à volonté raconté comme une grille de la semaine (jour par jour, midi et soir, une case par prix), rouge laqué et noir de fumée, titres Tanker géants, avec « Mardi, on éteint » pour dire la fermeture ; la case du service en cours s'allume d'après l'heure de Bruxelles.

Scores /10
- Design 8 : palette rouge, noir, or tenue, typographie affirmée, hiérarchie nette (`d-01-hero`, `d-02-scroll` : grille 7 jours lisible, case week-end pleine or) ; le hero 1440 laisse un grand vide entre titre et photo (`d-01-hero`).
- Usabilité 8 : menu mobile dialog fonctionnel (ouvre, `aria-expanded`, Échap rend le focus à `tete__menu`), 14 Tab tous avec contour visible, 0 cible < 24 px, CTA téléphone et réservation à chaque fin de page ; un défaut de texte dans le menu mobile (F2-1).
- Créativité 8 : la grille « semaine » est une vraie signature (remplissage animé, étiquette « Prochain » / « En cours » calculée), pas un gabarit ; le 404 « Case fermée. » reprend l'idée.
- Contenu 7 : fidèle à `donnees.json` (prix, adresse, horaires, téléphone, acompte, conditions du réveillon, enfants, anniversaire), 0 avis ni réseau inventés ; deux inférences à signaler (F2-2, F3-1) et des répétitions sur la méthode wok (F3-2).
- Technique 9 : build OK, 0 erreur console, 0 requête en échec, 0 débordement (390 et 1440, 5 pages), axe 0 violation, LCP mobile 1,0 s (CPU x4 + 4G, 2 passes), CLS 0,000, reduced-motion sans texte caché.

## Mesures (script maison, `.logs/wokaw-revue1-mesure.log`, `-cible.log`, `-gap.log`)
- QA-revue1.md : shoot `--crawl` en échec (navigateur fermé), aucun report.json, `carte/` et `404` non capturés. Refait : 5 pages (accueil, carte, a-propos, reservation, `404.html` directe) x 2 largeurs, axe-core complet par page, défilement par 300 px, contraste par nœud, débordement, console, réponses HTTP.
- dist plus récent que src (index.html 23:46, `index.astro` 23:12) : les captures `home/` du QA correspondent au build jugé.
- Liens : /, /carte/, /a-propos/, /reservation/, /404.html, sitemap-index.xml, og.png, favicon.svg, logo.png tous en 200 ; ancre `/reservation/#reveillon` présente ; liens externes = URL du dossier (`wokdejin.com/reveillon/reserver`, `maps.app.goo.gl/Je47suHkwBY6jtC66`, `tel:+3281306888`) ; aucun lien sans préfixe `/wok-de-jin/awwwards/`.
- Méta : 1 seul h1 par page, `lang="fr"`, `noindex, nofollow` (conforme au prompt de production), titres et descriptions uniques, OG image, favicon, JSON-LD `Restaurant` (adresse, geo, horaires Lun, Mer à Dim), mention « Maquette KYW, certaines données sont illustratives » + 1 logo `.kyw-footer__logo` sur les 5 pages, 1 `<main>`, 1 `<footer>`, 404 designée.
- Axe : 0 violation. 43 « à vérifier » contraste sur l'accueil ; recoupés par contraste de nœuds : 0 sous le seuil hors les cases or de la grille, dont la couleur de fond est portée par un `::before` à `z-index: -1` (mesure 1,00 = artefact ; texte `#170d0b` sur `#f3b63a` ≈ 11:1, visible sur `d-02-scroll`).
- Tab : 14 arrêts, ordre logique (skip link, marque, nav, CTA hero…), tous avec `outline`.
- Texte : 0 tutoiement, 0 tiret cadratin, espaces insécables avant `:` et `€`, apostrophes typographiques ; descriptions de pages sans filler. Alt tous issus du champ `sujet` de `photos/index.json`.

## Findings (triés par gravité)

### F2 (mineurs)
- **F2-1 · Menu mobile : « Appeler le081 30 68 88 »** — `src/components/Header.astro:30` (`Appeler le <span class="nw">…`). `.cta` est `display: inline-flex` : l'espace final du texte devient un nœud flex isolé et s'écrase. Preuve : `-gap.log` : `disp: flex`, texte « Appeler le », écart mesuré 0 px entre texte et numéro ; vue sur `m-menu.png` (« APPELER LE081 30 68 88 »). Correction : mettre `&nbsp;` dans le nœud texte (`Appeler le&nbsp;<span class="nw">`) ou `gap: .3em` sur ce CTA, puis vérifier à 390 px.
- **F2-2 · Grille jour / tarif : lecture non confirmée affichée comme un fait dans le hero et la légende** — `src/data/site.ts:7-12` (hypothèse 1), `index.astro:25` (« Midi, en semaine »), `site.ts` tarifs `t1.contexte`. Le site client ne dit que « Midi / Soir semaine / Weekend & fériés » (`site-actuel/infos.json`) : « Midi » n'est pas qualifié de « en semaine », et rien ne prouve que samedi et dimanche midi soient à 27,80 €. La note « Tarif lu d'après le site du restaurant : confirmez-le à la réservation » existe mais n'est que dans `semaine__note` (corps 13 px, sous la grille). Correction : libeller `Midi` (sans « en semaine ») dans le bandeau du hero et la légende, ou répéter la mention sous le bandeau du hero ; ou lever le doute auprès du client avant publication.

### F3 (finitions)
- **F3-1 · « Prochain » / « En cours » ignorent les jours fériés** — `src/motion/semaine.ts:22-45` : un lundi férié affichera le tarif 16,80 € « Prochain » alors que le tarif week-end s'applique. Atténué par la note sous la grille. Correction : soit une phrase « les jours fériés, tarif week-end » à côté de l'étiquette, soit ne pas poser d'étiquette de tarif les jours fériés belges connus.
- **F3-2 · Le principe du wok est dit trois fois sur l'accueil** — comptoir Wok (« Vous choisissez viandes et légumes, le cuisinier les saute devant vous »), comptoir Teppanyaki (« Même principe… »), section « Vous composez, ils cuisent » (« vous choisissez vos viandes et vos légumes… »), puis recopié sur `/carte/`. Correction : raccourcir les deux comptoirs à une demi-phrase (« Viandes et légumes au choix, sautés devant vous. »).
- **F3-3 · Détail non prouvé** — `site.ts:65` (« en bacs sur la glace ») : le dossier et le `sujet` de la photo disent « bacs de poissons et fruits de mer frais ». Retirer « sur la glace » (la version de `/carte/` : « en bacs, à volonté, sur le buffet froid » est correcte).
- **F3-4 · Photos de cuisiniers (02, 03) en gros plan** : le dossier note les visages des seules photos 10-11 ; les cuisiniers de 02-03 sont reconnaissables en partie. Droit à l'image à confirmer avec le client (même réserve que pour 10-11).
- **F3-5 · Accueil mobile : les cinq photos des comptoirs sont masquées** (`site.css:169`, `.comptoirs figure { display: none }` ; mesuré `w=0 h=0`, non chargées car `loading=lazy`). Liste de titres et phrases sans image : propre mais sèche. Option : une vignette 64 px par comptoir à 390 px.
- **F3-6 · `h1` accueil : `textContent` « Àvolonté »** (deux `<span>` sans espace, `index.astro:12`) ; `innerText` correct (« À / VOLONTÉ », spans en `display: block`). À corriger par un espace entre les spans pour les extraits de recherche et lecteurs d'écran.
- **F3-7 · Hero 1440 px** : espace vide d'environ 300 px entre le titre et la photo (`d-01-hero.png`), photo à 486 px de large. Agrandir la photo (`5 / 13`) ou la décaler vers le titre.

## Ce qui est bien (à ne pas casser à la révision)
1. La grille « La semaine » (7 jours x 2 services, case or du week-end, étiquette « Prochain » calculée à l'heure de Bruxelles, mardi hachuré « Le wok se repose ») : signature unique, lisible à 390 et 1440 px, mobile recomposé en pile verticale (pas un desktop écrasé).
2. Fidélité des données : tous les prix, horaires, conditions du réveillon, enfants et anniversaire collent à `donnees.json` ; aucun avis, réseau, e-mail, histoire ni parking inventé ; `Photos : Wok de Jin` en légende.
3. Technique propre : LCP 1,0 s en mobile ralenti, CLS 0, reduced-motion complet, focus visible partout, menu dialog accessible, 404 designée, JSON-LD complet.

Compteurs : F0 0 · F1 0 · F2 2 · F3 7. Serveur de revue (port 4741) arrêté.
