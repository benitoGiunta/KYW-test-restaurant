# ETAT · chez-guillaume-legacy · construction-2 (phase 2 sur 3)

## Fait (phase 1, inchangé)
Audit, deal Hum 3/3, draw 4e5b8c, stamp, comp, DESIGN.md, 7 pages, 8 photos du client, logo, données dans `src/data/site.ts`.

## Fait (phase 2)
- Nav : pilule, menu en Popover natif sous 75 rem (bouton « Menu », « Fermer le menu », se ferme au clic sur un lien et au passage en desktop). 75 rem et non 60 : la pilule déborde entre 960 et 1200 px.
- Boutons : huit états, hover sous `(hover: hover)`, `:active`, `:disabled`, rebond supprimé (`--ease-spring` retiré). Rouge plein réservé à la billetterie (nav, billet, barre) ; « Voir l'agenda », « Réserver un spectacle » (accueil, restaurant) deviennent calmes ; « La carte du mois » devient un lien `.link--arrow`.
- Motion calme : un reveal (opacité + 24 px, une fois, `.js` et `no-preference` seulement) sur les trois moments, la salle, la bande, la photo de clôture ; le billet se pose au chargement (700 ms) ; barre de billetterie masquée (`visibility`) tant que le premier bloc est à l'écran. Contenu visible sans JS et en reduced motion (mesuré).
- Onglets du restaurant : tabindex itinérant, Home/End, `preventDefault`. Volet collant du Feature Stack validé (haut à 128 px) ; statique si hauteur < 40 rem.
- Hero : `dvh` (`clamp(460px, 72dvh, 680px)`), marge de 24 px de la scène à 1440 (sloplint 44c) ; adresse du pied sur une ligne (49b) ; cibles 44 px dans le pied ; safe-area (`viewport-fit=cover`).
- Hero review : sloplint `--render --stage hero` 0 FAIL, 0 REFLEX, reste NOTE 58 (répondue au stamp), WARN 23 et F7 (déjà répondus). Revue du hero `ship` en auto-notation (`self`, pas de sous-agent en session d'agent). `comp.md` : trois questions de reproduction, stamp complet.
- Mesures : aucun débordement horizontal à 320, 375, 390, 768, 1024, 1100, 1201, 1280, 1440 ; pied KYW, noindex et mention sur les 7 pages du build (`dist/chez-guillaume/legacy/`), build `scripts/q.sh` passe.

## Reste (phase 3 et captures)
- sloplint `--render` sur les 7 pages, contraste (rouge `#cd3b08` sur crème, texte clair sur rouge, bande et barre), fold mesuré, gates § 5, RAPPORT.md, `pnpm index`.
- À regarder sur les captures : grain « fibre » du papier (stries horizontales visibles), clip-path déchiré, photo « La salle » (source 1000 px étirée en pleine largeur à 1440, flou possible), `.close__photo` à 1024 et 390, menu Popover sur les pages intérieures, hover de la barre.
- Pas de shoot complet fait (agent « captures »). Aucun `dist/` d'un autre site touché.

## Décisions et hypothèses
- Pas de formulaire : le site d'origine n'en a pas, la réservation est le lien de billetterie `https://chezguillaume.be/events/` conservé. Gates 23 et 29 sans objet.
- Barre de billetterie : apparaît quand le premier bloc de `main` a quitté l'écran ; visible d'emblée sans JS.
- Accueil : toujours quatre rouges pleins possibles à l'écran (nav, pastilles du billet, barre) : même recette, même destination.
- Pièges : l'overlay « dev toolbar » d'Astro apparaît en bas des captures de dev, ce n'est pas le site ; `nowrap` sur un lien d'adresse dans une grille élargit la piste (corrigé en deux segments) ; un lien `inline-flex` ne coupe pas ses enfants.
