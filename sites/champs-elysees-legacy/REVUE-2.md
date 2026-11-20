# Revue legacy · Champs Elysées · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans nouveau parti pris, inchangée depuis la passe 1) : refonte sobre et fidèle du one-page de la brasserie, papier crème, serif Sentient et grotesque Hanken, bandeau vert d'horaires, héros photo avec carte blanche, carte de 94 lignes à filets fins, désormais avec une barre de rubriques persistante.
Scores /10 :
- Design 7 : hiérarchie et filets inchangés, barre de rubriques sticky intégrée sans rupture (`carte-1440-ancre.png`, `carte-390-ancre.png`) ; toujours pas d'idée forte propre au bistro.
- Usabilité 8 : barre de rubriques collée à 76 px (desktop) et 64 px (mobile) après 6000 px de défilement, 15 liens sur 15 ancres existantes, clic sur « Desserts » : titre visible sous la barre ; un arrêt de Tab mobile partiellement coupé (F3-6).
- Créativité 5 : rien de nouveau, la sobriété reste le seul geste.
- Contenu 7 : « À propos » désormais fondé sur le dossier (13/07/1984, café Le Sportman, Maurice et Teresa associés, 120 couverts, bœuf de Famenne et Maredsous), 0 invention ; reste « Découvrez nos délices » et une répétition de la date.
- Technique 9 : 25 cas (5 pages x 5 largeurs) à 0 erreur console, 0 requête en échec, 0 violation axe, 0 débordement de page ; LCP mobile 1,65 s, CLS 0 ; 0 CSS tierce.

## Méthode et limites
- Captures de l'agent captures lues : `QA-revue2.md` + planches home, carte, 404 (dist de 21:34, captures de 21:36 à 21:42 : postérieures au build, réutilisées). La « 404 » de la planche est la réponse brute de `serve.mjs` (page de la racine, avec 1 violation axe de contraste) : faux positif connu ; la vraie `404.html` est mesurée ci-dessous (0 violation, `noindex`, mention, un `h1`).
- Mesures maison sur mon propre serveur (port 4923, PID 20517 puis relancé, arrêtés par `kill`) : axe-core complet de `node_modules`, console, requêtes, débordement, JSON-LD, balises, 5 pages x 5 largeurs (1440, 1024, 768, 390, 320) ; LCP/CLS sous CPU x4 + 1,6 Mbit/s + 150 ms, 2 passes, 4 pages ; barre de rubriques (position, ancres, Tab) à 1440 et 390 ; reduced-motion ; poids des images ; 22 liens et ressources internes testés par requête. Captures de fenêtre dans `.shots-champs-elysees-legacy-revue2b/` (4 PNG).
- Non vérifié : URL externes (Zenchef, Facebook, Maps, kyngroup.be), pas de réseau sortant testé ; `og:image` pointe vers `https://kyw-test-restaurant.vercel.app/…` : hôte à confirmer à la publication (hypothèse).
- Les polices de repli « Sentient Fallback » et « Hanken Fallback » passent en statut `error` sous Chromium Linux : `local(Georgia)` et `local(Arial)` n'y existent pas ; sans effet ici, à ne pas corriger (le CLS à 0 est mesuré avec les vraies polices).

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constaté |
|---|---|---|
| F1-1 JSON-LD | `Restaurant` complet | confirmé : 1 bloc valide sur 5/5 pages ; `telephone +3281231426`, adresse Avenue Albert Ier 149, 5100 Jambes (à confirmer, déjà noté), geo, lun-sam 11:00-22:00 et dim 11:00-16:00, `sameAs` Facebook, aucune note d'avis |
| F2-1 LCP | srcset + preload | confirmé : LCP mobile 1 652 et 1 668 ms (était 2 800), élément `hero-tables-960.webp`, 4 fichiers présents dans `dist/…/photos/`, aucune image > 300 Ko |
| F2-2 CLS | polices auto-hébergées | confirmé : CLS 0 sur accueil, carte, contact, fêtes (2 passes) ; `fonts/*.woff2` présents et préchargés, 0 `fontshare`/`googleapis` dans les 5 HTML |
| F2-3 contentinfo | `<section>` | confirmé : 1 seul `<footer>` par page, axe 0 violation sur 25 cas (pas de `region`) |
| F2-4 « À propos » | 3 phrases du dossier | confirmé : faits conformes à `dossier.md` (lignes Histoire, Burger des Champs présent dans `donnees.json`), pas de citation, vouvoiement conservé, filler « suspendu », « passion », « unique » disparu |
| F2-5 index carte | barre sticky | confirmé : `nav` « Rubriques de la carte », `position: sticky`, 15 liens, 0 ancre manquante, barre à 76 px / 64 px après 6000 px, 0 élément hors fenêtre hors de la barre, `scrollWidth` = largeur de fenêtre ; anneau de focus 2 px visible |
Hors liste mais présents : `og:*` (5 balises, F3-4 partiellement traité), anneau de focus du bandeau. Non traités (consigne : F3 hors liste) : F3-1, F3-2, F3-3, F3-5.

## Findings (triés par gravité)
Aucun F0, F1 ni F2.

### F3 finition
- **F3-1 · Cibles < 24 px en desktop (inchangé)** : lien téléphone du bandeau 81 x 18 et 93 x 21, e-mail 182 x 21, liens de pied de page 21 px, case de consentement 20 x 20 (10 à 15 par page à 1440 px, 0 à 390 px). Correction : `padding-block` de 0,25 rem.
- **F3-2 · Typographie (inchangé)** : espace ordinaire avant « : » dans « entrée, plat et dessert au choix : 50 € » (accueil, teaser des fêtes), « Photographies et logo : », « Site d'origine : ». Remplacer par U+00A0.
- **F3-3 · Graphie du nom (inchangé)** : « Champs Elysées » (titres, alt, pied) contre « Champs Élysées » (« Aux Champs Élysées, nous vous accueillons… »). Choisir une forme.
- **F3-5 · « rouvre demain à 11 h 00 » en dur** dans `src/components/Horaires.astro` (exact aujourd'hui).
- **F3-6 · Barre de rubriques mobile, arrêt de Tab coupé** : à 390 px, après 3 Tab depuis le premier lien, « Plats végétariens » est à `left 305, right 411` (> 390) et le reste 2 s plus tard ; le suivant recentre la barre. Anneau visible mais coupé de ~21 px. Correction : `scroll-padding-inline` sur le conteneur défilant de `.index-bar`. Aucune rubrique courante n'est marquée (pas de `aria-current`), et la barre prend 125 px sur 844 en mobile avec l'en-tête : acceptable.
- **F3-7 · Répétitions résiduelles** : la date « 13 juillet 1984 » apparaît dans le paragraphe et dans la ligne latérale « Avenue Albert Ier, à Jambes. Ouverte le 13 juillet 1984. » à trois lignes d'écart ; « Découvrez nos délices. » (teaser de la carte) reste du filler de l'ancien site.

## Ce qui est bien (à ne pas casser)
1. Données fiables : carte de 94 lignes non touchée (aucun fichier de données dans le diff `HEAD~2`), horaires et JSON-LD cohérents, aucune invention.
2. Performance obtenue sans changer le dessin : LCP 1,65 s, CLS 0, 0 CSS tierce, polices préchargées.
3. Barre de rubriques de la carte : sobre (mêmes filets et tokens), ancres justes sous l'en-tête, focus visible.
