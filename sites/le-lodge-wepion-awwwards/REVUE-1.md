# Revue awwwards · Le Lodge Wépion · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant fermé par un incendie qui s'est replié à Erpent, dit « deux rives, une table » : une onde dorée sépare la berge de Wépion et le relais, l'écran se coupe en deux (sombre/ crème) et la carte de saison d'avant l'incendie reste complète.

Scores /10
- Design 8 : palette encre + crème verte + or, serif Gambetta en grand corps, onde dorée récurrente, hiérarchie nette (captures `home/d-01-hero`, `d-05`, `m-01`).
- Usabilité 7,5 : menu mobile (dialog) s'ouvre, se ferme à Échap, 47 liens internes 200, 0 lien mort ; cibles de 23 px et un `.mur` défilant non focusable à 390 px.
- Créativité 8 : l'idée de la berge et du relais est portée par la forme (onde, deux colonnes Wépion/Erpent, passage au défilement) ; au repos l'onde coule (`idleMotion` true, voulu).
- Contenu 6,5 : aucune invention de chiffre, d'avis ou de récompense, carte 88/88 conforme ; mais un plat de l'accueil mélange deux lignes de la carte, « envisagée » mal accordé sur toutes les pages, une procédure inventée.
- Technique 8 : 0 erreur console, 0 requête en échec, LCP mobile ralenti (CPU x4 + 4G) 1,0 s, CLS 0,005 (accueil) et 0,002 (carte), 0 débordement, reduced-motion sans texte caché.

Méthode : QA-revue1.md réutilisé (3 pages sur 5 capturées : accueil, carte, 404 brute). Pages hors QA (histoire, reservation, `404.html` réel) et axe à 390 px mesurés par script maison (axe-core de node_modules, 5 pages x 1440 et 390 px, serveur propre port 4781, arrêté). `dist/` utilisé tel que servi (tous les mtimes du dépôt sont identiques après checkout : fraîcheur non tranchable, aucun écart de contenu constaté entre `src/` et `dist/` sur les textes relus). Non revérifié : build (QA : exit 0).

## Findings

### F0 (bloquant)
Aucun. Build OK (QA), 0 fait faux sur adresse, téléphone, horaires, e-mail, URL de réservation et réseaux ; 0 avis, note, distinction ou citation inventés ; photo 11 (« Beau Rivage ») non utilisée ; mention, logo KYW unique (`kyw-footer__logo` = 1) et `noindex, nofollow` présents sur les 5 pages.

### F1 (majeur)
- **F1-1 · T-faux · plat de l'accueil mélangé.** `src/data/site.ts` `reperes[0]` : « Le tartare de bœuf à l'italienne, 24 €, Parmesan, tartufata, sésame, pepperoni, huile au pesto ». Dans `donnees.json`, ce nom est l'**entrée** à 16 € (« Tartufata, parmesan, grissini ») ; les 24 € et les garnitures sont ceux du plat « L'Italien » (catégorie Les tartares). La page Carte affiche bien 16 € et 24 € séparément : l'accueil la contredit. Preuve : `rv1-carte` (88/88 plats identiques à la carte, sauf cette recomposition à l'accueil), extrait du texte de `index.html`. Correction : nommer « L'Italien » (tartare, 24 €) avec ses garnitures, ou reprendre l'entrée à 16 € avec « Tartufata, parmesan, grissini ».
- **F1-2 · faute d'accord répétée, visible partout.** « Retour envisagée fin 2026 » (et « Le retour à Wépion est envisagée ») : « retour » est masculin. Source unique : `src/data/site.ts:22` `reouverture: 'envisagée fin 2026, …'` injecté dans le pied de page (5 pages sur 5), l'accueil, l'histoire, la réservation. Correction : `'envisagé fin 2026, voire début 2027, sans date confirmée'`, puis relire les phrases où la constante suit « Le retour à Wépion est » ; grep `envisagée` sur `dist/` doit tomber à 0.

### F2 (mineur)
- **F2-1 · axe `scrollable-region-focusable` (serious), carte à 390 px.** `.mur` (`carte.astro:39`, `site.css:168` `overflow-x: auto` en mobile) n'est pas atteignable au clavier. Invisible au QA (axe lancé à 1440 px seulement). Correction : `tabindex="0"` sur `.mur` avec `role="group"` et `aria-label` déjà présents, plus un focus visible.
- **F2-2 · procédure inventée.** `carte.astro:14` : « Le relais d'Erpent peut servir une autre carte : demandez-la à la réservation. » Le dossier ne dit rien de la carte du relais ni d'une demande à la réservation (« inconnus »). Correction : « La carte du relais d'Erpent n'est pas connue : celle-ci est la carte de saison d'avant l'incendie. »
- **F2-3 · chapeau à demi-largeur sur mobile.** `site.css:129` `.entete p { grid-column: 1 / span 6 }` : à 390 px la grille de 12 colonnes a des gouttières de 10,8 px, le paragraphe d'introduction de l'histoire, de la réservation et de la carte occupe donc ~180 px sur 390 (capture `m-resa-top.png`, lignes de 3 à 4 mots, moitié droite vide). Correction : `grid-column: 1 / -1` sous 40 rem.
- **F2-4 · langage de production dans le texte visible.** `carte.astro:14` « Quatre-vingt-huit lignes relevées sur le site du Lodge » et le pied de carte « relevés sur le diaporama de la carte de lodgewepion.be le 20 novembre 2026 » parlent de l'opération de collecte, pas au client. Correction : « Carte de saison relevée sur le site du Lodge avant l'incendie » sans décompte.
- **F2-5 · contraste du pied de page KYW (paquet `kyw-footer`).** `.kyw-footer__note` #6b787d sur #fbfaf8 = 4,37:1 (calculé ; seuil 4,5:1), présent sur toutes les pages ; QA le classe serious sur la 404. À traiter dans le paquet (assombrir le gris du texte seulement, ne pas repeindre le bandeau), hors du dossier du site.

