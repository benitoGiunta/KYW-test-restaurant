# Le Grill des amiS · variante legacy · 2026-11-10

## 1. Approche conservée vs site d'origine
| Élément | Origine (Wix) | Legacy |
|---|---|---|
| Type | photo plein écran puis histoire, carte, horaires | idem, ordre du client conservé (waive 8) |
| Hero | photo de salle | affiche photographique Darkroom, photo du grill |
| Nav | barre Wix | dalle pleine largeur, logo, liens, une action ; popover mobile |
| Carte | page carte | 75 plats avec prix, index sticky |
| Animations | aucune notable | still : réglage lent de la photo du hero seul |
Dérogations : 8, 59, 71, 77, 83 (raisons en tête de `page.css`).

## 2. Axes traités
Voir `AUDIT.md` et `DESIGN.md` (72 cases). Passe 3 : contraste mesuré, pli et vide du hero des pages intérieures corrigés.

## 3. Résultat sloplint
- Before : non produit (HTML Wix non exécuté). Kept : `--kept` répond « no before record » (pas de `before.json`), FAIL non corrigeable, consigné ; les lignes `dropped` sont dans `page.css`.
- After (7 URL, `--render`) : 0 FAIL, 0 REFLEX, 0 WARN, 7 WAIVED, 8 NOTE (journal `.logs/gda-sloplint4.log`).
- Trouvé en passe 3 : 44c (texte à 270-440 px de la photo, hero de la carte à 941 px) et 79 (200 px de vide avant le pli) sur les pages intérieures. Corrigé : colonnes d'en-tête `24rem / 1fr` (`28rem` pour la photo haute), écart `--space-3xl`, photo en 3/2 forcé. Vérifié par capture à 1440 et 1024 et mesure : pas de débordement horizontal (3 pages, 3 largeurs).
- Build : passe, `pnpm index` passé.

## 4. QA navigateur (passe 3)
- Contraste (axe, 7 pages, 1440 et 375) : 0 violation ; les « à vérifier » d'axe (fond indéterminé) sont couverts par la mesure des tokens : ink/paper 15,95 ; ink-2 10,81 ; muted/paper 6,0 ; muted/paper-3 5,32 ; accent/paper 5,09 ; accent-ink/accent 5,09 ; ink/accent-deep 6,64.
- 404 : le « sans titre, sans lang » du QA-build vient de la 404 du serveur de test, pas de `404.html` (lang fr, titre, noindex présents).
- Photos des pages intérieures : chargées (lazy) ; les blocs sombres des captures pleine page venaient du chargement différé.
- noindex, mention maquette, `kyw-signature` : présents sur les 8 pages.
- Finish review sous-agent : non faite (pas d'outil sous-agent), remplacée par la revue personnelle ci-dessus. Ce que l'ancien site faisait mieux : rien de mesurable (Wix lourd, sans index de carte).

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Réservation | boutons Réserver | lien Wix d'origine et `tel:` | module de réservation du client |
| Horaires, mardi, mercredi et dimanche fermés | accueil, contact, réserver | déduit (le site d'origine ne donne que les quatre jours ouverts), affiché « Fermé (à confirmer) » | confirmation du client |
| Carte du 14 octobre 2026 | carte | données de la phase 1 | carte à jour |
| Avis | aucun | non repris : aucun avis affiché, faute de source dans le dossier | sans objet |

## 6. Demande de matériel
Photo qui améliorerait le plus : une photo de la façade ou de la terrasse en soirée, 3:2, 2400 px, pour l'en-tête de la page contact. Logo en SVG fond transparent (le logo actuel est petit sur la dalle, 2,5 rem).

## 7. Leçons
Dans `agents/lecons/construction.md` : sloplint rerun sur toutes les routes après tout changement de gabarit d'en-tête.
