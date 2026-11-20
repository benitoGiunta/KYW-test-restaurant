# Revue legacy · Wok de Jin · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 0 F2, 4 F3)

Lecture en une ligne de l'idée du site (avant DESIGN.md) : un buffet asiatique en salle sombre, bordeaux et or, serif d'affiche sur photo de salle, prix géant, tarifs en tableau et réveillon sur une page à part ; sobre, lisible, toujours un peu « gabarit » sous le hero, mais sans fait douteux.

Méthode : `dist/wok-de-jin/legacy/` (00:07:53) postérieur à tout `src/` et `public/` (`find -newer` vide) ; captures et QA-revue2.md (00:08 à 00:16) postérieurs au dist, donc réutilisés (build exit 0, 0 console, 0 requête en échec, CLS 0,03 / 0,046 / 0,014 / 0,005, LCP mobile 776 / 748 ms, reduced-motion sans texte masqué). Complété sur serveur propre (port 4793, PID 13012, arrêté) par deux scripts maison : 3 pages (accueil, réveillon, `404.html`) × 1440 et 390 px, axe-core complet de node_modules après défilement par 300 px, console, requêtes, débordement, JSON-LD, alignements, cibles, liens ; puis focus clavier, survol, liens internes, alts, reduced-motion et menu mobile. Texte extrait du dist confronté à `donnees.json`, `dossier.md` et `site-actuel/`.

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | constat | preuve |
|---|---|---|---|
| T-faux crédit « Rendez-vous en ligne » | corrigé | CONFIRMÉ : 0 occurrence sur index, réveillon, 404 ; « Confidentialité » conservé (lien wokdejin.com/confidentialite, page citée au dossier) | grep dist ; texte du pied |
| T-invente-1 déroulé | corrigé | CONFIRMÉ : section et chiffres 1-2-3 disparus | grep « pas à pas » : 0 ; planche réveillon 1440 et 390 |
| T-invente-2 (DJ, décompte, places limitées, sans acompte, solde, enrichi) | corrigé | CONFIRMÉ : « DJ » seul, « Enfants jusqu'à 4 ans : 5 € sur place », 0 occurrence de décompte, limitées, toute la soirée, sans acompte, solde, enrichi | grep dist (11 motifs, 0 partout) |
| landmark double contentinfo | corrigé | CONFIRMÉ : axe complet, 0 violation sur 6 cas (3 pages × 2 largeurs), `.pied` est une `section` ; un seul `footer` (kyw-footer) | script maison |
| JSON-LD Restaurant | corrigé | CONFIRMÉ : `ld+json` valide sur les 3 pages, `name`, `telephone` +3281306888, adresse postale complète, horaires lundi + mercredi à dimanche, 12:00-14:00 et 18:00-22:30, mardi absent ; conforme au dossier | JSON parsé |
| placeholder À emporter | corrigé | CONFIRMÉ : « À emporter : oui, à retirer au restaurant. Appelez le 081 30 68 88. », aucun cadre pointillé ni « lien de commande » | grep ; capture m-06 |
| alignement `.menu-rows` | corrigé | CONFIRMÉ : décalage gauche p/h3 = 0 px sur les 3 lignes à 1440 et 390 | `getBoundingClientRect` |
| vides et rythme | corrigé | PARTIEL : tarifs 1083 à 1003 px, sections du réveillon 286 / 981 / 410 px ; il reste un vide d'environ 90 px sous la liste du buffet (accueil) et sous les photos du buffet du réveillon ; deux en-têtes génériques supprimés, quatre sur cinq gardent encore le schéma titre à gauche + phrase à droite (F3-1) | planches p-index-1440, p-rev-1440 |
| F3 remplissage | corrigé en partie | CONFIRMÉ : « La salle » avec des faits ; il reste trois phrases de remplissage (F3-2) | extrait du texte |

Aucune régression introduite par la révision : build OK, 0 débordement (scrollWidth = fenêtre sur les 6 cas), 0 erreur console, 0 requête en échec, menu mobile popover (5 liens de 56 px), focus clavier visible (outline 2 px or, décalage 3 px) sur « Découvrir la soirée » et « Réserver ma table en ligne » (le « focus invisible » de QA est un faux positif connu), survol qui change la couleur de fond sur ces deux CTA.

