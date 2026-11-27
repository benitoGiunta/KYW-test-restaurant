# ETAT Bayti portfolio, phase 1 sur 3 (27/11/2026)

## Fait
- Gabarit retenu : Journée (matrice dans DESIGN.md), copié dans `sites/bayti-portfolio/`, package renommé `bayti-portfolio`.
- `src/data/site.ts` entièrement remplacé (généré depuis donnees.json) : nom, baseline, deux adresses, horaires Comptoir/restaurant, carte complète (6 catégories), menus, histoire, avis unique, 33 photos avec alt du champ `sujet`. Moments : 11h Comptoir, 18h restaurant, 21h « À demain ».
- Pages : accueil (hero cadran, intro, Comptoir + médaillons, Chez vous, restaurant, horaires), `/carte/`, `/chez-vous/` (remplace `/brunch/`), `/histoire/`, `/reservation/`, 404.
- Palette nuit passée au vert sapin (tokens.css et CIELS de journee.ts), `--heure` recalés (midi 11, ocre 15, nuit 18, nuit profonde 21), favicon, OG image, photos WebP.
- Build OK : `dist/bayti/portfolio/` (6 pages, 9,2 Mo). Vérifié : noindex, mention KYW, pied KYW, aucun tiret cadratin, aucune trace du gabarit d'origine.

## Reste (phases 2 et 3)
- Motion : vérifier la signature (ciel qui tourne, disque) avec 3 moments, l'invitation « moment présent » (cachée avant 11h et après 21h), les médaillons.
- QA navigateur : captures desktop/mobile, 4 largeurs, débordements, clics réels de l'en-tête, bas de page (mention KYW), frise mobile (rangée de points prévue pour 6 : à vérifier avec 3), contraste sur le vert.
- Photos : poids 8,4 Mo, ajouter variantes 960 px / `<picture>` si LCP trop lent ; hero de l'accueil sans photo (cadran seul), à juger.
- `pnpm index`, publication : non faits (phase 1).

## Décisions et hypothèses
- Badge « ouvert » : un créneau unique 11h-21h (union Comptoir et restaurant) ; fermé dimanche et lundi (déduit, « à confirmer » affiché).
- Aucune donnée fictive : pas de `placeholder: true`. Chiffres Google non affichés. Pas d'équipe.
- Tarifs traiteur : non publiés (note sur la page). Contact traiteur : mailto et téléphone réels (info@bayti.be, +32 492 07 25 76).
- `gabarits/UTILISATION.md` non mis à jour (gabarits/ protégé par la consigne) : y ajouter « journee | bayti ».
- Ancien contenu du gabarit (FICHE, REVUE, RAPPORT, apercu.png, DESIGN du gabarit) retiré du site.
