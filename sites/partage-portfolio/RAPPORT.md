# RAPPORT : partage-portfolio (QA, phase 3 sur 3)

Date : 01/11/2026. Gabarit : **Ardoise** (choix argumenté dans `DESIGN.md`, adéquation estimée 85 %).
Sortie : `dist/partage/portfolio/` (7 pages : accueil, carte, formules, salle, histoire, réservation, 404).

## Résultat de la QA

Sources : `QA-build.md` (agent « captures » : shoot de l'accueil, de /carte/ et du 404, audit des 6 pages), puis
contrôles ciblés de cette phase (script Playwright, captures dans `.shots-partage-portfolio-qa3/`, planches
`planche-d.png`, `planche-m.png`, `planche-fix.png`).

| Contrôle | Résultat |
| --- | --- |
| Erreurs console, requêtes en échec (6 pages × 1440 et 390) | 0 |
| Axe (accueil, carte) | 0 violation |
| Audit `audit.mjs` | 0 FAIL, 18 WARN (voir plus bas) |
| CLS bureau et mobile | 0 |
| LCP mobile throttlé | 1,04 s (accueil), 1,12 s (carte) |
| Débordement de page (`scrollWidth`) à 320, 360, 390, 1440 | aucun après correction |
| Bas de page en 1440 et 390 après défilement (bande du site, mention KYW, logo KYW visibles et non couverts, `elementFromPoint`) | OK sur les 6 pages |
| `meta robots` | `noindex, nofollow` sur les 6 pages |
| Éléments `data-reveal` restés cachés après défilement | 0 |
| Clics réels sur l'en-tête (phase 2) | OK, 5 liens + logo + retour |

### Corrections de cette phase (`src/styles/base.css`)
1. **Titre « Lunch et groupes » (/formules/)** : `.entete h1` en `nowrap` touchait le bord à 390 px (16 → 387 px,
   gouttière mangée) et sortait de l'écran sous 360 px (384 px pour 320 et 360). Sous 600 px, le titre passe à la
   ligne (`white-space: normal`, `text-wrap: balance`) : « LUNCH ET / GROUPES », 16 → 199 px. Vérifié par capture à
   390 px (`m-formules-top.png`) ; bureau inchangé.
2. **Bloc « Accès » à 320 px (accueil, réservation)** : la grille `.acces` à colonne implicite `auto` prenait la
   largeur minimale du tableau des horaires (cellules en `nowrap`) : 332 px pour 288 disponibles, texte rogné à droite.
   Colonne en `minmax(0, 1fr)` et, sous 360 px, heures autorisées à passer à la ligne. Plus aucun débordement mesuré.
3. Sous 360 px, `.btn` borné à 100 % de largeur (« Réserver sur restaurantpartage.be »), par prudence.

### Points vus et laissés en l'état
- `.mots` (« Salle / Cuisine / Partage ») : les `li` pleine largeur dépassent la fenêtre de 19 px mais sont coupés par
  `overflow-x: clip` (choix du gabarit, le texte reste visible entier).
- Barre d'actions fixe en bas (« Réserver, Appeler, Bon cadeau ») à toutes les tailles : dessin du gabarit Ardoise ;
  le pied de page KYW reste visible au-dessus.
- 404 du shoot : c'est la page d'erreur du serveur local (`serve.mjs`, sans titre ni `lang`), pas celle du site ;
  Vercel sert `dist/` sans la page 404 du sous-dossier. Aucune action.
- Audit, WARN : phrases répétées (vins de la carte présents dans l'aperçu de l'accueil ; ligne d'horaires répétée dans
  la barre d'état de chaque page) : voulu. `robots.txt` et `sitemap` absents à la racine du serveur local, présents
  dans `dist/partage/portfolio/`.
- Indice « couleur seule » (5 sur l'accueil) : axe ne signale pas de `link-in-text-block` ; les liens de texte sont
  soulignés.
- Champ date du formulaire affiché `mm/dd/yyyy` dans Chromium headless (locale anglaise) : le navigateur d'un
  visiteur francophone affiche `jj/mm/aaaa`.

## Placeholders (données illustratives, marquées sur la page)
- **Heures de service** 12:00-14:00 et 18:30-22:00 : indicatives, pastille « à confirmer » (les jours d'ouverture et
  de fermeture sont confirmés).
- **Suggestion du jour** du mardi au samedi : plats réels de la carte, attribution au jour inventée, pastille
  « illustrative ». Lundi et dimanche : phrases de fermeture réelles.
- **E-mail** : inconnu, jamais affiché (`placeholder: true` dans `site.ts`).
- Formulaire de réservation : démonstration sans envoi, mention visible, il renvoie vers restaurantpartage.be.
- Aucune récompense, aucun avis ni chiffre inventé : presse (La Libre, La DH) et note Google relevée.

## Points ouverts
- Heures de service exactes et adresse e-mail à obtenir du restaurant.
- `gabarits/UTILISATION.md` : ligne « ardoise | partage » à ajouter par l'orchestrateur (consigne de ne pas toucher à
  `gabarits/`).
- Shoot complet des pages /formules/, /salle/, /histoire/, /reservation/ non fait par l'agent « captures » (son shoot
  n'a produit que 3 dossiers) ; ces pages ont été contrôlées ici par captures fenêtre haut et bas, 1440 et 390.

## Leçons structurelles
- Un titre d'en-tête en `white-space: nowrap` + `flex: 0 0 min-content` (gabarit Ardoise, `.entete h1`) déborde dès
  que le titre fait trois mots ; une grille sans `grid-template-columns` explicite (`.acces`) hérite de la largeur
  minimale d'un tableau en `nowrap`. Ni axe ni `scrollWidth` ne le voient quand `body` coupe en `overflow-x` : il faut
  mesurer le `Range` du texte et chercher les boîtes dont `right > innerWidth` à 320, 360 et 390 px. Reporté dans
  `agents/lecons.md` (le gabarit `gabarits/ardoise` a le même défaut, non corrigé ici par consigne).
