# RAPPORT : sanga / portfolio (QA phase 3)

## Résultat QA (source : QA-build.md, agent captures)
- Accueil, carte, 404 : 0 erreur console, 0 requête en échec, 0 débordement, 0 cible tactile trop petite, CLS 0, FPS 60.
- axe : 0 violation sur accueil et carte. La 404 remonte `document-title` et `html-has-lang` : faux positif connu (réponse brute de serve.mjs ; `404.html` porte `lang="fr"` et un `<title>`, vérifié dans dist).
- Audit : 0 FAIL, 5 WARN : sitemap/robots (faux positif sous base, noindex voulu), 404 sans h1 (réponse brute du serveur), horaires répétés (accueil : section Venir + pied de page ; volontaire).
- Planches lues (accueil, carte) : hero, rouleau, galerie, Venir, pied KYW + mention visibles, cohérents.

## Correction faite
- Horaires : « Mardi Au Dimanche » (CSS `capitalize`) devenait « Mardi au dimanche » (capitalisation de la première lettre en code, `text-transform: none`). Vérifié sur /commander/ à 390 px (DOM : 4 `dt` corrects, 0 erreur console) et dans le HTML de l'accueil.

## Placeholders
- Aucun élément `placeholder: true` dans `src/data/site.ts` ; aucune photo libre. Histoire, équipe, salle, réseaux, e-mail absents (non prouvés).
- Avis : 3 avis Takeaway.com cités avec source et date (dossier donnees.json). Schéma de plan de la section Venir : indicatif, légendé « Schéma indicatif, sans échelle ».

## Points ouverts
- Titre vertical « Le rouleau » en mobile (~220 px) : jugé acceptable sur planche, non réduit.
- Pas de photo de salle ni de façade (dossier sans photos) : limite d'adéquation.
- `pnpm index` et push : phase de publication.

## Leçons structurelles
- `text-transform: capitalize` sur une ligne de jours casse « au » dans « Mardi au dimanche » : capitaliser en code.
