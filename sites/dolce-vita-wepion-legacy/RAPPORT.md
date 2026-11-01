# La Dolce Vita (Wépion) · variante legacy · 2026-11-01

## 1. Approche conservée vs site d'origine
| Élément | Origine | Legacy |
|---|---|---|
| Type | site vitrine photographique | idem (Photographic, gardé) |
| Hero | vidéo autoplay | photo de façade du soir en plein cadre, plaque avec titre et téléphone (dérogation 28a) |
| Nav | bandeau | bandeau sticky, transparent sur l'accueil, se rétracte, Popover sous 60rem |
| Carte | liste | Index de catégories, rows à deux niveaux (86 plats) |
| Animations | aucune au scroll | un reveal, reduced motion et sans JS repliés |
| Pages supprimées | légales, cookies, espace patron | `dropped` (aucune donnée) ; carte OSM remplacée par un lien d'itinéraire |
Dérogations : 28a, 6a (`dvh`), `waive 8`, `waive 59`, `waive 77` (raisons en tête de `page.css`).

## 2. Axes traités
Voir AUDIT.md : tous les axes retenus traités en phases 1 et 2 (preuves dans DESIGN.md). Non traités : photos supplémentaires, vignettes de plats (aucun matériel prouvé).

## 3. Résultat sloplint
- Before : 48 FAIL, 3 REFLEX. After : 0 FAIL, 0 REFLEX ouvert, 8 WAIVED (8, 59, 77), 5 WARN 49 (libellés de boutons, `.btn` nowrap : faux positifs), 3 NOTE 58 (mots par écran, tableau de la carte).
- Kept : `kept: nothing recorded` (pas de comparaison par page du site d'origine) ; Dropped : voir en-tête de `page.css`. Build : passe, 5 routes noindex + pied KYW + mention.
- Corrigé en phase 3 : nom accessible du logo de nav (axe `label-content-name-mismatch`, espace entre nom et lieu), lien Instagram du pied en `nowrap` (49b à 1024 px).
- Axe après correction : 0 violation sur les 5 routes. 8 « à vérifier » restants : texte sur pseudo-élément ou photo (scrim mesuré : fond 25 à 32 sur 255 sous la nav, plaque sombre sous le titre).
- Faux positifs du rapport captures : 404 sans title/lang (réponse brute du serveur ; `404.html` a `lang`, title, noindex), `skipLinkFirst: false`.

## 4. Reviews
Hero review et finish review : auto-notation `self` (pas d'outil Agent), 1 finding résolu en phase 2. Ce que l'ancien site faisait mieux : la vidéo d'ambiance. Jury non lancé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Fermeture exceptionnelle | `site.ts` | `null` | dates réelles, jours fériés |
| Horaires (hypothèse : mardi fermé, mercredi et samedi soir seuls) | `HORAIRES` | donnees.json | confirmation du restaurateur |
| Avis | page d'accueil | 3 avis du dossier | à vérifier avant diffusion |
| Réservation en ligne | absente | téléphone seul | lien réel si le restaurant en a un |
Aucun slot `.fill`.

## 6. Demande de matériel
Photo qui améliorerait le plus la page : la salle intérieure au service du soir (seule la façade et la terrasse existent). Aussi : plats de la carte en gros plan (une photo par catégorie) et une vidéo courte de 10 s de la terrasse.

## 7. Leçons structurelles
Un bloc ajouté en tête de `page.css` avant les `@import` les invalide (tokens perdus, faux FAIL en rafale) ; voir agents/lecons/construction.md.
