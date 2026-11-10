# Revue portfolio · Pépite, cave à manger · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 7 F2, 7 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une cave à manger vue de nuit, noire, titres en contour cuivre, une flamme de bougie qui suit le curseur et éclaire la page, un compteur d'heure en guise de loader et un bouton « Réserver » toujours présent dans le coin.
Scores /10 :
- design 7,5 : hero en trois volets (cave, titre, vitrine) tenu, cuivre sur noir cohérent, contours lisibles à grande taille (`d-01-hero`) ; mosaïque de photos faibles agrandies (`d-02-scroll`) et cadre vide de la patronne.
- usabilité 7 : 0 débordement, 0 cible < 24 px, clavier complet (12 arrêts, focus visible), mais loader de 2,9 s (3,2 s mobile) devant un LCP de 136 ms et réservation vers une page Tablebooker générique.
- créativité 8 : la flamme de bougie, le statut « fermé aujourd'hui, prochain service jeudi soir à 19h » et le compteur d'heure sont propres à ce lieu ; la scène « D'où ça vient » épinglée tient sur mobile.
- contenu 6,5 : faits corrects (adresse, téléphone, horaires, prix 58 € / 12 € / 5,50 à 12,50 € / 45 €), carte des vins marquée illustrative ; mais heure de fermeture 23:00 affichée par le loader, citations raccourcies sans marque, procédures déduites, numérotation 01 à 06 pour 5 services.
- technique 8 : build OK (7 pages), 0 erreur console, 0 requête en échec, 0 lien mort (11 liens internes testés sur dist), axe 0 serious/critical (2 moderate), CLS 0,02, LCP mobile 1236 ms, photos de 178 Ko au plus, noindex, mention et logo KYW sur 7 pages x 2 largeurs.

Preuves : QA-revue1.md (dist 13:18, captures 13:18 à 13:27, src plus ancien : réutilisés), plus 2 scripts maison (axe-core, console, requêtes, débordement, cibles, mention/logo/robots, 7 pages x 1440 et 390 après défilement à la molette ; scène Histoire à 9 et 6 positions) et la lecture du texte rendu des 7 pages contre `donnees.json` et `dossier.md`.

## Findings

### F1 majeurs
- **F1-1 · T-invente · l'heure de fermeture illustrative (23:00) s'affiche.** `src/motion/setup.ts:13-16` fait compter le loader de `data-de` (19:00) à `data-a` (fermeture 23:00 de `site.ts` `SOIR`, `Loader.astro`) : le compteur finit sur « 23:00 » (`home/d-00-firstpaint` montre « 20:16 » en cours de route). ETAT.md annonce « jamais affichée » : c'est faux, et le dossier ne donne aucune fermeture. Le statut « Cave à manger ouverte ce soir » (`setup.ts:70`) s'appuie aussi sur 23:00. Correction : compteur sans heure de fermeture (pourcentage, ou « 19:00 » fixe avec la barre qui avance) ; statut « ouvert » seulement sous une règle marquée illustrative, ou texte sans heure de fin.
- **F1-2 · loader trop long.** `report.json` : `loaderMs` 2890 ms desktop, 3244 ms mobile (CPU x4), pour un LCP de 136 ms et 1236 ms : le visiteur attend 1,7 à 2 s de plus que nécessaire (seuil du prompt : 2,6 s). Correction : `MIN` à 0,8 s dans `engine/loader.ts:17`, sortie raccourcie (0,25 s + 0,9 s), total sous 2 s desktop et 2,5 s mobile.

