# Revue legacy · Bienvenue chez vous · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 0 F2, 5 F3)

Lecture en une ligne de l'idée du site : carte de visite classique et chaleureuse (crème, brun café, rouge enseigne, serif éditorial), la voix du chef-patron et le dessert smiley en signature ; sept pages, réservation par téléphone.

Méthode et limites : `QA-revue2.md` annoncé n'existe pas ; `.shots-bienvenue-chez-vous-legacy-revue2` ne contient que `summary.json` (pages « home » et « bienvenue-chez-vous-item », 404) et quelques captures de l'accueil : inexploitable pour les 7 pages. Mesures refaites par mon script maison sur `dist/` (déjà reconstruit à 08:47, postérieur aux sources de 08:43, donc build non relancé) : 7 pages x 1440 et 390 px (axe-core, console, requêtes, débordement, méta, textes), grep ciblés de `dist/` et du dossier, planche boutique 1440/390 (`bcv-legacy-r2-planche-boutique.png`). Serveur propre port 4612, PID 734, arrêté. Les images `loading=lazy` (façade, crustacé, logo KYW) apparaissent « non chargées » car sans défilement : même artefact qu'en passe 1, non remesuré par défilement cette fois.
Attention : les corrections de REVISION-1 (src/ et dist/) ne sont pas encore commitées (`git status` : 9 fichiers src modifiés, dist modifié, REVISION-1.md non suivi).

Scores /10
- Design 7 : inchangé ; la boutique a maintenant une vraie photo en tête (plus de cadre vide), hiérarchie propre à 1440 et 390 px (`planche-boutique`).
- Usabilité 8 : 0 débordement sur 14 mesures, 0 cible < 24 px, CTA téléphone en pied de chaque page.
- Créativité 6 : inchangé (trois colonnes et lignes de tarifs attendues), idée de voix du chef toujours tenue.
- Contenu 8 : 0 fait faux ni invention restants, jargon de production retiré (grep dist : « à fournir », « Emplacement réservé », « Repris du », « Tarifs lus », « bloody » = 0).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe sur 14 mesures (404 comprise), 1 h1 par page, un seul `<footer>`.

## Vérification des corrections de REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 | corrigé | URL DH dans dist = `…demenage-5ec2879a9978e24cfcbf444d`, identique à `donnees.json` |
| F1-2 | corrigé | `grep -ri bloody dist dossier` = 0 ; légende accueil « Dessert smiley rose aux fraises » |
| F2-1 | corrigé | textes visibles « Parking aisé, à confirmer. », « un repas de saison, renouvelé chaque semaine » : appuyés par le dossier (hebdomadaire, saison) ; 0 jargon |
| F2-2 | corrigé | `boutique-d.png` : photo `boites` pleine en tête, alt « Barquettes à emporter, lapins jaunes et lard » = champ `sujet` |
| F2-3 | corrigé | boutique « Le plus simple est de passer, ou d'appeler avant de venir. » ; traiteur « Commande minimum 24 h à l'avance : appelez-nous pour composer votre box. » (conforme `site-actuel`) ; la phrase « sur réservation » reste seulement sur resto |
| F2-4 | corrigé | « Numéro et e-mail relevés chez des tiers, à confirmer. » sous le bloc de réservation (index, boutique, traiteur) |
| F2-5 | corrigé | `<h4>` : 0 sur toutes les pages ; 1 seul `<footer>`, 0 `role=contentinfo` ; axe : 0 violation sur 14/14 mesures |
Sans régression constatée : mention « Maquette KYW, certaines données sont illustratives », logo KYW et `noindex` présents sur 7/7 pages.

## Findings
### F3 (finition, non bloquants)
- **F3-1 · SEO, inchangé.** index.html : pas d'`og:image` ni de `canonical`, JSON-LD `Restaurant` sans `openingHours`, aucun `rel=preload` (grep dist). Correction : ajouter og:image (photo hero), canonical, horaires du dossier dans le JSON-LD, preload de la photo de hero.
- **F3-2 · Poids, inchangé.** `photos/foie-gras.webp` 369 Ko, `facade.webp` 327 Ko, `dessert-smiley.webp` 326 Ko (> 300 Ko). Correction : recompresser à moins de 300 Ko.
- **F3-3 · Répétitions, inchangé.** « Quatre tables » et « aux lueurs des bougies » reviennent sur plusieurs pages ; « Trois façons d'être chez vous » et « Aussi chez nous » = trois blocs égaux. Varier un des deux.
- **F3-4 · Tautologie nouvelle.** `boutique.astro` : titre « Parking aisé » suivi de « Parking aisé, à confirmer. » (`boutique-d.png`, dernière ligne). Correction : « À confirmer auprès du restaurant. » ou « Stationnement à proximité, à confirmer ».
- **F3-5 · Nom de la box à confirmer.** `donnees.json` l. 60-61 appelle « Box Tapas » la box à 199 € (174 € sans boissons) et « Box Bienvenue chez vous » celle à 109 €, alors que le site (`traiteur.astro:46`) donne le titre « La Box Bienvenue chez vous » aux prix 199/174. Le texte du site d'origine (`textes/box-tapas.txt`) porte bien ce titre, donc non faux, mais la donnée structurée est ambiguë ; ajouter « à confirmer » sur le nom ou signaler le prix 109 € en suspens.

## Ce qui est bien (à ne pas casser)
1. Hero plein cadre avec plaque crème, dessert smiley, lisible à 390 px sans écrasement desktop.
2. Fidélité aux faits : prix, horaires, adresse, téléphone et réserves « à confirmer » toujours alignés sur le dossier ; les alts suivent le champ `sujet`.
3. Rigueur technique : 0 console, 0 requête en échec, 0 axe, 0 débordement, un seul pied de page, mention et logo KYW sur 7 pages.
