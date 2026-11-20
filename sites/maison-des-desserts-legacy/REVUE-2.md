# Revue legacy · La Maison des Desserts · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md, captures de QA-revue2 et mesures de la passe) : un éditorial sobre sur fond crème, serif fin, photos réelles de la façade et de la salle, carte complète en HTML, un seul appel à l'action (Boutique en ligne, bleu nuit).

Scores /10
- Design 6 : inchangé, propre et cohérent mais peu coloré pour une pâtisserie (`home/planche.png`) ; le menu mobile est maintenant net (`m2/menu390.png`).
- Usabilité 8 : menu plein cadre fermé par Échap, état d'ouverture juste sur 9 instants x 2 pages, 30 liens internes en 200, 0 ancre morte.
- Créativité 5 : idée éditoriale attendue, seul point propre : jour courant et statut d'ouverture dans les horaires.
- Contenu 8 : les deux phrases inventées sont retirées ; faits (adresse, téléphone, e-mail, horaires, coordonnées) identiques à `donnees.json`.
- Technique 8 : axe 0 sur 6 pages x 1440 et 390 (404.html réelle comprise), 0 erreur console, 0 requête en échec, 0 débordement, JSON-LD valide, canonical et og:image absolus.

## Méthode et limites
- Build : `dist/` (04:46:34) = `src/` (04:46:34) ; `QA-revue2.md` (04:54) postérieur : captures réutilisées, pas de rebuild. Mesures propres sur serveur local port 4731 (PID 13199, arrêté) : axe-core de `node_modules`, console, requêtes, débordement, menu, 9 horloges simulées, liens par curl, JSON-LD parsé.
- Non refaits : sloplint (1 FAIL déjà signalé faux positif par le constructeur), LCP/CLS (QA-revue2 : LCP mobile 996 ms, CLS 0,045), liens externes (URL identiques au dossier, non appelées). La « 404 » de QA-revue2 (axe `color-contrast` 4,36:1) est la réponse brute de `serve.mjs` (page KYW générique), pas la `404.html` du site : celle-ci a 0 violation.

## Vérification des corrections annoncées (REVISION-1)
| id | résultat | preuve |
|---|---|---|
| S1 JSON-LD | confirmé | 1 `ld+json` `Bakery` sur les 5 pages, absent de la 404 ; adresse, `+3281227451`, mar-sam 08:00-18:00, geo 50.4669 / 4.8675, sameAs identiques à `donnees.json`, JSON valide |
| C1 phrases inventées | confirmé | « Pâtisseries et macarons faits maison. » et « …spécialité de la maison. » ; la seule « troisième génération » restante est « Aujourd’hui, la troisième génération dirige la maison », conforme au dossier |
| B1 fête du 1er janvier | confirmé | horloge 2027-01-01 10:00 : « Fermé aujourd’hui » sur `/` et `/contact/` ; 25 déc fermé ; mardi 12 h ouvert ; vendredi 7 h « Ouvre aujourd’hui à 8 h 00 » ; vendredi 18 h fermé ; samedi 17 h 59 ouvert ; dimanche et lundi fermés ; samedi 2 janv 9 h ouvert |
| C2 index carte | confirmé | « La cuisine de midi » x 2 et « La cuisine de l’après-midi » x 2 (index + H2) dans `dist/carte` |
| C3 panneau Chocolaterie | confirmé | « Pralines artisanales, Biétrumés, Macarons de Paris », lien `carte#fetes` (ancre existante) |
| M1 canonical / og | confirmé | canonical et og:image en `https://kyw-test-restaurant.vercel.app/…` sur les 5 pages ; 404 sans canonical |
| N1 menu mobile | confirmé | popover `top 64`, `bottom 844` = hauteur fenêtre, fond opaque, `scrollWidth` 390, Échap ferme (`m2/menu390.png` : rien de visible sous les liens) |

## Findings restants (aucun bloquant)
### F3 finitions (non traités en révision 1, annoncés comme tels)
- **R1 · Cibles de 21 px à 1440** : « Voir à la carte » 100x21 et téléphone 93x21 sur `/` ; téléphone, e-mail 125x21, Instagram 71x21, Facebook 70x21 sur `/contact` ; « Télécharger la carte d’origine… » 273x18 sur `/carte`. Mesure `getBoundingClientRect` (même chiffres que QA-revue2). Ma mesure à 390 sans écran tactile donne les mêmes hauteurs ; QA-revue2 en trouve 0 sous émulation mobile (cibles à 48 px sous `pointer: coarse`). Correction : `min-block-size: 24px; display: inline-block` sur `.link` et les liens de contact (WCAG 2.5.8, niveau AA, non bloquant pour axe).
- **R2 · Décor éditorial** : filet + légende en « eyebrow » (« trois générations, une même maison », légendes de photos) ; lettrine « L » séparée de « a chocolaterie » (`home/planche.png`, vignette d-03). Supprimer le filet ou le limiter à un endroit ; resserrer la lettrine.
- **R3 · Hero mobile** : la photo de façade reste sous la ligne de flottaison à 390 (`home/planche.png`, m-01) ; la remonter au-dessus de l'index de la carte.
- **R4 · `/jobs`** : cadre « Être prévenu » avec grand vide (vu en passe 1, non repris).
- **R5 · Contenu à faire valider par le client** : « Jobs » (anglicisme du site actuel), « avec passion », dates 1946 / 1987 / 1993 / 1974 incohérentes dans le dossier ; la formulation du site (1946 chocolaterie, 1993 salon de thé) suit le dossier.
- **R6 · Technique** : polices TTF/OTF au lieu de woff2 et non préchargées (Fontshare, Google Fonts) ; `/galerie` : image sans width/height (audit WARN) ; `/carte` : phrase « Petit déjeuner et sur le pouce » en double (2 occurrences, audit WARN, probablement l'index et le titre : bénin).

## Ce qui est bien (à ne pas casser)
1. La carte : 142 plats et prix fidèles aux données, index sticky aux libellés désormais distincts, PDF d'origine proposé.
2. Robustesse : axe 0, lien d'évitement, focus visible, reduced motion et sans JavaScript sans texte caché, formulaires honnêtes.
3. Ton : vouvoiement, ponctuation française, aucun tiret cadratin sur les 6 pages, aucune invention (avis, chiffres), mention « Maquette KYW, certaines données sont illustratives », pied KYW et `noindex` sur les 6 pages.

## Décompte
F0 : 0 · F1 : 0 · F2 : 0 · F3 : 6 (R1 à R6). Les 7 corrections de la révision 1 sont vérifiées.
