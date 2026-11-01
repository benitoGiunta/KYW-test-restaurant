# Révision 1 · Chez Guillaume · legacy

Revue traitée : `REVUE-1.md` (0 F0, 0 F1, 3 F2, 6 F3). Révision ciblée des F2 seulement (consigne de passe) ; les F3 sont laissés en l'état.

| Finding | Décision | Changement (fichier) | Preuve de vérification |
|---|---|---|---|
| F2-1 JSON-LD `Restaurant` absent | corrigé | `src/layouts/Base.astro` : bloc `application/ld+json` construit depuis `site.ts` (`resto`, `horaires`) : nom, url, image OG, téléphone `+32 81 26 25 65`, e-mail, adresse `Rue Lelièvre 4, 5000 Namur, BE` (donnees.json), `hasMap`, `sameAs` Facebook et Instagram, `openingHoursSpecification` lun-sam 18:00-00:00, dim 10:00-18:00 | `grep -c application/ld+json` = 1 sur les 7 fichiers HTML de `dist/chez-guillaume/legacy/` ; JSON relu par `json.load` (adresse, téléphone, 7 jours conformes) |
| F2-2 Barre « Réserver un spectacle » recouvre l'agenda mobile | corrigé | `src/styles/page.css` : `.barre { display: none }` sous 40 rem (la nav pilule garde « Réserver ») ; `.is-barre.is-agenda` masque la barre tant qu'une liste `.agenda` est à l'écran ; `Base.astro` : IntersectionObserver sur `.agenda` ; `DESIGN.md` § motion mis à jour | Playwright : 390 px accueil (agenda) et `/agenda/` → `display:none` ; 1440 px : barre visible après le hero, cachée dans l'agenda, revisible après ; captures `.shots-chez-guillaume-legacy-rev/m-accueil-agenda.png`, `d-accueil-agenda.png` (aucun bouton recouvert) |
| F2-3 Brunch non joignable depuis l'accueil | corrigé | `src/pages/index.astro` : lien « Le buffet du brunch » → `restaurant/#brunch` dans la carte « Le dimanche, brunch stand-up » ; `page.css` : `.moment--accent .link` en encre (le bleu `accent-2` donnait 4,32:1 sur le rose) | Clic réel depuis l'accueil → `/restaurant/#brunch`, `t-brunch` `aria-selected="true"`, `p-soir` caché, `p-brunch` visible (`d-restaurant-brunch.png`) ; lien 48 px de haut ; contraste encre sur `accent-soft` > 12:1 |

Contrôles de fin : build `scripts/q.sh revision-build node scripts/build-site.mjs sites/chez-guillaume-legacy` exit 0 (7 pages) ; sloplint `src --url` accueil et `/restaurant/` (`--genre playful`) : 0 FAIL. Serveur `serve.mjs dist --port 4791` arrêté par `kill <PID>`.

Hypothèses : `closes: "00:00"` pour « minuit », comme le demande la revue ; `pnpm index` non relancé (liste des sites inchangée).
