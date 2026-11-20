# Revue legacy · Épices & Nous · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : inchangée depuis la passe 1, une maison de couple à Erpent en brun taupe et papier crème, titres serif, barre collante avec « Réserver » orange, carte et menu en lignes filetées, hero de pages intérieures en deux colonnes (texte, photo).

Scores /10
- Design 7 : hero intérieurs désormais de 587 px sur 900 (capture carte, menu, réservation 1440), cohérent, mais palette brun/crème/orange toujours proche du défaut du genre.
- Usabilité 8 : 0 cible < 24 px sur 7 pages x 2 largeurs (liens du pied et `.link` corrigés), 0 lien interne mort, 6 liens externes tous conformes au dossier.
- Créativité 5 : aucun geste ajouté, sloplint accueil FAIL 58 (150 mots sur un écran), menu FAIL 58 + 3 REFLEX (44c x2, 77).
- Contenu 7 : l'affirmation fausse « Aussi à la carte » a disparu, plat signature sourcé (dossier.md l. 19 et 52), actualités sans année neutralisées ; filler repris du client persiste (F3).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, axe 0 violation sur 7 pages x 2 largeurs, 0 débordement, h1 unique, lang fr, noindex + mention + 1 logo KYW partout.

## Méthode et limites
`QA-revue2.md` (captures 04:39) postérieur à `dist/` et `src/` (04:34) : réutilisé. Planche accueil lue ; les captures de la carte et de la 404 non rouvertes (mesurées). Script maison (`launch()`, axe-core de `node_modules`, console, requêtes, cibles, débordement, balises ; 7 pages dont `404.html` réel x 1440 et 390), captures ciblées hero carte, menu, réservation, contrôle des liens par curl, `sloplint --url --genre editorial --render` sur accueil et menu. Non refait : survol, frames de transition, perf CPU x4 (la passe 1 donnait LCP 752 à 776 ms ; QA-revue2 : LCP mobile 740 et 820 ms, CLS 0,001), vérification en ligne des liens externes.

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 | confirmé | `grep "Aussi à la carte"` dans dist = 0 ; accueil : « Parmi les classiques revisités : l’Américain maison et le hamburger gourmand » (formule du client) ; « Notre plat signature » appuyé par dossier.md l. 19 et 52 ; planche accueil mobile `m-05` lisible |
| F2-1 | confirmé en partie | `openingHoursSpecification` présent (mar-ven 12:00-13:45, mar-sam 19:00-20:30), conforme aux horaires ; `og:image` et `twitter:card` présents ; canonical absent (refus motivé, acceptable pour une maquette noindex) ; voir F2-1 ci-dessous pour le chemin relatif |
| F2-2 | confirmé | accueil : 0 occurrence de « 4 mai » et « 26 mars » ; `/actualites/` : 2 mentions « , date illustrative » |
| F2-3 | confirmé | alt lus dans le dist : carte = biche (viande ardoise) / girolles / scampis ; réservation = verrière ; menu = sauce sur scampis ; plus de doublon viande ni girolles, plus de hero « table » hors accueil |
| F2-4 | confirmé | mesure 1440 et 390 : `small` vide sur accueil, carte, menu, réservation, à-propos, actualités et 404 (la 404 avait « la page d'accueil » 128x20 dans QA-revue2 : plus signalée sous `offsetParent`, voir F3-7) |
| F2-5 | confirmé | hero menu 587 px (968 avant), carte 587, réservation 587, à-propos 640 ; capture menu : photo 3/2 recadrée sans déformation, sauce et scampis bien cadrés |

## Findings
Aucun F0, aucun F1.

### F2 (mineur)
- **F2-1 · `og:image` en chemin relatif · `src/layouts/Base.astro`** : `content="/epices-et-nous/legacy/photos/table-1600.webp"` ; Facebook, LinkedIn et la plupart des scrapers exigent une URL absolue, l'aperçu sera vide. Correction : construire l'URL avec `Astro.site` si défini, sinon laisser tel quel et le noter au dossier de livraison (domaine inconnu, maquette noindex). Non bloquant.

### F3 (finition, déjà listés en passe 1 et non traités, hors périmètre de la révision)
- **F3-1** alt de la façade « enseigne Épices & Nous » (`site.ts:42`) alors que le recadrage coupe l'enseigne.
- **F3-2** lettre de clôture identique sur les 7 pages dont la 404 ; « Sophie et Denis » (hero, signature) contre « Denis et Sophie » (à-propos).
- **F3-3** filler repris du site client (« la passion d'un couple », « adresse incontournable »).
- **F3-4** polices Fontshare et Google Fonts sans préchargement (audit : 2 TTF/OTF au lieu de WOFF2, 12 WARN).
- **F3-5** sloplint FAIL 58 : accueil 150 mots à y=1250, menu 101 mots à y=750 ; REFLEX 44c sur le menu (hero 595 px sur 900 dans l'outil, visuel à 64 px du bord ; la mesure Playwright donne 587 px de section, c'est la forme choisie).
- **F3-6** hero d'accueil : verres en noir et blanc, aucun plat.
- **F3-7** QA-revue2 signale sur la 404 un contraste `color-contrast` (serious) et un lien 128x20 ; mon axe complet sur `404.html` réel donne 0 violation (la 404 de shoot est la réponse brute de `serve.mjs`, faux positif connu).

## Ce qui est bien (à ne pas casser)
1. Heros intérieurs à 587 px avec photo 3/2 : la première vue montre titre, CTA et plat sans pousser le contenu.
2. Liste filetée de la carte et du menu, prix tabulaires alignés à droite, 0 débordement à 390 px.
3. Barre collante « Réserver » + téléphone, réservation vers le module réel `https://www.epicesetnous.com/reservations`, aucune donnée inventée (e-mail, avis, GPS).
