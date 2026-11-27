# RAPPORT : ne5t / portfolio (phase 3, QA)

## Placeholders
- Offre « Privatisation » : texte et exemples d'occasions illustratifs (`textePlaceholder: true`, badge visible).
- Heures exactes des services : « à confirmer » sur /reservation/ ; lundi et mardi « fermé (à confirmer) ».
- Adresse : Avenue Vauban 46 (site client) contre Allée de Menton 26 (BCE) : à confirmer.
- Prénoms « Nico » et « Manu » seuls ; photos de service sans légende nominative.

## QA (lecture de QA-build.md et planche accueil)
- Shoot : 0 erreur console, 0 requête en échec, 0 débordement, CLS 0, LCP mobile 1,4 s, 60 FPS, focus visible partout.
- Corrigé : axe `label-content-name-mismatch` sur `.header__brand` (aria-label retiré, le texte visible nomme le lien) ;
  phrase « lunch carte blanche à midi » répétée 3 fois sur /reservation/ (note gardée au jeudi, « du jeudi au samedi »).
- Vérifié : rebuild OK (8 pages), capture ciblée /reservation/ : axe sans violation, une seule occurrence de la note.
- Non corrigé, hors périmètre : contraste 4,36:1 de `.kyw-footer__note` sur la 404 brute de serve.mjs (paquet partagé `kyw-footer`) ;
  WARN robots.txt / sitemap (faux positif connu sous `base`).
- Non fait : sloplint, mesure LCP en série, `pnpm index`, commit de `pnpm-lock.yaml`.

## Leçons structurelles
- Velours : z-index des onglets, `capitalize` sur les jours, `.horaires` à 320 px, aria-label de marque différent du texte visible : à reporter dans `gabarits/velours/` (intouchable ici).
