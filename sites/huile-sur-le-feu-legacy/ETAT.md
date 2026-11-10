# ETAT variante legacy · huile-sur-le-feu · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée, deal (0/3, thème de marque), draw 47923d, scaffold `--brand`, stamp en tête de `src/styles/page.css`, comps c1/c2 (`comp.md`, c1 retenu), `DESIGN.md` (Picks, Approche, Thème, Composants, Sur-utilisation 1 à 5 cochés).
- Six pages statiques : `/`, `/restaurant/`, `/menu/`, `/boutique/`, `/contact/`, 404. Composants : Nav, Photo, PageHead, Rows, Horaires, Pied ; données `src/data/site.ts`, `carte.json`, `photos.json`. Build passe (`dist/huile-sur-le-feu/legacy/`), grep : KywFooter, noindex et mention sur les six pages, 0 tiret, 0 apostrophe droite.
- Sloplint (page d'accueil aplatie, rendu) : restent le FAIL 76 (asset du kyw-footer absent de la copie plate) et le REFLEX 72 du paquet kyw-footer (jamais modifié) ; 49a corrigé (nowrap), F4 répondu.

## Reste (phases 2 et 3)
- Phase 2 : menu mobile (popover), jour courant dans Horaires, un reveal CSS, états des contrôles (disabled, loading), `--stage hero` et hero review, capture des six pages à 375 et 1440, vérifier que la tuile « histoire » et la tuile « huile » du Bento ne sont pas trop vides (min-height 16 rem), `text-wrap: balance` des titres, contraste du lien `.link--deep`.
- Phase 3 : sloplint final, jury, RAPPORT.md, Picks « Sweep », `pnpm index`.

## Décisions et hypothèses
- Thème : marque (bordeaux, olive, flamme lus dans le CSS du site) sur papier crème ; aucun des trois thèmes dealt ne portait le bordeaux. Polices Marcellus (marque) + Hanken Grotesk ; Bebas Neue et Homemade Apple abandonnées (capitales espacées).
- Abandonnés (`dropped`) : sélecteur EN/IT/NL, bannière de cookies, /privacy, /cookies, widget Barestho en page (lien conservé), carte Google Maps de /contact (lien Itinéraire conservé).
- Reworded : sous-titre du hero (58), tiret cadratin de la tuile huile (19), « 21 ans plus tard » retiré (date relative).
- Données à vérifier avec le client : 2005 (Yelp indique 2002, Kompass 2007), authenticité des photos (03, 04, 06, 08 à 11, 13 à 16 au rendu très lisse, IA possible), doublons de plats de la carte (formats entrée/plat), horaires, partenariat Oliviers & Co. Portrait 05 non utilisé (non identifié). Aucun placeholder, aucun slot `.fill`, aucune note ni avis.
- Piège : un `[data-slot]` avec image masque ses frères (base.css) : les légendes sont hors du slot.
