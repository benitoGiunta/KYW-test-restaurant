# Revue awwwards · Le Panorama · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : brasserie au sommet de la Citadelle de Namur, titres géants en grotesque, ardoise et vert Meuse, et une « règle des heures » (8 h à 23 h) avec un soleil qui la parcourt au défilement, de la terrasse à la cave puis à la réservation.

Scores /10 :
- Design 8 : hiérarchie nette, photos pleine largeur de la Meuse et de la terrasse, alternance clair/ardoise (home d-01 à d-07, planche des pages 1440 et 390).
- Usabilité 8 : CTA « Réserver une table » et « Appeler » dans le héros et en fin de page, tel: et mailto: valides, 0 cible < 24 px, 45 liens et ressources testés (133 au total, 0 KO), Tab : lien d'évitement en premier puis nav, contour 2 px partout.
- Créativité 8 : la règle des heures est une vraie signature, reprise en pied de page, dans les horaires et en 404 (le soleil « perdu » hors de la règle, 404-1440.png).
- Contenu 7 : 44 plats et 5 formules confrontés à donnees.json, 0 écart de nom ni de prix ; textes propres au lieu ; mais horaires affirmés ici, « à confirmer » ailleurs, et quelques détails déduits des photos.
- Technique 8 : build OK (QA-revue1), 0 erreur console, 0 requête en échec, 0 débordement sur 15 cas (5 pages x 1440/390/360), LCP mobile CPU x4 + 4G : 2,2 s accueil (img 02-vue-meuse), 0,94 s carte, CLS 0, reduced-motion sans texte caché ; 1 violation axe serious (F1-1).

## Findings

### F1 (majeur)
- **F1-1 · Galerie mobile non atteignable au clavier.** axe `scrollable-region-focusable` (serious) sur `.final__mur` à 390 et 360 px, page d'accueil (mesure maison, axe-core 4.14, après défilement complet). Ce bandeau défile en `overflow-x: auto` + `scroll-snap` (`site.css:230`) sans élément focalisable. Correction : `tabindex="0"`, `role="group"` et `aria-label="Photos du lieu"` sur `.final__mur` (`src/pages/index.astro:102`), contour de focus visible.

### F2 (mineur)
- **F2-1 · Horaires : certitude incohérente.** Le héros dit « Ouvert tous les jours, de 8 h à 23 h. » sans réserve (`d-01-hero.png`, `m-01-hero.png`), le JSON-LD `openingHoursSpecification` donne 08:00-23:00 comme fait, et `/reservation/` affiche sept lignes identiques « 8 h à 23 h », alors que le pied de page, la section « Une journée sur la règle » et la note de `/reservation/` disent « à confirmer » et que le dossier signale « 8h-23h » contre « brasserie 11h-23h » (dossier.md, § Pratique). Correction : ajouter « (à confirmer) » dans la phrase du héros, ou la reformuler comme dans la section règle (« Horaires d'après le site officiel ») ; garder les petits-déjeuners 8 h à 10 h 30 comme fait.
- **F2-2 · Photos répétées sur l'accueil.** La terrasse sous les platanes (03) et la salle (01) apparaissent chacune deux fois (index « De la terrasse à la cave » puis mur final : alts identiques, `d-03-scroll.png`, `regle-1440-b.png`, `m-03-scroll.png`). Des photos libres existent (04 terrasse vue large, 11 longue table, 12 table et verres, 14, 20 guirlandes). Correction : remplacer les deux doublons du mur final.
- **F2-3 · Espaces insécables absentes avant la ponctuation haute.** Espace sécable avant « : », « ; » et dans « « raclette » » (accueil : « à l'entrée : les bouteilles… », « Yves Mattagne : apéro… », « à confirmer : la page… » ; histoire : « 2022 ; les journaux… » ; réservation : « 7 personnes : écrire… »). Conséquence visible : sur mobile le « : » ouvre une ligne (`m-03-scroll.png`, bloc « La cave »). Correction : U+00A0 avant « : ; ? ! » et à l'intérieur des « » dans `src/data/site.ts`, `index.astro`, `reservation.astro`.

### F3 (finition)
- **F3-1 · Redondance « Tous les jours, de 8 h à 23 h » puis « Lundi à dimanche ».** Dans le pied de page, sur les 5 pages (`d-07-scroll.png`). Supprimer la seconde ligne.
- **F3-2 · Histoire : intertitre et légende.** « Les noms derrière la carte » regroupe deux gérants et un chef extérieur, qui n'ont pas signé la carte ; la légende « En cuisine. » du portrait 18 affirme un lieu que `photos/index.json` ne donne pas (sujet : « homme en veste blanche, identité à confirmer »). Proposition : « Les personnes citées » ; légende « Portrait. » ou suppression.
- **F3-3 · Détail déduit d'une photo.** « devant les baies vitrées » dans le texte de La salle (`site.ts:43`) vient du sujet de la photo 11, pas du dossier (« 120 places intérieures supplémentaires »). Retirer ces mots.
- **F3-4 · Méta.** `404.html` : canonical vers `/404/` (adresse inexistante), à retirer ; JSON-LD identique sur toutes les pages (url de l'accueil), acceptable ; pas de robots.txt (sans effet, `noindex, nofollow` posé sur chaque page).
- **F3-5 · Poids.** Accueil ~1,9 Mo dont 1,8 Mo d'images ; les jpg de repli du dossier `_astro` atteignent 974 Ko (07-facade-pavillon) mais ne sont servis qu'aux navigateurs sans AVIF/WebP ; LCP tenu, pas d'action urgente.

## Non vérifié (limites)
- Contraste : axe laisse 33 (accueil) et 23 (carte) nœuds « à vérifier » sans violation ; pas de mesure par canvas 1x1 de ma part (texte `--c-nuit-muted` 7,6:1 et `--c-muted` 5,3:1 annoncés par `tokens.css`).
- Survol, transitions de page et loader : lus dans QA-revue1.md seulement (pas de curseur suiveur, pas de changement de couleur seule au survol).
- Pages histoire et réservation : captures de fenêtre à 1440 et 390 px par moi (3 positions de défilement chacune), pas de shoot complet.

## Ce qui est bien (à ne pas casser)
1. La règle des heures : signature unique, déclinée héros, horaires, pied de page et 404, lisible à 390 px (`m-01-hero.png`, `regle-390-a.png`).
2. Carte : 44 plats, 5 formules, 0 écart de prix ni de nom avec donnees.json (prix « 39,00 € / 75,00 € » du homard conservés), navigation latérale active par rubrique (`d-01-hero.png` de `/carte/`).
3. Honnêteté du contenu : aucun avis ni note inventé, désaccord des sources sur la date d'ouverture assumé dans le texte, mention « Maquette KYW… », logo KYW unique et noindex sur les 5 pages.
