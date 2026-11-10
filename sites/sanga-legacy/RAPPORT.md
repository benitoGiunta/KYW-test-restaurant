# Sanga · variante legacy · 2026-11-10

## 1. Approche conservée vs site d'origine

| Élément | Origine | Legacy |
|---|---|---|
| Structure | une page, carte en six rubriques | idem (Catalogue gardé) |
| Type | police système, graisses lourdes | Yeseva One + Archivo (Narrow en outlier) |
| Hero | bandeau et menu | Counter : titre, phrase, puits de commande (téléphone, Commander), photo du ramen |
| Nav | menu d'origine | edge-aligned, trois ancres + Commander, menu Popover sous 60 rem |
| Carte | tuiles de catégories | Rows (nom, prix tabulaire, description) |
| Animations | aucune | aucune (Solstice : pas de reveal) |
| Couleur | blanc et rouge | papier crème, encre brune, vermillon, or |

Dérogations : gate 8 (ordre des sections gardé du client), gate 59 (écart final vers la bande KYW imposée).

## 2. Axes traités (AUDIT.md)
Tous les axes de l'audit sont traités (type, hero, nav, carte, horaires, pied, états, mobile) · preuve : DESIGN.md (cases 1 à 72 + checklist phase 3), sloplint. Non traité : avis, histoire, équipe (non vérifiés, donc absents).

## 3. Résultat sloplint
- Before : 138 FAIL, 82 REFLEX. After : 0 FAIL, 0 REFLEX ; WAIVED : 8 et 59 ; WARN : 28a rejeté (image 21:9 sous le pli, lazy voulu, le LCP est le hero) ; 2 WARN `kept` (before.json référence le HTML d'origine, non rendu : non comparable) ; NOTE 58 (écran de carte, 117 mots, assumé).
- Corrigés en phase 3 : 3 FAIL 26a (anneau de focus des liens « Commander » sur bande d'encre, désormais or), REFLEX 75 (légal 1,3 à 1,5), REFLEX 77 (Livraison mince : puits de 320 px avec ombre dure), REFLEX 59 levé avec garde.
- Render : localhost:4321, 1440 px. Build : `pnpm build:site sites/sanga-legacy` passe ; noindex, `kyw-signature` et mention KYW présents sur `index.html` et `404.html`.
- Vérifs ciblées : capture de `#livraison` à 1440 et 375 (pas de retour à la ligne de « Dès 35 € », pas de débordement).

## 4. Reviews
Hero review : `self`. Finish review : `self` (pas d'outil Agent en session d'agent) : 0 finding ouvert. Ce que l'ancien site faisait mieux : lien direct vers chaque catégorie de la boutique en ligne (gardé en « Commander : <rubrique> »), plus d'illustrations de plats (non disponibles).

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Avis, note | absent | aucun | avis vérifiés (Google, TripAdvisor) |
| Histoire, équipe | absent | aucun | texte du restaurateur |
| Texte de livraison | Livraison | « gratuite » et « dès 35 € » (données du site client) | confirmer avec le client la règle des paliers 25 / 35 € |
Slots `.fill` : aucun. Mention « Maquette KYW, certaines données sont illustratives » sur chaque page.

## 6. Demande de matériel
Photos 01 (udon), 03 et 04 (donburi) non placées. La photo qui améliorerait le plus la page : une photo de la salle ou du comptoir (rue Saint-Loup), 1600x1067, pour la bande 21:9 ou la page Horaires.

## 7. Leçons structurelles
- `sloplint --genre` n'accepte que editorial, modern-minimal, atmospheric, playful.
- Un waiver exige trois champs séparés par « · » (porte, preuve de garde, raison), sinon « malformed waiver ».
- Playwright : lancer avec `executablePath: '/opt/pw-browsers/chromium'` et `--no-sandbox`.
- `QA-build.md` n'existait pas : captures ciblées faites par l'agent de phase 3.
