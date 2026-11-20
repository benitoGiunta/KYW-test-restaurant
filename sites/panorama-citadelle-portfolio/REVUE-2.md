# Revue portfolio · Le Panorama (panorama-citadelle) · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : une journée à la Citadelle de Namur, où le ciel, la couleur et la carte changent d'heure en heure (aube, midi, corail de l'apéro, nuit), avec une frise des moments et un disque photo sur la Meuse.

Scores /10
- Design 8 : signature intacte et cohérente (ciel orange du soir, disque Meuse, titre « Le Panorama » en grand), `1440_home.png`, `home/planche.png`.
- Usabilité 7 : navigation et état « ouvert » clairs, mais badge « ouvert » en double à 1440 px et repère de la rampe qui masque l'étiquette (F3-1, F3-2).
- Créativité 8 : le fil de la journée structure carte, loader et frise, inchangé depuis la passe 1.
- Contenu 8 : horaires de service 12h, 17h, 19h marqués « illustratif », tartare et chateaubriand à 94 € présents, équipe sans invention (4 noms tous au dossier), plus aucun « du Le Panorama » (passe 1 : 6).
- Technique 8 : 12 cas (6 pages x 1440 et 390 px, axe-core complet à 2 positions de défilement) : 0 violation axe, 0 erreur console, 0 requête en échec, `scrollWidth` = fenêtre, 1 `h1`, `lang="fr"`, noindex, mention, 1 logo KYW, 1 `<footer>`, 1 JSON-LD partout.

Fraîcheur : dist (17:01) postérieur à src (aucun fichier plus récent), captures du QA (17:05) postérieures au dist : réutilisées. Mesures propres : serveur 127.0.0.1:4893/4894 (arrêtés), `.shots-pc-portfolio-revue2b/`.

## Vérification des corrections de REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 moments 12h/17h/19h | CONFIRMÉ | texte du dist : « 12h Le déjeuner illustratif », « 17h L'apéro illustratif », « 19h Le dîner illustratif » ; « dès 17h » 0 ; hero « le moment présent, l'apéro (illustratif) » (`1440_home.png`, `390_home.png`). 3 tags visibles sur l'accueil (REVISION en annonce 6 sur toutes les pages : 4 + 3 + 0 relevés sur accueil et carte, cohérent). |
| F1-2 `aria-prohibited-attr` | CONFIRMÉ | axe complet : 0 violation sur 12 cas ; `aria-label="Nh"` 0 dans le dist |
| F2-1 tartare / chateaubriand | CONFIRMÉ | `carte/` : « Tartare de bœuf Angus » 1, « 94 € » 1 ; planche carte : chateaubriand 94 € lisible |
| F2-2 « du Le Panorama » | CONFIRMÉ | regex `(du\|de\|chez\|à) Le Panorama` : 0 sur les 6 pages |
| F2-3 « ou appelez-nous » | CONFIRMÉ | 0 occurrence |
| F2-4 contentinfo doublon | CONFIRMÉ | 1 `<footer>` par page, axe sans `landmark-no-duplicate-contentinfo`, pas de `region` |
| F2-5 équipe à initiales | CONFIRMÉ | `390_equipe.png` : liste à filets (nom, rôle) ; 4 noms (Mattagne, Delpire-Crets, Massart, Bluntzer) présents au dossier ; `membre__initiales` 0 |
| F3-7 « coucher du soleil » / desserts | CONFIRMÉ | « coucher du soleil » 0 ; « Desserts et vins : à confirmer. » présent |
Faux positifs QA écartés : 404 « color-contrast 4,36:1 » et « cible 128 x 20 » (réponse brute de `serve.mjs` ; `404.html` réel : 0 violation, `1440_404html.png`) ; planches du QA à 19 images chacune (mauvaises options `planche.py`), sans effet sur le site ; CLS 0,05 accueil (limite) sans mesure CDP, non retenu.

## Findings
Aucun F0, F1 ni F2.

### F3 (finition, non bloquants)
- **F3-1** (reste de la passe 1) Badge « ouvert jusqu'à 23:00 » en double à 1440 px : en-tête et hero (`1440_home.png`, y = 36 et y = 183) ; en garder un.
- **F3-2** (reste) Rampe d'heures : le repère actif recouvre l'étiquette (« 17h » masquée sur `390_equipe.png`, « 23h » sur `d-06-scroll.png`) ; décaler le repère ou masquer l'étiquette active.
- **F3-3** (reste) Hero 1440 x 900 : la ligne « Il est 17h11 : aller au moment présent » a son bas à y = 915 pour une fenêtre de 900 px, texte coupé (`1440_home.png`) ; remonter la rangée de pastilles de 40 px.
- **F3-4** (reste) Aucun `Europe/Brussels` dans `src/` : heure et état « ouvert » sur l'horloge du visiteur ; fixer le fuseau (`Intl.DateTimeFormat` avec `timeZone`).
- **F3-5** (reste) 7 photos webp de plus de 300 Ko dans `dist/…/photos/` dont `facade.webp` 545 Ko et `terrasse-platanes.webp` 522 Ko ; fournir une variante 960 px.
- **F3-9** (nouveau) Apostrophes droites restantes dans le texte visible : `404.html` (« L'adresse », « n'existe », « l'accueil »), `carte` (« l'apéro »), `histoire` (« L'équipe ») alors que le reste du site utilise U+2019 ; remplacer par « ’ ».
- F3-6 non reproduit : paragraphes de l'apéro mesurés à 18 px. F3-8 (cartes de presse) non revérifié : page non retouchée.

## Ce qui est bien (à ne pas casser)
1. Signature « journée » : ciel, disque Meuse, frise et loader à l'heure réelle, sans scroll gênant ; 0 débordement à 390 et 1440 px.
2. Honnêteté des données : moments marqués illustratifs, lignes « exemple » conservées, chiffres et noms de la carte et de l'équipe tous au dossier.
3. Mobile 390 px pensé : en-tête compact avec frise, équipe en liste à filets, pied de page KYW (un logo, mention, noindex) conservé.
