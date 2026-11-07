# Revue awwwards · Le Royal Namur · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie « face au Théâtre » dont les pages se partagent en deux faces (clair / ardoise nuit) autour d'un axe vertical rouge ; typographique (Melodrama + Host Grotesk), la terrasse porte le premier écran. Inchangé depuis la passe 1.

Scores /10
- Design 8 : `d-apropos`, `d-reservation` (planche `.shots-le-royal-awwwards-revue2/r2/planche-r2.png`) : hiérarchie nette, deux faces cohérentes, aération maîtrisée ; rien n'a bougé de ce qui était bien.
- Usabilité 8 : 0 cible < 24 px sur 10 cas, `Réserver` rouge partout, tel et Zenchef visibles ; réservation mobile lisible (`m-reservation`).
- Créativité 7 : axe et rideau toujours discrets, pas de loader ni de GL (choix assumé, F2-7 refusé en révision, accepté).
- Contenu 7 : les aveux de maquette et les phrases non prouvées de la passe 1 ont disparu ; restent une date en dur et une procédure non attestée (F2 ci-dessous).
- Technique 8,5 : axe complet 0 violation sur 5 pages x 2 largeurs, 0 erreur console, 0 requête en échec, 0 débordement, CLS 0, LCP mobile 2308 et 2296 ms (CPU x4, 4G lente, deux passes).

Périmètre : `QA-revue2.md` (captures de l'agent captures, postérieures au build : dist 01:08, report 01:11) + vérification de chacune des 8 lignes de `REVISION-1.md` par grep du `dist/` et script maison (axe-core complet sans runOnly, contraste nœud par nœud canvas 1x1, débordement, console, requêtes, cibles) sur accueil, carte, a-propos, reservation, 404.html à 1440 et 390 px ; LCP/CLS mobile en deux passes ; planche a-propos/reservation 1440 et 390. Le QA ne couvrait ni a-propos, ni reservation, ni la vraie 404.html : couvertes ici.

## Vérification des corrections annoncées
| id | annonce | verdict | preuve |
|---|---|---|---|
| F0 | sans objet | confirmé | build exit 0 (QA-revue2), 5 pages |
| F1-1 | `aria: 'none'` SplitText | confirmé | `reveal.ts:27` ; axe complet : 0 violation (aucun `aria-prohibited-attr`) sur 10 cas |
| F2-1 | phrases d'aveu supprimées | confirmé | grep `dist/` : 0 « cette maquette n », 0 « 11 h à 23 h » |
| F2-2 | « un verre, un repas », « la terrasse et la brasserie » | confirmé | grep : 1 occurrence chacune ; 0 « planche à partager », 0 « la salle » |
| F2-3 | TripAdvisor retiré | confirmé | grep : 0 « TripAdvisor », 0 « 272 » ; note Google 4,0 / 577 avis conforme à `donnees.json` |
| F2-4 | pied en `<section>` | confirmé | 1 `<footer>` et 1 `.kyw-footer__logo` par page ; axe : plus de `landmark-no-duplicate-contentinfo` |
| F2-5 | héros déjà optimisé | confirmé par mesure | LCP mobile 2308 / 2296 ms, CLS 0 (marge 190 ms) |
| F2-6 | une ligne « Tous les jours » | confirmé | `reservation/` : bloc Cuisine = 1 ligne ; capture `d-reservation` |
| F2-7 | refusé | accepté | `idleMotion` false assumé, non contraire au prompt |
Mention « Maquette KYW, certaines données sont illustratives » + `noindex` + logo unique : présents sur 5 pages.

## Findings

### F0 (bloquant)
Aucun.

### F1 (majeur)
Aucun.

### F2 (mineur)
- **F2-8 · date en dur non prouvée, 2 occurrences** : `src/pages/index.astro:77` « Trois services, entrée, plat et dessert, proposés en novembre 2026. » et `src/pages/a-propos.astro:34` « Note relevée sur un agrégateur d'avis en novembre 2026, sans extrait cité. ». Le dossier (`dossier.md:45`, `site-actuel/fete.txt`) ne donne aucune période pour le menu des fêtes patronales ; une date de relevé en dur périme la page (leçon commune : aucune date en dur). Correction : index « Trois services, entrée, plat et dessert, à 50 € (65 € avec boissons). » ; a-propos « Note relevée sur un agrégateur d'avis, sans extrait cité. » (ou « Source : Rankeat »).
- **F2-9 · procédure non attestée** : `src/pages/reservation.astro:36` « Pour les autres questions pratiques (parking, groupes), écrivez à resto@leroyalnamur.be. » Le dossier note « Parking, transports, privatisation, take-away : inconnus » : le texte promet que l'e-mail traite ces sujets. Correction : « Pour toute autre question, écrivez à resto@leroyalnamur.be. » ou ne garder que « La terrasse se trouve face au Théâtre de Namur. ». Non vu en passe 1, présent avant la révision.

### F3 (finition, non traités en révision, hors périmètre)
- « 4,0 » en Melodrama se lit « 4,Ø » en grand corps (`d-apropos`, section Repères) : passer le chiffre en Host Grotesk.
- Façade saturée sur l'accueil ; « Voir toute la carte » discret sous la liste de 5 plats.
- Audit : 3 WARN connus (robots.txt, sitemap sous `base`, 404 brute du serveur) : faux positifs de la fiche commune ; la vraie `404.html` a h1, title, lang (axe 0, h1 = 1).

## Vérifications sans écart
- Contraste : 0 nœud sous seuil (canvas 1x1, opacité cumulée) sur 10 cas ; axe « incomplete » = uniquement `color-contrast` (fonds en dégradé/photo), tous couverts par la mesure maison.
- Responsive 390 px : 0 débordement, 0 cible < 24 px, menu à 3 entrées (`m-reservation`), signature des deux faces conservée.
- Faits : tel 081 22 01 33, adresse Place du Théâtre 13, horaires 12 h–14 h 30 / 18 h–22 h, e-mail, fêtes 50 € / 65 € conformes au dossier.

## Ce qui est bien (à ne pas casser)
1. Hero accueil et carte à 62 prix fidèles, photos décrites par leur `sujet` réel.
2. Sobriété technique : 927 Ko, CLS 0, LCP 2,3 s en conditions dégradées, axe 0.
3. Pied unique `kyw-footer` sans doublon de landmark, avec contact et horaires du site en `<section aria-label>`.
