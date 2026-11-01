# Révision 1 · chez-guillaume · portfolio

Révision ciblée (sobriete.md § 4) : F0, F1 et F2 de `REVUE-1.md`, vérifiés seulement sur ces points. F3 non traités (passe suivante).
Build : `scripts/q.sh cg-portfolio-rev1-build node scripts/build-site.mjs sites/chez-guillaume-portfolio` → 7 pages, OK.
Vérification : `serve.mjs dist --port 4637` (PID 9068, arrêté), mini-script Playwright (supprimé), captures ciblées dans `.shots-rev1/` (gitignoré).

| id | décision | ce qui a été changé (fichier) | preuve de vérification |
|---|---|---|---|
| F0 | — | aucun F0 dans la revue | — |
| F1-1 | corrige | `aria: 'none'` passé à `SplitText.create` (`src/engine/reveal.ts`) ; seuls des `data-split="lines"` existent (12), le texte reste lu tel quel | axe (`aria-prohibited-attr`, `label-content-name-mismatch`, `link-name`) après défilement complet, 6 pages × 1440 et 390 : **0 violation** sur les 12 passes |
| F1-2 | corrige | `aria-label` retiré du logo ; nom donné par `<span class="sr-only">Chez Guillaume, accueil</span>`, cases visibles toujours `aria-hidden` (`src/components/Logo.astro`) | même axe : 0 `label-content-name-mismatch`, 0 `link-name` ; `grep 'aria-label="Chez Guillaume, accueil"' dist/` → 0 |
| F2-1 | corrige | fiche du fondateur : photo `salle-rideaux` (salle sans personne, alt de `photos/index.json`) (`src/data/site.ts`) ; dans la galerie d'Histoire, `salle-rideaux` remplacée par `brunch-tartelette` pour éviter le doublon (`src/pages/histoire.astro`) | `.shots-rev1/histoire-equipe-1440.png` : deux fiches photo de même hauteur, plus de bloc jaune ; `grep -i 'photo à venir' dist/chez-guillaume/portfolio` → 0 |
| F2-2 | corrige | `<em>` retiré de 15 titres (h1 Agenda, Carte, Réservation ; h2 Table, Brunch, Privatiser, Presse, Venir, Maison, Presse, Mur, Place, Formules, Questions, Occasions) ; italique gardé sur 3 titres (accueil Scène, h1 Histoire, h1 Privatisation) ; sur-titres « On en parle » et « La programmation » retirés (`src/pages/*.astro`) | `grep -rn '<em>' src/pages` : 3 titres restants (+ hero et manifeste, hors titres de section) |
| F2-3 | corrige | une seule entrée « Repas-spectacle » mer → sam (`jusqua: 'samedi'` dans `src/data/site.ts`, type `Evenement`) ; `Agenda.astro` rend « MER / SAM », l'étiquette « du mercredi au samedi » et quatre pastilles MER JEU VEN SAM dans la carte ; accueil et agenda : 4 lignes différentes | `grep -c Repas-spectacle dist/.../agenda/index.html` → 1 ; `.shots-rev1/home-agenda-390.png` |
| F2-4 | corrige | `MAX` 2,6 → 1,8 s ; sortie 0,7 + 1 − 0,35 s → 0,5 + 0,65 − 0,25 s (`src/engine/loader.ts`) | 390 px, CPU ×4, 4G lente, 2 passes : loader de 2412 → 4660 ms et 2460 → 4697 ms (**2,25 s** de loader) ; `is-loaded` à 4,66 / 4,70 s depuis la navigation. Le reste vient d'avant le loader : DCL 2,36 / 2,40 s, dernier script reçu à 2,17 s (bundle JS sous 4G lente), hors révision ciblée |
| F2-5 | corrige | réponse FAQ : « Pas du mercredi au samedi : le repas est obligatoire. » puis lundi 12 € et ticket dimanche 20 € (`src/data/site.ts`) ; source : `donnees.json` « repas obligatoire 18h30-20h30 » | texte de la FAQ lu dans la page Réservation à 1440 et 390 |
| F2-6 | corrige | libellé du jour posé sur le fond de la section (`.agenda__jour abbr { background: var(--aplat, var(--c-bg)) }`, `src/styles/base.css`) | `.shots-rev1/home-agenda-1440.png`, `-390.png` : DIM, LUN, MER/SAM sans trait au travers, lignes visibles à droite du libellé |

## Hypothèses et reste
- F2-4 : le loader lui-même est passé sous 2,3 s, mais `loaderMs` (mesuré depuis la navigation) reste ≈ 4,7 s mobile parce que le moteur démarre après 2,4 s de téléchargement JS sous 4G lente. Gagner davantage demande d'alléger ou de découper le bundle (gsap + SplitText + moteur) : à traiter si la revue 2 le maintient.
- Hors revue, vu en capture : la carte « Brunch à volonté » de l'agenda portait « Ticket sur la billetterie » alors que le brunch se réserve par e-mail ou téléphone (`donnees.json`, confirmé par la revue) ; corrigé dans `Agenda.astro` (« Réservation par e-mail ou téléphone » pour l'activité brunch).
- `DESIGN.md` complété (§ Révision 1).

Bilan : 8 corrigés (F1-1, F1-2, F2-1 à F2-6), 0 refusé, 0 impossible. Publiable après revue 2 : oui, sous réserve de F2-4 (temps avant le loader).
