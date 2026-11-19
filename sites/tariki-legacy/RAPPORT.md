# Tariki · variante legacy · 2026-11-19

## 1. Approche conservée vs site d'origine
| | Origine (Wix) | Legacy |
|---|---|---|
| Type | une page, texte en capitales fines | Darkroom : display condensé léger, corps sans |
| Hero | photo de braises, titre, « Réserver » | braises en couleur, plaque crème avec logo, titre en bas à gauche (44c waived, comp.md) |
| Nav | menu Wix | pilule, menu Popover sous 60 rem, barre de réservation collante au téléphone |
| Carte | affiches images sans texte | lignes de texte indexables, onglets midi/soir |
| Animations | reveals cachés | un reveal (feu, arcades), reduced motion respecté |
Dérogations : 8 (ordre du client gardé), 44c (hero), 77 (clôture fine par choix, gate 85).

## 2. Axes d'AUDIT.md
Traités : 7a, 10a, 58, 62, 67, 78, 77 (partiellement : 3 sections par fidélité à la one-page), F3, © 2035, carte en texte, alt, débordement mobile, pages vides supprimées, prix en double tranchés. Non traité : carte du soir de l'accueil client (prix plus élevés, formule 18 €), à confirmer.

## 3. sloplint (rendu sur / et /la-carte/)
Phase 3, avant corrections : 1 FAIL (44d sur la carte : tout le contenu comptait comme hero), 2 REFLEX (77). Corrections : page carte scindée en section d'en-tête et section de carte, ligne de clôture élargie (`chapitre__fin` 1/10, 30ch), espaces ≥ 120 px. Après : 0 FAIL, 0 REFLEX, 2 WARN (kept non comparé : le before pointe `site-actuel/index.html`, non rendu), 6 WAIVED, 1 NOTE (58 : 82 mots à y=4700). `kept: before 509 FAIL, 113 REFLEX, now 0 FAIL, 0 REFLEX`. Dropped et reworded : en tête de page.css. Build OK, `pnpm index` OK ; noindex, kyw-signature et mention sur /, /la-carte/ et 404 ; aucun tiret cadratin.
Captures : `.shots-tk3/` (accueil 1440/375, carte avant et après correction).

## 4. Reviews
Hero review `self` (phase 2). Finish review sous-agent : non lancée (pas d'outil Agent en session d'agent), auto-notation `self` : gap stamp/page = la plaque hero reste le point faible à 1280. QA-build.md de l'agent captures absent : captures ciblées faites ici. L'ancien site faisait mieux : un formulaire de réservation relié (ici statique, sans envoi). Non vérifié : axe sur menu ouvert et formulaire en erreur, ordre de tabulation du menu, saisie d'heure hors créneaux, jury.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Photo arcades | histoire | image d'ambiance probablement générée (`data-placeholder`) | photo de la salle |
| Photo feu de camp | histoire | visuel d'ambiance (`data-placeholder`) | photo de la cuisine au feu |
| Réservation | #reservation | `data-endpoint=""`, rien n'est envoyé | système de réservation du client |
| Prix du soir | /la-carte/ | version carte (19, 32, 26) | confirmation client (accueil : plus cher, formule 18 €) |
| Allergènes | carte | reformulé depuis l'affiche | texte validé |
| Textes « carte courte » | accueil, carte | reformulations du dossier | à valider |

## 6. Demande de matériel
Slots : hero 1920x1080 (braises, fourni), histoire 1600x900 (salle), feu 1200x800 (cuisine). La photo qui manque le plus : la salle de Tariki, éclairée le soir, rue de l'Ouvrage 2.

## 7. Leçons
Le linter prend la première section comme hero : une page mono-section sans en-tête séparé fait échouer 44d. Waiver : trois champs séparés par « · » (gate, preuve, raison), sinon ignoré. Voir data/usage/test-1/lecons-proposees/tariki.md.
