# Revue awwwards · Pépite, cave à manger · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 1 F2, 5 F3)

Lecture en une ligne de l'idée du site : une cave voûtée sombre, du lin et du cuivre, avec un fil de cuivre qui descend la page et pose un losange devant chaque plat du « tableau de la semaine ».

Scores /10
- Design 8 : palette tenue sur 5 pages, carte remontée (« Menu 5 services » à 737 px dans une fenêtre de 900 px, `r2/carte-1440-hero.png`), frise de photos nette (`r2/strip-1440.png`, visage + bouteille, assiette, bougie).
- Usabilité 8 : 0 cible < 24 px, bande de photos atteignable au clavier (Tab s'arrête sur `ul.strip`, nom « Photos des soirées à la bougie »), bouton de réservation désormais plein (`r2/resa-390.png`).
- Créativité 7 : le filon et la 404 « La bougie s'est éteinte » tiennent l'idée ; pas de scène forte ni de WebGL (inchangé, hors périmètre de la révision).
- Contenu 8 : faits confrontés à `donnees.json` et `dossier.md` (58 €, 12 €, 45 €, 5,50 à 12,50 €, horaires, Cuisinémoi, presse, parking « à confirmer », paiements) : 0 écart, 0 invention ; formulations de F1-2 toutes corrigées.
- Technique 9 : build déjà fait et postérieur à `src/` (`find -newer` vide) ; 5 pages x 1440/390/360 : axe complet (sans `runOnly`) 0 violation, 0 erreur console, 0 requête en échec, 0 débordement, 0 texte à l'opacité 0 en reduced-motion ; 23 liens et ressources internes, 0 mort ; CLS 0 ; LCP mobile CPU x4 + 4G, deux passes : accueil 1112 / 1120 ms, carte 1020 / 1008 ms (2232 ms en passe 1).

Méthode : `dist/` (13:44) postérieur à `src/` et captures de QA-revue2.md (13:44 à 13:50) postérieures au `dist/`, donc réutilisées ; serveur propre sur le port 4793 (PID noté, arrêté par `kill`) ; deux scripts maison (axe-core de node_modules, console, requêtes, débordement, balises, cibles ; cadres de photos, citation, boutons, LCP/CLS) via `scripts/q.sh`, et une planche de 6 captures. Le « 2 violations axe » de la 404 dans QA-revue2.md est la réponse brute de `serve.mjs` (faux positif connu) : la vraie `404.html` a lang, title, h1, 0 violation.

## Vérification des corrections de REVISION-1.md
| id | annoncé | constat |
|---|---|---|
| F1-1 | corrigé | CONFIRMÉ. `object-position` 50% 88 % et 100 % ; plus de bande blanche ; l'assiette et le visage sont dans le cadre (`strip-1440.png`, `strip-390.png`) ; alt « Une personne tient une bouteille… » : « serveuse » absent du dist. |
| F1-2 | corrigé | CONFIRMÉ. 0 occurrence de « écrivez », « réécrit », « accueille aussi », « Parfois », « Venir chez » dans `dist/` ; accueil « À la bougie, en 2022 » ; histoire au passé composé ; méta de l'accueil « a aussi connu ». |
| F2-1 | corrigé | CONFIRMÉ. `h1` avec `sr-only` « Pépite, cave à manger » + spans `aria-hidden`, plus d'`aria-label` ; axe 0. |
| F2-2 | corrigé | CONFIRMÉ. `ul.strip` `tabindex="0"` + `aria-label`, atteint par Tab ; axe 0 à 390. |
| F2-3 | corrigé | CONFIRMÉ. Horaires et adresse une seule fois par page (pied), horaires de la boutique et de la cave dans le pied. |
| F2-4 | corrigé | CONFIRMÉ. Carte 1440 x 900 : « Menu 5 services » entre 737 et 798 px. |
| F2-5 | corrigé, « non capturé » | CONFIRMÉ en grande partie : sur `home/d-04-scroll.png` l'écart « Voir la carte » vers la photo est d'environ 70 px au lieu de 350 px ; paddings de section 99 px au lieu de 171 px. |
| F2-6 | en partie | CONFIRMÉ en partie : bouton plein (fond cuivre) ; cible toujours l'accueil du client (voir F2-1 ci-dessous). |
| F2-7 | corrigé | CONFIRMÉ : plus de coupes parasites, la citation se pose sur 3 lignes (1440) et 4 lignes (390) sans mot orphelin (`quote-1440.png`, `quote-390.png`). Le « getClientRects = 1 » du rapport ne vaut que par ligne de texte, pas de contradiction. |
| F3-1 | « déjà conforme (U+00A0 présent) » | FAUX, voir F3-1 ci-dessous. |
| F3-4, F3-7 | corrigés | CONFIRMÉS (alt neutre ; LCP carte 1,0 s). |
| F3-2, 3, 5, 6 | non traités | F3-3 et F3-6 restent (ci-dessous) ; F3-5 : « boutique dès 10 h 30 » tient sur une ligne à 1440, sur deux à 390 sans couper « 10 h 30 » en lecture. |

## Findings

### F0 / F1 : aucun

### F2 (mineur)
- **F2-1 · Réservation en ligne non reliée à l'outil** (`src/pages/reservation.astro:17`) : « Réserver sur le site de Pépite » mène à `https://pepite-caveamanger.be/` ; `donnees.json` donne l'outil (Tablebooker, `https://reservations.tablebooker.com`, identifiant 50470946, « à confirmer »). Hypothèse acceptable et déjà notée dans RAPPORT.md ; correction possible : pointer vers l'outil si le client le confirme. Le texte « Pour une table, appelez » puis un bouton « Réserver sur le site » est légèrement contradictoire : écrire « Pour une table, appelez ou passez par le site de la maison ».

### F3 (finitions)
- **F3-1 · Guillemets de la citation avec espace simple** (accueil et histoire) : U+0020 avant et après (lu dans `dist/`), contrairement à REVISION-1.md (« déjà conforme ») ; mettre U+00A0 dans `citation` (`src/data/site.ts`) pour qu'un « » ne tombe pas en début de ligne.
- **F3-2 · JSON-LD** : `openingHoursSpecification` sans `closes`, horaires de la boutique absents, même bloc (`url` de l'accueil) sur les 5 pages, `sameAs` Facebook avec accents non encodés.
- **F3-3 · Date en dur** « du jeudi 12 au samedi 14 novembre 2026 » (accueil, carte) : périmé dès le 15 novembre.
- **F3-4 · Réservation à 390 px** : les trois boutons ont trois largeurs différentes (`resa-390.png`) ; les aligner en pleine largeur.
- **F3-5 · Photo hero `cave.jpg`** 598 x 899 : molle en DPR 2, source client sans mieux.

## Conformité (sans écart)
Build à jour ; `lang="fr"`, un seul `h1`, `noindex, nofollow` (prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et un seul `kyw-footer__logo` sur 5 pages x 3 largeurs ; 0 tiret cadratin, 0 apostrophe droite ; 404.html réelle correcte ; liens `base` tous sous `/pepite/awwwards/`.

## Ce qui est bien (à ne pas casser)
1. Hero de l'accueil et fil de cuivre ; LCP mobile de 1,1 s, CLS 0.
2. Bande « À la bougie, en 2022 » désormais lisible (visage, assiette, bougie) et honnête sur sa source.
3. Pied unique, un logo, horaires uniques ; contenu clair sur ce que le site ne publie pas.
