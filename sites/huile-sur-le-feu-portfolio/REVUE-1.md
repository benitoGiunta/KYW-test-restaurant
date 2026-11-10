# Revue portfolio · L'Huile sur le Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site d'huile d'olive et de flambage, ivoire et bordeaux, qui ouvre sur un nom géant planté dans une flamme et ponctue chaque section d'une houle d'huile ; la carte et les huiles se lisent comme un menu de table, avec une barre d'horaires en frise.
Scores /10 :
- Design 8 : hero `d-01-hero.png` et `m-01-hero.png` forts (nom pleine largeur, flamme, houle), pages intérieures sobres et cohérentes ; un bloc vide gâche /histoire/.
- Usabilité 7 : CTA Réserver/Appeler collés en bas sur mobile, 0 débordement, 0 cible < 24 px (7 pages x 1440/390, script maison) ; hovers inertes sur la carte (F3).
- Créativité 8 : loader « huile versée » (0 cl), filet de flamme, frise des horaires avec marqueur « maintenant », gouttes teintées ; la structure en bandes reste classique.
- Contenu 7 : faits, prix et horaires exacts (prix de la carte confrontés à donnees.json : 0 écart), mais des notes internes apparaissent dans le texte client et une procédure de boutique est déduite.
- Technique 7 : build OK, 0 erreur console, 0 requête en échec, 0 lien mort (13 URL internes et fichiers en 200), LCP mobile 1,17 s / 2,19 s ; 1 violation axe « serious » sur l'accueil, `region` moderate sur le pied.

Sources de preuve : QA-revue1.md (dist 16:00, QA 16:07, src non modifié depuis : réutilisés), report.json accueil/carte, plus un script maison (axe-core de node_modules, console, requêtes, débordement, cibles, 7 pages x 1440/390 après défilement) et des captures de /huiles/, /boutique/, /histoire/, /reservation/ et de la vraie `404.html` (`.shots-huile-sur-le-feu-portfolio-revue1/hsfp-rev1/`). Le QA ne couvrait que accueil, carte et 404 brute.
Faux positifs écartés : axe `document-title` / `html-has-lang` de la « 404 » du QA (réponse brute de serve.mjs ; `404.html` réelle : lang fr, title, 1 h1, 0 violation) ; « 404 sans h1 », WARN robots/sitemap (présents, 200) ; `.tip` de la frise, hors champ à 390 px, en `aria-hidden` et `opacity: 0` par conception (survol seulement).

## Findings

### F1 (majeur)
- **F1-1 · /histoire/ : bloc vide géant avec un « G »** · `src/pages/histoire.astro:62`, `src/styles/base.css:216`. Le portrait de Giuseppe Santamaria est remplacé par `.media--vide` (initiale « G ») : 1370 x 1826 px à 1440 (plus de 2 écrans de beige, `eq-1440.png`), 358 x 477 à 390 (`390-histoire_.png`). Ça se lit comme une image manquante. Correction : borner la hauteur (≈ 360 px, ou supprimer le bloc) et ne garder que le nom et le rôle ; ne pas y mettre le portrait 05, non identifié.

