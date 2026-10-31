# RAPPORT — gabarit « Ardoise »

**Concept** : la page d'accueil est l'ardoise de la brasserie : nom en deux lignes, suggestion du jour qui s'efface et se
réécrit, onglets MIDI | SOIR, carte en liste typographique à prix tabulaires sur anthracite ; les photos n'arrivent qu'au
survol (aperçu 4:5 qui suit le pointeur) et sur la page salle, en clair.

## QA (deux passes, build de production, `.shots-ardoise/`)

- Passe 1 : 7 pages (index, carte, formules, salle, histoire, reservation, 404) ; passe 2 après corrections : index, carte,
  reservation. Résultat : 0 FAIL, 0 erreur console, 0 débordement 1440/390, 0 violation axe (1 corrigée en passe 1 :
  `.ardoise__lien` craie sur fond clair), reduced-motion : 0 texte caché, rien ne bouge ; clavier : focus visible partout,
  pas de piège ; hover : toutes les cibles réagissent.
- Vitals mobile (4x CPU, 4G lent) : LCP index 1,2 s, carte 1,2 s, formules 2,3 s, salle 1,2 s, histoire 1,2 s,
  reservation 1,3 s, 404 1,1 s ; CLS 0 partout ; 53 à 60 fps au défilement.
- Audit site : 0 FAIL, 15 WARN (phrases d'horaires répétées entre pages, lignes d'exemple présentes sur l'accueil et la
  carte, pas de sitemap ni de robots.txt servis depuis le sous-dossier : attendu pour une maquette noindex).
- Loader : fin à 2,9 à 3,1 s desktop depuis la navigation (plancher du socle), LCP peint dessous à 0,25 s.
- Pas de critique jury dans cet agent (règle « agents courts ») : score à produire par l'agent relecteur.

## Corrections de fin de parcours

- L'aperçu photo restait visible pendant le défilement : réécrit (tout défilement le cache, `pointermove` sur une ligne le montre).
- Nom plafonné à 9rem (deux lignes à 1440), nav mobile en nowrap, ligne du jour sur fond jaune en page claire.
- La pastille « suggestion illustrative » restait visible les jours fermés (phrases réelles) : `.ex { display: inline-block }`
  écrasait l'attribut `hidden` → règle `.ex[hidden] { display: none }`.
- E-mail illustratif retiré du pied de page (donnée de contact inconnue au dossier : jamais affichée, même marquée).

## Placeholders (`site.ts`, `placeholder: true` ou `exemple: true`)

- 5 suggestions du jour (lundi à vendredi), marquées « suggestion illustrative » ; samedi et dimanche sont des phrases réelles.
- 7 catégories de carte d'exemple (pour commencer, plats, desserts, boissons, entrées du midi, plats du midi, desserts du
  midi) : chaque ligne porte « exemple » ; le menu réel (dégustation 4 services, formule 3 services, lunch) est réel.
- Stationnement « à confirmer », 2 avis d'exemple (étiquetés), rôles d'équipe non prouvés marqués, e-mail (non affiché).

## Ce qui manque / points ouverts

- Un trait clair de 2 px en haut à gauche de `apercu.png` (sous la barre d'état, ~x 53-213) : probablement le lien
  « Aller au contenu » ou la barre de progression du loader en fin de sortie ; invisible dans les captures `d-01-hero`
  du shoot, à vérifier par l'agent relecteur.
- Photos d'assiettes 4:5 : 8 aperçus seulement, tous dérivés des photos client ; un vrai client en fournira davantage.
- Score critique à produire (jury) ; dernière passe « retire un accessoire » laissée au relecteur.

## Leçons structurelles

- Une classe utilitaire avec `display: inline-block` (ou `flex`) écrase l'attribut HTML `hidden` : toute classe de ce
  genre a sa règle `.classe[hidden] { display: none }`, et les captures d'un élément piloté par `hidden` se lisent le
  jour où il doit disparaître (ici un samedi, jour fermé).
- `apercu.png` dépend du jour de capture quand le hero affiche une ligne calculée (suggestion, barre d'état) : la lire
  avant de livrer et vérifier que la phrase du jour est cohérente (jour fermé = phrase réelle, sans pastille).
