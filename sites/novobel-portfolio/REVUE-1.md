# Revue portfolio · Novobel · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un « tableau de chantier » sombre, jaune et crème, où l'accueil déroule les quatre étapes d'un chantier (fil jaune à plomb) puis quatre projets en lignes, avec une barre basse fixe « Devis gratuit / Appeler ».

Preuves : QA-revue1.md et ses planches (accueil, service, 404 brute), plus un contrôle maison sur 7 pages (accueil, services, projets, maison, carrière, contact, vraie 404.html) x 2 largeurs (1440, 390 tactile) : axe-core complet, console, requêtes, débordement, tap targets, contraste mesuré par nœud (canvas), liens, Tab, formulaire, reduced motion. Port 4733 (serveur arrêté).

Scores /10
- Design 7 : palette anthracite/jaune/crème cohérente et lisible (`nvb-r1-mplanche.png`, tous contrastes de texte >= 4,5 mesurés sur 5 pages), mais premier écran desktop 100 % texte avec moitié droite vide et aucune photo avant le 2e écran (`d-01-hero.png`).
- Usabilité 7 : barre basse, skip link en premier Tab, formulaire validé en français ; mais « La maison » et « Carrière » absents de l'en-tête mobile (F2-1).
- Créativité 7 : jauge de page, fil à plomb des étapes, bandeau des métiers en marquee, 404 « Démoli » ; la structure reste un gabarit détourné (projets en lignes d'ardoise).
- Contenu 6 : faits tous traçables au dossier (aucune invention numérique), mais texte largement repris du site Wix, générique, et photos de stock non signalées comme telles (F1-2).
- Technique 9 : build OK, 0 erreur console, 0 requête en échec, 0 débordement, 0 violation axe grave ou critique, LCP mobile ~1,2 s, CLS 0, 6 liens internes 200, noindex, mention, logo KYW, `lang=fr`, un `h1` par page.

## Findings

### F1 (majeurs)
- **F1-1 · Hors périmètre du dépôt (décision humaine).** Novobel n'est pas un restaurant (`dossier.md` : « Décision : écarter le slug du lot ou produire un site d'entreprise de rénovation » ; `donnees.json` > `manques`). Le site a été produit sans que la décision soit consignée, et le dépôt est celui des maquettes de restaurants (CLAUDE.md). Correction attendue : la session mère tranche avant `pnpm index` et publication (publier telle quelle une page de rénovation dans l'index des restaurants, ou l'en exclure) ; ne pas publier tant que ce n'est pas écrit dans `data/restaurants/novobel/ETAT.md`.
- **F1-2 · Photos de stock présentées comme la réalité de l'entreprise, sans mention.** `photos/index.json` qualifie `equipe`, `grue` d'« probable photo de stock ». `maison.astro` place `photos.equipe` (« Quatre personnes en gilet jaune… ») à côté de « Une entreprise de rénovation familiale » ; `index.astro` place `mansarde` à côté de « Une approche familiale » ; `silhouettes`, `mesure`, `halle`, `outils` servent de bandes. Le badge « image illustrative » n'existe que sur les 4 projets (Projets.astro) ; le drapeau `placeholder: true` des photos n'affiche rien (`grep illustrati` sur `maison/index.html` : aucune occurrence). Correction : légende discrète « Photo illustrative » sur chaque `<figure>` dont `placeholder` est vrai (ou dans `Img.astro`), au minimum sur `equipe` et `mansarde`.

