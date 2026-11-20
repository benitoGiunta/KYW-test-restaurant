# Audit Hallmark · Carré d’herbes · 2026-11-20

**Source** : carredherbes.be (WordPress sur mesure, Créatonit), captures et HTML dans `data/restaurants/carre-d-herbes/site-actuel/`. **Genre inféré** : editorial (restaurant gastronomique, contenu et photos de plats).

## Lecture en quatre lignes
1. Pour quoi : réserver au téléphone et choisir un menu ; action unique, le numéro 081 34 48 19.
2. Reste : le plat plein cadre, les menus détaillés et à jour, la citation de Zeldin, l’histoire du nom.
3. Se lit généré : bandeau de sections minces, titres de section à 28 px sous un hero à 56 px (78), photos à 45 % (83), cinq graisses de police (F19), dégradés violets des presets WordPress (2a, faux positif).
4. Cassé : horaires seulement sur Contact, pas de meta description (F23), niveaux de titres sautés (F21), bandeau cookies qui masque le hero, deux bibliothèques d’icônes (30b).

## Structure d’origine
Accueil (hero plat plein cadre, spécialités, chef, citation, actualités, galerie), Le restaurant, Menu (lunch, 3, 4, 5 assiettes, fêtes, à emporter, Noël), Actualités, Contact, Comment réserver, Bon cadeau, On recrute. Nav : barre sombre avec bandeau téléphone et « Comment réserver ». Pas de réservation en ligne.

## Findings par tier (before.txt : 804 FAIL, 216 REFLEX, 82 WARN)
- Floor : 2a dégradés WordPress (faux positif), contraste sous dégradé (40).
- Reflex : 59 espacement entre sections, 71 titres plus proches de ce qui précède, 77 sections minces, 78 hiérarchie de titres, 79 vide sous le hero, 83 photos.
- Finish : F1 apostrophes droites, F19 graisses, F21 niveaux de titres, F23 meta description, F26 titres coupés.

## Axes d’amélioration
Peu coûteux : meta descriptions, apostrophes, horaires dans le pied de page (fait : à la fin et au contact). Full seulement : hiérarchie typographique, rythme des sections, retrait du bandeau cookies.
