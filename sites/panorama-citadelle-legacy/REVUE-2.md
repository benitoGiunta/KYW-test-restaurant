# Revue legacy · Le Panorama (panorama-citadelle) · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 2 F2 résiduels, 3 F3 résiduels, tous repris de la passe 1 et non annoncés comme corrigés)
Lecture en une ligne : brasserie de la Citadelle en éditorial chaud (crème, titres Yeseva brun, un seul rouge pour « Réserver »), photo de la Meuse en tête, carte complète en texte.

Méthode : `REVISION-1.md` est absent côté legacy ; les corrections annoncées ont été relevées dans le commit `b436732` (diff de `src/`) puis vérifiées une à une. `dist/` (17:05) est postérieur à `src/` (17:03) : réutilisé sans rebuild, ainsi que `QA-revue2.md` (17:11). Serveur propre port 4771 (PID 9764, arrêté). Mesures : 3 scripts maison (axe-core de node_modules, 5 pages x 320/390/1024/1440 ; chevauchement des enfants de `li.row` à 9 largeurs sur la carte et l'accueil ; captures ciblées 360/412), planches de la QA lues (accueil, le lieu, 404 brute), planche `rel/pl-m.png`.

Scores /10 :
- Design 7 : hiérarchie nette, un seul accent rouge, bandeau brun de contraste (planche accueil, `m-02`, `m-05`).
- Usabilité 8 : prix double lisible sous le nom à 360 et 412 px (`rel/m-homard-360.png`, `m-homard-412.png`), 0 chevauchement à 9 largeurs ; cible « Le Panorama » encore à 20 px.
- Créativité 5 : legacy propre, sans signature forte ; le héros photo Meuse porte tout.
- Contenu 8 : faits inchangés depuis la passe 1 (0 écart), horaires « à confirmer », rien d'inventé.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth = largeur aux 4 largeurs x 5 pages), 0 violation axe sur 20 combinaisons page x largeur, 8 liens internes sans 404.

## Vérification des corrections de la passe 1
| Finding | Correction constatée | Résultat |
|---|---|---|
| F1-1 prix du homard chevauchant le nom | classe `dbl` (prix > 9 caractères) + media query `max-width: 40rem` : nom pleine largeur, prix sous le nom, `white-space: normal` ; 3 lignes concernées (Sole n°2, Homard, Menu de fêtes) | CORRIGÉ : 0 chevauchement ni prix coupé à 320, 360, 390, 412, 600, 640, 768, 1024, 1440 px sur `/la-carte/` et l'accueil ; captures `rel/m-homard-360.png`, `m-homard-412.png`, `m-fetes.png` |
| F2-1 JSON-LD sans horaires | `openingHoursSpecification` 7 jours 08:00-23:00, `url`, `image` (02-vue-meuse), `sameAs` (Facebook, Instagram) | CORRIGÉ : objet lu dans `dist/.../index.html`, JSON valide, adresse et geo conservés |
| F2-2 double `contentinfo` | pied du site passé en `<section class="foot" aria-label="Coordonnées et liens">` ; un seul `<footer>` par page (celui de `kyw-footer`) | CORRIGÉ : axe 0 violation sur 5 pages x 4 largeurs ; rendu du pied inchangé (`rel/m-pied.png`) |
| F2-3 polices | graisse Archivo 500 retirée (aucun `font-weight: 500` dans `src/`) ; pas de `preload`, pas de woff2 auto-hébergé | PARTIEL : voir F2-A |
| F2-4 image paresseuse du lieu | `<Fig k="salle" hero />` : `loading="eager"` et `fetchpriority="high"` sur `01-salle-principale` | CORRIGÉ (grep du dist) |
| F3-1, F3-2, F3-3, F3-4, F3-5 | non touchés (non annoncés) | OUVERTS, voir ci-dessous |

## Findings résiduels
### F2 (mineur)
- **F2-A · Poids des images de la page « le lieu »** : `photos/07-facade-pavillon-1600.webp` et `03-terrasse-platanes-1600.webp` dépassent 300 Ko ; la page pèse ~1,3 Mo (QA : images 1 030 Ko). Correction : recompresser ces deux fichiers (qualité 70-75) ; les polices restent une feuille Google bloquante sans `preload` (acceptable pour une maquette).
- **F2-B · Cible tactile de l'en-tête** : lien « Le Panorama » 133 x 20 px à 320 et 390 px sur les 5 pages (`SMALL` des mesures). Correction : `min-height: 24px` (idéalement 44 px) ou `padding-block` sur `.brand`.

### F3 (finition)
- **F3-1 · Mention de production visible** : « Carte d’automne 2026 transcrite depuis le PDF du restaurant. » (`la-carte.astro:29`, dist confirmé). Garder « Pain sans gluten sur demande. » seul.
- **F3-2 · Lien Itinéraire non encodé** : `google.be/maps?q=Rte Merveilleuse 82 …` (espace et retour à la ligne bruts) sur accueil, lieu, réservation, pieds de page. Encoder `?q=Route+Merveilleuse+82,+5000+Namur`.
- **F3-3 · Bandeau brun à trois colonnes égales** (accueil) et 713 mots sur l'accueil, texte du site actuel peu reformulé (F3-4 et F3-5 de la passe 1).

## Écarts de la QA corrigés par cette revue
- La planche 404 de la QA montre la réponse brute de `serve.mjs` (« Page introuvable », police et pied génériques) et son « color-contrast » : ce n'est pas la `404.html` du site. Mesurée directement : `/404.html` = h1 unique, 0 violation axe, 0 erreur, aucun débordement aux 4 largeurs. Le « 404 » du dossier de captures n'est donc pas un finding.
- `la-carte/` et `reservation-contact/` n'avaient pas de capture dans la QA : mesurées ici (axe, console, débordement, liens) et captures ciblées de la carte.
- « Cibles petites » de l'accueil (liens e-mail et téléphone à 19 px) : liens en ligne dans un paragraphe, dans la tolérance WCAG ; non retenus.

## Ce qui est bien (ne pas casser)
1. Carte entièrement en HTML, prix désormais lisibles sur mobile, ancres d'en-tête correctes.
2. Un seul accent rouge pour les actions, contraste du bandeau brun, pied KYW clair conservé.
3. Honnêteté des données : horaires « à confirmer », formulaire de maquette explicite, JSON-LD complété uniquement avec des données du dossier.
