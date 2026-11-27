# ETAT ne5t-legacy, phase 3 (QA), 2026-11-27
Fait : corrections QA (aria-label CTA nav, cibles .link 24 px), build et index OK, RAPPORT.md écrit. 404 contraste/skip = faux positifs.
Reste : sweep sloplint complet, finish review, polices woff2, 404 ressource en console (non reproduite), placeholders (voir RAPPORT.md).

# ETAT ne5t-legacy, phase 2 (construction-2), 2026-11-27
Fait (phase 1) : voir DESIGN.md ; 7 pages, build OK.
Fait (phase 2) : nav collante en dalle avec `<nav popover>` unique (menu téléphone testé : ouverture, Échap, aria-expanded), CTA « Réserver » raccourci au téléphone ; signature hero (voile `dusk`, pose `settle`, montée `rise`) sur accueil et spa ; un reveal `[data-reveal]` sous `.js` (IntersectionObserver, repli try/catch, `reduce` = tout visible) ; jour courant dans les horaires ; hover sous `(hover: hover)`, cibles 44 px sous `(pointer: coarse)`, `:active`, focus visible ; hero review (self, ship) et reproduction de la comp ; sloplint render hero : 1 FAIL faux positif (34), WARN 49 faux positifs ; mesures navigateur : pas de débordement à 375 et 1280 sur 6 pages, 0 erreur console au téléphone ; build `dist/ne5t/legacy/` OK.
Sans objet : formulaire (réservation par téléphone, `tel:` gardé), switcher de carte (liste unique), vidéo, tooltip.
Reste : agent captures puis phase 3 (revues, sweep, shoot complet, LCP et axe non mesurés). Une 404 de ressource en console au bureau seulement (non identifiée, probablement la barre du serveur de dev).
À vérifier (placeholders) : inchangé depuis la phase 1 (heures exactes `.fill` sur accueil, restaurant, infos ; adresse ; menu Éphémère ; aucun avis ; suites sans description).
Pièges : `.btn` est en `inline-flex` : un espace en bord d'enfant disparaît (utiliser `gap`) ; le hook refuse `curl` hors q.sh ; Astro dev ajoute une barre en bas des captures (ignorer).
