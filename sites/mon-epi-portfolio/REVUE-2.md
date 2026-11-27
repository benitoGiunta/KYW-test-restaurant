# Revue portfolio · Monepi (mon-epi) · passe 2
Verdict : A_CORRIGER
(0 F0, 0 F1, 3 F2, 7 F3. Build OK, 0 erreur console, 0 requête en échec, 0 lien mort, 0 débordement, 0 violation axe critique ou sérieuse, 0 contraste sous le seuil. Les 3 F1 et les 7 F2 de la passe 1 sont corrigés comme annoncé ; le verdict reste A_CORRIGER parce que la révision a laissé deux procédures déduites non prouvées par le dossier (F2-8, F2-9) et que les étiquettes au-dessus des titres ne sont retirées qu'à moitié (F2-10). Corrections de quelques mots : PUBLIABLE ensuite.)

Lecture en une ligne de l'idée du site : inchangée, un cahier de fournée tenu à la main (papier quadrillé, machine à écrire, notes à la bille, polaroids, tampons) où pain, levain et four à bois se lisent comme les pages d'un carnet de boulanger.

## Preuves et méthode
- Fraîcheur : `dist/` (08:45) postérieur à `REVISION-1.md` (08:44) ; `find -newer` sur `src/` et `public/` vide ; captures du QA (`.shots-mon-epi-portfolio-revue2/`, 08:50 à 08:53) postérieures au dist : réutilisées (accueil, une fiche `pains`, 404). `QA-revue2.md` absent : `summary.json` lu directement (0 erreur, 0 débordement, LCP mobile 2 092 ms accueil et 1 064 ms `pains`, CLS 0, 60 fps, axe sérieux 0 ; sa « 404 » est la réponse brute de `serve.mjs`, son `color-contrast` x2 et sa cible de 1 sont des faux positifs : la vraie `404.html` est mesurée plus bas).
- Planches ouvertes : accueil (4 desktop + 4 mobile), `pains` (3 desktop + 2 mobile), 404 (brute et vraie sur mobile), `points-de-vente` et `commander` à 1440 px (captures maison).
- Script maison, serveur propre (port 4891), 7 pages (dont `404.html` réelle) × 1440, 768 et 390 px = 21 cas, après défilement par 300 px et 2,3 s de repos : axe-core complet de `node_modules`, console, requêtes, débordement (`right` de chaque élément de `main`/`header`/`footer`), cibles < 24 px, images cassées ou sans alt, balises. Résultat : 0 erreur, 0 requête en échec, 0 débordement, 0 cible < 24 px, 0 image cassée, 1 `h1` partout, `lang="fr"`, `noindex` 21/21, mention « Maquette KYW… » 21/21, un seul logo KYW 21/21, un seul `<footer>` 21/21, descriptions 124 à 165 caractères. Axe : une seule violation, `landmark-unique` (moderate) sur l'accueil aux 3 largeurs (F3-5).
- Contraste mesuré nœud par nœud (canvas 1×1 + opacité cumulée, 7 pages × 1440 et 390 px, 26 à 171 nœuds par cas) : 0 nœud sous le seuil, y compris `.annot` et `.tampon--rouge` (couleurs d'origine 4,26:1 et 4,10:1 devenues `#4f4c46` et `#c43526`). F2-5 est levé.
- Texte extrait du `dist` (7 pages) et grep : « la liste change », « site actuel », « Ce qu'on sait », « règle du cahier », « depuis 1992 », « Ouverture confirmée », « c'est confirmé », « commande en ligne », « Ce qu'on a écrit » : 0 occurrence. `monepi.be` ne reste que dans les 3 sources d'avis (petit texte), le JSON-LD et les liens du pied. Dates 1990 et 1992 conformes au dossier (`boulanger`, carte postale, tampon).
- Faits revérifiés contre `dossier.md` et `donnees.json` : 1996 (meules), 4 farines et taux (75, 65, 75, 80 %), moulins, four de 75 cm, Dirk Longin « gérant » (BCE), adresse, téléphone `+32 491 18 29 35`, vendredi 9 h à 18 h, 4 points de vente avec leur commune : 0 écart. Prix et compositions de la carte : revus en passe 1, `src` des données inchangé.

## Vérification des corrections annoncées par REVISION-1
| id | annoncé | constat |
|---|---|---|
| F1-1 | corrigé | confirmé : `pains` dit « Selon les saisons et les évènements, la boulangerie propose aussi des pâtisseries. » |
| F1-2 | corrigé | confirmé sur `points-de-vente`, `farines` et les notes de marge de l'accueil (« taux annoncé par la boulangerie », « moulin partenaire ») ; la section « Ce qu'on sait » et son tampon n'existent plus |
| F1-3 | corrigé | confirmé : « Dans la liste des pains » + « Chaque ligne de la liste des pains donne sa composition, telle que publiée par la boulangerie. » |
| F2-1 | corrigé | confirmé (carte postale, tampon, page boulanger) |
| F2-2 | corrigé | confirmé : « Ce qu'en disent les clients » |
| F2-3 | corrigé en partie | « Ouverture confirmée » et « c'est confirmé » retirés, pied réduit à « Ouvert le vendredi, 9 h à 18 h » ; reste sur l'accueil la phrase « les autres jours sont à confirmer avec la boulangerie » suivie, deux blocs plus bas, de « Les autres jours ne sont pas publiés… » puis du tableau (F3-7) |
| F2-4 | corrigé | confirmé : plus de « pas de commande en ligne » ; le téléphone et l'adresse suffisent |
| F2-5 | corrigé | confirmé par la mesure canvas (0 sous le seuil) |
| F2-6 | corrigé | confirmé : 1 `<footer>` par page, plus de `contentinfo` ni de `region` ; effet de bord : `landmark-unique` sur l'accueil (F3-5) |
| F2-7 | corrigé en partie | numéros 01 à 05 retirés de `boulanger`, étiquettes retirées sur Sommaire, Farines, En marge, Pratique ; il en reste (F2-10) |

## Findings (triés par gravité)

### F2 mineurs
- **F2-8 · procédure déduite et répétition, `src/pages/points-de-vente.astro:14` et `:30`** : « Gamme et horaires de ces points de vente ne sont pas publiés : on les demande sur place. » puis, sous la grille, « Horaires et gamme : à demander sur place. » Le dossier dit seulement que ces points de vente sont listés ; « sur place » est une procédure non prouvée (liste du dossier : adresses seules). Le paragraphe du bas répète en plus les quatre noms déjà en cartes juste au-dessus (capture `rev2e-pdv-1440.png`). Correction : lead « La boutique de la boulangerie à Loyers, et quatre autres adresses qui vendent son pain. » ; supprimer le paragraphe du bas (ou le réduire à « Gamme et horaires : non publiés. ») ; retirer « on les demande sur place ».
- **F2-9 · procédure déduite, accueil (bloc « Au fournil ») et `src/pages/commander.astro:34`** : « Les autres jours ne sont pas publiés par la boulangerie : appelez le +32 491 18 29 35 avant de passer. » et « Pour les autres jours, appelez avant de passer. » Le dossier ne dit pas d'appeler avant de passer (seul « réservation par téléphone »). Correction : « Les autres jours ne sont pas publiés par la boulangerie. » (le numéro est déjà dans les boutons).
- **F2-10 · AI slop résiduel (reste de F2-7)** : une étiquette mono en capitales reste au-dessus de presque chaque titre de page (« CAHIER DU FOURNIL, SOMMAIRE », « …, ADRESSES », « …, COMMANDES », « LE BOULANGER » au-dessus de « Une main, un four » sur l'accueil, « QUI FAIT LE PAIN » sur `boulanger`), plus le soulignement jaune sous chaque h2. Le cadre « cahier » justifie les étiquettes de tête de page, pas celles des sections de l'accueil. Correction : retirer « LE BOULANGER » (accueil) et « QUI FAIT LE PAIN », garder les têtes de page.

### F3 finitions
- **F3-1 · grille points de vente (non traité, passe 1)** : à 1440, 4 colonnes pour 5 cartes, « L'épicerie d'Ernest » seule sur la 2e ligne ; 3 cartes quasi vides (`rev2e-pdv-1440.png`). Passer à 5 colonnes ou à deux colonnes.
- **F3-2 · canonical de la 404 (non traité)** : `dist/mon-epi/portfolio/404.html` pointe vers `/mon-epi/portfolio/404/` (inexistant) ; sans effet SEO (noindex) mais à retirer dans `Base.astro`.
- **F3-3 · survols par la couleur seule (non traité)** : `summary.json` `noHoverChange: 1`, `colorOnly: 3` (accueil), `colorOnly: 4` (`pains`) ; ajouter un soulignement ou un décalage d'un pixel.
- **F3-4 · adresse sans code postal en en-tête (non traité)** : « Rue Es Fays 43, Loyers (Namur) » dans la barre du haut contre « 5101 Loyers » dans le pied et le JSON-LD.
- **F3-5 · `landmark-unique` (moderate), accueil, 3 largeurs** : `section.couverture` (`aria-labelledby="h1"`, nom « Monepi ») et la section du pied (`aria-labelledby="dos-titre"`, « Monepi ») portent le même nom ; effet de bord de F2-6. Donner au pied `aria-label="Coordonnées"`.
- **F3-6 · plan de `commander`** : le libellé « ici, au n° 43 » est croisé par le trait de la route (capture `rev2e-cmd-1440.png`) ; décaler le texte de ~20 px.
- **F3-7 · répétitions résiduelles** : accueil, « les autres jours sont à confirmer avec la boulangerie » puis « Les autres jours ne sont pas publiés… » à deux blocs d'écart (garder une seule phrase) ; `farines` dit deux fois « annoncé par la boulangerie » (note de marge du blé demi-gris et phrase de bas de page).

## Ce qui est bien (à ne pas casser)
1. Le concept de cahier de fournée et le tracé manuscrit « Au fournil » : intacts après la révision, mobile à 390 px composé (burger, CTA pleine largeur, 0 débordement de 1440 à 390).
2. Données honnêtes : seul le vendredi publié, « à confirmer » pour le reste, avis cités avec auteur et source, plus aucune mention du site actuel dans le texte client.
3. Technique propre : LCP mobile 2,1 s, CLS 0, 60 fps, 0 erreur, 1 seul pied de page, contrastes tous conformes après la correction des teintes.
