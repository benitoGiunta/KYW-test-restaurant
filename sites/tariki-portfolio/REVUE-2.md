# Revue portfolio · Tariki · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site de nuit, brun braise, où une jauge de température monte et descend au défilement, où le tawook se compose couche par couche, et où une route Syrie-Belgique sert de fil ; inchangé depuis la passe 1.

Scores /10
- Design 7 : identité cohérente (Melodrama + Literata, brun à crème, jauge latérale) ; la page Le chemin reste maigre (cinq noms de pays nus, une seule illustration d'arcades).
- Usabilité 8 : 0 débordement ni texte hors fenêtre sur 5 pages x 320/390/1024/1440 (`scrollWidth` = largeur, `Range` hors bande défilante = 0), 0 cible < 24 px, barre basse mobile intacte.
- Créativité 8 : thermomètre, scène de cuisson, route allumée, bande « Syrie · Liban · Turquie… » (doublons `aria-hidden`) ; rien n'a été cassé par la révision.
- Contenu 7 : le texte inventé et les notes de suivi ont disparu (grep sur le dist), horaires une fois par page ; restent la ligne « Visuels : site actuel… droits à confirmer » en pied de chaque page et une tournure non prouvée (« mezzés posés au milieu de la table »).
- Technique 8 : build du 20/11 00:03 postérieur à `src/`, 0 erreur console, 0 requête en échec, axe : 0 serious/critical sur 20 pages x largeurs ; restent 2 moderate (F-3 de la passe 1).

Preuves : `QA-revue2.md` absent (shoot en `shootFailed`, accueil partiel seulement). Réutilisés : `.shots-tariki-portfolio-revue2/home/d-0*.png` (desktop, postérieurs au dist). Mesures propres : script `tk-r2-mesure.mjs` (axe-core de `node_modules`, console, requêtes, `Range` contre fenêtre, cibles, h1, mention, logo, robots ; 5 pages dont `404.html` réel x 320, 390, 1024, 1440 ; défilement à la molette), journal `.logs/tk-r2-mesure.log` ; planches PIL accueil 390, histoire 390 et 1440, réservation 390 ; greps Python sur `dist/tariki/portfolio/`.

## Vérification des corrections annoncées dans REVISION-1.md
| id | annoncé | constaté |
|---|---|---|
| T-1 | légendes Liban/Turquie/Grèce/Syrie supprimées | CONFIRMÉ : `Premier détour` = 0 dans le dist ; planche histoire 390 et 1440 : noms de pays seuls, « Un foyer, Bayti, puis Tariki. » pour la Belgique (donnees.json) |
| A-1 | mots éteints du manifeste à ~5:1 | CONFIRMÉ : axe `color-contrast` = 0 sur les 5 pages aux 4 largeurs, après défilement ; en cours de révélation (capture à 450 ms) les derniers mots restent pâles, c'est la transition, pas l'état final |
| A-2 | SplitText `aria: 'none'` | CONFIRMÉ : `aria-prohibited-attr` = 0 partout (axe complet, pas seulement le report.json) |
| C-1 | « Retour à l'accueil » | CONFIRMÉ en contenu ; apostrophe droite et U+0020 avant « l'accueil » à corriger (F-1 ci-dessous) |
| C-2 | notes de production retirées | PARTIEL : `à confirmer` et `site actuel` ne subsistent que dans la ligne de pied « Visuels : … droits à confirmer » (1 occurrence par page, voir F-5) ; carte, tags `aConfirmer` et légendes « à remplacer » : 0 |
| C-3 | horaires une seule fois | CONFIRMÉ : `class="horaires"` = 1 sur accueil, carte, histoire, réservation ; pied compact à l'accueil (planche accueil 390) |
| C-4 | citation presse reformulée | CONFIRMÉ : « 14 adresses namuroises recommandées par Éric Boschman, dont Tariki. Moustique, 11 septembre 2026. » correspond au titre du dossier |
| D-1 | eyebrows « Table » et « Nuit » supprimés | CONFIRMÉ : chapeaux restants accueil = Cuisine levantine…, Manifeste, Cuisson, Dressage, Le chemin ; carte = Dressage ; réservation = Horaires, Votre demande ; reste un eyebrow avec filet par section (déclaré « corrigé en partie ») |
| D-2 | valeurs fondues en une ligne | CONFIRMÉ : « Cuisson au charbon et à flamme ouverte · Partage · Hospitalité » sous la route (planche histoire), plus de titres nus ; texte tiré de `donnees.json` > `valeurs` |
| D-3, A-3 | impossible | ACCEPTÉ (pas de photo inventée ; paquet `kyw-footer` hors site) ; A-3 non reproduit sur `404.html` réel (0 `color-contrast` à 320 et 390), le défaut de la passe 1 venait de la 404 brute du shoot |

Régressions de la révision : aucune (0 débordement, 0 console, 0 lien ou ressource en échec, mention « Maquette KYW, certaines données sont illustratives », logo `kyw-signature` (1 par page) et `noindex, nofollow` sur les 5 pages).

## Findings
Aucun F0, aucun F1.

### F2 (mineurs)
- **T-2 · T-invente léger · `src/data/site.ts:150` et `:173`** : « des mezzés posés au milieu de la table » (récit et manifeste). `donnees.json` > `positionnement` dit « mezzés à partager » ; le service « au milieu de la table » (mode de service) n'est dans aucune source du dossier. Correction : « des mezzés à partager ».
- **D-4 · page Le chemin, route** : cinq noms de pays sur une demi-page (planche histoire 1440, panneau 2 et 3 : une fine ligne par pays, grand vide à droite) ; l'étape n'apporte plus rien, seule la Belgique a une phrase. Correction : réduire la hauteur des lignes de pays sans texte (ou les fondre en une ligne « Syrie, Liban, Turquie, Grèce » sur le même rythme que la bande de l'accueil) sans inventer de légende.
- **C-5 · page Réservation, pied de page** : le pied complet répète l'adresse déjà affichée dans la section et propose le lien « Réserver une table » sur la page de réservation elle-même (planche réservation 390, panneaux 3 à 5). Correction : `footerCompact` ou retrait du lien actif dans le pied de cette page.

### F3 (finitions, hors périmètre de la révision, déjà vus en passe 1)
- **F-1 · typographie** : U+0020 avant `:` et `;` dans la ligne « Visuels : … ; dessin du plat : … » et dans « Illustration : étapes… » ; « l'accueil » sur la 404 avec apostrophe droite et espace ordinaire ; 0 U+00A0 sur réservation et 404 (4 sur histoire, 15 sur accueil, 32 sur carte) : `18 h à 21 h` peut se couper en fin de ligne sur écran étroit.
- **F-2 · formulaire de réservation** inchangé : saisie jetée avant le module du restaurant, honnêtement annoncée (« Formulaire de démonstration sans envoi »). Suggestion inchangée : réduire à Date, Heure, Couverts.
- **F-3 · axe moderate** : `landmark-no-duplicate-contentinfo` (1) et `region` (1 à 2) sur les 5 pages, toutes largeurs. Correction : pied du site sans rôle `contentinfo` ; `.thermo` et `.barre` dans un landmark ou `aria-hidden`.
- **F-4 · méta** : canonique et `og:url` de `404.html` pointent vers `/tariki/portfolio/404/` (renvoie 404).
- **F-5 · pied de page** : « Visuels : site actuel du restaurant (…droits à confirmer) ; dessin du plat : KYW, illustratif. Caractères : Melodrama (Fontshare) et Literata (Google Fonts) » sur chaque page : note d'agence visible côté client. À réduire à la mention « Maquette… illustratives » ou la ramener à une page crédits.

## Ce qui est bien (à ne pas casser)
1. Le dispositif thermomètre + cuisson par couches + route allumée, léger (CLS 0, 0 requête en échec) et honnêtement marqué « illustration ».
2. Données dures exactes et sourcées : prix, horaires (une seule fois par page maintenant), adresse Rue de l'Ouvrage 2, téléphone, citation presse alignée sur le titre vérifié.
3. Mobile soigné : barre basse Réserver/Appeler, scène cuisson dans la fenêtre, 0 débordement à 320 et 390, reduced-motion sans texte caché.

## Mesures (tk-r2-mesure, 5 pages x 320, 390, 1024, 1440)
Débordement horizontal 0 ; texte hors fenêtre 0 (hors bande défilante voulue de l'accueil : `Range` à r-567 ou r2312 sur `.marquee__item`, doublons `aria-hidden`) ; erreurs console 0 ; requêtes ≥ 400 ou échouées 0 ; cibles < 24 px 0 ; `h1` = 1 partout ; `lang="fr"` ; axe : 0 serious/critical, moderate F-3 seulement ; `robots` = `noindex, nofollow`, mention et logo présents sur chaque page.

Limites : pas de nouvelle mesure LCP/CLS (dist inchangé depuis la passe 1 hors correctifs de texte et de style) ; `QA-revue2.md` absent, captures du shoot réduites à l'accueil desktop.
