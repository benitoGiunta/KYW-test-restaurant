# Revue awwwards · Les Potes au Feu · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un bistrot noir et ocre dont le menu en quatre services se parcourt comme quatre assiettes rondes qui défilent à l'horizontale sur un aplat ocre (le navet du logo tient la place de l'assiette manquante), avec les chefs qui « apportent eux-mêmes » les plats.

Mise en service : `node scripts/build-site.mjs sites/les-potes-au-feu-awwwards` réussit (5 pages, `dist/` reconstruit sans diff git), serveur `dist/` sur le port 4491, `shoot.mjs --nav` sur les 5 pages en série (code de sortie 0 chacune), `audit.mjs`, 3 mini-scripts Playwright (burger mobile, clics souris réels sur l'en-tête, décalage gauche des titres, reduced-motion). Captures : `.shots-r2/` (non commité). Aucun F0 ni F1 : tous les critères techniques de PUBLIABLE sont atteints ; le verdict A_CORRIGER vient de trois textes non fondés sur le dossier (F2-1 à F2-3), de deux défauts visuels (F2-4, F2-5).

Scores /10
- Design : 8. Concept tenu du hero à la 404 (`accueil/d-01-hero`, `d-02-scroll`, `404/d-01-hero`), typographie display serrée, ocre et rouge assiette cohérents ; points faibles : en-tête sans fond qui chevauche le contenu (F2-4), grandes zones vides entre sections sur `carte/d-03-scroll`.
- Usabilité : 8. Burger fonctionnel (aria-expanded false → true → false à Échap, liens 56 px de haut, navigation OK), clics souris réels sur Carte, Histoire, Réserver : les 3 aboutissent, CTA Zenchef et `tel:` en tête de page, 0 `smallTargets` desktop ; un lien de 23 px en mobile (F3-3), vignette qui recouvre un libellé (F2-5).
- Créativité : 8. Piste d'assiettes épinglée à l'horizontale, rideau ocre en transition (`accueil/d-90-transition-b`), 404 « Cette assiette n'est pas au menu » ; carte et réservation, elles, sont des listes sobres sans signature propre.
- Contenu : 7. Faits fidèles à `donnees.json` (voir plus bas), vouvoiement, pas de filler lourd, aucun avis ni récompense inventés ; mais trois assertions non fondées (F2-1 à F2-3) et des notes de coulisse lisibles par le visiteur.
- Technique : 9. 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth 390 à 390 px), axe 0 violation sur les 5 pages, LCP desktop 0,18 à 0,30 s, LCP mobile throttlé 1,17 à 2,15 s, CLS max 0,024, accueil 704 Ko (images 430, polices 202), JS 61 Ko gzip, reduced-motion `hiddenText` 0, `<h1>` unique par page, JSON-LD `Restaurant` complet (adresse, géo, 7 créneaux, `sameAs`).

## Vérification de REVISION-1.md (19 findings annoncés, 17 corrigés, 2 refusés)
Chaque correction a été contrôlée dans le build servi, pas dans la source seule.

| Finding | Annoncé | Constaté |
|---|---|---|
| F0-1 aucune page | corrigé | confirmé : 5 pages construites, build OK, 5 rapports `report.json` sans erreur |
| F0-2 liens morts | corrigé | confirmé : 41 liens/ressources extraits du HTML, tous les chemins internes répondent 200 (`curl`), liens externes identiques au dossier (Zenchef `rid=379477`, Michelin, Facebook, YouTube, bon cadeau, OpenStreetMap) |
| F1-1 réservation sans page | corrigé | confirmé : `reservation/` (Zenchef, `tel:+3281640444`, horaires, adresse, plan, bon cadeau, privatisation), `rel="noopener"` présent |
| F1-2 og.png / apple-touch-icon | corrigé | confirmé : `og.jpg` 1200×630 et `apple-touch-icon.png` 180×180 servis (200), `og:image` absolu sur les 5 pages |
| F1-3 rôles de Sara et Jordan | corrigé | confirmé : « épaule les chefs » (reprise de « épaulés par »), alts « une membre de l'équipe » |
| F1-4 légendes d'assiettes | corrigé | confirmé visibles (`accueil/d-02-scroll`, `d-04-scroll`, `m-02`, `m-03`) ; voir toutefois F2-3 sur leur contenu |
| F2-1 « Boeuf » | corrigé | confirmé : « Bœuf confit » dans titre display (`accueil/d-03-scroll`), carte et menu |
| F2-2 « dès 9 € » | corrigé | confirmé : plus de « dès », trois pastilles « à confirmer » (`carte/d-04-scroll`) ; la note du bloc contient toutefois une phrase non fondée (F2-1) |
| F2-3 midi 52 € | corrigé | confirmé : « 40 ou 52 € » + « 52 € à confirmer », pastille aussi sur l'accueil (« En chiffres ») |
| F2-4 « 2020 » | corrigé | confirmé : « début 2020 » (`accueil/d-06-scroll`) |
| F2-5 YouTube | corrigé | confirmé : libellé « Vidéo YouTube » |
| F2-6 `noindex, nofollow` | refusé | refus accepté : `agents/variante-awwwards.md` l. 256 et 439 exigent `noindex, nofollow` ; la valeur contient `noindex` (garde-fou de `build-site.mjs` OK), présente sur les 5 pages |
| F2-7 mention maquette | corrigé | confirmé : « Maquette KYW, certaines données sont illustratives. » + logo KYW visibles en bas des 5 pages (`accueil/d-07-scroll`, `m-06`), bandeau clair |
| F2-8 samedi | corrigé | confirmé : « fermé, privatisation possible » |
| F3-1 horaires en dur | corrigé | confirmé : 7 jours issus de `site.horaires` |
| F3-2 espaces insécables | corrigé | confirmé : aucune césure de « 19 h à 21 h » en 1440 ni en 390 |
| F3-3 crédits | corrigé | confirmé : « Photos : Les Potes au Feu. » |
| F3-4 `<link rel="sitemap">` | refusé | refus accepté (prompt de production § 3.3) |

