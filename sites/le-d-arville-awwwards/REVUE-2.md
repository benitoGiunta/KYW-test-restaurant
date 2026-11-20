# Revue awwwards · Le D’Arville · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 2 F2, 6 F3)
Lecture en une ligne de l’idée du site : le repas comme une balade dans la prairie, borne kilométrique fixe qui compte les mètres du défilement, capitales étroites sur vert nuit, crème et orange brique (inchangé depuis la passe 1).

Méthode : `QA-revue2.md` absent et `.shots-le-d-arville-awwwards-revue2/` inexploitable (3 `shootFailed`, navigateur fermé). `dist/` (04:48) postérieur à `src/` (aucun fichier plus récent). Mesures maison, serveur local port 4871 (PID noté, tué en fin) : 5 pages (dont `404.html` réelle) x 1440 et 390 px, défilement à la molette, axe-core, console, requêtes, `scrollWidth`, masques de titres, captures ciblées des titres et de la photo du chef (planches dans le scratchpad), LCP mobile (4x CPU, 4G lente, DPR 2,6) x 5 passes, liens par `curl`.

Scores /10 : design 8 (titres À, É, È désormais entiers sur 8 titres x 2 largeurs), usabilité 7,5 (0 débordement, mais CTA collé au titre à 390 px), créativité 8 (concept intact), contenu 8 (faits conformes, inventions retirées), technique 7,5 (axe 0 violation sur 10 contextes, LCP image encore > 2,5 s par intermittence).

## Vérification de chaque correction annoncée (REVISION-1)
| id | verdict | preuve |
|---|---|---|
| F1-1 accents | CONFIRMÉ | clips `t-*` et `t2-*` : « À LA CARTE », « À LA BARRE », « À L’ASSIETTE », « À TABLE, DU JEUDI… », « ARRIVÉE : LA VILLA BARABAS », « 200 MÈTRES DE PRAIRIE », « RÉSERVEZ… » entiers à 1440 et 390 ; eyebrow « Réserver et venir » ne chevauche plus le À |
| F2-1 LCP | PARTIEL | poids réglé (`src` 800 w = 129 Ko, AVIF 97 Ko, `sizes` 55vw) ; mais voir F2-A : l’annonce « 1 024 / 1 048 ms » mesure le paragraphe |
| F2-2 contentinfo | CONFIRMÉ | axe 0 violation sur home, carte, histoire, réservation et 404 réelle à 1440 et 390 ; un seul `footer`/contentinfo par page |
| F2-3 route d’Arville | CONFIRMÉ | « rue d’Arville » (page Le domaine) ; 0 « route d’Arville » |
| F2-4 apéritif | CONFIRMÉ | « Terrasse, jardin et point d’eau entourent la ferme. » (accueil) |
| F2-5 procédures | CONFIRMÉ | 0 « se demandent », « demandez », « à confirmer » ; « Heures de service non communiquées », « Contenu et prix non communiqués », eyebrow « Menus d’actualité jusqu’au 20 décembre 2026 » conformes au dossier |
| F2-6 desserts | CONFIRMÉ | « Prix non communiqués. Le dessert de la carte fait partie des deux menus. » |
| F2-7 filigrane | CONFIRMÉ | zoom du bas de la photo du chef, accueil et domaine à 1440 : plus de « © Morgane Ball » (cadre 4/5, `object-position` haut) ; à signaler tout de même au client |
| F2-8 formulaire | CONFIRMÉ | `method="get"`, `action="mailto:info@ledarville.be"`, champ `body` ; non testé avec un client mail |

Contrôles globaux sans écart : build `dist/` présent, 0 erreur console, 0 requête en échec ou 4xx (10 contextes), 30 liens internes tous 200, `scrollWidth` = largeur à 1440 et 390, 0 masque de titre rogné (`scrollWidth > clientWidth`), un h1 par page, `lang="fr"`, noindex présent, mention « Maquette KYW, certaines données sont illustratives » et logo KYW sur les 5 pages, CLS 0,005, liens externes inchangés et conformes au dossier, 0 tiret cadratin.

## Findings

### F2 mineur
- **F2-A · LCP mobile : l’image du hero redevient LCP à ~2,94 s par intermittence.** 5 passes : l’AVIF `07-terrasse-bassin…ZvS4HT.avif` est le dernier candidat LCP à 2 948 ms (2 passes) et 2 936 ms (1 passe) en trois lectures sur cinq ; les autres passes ne reportent que le paragraphe à ~1,05 s. Seuil 2,5 s dépassé. REVISION-1 (« 1 024 / 1 048 ms ») cite le paragraphe, comme ETAT.md en passe 1. L’image est pourtant légère (97 Ko) : le retard vient du reveal `data-reveal="clip"` + `data-intro` (délai 0,15 s) qui retient l’image visible. Correction : faire commencer le reveal du hero sans attendre `is-loaded`, ou ne pas masquer l’image pendant l’intro ; re-mesurer 3 fois en lisant l’élément LCP.
- **F2-B · Accueil, section « Réservez votre balade. » à 390 px : le bouton « Réserver une table » touche le bas du titre.** Mesure : h2 `bottom` = `btnTop` (écart 0 px), dernier `.split-line` bas 375 px pour un bouton à 371 px ; capture `cta-m.png` : la base de « VOTRE BALADE. » est collée au bord du bouton. Pas de débordement ni d’axe, donc invisible aux mesures de la passe 1. Correction : `margin-top` d’au moins 1 rem sur le groupe de boutons de `.appel` en mobile (ou `margin-bottom` sur ce h2 découpé), recapturer.

### F3 finition (non traités par la révision, hors périmètre annoncé, inchangés)
- F3-1 hiérarchie des titres de la carte : « Les desserts » toujours h2 (carte.astro:68) alors que « Les entrées/plats/Fromages » sont h3.
- F3-2 étiquette de borne sur « + 50 € » à 1440 : non recontrôlée.
- F3-3 « 4,5 € » (kombucha) toujours présent dans la carte ; le dossier donne 4,50 €.
- F3-4 eyebrow de la carte contre le h1 : non recontrôlée à 390 ; la marge compensatoire est appliquée à `.page-tete` (confirmée sur la réservation).
- F3-5 « Selon l’affiche du restaurant, le D’Arville a 20 ans. » (histoire) : attribution ajoutée, mais présent non daté ; préférer « avait 20 ans selon l’affiche de février 2025 » ou retirer.
- F3-6 `og:url` de la 404 pointe vers `/404/` ; « ledarville.be » (rubrique Offrir) est du texte, pas un lien : le lier vers https://www.ledarville.be/.

## Ce qui est bien (à ne pas casser)
1. Les accents sont enfin corrects sans changer la composition ; le padding compensatoire n’a ni décalé la mise en page ni créé de débordement.
2. Texte désormais strictement sourcé : aucune procédure ni anecdote déduite, mentions « non communiqués » sobres.
3. Zéro violation axe sur 10 contextes (404 incluse), contentinfo unique, CLS 0,005, photo du chef recadrée sans perte du sujet.
