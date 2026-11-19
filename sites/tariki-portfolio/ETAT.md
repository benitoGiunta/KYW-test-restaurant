# ETAT, tariki-portfolio, construction phase 3 sur 3 (QA terminée)

## Fait (phase 1)
- Gabarit braise adapté, contenu complet du dossier, 5 pages, assets du client en WebP, adéquation 72 % (voir DESIGN.md).

## Fait (phase 2)
- Nettoyage : les 25 photos héritées de Potes au Feu et logo.png / logo-pictogramme.svg supprimés (suppression par noms explicites, pas de glob). `public/photos/` ne contient plus que braises, feu-de-camp, arcades, logo ; `dist/tariki/portfolio/` = 1,1 Mo.
- Motion : dérive de la photo du hero au défilement (échelle + glissement, ne découvre pas le bord) ; braises en canvas dans le hero (32 étincelles, 14 au tactile, nombre visible proportionnel à la température, arrêt hors écran, absent en reduced motion) ; scène « cuisson » avec étiquette vivante « couche, température » (`data-cuisson-temp`) ; « route » de la page Le chemin : trait vertical qui descend au défilement et allume les cinq étapes (Syrie à Belgique), remplace la liste `.plats`.
- Interactions et états : filtre de la carte annonce « N rubriques, M plats affichés » (`role=status`), un repère du thermomètre vers une rubrique masquée remet « Tout » ; formulaire de réservation : date minimale = aujourd'hui (Bruxelles), dimanche refusé avec message (`setCustomValidity` + `form__err`), `:user-invalid`, message d'état après validation (nouvel onglet, ou lien si bloqué) ; focus visible renforcé (boutons, liens, filtres, champs).
- Mobile : scène cuisson tient dans le viewport au-dessus de la barre basse à 320x568, 360x640, 375x667, 390x844 (stage = 100svh - 4,4 rem, scène plus petite et chapeau masqué sous 700 px de haut). Aucun débordement horizontal sur les 5 pages à 320, 360, 390 et 1440.
- Reduced motion : 0 texte caché, 0 animation en cours, pas de canvas, route entièrement allumée, étiquette de cuisson absente.
- Contraste : tous les arrêts de température >= 5,3:1 (fg, muted, accent) ; accent à 90 °C déjà `#6b4608` (6,7 et 5,8:1) ; numéros 01-05 passés du cuivre (1,8:1 sur brun moyen) au muted ; erreur de formulaire `#9a2a12` (5,4:1).
- Contrôles (script Playwright maison, 0 erreur console) : clics réels sur les liens de l'en-tête (1440) OK sur 4 pages, bas de page 1440 avec bande KYW + mention Maquette visible, build `scripts/q.sh` OK (5 pages).

## Reste (phase 3 et agent captures)
- Shoot/audit complets et planches : à faire par l'agent captures (non lancés ici).
- Embers peu visibles sur le hero actuel (photo déjà très claire de flammes) : à juger sur capture ; monter `a` ou le nombre si nécessaire (`initBraises`).
- Photos feu de camp et arcades toujours `placeholder: true` (droits à confirmer) ; aucune photo de plat ni de salle.
- `gabarits/UTILISATION.md` : ajouter tariki à la ligne braise (gabarits/ protégé, non modifié).
- Logo calligraphique non repris dans le hero (choix : sobriété, OG et favicon seulement).
- Page 404 : non revue visuellement.

## Décisions et hypothèses
- Étiquette de cuisson et températures du plat restent illustratives (déjà marquées).
- Le chapeau « Cuisson » est masqué sur mobile court (< 700 px) pour gagner de la place ; l'avertissement « illustration » reste dans la note et l'aria-label.
- `window.open` sans `noopener` puis `opener = null` (avec `noopener`, la fonction renvoie toujours null et le test de blocage échoue).

## Pièges
- `.photos/` et `.logs/` à la racine, non commités. `dist/tariki/awwwards/` est modifié par un autre agent : ne pas l'ajouter.
- Le formulaire est `visibility: hidden` (data-reveal) tant qu'il n'a pas été défilé : un test Playwright doit scroller avant `fill`.

## Phase 3 (QA)
- Logo mobile 44x44, 404 axe = faux positif, pages histoire/reservation/404 vérifiées. RAPPORT.md écrit. Build final OK. Reste : droits des photos, UTILISATION.md (gabarits protégé).
