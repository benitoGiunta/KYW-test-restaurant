# Le Servais · variante legacy · 10/11/2026

## 1. Approche conservée vs site d'origine
| Élément | Origine (Wix) | Legacy |
|---|---|---|
| Routes | accueil, carte, groupes, événements, carte cadeau, contact | identiques (7 pages avec 404) |
| Type | Wix par défaut | Anybody 900 étiré + Archivo, capitales |
| Hero | photo et adresse | Counter : titre, phrase, Réserver, photo turquoise |
| Nav | barre Wix | slab d'encre, popover plein écran sous 60 rem |
| Carte | PDF cuisine et bar | lignes filetées lisibles + liens PDF conservés |
| Animations | carrousel | un reveal + repérage du carré orange |
Dérogation : gate 8 (structure Wix gardée par la règle de la variante).

## 2. Axes traités (AUDIT.md)
Typographie, hiérarchie, mobile, carte lisible, horaires avec statut ouvert/fermé : faits, preuve QA-build (0 débordement, axe 0). Non traité : réservation interne (lien externe conservé).

## 3. Résultat sloplint
- Before : site Wix, pas de `before.json` (`--kept` non exécutable, faute d'enregistrement ; liens, PDF, réseaux et `book.leservais.be` revérifiés à la main).
- After : 0 FAIL, 0 REFLEX ouvert ; WAIVED 44c, 77, 79 (en-têtes de page non hero, pied et bande d'offre), 8, 59 ; WARN F19 (Archivo Narrow 600, outlier) et F20 dismissed ; NOTE 58 carte dense.
- Corrigé en phase 3 : prix multiples de la carte (« Boulet(s) liégeois » éclaté à 390 px, classe `row__prix--long`, vérifié par capture) ; titres des événements passés à `--text-section` (gate 78).
- Render : `.hallmark/shots/` (6 routes). Build : OK, noindex et pied KYW sur 7 pages.
- QA-build : 0 erreur console, 0 requête en échec, CLS 0, LCP accueil 176 ms desktop. Axe 404 (title, lang) : faux positif du serveur, `404.html` a `lang`, `title`, `h1`.

## 4. Reviews
Hero : self. Finish : self (pas d'outil sous-agent) · 3 findings (prix long cassé, titres événements, WARN F20) · 2 résolus 1 dismissed · gap : photo de carte plus froide que le stamp. Ce que l'ancien site faisait mieux : la photo plein cadre du comptoir. Jury : non lancé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Téléphone | contact, pied | 081 73 65 52 (autre n° : +32 492 93 87 96) | numéro confirmé |
| Margarita | carte | « prix à confirmer » | prix réel |
| Verrière | groupes | origine à confirmer | texte validé |
| Statut ouvert/fermé | horaires | 9 h à 1 h (2 h ven.-sam.) | horaires validés |
Avis repris : aucun.

## 6. Demande de matériel
Photo qui améliorerait le plus : la terrasse ou la façade au départ du téléphérique, 1600x1000 px, pour l'en-tête de la page contact (aujourd'hui texte seul).

## 7. Leçons
Voir `agents/lecons/construction.md` : rangée de prix longue, `--genre` de sloplint limité à 4 valeurs, port 4533 déjà pris.