### F2 (mineurs)
- **F2-1 · Navigation mobile incomplète.** `Header.astro` (`data-mobile: 'cache'`) masque « La maison » et « Carrière » à 390 px : l'en-tête n'offre que Services, Projets, Devis (`nvb-r1-mplanche.png`). Ces pages ne sont atteignables que par le pied de page. Correction : les rendre accessibles dans l'en-tête mobile (menu ou 5 liens courts) ou ajouter un lien dans le haut de page.
- **F2-2 · axe « moderate » sur les 7 pages x 2 largeurs.** `landmark-no-duplicate-contentinfo` (`.footer` : deux régions contentinfo, avec le pied KYW) et `region` (`.etat`, bandeau des métiers hors de tout repère). Le QA ne les voit pas (axe filtré). Correction : un seul `contentinfo` (le pied KYW en `div`), et envelopper le bandeau dans le `header` ou lui retirer son rôle.
- **F2-3 · Vocabulaire interne visible du visiteur.** `maison.astro` : « source BCE » dans le tableau des repères ; `services.astro` : « Aperçu des métiers tel que présenté sur le site actuel et à la Banque-Carrefour des Entreprises ». Un client final n'a pas à lire la provenance des données. Correction : supprimer ces mentions (la mention de maquette suffit) ou les ramener à « Source : Banque-Carrefour des Entreprises » sur la seule ligne des administrateurs.
- **F2-4 · Texte générique repris du site Wix.** « La qualité avant tout », « La meilleure qualité », « Sur mesure pour vous », « du petit projet au chantier de grande envergure », « Nos experts vous expliquent toutes vos options » : conviendraient à n'importe quelle entreprise. « De l'étude à la remise des clés » revient 3 fois sur l'accueil (h2, étape, stats) et sur services. Le dossier ne contient presque rien d'autre (aucune invention n'est donc demandée) : reformuler en s'appuyant sur les faits disponibles (4 projets nommés, 28 logements, six métiers, 6 offres) et supprimer la répétition.
- **F2-5 · Premier écran desktop sans image et mal aligné.** `d-01-hero.png` : le contenu occupe x = 296 à 900 sur 1440, le logo est à x = 80, la moitié droite est vide ; la photo la plus forte (`silhouettes`) n'arrive qu'après deux écrans (`d-04-scroll.png`). Correction : image ou colonne droite au premier écran, ou aligner le bloc sur la marge du logo.

### F3 (finition)
- **F3-1** Apostrophes droites `'` dans tous les textes (« d'un », « l'étude ») : passer en `’` dans `site.ts` et les pages.
- **F3-2** `dist/novobel/portfolio/photos/outils-1600.webp` pèse 394 Ko (> 300 Ko) : recompresser.
- **F3-3** Le texte du bandeau est répété 6 fois dans le DOM (WARN `sentence repeated 6x` de l'audit) ; les 5 copies sont `aria-hidden`, donc sans effet pour les lecteurs d'écran. Les créer par JS ou limiter la répétition au HTML visible.
- **F3-4** Carrière : les 6 offres ne sont pas cliquables (pas de détail), seul « Postuler par e-mail » (`mailto:info@novobel.com?subject=Candidature`) existe ; ajouter un objet par poste ou un lien par offre.

## Faux positifs du QA (ne pas corriger)
- « Lien d'évitement pas en premier » : faux. Tab 1 = `skip-link` « Aller au contenu » (contour 2 px), puis la marque, Services, Projets.
- « Pas de robots.txt ni de sitemap » : faux. `dist/novobel/portfolio/robots.txt` (`Disallow: /`) et `sitemap-0.xml` + `sitemap-index.xml` existent.
- 404 : la capture du QA est la réponse brute du serveur (violation de contraste, cible 128x20). La vraie `404.html` (« Démoli ») a 0 contraste insuffisant, 0 cible < 24 px, un `h1`, noindex.

## Vérifié sans défaut
Faits : nom, adresse, téléphone, e-mail, Facebook, 4 projets (descriptions mot pour mot), 6 offres, « Devis gratuit sous 24 h » (présent sur la page Services du site actuel), « Aucun projet n'est trop grand » (idem), 28 = 4 + 14 + 6 + 4. Les « 25 ans » contredits par la BCE (2019) ne sont pas repris, aucun horaire ni avis inventé (« Horaires : à communiquer par Novobel »). Méta : titres et descriptions uniques, OG, JSON-LD `GeneralContractor` (adresse, sans horaires faute de donnée). Formulaire : vide (3 messages, focus sur le nom), e-mail invalide (message), valide (mailto, « Rien n'est envoyé… »). Reduced motion : 0 texte à opacité 0, scrollWidth 390. Loader masqué après chargement.

## Ce qui est bien (à ne pas casser)
1. Le fil à plomb jaune des étapes et la jauge de page : une signature propre au métier, sans effet gratuit (reduced motion respecté).
2. Honnêteté du contenu : « image illustrative » sur les projets, démo de formulaire annoncée, aucune donnée inventée, 404 « Démoli » dans le ton.
3. Technique propre : barre basse fixe sans recouvrement du pied KYW, skip link, focus visible, validation française accessible (`aria-invalid`, `role=status`).
