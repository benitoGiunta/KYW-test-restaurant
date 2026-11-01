# Révision 1 · La Brasserie du Quai · awwwards

Révision ciblée (sobriété § 4) : F1 et F2 de `REVUE-1.md` (aucun F0). F3 non traités, laissés à la revue suivante.
Build : `scripts/q.sh revision-build node scripts/build-site.mjs sites/brasserie-du-quai-awwwards` → exit 0, 5 pages.
Vérification : grep dans `dist/brasserie-du-quai/awwwards/`, mini-script Playwright (serve.mjs dist, port 4471, arrêté)
à 1440×900 et 390×844 sur /, /reservation/, /histoire/, captures du hero de /histoire/ et du bas des classiques.

| id | décision | ce qui a été changé (fichier) | preuve de vérification |
|---|---|---|---|
| F1-01 | corrige | `src/data/site.ts` : rôle de Pierre-Alexandre « En salle, avec son équipe. » → « Avec son équipe. » (donnees.json : « met en avant son équipe ») | dist/histoire : `Pierre-Alexandre</h3><p>Avec son équipe.` ; « En salle » : 0 occurrence |
| F2-01 | corrige | `src/data/site.ts` : `fermeture.texte` = « Jours de fermeture hebdomadaire » ; `reservation.astro` : texte + « : » + pastille `.exemple` seule ; `Footer.astro` : « … : à confirmer. » | dist/reservation : `Jours de fermeture hebdomadaire : <span class="exemple">à confirmer</span>` ; « à confirmer » doublé : 0 |
| F2-02 | corrige | `src/data/site.ts` : `photo: null` sur le vol-au-vent « Royal » et le Plateau du Quai | dist/index : 1 seule vignette `index__photo` (sole) ; capture classiques 1440 et 390 |
| F2-03 | corrige | `src/pages/histoire.astro` : hero `facade` → `terrassePortrait` (06-terrasse-meuse-portrait, alt existant exact) ; `src/lib/photos.ts` : alt de `facade` rendu exact (immeuble, pelouse, ciel couvert) ; `DESIGN.md` l. 148 | captures histoire 1440 et 390 : terrasse, parasols, Meuse ; ligne d'eau et reflet intacts |
| F2-04 | corrige | `src/styles/site.css` : `.lt--bloc` (inline-block, padding-block 0,375 rem, 0,75 rem sous 760 px) ; appliqué aux liens seuls sur leur ligne (`Footer.astro` : plan, téléphone, e-mail, réseaux, Michelin ; `reservation.astro` : plan, e-mail) ; « Toute la carte » sorti du paragraphe dans `<p class="classiques__lien">` (`index.astro`) ; ligne Michelin du colophon sur sa propre ligne (`div.pied__colophon`) | Playwright : 21 liens `.lt--bloc` mesurés, 0 sous 24 px (desktop), 0 sous 44 px et `elementFromPoint` à ±21 px OK (390 px) ; 0 débordement horizontal |
| F2-05 | corrige | `src/layouts/Base.astro` : `openingHoursSpecification` retiré ; `src/data/site.ts` : `joursLd` supprimé, « Cuisine belge » retiré de `typeCuisine`, hypothèse 1 mise à jour | dist : `openingHours` / `Cuisine belge` : 0 ; `"servesCuisine":["Brasserie","Fruits de mer"]` |

Hypothèses : liens inline au milieu d'une phrase (404 « appelez le », Michelin dans le texte de /histoire/) non agrandis
(non cités par la revue ; un padding y gonflerait l'interligne, cf. lecons.md 2026-10-31). Photo `facade` conservée dans
`photos.ts` (alt corrigé) bien qu'inutilisée.

Décompte : 6 corrigés, 0 refusé, 0 impossible. Publiable : oui, sous réserve de la revue 2.
