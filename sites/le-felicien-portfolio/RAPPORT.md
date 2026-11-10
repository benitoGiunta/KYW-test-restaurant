# RAPPORT, Le Félicien portfolio (Ardoise), QA phase 3

## Résultat QA
- Captures et audit de l'agent « captures » (QA-build.md) : 0 erreur console, 0 requête en échec, 0 violation axe serious, aucun débordement, CLS 0, LCP desktop <= 112 ms, mobile <= 1100 ms, 60 FPS. Audit : 0 FAIL, 12 WARN.
- Corrigé : meta description de l'accueil (176 -> 149 car.) et de `/histoire/` (193 -> 122 car.) ; phrase « Le lundi midi, cuisine du marché décidée le jour même » dupliquée sur l'accueil (formule reformulée : « Le lundi, … »).
- Faux positifs, non corrigés : 404 « sans title, lang, h1 » (réponse brute de serve.mjs ; `404.html` a `lang="fr"` et `<title>`), robots/sitemap sous `base`, phrase d'horaires répétée (copie `aria-hidden` du marquee et texte statique voulus), « hover sans changement » sur l'onglet actif et liens d'en-tête (réaction par pixels).
- Contraste « à revoir » (axe incomplete) : éléments recouverts (marquee, mots géants, flèches `aria-hidden`), aucune violation ; vert `#1e3224` + muted `#a5b5a8` suffisant.
- Vérification après correctif : rebuild exit 0 (7 pages), grep des descriptions, capture ciblée `/histoire/` : 0 violation axe.
- Non refait (déjà vérifié en phase 2) : clics d'en-tête, bas de page, reduced motion, 320 à 1440.

## Placeholders
- Suggestions du mardi au vendredi : plats réels de la semaine du 3 au 6 novembre attribués aux jours à titre illustratif (`placeholder: true`).
- Photos libres Picsum/Unsplash (ids 395, 292, 431, 429, 493, 425), crédits dans `site.ts` et sur la page salle : à remplacer par de vraies photos.
- Capacité 300 couverts à confirmer ; couverts max 20 du formulaire arbitraire ; formulaire de réservation de démonstration.
- Aucun avis, bon cadeau ni portrait (rien au dossier).

## Points ouverts
- `pnpm index` et commit de `dist/` : à faire à la publication.
- Pas de mesure de l'état « ouvert » à plusieurs instants.

## Leçons structurelles
- Axe « contrast needs review » sur marquee et mots géants : éléments recouverts, pas un défaut ; ne pas repeindre.
