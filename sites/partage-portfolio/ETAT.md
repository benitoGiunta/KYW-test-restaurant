# ETAT : partage-portfolio (phase 3 sur 3 terminée : QA, site livré)

Date : 01/11/2026. Phase 1 : variante-portfolio, construction-1. Phase 2 : variante-portfolio, construction-2.

## Fait en phase 1
- Gabarit **Ardoise** (matrice dans `DESIGN.md`), contenu complet de Partage dans `src/data/site.ts` (carte du
  28/09/2026, lunch du 21/10/2026, vins, bar, horaires, presse, note Google, équipe, 19 photos), 7 pages adaptées,
  tokens noir chaud / ocre / crème, OG, favicon. noindex, mention KYW et `kyw-footer` sur les 7 pages.

## Fait en phase 2
- **Signature** : « Charles Jeandrain » s'écrit (clip-path) à l'intro de l'accueil, puis un trait ocre se trace à sa
  suite (variable CSS `--trait`, `::after`). Rejoué à chaque retour sur l'accueil ; posé d'emblée en reduced motion.
  Le nom « PARTAGE » reste peint au premier rendu (LCP).
- **Onglets** : par défaut « Midi » seulement avant 15 h un jour de lunch (mer. au sam., lu dans `data-jours-midi`
  calculé depuis les horaires) ; sinon « Soir ». Vérifié par horloge simulée : mercredi 12 h 30 → midi, barre
  « Ouvert jusqu’à 14h00 », ligne du tableau marquée ; mardi 12 h 30 → soir, « Fermé, ouvre aujourd’hui à 18h30 ».
  Flèches clavier OK.
- **Suggestion du jour** : dimanche et lundi = phrases réelles de fermeture, pastille « illustrative » masquée ;
  flèches et réécriture mot à mot OK. Apostrophes typographiques dans les textes calculés (`Aujourd’hui`, `jusqu’à`).
- **Horaires** : cellule vide du mardi midi remplacée par « fermé » (accueil et réservation).
- **Barre d'état** statique (sans JS, reduced motion) : une ligne coupée par des points de suspension au lieu d'un mot
  tronqué net ; la copie du marquee est masquée.
- **États** : retour d'appui `scale(0.96)` sur les flèches du jour, les onglets et les boutons ; lignes à aperçu en
  `role="group"` (leur `aria-label` n'était pas permis sur un `div` générique).
- **Mobile 390 px** : aucun débordement de page sur les 7 pages (h1 + signature, mots géants, noms de vins longs) ;
  signature resserrée sous 480 px (tracking 0,22 em, trait 1,5 em).
- **Contrôles faits** (script Playwright ciblé, pas de shoot) : 7 pages × 390 / 1440 / 1440 reduced motion, aucune
  erreur console ; lignes non masquées en reduced motion ; aperçu au survol visible sur /carte/ (opacité 1) ;
  transitions par clics réels sur les 5 liens de l'en-tête + logo + retour arrière, sans erreur.
- Build OK : `scripts/q.sh pf-partage-build3 pnpm build:site sites/partage-portfolio` (7 pages).

## Fait en phase 3 (QA)
- Lu `QA-build.md` (captures) : 0 erreur console, axe 0, CLS 0, audit 0 FAIL ; shoot limité à accueil, carte, 404.
- Contrôles ciblés (script Playwright, `.shots-partage-portfolio-qa3/`) sur les 6 pages en 1440 et 390 : console
  propre, aucun débordement, bas de page (bande, mention KYW, logo KYW) visible et non couvert, `noindex`.
- Corrigé dans `src/styles/base.css` : titre « Lunch et groupes » qui sortait de la gouttière (passe à la ligne sous
  600 px) ; grille `.acces` élargie par le tableau des horaires à 320 px (`minmax(0, 1fr)`).
- `RAPPORT.md` écrit (QA, placeholders, points ouverts). Build final OK (`scripts/q.sh pf-partage-qa3-build2`),
  `pnpm index` sans changement.

## Reste
- Heures de service et e-mail à obtenir du restaurant ; `gabarits/UTILISATION.md` (« ardoise | partage ») à faire
  par l'orchestrateur ; même défaut `.entete h1` / `.acces` à corriger dans `gabarits/ardoise`.

## Décisions et hypothèses (inchangées depuis la phase 1)
- Heures 12:00-14:00 et 18:30-22:00 « à confirmer » ; mardi soir seulement ; lundi et dimanche fermés.
- Lunch en service `midi`, carte à partager en `soir`, vins au verre en `tous`.
- Suggestions : plats réels, attribution au jour illustrative (marquée). Aucun avis inventé (presse + note Google).
- Réservation : lien vers `https://restaurantpartage.be/#reservation` ; e-mail inconnu, jamais affiché.
- Mobile : « Lunch et groupes » et « La salle » absents de l'en-tête (choix du gabarit), joignables par l'accueil et
  le pied de page.

## Pièges
- La barre d'état passe en défilement seulement quand le JS pose `data-anime` (pas en reduced motion).
- Un test d'aperçu au survol juste après un `scrollIntoView` échoue : tout défilement cache l'aperçu ; attendre la fin
  du défilement avant de bouger le pointeur.
