# Revue awwwards · Escale en Vue ! · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1 ; 1 F2 et 5 F3 restants, voir plus bas)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : inchangée depuis la passe 1, une terrasse au-dessus de la vallée où un soleil orange glisse sur le trait d'horizon de chaque page et descend avec le défilement, sur bleu pâle et vert du soir, titres géants en Anybody.
Scores /10 :
- Design 7 : composition inchangée ; la bol-salade n'est plus agrandie (cadre portrait 382 px, `home_d-2.png`), la ligne de saison est lisible dans le héros (`home_d-0.png`, `home_m-0.png`).
- Usabilité 8 : « Saison 2026 du 19 juin au 6 septembre, terminée. Dates de la prochaine saison non communiquées. » est dans le premier écran (bas de la ligne à 534 px sur 900, 554 px sur 844, 571 px à 320 px ; CTA « Appeler » à 703 px, 705 px mobile) et en tête de la page Réserver.
- Créativité 7 : soleil-horloge et transition inchangés, rien cassé.
- Contenu 8 : faits conformes à `donnees.json` (adresse, tél., e-mail, horaires, réseaux, saison terminée), plus de procédure ni de géographie inventées, plus de ligne « titulaire » dans « Sur place ».
- Technique 8 : build vert (dist 02:48 postérieur à tout `src/`), 0 erreur console, 0 requête en échec, 0 débordement (5 pages x 1440/390/320), LCP mobile (CPU x4, 4G, 2 passes) 1024/1064 ms home, 980/996 carte, 976/996 a-propos et réservation ; CLS 0,018 home, 0,001 ailleurs ; 1 violation axe moderate nouvelle (F2-1).

Méthode : captures de l'agent captures incomplètes (`QA-revue2.md` : accueil partiel, pas de report.json), donc non utilisées comme preuve. Mesures par script maison sur le dist courant servi sur un port propre (axe-core de node_modules, 5 pages x 3 largeurs, console, requêtes, débordement, cibles, images, LCP/CLS CDP x2, tailles de police du héros) + planches `rev2/` (accueil bureau et mobile, réservation, carte) + grep sur le dist. Hors périmètre non refait : reduced-motion, clavier, hover (inchangés, les fichiers touchés par la révision n'y interviennent pas).

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 | confirmé | `reservation/index.html` : « L’apéro planchette est servi du jeudi soir au dimanche midi. » ; « sur place » n'apparaît plus que dans l'intitulé « Sur place » de a-propos |
| F1-2 | confirmé | `.hero__saison` 18 px (bureau) / 16 px (mobile), dans le héros à 534/554/571 px ; page Réserver : saison en tête + « En saison, le plat maison se réserve par téléphone… » (conforme à `reservation.outil` : téléphone, plat maison sur réservation) |
| F2-1 | confirmé | 0 « Meuse », 0 « colline de Dave » dans le dist ; « posés à Dave » / « au-dessus de la vallée » |
| F2-2 | confirmé | 0 « Evrard » dans le dist |
| F2-3 | confirmé | `data-intro` : 0 sur carte ; LCP mobile carte 2652 ms vers 980/996 ms ; CLS 0,001 |
| F2-4 | partiel | plus de `landmark-no-duplicate-contentinfo` ; une seule `<footer>` par page ; mais le `<section aria-label="Contact">` du pied et `.reserver` de la page Réserver portent le même nom : voir F2-1 ci-dessous |
| F2-5 | confirmé | bol-soleil rendu 382 x 509 (bureau, natif 382) et 350 x 467 (mobile) : plus d'agrandissement ; plus de vignette sur « Plat du jour maison » (carte : seules planchette et trappistes ont une vignette de 173 px) |
Contrôle au passage : `<title>`/description uniques, `noindex, nofollow`, mention « Maquette KYW… » et un seul `kyw-signature` sur les 5 pages ; liens internes 200, tel/mailto/OSM/Facebook/Instagram/kyngroup identiques à la passe 1 ; JSON-LD `Restaurant` avec `openingHoursSpecification`.

## Findings
### F0 / F1 : aucun

### F2 (mineur)
- **F2-1 · Accessibilité · `src/pages/reservation.astro:14` et `src/components/Footer.astro`** : axe `landmark-unique` (moderate) sur `/reservation/` aux 3 largeurs (1440, 390, 320), nœud `.reserver` : deux `<section aria-label="Contact">` (le bloc de réservation et le pied du site) créés par la correction F2-4/F1-2. Correction : renommer le bloc de réservation (`aria-label="Réserver"`), ou retirer son `aria-label` si un titre le nomme déjà.

### F3 (finitions, non traités par la révision : hors liste)
- F3-1 : pas de `robots.txt` dans `dist/escale-en-vue/awwwards/` (`ls` : absent) ; `noindex, nofollow` présent dans le `<head>`.
- F3-2 : h1 « Escale en vue ! » contre « Escale en Vue ! » dans `<title>`, header et pied.
- F3-3 : « Toutes les tables sont dehors » répété sur l'accueil (ligne du héros et grand titre juste dessous, `home_d-0`/`home_d-1`).
- F3-4 : lien-logo de l'en-tête à 29 px de haut (non remesuré, révision muette).
- F3-5 : léger vide sous le héros bureau (non remesuré, non traité).

## Ce qui est bien (à ne pas casser)
1. Le soleil-horloge sur le trait d'horizon, intact sur 5 pages, 0 débordement à 320 px.
2. La ligne de saison terminée dans le héros : honnête, lisible, sans casser le CTA ni le premier écran.
3. Perf : LCP mobile ~1 s partout, CLS 0,018 au pire, 0 requête en échec, images non agrandies.
