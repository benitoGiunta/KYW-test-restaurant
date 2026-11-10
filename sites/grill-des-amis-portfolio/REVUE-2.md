# Revue portfolio · Le Grill des amiS · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : un grill de nuit dont le fond chauffe puis refroidit au fil du défilement (thermomètre 900 °C à 20 °C), avec une entrecôte qui se dresse couche par couche ; ton sobre, vouvoiement, carte complète.

Hypothèses : `dist/` (02:44) postérieur à `src/` et `public/` (aucun fichier plus récent), captures `QA-revue2` (02:54) postérieures au dist : réutilisées. QA limité à 3 pages et 404 brute : les 6 pages (dont `404.html`) mesurées par script maison sur serveur propre (port 4771, PID 29517, arrêté, vérifié 000).

Scores /10
- Design 8 : la scène signature tient maintenant (entrecôte, puis garniture, puis sauce sur une assiette lisible, `gda-p2-scene-1440-5/50/95`), hero mobile propre (`m-01-hero`) ; reste un détourage encore visible (F2-2).
- Usabilité 8 : navigation sans burger, barre Réserver/Appeler, 0 cible < 24 px à 390 px (mesure sur 6 pages), pastille ouvert/fermé juste, formulaire annoncé comme démonstration.
- Créativité 7 : le thermomètre piloté par le défilement reste l'idée forte ; la scène par photos détourées plafonne la finition.
- Contenu 8 : faits conformes au dossier (adresse, téléphone, horaires, Menu Viandard 69 € / 5 viandes / 3 services, lunch 15,50 €, steak du midi 17 €, carte du 14 octobre 2026) ; avis, e-mail et formule « Privatiser la salle » marqués illustratifs ; procédures inventées retirées.
- Technique 9 : 0 violation axe sur 6 pages x 2 largeurs x 4 positions de défilement, 0 erreur console, 0 requête en échec, 19 liens internes et externes (0 hors 200), 0 débordement (`scrollWidth` = fenêtre, `scrollX` 0 après `scrollTo(300,0)`), LCP mobile throttlé 1 216 ms et CLS 0,009 (QA), reduced-motion sans texte caché, un `h1`, `lang="fr"`, JSON-LD, OG, un seul logo KYW, mention et `noindex, nofollow` sur les 6 pages.

