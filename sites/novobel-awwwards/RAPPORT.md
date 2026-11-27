# RAPPORT · Novobel awwwards (phase 1)

## Écart majeur
Novobel n'est pas un restaurant (dossier.md : construction et rénovation). Le site est une maquette d'entreprise de rénovation ; pages `/projets/` et `/contact/` à la place de `/carte/` et `/reservation/`. Une décision humaine (écarter le slug du lot) reste ouverte.

## Données réelles utilisées
Nom, adresse, téléphone, e-mail info@novobel.com, Facebook, devise, 4 services, 4 projets et leurs nombres d'appartements, 3 valeurs, 6 offres d'emploi (source : donnees.json, site actuel).

## Données douteuses (non corrigées)
- « Actifs dans la rénovation depuis 25 ans » (site actuel) contredit la BCE (début 8 mai 2019) : non repris.
- Horaires, avis, nombre de salariés, zone d'intervention : inconnus, jamais affichés.
- Les noms des administrateurs (BCE) ne sont pas affichés.

## Éléments fictifs / illustratifs
- `lots[].texte` (5 phrases génériques sur chaque étape) : `placeholder: true` dans `site.ts`.
- Phrases d'accroche (« La devise de Novobel… », « Des outils, des mains, des délais tenus. », liste « Ce qui aide à cadrer un projet ») écrites pour la maquette.
- Photos : images du site actuel, probablement de stock ; légendées « Image d'illustration » (non liées aux projets nommés). Photos 07, 10, 11 (rendus filigranés), 13 (voilier) et 02 (logo) écartées.
