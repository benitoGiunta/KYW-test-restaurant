# Revue portfolio · Le Lodge Wépion · passe 1
Verdict : A_CORRIGER (0 F0, 1 F1, 6 F2, 7 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une guinguette de bord de Meuse, sable, corail et canard, où l'on attrape des « tirages » photo sur une table et où un bandeau dit d'emblée que le restaurant est fermé après l'incendie et accueilli à Erpent.

Scores /10
- Design 7 : palette corail/canard/paille cohérente, objets dessinés au trait, vagues au bord de la table et du pied ; mais trois cartes d'avis identiques et un eyebrow au-dessus de presque chaque titre (planche home d-03, d-05, d-06).
- Usabilité 7 : 0 cible < 24 px, 0 lien mort (204 liens internes résolus dans dist), CTA Réserver partout ; le formulaire de réservation jette ses 6 champs (F2-5).
- Créativité 8 : « la table » à tirages déplaçables, bouton « Ranger la table », bandeau avec pause ; signature tenue sur les 7 pages.
- Contenu 6 : faits exacts (adresse, téléphones, Barestho, réseaux, URL de presse), fermeture honnête, aucune note ni avis inventé ; mais citation et titres de presse modifiés, notes de suivi « à confirmer » partout, fermeture répétée 7 fois sur l'accueil.
- Technique 8 : 0 erreur console, 0 requête en échec, pas de débordement à 320, 390, 1024, 1440 (scrollWidth), LCP mobile 1,19 s, CLS 0,01, axe sans critique ; un texte du hero coupé entre 768 et 1060 px (F1-1).

Preuves : QA-revue1.md (home complet, carte partielle), mesure maison 7 pages x 4 largeurs (axe-core, console, requêtes, `Range` contre fenêtre, cibles, h1, alt), balayage du hero de 640 à 1280 px, captures 1440 et 390 des 5 pages absentes du QA (carte, histoire, réservation, tea-room, terrasse ; planches 1440 lues, 390 mesurées mais non toutes relues), texte du dist confronté à `donnees.json` (échantillon de prix : tartares, pâtes, desserts, crêpes, glaces conforme ; script exhaustif non lancé). `dist/` et captures non datables par mtime (arbre extrait en une fois) : captures considérées valides, dist relu directement.

## Findings

### F1 majeur
- **F1-1 Slogan du hero coupé entre 768 et 1060 px.** `sites/le-lodge-wepion-portfolio/src/styles/base.css:95` : `.hero__slogan { transform: translateX(6%) rotate(-2deg) }` pousse la ligne « brasserie, restaurant et tea-room à Wépion » hors fenêtre. Mesures `getBoundingClientRect().right` : 782 pour 768, 835 pour 820, 978 pour 960, 1041 pour 1024, 1069 pour 1060 (ok dès 1100). Capture `lodge-r1/hero-1024.png` : « à Wépi » (le « on » est rogné). Touche iPad portrait et paysage. Correction : ne garder le décalage de 6 % qu'à partir de 1100 px, ou borner (`max-width: calc(100% - 6%)`), puis remesurer à 768, 820, 1024.

### F2 mineur
- **F2-1 Citation d'avis modifiée (T-faux).** `src/data/site.ts` (avis) affiche « L'onglet de bœuf est tout simplement excellent. » ; `donnees.json` : « l'onglet de bœuf est tout simplement excellent et j'y retournerais volontiers. » Coupe sans « … » et majuscule ajoutée. Correction : texte intégral ou coupe marquée « … ». L'auteur (« Julien L. », etc.) est omis : acceptable, la mention « sans date ni auteur » est cohérente.
- **F2-2 Titres de presse réécrits (T-faux).** Page Maison, « Dans la presse » : « Le restaurant Le Lodge ravagé par un incendie ce jeudi soir à Wépion » (dossier : …« : les dégâts sont très lourds »), « Pas de réouverture avant la fin de l'année » (dossier : « Incendie au restaurant Le Lodge à Wépion : pas de réouverture avant la fin de l'année »), « Le Lodge reprend ses activités à l'Aquaplane de Profondeville » (dossier : « Wépion : victime d'un incendie, le restaurant le Lodge reprend ses activités à l'Aquaplane de Profondeville, dès ce samedi »). Présentés comme titres alors qu'ils sont raccourcis. Correction : titre complet entre « », ou paraphrase sans le format titre.
- **F2-3 Notes de suivi publiques.** « à confirmer » : 6 occurrences sur l'accueil, 5 sur Maison, Réserver et Terrasse, 4 sur Tea-room ; terrasse : « Le nombre de places, les jours et la saison d'ouverture ne sont pas communiqués : à confirmer à la réouverture », « Groupes et privatisation : non documentés, à confirmer auprès de l'équipe au 0496 92 55 13 » (numéro d'accueil de réservation présenté comme contact privatisation : procédure déduite) ; « 160 couverts … (à confirmer) ». Ce sont les notes du dossier, pas du texte client. Correction : garder une seule mention de prudence par page (statut de fermeture et adresse provisoire), retirer le reste ou le formuler comme donnée illustrative.
- **F2-4 Répétition de la fermeture.** Sur l'accueil le mot « Fermé » apparaît 7 fois : bandeau défilant (2 copies), bandeau jaune, hero, bloc lieux, pied de page ; `audit.mjs` : 12 WARN « sentence repeated 2x » sur 6 pages (« Fermé depuis l'incendie du 21 mai 2026. »). Correction : bandeau jaune + une section dédiée ; retirer la ligne du hero ou du pied.
- **F2-5 Formulaire de réservation qui jette ses données.** `src/pages/reservation.astro:32-58` : 6 champs (nom, téléphone, date, heure, couverts, message), le submit est `preventDefault` puis ouvre Barestho dans un onglet sans rien transmettre. C'est honnête (« Formulaire de démonstration sans envoi ») mais le visiteur ressaisit tout. Correction : supprimer les champs et ne garder que « Réserver sur Barestho » + téléphone, ou pré-remplir si Barestho accepte des paramètres (non prouvé).
- **F2-6 Contraste et slop.** (a) Axe `color-contrast` serious à 320 px sur l'accueil : `.hero__slogan` `#c9432d` sur `#efe8da` = 3,98:1 (4,5 requis, corps < 24 px à cette largeur) : assombrir le corail du slogan en mobile. (b) Eyebrow au-dessus de titres : « Le menu », « Avis », « Où nous trouver », « Après l'incendie », « La maison » ; (c) trois cartes d'avis jaunes identiques, chacune portant « Trouve Ton Resto, extrait sans date » (home d-05) : mettre la source une fois, varier la taille ou l'inclinaison.

