# Revue portfolio · Pépite, cave à manger · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 1 F2, 10 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une cave à manger de nuit, noire, titres en contour cuivre, flamme de bougie qui suit le curseur, hero en trois volets (cave, titre, vitrine), compteur d'heure en guise de loader et boutons « Instagram » et « Réserver » fixes dans les coins.
Scores /10 :
- design 8 : mosaïque réordonnée sans agrandissement visible sauf le dessert (`d-02-scroll`, `d-03-scroll`), hero tenu (`d-01-hero`), mobile composé (`m-01-hero` à `m-06-scroll`).
- usabilité 8 : loader desktop 2,0 s (2020 et 2089 ms, avant 2,9 s), loader absent sur mobile (`display: none`, h1 visible à 1,5 s sous CPU x4 + 4G lente), 0 cible < 24 px, statut juste sur 8 horloges testées.
- créativité 8 : flamme, statut calculé et compteur d'heure restent propres au lieu ; scène « D'où ça vient » intacte (`d-05` à `d-07`, `m-04`).
- contenu 7,5 : 5 corrections de texte vérifiées contre `donnees.json` (citations intégrales, 01 à 05 avec supplément « + », URL Tablebooker, 19:00 seul au compteur) ; reste « la table peut s'ouvrir à midi » (F2-1).
- technique 8,5 : build OK (7 pages), 0 erreur console, 0 requête en échec, 0 débordement (7 pages x 1440 et 390), axe 0 serious/critical (2 moderate, inchangés), CLS 0,001, LCP mobile 1240 ms, noindex, mention et logo KYW sur 14 pages-largeurs.

Preuves : dist (13:43) postérieur à src (aucun fichier de `src/` plus récent) ; QA-revue2.md (13:52) et captures (13:43 à 13:47) postérieurs au dist, réutilisés ; plus 4 scripts maison (QA axe-core de node_modules sur 7 pages x 2 largeurs après défilement à la molette ; loader et compteur desktop x2 et mobile ; statut avec horloge fixée sur 8 instants ; mobile throttlé 1,5 à 4,5 s), liens internes, 404.html réelle (200, `lang=fr`, title, 1 h1, noindex), texte rendu des 6 pages relu contre `donnees.json` et `dossier.md`.

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 | corrigé | compteur du loader = « 19:00 » seul (échantillonnage) ; statut sans heure de fin (« Cave à manger ouverte ce soir ») ; `data-a` retiré de `Loader.astro` |
| F1-2 | corrigé | desktop 2020 et 2089 ms (seuil 2,6 s) ; mobile : loader `display: none`, h1 opaque et en place dès 1,5 s, `is-loaded` posé à la fin du `load` ; le `loaderMs` mobile de report.json (3960 ms) n'est que la durée du `load` sous 4G lente, sans écran bloquant |
| F2-1 | corrigé | `histoire` : « Le saumon est une merveille. » et « On y a fait un repas d'équipe. » présents ; 3e citation sans point ajouté, identique à `extraits_avis` |
| F2-2 | corrigé | « Lundi au mercredi », « Jeudi et vendredi » dans les 6 pieds de page |
| F2-3 | corrigé | `carte` et accueil : 01 à 04, « + Assortiment de fromages 12 € Supplément », 05 Pomme au four |
| F2-4 | corrigé | `histoire` : nom et rôle seuls, plus de cadre vide (`m-` et `d-` sans carré) |
| F2-5 | corrigé | `reservation` et JSON-LD `acceptsReservations` : `reservations.tablebooker.com?modal=0&lang=fr&source=website&restaurantId=50470946&theme=light`, identique à `site-actuel/page.html` |
| F2-6 | corrigé en partie | `up` mesuré : seul `dessert-assiette` 690 px à 953 (concession annoncée, 1,4x) ; mais `couvert-table` (histoire) et `vitrine-logo` (soirées) 1024 px à 1440 (voir F3-8) |
| F2-7 | corrigé | horloge fixée : jeu 17h « Boutique ouverte, cave à manger dès 19h » ; jeu 20h « ouverte ce soir » ; ven 15h « Fermé pour l'instant, ouverture ce soir à 19h » (boutique ouvre à 16h, juste) ; sam 11h « Boutique ouverte… » ; mar et dim « prochain service jeudi soir à 19h » |
| F2-8 | corrigé en partie | « de vive voix », « Dates à demander » et gin « à la boutique » ont disparu ; reste « la table peut s'ouvrir à midi » (F2-1) |
| F3-4 | corrigé | `+32 476 62 01 82` partout (6 pages) |

