# ETAT — brasserie-du-quai, variante portfolio (fin de construction-3 / QA, 01/11/2026)

## Fait
- Gabarit **Marée** retenu (matrice dans `DESIGN.md`, 28/30 contre 24 pour Ardoise, déjà pris par Partage).
- Copie du gabarit (sans dist, node_modules, rapports du gabarit, photos des Potes au Feu), package renommé
  `site-brasserie-du-quai-portfolio`.
- 24 photos de la maison converties en WebP (`public/photos/`, noms sans préfixe numérique), logo en favicon, OG 1200×630
  depuis la terrasse.
- `src/data/site.ts` : tout le contenu réel (carte complète générée depuis `donnees.json`, prix au format « 20 € »,
  apostrophes typographiques), horaires saisonniers, équipe, notes publiques, MICHELIN, bon cadeau, plan, règles maison.
- Pages réécrites : accueil, carte, écailler, terrasse, la maison (`/histoire/`), réservation, 404. Composants adaptés :
  Header, Footer, Maree (segments « à confirmer »), Plan (schéma Meuse / Rue du Quai / pont du Luxembourg).
- `motion/setup.ts` : le badge d'état ne dit jamais « ouvert » ni « fermé » un jour non confirmé.
- Build OK : `scripts/q.sh vp-bdq-build node scripts/build-site.mjs sites/brasserie-du-quai-portfolio` → 7 pages,
  `dist/brasserie-du-quai/portfolio/` ; noindex et mention KYW présents sur les 7 pages ; aucun reste « Potes / Plante / libre- ».

## Fait en construction-2 (motion, états, mobile)
- **Fit du nom corrigé** : `.hero__bas` (élément de grille) s'élargissait au contenu nowrap → h1 de 1 754 px à 1 440 et
  « La Brasser… / du Quai » coupé en mobile. `min-width: 0` sur `.hero__bas, .nom` ; tailles CSS calées sur le fit
  mesuré (desktop 10,8 vw ; mobile 18,3 vw et 27,7 vw ; footer 10,8 vw) pour éviter le CLS. h1 = 1440×140 et 390×161.
- **En-tête de l'accueil** : les parasols sombres occupent le haut de la photo → `[data-theme='photo']` en crème + voile
  Meuse en haut de `.hero__media` ; voile bas renforcé (0,68). Mobile : marque et libellés en `nowrap`, « Réserver »
  retiré de la nav < 768 px (la barre fixe le porte), marque 1 rem < 380 px.
- **Motion** : `data-reveal="fade"` sur les surtitres des sections ajoutées ; `up` en cascade sur les incontournables
  (carte), les notes publiques (maison) et le formulaire (réservation). Titres et accroches de hero intérieurs laissés sans
  reveal (leçon LCP).
- **États** : `.btn:active`, survol des plateaux et des notes (filet qui s'épaissit, comme un segment de la marée),
  chiffres tabulaires, `:user-invalid` en bouée sur le formulaire, message `role="status"` après envoi, date min = aujourd'hui.
- **Mobile** : pastilles du plan 36 px (disque 24 px) < 600 px, plus de chevauchement des cibles.
- **Footer** : colonne « Le site » (carte, écailler, terrasse, maison) : en mobile, écailler et terrasse n'étaient plus
  atteignables depuis la nav.
- **Contrôles (mini-script Playwright, 7 pages × 1440 / 390 / 390 reduced motion)** : 0 erreur console, 0 débordement
  horizontal, 0 texte caché après défilement ; clics réels des 6 liens d'en-tête OK sur les 7 pages ; bas de page 1440 :
  `.kyw-footer` visible et au premier plan. Build OK (`.logs/vp-bdq-build6.log`).

## Fait en construction-3 (QA)
- Lu `QA-build.md` : 0 FAIL, 17 WARN ; 0 erreur console, 0 violation axe sur le site (la « 404 » du shoot est la page de repli de `serve.mjs`).
- Corrigé : titre de l'accueil (78 → 64 caractères) ; horaires regroupés (`horairesGroupes()` dans `site.ts`, footer en
  jours au-dessus des créneaux : plus de colonne cassée à 1024-1280 px, plus de répétition x7) ; espaces insécables dans
  les guillemets (28) ; voiles haut et bas des heros photo intérieurs (`[data-theme='sombre']`) pour l'en-tête et le surtitre.
- Vérifié par captures ciblées (390 / 1024 / 1280 / 1440) : 0 erreur, 0 débordement. Build final OK (`.logs/vp-bdq-qa-build3.log`).
- `RAPPORT.md` écrit (shoot, audit, placeholders, points ouverts). Variante prête pour la revue.

## Reste
- Orchestrateur : `gabarits/UTILISATION.md` (`| maree | brasserie-du-quai |`) et `pnpm-lock.yaml`.
- Revue : padding de section du gabarit (112 px) après la houle des heros intérieurs, un peu vide en mobile (non modifié).

## Décisions et hypothèses
- Horaires affichés = saison en cours (novembre à avril) ; mai-octobre en texte. Jeudi à lundi = jours de l'écailler,
  supposés ouverts ; mardi, mercredi, dimanche « à confirmer » (le « dimanche toute la journée » de Gault&Millau non repris).
- Réservation : lien vers https://www.brasserieduquai.be/reservation/ (Zenchef non confirmé, jamais nommé).
- Avis : seulement des paraphrases dans le dossier → affichés comme « résumé, pas une citation mot à mot » ; critiques
  (prix, portion enfant) non affichées. Note Gault&Millau non confirmée → absente.
- Placeholders visibles : 3 desserts « exemple » (catégorie marquée « illustratif »), « Animaux admis » et « Plats à
  emporter » (à confirmer, source Gault&Millau), année d'ouverture (à confirmer). Aucune photo libre.
- Plan : schéma non à l'échelle (orientation de la Meuse supposée sud-ouest → nord-est à cet endroit), à retracer sur OSM.
- Photo `chef-ecailler` : légendée « au poste de l'écailler » sans nom (personne non identifiée).
