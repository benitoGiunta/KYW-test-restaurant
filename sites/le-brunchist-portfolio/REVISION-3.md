# Révision 3 — portfolio Le Brunchist (orchestrateur)

- F1-1 débordement mobile des figures `data-reveal="scale"` : `main { overflow-x: clip; }` dans `src/styles/base.css`.
  Mesure : `scrollTo(300,0)` 3 s après chargement, sans défiler, sur `/`, `/carte/`, `/histoire/`, `/brunch/`, `/reservation/`
  à 320, 360, 390, 412 px : 20 cas, `scrollX` = 0 partout.
- F3-1 à F3-5 non traités (finitions).
