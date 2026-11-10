# Makimono · variante legacy · 2026-11-10

## 1. Approche conservée vs site d'origine

| Élément | Origine (makimono.be, Bootstrap 3, 2019) | Legacy |
|---|---|---|
| Type | one-page | one-page conservée (ancres Carte, Photos, Composer, Boxes, Livraison, Événement, Contact) |
| Hero | logo carré sur photo plein écran | Poster : photo cliente (nigiri flambé), plaque crème, titre, phrase, deux actions |
| Nav | collante Bootstrap, hamburger | edge-aligned 75 px, un seul bouton « Commander » en contour, lien actif, menu mobile `popover` |
| Carte | PDF image de 26 pages | texte indexable (`carte.json`), onglets sous `.js`, rangées entre filets |
| Animations | WOW.js, Owl Carousel (contenu caché) | un reveal de structure (IntersectionObserver), désactivé en mouvement réduit |

Dérogation : aucune. Pas de réservation de table (inconnue) : l'action est la commande en ligne.

## 2. Axes de l'audit
Traités : tokens, focus visible, `motion-reduce`, `overflow-x: clip`, emoji, `<title>`, noindex, carte en texte, horaires uniques, composition, système typographique, trame Halftone (preuves : sloplint 0 FAIL, QA captures). Non traité : aucun.

## 3. Résultat sloplint
- Before : 11 FAIL, 6 REFLEX, 3 WARN.
- After : 0 FAIL, 0 REFLEX, `--render` tourné (5 captures). 2 WARN 28a dismissed (images sous le pli en `loading="lazy"`, pas le LCP), 1 NOTE 58 (carte, 188 mots : liste de plats, sans objet).
- Kept : `links 23/23`. Les WARN « not compared » viennent de la cible `.hallmark/site-actuel/index.html` non rendue.
- Dropped / Reworded : aucun.
- Build : passe (2 pages), `noindex` et `kyw-signature` sur `/` et `/404`.

## 4. QA navigateur (phase 3)
- Mesures de l'agent captures : 0 débordement, 0 cible tactile trop petite, 0 focus invisible, CLS 0 / 0,034, LCP 920 ms mobile, 0 requête en échec, axe sérieux 0.
- Corrigé : erreur console « Failed to load resource 404 » (favicon absent) : `<link rel="icon">` en data URI dans `Base.astro`. Vérifié par capture ciblée de l'accueil : `errors` et `failed` vides.
- Faux positifs écartés : « 404 sans title ni lang » (réponse brute de `serve.mjs` ; `404.html` porte `lang="fr"` et `<title>`), WARN robots/sitemap, polices `.ttf` (servies par Google Fonts), 404 sans h1.
- Non vérifié : 17 contrastes « à vérifier » d'axe (texte sur photo/trame, non tranchés automatiquement) ; revues hero et finish en auto-notation `self` (pas d'outil Agent).
- Reveal : captures pleine page sans défilement montrent des blocs vides (attendu, reveal posé par le script).

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Aucun plat fictif | `carte.json` | `placeholder: false` partout | n/a |
| Prix des Futo | carte (Korean Futo 10,50 à 11,00 €) | fourchette reprise de la carte 2026 | prix confirmé par le restaurant |
| Prix des fillings, toppings, sauces | carte | `prix: null` (prix portés par la rubrique) | rien |
Aucun slot `.fill`. Aucun avis repris.

## 6. Demande de matériel
Photo qui manque le plus : la salle remplie à l'heure du service (les photos actuelles montrent façade et tables vides). Aussi : une photo de livraison/emballage pour la section Livraison, et le logo en SVG.

## 7. Leçons structurelles
- `sloplint --genre` n'accepte que editorial, modern-minimal, atmospheric, playful.
- `--kept` compare la cible du `--before` (ici `.hallmark/site-actuel/index.html`) : la passer en plus de `src` fait remonter ses FAIL dans le total.
- Un favicon absent produit une erreur console 404 : ajouter un `<link rel="icon">` data URI.
