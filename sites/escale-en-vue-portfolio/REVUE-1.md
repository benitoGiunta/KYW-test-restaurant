# Revue portfolio · Escale en Vue ! · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une guinguette de papier découpé (parasol, chaise, bouteille posés sur un fond lin, tirages de photos que l'on attrape et que l'on dépose sur une table verte), ton franc et chaleureux, pastilles paille et aplats corail.

Méthode : build et captures complètes de QA-revue1.md (dist 01:26, postérieur à src, réutilisé), plus 3 scripts maison (6 pages x 320/390/1024/1440 : console, débordement, axe-core avec best-practices, cibles, images ; contraste du slogan à 320 ; défilement à la molette de histoire, terrasse, reservation, 404.html) et un contrôle du texte du dist contre `donnees.json` et `dossier.md`. Serveur local port 4733 (PID 8502), arrêté en fin de tâche.

Scores /10
- Design 8 : palette lin, vert canard, corail et paille hors crème-terracotta par défaut, signature « table de la terrasse » lisible (`d-03-scroll.png`) ; un seul défaut visible, la nav mobile coupée.
- Usabilité 6 : navigation bas d'écran tronquée à 390 et 320 px (F2-1), CTA « Réserver une table » alors que la saison est finie (F1-2).
- Créativité 8 : objets saisissables, loader parasol, marquee d'état calculé sans date en dur ; signature conservée en mobile (rail).
- Contenu 6 : faits exacts (adresse, téléphone, horaires, e-mail, saison), mais notes de suivi dans le texte client et notes tierces non vérifiées affichées (F1-1, F2-2).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement sur 6 pages x 4 largeurs, LCP mobile 1,1 s, CLS mobile 0,003 ; axe : 1 serious à 320 px, 1 moderate sur toutes les pages.

## Findings

Bilan : F0 0 · F1 2 · F2 5 · F3 5. Pas de F0 : build OK, 0 erreur console, 0 lien mort (tous les href/src internes portent `/escale-en-vue/portfolio/` et existent dans dist), aucune invention non marquée dans les faits, mention Maquette + logo KYW + `noindex, nofollow` présents sur les 6 pages, 1 seul h1, `lang="fr"`, JSON-LD `Restaurant` avec adresse, horaires, téléphone, `og:image`.

### F1 majeurs
- **F1-1 · Notes tierces non vérifiées affichées en section « Avis »** (`src/data/site.ts:209` et suivantes, section `src/pages/index.astro:118`). Menukaart 4,9/5 sur 93 avis, Restaurant Guru 4,9/5 sur 54, Sluurpy 4,9/5 sur 16, Tripadvisor 5,0/5 sur 6 : `donnees.json` les range dans `avis_tiers_a_confirmer` (« via recherche web ») et `avis.google/tripadvisor` valent `null`. La leçon commune dit : avis et notes `null` sauf affichage par le site client. Une mention « non vérifiées directement » ne neutralise pas quatre chiffres exacts montés en cartes géantes (capture `d-05-scroll.png`). Correction : retirer les chiffres (ou les passer en `placeholder: true` avec marque « illustratif » visible sur chaque carte) ; garder la phrase thématique (vue, accueil, bière, produits locaux) sans chiffre, ou supprimer la section.
- **F1-2 · Le site se dit « ouvert » et propose de réserver alors que la saison est terminée** (20/11/2026 ; saison du 19 juin au 6 septembre). `src/pages/index.astro:19` : « Ouvert du jeudi soir au dimanche après-midi · Rue de la Rêche-Terre 21 » dans le hero, suivi de « Réserver une table » (`index.astro:21`), du bouton « Réserver » de l'en-tête et du texte « Réservation par téléphone ». Seuls le marquee (calculé en JS : « Saison 2026 … terminée : prochaine ouverture à confirmer ») et les blocs bas de page disent la vérité ; sans JS le marquee annonce « Horaires du jour / Ouvert du jeudi soir… ». Correction : au premier écran, écrire « Saison 2026 terminée (du 19 juin au 6 septembre). Habituellement ouvert du jeudi soir au dimanche après-midi », remplacer « Réserver une table » par « Voir les horaires » ou « Contacter la maison » tant qu'aucune date 2027 n'est connue, et faire dire la même chose au texte sans JS du marquee.

