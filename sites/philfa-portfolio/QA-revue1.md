# QA revue 1 — philfa / portfolio (captures)

Build : `sites/philfa-portfolio` → `dist/philfa/portfolio/` (rc 0, 6 pages construites).
Serveur local : `dist` sur 127.0.0.1:4501 (arrêté après contrôle).
Captures : `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue1/` (dossiers `home`, `404`, `philfa-item` ; `summary.json` à la racine).
Note : `philfa-item` correspond à `/philfa/portfolio/carte/` (shoot.mjs --nav). L'audit a parcouru 5 pages (accueil, carte, histoire, terrasse, reservation) ; le shoot n'a produit que 3 dossiers.

## Planches

- Accueil : `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue1/home/planche.png`
- 404 : `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue1/404/planche.png`
- Carte (`philfa-item`) : `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue1/philfa-item/planche.png`

## Chiffres par dossier (report.json)

| Mesure | home (`/philfa/portfolio/`) | 404 (`__shoot-missing-page`) | philfa-item (`/carte/`) |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 (serious 0) | 1 règle `color-contrast` (serious), 2 nœuds | 0 (serious 0) |
| Axe : contrastNeedsReview | 27 | 0 | 17 |
| LCP desktop | 72 ms (`p.hero__slogan`) | 32 ms (`p`) | 60 ms (`p.lead`) |
| LCP mobile (throttled) | 4004 ms (`img`) | 220 ms (`p`) | 1064 ms (`p.lead`) |
| CLS desktop | 0.019 | 0 | 0.006 |
| CLS mobile | 0.007 | 0 | 0 |
| FPS scroll desktop / mobile | 60 / 60 (pire trame 33 ms) | 61 / 61 (pire trame 17 ms) | 60 / 60 (pire trame 17 ms) |
| Débordement horizontal | non | non | non |
| Éléments cachés (texte réduit) | 0 | 0 | 0 |
| Cibles tactiles petites | 0 | 1 : « la page d'accueil » 128x20 (desktop et mobile) | 0 |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : focus bloqué | non | non | non |
| Clavier : skipLinkFirst (flag) | false | false | false |
| Clavier : premiers arrêts | « Aller au contenu », PhilFa, Accueil, Carte… | « la page d'accueil », « Réalisé par », « body: focus left the page » | « Aller au contenu », PhilFa, Accueil, Carte… |
| Mouvement réduit : moving | false | false | false |
| FPS hors débordement (throttled mobile) | oui | oui | oui |

Détail violation axe sur 404 : `color-contrast`, `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1 (seuil 4,5:1).

## Audit (`audit.mjs`, 5 pages)

- Résultat : **0 FAIL, 13 WARN**.
- WARN « phrase répétée » (11) :
  - accueil : « Horaires du jour… » x2, « La salle et sa baie vitrée » x2, « 12:00 à 14:30, 18:15 à 21:00 » x10 ;
  - carte, histoire, terrasse : « Horaires du jour… » x2, « 12:00 à 14:30, 18:15 à 21:00 » x5 chacune ;
  - reservation : « Horaires du jour… » x2, « 12:00 à 14:30, 18:15 à 21:00 » x10.
- WARN site (2) : pas de `robots.txt`, pas de `sitemap`.
- Poids de la page la plus lourde (`/philfa/portfolio/`) : ~1032 KB ; HTML 8, JS 20 (gz), CSS 7 (gz), polices 69, images 929.

## Sortie de contrôle

Journaux dans `.logs/philfa-portfolio-revue1-*.log`. Aucun fichier source modifié, aucun commit.
