# REVISION-1 — brasserie-edgard portfolio

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `lunch.astro` : « Et les suggestions du moment. » | grep dist : 0 « à toute heure » |
| F1-2 | corrigé | `motion/setup.ts` : créneau du jour passé → « Fermé en ce moment, réouverture demain à 10:00 » ; « Fermé aujourd'hui » réservé à un jour sans service | horloge simulée : lun 23:00 → « réouverture demain à 10:00 » ; mer 09:00 → « ouverture à 10:00 » ; mar 16:30 → « Ouvert jusqu'à 22:30 » |
| F2-1 | corrigé | `setup.ts` : « Ouvert jusqu'à 22:30 » | idem |
| F2-2 | corrigé | `Marquee.astro` : « Ouvert tous les jours, 10 h à 22 h 30 » (calculé de `site.horaires`) | grep dist |
| F2-3 | corrigé | `Base.astro` : titre « Brasserie à Saint-Servais (Namur) » | `<title>` de l'accueil |
| F2-4 | corrigé | `salle.astro` : « située {adresse} » | grep « au Chaussée » : 0 |
| F2-5 | corrigé | `index.astro` : « la Brasserie Edgard (« Mr Edgard ») vous accueille » | grep « habitués » : 0 |
| F2-6 | corrigé | `reservation.astro` (description + chapeau) : Barestho, e-mails non enregistrés ; numéro gardé dans l'encart | grep « par téléphone » : 0 |
| F2-7 | corrigé | formule « petit creux / dîner d'affaires… » gardée sur l'accueil seul ; `salle.astro` (titre « Salle et terrasse », texte sur terrasse/tables) et `groupes.astro` (menus à prix fixe par personne) parlent de leur objet. Bloc horaires/bandeau (structure du gabarit) non touché | grep src |
| F2-8 | partiel, non résolu | `fetchpriority="high"` sur l'image + `<link rel=preload>` (accueil seulement). Loader masqué en mobile ; image reçue à ~3,4 s sous CPU x4 + 4G lente (JS et CSS en concurrence), LCP 3,5 à 3,7 s : pas de gain mesuré (2 passes 3472 ms, 3680 ms) | mini-script Playwright |
| F2-9 | corrigé (landmarks) | `Footer.astro` : `<footer>` → `<div role="presentation">` (reste 1 `<footer>` : KYW) ; `Base.astro` : bandeau dans `<aside aria-label="Informations pratiques">` | grep dist : 1 `<footer`, aside présent ; scrollWidth 390 = 390. Contrastes « à vérifier » non tranchés |

Build : `pnpm build:site` passé (7 pages). Hypothèse : F2-8 demande un travail de moteur (différer le JS) hors périmètre d'une révision ciblée. Axe non relancé (pas de QA complète).
