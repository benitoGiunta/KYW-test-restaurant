# Revue awwwards · El Greco · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 2 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une affiche de carte en grotesque condensée blanc cassé sur bleu nuit, où les titres semblent s'étirer à l'arrivée, avec des photos de stock de Grèce légendées « pas le restaurant ».

Preuves : `QA-revue2.md` annoncé mais absent (seul `.shots-el-greco-awwwards-revue2/` existe : accueil capturé à 21:41, carte et 404 en `shootFailed`) ; `dist/` (21:38) postérieur à `src/` (21:37), captures d'accueil postérieures au `dist`, réutilisées (planche des 7 vues desktop de l'accueil lue). Mesures maison sur le `dist` servi (serve.mjs, port 4887) : script `rev2-elgreco-mesure.mjs` (axe-core de node_modules complet, console, requêtes, débordement, cibles, méta ; 5 pages dont `404.html` réel x 1440/390/320 px = 15 cas), `rev2-elgreco-cible.mjs` (écart crèmes, padding des sections, Tab sur le rail, polices < 14 px, axe avec incomplete, h1 à 320 px, reduced-motion), `rev2-elgreco-contr.mjs` (contraste nœud par nœud des « incomplete » d'axe). Planche mobile/desktop des pages touchées lue.

Résultat des mesures : 15 cas, 0 erreur console, 0 requête en échec, 0 débordement de page (scrollWidth = fenêtre), 0 violation axe (1440, 390, 320 ; y compris `scrollable-region-focusable`), 1 `h1`, `noindex, nofollow`, mention « Maquette KYW… » et un seul logo KYW et un seul `<footer>` sur chaque page, JSON-LD présent, 0 tiret cadratin, 0 cible < 24 px. Les 12 à 17 `color-contrast` « incomplete » de l'accueil sont des pseudo-contenus (CTA, 15,3:1) et une légende (8,2:1) : 0 sous 4,5:1. Reduced-motion : 0 texte à l'opacité 0 (histoire).

## Vérification des corrections annoncées (REVISION-1)
- F1-1 réservation par e-mail : CONFIRMÉ. `reservation.astro` : « Pour réserver, appelez le 081 20 07 47. Il n'y a pas de formulaire en ligne sur cette maquette. », bouton e-mail retiré, e-mail en « Contact : », lien « Page contact du restaurant (à confirmer) » (URL du dossier). Plus de `mailto:` à objet « Réservation » (grep dist : un seul mailto par page, sans objet). Reste un point de forme : F3-A.
- F1-2 rail des crèmes : CONFIRMÉ. `tabindex="0"` + `aria-label` sur `.cremes__piste` ; axe 390 et 320 : 0 violation ; Tab atteint le rail (7e arrêt à 390, 9e à 1440) avec contour plein 2 px corail visible.
- F2-1 aveu et commentaire de designer : PARTIEL. L'aveu (« ne rien inventer ») est parti (grep dist : 0). Mais le commentaire de designer a été déplacé, pas supprimé : voir F2-1 ci-dessous.
- F2-2 biographie du peintre : CONFIRMÉ pour le peintre (grep « Dom.nikos », « Theotok » : 0 ; les « Crète » restants sont l'huile d'olive de la carte). Voir toutefois F2-1 sur la nouvelle phrase d'étymologie.
- F2-3 bandes vides de l'accueil : CONFIRMÉ. `.sec{padding-block:min(var(--aere),7rem)}` dans le CSS émis ; padding mesuré 112/112 px sur les 4 sections à 390 et 1440 px. Sur la planche (d-03, d-06) il reste 120 à 170 px de fond bleu entre blocs : acceptable.
- F2-4 imagerie de stock : REFUSÉ par le réviseur (légendes « pas le restaurant », « photos à fournir » dans RAPPORT.md) : accepté, la mention est partout (hero, mezze, histoire, pied de page). Reste un manque de contenu, pas un défaut de construction.
- F2-5 écart nom/description des crèmes : CONFIRMÉ pour l'écart (12 px sur les 3 cartes, 390 et 1440, mesuré après 2,5 s de repos). Mais voir F3-B : la boîte de chaque carte reste très haute.
- F3 : non traités comme annoncé (F3-1 jpg de 520 Ko toujours dans `dist/…/_astro/`, non référencé par les `.astro` mais `index.html` cite ses variantes avif).

## Findings

F2-1 · Texte de coulisses et origine du nom non prouvée · `src/pages/histoire.astro` (section `h-nom`, ~l. 36-39) · preuve : texte du dist « Un nom qui s'étire. El Greco veut dire « le Grec » en espagnol. Sur ce site, tout s'allonge : les titres, les cadres, les prix. » (captures histoire-390-02 et planche). « Sur ce site, tout s'allonge… » est le même commentaire de designer que la revue 1 demandait de retirer (F2-1) ; « veut dire le Grec en espagnol » n'est pas dans `dossier.md` ni `donnees.json` (grep : 0) et relie de nouveau le nom du restaurant à une origine que le dossier ne donne pas (c'était l'objet de F2-2). Correction : supprimer toute la section « Un nom qui s'étire » (ou la remplacer par une phrase du dossier, par exemple la cuisine familiale grecque), garder le logo du restaurant ailleurs ; le h1 « Le Grec » et le menu « L'histoire » doivent alors rester cohérents (F3-C).

F2-2 · Page Histoire trop mince, dont une section sans fait · `histoire.astro` · preuve : 3 paragraphes tous déjà dits sur l'accueil et la carte (« Depuis 1986, selon le site du restaurant » apparaît encore 4 fois : hero, histoire x2 avec le repère, description méta) ; « Trois repères » reprend 1986, 4,0 / 5 et le « 30 € ancien ». Correction : un seul repère par fait (garder 4,0 / 5 sur 121 avis et 1986 une fois), retirer « 30 € (ancien) » dont la source est datée.

F3-A · `reservation.astro` · à 390 px « appelez le 081 20 / 07 47 » se coupe au milieu du numéro (capture reservation-390-00). Envelopper le numéro dans `<span class="nw">` comme sur l'accueil.
F3-B · `.creme` / `.cremes__piste` · à 390 et 1440 px chaque carte reste une boîte de ≈ 250 à 330 px dont le texte n'occupe que le tiers haut ; le contour de focus du rail (capture cible-cremes-390) entoure un grand vide. Réduire la `min-height` des cartes ou supprimer l'échelonnement des hauteurs (écart nom/description déjà réglé).
F3-C · Titre de la page histoire : h1 « Le Grec » alors que menu et `<title>` disent « L'histoire » (inchangé).
F3-D · À 320 px : h1 « El Greco » (285 > 280 px) et « Réserver » (294 > 280 px) dépassent leur boîte de 5 à 14 px (`nowrap`), sans coupe visible ; polices < 14 px : 8 nœuds à 12-13 px (légendes, petit texte), inchangé. Espaces simples avant « : » et « ; » (F3-2 de la passe 1) non traités.

Faux positifs écartés : « 404 » brute de serve.mjs (la vraie `404.html` mesurée : 0 violation, h1, noindex, mention, logo) ; `skipLinkFirst: false` du résumé d'accueil du QA (le résumé de l'accueil par ailleurs correct : 0 erreur, LCP mobile 1,0 s, CLS 0, 60 fps) ; les « incomplete » de contraste (pseudo-contenu, mesurés à 15,3:1).

## Ce qui est bien (à ne pas casser)
1. La carte : 62 lignes exactes (non modifiée depuis la passe 1), navigation latérale et prix alignés ; aucune régression sur 3 largeurs.
2. Le rail des crèmes est maintenant au clavier avec un contour visible, et la page Réserver ne dit plus que « téléphone » : honnêteté des données conservée (« à confirmer par téléphone », légendes « pas le restaurant »).
3. Technique : 0 erreur, 0 violation axe à 1440/390/320, padding de section plafonné à 112 px, CLS 0, LCP mobile 1,0 s.
