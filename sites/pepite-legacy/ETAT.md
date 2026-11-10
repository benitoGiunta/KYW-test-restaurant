# ETAT · pepite-legacy · construction-3 (phase 3 sur 3, QA)

## Fait (phase 3)
- QA lue, twitter:card ajouté, liens du pied à 33 px, rebuild OK, RAPPORT.md écrit, serveur tué.
## Reste
- Sweep sloplint --kept, finish-review self, entrée log avec fingerprint, 72 cases DESIGN.md, push.

# Phase 2 (archive)

## Fait (phase 2)
- Nav sticky masthead à `--z-sticky-nav` ; sous 60rem, menu `<nav popover>` unique + bouton « Menu/Fermer » (`aria-expanded`), fermeture au clic de lien et Escape ; skip link conservé ; `scroll-padding-top` = nav + 16 px.
- Boutons : états repos, hover (sous `(hover: hover)`), focus-visible, active, disabled ; cibles 44 à 48 px ; `.lien` et pied à 44 px sur `(pointer: coarse)`.
- Script unique (Base.astro) : menu, jour courant des horaires (`aria-current="date"`, fuseau Bruxelles, tag « Aujourd’hui »), un reveal (rangées de la carte, `.js [data-reveal]`).
- Grain `.grained` sur Vins et Horaires (0,07). Responsive : breakpoints 60rem et 40rem, horaires restackés, boutons pleine largeur au téléphone, pied en liste `ul`.
- Réservation : lien Tablebooker conservé, donc aucun formulaire (pas de faux envoi). Pas de switcher ni de disclosure (liste de 5 rangées, horaires dits une fois).
- Hero-review `self` (ship), comp reproduite 1280x800 (comp.md). `sloplint --render --url` : 0 FAIL, 1 WARN (28a, waive), 1 NOTE (98 mots à y=3150, section Presse, repris tel quel du site d’origine). Build OK, `dist/pepite/legacy/` rebuild, noindex + mention KYW + KywFooter sur `/` et `/404`.
- Mesures (Playwright, dev server tué) : pas de scroll horizontal à 375, 961, 1024, 1280, 1920 ; menu ouvre/ferme ; reveal 5/5 ; reduced-motion et sans JS : contenu à opacité 1 ; 0 erreur console.

## Reste (phase 3)
- Sweep, `--kept` contre `before.json`, finish-review `self`, RAPPORT.md, `pnpm index`, push ; entrée du journal sans `fingerprint` (à compléter).
- Captures par l’agent « captures » : 375/768/1440, vérifier le contraste du texte sur le dégradé du hero et la bande grain ; le reveal exige un défilement par paliers (rangées à opacité 0 tant qu’elles n’ont pas été vues).
- Option : photo couvert ou vitrine (non utilisées) si la page paraît trop typographique ; la NOTE 58 (Presse, 98 mots) pourrait se réduire en passant à deux extraits.

## Pièges et hypothèses
- Le lien « Réalisé par » du paquet KYW mesure 24 px de haut : paquet partagé, non touché.
- `.hor` du jour courant dépend de la date du visiteur : en capture, le jour dépend du jour du shoot (aucune date en dur).
- Hypothèses de phase 1 inchangées (menu 58 €, Tablebooker, aucun avis).

# Revue 1 (relecteur-site, passe 1)
- Fait : REVUE-1.md écrit (A_CORRIGER : 0 F0, 2 F1, 4 F2, 4 F3), captures et QA-revue1 réutilisées sans nouveau shoot, aucun serveur lancé.
- Reste (réviseur) : F1-1 (phrase horaires inventée/fausse le samedi), F1-2 (bandeau vins vide), puis F2-1 à F2-4 et F3.
- Hypothèse : liens externes non testés (pas de réseau) ; URL identiques à `site-actuel/page.html`.