### F2 mineurs
- **F2-1 · citations Mapstr raccourcies sans marque.** `src/data/site.ts` (avis, lignes `@stephane.verstraeten` et `@margauxvdv`) : « Le saumon est une merveille. » et « On y a fait un repas d'équipe. » ont disparu, le point final de la 2e a été ajouté (`donnees.json` `extraits_avis`). Une citation coupée sans « … » est une citation falsifiée. Correction : texte intégral, ou « [...] » à l'endroit coupé.
- **F2-2 · majuscules abusives.** `src/styles/base.css:210` `.horaires dt { text-transform: capitalize }` : « Lundi Au Mercredi », « Jeudi Et Vendredi » (capture `m-06-scroll`, pied de page de chaque page). Correction : retirer `capitalize`, mettre la majuscule initiale à la source seulement (« Lundi au mercredi »).
- **F2-3 · numérotation 01 à 06 pour un « menu 5 services ».** `src/pages/carte.astro:39` et `index.astro` numérotent par `i + 1` : le fromage (supplément 12 €) devient « 05 » et la pomme au four « 06 ». Le site actuel numérote 1 à 5 et laisse le fromage hors numéro (« Assortiment de Fromages (suppl. 12€) »). Correction : ne pas numéroter la ligne supplément.
- **F2-4 · cadre vide de la patronne.** `src/pages/histoire.astro` : carré d'environ 960 x 700 px à 1440 (`hist-1440-09` : seule une initiale « C » en contour) et 150 x 200 sur mobile ; aucune photo n'existe. Correction : supprimer le cadre et mettre le nom et le rôle sur une ligne, ou une photo réelle du dossier.
- **F2-5 · réservation vers une page générique.** `site.ts` `reservation.url` = `https://reservations.tablebooker.com/` : tous les « Réserver » (nav, coin fixe, hero, formulaire) mènent à un écran sans restaurant. Le `page.html` du site actuel donne l'URL du widget : `https://reservations.tablebooker.com?modal=0&lang=fr&source=website&restaurantId=50470946&theme=light` (ETAT : « non transformable en lien », à corriger). Reprendre cette URL et la mettre dans `acceptsReservations`.
- **F2-6 · photos faibles agrandies.** Mesure : `service-bouteille` 720 px affichée à 953, `cave-voutee-table` 598 à 953, `tabouret-cuivre` 683 à 953, `cave-table-detail` 598 à 953, `atelier-ecriture` 662 à 953 ; la serveuse de `d-02-scroll` est visiblement molle. Correction : limiter ces cases à 600 px de large (mosaïque) ou les passer en vignettes, garder les photos de 1024 px et plus pour les grandes cases.
- **F2-7 · statut d'ouverture incohérent avec la boutique.** `setup.ts:64-80` ne lit que les créneaux de 19:00 : jeudi 17:00 donne « Fermé pour l'instant, ouverture ce soir à 19h » alors que la boutique est ouverte dès 16h (`site.ts` `LIB_SEMAINE`, dossier). Correction : formulation « Boutique ouverte, cave à manger dès 19h » entre 16h et 19h (samedi dès 10h30).
- **F2-8 · procédures déduites.** « On en parle de vive voix » (`soirees`, Privatisation), « Dates à demander à la maison » (soirées aux bougies), « la table peut s'ouvrir à midi », gin « à la boutique » ne sont pas dans le dossier (seulement « sur demande »). Correction : « sur demande » seul, sans mode de contact inventé ; le téléphone et le SMS du site actuel sont, eux, prouvés.

### F3 finitions
- F3-1 : « Le soir, du jeudi au samedi soir » (`carte`, `reservation`) : redondance ; le WARN d'audit « phrase répétée » (horaires 3 fois, « Le menu se déguste tel quel… » 2 fois) tient à la même cause.
- F3-2 : coin gauche « ← Instagram » : une flèche gauche sur un lien externe (déjà noté dans RAPPORT.md) ; remplacer par « ↗ ».
- F3-3 : deux « Réserver » sur le premier écran desktop (hero et coin fixe, `d-01-hero`).
- F3-4 : téléphone écrit de deux façons, « 0476 62 01 82 » (`accroche.demande`) et « +32 476 62 01 82 » ailleurs.
- F3-5 : axe moderate sur 7 pages : `landmark-no-duplicate-contentinfo` (`footer` du site + kyw-footer) et `region` (`.coin--gauche`, hors repère) ; passer le `footer` du site en `div` et mettre les coins dans un `nav` ou `aside` étiqueté.
- F3-6 : traces de modèle : trois cartes égales (`soirees`) et trois colonnes d'avis (`histoire`), numéros décoratifs 01 à 04 dans « À savoir », surtitres au-dessus de presque chaque titre (« D'où ça vient », « Par famille », « Sur demande »).
- F3-7 : h1 de `/histoire/` = « Partager » (le `<title>` dit « Histoire et équipe »), `og.png` de 1,6 Mo, URL Facebook avec accents non encodés, « du 12 au 14 novembre 2026 » en dur (périmé dès le 15 novembre).

Faux positifs écartés : `skipLinkFirst: false` (le premier arrêt est « Aller au contenu »), WARN sitemap/robots/404 sans h1 (le vrai `404.html` a lang, title, h1, noindex), 17 `contrastNeedsReview` d'axe (titres en contour : trait cuivre #e29a62 sur #0a0a0c, environ 8,5:1), `noindex, nofollow` (conforme au prompt § 3.3), « illustratif » répété sur chaque vin (voulu, honnête).

## Ce qui est bien (à ne pas casser)
1. Le hero en trois volets et la flamme de bougie (`d-01-hero`) : identité propre, statut calculé lisible, 0 CLS ; mobile pensé (titre 11,4 vw, barre de coins en bas).
2. L'honnêteté des données : carte des vins marquée « illustrative » avec la fourchette réelle seule, formulaire déclaré « de démonstration », 404 designée (« Lumière éteinte »), mention et logo KYW partout.
3. La scène « D'où ça vient » épinglée (desktop et mobile) et les états techniques : 0 débordement sur 7 pages x 2 largeurs, clavier complet, reduced-motion sans texte caché.
