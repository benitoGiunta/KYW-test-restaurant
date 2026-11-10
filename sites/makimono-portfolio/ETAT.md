# ETAT makimono-portfolio (après revue passe 3)
Fait : REVUE-3.md écrite (A_CORRIGER, 0 F0, 2 F1, 2 F2, 4 F3), REVISION-2 vérifiée point par point.
Reste à corriger (révision 3) : F1-1 horaires (`base.css:194`, 9cqi + `minmax(0,1fr)` sur la carte), F1-2 bento à 1024 (2 colonnes jusqu'à 1199 px), F2-1 titre « Accompagnements » à 768, F2-2 `aria: false` SplitText, puis F3.
Pièges : mesurer le texte par `Range.getClientRects()` (la boîte du `dd` ne montre pas le débordement) ; `scrollWidth` reste égal à la fenêtre (`overflow: clip`) ; balayer 320, 768, 1024, 1280, 1440, 1920.
