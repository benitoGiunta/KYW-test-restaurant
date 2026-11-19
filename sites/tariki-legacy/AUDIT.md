# Audit Hallmark · Tariki · 2026-11-19

**Source** : https://www.tarikirestaurant.be (Wix, one-page, capture du 19/11/2026), HTML sauvegardé `data/restaurants/tariki/site-actuel/page.html`, captures desktop et mobile. `sloplint --before` : `.hallmark/before.txt` (509 FAIL, 113 REFLEX, 7 WARN, dont l'essentiel est du CSS Wix généré : `#fff`/`#000` purs, `transition: all`, marges hors échelle). Le rendu a levé « a script threw on load » (Worker Wix) et un repli de polices : lu sur les captures du dossier, pas sur le rendu.

**Genre inféré** : atmospheric (grillades au feu de bois, braises, fond noir, soir), registre editorial pour la carte.

**Lecture en quatre lignes**
1. Pour quoi : donner envie de dîner chez Tariki et réserver une table (action unique : « Réserver une table »).
2. Reste : l'identité (flamme ocre, calligraphie arabe, noir et crème), le récit « Notre histoire » sincère, les horaires complets, la carte courte.
3. Se lit généré : 7a (blanc et noir purs), 10a (`transition: all`), 58 (164 mots sur un écran), 62 (états cachés sans classe `.js`), 67 (labels en capitales espacées), 78 (titres de section à 16 px), 77 (une seule section), F3 (pas de `text-wrap: balance`).
4. Cassé : « © 2035 by mysite » (reliquat de modèle), carte uniquement en images sans texte indexable, images sans alt, hero mobile débordant en horizontal, pages `/blank`, `/blank-1`, `/cart-page` vides, deux versions de la carte du soir aux prix différents, adresse du site (rue de l'Ouvrage 2) différente de la BCE (rue du Pont 15 = Bayti).

**Structure d'origine** : une page (hero logo sur braises + bouton, deux affiches de carte posées sur un fond d'arcades, Notre histoire, module de réservation, pied avec horaires) + `/la-carte` (affiches seules). Nav : aucune visible. Pied : logo, baseline, adresse, téléphone, horaires. Animations : Wix (reveals, vidéo sans poster). Images : braises, feu, arcades (probable rendu IA), logo, 3 affiches (qualité 1). Mobile 375 : hero qui déborde. Copie : récit de 150 mots environ, centré.

**Findings par tier** (before.txt) : Floor 50, 58, 62, 67, 7a, 10a ; Reflex 7b, 24b, 28b, 37 (5 familles), 39b, 78 ; Finish F1 (apostrophes droites), F3, F22 (justifié sans césure), F23 (pas de meta description). Jugées (gates.md § 5) : 6b hero centré (le nouveau hero est un Counter à deux colonnes), 8 gabarit « hero, 2 cartes, texte, réservation » (séquence gardée, composition neuve, `waive 8`), 54 et 63 (aucun eyebrow, aucun point médian), 69 (horaires dits une fois, à la fin), 83 (photos : 1 tiers sous le hero, 2 sections photo non adjacentes), 85 (pas de newsletter, pas de « Tous droits réservés »).

**Axes d'amélioration** (par coût) : tokens et typographie (faible), alts et noindex (faible), carte en texte indexable (moyen), meta et JSON-LD Restaurant (faible) ; seul un `full` règle la composition (hero, route en quatre étapes, carte en Rows, fin horaires + réservation) et le rapport de mots par écran.
