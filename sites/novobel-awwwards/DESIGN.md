# DESIGN.md · Novobel · variante awwwards « La cote »

## Brief
- **Sujet** : Novobel, SRL de construction et de rénovation, Rue Emile Cuvelier 14 boîte 1, 5000 Namur ; tél. +32 488 46 64 13 ; info@novobel.com ; Facebook. Devise du site actuel : « La qualité avant tout ».
- **Constat majeur (dossier.md)** : Novobel n'est PAS un restaurant. Décision de l'agent (aucune question possible) : produire la maquette d'une entreprise de rénovation en transposant le gabarit : carte devient Projets, réservation devient Contact, plats deviennent lots de chantier. Pages : `/`, `/projets/`, `/a-propos/`, `/contact/`, 404.
- **Publics** : particuliers et investisseurs namurois qui rénovent, transforment un immeuble ou veulent un interlocuteur unique ; candidats aux six offres d'emploi.
- **Métier du site** : appeler, écrire, comprendre la méthode (de l'étude à la remise des clés), voir les projets.
- **Ressources** : 4 projets réels (Astrid 4 appartements, Bellevue 14, Joseph 6, Citadelle 4), 4 services, 3 valeurs, 6 offres, 9 photos du site actuel (probable stock, présentées comme illustrations). Rien d'autre : pas d'horaires, d'avis, de chiffres. Le « 25 ans » du site actuel contredit la BCE (2019) : non repris.
- **Contraintes** : statique, `base` /novobel/awwwards/, noindex, pied KYW.

## Concepts (trois territoires)
| | A. La cote | B. Bureau devenu logement | C. Pierre bleue et Meuse |
|---|---|---|---|
| Territoire | matière du métier : mesurer | métaphore du travail : transformation | lieu : Namur, citadelle, maisons de maître |
| Phrase | Tout est coté : le site se lit comme un plan, de la première mesure à la remise des clés. | Chaque projet change l'usage d'un bâtiment. | Des maisons de la ville haute rénovées. |
| Règle de mise en page | lignes de cote, grands chiffres | avant / après | pierre, strates |
| Ancre | 4, 14, 6, 4 appartements | les 4 projets | « Citadelle » |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 5 / 2 | 4 / 4 / 2 (aucune photo avant/après) / 2 | 3 / 3 / 4 / 4 |
- **Test de l'échange** : « tout est coté » ne tient avec aucun restaurant ; C tient avec n'importe quel commerce namurois (écarté). B fournit un détail : chaque projet est présenté comme une transformation (texte des fiches).
- **Choix : A**, car les chiffres réels du client (appartements par projet) sont déjà des cotes.

### Concept Card
- **Idée** : le site est un plan coté ; chaque section porte sa cote et les chiffres du client sont les héros.
- **Métaphore** : le plan de chantier et le mètre ruban ; la remise des clés est la cote finale.
- **Signature (et recette)** : la ligne de cote (trait fin, repère à chaque bout, valeur au centre) qui se dessine à l'entrée de chaque section (motion.md, tracé de ligne scaleX piloté par ScrollTrigger) ; en phase 1, version statique en CSS (`.cote`).
- **Émotion (3 premières secondes)** : sérieux, net, jaune de balisage : une entreprise qui mesure avant d'agir.
- **Verbe** : mesurer.
- **Capture** : le bloc des quatre cotes (4, 14, 6, 4) en chiffres géants, partageable seul.
- **Ancre** : les quatre projets Astrid, Bellevue, Joseph, Citadelle et leurs nombres d'appartements.
- **Théâtre** : loader non (une entreprise de bâtiment n'a pas à faire attendre ; la ligne de cote suffit) ; GL non (pas de matière visuelle propre ; photos de chantier et typographie portent le propos). Rideau de page : coffrage anthracite qui glisse à l'horizontale.

## Système
- **Palette** : ground `#e4e2dc` (béton clair), ink `#17191b` (anthracite du site actuel), muted `#4f5457`, line `#b9b6ae`, accent `#f2b705` (jaune de balisage, repris de l'identité du client ; texte ink dessus), accent-texte `#6f5000`, curtain `#24282b`, nuit `#1d2023`. Références : peinture de balisage de chantier, béton brut, coffrage.
- **Défauts évités** : pas de crème + serif + terracotta ; le jaune du client est employé en aplats sur béton clair, pas en acide sur noir (le noir n'occupe que le plein cadre, la carrière et le pied) ; pas d'eyebrow décoratif : la cote est la signature et porte un sens ; pas d'Inter, Fraunces, Playfair ; pas de 01/02/03.
- **Typo** : Barlow Condensed 800 (display, capitales, signalétique de chantier) et Public Sans variable (corps). Échelle : `--t-mega` 4,75 à 16 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 17 px, `--t-s` 14 px, `--t-xs` 13 px. Display : interligne 0,82 à 0,95, interlettrage -0,005 à -0,015 em, `text-wrap: balance`. Français : espaces insécables dans les données (+32 488…, boîte 1), apostrophes courbes, vouvoiement.
- **Grille** : 12 colonnes (2 sur téléphone), lignes fortes : gouttière gauche et colonne 7 ; humeurs d'espace serre / normal / aéré / entracte ; rayon 0.
- **Mouvement (à planifier)** : easing `ease.out` / `ease.inOut` de l'engine ; verbe mesurer : traits qui se tracent (0,8 s), chiffres qui comptent jusqu'à leur valeur, aucune rotation. Hovers : CTA jaune qui devient anthracite, nav soulignée jaune, lots en aplat jaune, liens texte soulignés jaune. Repos : immobilité décidée (le chantier a fini de bouger), sauf la cote qui se trace une fois.
- **Plan de composition** : Accueil : poster (mot géant + photo) / index (5 lots) / données (4 cotes) / média plein cadre (statement) / paire asymétrique / pied final « Les clés. ». Projets : en-tête / fiches en paires décalées (patron de la carte) / index des services. À propos : paire texte-photo / données (3 principes) / bloc sombre carrière / média + mot. Contact : actions et données / paire formulaire mailto + photo.
- **Mobile 390** : mot géant à 24 vw, strips en colonne, cotes à 2 colonnes, paires empilées, pied recomposé.
- **Test de généricité** : un modèle générique d'entreprise de rénovation aurait un hero photo plein écran avec un slogan : changé en mot géant + chiffres réels. Un grand compteur « 25 ans d'expérience » : écarté (contredit la BCE).

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique). [x]
3. Concept Card au format exact, verbe « mesurer ». [x]
4. Concept au pied (`Footer.astro`: cote « Remise des clés », mot « Les clés. »), à la carte (Projets en cotes), au contact (infos en strip coté), à la 404 (« Cote introuvable », « Hors plan. »). [x]
5. Moment signature : ligne de cote, recette motion.md décrite ; CSS statique en `site.css` (`.cote`). Animation en phase 2. [x statique]
6. Palette 4 à 6 rôles, références réelles : `tokens.css:23-31`. [x]
7. Défauts évités : paragraphe « Défauts évités ». [x]
8. Test de généricité : paragraphe ci-dessus. [x]
9. Détails 7 vers 8 : favicon (carré jaune + N), OG composée (`public/og.png`), pied en composition finale, 404 dans le concept, focus dans l'accent (`engine.css:33` via `--c-accent`) ; sélection en ink. [x]
10. Polices : Barlow Condensed 600/800 et Public Sans variable, 3 fichiers, 2 préchargés (`Base.astro`). [x] (la 600 n'est pas utilisée : à retirer en phase 2 si confirmé)
11. Échelle fluide unique `tokens.css:39-46`. [x]
12. Display réglé : `site.css` `.display`. [x]
13. Corps 16 à 17 px, UI 13 à 14 px. [x]
14. Typographie française : insécables dans `site.ts`, apostrophes courbes. [x]
15. Grille 12 colonnes, lignes fortes ; cadre quatre coins non retenu : les cotes jouent ce rôle (justifié). [x]
16. Une famille de section au plus une fois par page. [x]
17. Hero en 3 s : nom, métier, téléphone. [x] (mesuré : CTA dans la flottaison à 1440×900 après correction du padding)
18. Mobile 390 recomposé : `site.css` media 900/520, mesuré sans scroll horizontal (scrollWidth = 390). [x]
