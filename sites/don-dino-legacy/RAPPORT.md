# Don Dino · variante legacy · 2026-11-20

Phase 3 (QA) en phase de test. Pas de QA-build.md fourni par l'agent captures (fichier absent) : sweep sloplint rendu (30 captures, 6 routes) lancé par l'agent, captures ciblées de vérification.

## 1. Approche conservée vs site d'origine
| | Origine | Legacy |
|---|---|---|
| Type | brasserie pizzeria, plusieurs pages | 6 routes + 404, mêmes contenus |
| Hero | liste de pizzas | liste de prix en hero (Index), thème Squeeze |
| Nav | menu classique | bord à bord, pastilles, bouton Réserver, Popover au téléphone |
| Carte | pages de catégories | une page, rubriques, 115 plats |

## 2. Résultat sloplint (rendu, 6 URL)
- Avant corrections de cette passe : 6 FAIL, 16 REFLEX. Après : 0 FAIL, 0 REFLEX ouvert, 8 WAIVED, 7 WARN, 17 NOTE.
- Corrigés : 26a anneau de focus du lien d'évitement (jaune focus, 3 px) ; 40 contraste de la note du formulaire (encre de carte) ; 49b numéro de téléphone qui passait à la ligne à 320 px (taille fluide, nowrap) ; 34 débordement du conteneur /carte/ à 375 (rangée de rubriques sans marge négative) ; 59 écarts de 64 px après les en-têtes de page.
- Waivers (en tête de page.css) : 44c (en-têtes de pages utilitaires, pas un hero), 44a, 59 et 78 sur /a-propos/ (liste de définitions).
- WARN : `kept` non comparé pour 9 pages d'origine non rendues (hors périmètre), 77 et F15 (trois écarts de colonne), NOTE 58 (paragraphes de 13-14 mots, h1 vu comme 29 mots à cause du commentaire Hallmark).
- Vérifié par capture ciblée : /carte/ à 375 sans débordement, /reservations/ et /a-propos/ à 1440 sans débordement, /a-propos/ lu.
- Build : 6 pages + 404 ; noindex, pied KYW et mention « Maquette KYW » présents sur chaque page ; `pnpm index` passé.

## 3. Reviews
Hero review en auto-notation `self` (phase 2). Finish review par sous-agent non faite (pas d'outil Agent). Jury non lancé.

## 4. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Envoi du formulaire | /reservations/ | non branché, message explicite | endpoint réel du restaurant |
| Presse, équipe | /a-propos/ | emplacements `.fill` | citations et photos validées par le client |
| Jour courant des horaires | /contact/ | heure de Bruxelles | inchangé |
| Avis, abonnés | partout | absents (null) | uniquement si affichés par le site client |

## 5. Demande de matériel
Photo manquante la plus utile : la salle et la terrasse en lumière du soir (hero /a-propos/ et /groupes/, 1600x1000 minimum).

## 6. Leçons structurelles
Un `margin-inline` négatif sur une rangée défilante dans `.container` fait déborder le conteneur aux yeux de sloplint 34 : garder la rangée dans la largeur du conteneur. Proposée dans data/usage/test-2/lecons-proposees/don-dino.md.
