# Monepi · variante legacy · 2026-11-27

## 1. Approche conservée vs site d'origine
| | Origine | Legacy |
|---|---|---|
| Type | Boulangerie, pages Accueil, Produits, Quiches (404), Galerie, Contact | Catalogue : accueil, a-propos, produits, galerie, contact, 404 ; Quiches abandonnée (404 chez le client) |
| Hero | Slider | Index : une photo fixe, titre, actions, cinq lignes de prix |
| Nav | Menu classique | Bandeau qui défile + barre fixe ; bouton Menu et popover sous 60rem |
| Animations | Slider | Aucune (thème Solstice, « No reveal ») |
Dérogations : 8, 44a, 44c, 59, 77, 83 (raisons au stamp de `src/styles/page.css`).

## 2. Axes (AUDIT.md)
Traités en phases 1 et 2 (voir ETAT.md et DESIGN.md). Aucun nouvel axe en phase 3.

## 3. sloplint
- Before : 449 FAIL, 36 REFLEX. After : 0 FAIL, 0 REFLEX, 11 WAIVED, 3 DISMISSED, 9 NOTE (mots par écran), 2 WARN kept (`.hallmark/site-actuel/index.html` non rendu, sans effet).
- Corrigé en phase 3 : REFLEX 79 sur contact et produits (bas de `.page-head` de 40 px à 16 px) ; REFLEX 44a, 59 (galerie) et 77 (a-propos, produits) levés par waivers à trois champs.
- Build : `pnpm build:site` passe ; noindex, `kyw-signature` et mention « Maquette KYW » présents sur les 6 pages ; `pnpm index` passé.
- QA-build.md absent : pas de captures de l'agent « captures ». Planches lues : 4 pages à 1440x900 et 5 à 375 (celles de `.hallmark/shots/`, rendues par sloplint).

## 4. Reviews
Hero review `self` (phase 2). Finish review sous-agent : non faite (pas d'outil Agent). Jury non lancé. Ancien site : slider et page Quiches non repris.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires samedi, dimanche | contact | « à confirmer » | horaires du client |
| Jours lundi à jeudi | contact | « Fermé, à confirmer » | confirmation du client |
| Avis, abonnés | partout | null | avis réels |
Aucun slot `.fill`. Citation de presse reprise du dossier, à vérifier.

## 6. Demande de matériel
Photo du comptoir ou de la façade (rue Es Fays 43), 1600x1000, vitrine pleine : celle qui améliorerait le plus la page contact et le hero des pages intérieures.

## 7. Leçons
QA-build.md absent alors que le prompt le suppose ; le serveur dev sert la base `/mon-epi/legacy/`. `--genre` n'accepte que editorial, modern-minimal, atmospheric, playful. Waiver : trois champs séparés par « · » (clause · preuve · raison), sinon « malformed ».