## Rectification de la passe 1
Les textes retirés (« DJ toute la soirée », « décompte », « places limitées », « sans acompte », déroulé en trois étapes) figurent dans `data/restaurants/wok-de-jin/site-actuel/reveillon.html` (site du client). Ils n'étaient donc pas inventés par la maquette : seul le résumé `dossier.md` les omettait. Leur retrait est prudent, sans conséquence sur la publication, et n'est pas à rétablir (le contenu reste complet et exact). Le crédit à Rendez-vous en ligne, lui, restait faux pour cette maquette.

## Scores /10
- Design 7 : hero plein cadre, prix géant et tableau nets, rythme plus serré qu'en passe 1 (`d-01-hero`, planche accueil) ; reste un schéma d'en-tête répété et quelques vides.
- Usabilité 8 : menu mobile et focus corrects, hero 828 px sur 900, tel: cliquable, deux CTA de réservation vers l'URL du dossier ; le lien téléphone en ligne mesure 95 × 20 px sur le bureau (F3-4).
- Créativité 5,5 : palette fidèle au client, aucune idée propre au lieu au-delà du hero et du prix ; c'est le plafond d'une variante legacy sobre.
- Contenu 7,5 : tous les faits conformes (6 tarifs, horaires, adresse, réveillon, acompte, enfants), 0 invention, 0 placeholder visible ; quelques phrases de remplissage.
- Technique 8,5 : 0 axe (violations) sur 6 cas, 0 console, LCP mobile < 0,8 s, CLS ≤ 0,046, noindex, canonical, JSON-LD, `lang="fr"`, un seul h1.

## Findings (tous F3, aucun ne bloque)
- **F3-1 · Rythme des en-têtes** · `index.astro` (Nos tarifs, La salle, Horaires et adresse) et `reveillon.astro` (Le buffet du réveillon) : même schéma titre à gauche + phrase à droite ; vide d'environ 90 px sous la liste « Le buffet » (`p-index-1440`) et sous les photos du buffet du réveillon (`p-rev-1440`). Correction : varier un en-tête (titre seul ou pleine largeur) et réduire le `padding-bottom` de ces deux blocs.
- **F3-2 · Remplissage restant** · « Une année de plus à célébrer » (titre de l'anniversaire, `index.astro`), « La fraîcheur : Poissons et fruits de mer à découvrir. », « La touche sucrée : Gardez une petite place pour le dessert. » (reprises du site client), « Au buffet du réveillon. » répété sous deux des trois plats (`reveillon.astro`). Correction : « Anniversaire » comme titre ; supprimer la ligne répétée.
- **F3-3 · Page 404** : `canonical` pointe vers `/wok-de-jin/legacy/404/` (adresse inexistante) et le JSON-LD `Restaurant` y figure ; page sans effet SEO (noindex), à retirer pour la propreté (`Base.astro`, option `canonical` et `jsonld` désactivables sur la 404).
- **F3-4 · Finitions** : ligne du jour (« Vendredi · Aujourd'hui ») décalée d'environ 6 px à droite des autres lignes d'horaires (`d-06`, planche accueil 1440) ; liens `tel:` en ligne de 95 × 20 px sur bureau (exception « inline » de WCAG 2.2, pas de violation axe) ; avertissement d'audit sur 4 polices en `.ttf` servies par Google Fonts (hors de notre contrôle sans auto-hébergement).

## Ce qui est bien (à ne pas casser)
1. Hero plein cadre sur la salle rouge avec titre en bas à gauche, prix dès 16,80 €, LCP mobile ~ 0,78 s.
2. Tableau des tarifs : prix géant, `tabular-nums`, trois services × deux formules, tous les montants exacts, version mobile en blocs lisibles.
3. Réveillon : page courte, uniquement des faits du dossier (date, dès 18 h 00, DJ, 80 €, acompte 20 €, enfants 5 €, réservation jusqu'à minuit), CTA vers l'URL officielle ; pied KYW, mention « Maquette KYW, certaines données sont illustratives », noindex et un seul logo sur chaque page.

## Hypothèses et limites
Liens externes (wokdejin.com, maps.app.goo.gl) non testés au réseau ; compte de findings sur le `dist/` servi, pas sur le `sloplint` (artefacts connus sans CSS en mode fichier, voir REVUE-1). CLS et LCP repris de QA-revue2 (post-révision) sans seconde passe : les valeurs sont loin des seuils sauf le CLS bureau de l'accueil (0,046 pour un seuil de 0,05), à surveiller si le héros change.
