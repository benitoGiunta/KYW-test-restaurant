# Revue awwwards · Tariki · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans relire DESIGN.md, avis formé à la passe 1 et confirmé) : un fil doré en forme de route (Syrie, Liban, Turquie, Grèce, Namur) qui relie chaque page sur fond charbon, grande serif crème et ocre ; la 404 casse le fil à la Grèce.

Scores /10
- Design 8 : identité tenue sur 5 pages (`rev2-pl-h1440.png`, `rev2-pl-r1440.png`) ; sur desktop la section « Trois adresses » laisse un vide d'environ 150 px sous les trois titres (voir F3).
- Usabilité 8 : menu « Menu » à 390 px, CTA Appeler et Réserver en ligne, 0 cible < 24 px hors le rail volontaire de la carte, formulaire mailto qui dit qu'il n'envoie rien.
- Créativité 8 : la route reste l'unique signature (hero, rail de la carte, pied, 404) ; limite connue : aucune photo de plat (le dossier n'en a pas).
- Contenu 8 : les trois contenus inventés de la passe 1 sont retirés ; prix, horaires, adresse, téléphone, JSON-LD conformes à `donnees.json` ; 0 tiret cadratin, 0 apostrophe droite.
- Technique 8,5 : build du dist (00:06:10) postérieur à `src/` (00:05:47), 0 erreur console, 0 requête en échec, 0 violation axe, 0 lien mort, CLS 0, LCP mobile 2000 ms (QA-revue2).

Méthode : dist, QA-revue2.md (accueil, carte, 404) et planches réutilisés (captures postérieures au dist) ; la page réservation n'est pas dans le QA : capturée par moi (`rev2-pl-r1440.png`, `rev2-pl-r390.png`), avec histoire (`rev2-pl-h1440.png`, `rev2-pl-h390.png`). Script maison `rev2-mesure.mjs` (axe-core de node_modules, console, requêtes, `scrollWidth`, enfants hors fenêtre, masques de titres, cibles, texte à opacité 0, images cassées, un seul h1) : 5 pages x 5 largeurs (1440, 1024, 768, 390, 360), résultat : 0 écart hors le rail de la carte à 390 et 360 px (liste `OL` de -214 à 504, décalage voulu, `scrollX` de page inchangé) ; `color-contrast` uniquement en « à vérifier » (7 à 20 nœuds, crème ou ocre sur noir), 0 violation. Script Python sur le `dist/` : 0 lien interne mort, `noindex, nofollow` (conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et un seul `h1` sur les 5 pages, JSON-LD `Restaurant` avec adresse, téléphone `+32 492 92 18 39` et 3 `openingHoursSpecification`.

## Vérification des corrections de REVISION-1.md
- **R1-01 (F1) corrigé, vérifié.** `grep "Dites-le"` : 0 occurrence sur les 4 pages de contenu ; `reservation/index.html` et capture `rev2-pl-r1440.png` (bloc « Bon à savoir », 4e puce) : « La carte signale les allergènes : fruits à coque, lait, sésame. » ; dossier : « Allergènes signalés (fruits à coque, lait, sésame) ». Aucune autre procédure ajoutée.
- **R1-02 (F2) corrigé, vérifié.** Texte de `histoire/index.html` : « Bayti », « Bayti le Comptoir », « Tariki » sans légende, seul Tariki porte « Il prolonge les deux autres sans les remplacer. » (dossier, point 9 : « prolonge Bayti et Bayti le Comptoir sans les remplacer »). Captures desktop et mobile : pas de trou ni de décalage dû aux `<li>` sans `<span>` (hypothèse de la révision confirmée) ; au bureau, la rangée des trois titres est plus courte que le texte qui la suit, vide résiduel noté en F3.
- **R1-03 (F2) corrigé, vérifié.** `grep "Photos : "` : 0 ; pied de chaque page : « Visuels d’ambiance du site de Tariki, illustratifs. » ; légendes de photos (« Feu de camp : visuel d’ambiance du site de Tariki, illustratif. ») cohérentes.
- Non-régression : aucune mise en page touchée hors `histoire.astro` ; mesures ci-dessus à 5 largeurs sans écart nouveau.

## Findings (tous F3 ; aucun F0, F1, F2)
- **R2-01 · F3 · coupure de l'heure (nouveau)** : `reservation/` à 1440, puce « Du mercredi au samedi… », la ligne se coupe entre « 14 » et « h » (`rev2-pl-r1440.png`, bloc « Bon à savoir », 2e puce) ; le dist n'a que 7 U+00A0 pour le site entier, les heures n'en ont pas. Correction : U+00A0 entre nombre et « h » dans `site.ts` (ou `white-space: nowrap` sur les heures).
- **R2-02 · F3 · répétition des horaires (R1-04, non traité)** : « 11 h 30 à 14 h » dit 4 fois sur l'accueil et sur la réservation (audit WARN, QA-revue2). Correction : retirer les puces « Du mercredi au samedi… » (en gardant le prix 9 € et 17 € ailleurs) et « Le lundi et le mardi… » qui redoublent le tableau.
- **R2-03 · F3 · survol (R1-05, non traité)** : 3 cibles sur 7 de la carte et 1 sur 7 de l'accueil changent seulement de couleur au survol (QA-revue2). Ajouter un soulignement ou un déplacement si ces lignes sont cliquables.
- **R2-04 · F3 · glyphe `ş` (R1-06, non traité)** : « turşu » en police de repli (hors sous-ensemble). Ajouter U+015E, U+015F au sous-ensemble.
- **R2-05 · F3 · vide au bureau** : section « Trois adresses, un même chemin », environ 150 px vides sous les trois titres avant la photo du feu (`rev2-pl-h1440.png`, 3e vue) depuis le retrait des légendes. Réduire le `padding-bottom` de la section ou l'aligner sur la photo.
- **R2-06 · F3 · champ date** : le champ `type="date"` affiche « mm/dd/yyyy » (format de la locale du navigateur de test) ; sans objet pour un navigateur en français, noté pour mémoire.

## Ce qui est bien (à ne pas casser)
1. La route unique et sa cohérence (en-tête, rail de la carte à 390 px volontairement décalé, pied, 404 cassée à la Grèce).
2. Honnêteté du contenu : carte exacte, « Le début du voyage » non affiché, aucun avis, chef ni date inventés, crédits et légendes marqués illustratifs, formulaire mailto transparent.
3. Technique propre : 0 erreur, 0 axe, 0 lien mort, CLS 0, LCP mobile 2 s, reduced-motion sans texte caché.
