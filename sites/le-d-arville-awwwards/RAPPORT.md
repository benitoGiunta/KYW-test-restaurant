# RAPPORT : Le D’Arville, variante awwwards (phase 1)

- Données réelles : nom, adresse, téléphone, e-mail, jours, menus et prix, carte, équipe, histoire, 200 m, réseaux (donnees.json, dossier.md).
- Fictif : aucun. Textes d'accroche (« se suit comme une balade ») : formulations de concept, pas de faits.
- Douteux, non corrigés : Gault&Millau 15/20 (16/20 ailleurs) et Tripadvisor 4,5/5 (545 avis) non affichés ; heures (12 h à 14 h 30 et 19 h à 21 h 30 chez un tiers, contradictoires) non affichées ; « le restaurant a 20 ans » repris tel que dit par l'affiche du client, sans année.
- Absents : prix des desserts, contenu du Bon Plan, logo vectoriel, avis cités. Favicon et OG dessinés pour la maquette.
- Photos : 19 du client (crédit « photos : Le D’Arville » en pied et sous la bande Barabas), style HDR 2018.

# Phase 3 : QA (20/11/2026)
Pas d'agent critique disponible : aucun score jury indépendant (non produit, à faire par le superviseur). Preuves = QA-build.md + captures ciblées `.shots/home`, `.shots/carte` (non commitées).

## Corrections
- LCP mobile accueil 2924 ms -> 1032 ms (carte 968) : le bloc texte du hero n'attend plus GSAP (retrait de `data-reveal` sur `.hero__texte`, le lede était masqué jusqu'au JS).
- Cibles tactiles < 44 px (liens `.lien`, pied, 404) : 0 restant (`min-height: 44px`).
- Hover de la marque « D'Arville » (noHoverChange) : opacité + espacement, vérifié (plus listé sur l'accueil).
- reduced `hiddenText` 1 -> 0 : `#curtain` en `display: none` en mouvement réduit.
- Meta description 180 -> < 160 caractères. `og.png` recomposé depuis le hero réel (nom lisible, photo de la ferme).

## Mesures finales
Audit 0 FAIL, 4 WARN. Accueil : LCP mobile 1032 (p.lede), CLS 0, 0 erreur, 0 requête échouée, 0 axe, 0 débordement, FPS 60 (headless, plancher), idleMotion true, 0 cible petite. Page la plus lourde ~2,5 Mo (images 2301 Ko), JS 61 Ko gz. Pas de loader (loaderMs null).

## Points non résolus / justifiés
- [WARN] phrases répétées carte (deux menus qui commencent par la même étape) et réservation (adresse en contenu + pied) : contenu légitime.
- [WARN] « no sitemap » : `sitemap-index.xml` existe sous la base, l'audit cherche à la racine ; « no robots.txt » idem, noindex en meta.
- [audit] `skipLinkFirst` false : faux positif, le premier arrêt est bien « Aller au contenu » (`#main`), le test cherche « skip » en anglais.
- [audit] 404 : axe contraste vu en pleine animation d'entrée ; couleur finale #55646a, contraste suffisant (vérifié, opacité cumulée 1).
- [hover] « La carte » sans changement sur la page carte : lien de la page courante (aria-current). colorOnly sur l'adresse : lien secondaire du pied, accepté.
- [QA] page réservation non photographiée (budget) ; couverte par l'audit (0 FAIL) et le contrôle de phase 2.
- [QA] scores Design/Usability/Creativity/Content non évalués.

## Placeholders et hypothèses (à remplacer par le client)
Aucun placeholder détecté. Heures d'ouverture non publiées (contradictoires), Gault&Millau et Tripadvisor non affichés, « 20 ans » sans année. Photos : celles du client.
