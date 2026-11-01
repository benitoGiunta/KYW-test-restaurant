# Révision 1 · Chez Guillaume · awwwards

Revue traitée : `REVUE-1.md` (F0 0 · F1 0 · F2 2 · F3 6). Révision ciblée des F2 seulement (consigne de l'orchestrateur, sobriété § 4) ; les F3 restent ouverts pour une passe de finition.

| Finding | Décision | Changement (fichier) | Preuve de vérification |
|---|---|---|---|
| F2-1 · légende « hors menu du mois » inventée | corrige | `src/pages/carte.astro:53` : « Une assiette de la maison. » (le reste de l'affirmation retiré, alt inchangé) | `grep -c "hors menu"` sur `dist/chez-guillaume/awwwards/carte/index.html` = 0 ; `grep` dans `src/` et `DESIGN.md` = 0 ; figcaption rendue : « Une assiette de la maison. » |
| F2-2 · champ « Spectacle de 15 h aussi ? » en texte libre | corrige | `src/pages/reservation.astro` : `fieldset.champ.champ--large.choix` + `legend` + deux radios `name="spectacle"` (`oui`/`non`) avec libellés ; `src/styles/site.css` : règles `.choix*` (legend au style des libellés, filet bas 2 px comme les autres champs, `accent-color` rouge, focus visible) | Mesure Playwright à 1440×900 et 390×844 sur `serve.mjs dist --port 4731` : legend « Spectacle de 15 h aussi ? », 2 radios même `name`, libellés « Oui »/« Non », boîtes 44 px de haut (54 et 58 px de large), 0 débordement horizontal ; clic sur « Non » → `FormData` du formulaire = `spectacle=non` ; capture de l'élément `form.form` aux deux largeurs : alignement et filet cohérents avec les autres champs |

F3-1 à F3-6 : non traités dans cette passe (hors périmètre fixé), aucun ne bloque la publication.

Build : `scripts/q.sh revision-build pnpm build:site sites/chez-guillaume-awwwards` OK (5 pages). Serveur PID 9545 arrêté par `kill`. `DESIGN.md` inchangé (aucune décision de design modifiée : le formulaire garde la grammaire « libellé capitales + filet bas »).

Estimation : publiable (0 F0, 0 F1, F2 corrigés ; la seule invention non marquée relevée est retirée).
