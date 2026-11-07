# Revue portfolio · Le Royal Namur · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une ardoise de brasserie sombre, nom géant au trait de craie jaune, carte lisible en onglets TABLE | BAR, suggestion du jour, barre basse rouge brique (réserver, appeler, carte).

Scores /10 (preuves : captures `lr-r2/` du scratchpad à 1440 et 390 px, mesures maison, QA-revue2)
- Design 8 : composition inchangée et tenue (`1440-home-top`, `390-home-top`) ; /histoire/ en trois photos et un texte est plus remplie mais laisse de grands vides à 1440 (`1440-histoire-full`).
- Usabilité 7 : carte lisible à 390 px, CTA clairs ; en-tête mobile à 3 liens, formulaire de démonstration (F3-6, F3-11 non traités).
- Créativité 7 : ardoise, craie, marquee d'état ; ossature du gabarit Ardoise.
- Contenu 7 : faits exacts, « maison maison » disparu, libellés honnêtes ; il reste des phrases recopiées entre accueil et /histoire/ (F2-5).
- Technique 8 : build OK (7 pages), 0 erreur console, 0 requête en échec, 0 débordement (7 pages x 1440 et 390), 0 nœud texte sous le seuil de contraste (≈ 1 000 nœuds mesurés), 0 violation axe grave ou critique, LCP mobile ≈ 1,1 s, CLS 0 (QA-revue2).

## Vérification des corrections annoncées (REVISION-1)
| id | verdict | preuve |
|---|---|---|
| F1-1 badge « maison maison » | confirmé | texte extrait du `dist/` : 0 occurrence « maison … maison » sur 7 pages ; un seul `.badge` (« végé ») sur l'accueil ; « Boulettes maison » sans badge |
| F2-1 lien « La maison → » | confirmé | « Toute l'histoire » : 0 dans `dist/` ; la page cible reste titrée « La maison » |
| F2-2 répétitions | partiel | « déjeuner d'affaires » 1 occurrence (accueil) ; « fait face au » 0 ; chapeau /terrasse/ différent (« Parasols noirs, ardoise des moules jumbo, façade du Théâtre en vis-à-vis. ») ; accès « Au numéro 13 de la Place du Théâtre » ; phrase d'horaires encore sur 6 pages (barre d'état + bloc, WARN d'audit inchangé), voir F2-5 |
| F2-3 « Aujourd'hui, » | confirmé | 0 occurrence dans `dist/` (script du moteur compris) ; capture `1440-home-top` : « SAMEDI / Spécialité de la carte : brochette de bœuf géante, trois sauces / 28,90 € / À LA CARTE TOUS LES JOURS » ; prix 28,90 € conforme à `donnees.json` |
| F2-4 /histoire/ étoffée | confirmé sur les faits, partiel sur la forme | photo terrasse + ardoise (alt conforme à `photos/index.json`), lien « La terrasse → » ; chaque fait (mardi/jeudi 20 €, vin du patron verre/quart/demi/bouteille, tartare, boucher, façade en brique visible sur `facade.webp`) retrouvé dans `dossier.md` ou `donnees.json` ; 0 invention |
| F3-1 horaires « 12h00 à 14h30 » | confirmé | accueil et /reservation/ |
| F3-3 méta accueil | confirmé | 159 caractères |

## Contrôles de la passe
- Captures de l'agent captures (01:11) plus récentes que `dist/` (01:05) : lues ; pages non couvertes (formules, histoire, terrasse, réservation, `404.html`) mesurées par script maison : 1440 et 390 px, axe-core complet, contraste canvas 1x1 avec opacité cumulée après défilement à la molette, `scrollWidth`, console, requêtes, images cassées.
- Texte : mention « Maquette KYW, certaines données sont illustratives » présente sur 6 pages + `404.html`, un seul `kyw-footer__logo` par page, `noindex, nofollow` (conforme au prompt § 3.3), `lang="fr"`, un seul `h1` par page (404 comprise), 0 tiret cadratin.
- Faits : 0 T-faux, 0 T-invente (nouveaux textes de /histoire/ confrontés au dossier).
- Axe (complet) : `landmark-no-duplicate-contentinfo` et `region` (moderate) sur 7 pages, `heading-order` (moderate) sur l'accueil ; `aria-prohibited-attr` en « à vérifier » seulement. 0 serious ou critical.

## Findings (par gravité)
### F0
Aucun.
### F1 majeur
Aucun.
### F2 mineur
- F2-5 (reste de F2-1/F2-2) /histoire/ recopie mot pour mot deux paragraphes de l'accueil (« Située sur la Place du Théâtre de Namur… » et « Façade en brique, terrasse sous parasols noirs : la brasserie tient la place. ») et le sous-titre « L'élégance d'une brasserie au cœur de Namur » ; son 3e paragraphe énumère les plats (« Moules jumbo, boulettes maison, Royal Burger, vol-au-vent… ») que le 4e redonne juste après (« boulettes, burger, vol-au-vent, tartare et pièces du boucher »). Correction : sur /histoire/ ne garder que le paragraphe de la cuisine et de l'ardoise, retirer le doublon de la liste de plats, laisser l'accroche à l'accueil ; « la brasserie tient la place » est du remplissage, à supprimer.
### F3 finition (non traités, listés pour mémoire)
- F3-2 prix « 28 , 90 € » : espace visible avant la virgule, toujours présent (`1440-home-top`, `390-home-top`).
- F3-13 « 20 € » coupé en fin de ligne (« à 20 / € », `1440-histoire-full`, 4 pages concernées) : espace insécable avant « € » (U+00A0) dans les textes de `site.ts` et `histoire.astro`.
- F3-7 barre basse rouge fixe toujours affichée à 1440 (63 px, passe sur les photos).
- F3-10 axe moderate ci-dessus ; F3-6 en-tête mobile à 3 liens ; F3-8 eyebrows (« CE QU'ON EN DIT ») ; F3-11 formulaire de démonstration ; F3-4 poids de `terrasse.webp` (352 Ko, /terrasse/ ≈ 1,37 Mo) ; F3-5 JSON-LD ; F3-9 moules à 20 € en 3e menu ; F3-12 loader non re-mesuré.
- Mise en page /histoire/ à 1440 : texte centré en hauteur face à une pile de trois photos, vides d'environ 300 px entre les blocs (`1440-histoire-full`) ; la barre rouge sur la capture pleine page est la barre fixe, pas un défaut de flux.

## Faux positifs écartés (ne pas corriger)
- `skipLinkFirst: false`, WARN robots/sitemap et « 404 sans h1/title/lang » (réponse brute de serve.mjs ; la vraie `404.html` a title, lang, h1 et `noindex`), contraste « à vérifier » d'axe (0 sous le seuil en mesure nœud par nœud), `<img>` flottant sans `src` : voir REVUE-1.

## Ce qui est bien (à ne pas casser)
1. Honnêteté des données conservée après étoffement : « conditions à confirmer », ouverture 11h-23h signalée sans être reprise en horaires, avis négatif écarté.
2. Carte de 63 lignes lisible, onglets TABLE | BAR, barre d'état juste, suggestion renommée sans « aujourd'hui » et sans faux plat du jour.
3. Mobile solide : 0 débordement sur 7 pages, mots géants contenus, 404 réussie, alt fidèles aux photos.
