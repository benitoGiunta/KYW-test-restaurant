# Revue portfolio · Le D'Arville · passe 2
Verdict : A_CORRIGER (0 F0, 2 F1, 2 F2, 5 F3)

Lecture en une ligne de l'idée du site (sans DESIGN.md) : une maison de campagne gastronomique en vert sapin et cuivre, où un « rideau » (loader, transitions, chapitres) se lève sur de grands chiffres (2 menus, 73 €, 200 m, 20 ans) et sur les photos de la ferme, de la carte et de la villa Barabas.

Scores /10
- Design 6 : palette et grands chiffres tenus (planches 1440, `pA` `pB` `pC`), mais deux défauts de lisibilité visibles : texte sur photo de la home (contraste 1,1 à 2,6) et « 200 » qui recouvre le h1 de Barabas en mobile.
- Usabilité 7 : 0 débordement, 0 lien interne mort (16 liens, 8 pages), bande de galerie atteignable au clavier (15 Tab), CTA Barabas corrigé ; les deux défauts de lisibilité pèsent.
- Créativité 7 : rideau, compteur et chiffres de prix restent la signature ; eyebrow + chiffre décoratif sur chaque page inchangés (F3).
- Contenu 7 : plus aucun fait faux ni heure fictive en données structurées ; restent des renvois « nous les demander » non prouvés et un « Le site de la maison annonce » tourné vers le dossier.
- Technique 8 : build OK (8 pages, dist du 04:43 postérieur à `src/`), 0 erreur console, 0 requête en échec, CLS 0, LCP mobile 1344 à 1376 ms (CPU x4 + 4G, 2 passes), plus aucune image > 300 Ko, axe : 0 serious/critical.