### F3 finition
- F3-1 `og.jpg` (1200 x 630) : photo de terrasse seule, sans nom ni mention (ETAT.md l'annonçait « à composer »).
- F3-2 JSON-LD : `openingHoursSpecification: []` vide ; 404.html : `rel="canonical"` vers `/le-lodge-wepion/portfolio/404/` qui n'existe pas (retirer le canonical de la 404).
- F3-3 Apostrophes mixtes sur l'accueil (8 droites « l'eau », « L'équipe » contre 16 courbes) : uniformiser.
- F3-4 Page Maison : portrait de l'équipe = carré pleine colonne avec un verre dessiné (`.membre__sans`, base.css:210) pour une seule personne ; réduire ou retirer (histoire 1440, capture 4).
- F3-5 Mot géant « À table ! » coupé à 52 % par le bandeau KYW sur les 7 pages (`Footer.astro:2`, choix de gabarit assumé) : à 390 px il ne reste que le haut des lettres ; vérifier qu'il lit encore comme un mot.
- F3-6 Axe `region` moderate sur toutes les pages : `.marquee` hors landmark (envelopper le bandeau dans `role="region"` avec un nom, ou le placer dans le `header`).
- F3-7 Tartares : « Nature — Préparé par vos soins 22 € » puis « Le préparé par nos soins 24 € » (fidèle à `donnees.json`) se lit mal ; la page Tea-room reprend à l'identique des rubriques de la carte (desserts, crêpes, glaces) : trois pages portent les mêmes lignes. Ne pas corriger sans le client.

Non retenus (faux positifs documentés) : audit « no robots.txt » et « no sitemap » (`robots.txt` Disallow présent, `sitemap-index.xml` dans dist) ; textes du bandeau défilant sortis de la fenêtre (piste d'animation, `overflow: hidden`) ; `noindex, nofollow` conforme au prompt.

## Ce qui est bien (à ne pas casser)
1. La fermeture est dite d'emblée et sans faux horaire : bandeau, adresse provisoire d'Erpent, aucune note Google ni avis inventé, `placeholder` absent.
2. La signature « table à tirages » (photos déplaçables, « Ranger la table », flèches clavier) et les vagues canard : identité nette, 0 texte masqué en mouvement réduit, 60 fps mesuré.
3. Technique propre : `base` respecté (0 lien cassé), noindex + mention « Maquette KYW » + logo KYW sur 7 pages sur 7, alt descriptifs fidèles à `photos/index.json`, LCP mobile 1,19 s.
