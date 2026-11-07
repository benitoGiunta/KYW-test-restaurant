# Le Royal · variante legacy · 2026-11-07

## 1. Approche conservée vs site d'origine
| | Origine (WordPress, Divi) | Legacy |
|---|---|---|
| Type | one-page | one-page (Split Studio) |
| Hero | texte + photo | Stage : façade sur 7 colonnes (source 1200 px : pas de Poster) |
| Nav | menu Divi | slab brune, « Réserver » toujours visible, `<dialog>` au téléphone |
| Carte | PDF | carte en lignes, commutateur à manger / à boire, PDF gardé |
| Animations | Divi | un seul reveal, rien en reduced motion ni sans script |
Dérogation : gate 8 (ordre de l'original gardé).

## 2. Axes d'AUDIT.md
Traités en phases 1 et 2 (voir DESIGN.md). QA phase 3 : og:image et twitter:card ajoutés (WARN audit), marge du pied portée à `--section-gap`, 404 pleine hauteur.

## 3. Résultat sloplint
Before 182 FAIL, 73 REFLEX. After : 0 FAIL, 0 REFLEX ouvert, waivers 8, 59 (marge du composant kyw-footer), 77 et 79 (404), 1 WARN `kept` (original non relu : `site-actuel/index.html` gitignoré), 5 NOTE (dont 58 : 117 mots à y=1300, la carte). Render : `.hallmark/shots/` (`/` et `/404.html`). Build OK, noindex et kyw-footer sur les 2 routes.

## 4. QA (captures ciblées après correction)
- Faux positifs de l'agent captures : le « 404 sans title/lang/h1 » vient de la sonde serveur (la vraie `404.html` a `lang`, `title`, `h1`) ; « skip link absent » : Tab donne bien « Aller au contenu » (testé à 375 et 1440). robots.txt et sitemap existent.
- CLS mobile 0,128 (shoot) : 0,042 mesuré, dû au remplacement de la police ; non corrigé (polices Google). Survol : 2 cibles sans changement, 5 par la seule couleur : toléré.
- Revue de finition : auto-notation `self` (pas de sous-agent), 0 finding ouvert. Ce que l'ancien site faisait mieux : rien de relevé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires | Venir | 11 h à 23 h tous les jours | confirmer (le PDF diverge) |
| Adresse | Pied | Place du Théâtre 13 | confirmer n° 2 ou 13 |
| Ardoise des moules | Moules | reprise de l'original | à vérifier |
| Réservation | Hero | lien Zenchef de l'original | inchangé |
Slots photo vides : aucun. Non placées : bières, plats, vins.

## 6. Demande de matériel
Photo de la salle intérieure en 3:2, 2400 px (hero et À propos) : la plus utile ; puis plats 4:5 et bières.

## 7. Leçons
Voir `agents/lecons/construction.md`.