## Findings

### F2 mineur
- **F2-1 · T-invente · « la table peut s'ouvrir à midi ».** `src/data/site.ts:162` (carte « Samedi midi » de `soirees`, reprise dans le bloc « Samedi midi et privatisation » de l'accueil) : `donnees.json` dit seulement « samedi midi et privatisation sur demande ». Dire que « la table peut s'ouvrir » est une déduction (le dossier ne parle pas de la table de midi). Correction : « Le samedi, la boutique ouvre dès 10h30 ; le midi, sur demande. »

### F3 finitions
- F3-1 : « Le soir, du jeudi au samedi soir » (`carte`, `reservation`) : redondance (déjà en F3-1 de la passe 1) ; les WARN « phrase répétée » de l'audit (horaires 3 fois, « Le menu se déguste tel quel… » 2 fois) restent.
- F3-2 : « ← Instagram » (coin gauche, `m-` et `d-`) : flèche gauche sur un lien externe ; mettre « ↗ ».
- F3-3 : axe moderate sur 7 pages x 2 largeurs : `landmark-no-duplicate-contentinfo` (`.footer` du site + kyw-footer) et `region` (`.coin--gauche > span`) ; `footer` du site en `div`, coins dans un `nav` ou `aside` étiqueté.
- F3-4 : h1 de `/histoire/` = « Partager » alors que le `<title>` dit « Histoire et équipe » (le h1 reprend un mot de la patronne, hors sujet de la page).
- F3-5 : `og.png` de 1 634 282 octets (1,6 Mo) ; à ramener sous 300 Ko.
- F3-6 : « Menu 5 services du 12 au 14 novembre 2026 » en dur (`carte`), périmé dès le 15 novembre (le dossier date le menu, mais la maquette vit plus longtemps).
- F3-7 : le statut « Fermé, prochain service demain soir à 19h » (jeudi 23h30) et « ouverte ce soir » jusqu'au bout reposent sur la fermeture illustrative 23:00 gardée en interne (`setup.ts`) : jamais affichée, mais elle décide d'un message ; le dossier n'a pas de fermeture. Acceptable si commenté, à noter en hypothèse.
- F3-8 : `couvert-table.webp` (histoire) et `vitrine-logo.webp` (soirées) de 1024 px affichés à 1440 px pleine largeur (1,4x, légèrement mous).
- F3-9 : « Stationnement difficile dans la rue : prévoyez le parking du Casino. » (accueil) vient d'un avis TripAdvisor (`dossier.md`), présenté comme conseil de la maison ; à marquer « selon des clients » ou retirer. « la presse l'a remarqué très vite » (`histoire`) interprète 2017 à 2018.
- F3-10 : traces de modèle conservées : trois cartes égales (`soirees`), trois colonnes d'avis (`histoire`), numéros décoratifs 01 à 04 dans « À savoir », surtitres au-dessus de presque chaque titre (« D'où ça vient », « Par famille ») ; deux « Réserver » au premier écran desktop.

Faux positifs écartés : `hid` 3 éléments à opacité 0 sur l'accueil et `histoire` (phrases de la scène épinglée `origin__phrase`, états de scène hors champ, pas un texte caché en reduced-motion : QA `hiddenElements` 0) ; 404 du QA sans title/lang (réponse brute de `serve.mjs` ; la vraie `404.html` a lang, title, h1, noindex) ; WARN sitemap/robots ; 17 `contrastNeedsReview` (titres en contour cuivre sur noir, environ 8,5:1) ; `noindex, nofollow` (conforme au prompt § 3.3).

## Ce qui est bien (à ne pas casser)
1. Le hero en trois volets, la flamme de bougie et le statut calculé (8 horloges justes), loader court sur desktop et absent sur mobile.
2. L'honnêteté des données : carte des vins « illustrative » avec la fourchette réelle seule, formulaire « de démonstration », URL Tablebooker réelle, citations intégrales, mention et logo KYW partout.
3. La scène « D'où ça vient » épinglée et la mosaïque réordonnée sans photo agrandie au-delà de 1,4x dans les petites cases ; 0 débordement sur 7 pages x 2 largeurs.
