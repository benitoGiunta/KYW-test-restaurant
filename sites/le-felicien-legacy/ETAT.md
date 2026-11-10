# ETAT · le-felicien · legacy · construction-1 (10/11/2026)

**Fait** : audit (`AUDIT.md`, `.hallmark/before.*`), approche conservée, deal/draw/scaffold/stamp (Solstice, accent vert client), `DESIGN.md`, `comp.md` (c1), données (`src/data/site.ts`, `carte.json` 68 lignes), 5 pages statiques (accueil, la-carte, suggestions-de-la-semaine, contact, 404), pied statement + KywFooter, noindex, JSON-LD, build OK (`dist/le-felicien/legacy/`), sloplint source : 0 FAIL, 0 REFLEX, 0 WARN. Entrée dans `.hallmark/log.json` partagé.

**Reste (phase 2)** : nav mobile en menu Popover (aujourd'hui liens sur une ligne repliée), un reveal, carte en Switcher/filtre et liste de sauts collante, lien actif, ouverture Tablebooker (lien direct pour l'instant, pas d'iframe), états hover/active à tester, trois questions de reproduction, `RAPPORT.md`. Phase 3 : sloplint `--render` avec `--url`, mesures 1280x800 et 375, contraste, hero review, gates § 5.

**Décisions** : Solstice avec vert de marque #2d5735 (lu dans `--bs-primary` de page.html) à la place du vermillon ; Ledge sur la photo 2020 ; Fig sans légende interne (la légende est un `<p class="small cap">` hors figure car `[data-slot]` masque ses enfants) ; PDF de la carte lié vers le site client (10 Mo : non copié) ; horaires dits sur l'accueil et dans la page contact, résumés dans le pied hors accueil ; lundi midi et événements repris tels quels du site.

**Hypothèses / illustratif** : photo de salle = photo libre Unsplash légendée ; illustration de carte présentée comme telle ; aucune note, avis ni nombre de couverts ; « Posez la question à l’équipe » reprend le site (allergènes). Photos réelles manquantes.

**Pièges** : les comps ont été faits après le CSS (écart noté dans `comp.md`) ; `theme.mjs log` écrit dans `.hallmark/log.json` du dossier courant sans `--log` ; un waiver 58 est rejeté (Floor), écrire « note 58 ».