Défauts de la liste « trouvés pendant la vérification » aussi recontrôlés : titres à `left` 14 à 15 px en 390 (13 px sur le h1 d'accueil) et pas de débordement ; hero accueil 1440×900 complet (`accueil/d-01-hero`) ; contraste axe 0 violation ; aperçu au curseur de la carte alimenté ; CLS mobile 0,004 (réservation) et 0,015 (404) ; mur de photos mobile sans colonne vide (`histoire/m-03`). Tous confirmés.

## Findings (par gravité)

### F0 : aucun. F1 : aucun.

### F2 (mineurs)
- **F2-1 · T-invente : carte des boissons « se demande à table ».** `src/data/site.ts` bloc « Au bar », `note` : « la carte complète des vins et cocktails se demande à table. » Le dossier dit « Boissons, vins, cocktails : inconnu (pas de carte publiée) » ; rien ne dit que la carte se demande. Même famille : `formules[0].quand` et le chapô de la carte disent « servi à toute la table » / « le même pour toute la table » pour le menu dégustation, alors que le dossier ne le dit que du lunch (« servi à l'ensemble de la table »). Preuve : `carte/d-04-scroll` (bloc Au bar), `carte/d-01-hero`. Correction : « Trois exemples relevés par Le Fooding en juillet 2026. » (supprimer la suite) ; pour le dégustation, « un seul menu, de saison » sans « toute la table ».
- **F2-2 · Privatisation du samedi présentée comme un fait.** `index.astro` (légende de la photo de salle) : « Samedi, le restaurant se privatise. » ; `reservation.astro`, bloc « Privatiser » : « Le samedi, le restaurant est fermé au public et se privatise. » Le dossier : « fermé (privatisation possible) ». Le texte affirme une privatisation systématique. Preuve : textes du HTML servi (accueil, `reservation/d-04-scroll`). Correction : « Le samedi, le restaurant est fermé ; il peut être privatisé (mariage, chef à domicile). Appelez les chefs pour en parler. »
- **F2-3 · Notes de coulisse lisibles par le visiteur, dont une hypothèse.** `site.ts` `services[0].legende` : « Assiette non photographiée : le navet du logo tient la place. » ; `services[3].legende` et l'alt de `photos.ts` : « un dessert d'une carte précédente ». Le visiteur lit un commentaire de production ; « carte précédente » est une supposition (le dossier ne donne que « rosace de pommes, glace et tuile », photo du site). Preuve : `accueil/d-02-scroll`, `d-04-scroll`, `m-02`, `m-03`. Correction : légende 1 retirée (le navet se comprend seul, la note « le navet, c'est le logo de la maison » reste) ; légende 4 : « En photo : la rosace de pommes, glace et tuile, autre dessert de la maison. » ou retirer la photo du service 4 et laisser l'assiette navet comme au service 1 ; alt sans « carte précédente ».
- **F2-4 · En-tête sans fond : le logo et la nav se superposent au texte au défilement.** `getComputedStyle(header).backgroundColor` = `rgba(0, 0, 0, 0)`, `backgroundImage: none` après 2 800 px de molette. Le bouton « Réserver » recouvre « 50, 75, 100 ou 150 € » (`carte/d-06-scroll`), le logo recouvre la première ligne du texte (`carte/d-02-scroll`, `accueil/d-05-scroll`), le logo recouvre « La bande » (`histoire/d-06-scroll`), la nav passe sur la photo de François (`accueil/d-05-scroll`). Seul l'écran des services (ocre) a un dégradé haut. Correction : après les 80 premiers pixels de défilement, fond plein `var(--c-bg)` (ou `backdrop-filter` léger posé sur un pseudo-élément, pas sur le `<header>` : voir lecons.md « guinguette ») avec bascule de teinte sur l'ocre.
- **F2-5 · Mobile, carte : la vignette d'aperçu recouvre la première lettre du plat.** `carte/m-02-scroll` : sur les lignes 03 et 04, le rond de 50 px remplace le numéro et déborde sur « S » de « Saint-Jacques » et « B » de « Bœuf » (zoom sur le crop à 2×, x 116 contre un rond qui va jusqu'à x 135). Correction : en mobile, vignette dans sa propre colonne (`grid-template-columns: 3.25rem 1fr`) ou masquée ; garder le numéro.

### F3 (finitions)
- **F3-1 · Adresse et horaires deux fois sur la page réservation** (sections « Horaires » et « Adresse » puis pied de page identique ; audit.mjs : « sentence repeated 4x »). Ne garder que celles de la page ou n'afficher que le pied sur cette route.
- **F3-2 · Numérotation décorative** : « 01 » sur une liste d'une seule ligne (« Bon cadeau », `carte/d-06-scroll`) et sur les trois verres du bar. Retirer les numéros hors menu dégustation.
- **F3-3 · Cible tactile de 23 px** : lien `+32 81 64 04 44` de la page réservation en 390 px (`smallTargets: 145x23`, un pixel sous le seuil de 24). `min-height: 1.5rem` sur ce lien.
- **F3-4 · Assiette coupée net à x = 720** (`accueil/d-03-scroll`, le bord droit du rond de bœuf et la tranche de l'assiette suivante sont tranchés à la verticale par la demi-colonne texte). Effet de la piste épinglée ; arrondir par un `mask-image` en dégradé de 40 px ou décaler la coupe.
- **F3-5 · Texte de finition** : « Avant, pendant, après. » (bloc Au bar) ne dit rien ; la ligne de pied « Construit avec Astro, GSAP, Lenis. Polices Bricolage Grotesque et Caveat. » n'intéresse pas les clients du restaurant (le crédit KYW suffit).
- **F3-6 · Canonical de la 404** : `…/awwwards/404/` alors que le fichier servi est `404.html` ; sans effet (noindex), à aligner.

## Faits vérifiés contre `donnees.json` (rendu)
Conformes : nom, adresse (Avenue de la Plante 4, 5000 Namur), téléphone `+32 81 64 04 44` (`tel:+3281640444`, écrit aussi « 081 64 04 44 »), Zenchef `rid=379477`, horaires des 7 jours, menu 67 € et suppléments +7 / +15 €, lunch 40 €, formule midi 52 € marquée « à confirmer », bons cadeaux 50 / 75 / 100 / 150 €, trois prix de boissons du Fooding marqués « à confirmer », citation Michelin (texte et source), histoire (François, Damien, Plage d'Amée, États-Unis, Montréal, Shanghai, hiver 2019, clés trois mois plus tard), « début 2020 », société DAMFRA SRL, absence d'e-mail dite, noms des plats (Saint-Jacques / butternut / passion, bœuf confit / carottes / cromesquis, soufflé au caramel / chaï / poire). Aucune note Google, aucun avis, aucune récompense, aucun chiffre inventé : pas de T-invente de métrique. Mention maquette, logo KYW et `noindex` sur les 5 pages. Alt des images conformes à `photos/index.json` (Sara jamais nommée).

## Hors périmètre
Skill jury (critique aveugle) non lançable dans une session d'agent : scores ci-dessus = auto-score du relecteur, pas une note de jury.

## Ce qui est bien (à ne pas casser)
1. **La piste des quatre assiettes** sur l'accueil (ocre, assiettes rondes, légende « Service n sur 4 » juste, navet du logo en assiette manquante) : une vraie idée propre à ce restaurant, qui tient en mobile (`accueil/m-02`, `m-03`) et en reduced-motion (`hiddenText` 0).
2. **Robustesse technique** : LCP desktop sous 0,3 s, mobile ≤ 2,15 s, CLS ≤ 0,024, axe 0, clavier complet avec focus visible et lien d'évitement (`k-01-focus`), burger accessible (Échap, aria-expanded), 404 dessinée avec h1 et trois sorties.
3. **Honnêteté des données** : pastilles « à confirmer » aux bons endroits, aucun e-mail inventé, rôles de Sara et Jordan limités à ce que dit le client, horaires dérivés d'une seule source (`horaires.ts`).