Méthode : QA-revue2.md et ses planches lus (limité à accueil, carte, 404 brute) ; serveur propre port 4812 (PID 8706, arrêté) ; script maison (axe-core complet à 3 positions de défilement, console, requêtes, débordement, h1, lang, noindex, mention, logo, JSON-LD) sur 8 pages (404.html réel comprise) x 1440 et 390 px ; script ciblé (loader x2 bureau, loader et LCP/CLS CDP x4 + 4G x2, reduced-motion, Barabas, Tab vers la galerie, poids d'images, liens) ; 48 captures de fenêtre en planches PIL ; capture 390/360 de Barabas ; capture avec et sans texte de la section « Autour de la table » avec échantillonnage de pixels. Texte du `dist/` extrait et confronté à `donnees.json` et `dossier.md`.

## Vérification des corrections annoncées (REVISION-1)

| id | annonce | constat passe 2 |
|---|---|---|
| F1-1 | plus d'`openingHoursSpecification` | CONFIRMÉ : 0 occurrence sur 8 pages ; JSON-LD `Restaurant` conservé |
| F1-2 | langage de dossier réécrit | PARTIEL : « Estelle, co-propriétaire » (exact, `donnees.json:71`) ; « ne sont pas publiés » et « du dossier » disparus ; reste « Le site de la maison annonce aussi un menu Bon Plan » (`carte`) et « d'après l'affiche de la maison » (home, histoire), voir F2-2 |
| F1-3 | procédures retirées | PARTIEL : « retrait », « sur demande », « se prend au D'Arville » disparus ; « nous les demander » apparaît à la place (desserts sur `/menu/`, Bon Plan sur `/carte/`) et « s'ajoute à la demande » (`/carte/`), voir F2-2 |
| F2-1 | galerie focusable | CONFIRMÉ : `tabindex=0 role=region aria-label="Galerie, défilement horizontal"`, atteinte au 15e Tab, `scrollable-region-focusable` absent à 390 px |
| F2-2 | loader plus court | CONFIRMÉ en bureau : `is-loaded` 2027 et 2052 ms (< 2,6 s) ; reduced-motion : 0 texte caché sur 92 ; mobile bridé voir F3-1 |
| F2-3 | filigrane « 200 » lisible | CONFIRMÉ pour le contraste (axe : 0 `color-contrast`, `rgb(160,122,86)` sur `#1b3730`) mais RÉGRESSION en mobile, voir F1-1 |
| F2-4 | CTA Barabas | CONFIRMÉ : « Contacter Barabas sur Facebook » vers `facebook.com/LaSuiteDuDArville/` (URL du dossier), « Réserver au restaurant » vers `/reservation/` |
| F2-5 | images allégées | CONFIRMÉ : `hero-1800.webp` 270 Ko, `portrait-domaine.webp` 266 Ko, 15 images de la home, 0 > 300 Ko |
| F2-6 | « a fêté ses 20 ans en 2025 » | CONFIRMÉ (home et histoire) |
| F2-7 | phrases d'ambiance retirées | CONFIRMÉ : « lumière sur la brique » et « aux portes de Namur » absents du `dist/` |
| F2-8 | photo de traiteur | CONFIRMÉ : photo de salle sous « Traiteur de fêtes » (`evenements`, `pC`) |

## Findings

### F1 majeur
- **F1-1 · « 200 » recouvre le titre de `/barabas/` en mobile (régression de F2-3).** À 390 et 360 px, la boîte du filigrane `span[data-compteur="200"]` mesure x 0 à 208, y 34 à 208 ; le `h1` « Barabas » occupe y 161 à 202 et l'eyebrow « La petite sœur du restaurant » est dessous : 47 px de chevauchement. Depuis que le chiffre est en cuivre opaque (`#a07a56`, `base.css`), il masque l'eyebrow (« LA PET TE SO U DU RESTAURANT ») et se superpose au h1 en cuivre (capture `b-390-0`, `b-360-0`, planche `pF`). Axe ne le voit pas. Correction : en mobile, placer le chiffre au-dessus du bloc de titre (pas de position absolue sur le titre), ou le repousser hors du flux du titre, ou le masquer sous 600 px puisque « 200 mètres » est dans le texte.
- **F1-2 · texte illisible sur la photo de « Autour de la table » (home, bureau).** Le dégradé `.onglets::before` (`base.css:145`) et `.onglets__photos` ont tous deux `z-index: -1` ; les photos, plus loin dans le DOM, se peignent au-dessus du dégradé, qui ne sert donc à rien. Mesure sur capture sans texte (`o-sans.png`) après défilement à 1440 px : titre `petite-cap` cuivre 1,06 à 1,44 : 1 ; chapeau crème 1,07 à 1,69 : 1 ; onglets 1,45 : 1 ; texte du panneau 1,65 à 2,6 : 1. Vu sur `pG` et sur la planche home (vignette 5). Absent de la revue 1 et d'axe (fond image). Correction : `.onglets__photos { z-index: -2 }` pour que le dégradé passe au-dessus, et monter l'opacité intermédiaire (0,45 à ~0,8 vers 35 %) ; viser 4,5 : 1 au pire point. Le mobile (photo au-dessus, sans dégradé) n'est pas concerné.

### F2 mineur
- **F2-1 · renvois « nous les demander » non prouvés et langage tourné vers la source.** `/menu/` : « Prix des desserts : nous les demander. » ; `/carte/` : « Composition et prix : nous les demander. », « Le site de la maison annonce aussi un menu Bon Plan… », « L'accord mets, vins et café s'ajoute à la demande. ». Le dossier dit seulement prix et contenu inconnus ; aucune procédure « sur demande » n'y figure (leçon commune sur les procédures). La passe 1 (F1-3) demandait de retirer ces renvois, la révision les a reformulés. Correction : retirer la phrase des desserts ou la marquer « illustratif » ; Bon Plan : « Menu Bon Plan, jeudi soir, vendredi midi et samedi midi » sans composition ni renvoi ; « à la demande » : dire « en option, 40 € ou 50 € ».
- **F2-2 · axe `landmark-no-duplicate-contentinfo` (moderate) sur 8 pages x 2 largeurs.** Pied du site (`.footer`) et `kyw-footer` sont deux `<footer>`. Non traité en révision 1 (était F3-1). Correction : pied du site en `<section aria-label="Coordonnées">` ou `<div>`, sans toucher au composant KYW.

### F3 finition
- **F3-1** Loader mobile sous CPU x4 + 4G lente : `is-loaded` à 5596 et 5562 ms (bureau 2,0 s). Le plafond de 2,6 s n'est tenu qu'en bureau ; contrôler en conditions réelles et réduire la sortie (0,8 s) si besoin.
- **F3-2** `/menu/` s'intitule « La carte » et `/carte/` « Les menus » (URL et `<title>` inversés), inchangé depuis F3-2 de la passe 1.
- **F3-3** Chiffres décoratifs « 2 » (`/menu/`) et « 5 » (`/histoire/`) et eyebrow sur chaque page : motif répétitif (F3-3 de la passe 1, non traité).
- **F3-4** Gault&Millau 15/20 affiché sans la réserve du dossier (16/20 chez Trouve Ton Resto « à confirmer ») ; horaires du pied de page affichés sur les 8 pages sans « heures illustratives » (seules la home et `/reservation/` l'indiquent).
- **F3-5** « d'après l'affiche de la maison » (home) et « dit l'affiche de la maison » (histoire) : provenance du dossier lue par le visiteur ; écrire « fêté ses 20 ans en 2025 » seul.

## Ce qui est bien (à ne pas casser)
1. Données exactes : 55 lignes de carte, menus 73/90/28 €, accords 40/50 €, fromages 22 €, Barabas, congés 2027, kombucha et parking confrontés au dossier ; 0 fait faux, 0 heure en données structurées.
2. Socle propre : 8 pages, `lang="fr"`, un h1 par page, `noindex`, mention KYW et un seul logo sur chaque page, 0 console, 0 requête en échec, CLS 0, LCP mobile ~1,4 s, galerie au clavier, reduced-motion sans texte caché.
3. Signature tenue : rideau, compteur de chiffres, prix en grands chiffres sur `/carte/`, filigrane « 200 » en bureau (`pA`).

## Fichiers
Aucun fichier source modifié. Serveur 4812 (PID 8706) arrêté.
