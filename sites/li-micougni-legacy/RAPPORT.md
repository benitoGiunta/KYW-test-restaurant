# Li Micougni · variante legacy · 2026-11-10

## 1. Approche conservée vs site d'origine
| Élément | Origine (Webador) | Legacy |
|---|---|---|
| Type | vitrine 7 pages | mêmes 7 routes + 404, forme Photographic |
| Hero | centré, texte sur photo | Poster 100svh, plaque bordeaux à gauche (waive 6b) |
| Nav | barre Webador | pastille flottante, menu popover sous 70rem |
| Carte | PDF seul | carte complète en page + rail d'ancres (11 rubriques) |
| Animations | aucune | plaque qui se déploie, un reveal, jour courant des horaires |
Dérogation : waive 8 (séquence d'accueil gardée).

## 2. Axes traités (AUDIT.md)
Hiérarchie, hero, carte, formulaire (3 champs, aucun faux envoi), mobile : faits, preuves dans DESIGN.md. Non traité : comp c2 (type-led sans photo).

## 3. Résultat sloplint
- Before : 32 FAIL, 18 REFLEX. After (`--render`, 7 routes, genre editorial) : 0 REFLEX ouvert, 5 WAIVED (71, 77 x3, 83), 10 NOTE (58), 2 FAIL `kept` + 3 WARN `kept`.
- Les FAIL `kept` sont des faux positifs : liens absolus du site d'origine (`/menu`…) devenus liens sous la base `/li-micougni/legacy/`, champs captcha/csrf Webador ; consignés `dropped` au stamp. Routes vérifiées présentes dans `dist/`.
- Corrigé en QA : 44d (hero > écran à 1920 sur contact et terrasse : padding de `.stage` réduit, photo de terrasse plafonnée 640 px en 6/5), 72 (`.sched__row` collé au bord : padding-inline 8 px, ombre du « aujourd'hui » retirée), 19 (h1 « Découvrez » reformulé « Votre nouveau restaurant à Namur »).
- Build : passe (8 pages), noindex, `kyw-signature` et mention sur les 8 pages, aucun tiret cadratin. Captures vérifiées : contact 1920 et 375, terrasse 1920 et 1440.

## 4. Reviews
`finish-review: self · 0 finding ouvert` (pas d'outil Agent). `QA-build.md` de l'agent captures absent : sweep et captures ciblées faits ici. Jury non lancé. Ce que l'ancien site faisait mieux : carte PDF téléchargeable immédiate (gardée en lien).

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires mercredi à samedi | accueil, contact (`.fill`) | « heures à confirmer » | horaires réels |
| Prix du menu de la semaine | menu (`.fill`) | « prix à confirmer » | prix réel |
| Formulaire | contact | non relié, message honnête | endpoint (`data-endpoint`) |
Pas d'avis, presse, GPS ni équipe (non fournis).

## 6. Demande de matériel
Photo la plus utile : la façade de la Rue des Brasseurs 110 de jour (hero de la page contact). Aussi : portrait du couple fondateur (à propos), plat signature au zénith.

## 7. Leçons
`--kept` signale à tort tout lien absolu de l'ancien site sous une base : consigner `dropped`. Un `.stage` avec photo en ratio 4/5 dépasse 1080 px à 1920 : plafonner la hauteur.
