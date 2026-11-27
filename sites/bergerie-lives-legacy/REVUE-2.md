# Revue legacy · La Bergerie de Lives · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : maison d'hôtes et domaine de mariage, vert forêt, titres en serif Prata, boutons vert citron, listes d'index sobres ; inchangé depuis la passe 1, cohérent et sans slop.

Périmètre : vérification des corrections annoncées par REVISION-1.md (F1-1, F2-1 à F2-5), sans refaire la QA complète. Fraîcheur : `dist/` (08:55) postérieur à REVISION-1 (08:52) ; aucun fichier de `src/` ni `public/` plus récent que `dist/` ; QA-revue2.md (09:00) postérieur au build, donc réutilisé. Serveur propre sur le port 4893 (PID 10483, arrêté). Mesures : 4 pages (accueil, mariage-et-location, reservations, 404.html réel) × 1440/1024/768/390/360 px = 20 cas ; axe-core complet de `node_modules` après défilement par 400 px ; contraste canvas sur chaque nœud texte (1440 et 390) ; mots de titres coupés par rectangles ; décompte pied, signature, noindex, mention, h1, lang ; captures `/reservations/` (1440, 390), `/` (390), `/mariage-et-location/` (1440) lues, planche d'accueil du QA lue.

Scores /10
- Design 7 : le titre cassé de /reservations/ est réparé, le reste est inchangé ; les vides verticaux (F3-5) demeurent.
- Usabilité 7 : cibles ≥ 24 px (0 sur 20 cas), clavier du QA sans blocage, libellés de sortie vers le site d'origine désormais honnêtes sauf un bouton (F2-1).
- Créativité 5 : inchangé, cohérent mais convenu ; aucun slop.
- Contenu 7 : 0 fait faux, 0 invention nouvelle (« 30 minutes » est dans dossier.md et le texte du site actuel) ; une promesse de brochure persiste (F2-1) et la répétition de copie (F3) n'est pas traitée.
- Technique 9 : 0 erreur console, 0 requête en échec, 0 débordement, 0 violation axe sur 20 cas (une seule entrée « à vérifier » `color-contrast` sur accueil et mariage, 0 cas réel au canvas), un seul `<footer>`, 1 h1, lang fr.

## Vérification des corrections annoncées
| id | annoncé | constaté |
|---|---|---|
| F1-1 | corrigé | CONFIRMÉ. `page.css:102` étend `#h-venir` sur 12 colonnes ; « Nous trouver » sur une ligne à 1440 (capture `br2/res-1440.png`) et à 390 (`br2/res-390.png`) ; script de rectangles de mots : 0 titre coupé ou de moins de 120 px sur 2 lignes, 20 cas sur 20. |
| F2-1 | corrigé | CONFIRMÉ. 1 `<footer>` par page (grep dist, 4 pages) ; `landmark-no-duplicate-contentinfo` absent aux 20 cas, pas de `region` ; signature KYW 1 par page, mention et noindex présents partout. |
| F2-2 | corrigé | CONFIRMÉ. « Sortie de cérémonie. » seule, vue sur la capture mariage ; l'ancienne phrase : 0 occurrence dans le dist. |
| F2-3 | corrigé | PARTIEL. « Ouvrir la brochure » : 0 occurrence ; « Voir la page sur le site d'origine » présent ; « Le PDF explicatif et tarifaire » : 0 occurrence. Mais le bouton du hero de /mariage-et-location/ s'appelle toujours « Brochure mariage » (`src/pages/mariage-et-location.astro:15`) et mène à la page entière (`https://www.bergerielives.be/mariage-et-location`), pas à un PDF (dossier.md : « brochure mariage (PDF non récupéré) »). Voir F2-1. |
| F2-4 | corrigé | CONFIRMÉ. « Photographies : site d'origine. » sur les 3 pages vérifiées (grep) ; ancienne mention : 0 occurrence. |
| F2-5 | corrigé | CONFIRMÉ. « Réserver une visite (site d'origine) » et « Réserver sur le site d'origine » sur /reservations/ (capture). |

Rien de cassé par la révision : liens internes du `dist/` 0 mort (4 cibles), 0 requête en échec, build antérieur aux captures.

## Findings

### F2 · mineurs
- **F2-1 · « Brochure mariage » promet un document qui n'existe pas dans la maquette.** `src/pages/mariage-et-location.astro:15` : bouton fantôme du hero, même cible que les boutons « Voir la page sur le site d'origine ». C'est le jumeau du libellé corrigé en F2-3, oublié par la révision. Correction : « Voir la page sur le site d'origine » (ou « Tarifs sur le site d'origine »).

### F3 · finition (non traités par la révision, rappel de la passe 1)
- **F3-1 · Deux boutons identiques vers la même cible.** `src/data/site.ts:89-90` : « Tarifs et informations » et « Calendrier mariage » ont tous deux le libellé « Voir la page sur le site d'origine » et le même lien ; différencier le libellé ou fusionner les deux lignes.
- **F3-2 · Répétition de copie.** « l'un des plus beaux moments de votre vie » encore 3 fois sur l'accueil (grep dist) ; « Depuis 2017 » répété accueil et mariage.
- **F3-3 · Créneau « Accueil des hôtes : horaires à renseigner »** toujours en pointillé couleur de lien (capture `br2/res-1440.png`), sans être un lien.
- **F3-4 · Polices** : 4 ttf Google Fonts, 376 Ko, sans préchargement (QA) ; LCP mobile ≤ 0,77 s, CLS ≤ 0,02, non bloquant.
- **F3-5 · Texte courant de 12 à 14 px** dans les lignes d'index (capture mariage 1440) ; vide vertical sous le statement de l'accueil et le hero de /reservations/ (≈ 250 px à 1440).

## Faux positifs du QA-revue2 à ne pas corriger
- Axe « serious `color-contrast` » sur la 404 : mesuré sur la réponse brute de `serve.mjs`. Le vrai `404.html` : 0 violation axe, 0 contraste sous le seuil, 1 h1, lang fr, noindex.
- WARN « no sitemap » : `sitemap-index.xml` existe dans `dist/bergerie-lives/legacy/` ; « no robots.txt » sans objet (site noindex sous préfixe).
- « Lien d'évitement en premier : non » (`skipLinkFirst`) : faux positif connu (lire `keyboard.stops[0]`).
- QA-revue2 ne couvre pas `/reservations/` (pas de captures) : couverte ici.

## Critères de publication
Build OK, console 0, requêtes en échec 0, liens internes morts 0, faits faux 0, débordement 0 (20 cas), axe critique ou sérieux 0, mention KYW + logo + noindex présents sur 4 pages sur 4. Reste une promesse de brochure non tenue (F2-1) : une correction d'un libellé suffit pour passer PUBLIABLE ; aucun F0 ni F1.

## Ce qui est bien (à ne pas casser)
1. Hero de l'accueil et de la page mariage : photo plein cadre, panneau vert avec CTA et téléphone, composition conservée de 1440 à 390 px.
2. Honnêteté du contenu : formulaire qui dit « n'est pas encore relié » avec e-mail de secours, renvois explicites vers le site d'origine, prix « 20 € par personne » repris tel quel.
3. Titres de /reservations/ désormais sur une ligne et pied de page propre (un seul `<footer>`, signature KYW, mention de maquette) sur toutes les pages.
