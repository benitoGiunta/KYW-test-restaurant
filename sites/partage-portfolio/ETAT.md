# ETAT : partage-portfolio (fin de la phase 1 sur 3, construction)

Date : 01/11/2026. Agent : variante-portfolio, passe construction-1.

## Fait
- Gabarit choisi : **Ardoise** (matrice et décision dans `DESIGN.md`), copié dans `sites/partage-portfolio/`
  (sans dist, node_modules, fichiers de revue du gabarit ni photos d'exemple), package renommé `site-partage-portfolio`.
- `src/data/site.ts` entièrement remplacé par les données de Partage : carte réelle du 28/09/2026 (starters, entrées,
  plats, desserts), lunch du 21/10/2026 (38 €, 4 plats + suppléments fromages), vins au verre, 13 catégories de bar,
  horaires (fermetures réelles, heures à confirmer), accès, téléphone du site, réseaux, presse (La Libre, DH) et note
  Google, équipe (Charles Jeandrain, Luca Recloux, Loïc Goumet, Antoine), 19 photos avec alt descriptifs.
- Toutes les pages adaptées : accueil (ardoise MIDI/SOIR), carte (+ rubrique « Le bar » `#bar`), « Lunch et groupes »
  (`/formules/`), salle, maison, réservation, 404. Libellés de nav, titres, descriptions, OG, favicon.
- Tokens : noir chaud `#1D1C1A`, ocre `#D99A1E`, crème `#F0EBE1`.
- Photos : 19 WebP + 3 aperçus 4:5 + `og.jpg` + `logo-partage.png` (non utilisé pour l'instant) dans `public/`.
- Build OK (`scripts/q.sh pf-partage-build pnpm build:site sites/partage-portfolio`), 7 pages, 2,0 Mo ;
  noindex, mention KYW et `kyw-footer` présents sur les 7 pages, aucun reste « Potes / Zenchef / exemple », aucun tiret
  cadratin.

## Reste (phases 2 et 3)
- Phase 2 : motion (vérifier que `setup.ts` suggestion / onglets / barre d'état tournent avec les nouvelles données,
  notamment les jours fermés lundi et dimanche et le mardi sans midi), aperçus au survol (3 seulement).
- Phase 3 : QA navigateur (lire `QA-<étape>.md` de l'agent captures), contrôles de la section « Leçons intégrées » du
  prompt (clics réels sur l'en-tête, bas de page visible), `RAPPORT.md` (placeholders, résultats), `pnpm index`.
- Mesurer à 390 px : largeur du h1 « PARTAGE » + signature, des mots géants, et des noms de vins longs dans `.ligne`.
- `gabarits/UTILISATION.md` : ajouter « ardoise | partage » (non fait : consigne de ne pas toucher à `gabarits/`).

## Décisions et hypothèses
- Heures de service : 12:00-14:00 et 18:30-22:00 (source « Que faire à Namur »), marquées « à confirmer » sous chaque
  tableau d'horaires (`horairesNote.placeholder`). Mardi : soir seulement (fermé le mardi midi selon le site).
- Le lunch est en service `midi` ; la carte à partager en `soir` (hypothèse : la carte n'est pas affichée au midi faute
  de source) ; vins au verre en `tous`.
- Suggestions du jour : plats réels de la carte, attribution au jour illustrative (marque « suggestion illustrative ») ;
  lundi et dimanche : phrases réelles de fermeture.
- Aucun avis client inventé : la section avis montre deux titres de presse et la note Google 4,7 (Rankeat, août 2025).
- Menus cités par la presse (4 services 49 €, homard 67 €) non affichés (absents du site actuel).
- Réservation : outil inconnu, lien vers `https://restaurantpartage.be/#reservation` ; e-mail inconnu, jamais affiché.
- Téléphone : +32 81 81 00 98 (site officiel) ; le second numéro (Le Fooding) écarté.
- Coquilles du GIF corrigées : « Tripel Karmeliet », « Gin Mare Méditerranée ».
- Photo 11 (cuisinier) : identité non confirmée, alt sans nom. Photo 19 (chef en veste blanche) attribuée à Charles
  Jeandrain d'après le portrait 09 (à confirmer).
