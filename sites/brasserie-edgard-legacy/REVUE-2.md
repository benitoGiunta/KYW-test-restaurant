# Revue legacy · Brasserie Edgard · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie de quartier présentée par sa façade de nuit, sur fond crème, avec une carte à prix lisibles en serif et des blocs de réservation répétés ; propre, sobre, peu mémorable (inchangé depuis la passe 1).

Scores /10 :
- Design 6 : inchangé, hiérarchie calme (`home/d-02-scroll.png`, planche `rev2ed-m-fulls.png`), palette crème et marron par défaut.
- Usabilité 7 : 0 débordement (scrollWidth = fenêtre) sur 7 pages x 1440/390/320 px, `skip=true`, un `h1` par page.
- Créativité 5 : inchangé, le bandeau « À très vite, Chaussée de Waterloo. » ouvre toujours le pied de chaque page (F3-4 non traité).
- Contenu 6 : « NaN € », prix à deux portions et rubrique dessert corrigés, mais la correction de F1-1 fait apparaître « 11.50 / 12.50 » brut (F1-1b) ; 100 des 102 nombres de prix présents.
- Technique 7 : build OK, 0 erreur console, 0 requête en échec, 0 image cassée, 0 alt manquant, JSON-LD sur 7 pages, mais `region` (moderate) sur les 21 vues (F2-2b).

Méthode : `QA-revue2.md` n'existe pas (le `summary.json` du QA ne couvre que l'accueil, `la-carte` et la 404 en `shootFailed`). `dist` (21:44) postérieur à `REVISION-1.md` (21:42) et à `src/` (`find -newer` vide) ; captures d'accueil du QA (21:46) postérieures au dist, réutilisées (planche `rev2ed-home-m.png`). Script maison `rev2-edgard-legacy-mesure.mjs` (axe-core complet de node_modules, console, requêtes, débordement, cibles, balises, texte) : 7 pages dont `404.html` réel x 1440/390/320 px ; planche `rev2ed-m-fulls.png` (carte, fin de lunch, menu groupe à 390 px). Sloplint et mesure LCP/CLS non relancés (budget ; CSS modifié seulement par `.portion`, rév. 1 : LCP 1,9 s, CLS 0,018).

## Vérification des corrections annoncées par REVISION-1
- F1-1 NaN : confirmé, `grep -c NaN` = 0 sur 7 pages ; « Prix du jour » rendu sans « € » (carte, Le coin du poissonnier). Mais voir F1-1b.
- F1-2 portions : confirmé, « 1 pièce 18,60 € / 2 pièces 23,90 € », « 1 pièce 15 € / 2 pièces 25,60 € », « 1 pièce 10,90 € / 2 pièces 16,10 € » (capture 390 px `rev2ed-home-m.png`), pas de débordement à 320 ni 390 px. Reste un « 15 € » sans décimales à côté de « 25,60 € » (F3-5).
- F2-1 JSON-LD : confirmé, 1 bloc `Restaurant` par page (7/7), adresse, téléphone, e-mail, `openingHoursSpecification` 10:00-22:30 7 jours, pas d'`aggregateRating`, JSON valide (`json.loads`).
- F2-2 contentinfo : partiellement. `landmark-no-duplicate-contentinfo` a disparu (1 `<footer>` par page) mais axe signale désormais `region` (moderate) sur `.close` (`Footer.astro:7`, `<div role="group">`), 21 vues sur 21 (la révision n'avait pas relancé axe). Voir F2-2b.
- F2-3 menu groupe : confirmé, accueil « Plus de dix personnes, la maison dresse une grande table, seize au maximum » ; formulaire `Participants` 11 à 16 ; option « À la carte réduite » absente du dist ; la page menu groupe porte le plafond de 12 (vendredi soir, samedi soir, dimanche midi, jours fériés) au-dessus du formulaire. Le plafond de 12 reste absent de l'accueil (hypothèse de la révision acceptable).
- F2-4 dessert : confirmé, section « Au dessert », « Crumble d'automne aux amandes, Pommes, poires et raisins, 11,50 € », hors du bloc moules (`rev2ed-m-fulls.png`, colonne centrale).
- F2-5 refusé : justifié. Le lien visible de `site-actuel/page.html` est `…Brasserie_Edgard-Namur…` (1 href), identique au site ; `Brasserie_Mr_Edgard` n'est que dans le JSON-LD de la source. Pas de défaut.

## Findings
**F1-1b · T-faux · prix texte rendu brut.** `/la-carte/`, rubrique Desserts, « Sabayon minute au Marsala, avec ou sans glace » affiche « 11.50 / 12.50 » (point décimal, sans « € », `rev2ed-m-fulls.png` colonne gauche ; `site.ts:30` `return t` du repli ajouté par F1-1). donnees.json : `"prix": "11.50 / 12.50"`. Avant la révision `parseFloat` affichait « 11,50 € » (12,50 € perdu). Correction : dans `prix()`, remplacer chaque nombre d'un texte libre par `fmt(...)` : « 11,50 € / 12,50 € » (ne pas inventer quel prix va avec ou sans glace). Vérifier : `grep -c '11.50' dist/brasserie-edgard/legacy/la-carte/index.html` = 0. Le contrôle « 0 NaN » de la révision ne couvrait pas ce cas ; ma vérification de nombres seule ne le voit pas non plus (« 11,50 € » existe ailleurs) : chercher les prix à point décimal.

**F2-2b · Accessibilité · `region` (moderate) sur `.close`, 21 vues sur 21.** Le pied du site est un `<div role="group" aria-label="Coordonnées et liens">` hors `<main>` : axe demande que tout contenu soit dans un landmark. Correction : `<section class="close" aria-label="Coordonnées et liens">` (région nommée) ou le placer dans `<main>` ; ne pas retoucher `kyw-footer`. Vérifier par axe complet : 0 violation.

**F3-1 · (non traité, rappel)** : 7 guillemets « suivis d'une espace sécable dans le dist (guillemet orphelin visible en fin de ligne : « Épaule de porcelet rôtie «/Porketto » » à 390 px, `rev2ed-home-m.png` ; « laque du feu de dieu/» sur menu groupe, `rev2ed-m-fulls.png`). U+00A0 après « et avant ».

**F3-5 · Typographie des prix** : « 1 pièce 15 € · 2 pièces 25,60 € » mélange deux formats ; afficher « 15,00 € » (ou aligner tous les prix entiers de la carte).

**F3-2, F3-3, F3-4 · non traités** (polices externes, survol sans changement visible sur 2 cibles, bandeau de pied répété ; voir REVUE-1.md).

Vérifié sans écart : mention « Maquette KYW, certaines données sont illustratives », 1 logo KYW et `noindex` sur 7 pages ; `lang="fr"`, un `h1`, `<title>` et description présents, OG, canonical, favicon ; 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth) à 1440, 390 et 320 px ; adresse, téléphone, e-mail et horaires du JSON-LD conformes à donnees.json.
Non mesuré : contraste (les « à vérifier » d'axe, 3 à 9 par page à 1440/390, sont identiques à la passe 1 où le contraste nœud par nœud était à 0 sous le seuil ; le CSS n'a changé que pour `.portion`).

## Ce qui est bien (à ne pas casser à la révision)
1. Les lignes à deux portions : une portion par ligne, alignées à droite, titre jamais écrasé à 390 px.
2. Le JSON-LD : complet, sans avis inventé.
3. Section « Au dessert » de la page lunch : propre, prix 11,50 € conforme.
