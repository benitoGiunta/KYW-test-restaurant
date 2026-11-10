# Huile sur le feu · variante legacy · 2026-11-10

## QA (phase 3)
- Source : QA-build.md (agent captures) ; build sur `dist/` : 0 erreur console, 0 requête en échec, pas de débordement X (375 et 1440), LCP 0,5 s / 0,9 s, clavier sans piège, 0 texte caché en reduced-motion.
- Corrigé : (1) contraste axe `.schedule__today` 4,32:1 -> nouveau token `--color-accent-text` (oklch 46 %), vérifié par `getComputedStyle` ; (2) cibles tactiles 21 px de haut (« Voir toute la carte », « Voir la boutique », « Découvrir la maison », « Découvrir la carte/boutique », « Itinéraire ») -> `a.link` en `min-height: 44px` sous `(pointer: coarse)`, mesuré 44 px sur accueil, restaurant, contact ; (3) og:title, og:description, og:type, twitter:card ajoutés dans `Base.astro`.
- Non corrigé, sans objet : le 404 de la capture (document-title, html-has-lang) est la page 404 du serveur de statique, pas celle du site ; la 404 du site porte lang et title.
- Non corrigé : og:image (aucune image de partage fournie), phrase d'horaires répétée 5 fois (donnée réelle, affichage volontaire), CLS desktop 0,055 de l'accueil (sous le seuil 0,1).
- Non fait faute de budget : sloplint final page entière, finish review en sous-agent, jury, log theme.mjs. À faire par un prochain passage si exigé.
- Contrôles : noindex et kyw-signature présents sur les six pages ; build passe.

## Placeholders et faits à confirmer
| Élément | Où | Valeur actuelle | À remplacer par |
|---|---|---|---|
| Année de création | restaurant | 2005 (Yelp 2002, Kompass 2007) | date confirmée par le client |
| Photos | accueil, restaurant, boutique | reprises de l'ancien site, authenticité non vérifiée | photos du client |
| Image de partage | og:image | absente | visuel 1200x630 |
| Horaires, partenariat Oliviers & Co, doublons de plats | contact, carte | repris de l'existant | validation client |
Photo qui manque le plus : une vue de salle ou du feu en service pour la tuile « huile » du bento (texte seul actuellement).
