# La Ferme Blanche d’Asie · variante legacy · 09/11/2026

## 1. Approche conservée vs site d’origine
| Élément | Origine | Legacy |
|---|---|---|
| Type | site vitrine 4 sections (accueil, bienvenue, menu, contact) | 5 routes + 404, séquence conservée, composition neuve |
| Hero | photo de salle plein cadre | idem (forme Photographic), titre + phrase + actions |
| Nav | barre classique | slab 64 px sticky, `<nav popover>` sous 60rem (pilule écartée : déjà prise, règle 42) |
| Carte | liste de plats | page `/menu` à onglets, 29 € en chiffre signature |
| Animations | aucune | aucune (thème still, `waive 62`) |
Dérogations : waive 8 (séquence d’origine gardée), 44c (têtes courtes des pages intérieures), 83 (page photos = galerie), 62.

## 2. Axes traités (AUDIT.md)
Voir AUDIT.md : tous les axes traités en phases 1 et 2 (preuves dans DESIGN.md). QA phase 3 : cibles tactiles de pied de page (20 px -> >= 24 px), retours à la ligne des liens (e-mail, marque, Facebook) à 1024.

## 3. Résultat sloplint
- Before : 13 FAIL, 7 REFLEX. After : 0 FAIL, 0 REFLEX ouvert, 5 WAIVED (44c x4, 83), 4 WARN, 3 NOTE ; render tourné sur 5 URL.
- WARN restants : 49 « Réserver au {tel} » / « Appeler le {tel} » (faux positif, `.btn` est `nowrap`) ; `kept` non comparé (`.hallmark/site-actuel` non rendu par cette passe).
- Build : `pnpm build:site` OK, 6 pages ; noindex et pied KYW présents sur toutes les routes ; `pnpm index` OK.

## 4. QA captures (QA-build.md) et corrections
| Constat | Verdict | Action |
|---|---|---|
| 404 sans h1, title, lang (axe 2 serious) | faux positif : page de repli du serveur statique ; `dist/404.html` a `lang="fr"`, title et h1 | aucune |
| robots.txt / sitemap absents | faux : présents dans `dist/` (servi depuis un autre dossier) | aucune |
| 8 cibles < 24 px (liens du pied) | réel | `.pied a` inline-block + `--space-3xs` ; vérifié par mesure Playwright : 0 lien < 24 px |
| Liens qui passent sur 2 lignes à 1024 (REFLEX 49b) | réel | grille du pied 0,8/1/0,9/1,6 fr, `nowrap` sur mailto, marque, Facebook ; sloplint : 0 REFLEX |
| Horaire répété 5 fois | volontaire : tableau des 7 jours identiques avec jour courant en évidence | conservé |
| Stamp CSS « floating pill » obsolète | réel | stamp mis à jour (slab) |
Reviews : hero review `self` (ship, phase 2). Finish review par sous-agent non lancée (sobriété) : écart assumé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Avis clients | accueil | repris de sources publiques | à vérifier avec le client |
| Photos filigranées « Find Your Place » | partout | recadrées sous le filigrane | photos originales + droits |
| Horaires | pied, /reserve, /contact | midi 12 h à 14 h 30, soir 18 h à 23 h, samedi minuit | à confirmer |
| Formulaire de réservation | /reserve | absent (téléphone) | outil de réservation si souhaité |

## 6. Demande de matériel
Photo la plus utile : la salle vue de l’entrée, en lumière du soir, sans filigrane, 2400x1350 (hero). Ensuite : un plat signature du menu à 29 €, 1600x1200.

## 7. Leçons
- Faux positifs « 404 sans h1/lang » : le shoot sert un 404 générique ; vérifier `dist/404.html` avant de corriger.