Critères PUBLIABLE : tous tenus (build OK d'après QA-revue2 exit 0, 0 console, 0 lien mort, 0 fait faux, 0 invention non marquée, 0 débordement, 0 axe, mention + logo + noindex). Pas de F0, pas de F1.

## Vérification des 15 corrections de REVISION-1
| id | résultat | preuve |
|---|---|---|
| F1-1 | confirmé (reste F2-2) | plus de dalle vide : l'entrecôte ouvre la séquence, 3 étapes, plus de « 520 °C » ; planche 390 et 1440 px à 5, 50, 95 % |
| F1-2 | confirmé | axe `color-contrast` 0 à 4 positions, 6 pages x 2 largeurs ; `.plat__num` absent |
| F2-1 | confirmé | `aria-prohibited-attr` 0 |
| F2-2 | confirmé | « Réservation en ligne ou au +32 81 61 72 60. » ; « les grillades sont livrées chez vous » |
| F2-3 | confirmé | plus de « rôle à préciser » ; légende « Le restaurant, Namur » (la carte d'Elise garde un sous-titre « La maison d'Elise et Gaëtan » redondant, F3-3) |
| F2-4 | confirmé | alt « Deux personnes en tablier devant le mur d’ardoise de la salle » (accueil et La maison) |
| F2-5 | confirmé | un seul `footer`/`contentinfo` par page ; axe `landmark-no-duplicate-contentinfo` et `region` 0 |
| F2-6 | partiel | eyebrow sur une seule ligne, mais toujours sur la viande : voir F2-1 ci-dessous |
| F2-7 | confirmé | hero et intro Dressage réécrits ; la phrase « achetées brutes, découpées et maturées sur place » n'est plus que dans le manifeste et le chapeau de La maison (reste F3-2) |
| F2-8 | confirmé | eyebrows Dressage et Table retirés, numéros de plats supprimés |
| F3-1 | partiel | voir F3-1 ci-dessous |
| F3-2 | confirmé | aucune cible < 24 px à 390 px sur 6 pages |
| F3-3 | confirmé | « Voir la cuisson » |
| F3-4 | confirmé | pied d'accueil « Ouvert jeudi à samedi et lundi » |

## Findings

### F2 mineurs
- **F2-1 · Eyebrow du hero mobile peu lisible.** `home/m-01-hero.png` : « Viandes maturées, feu de bois, Namur » (corail #EF6846) est posé sur la viande, rapport mesuré sur la capture 2,3 : 1 à gauche et 1,8 : 1 à droite (axe ne le voit pas, fond image). Le correctif F2-6 n'a raccourci que le texte. Correction : lui donner un fond sombre (pastille ou dégradé local sous l'eyebrow) ou le descendre sous la viande, au-dessus du titre sur la zone sombre, pour ≥ 4,5 : 1.
- **F2-2 · Détourage encore visible dans la scène de cuisson.** `gda-p2-scene-1440-50.png` : à l'étape 2, deux ovales d'assiette crème se chevauchent avec un bord irrégulier, sans ombre portée ; le couteau et, à l'étape 3, la louche et la casserole sortent de l'assiette. Lisible et cohérent, mais c'est la signature du site. Correction : ombre portée douce sous la couche (`filter: drop-shadow`) et feather de 1 à 2 px sur le bord de `piece.webp` et `garniture` ; sinon limite connue à noter dans RAPPORT.md.

### F3 finitions
- **F3-1 · Apostrophes droites restantes** : `404.astro:10` (« changé d'adresse ») et `carte.astro:58` (h2 « s'attabler »). Remplacer par U+2019 (le reste du site l'utilise).
- **F3-2 · Répétitions entre pages** : le paragraphe « Gaëtan, le chef, choisit les viandes, les découpe et écrit la carte. Ici, on achète de grosses pièces brutes… » est identique sur l'accueil (« Les mains ») et sur La maison ; « sauces préparées sur place, frites maison » revient dans le hero, le manifeste et La maison. Varier l'un des deux ou raccourcir celui de l'accueil.
- **F3-3 · Gabarit encore reconnaissable** : l'accueil garde un eyebrow + filet sur Manifeste, Cuisson, Les mains et Nuit, et les chiffres 01 à 03 des étapes de cuisson (utiles ici car ils suivent le thermomètre, à garder sans eyebrow « Cuisson »). Sous-titre « La maison d'Elise et Gaëtan » sous le prénom d'Elise, redondant avec le titre de page.
- **F3-4 · Mobile** : la scène de cuisson fait ~100 px de large à 390 px (`gda-p2-scene-planche.png`, 3 premiers panneaux), avec une zone vide sous la liste ; la scène peut grandir (58 vw plafonnés à 32 svh) tant que la liste reste visible.

Faux positifs écartés (leçons) : `skipLinkFirst`, « 404 sans h1/title/lang », WARN robots/sitemap (présents dans dist), « sentence repeated » du bandeau d'avis cloné, horaires « 12 h à 14 h… » répétés (table volontaire par page), 2 violations axe de la 404 brute du QA (`404.html` mesurée : 0).

## Ce qui est bien (à ne pas casser)
1. Hero et thermomètre : photo de braise, titre Melodrama, fond qui chauffe et refroidit, pastille ouvert/fermé à l'heure de Bruxelles.
2. Carte : 68 postes fidèles à `donnees.json`, filtre `aria-live`, lisible à 390 px.
3. Honnêteté des données : avis, e-mail et formule de privatisation marqués illustratifs, horaires inconnus « à confirmer », procédures inventées retirées.

## Mesures (pour mémoire)
Axe : 0 violation sur 12 cas x 4 positions. Console 0, requêtes en échec 0, liens 19/19. Débordement 0 à 1440 et 390. Mention, noindex, logo (un seul) : 6 pages sur 6.
