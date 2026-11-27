# Revue awwwards · NE5T Hôtel & Spa (restaurant Intuition) · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 5 F2, 4 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un menu dégustation raconté en « impressions » (Première, Deuxième, Dernière) : grand didone crème sur bleu nuit, rail vertical qui change de nom selon la section, ambre réservé aux appels à réserver.

Méthode : `QA-revue1.md` est INCOMPLET (shoot bloqué sur `carte/`, audit non lancé). Rien n'a été relancé en shoot complet. Mesures maison sur `dist/` (build du 27/11 08:42, plus récent que `src/`), serveur propre port 4871 : 5 pages (dont `404.html` réel) x 1440 et 390 px, axe-core complet, défilement par pas, console, requêtes, débordement, cibles, contraste canvas nœud par nœud, Tab, reduced-motion, menu, clics de nav, LCP/CLS sous CPU x4 + 4G (2 passes), hero à 1280x720 et 1366x768, hover par différence de pixels. Planches lues : home, carte, histoire, réservation/404 (1440 et 390), cibles. Captures dans `.shots-ne5t-aw-r1/`.

Scores /10 (révision par un relecteur, pas un jury indépendant)
- Design 7,5 : identité typographique nette et cohérente (didone + sans, trois couleurs) ; mais longues zones vides sous les h1 de page (715 px de hero pour un titre et une phrase) et ambre/crème sans surprise.
- Usabilité 8 : appel et menu à 1 clic, menu mobile propre (Echap ferme, `aria-expanded` juste), focus visible sur 14/14 arrêts, 0 débordement, cibles >= 24 px sauf le lien d'évitement.
- Créativité 7 : le rail « impression » et le 404 (« Pierre numéro 404 ») sont à l'histoire du lieu ; le reste est un gabarit éditorial sobre, 1 seule image plein cadre.
- Contenu 7 : fidèle à `donnees.json` (prix, plats, horaires, téléphone, adresse, réseaux) ; deux écarts de procédure et un nom déduit (voir F1/F2).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 lien mort, LCP 1,0 à 1,2 s sauf `/carte/` 2,68 s, CLS 0, reduced-motion sans texte masqué.

## Findings
### F1
- **F1-1 · T-faux/procédure inventée · `src/pages/reservation.astro:5`**. La description (meta, OG) annonce « Réserver une table … par téléphone au 081 58 88 88 ou par courriel ». Le dossier dit « réservation par téléphone uniquement » et le corps de la page le dit aussi. Preuve : `dist/ne5t/awwwards/reservation/index.html` `<meta name="description">`. Correction : « Réserver une table chez Intuition par téléphone au 081 58 88 88 … » sans « ou par courriel ».
- **F1-2 · Contraste · `src/pages/carte.astro:60` (`.btn--plein` sur fond crème)**. « Réserver au 081 58 88 88 » : 3,25:1 pour du texte de 14 px (mesure canvas, 1440 et 390 ; axe le range en « à vérifier »). Planche `carte-1440-05`. Correction : texte plus foncé ou fond ambre plus sombre (>= 4,5:1) pour la variante sur crème.

### F2
- **F2-1 · A11y · tous les gabarits (`src/components/Footer.astro:6` + `kyw-footer`)**. axe sur les 5 pages x 2 largeurs : `landmark-no-duplicate-contentinfo` et `landmark-contentinfo-is-top-level` (moderate), deux `<footer>`. Correction : le pied du site en `<div>`/`<section aria-label>` (garder le bandeau KYW intact) ; revérifier `region`.
- **F2-2 · Perf · `/carte/` mobile** : LCP 2680 et 2676 ms (2 passes, CPU x4 + 4G lente), élément `bouchees…webp` ; > 2,5 s (le rapport annonçait 2484 ms). Correction : image plus légère ou non lazy/préchargée, ou premier bloc sans image au-dessus de la ligne de flottaison.
- **F2-3 · T-invente · `src/data/site.ts:81`**. « Christine Gersdorff » : le nom de famille est déduit (dossier : « Christine, épouse du propriétaire »). Vu sur `histoire` (« Les voix de la maison »). Correction : « Christine » seule, ou « Christine, épouse du propriétaire ».
- **F2-4 · Contenu · `src/data/site.ts:96`**. « Sept jours moins deux : le lundi et le mardi, la maison se repose. » : formule de remplissage et fermeture lundi/mardi donnée comme certaine (dossier : « à confirmer »). Marquée `placeholder: true` mais rien de visible à l'écran (home, planche `home-1440-07`). Correction : « Fermé le lundi et le mardi (à confirmer) » ou retrait de la phrase.
- **F2-5 · Hero · 1280x720 et 1366x768** : le hero fait 861 px pour 720 : le second bouton « Voir le menu du mois » est sous la ligne de flottaison, la photo dépasse (`hero-1280.png`). À 1440x900 : 953 px pour 900. Correction : hauteur du hero bornée à la fenêtre (`max-height: 100svh`) ou photo réduite sur écrans bas.

### F3
- **F3-1** `histoire` : la phrase d'accroche « Une ancienne ferme en carré, au-dessus de la Meuse. » est répétée mot pour mot au début du premier paragraphe (planches `histoire-390-00`, `histoire-1440-00/01`).
- **F3-2** `reservation` : le numéro géant apparaît deux fois (bloc de page puis « Dernière impression : la vôtre. » du pied) et un CTA « Réserver » reste dans la nav sur la page Réserver.
- **F3-3** `index.astro:31` : « on commence par une phrase, on découvre le détail à table » : non étayé par le dossier (la carte détaillée est publiée sur la page suivante).
- **F3-4** JSON-LD `Restaurant` : adresse et téléphone présents, aucun `openingHoursSpecification` (jours connus, heures inconnues : défendable, à noter). Alt du plat « un cuisinier en veste blanche nappe l'assiette de sauce » : « de sauce » dépasse le `sujet` de `photos/index.json` (« Service d'un plat à table, chef en veste blanche »).

## Vérifié sans défaut
Build OK (QA-revue1) ; 0 erreur console ; 0 requête en échec ; liens internes 200 (4 pages + `404.html`) ; liens externes = `donnees.json` (Facebook, Instagram, TripAdvisor, RoomRaccoon, tel `+3281588888`, mailto) ; `lang=fr`, un `h1`, `noindex, nofollow` (conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et logo KYW sur chaque page ; prix 60/75/50 €, vins 40/50 €, forfait lunch 15 €, fromage 14 € (+9 €), repas en suite 24 h / +15 %, 45 couverts : 0 écart ; reduced-motion : 0 texte masqué ; hover : change sur CTA plein, CTA contour, nav ; « NE5T » bien rendu (le « NEST » vu sur planche est un effet de réduction, zoom 2x vérifié) ; 404 designée.

## Ce qui est bien (à ne pas casser)
1. Le rail vertical « Première / Deuxième / Dernière impression » et le vocabulaire du menu en « impressions » : idée propre à ce restaurant, repris dans le 404.
2. Contenu honnête sur les trous : « Parking et accès : à confirmer », « Heures exactes : à confirmer par téléphone », aucun avis ni distinction inventés.
3. Performance et mouvement : LCP ~1,1 s hors carte, CLS 0, menu mobile et focus soignés.

## Hypothèses
Adresse retenue : Avenue Vauban 46 (donnees.json ; la contradiction avec `restaurants.json` reste à trancher par le client). « Soir » des jeudi à samedi déduit de « du mercredi soir au dimanche midi » : jugé cohérent.