### F2 mineurs
- **F2-1 · Navigation mobile coupée, sans indice de défilement.** `src/styles/base.css:252` : nav fixe `overflow-x: auto`, contenu 409 px pour 362 px utiles à 390 px (« Réserver » rogné en « Rése », capture `rev1-m390-carte.png`) et 292 px à 320 px (« Terrasse » à moitié visible, `rev1-m320-hero.png`) ; mesure `navSW 409 / navCW 362 et 292`. Correction : réduire `padding-inline` des liens sous 420 px (0,6em actuel, viser 0,4em), `font-size` un cran plus bas, ou ôter « Réserver » de la nav mobile (le bouton « Réserver » de l'en-tête le double), pour que les 4 liens restants tiennent à 320 px sans défilement.
- **F2-2 · Notes de suivi et voix d'agence dans le texte client** : « Aucune carte publiée : prix et carte complète à confirmer avec le restaurant » (`index.astro:108`), « Pas de carte publiée : voici ce que la maison annonce » (`carte.astro:17`), « L'équipe et l'histoire de la maison ne sont pas documentées : nous les ajouterons avec le restaurant » (`histoire.astro:43`), « Le nombre de places et les événements ne sont pas documentés : rien n'est affiché tant que le restaurant ne les a pas confirmés » (`terrasse.astro`, section « À savoir »), « la liste exacte reste à confirmer » (`site.ts:84`), « Tripadvisor, à confirmer » (`site.ts:222`). Un visiteur lit un brouillon, et « nous » désigne l'agence, pas la maison. Correction : supprimer ces phrases (la mention Maquette du pied de page porte déjà l'avertissement) ; garder « Bières régionales et trappistes » sans commentaire, « Parking gratuit » seulement si marqué illustratif.
- **F2-3 · Descriptions de plats ambiguës** : « vue sur les posts de la saison 2026 » (`site.ts:76-78`) se lit « vue » au sens de panorama ou « vu ». Correction : « au menu des posts Facebook de 2026 » ou, mieux, « au menu en 2026 ».
- **F2-4 · Contraste du slogan à 320 px** : `.hero__slogan` corail `#c9432d` sur lin `#efe8da` = 3,98:1 à 22,4 px (non « grand » en dessous de 24 px), axe `color-contrast` serious (script maison, 320 px seulement ; 390 et plus passent). Correction : corail plus foncé (`#b83a26` donne ≥ 4,5:1) ou `font-size` ≥ 24 px dès 320 px.
- **F2-5 · `region` moderate sur les 6 pages** : le `.marquee` (`role="group"`, `src/components/Marquee.astro`) est hors de tout landmark, 2 nœuds par page (axe-core 4.14 avec best-practices ; absent du report.json de QA-revue1 qui n'en compte que les règles WCAG). Correction : le poser dans `<aside aria-label="État du restaurant">` ou `role="region"`.

### F3 finitions
- **F3-1 · Apostrophes mélangées** : 11 apostrophes droites contre 16 typographiques, par exemple « Ce qu'on pose sur la table » (`index.astro:91`), « L'équipe » (`histoire.astro:43`), « n'existe pas » (404), les `description` des pages. Correction : normaliser en « ’ ».
- **F3-2 · Aucune espace insécable avant « ! » « : »** : 35 occurrences d'espace ordinaire (dont « Escale en Vue ! » dans le logo texte et les titres) : le point d'exclamation peut passer seul à la ligne en mobile. Correction : U+00A0 dans `site.nom` et les chaînes affichées (apostrophes et espaces par Python, pas `perl`).
- **F3-3 · `photos/mur-pierre.webp` pèse 492 Ko** (> 300 Ko) alors que les autres font 16 à 156 Ko. Correction : réencoder en qualité 75 à la largeur d'affichage maximale.
- **F3-4 · Promesse non sourcée** : « les dates de la prochaine seront annoncées par le restaurant » (`terrasse.astro:25`), procédure déduite, absente du dossier. Correction : « Dates de la prochaine saison : à venir. » ou supprimer.
- **F3-5 · Itinéraire sur des coordonnées non confirmées** : le bouton « Itinéraire » (`index.astro:168`, `reservation.astro:46`) ouvre OpenStreetMap sur le centre de la carte du site actuel (`site.ts:46` : « à confirmer »). Correction : lien par adresse (`?query=Rue de la Rêche-Terre 21, 5100 Dave`) plutôt que par GPS, et GPS retiré du JSON-LD ou marqué illustratif.

### Faux positifs écartés (cités pour ne pas être corrigés)
- Audit « 404 sans contraste » (`.kyw-footer__note` 4,36:1) : relevé sur la 404 brute de `serve.mjs` ; sur `404.html` axe n'a que le `region` du marquee. Le paquet `kyw-footer` n'est pas à repeindre.
- `audit.mjs` WARN « sentence repeated 2x » : c'est la copie `aria-hidden` du marquee ; « no robots.txt » et « no sitemap » : `robots.txt` (`Disallow: /`) et `sitemap-index.xml` existent dans `dist/escale-en-vue/portfolio/`, sous `base`.
- `skipLinkFirst: false` : à lire dans `keyboard.stops[0]` (lien « Aller au contenu » présent dans le HTML).
- `noindex, nofollow` : conforme au prompt § 3.3 pour la variante portfolio.
- Contraste « à vérifier » (28 sur l'accueil) : surtout le texte défilant du marquee sur fond mouvant ; corail 3,2:1 en grand corps des cartes de note, accepté (ETAT.md) et à retirer avec F1-1.
- Pages histoire, terrasse, reservation, 404 non capturées par QA-revue1 : vues ici à 1440 px (défilement à la molette) et mesurées à 4 largeurs, sans défaut de composition.

## Ce qui est bien (à ne pas casser à la révision)
1. La table de la terrasse (tirages saisissables sur fond vert) et les objets du hero : identité propre à une guinguette, sans carte ni dégradé génériques ; conservée en mobile (rail).
2. Honnêteté des données de carte : exemple de carte marqué `*` et « ces plats et prix sont illustratifs », aucun prix sur l'offre réelle, horaires et saison identiques au dossier sur les 6 pages.
3. Technique propre : 0 erreur console, 0 débordement de 320 à 1440, LCP mobile 1,1 s, CLS mobile ≈ 0, 404 `404.html` designée, JSON-LD complet, reduced-motion sans texte caché.
