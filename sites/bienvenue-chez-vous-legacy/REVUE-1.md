# Revue legacy · Bienvenue chez vous · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 5 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une carte de visite classique et chaleureuse (crème, brun café, rouge enseigne, serif éditorial) où la photo du dessert smiley fait la signature, et où le chef-patron seul parle à la première personne ; sept pages, réservation par téléphone.

Méthode et limites : `QA-revue1.md` annoncé par la tâche n'existe pas et `.shots-…-legacy-revue1` ne contient que 49 captures sans `report.json` (shoot interrompu, comme pour le portfolio du même restaurant). Mesures refaites par un script maison unique (7 pages x 1440 et 390 px : axe-core, console, requêtes, débordement, textes, méta ; puis défilement réel, CLS/LCP, reduced-motion, Tab) et lecture de 5 planches (`.shots-bienvenue-chez-vous-legacy-revue1/mes/P-*.png`, `cible-*.png`). Build non relancé (dist du 27/11 08:31 postérieur à `src/`). Les vignettes `loading=lazy` sont vides sur une capture pleine page sans défilement : artefact de capture, vérifié par défilement (0 image cassée). Serveur propre sur le port 4611, arrêté en fin de tâche.

Scores /10
- Design 7 : palette et typographie cohérentes, hero plein cadre lisible avec plaque crème (`P-home-d.png`, `P-home-m.png`) ; blocs répétitifs (même bandeau de réservation partout) et zone vide en tête de boutique.
- Usabilité 8 : 0 débordement à 1440 et 390 px, focus visible (outline 2 px sur les 14 premiers arrêts Tab), lien d'évitement en premier, CTA téléphone en haut et en bas de chaque page, onglets midi/soir.
- Créativité 6 : idée de voix du chef et de « escales » bien tenue, mais mise en page sobre et attendue (trois colonnes égales, lignes de tarifs).
- Contenu 6 : faits conformes pour adresse, téléphone, horaires, prix, plats ; deux inventions/écarts (F1) et du jargon de production visible (F2).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe sérieuse/critique, CLS 0,000, LCP 432 ms desktop et 544 ms mobile, 7 pages en 200, 11 assets en 200.

## Findings

### F1
- **F1-1 · T-faux · lien presse DH tronqué.** `src/pages/presentation.astro:9` : l'URL se termine par `…-5ec2879a9` ; `donnees.json` (l. 66) donne `…-5ec2879a9978e24cfcbf444d`. Preuve : `grep dhnet` des deux fichiers. Le lien externe mène à une page introuvable. Correction : copier l'URL complète de `donnees.json`.
- **F1-2 · T-invente · « bloody dock » dans la légende et l'alt du hero.** `src/pages/index.astro:26` (« Dessert smiley, fraises et feuilles de bloody dock ») et `src/data/site.ts:47` (alt « posé sur des fraises coupées et des feuilles de bloody dock »). Preuve : `grep -ri bloody data/restaurants/bienvenue-chez-vous` = 0 résultat ; `photos/index.json` n° 18 : sujet « Dessert smiley rose aux fraises ». Le champ `sujet` fait foi (leçons communes). Correction : légende et alt = « Dessert smiley rose aux fraises ».

### F2
- **F2-1 · Jargon de production visible aux clients.** `src/pages/boutique.astro:22-24` (« Photo de la boutique à fournir. », « Emplacement réservé : aucune photo de la boutique dans le dossier. ») ; « Les plats changent, les prix sont ceux du site d'origine. » (traiteur) ; « Tarifs lus sur la page du site d'origine, à confirmer. » (resto) ; « Annoncé parmi les atouts du lieu sur le site d'origine. » (boutique, Parking aisé) ; « Repris du site d'origine » (resto). Preuve : textes extraits, `bcv-legacy-r1-txt-*`. Correction : reformuler côté client (« Prix à confirmer », « Le menu suit la saison ») ; la mention « illustratif » du pied suffit pour la maquette.
- **F2-2 · Zone vide en tête de boutique.** `boutique.astro:20-24` : cadre dégradé sans photo occupant la moitié du premier écran (`P-autres-d.png`, 1re colonne). Correction : une photo du dossier (ex. `boites` ou `salade`, sujet exact en alt) ou retirer le cadre ; ne pas laisser un vide.
- **F2-3 · Bloc de réservation recopié hors contexte.** `components/Reservation.astro:9` répète « Le restaurant ne travaille que sur réservation. Le plus simple est d'appeler. » sous « Passer à la boutique. » (boutique) et « Commander, ou simplement demander. » (traiteur), où c'est faux ou hors sujet. Correction : prop `texte` pour boutique (venir/appeler) et traiteur (« Commande minimum 24 h à l'avance »).
- **F2-4 · E-mail « à confirmer » sans réserve sur 6 pages.** Dossier : `info@restaurantbienvenuechezvous.be`, « à confirmer : domaine différent du site ». Seule `contact.astro` le signale ; `Reservation.astro:14-15` n'ajoute la réserve que pour le numéro. Correction : étendre la note (« Numéro et e-mail relevés chez des tiers, à confirmer »).
- **F2-5 · Accessibilité modérée (axe).** `heading-order` sur accueil et resto : `components/Carte.astro:16`, `<h4>` directement sous un `<h2>` (corriger en `h3`) ; `landmark-no-duplicate-contentinfo` sur 14/14 mesures : `<footer class="foot">` (`Footer.astro:6`) plus le pied du paquet `kyw-footer`. Correction : retirer le rôle contentinfo implicite de l'un des deux (`<div class="foot">`, le paquet partagé n'est pas touché).

### F3
- **F3-1 · SEO.** Pas d'`og:image` ni de `canonical` (mesure `mes.json`) ; JSON-LD `Restaurant` sans horaires (adresse et téléphone présents) ; aucun `preload` de police ni de photo de hero.
- **F3-2 · Poids.** `photos/foie-gras.webp`, `dessert-smiley.webp`, `facade.webp` dépassent 300 Ko (`find -size +300k`). Polices ttf/otf non converties en woff2 (signalé par `QA-build.md`, non remesuré).
- **F3-3 · Répétitions et gabarits.** « Quatre tables » et « aux lueurs des bougies » reviennent 4 à 5 fois (hero, faits, présentation, contact, bandeau de réservation « Une table, quelques bougies. ») ; « Trois façons d'être chez vous » et « Aussi chez nous » = trois blocs égaux. Varier ou supprimer un des deux.
- **F3-4 · 404 : contraste du pied KYW** (#6b787d sur #fbfaf8, 4,36:1, déjà connu de `ETAT.md`, paquet partagé : à ne pas corriger ici). Le reste de la 404 est conforme (h1, lang, noindex).

## Ce qui est bien (à ne pas casser)
1. Le hero plein cadre avec la plaque crème et le dessert smiley, lisible aussi à 390 px sans écrasement desktop (`P-home-m.png`) ; le menu burger et le CTA « Réserver » sont conservés.
2. Fidélité aux faits : adresse, téléphone, horaires, formules 49/69/79/94 €, accords, tarifs traiteur et Box 199/174 € concordent avec `donnees.json` et `site-actuel/textes` ; réserves « à confirmer » placées là où le dossier doute ; les alts suivent le champ `sujet`, sauf F1-2.
3. Rigueur technique : 0 console, 0 requête en échec, CLS 0, reduced-motion sans élément masqué (0 opacité nulle), `noindex`, mention « Maquette KYW, certaines données sont illustratives » et logo KYW présents sur les 7 pages, `lang="fr"`, un seul `h1` par page.