### F3 (finition)
- **F3-1 · cibles < 24 px.** « Ouvrir le plan » 519 x 23 (bureau, accueil) ; mobile : « Ouvrir le plan » 350 x 23 et 98 x 23, « Voir toute la carte », « Crêpes et gaufres », « Réserver en ligne » (127 x 23), `0496 92 55 13` et `le.lodge@hotmail.com` sur la réservation (119 x 23, 161 x 23), liens de la 404 (58 à 64 x 23). Passer à `min-height: 24px` (idéalement 44).
- **F3-2 · « Wine / & More » coupé** sur 3 lignes dans les chapeaux mobiles (`m-resa-top.png` : « …au Wine / & More. »). Mettre des U+00A0 : « Wine & More » (`relais.lieu`).
- **F3-3 · formulations à adoucir (`histoire.astro:19`, `site.ts` chronologie).** « un incendie parti des cuisines a ravagé la salle » : le dossier dit cuisines ; « la salle » n'est pas prouvée (L'Avenir : « ravagé », le restaurant). « Juin 2026 : l'équipe reprend le service à l'Aquaplane » : juin vient de la date de l'article DH (10/06), pas du début du service. « Il reçoit depuis 2008 » au présent alors que le lieu est fermé : « Il a reçu ».
- **F3-4 · JSON-LD** : `Restaurant` à l'adresse de Wépion avec `acceptsReservations: true` et le téléphone de Wépion, alors que le lieu est fermé et que la réservation passe par le relais ; pas d'`openingHours` (cohérent avec l'absence d'horaires fiables). Ajouter une mention de fermeture temporaire ou renseigner le relais comme second lieu.
- **F3-5 · croquettes de crevettes à l'accueil** : « une pièce » omet « 2 pièces 24 € » de la carte (la page Carte est complète).
- **F3-6 · eyebrows** en petites capitales au-dessus de la plupart des titres (« Aujourd'hui · Erpent · Wine & More », « Réservation · Erpent », « Carte de saison, avant l'incendie », « Wépion, Meuse, 2008 à aujourd'hui ») : lisibles ici car porteurs d'information, mais motif répété ; supprimer celui de l'histoire et de la réservation, qui répètent le titre.
- **F3-7 · accueil bureau, panneau crème** : ~170 px de vide entre les boutons et le bloc « Wine & More » (`d-01-hero.png`), acceptable car il porte la ligne verticale de l'onde.

### Vérifié sans écart
- 5 pages : `lang="fr"`, 1 seul `h1`, `<title>` et description uniques, canonical (sauf 404, sans objet), OG, favicon, JSON-LD présent ; 0 tiret cadratin, 0 tutoiement ; espaces avant « : » respectées dans les textes relus.
- Axe : 0 violation sur 9 des 10 cas (une seule, F2-1) ; « à vérifier » = contrastes de textes en reveal, non retenus (lecture sur captures : lisible).
- Mobile 390 : composition pensée (onde, relais en tuiles crème, carte en liste), menu dialog fonctionnel, signature conservée ; reduced-motion : 0 élément à l'opacité 0 (accueil, histoire).
- Clavier : arrêts dans l'ordre, lien d'évitement présent (premier arrêt), faux positif connu du `type="date"` (sous-champs).
- Formulaire de réservation : `mailto:` honnête, dit « rien n'est envoyé depuis ce site » ; champs étiquetés.
- Alt des photos conformes au champ `sujet` de `photos/index.json` ; pas de nom de plat ou de personne sans preuve.
- Aucun `robots.txt` dans `dist/…/awwwards/` (sans objet sous un sous-chemin, `noindex` en méta) ; sitemap 200.

## Ce qui est bien (à ne pas casser à la révision)
1. Honnêteté totale sur la fermeture : adresse provisoire, aucun faux horaire pour Erpent, sources d'incertitude affichées (« à confirmer »), 0 donnée marquée `placeholder`, aucune invention de note ou de récompense.
2. Idée unique et cohérente : l'onde dorée, le passage au défilement, la grille Wépion / Erpent répétée dans le pied de page ; perfs excellentes (LCP mobile ralenti ~1 s, CLS < 0,01, 513 Ko max).
3. Carte complète et exacte : 88 plats, 0 écart de nom, prix ou description avec `donnees.json` (hors recomposition de l'accueil, F1-1).