### F2 (mineur)
- **F2-1 · Notes internes visibles dans le texte client.** « (date du site du restaurant ; les annuaires en donnent d'autres) » (`histoire.astro:13`) ; « La boutique en ligne du site actuel est annoncée « bientôt en ligne » : les prix ne sont pas publiés ici » (`boutique.astro:28`) ; « Les prix sont ceux du site du restaurant » (`carte.astro:14`) ; « huile de la maison (association avec un plat à confirmer) » x3 (`huiles.astro:33`, piment, menthe, ail). Correction : retirer ces parenthèses (ou les remplacer par « huile de la maison »), le suivi des incertitudes reste dans RAPPORT.md.
- **F2-2 · Boutique : horaires et procédure déduits.** `boutique.astro:34` donne à la boutique « Mardi au samedi, 12h à 14h30 et 18h à 21h15 » : le dossier ne contient que les horaires du restaurant, ceux de la boutique sont inconnus. Le libellé « Passer à la boutique » (eyebrow) n'ouvre rien. La méta description cite « coffrets » alors que « Coffrets cadeaux » est marqué illustratif dans la page. Correction : « Dans le restaurant, horaires du restaurant » ou marquer (illustratif) ; renommer l'eyebrow ; retirer « coffrets » de la description.
- **F2-3 · Histoire : détail inventé et portrait ambigu.** « entre oliviers et table de famille » (`histoire.astro:12`) n'est pas dans le dossier (seul « grandi dans les Pouilles, là où l'olivier fait partie du paysage » l'est). La galerie place `portrait-homme.webp` (« Portrait d'un homme souriant à table », alt neutre, conforme) à côté d'une section « Giuseppe Santamaria, Fondateur » : le visiteur y verra le fondateur alors que le dossier interdit de nommer ce portrait. Correction : réécrire la ligne sans « table de famille » ; sortir le portrait de la galerie ou l'éloigner de la section Giuseppe.
- **F2-4 · axe `aria-prohibited-attr` (serious) sur l'accueil.** `.citation` (`index.astro:111`, `<p data-split="chars">` : SplitText pose un `aria-label` sur un `p` sans rôle), 1 nœud à 1440 et à 390. Absent du QA (axe de report.json sur 0 serious). Correction : `role="text"` ou `aria-label` sur un élément avec rôle, ou ne pas poser d'aria-label sur le `p`.
- **F2-5 · Horaires affichés trois fois sur l'accueil et sur /reservation/** (frise, bloc « Horaires » de Venir, pied de page) ; audit : phrase répétée 10 fois sur ces deux pages. Correction : retirer la liste de Venir (garder frise + pied) sur ces pages.
- **F2-6 · Eyebrow au-dessus de presque chaque titre** (LES HUILES, LA CARTE, INFOS PRATIQUES, VENIR, HORAIRES, RÉSERVER, LA MAISON, PASSER À LA BOUTIQUE, « formule » sur les menus), plus numéros 01 à 06 décoratifs sur les huiles et la carte et pastilles à bordure pointillée (`d-05-scroll.png`, `1440-histoire_.png`). Signal de gabarit. Correction : garder l'eyebrow sur 2 sections au plus, retirer les numéros de la liste des huiles et de la carte.

### F3 (finition)
- **F3-1 · Espaces insécables : 0 U+00A0 dans le dist** (7 pages) : « 49,90 € », « 25 € », « Une question : », « « … » » peuvent se couper avant « € », « : » ou après « « ». Correction : U+00A0 dans les chaînes de `site.ts` et des pages.
- **F3-2 · Hovers inertes sur la carte** : « L'Huile sur le Feu » et « La carte menu Gourmet » sans changement (`h-04`, `h-05`, report carte `noHoverChange`) ; sur l'accueil « +32 81 24 19 03 » ne change que la couleur du soulignement. Correction : souligner ou colorer au survol et au focus.
- **F3-3 · « Voir sur la carte »** (bloc Venir) ouvre OpenStreetMap, mais « la carte » désigne ailleurs la carte des plats. Correction : « Voir le plan ».
- **F3-4 · Hero desktop : trois boutons empilés (Réserver, La carte, La boutique)** doublonnent l'en-tête (`d-01-hero.png`). Mobile : la ligne « pâtes fraîches · huiles d'olive · boutique » passe sur deux lignes, sans séparateurs et décalée de 114 px (`m-01-hero.png`). Correction : un seul CTA dans le hero, ligne en `flex-wrap` alignée sur le nom.
- **F3-5 · « Huile d'olive à la truffe blanche »** est associée au toast aux champignons et au carpaccio (accueil, huiles) ; la carte et le menu disent « huile d'olive à la truffe » (« truffe blanche » n'existe que comme ligne sans prix de l'apéritif). Correction : « à la truffe ».
- **F3-6 · `region` (moderate) sur le pied KYW** (`.footer`, 7 pages) : composant partagé `packages/kyw-footer`, à ne pas repeindre ici ; à noter pour le paquet.

## Contrôles passés
Build OK (QA-build, exit 0, 7 pages) ; `lang="fr"`, 1 seul `h1` et 1 seul `<footer>` par page ; `noindex, nofollow` et mention « Maquette KYW, certaines données sont illustratives » sur 7/7 pages ; logo KYW chargé (200) ; title et description uniques, OG image 200, favicon, JSON-LD `Restaurant` avec adresse, géo et `openingHoursSpecification` ; liens de réservation, Facebook, Instagram, mailto et tel = dossier ; 0 tiret cadratin, 0 tutoiement, 0 points de suspension ; 404 designée ; reduced-motion : 0 texte caché (report) ; poids : plus lourde photo 295 Ko (lustre, limite 300) ; CLS 0,043 desktop accueil (< 0,05).

## Ce qui est bien (à ne pas casser)
1. Le hero : nom pleine largeur sur la flamme, houle et filet de flamme, mobile aussi fort que desktop.
2. La frise d'horaires (marqueur « maintenant », statut « Fermé, prochain service ce soir à 18h00 ») : vraie idée du site, lisible à 390 px.
3. Honnêteté des données : placeholders marqués (illustratif), formulaire de démonstration annoncé comme tel, prix de la carte exacts à l'identique, aucun avis ni distinction inventé.
