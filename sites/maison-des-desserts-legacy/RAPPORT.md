# La Maison des Desserts · variante legacy · 2026-11-20

## 1. Approche conservée
Multi-pages (accueil, carte, galerie, jobs, contact, 404), routes, liens externes, `tel:` et `mailto:` conservés ; composition et système remplacés (Split Studio, thème Atelier, éditorial, retenu). Dérogations : hero Index (façade de Noël illisible sous texte), voir DESIGN.md.

## 2. Axes traités
Voir AUDIT.md et DESIGN.md (checklist). Phase 3 : accessibilité (axe), métadonnées, hiérarchie de titres, waivers.

## 3. sloplint (phase 3)
- Before : 93 FAIL, 38 REFLEX. After (5 URL, `--render` tourné) : 1 FAIL (34), 0 REFLEX, 7 WARN, 7 WAIVED (44c, 8, 71, 83, etc.).
- FAIL 34 = faux positif : `html` et `body` ont `overflow-x: clip` (page.css, mesuré `clip` aux deux, aucun débordement à 1440 et 375).
- Kept : « nothing recorded » (comparaison avec before.json non rendue pour les pages d'origine), WARN confirmé. Dropped : bascule de mode sombre (stamp).
- Build : `pnpm build:site` OK, `pnpm index` OK, noindex et pied KYW sur les 6 routes, aucun tiret cadratin.

## 4. QA (corrigé et vérifié par script Playwright + axe sur les 6 pages)
| Constat QA-build | Action | Vérification |
|---|---|---|
| Accueil : erreur console (ressource 404) | favicon data URI ajouté | 0 erreur console sur 6 pages |
| Contact et jobs : canonical, og:*, twitter:card, favicon absents | ajoutés dans `Base.astro` pour toutes les pages | grep og:image : 6/6 |
| 404 : contraste serious | faux positif (404 brute de serve.mjs) ; vraie 404.html : 0 violation | axe 0 sur les 6 pages |
| Deux `contentinfo` (pied du site + pied KYW) | pied du site en `section aria-label="Coordonnées"` | axe 0 |
| Carte : deux sections « La cuisine » (landmark-unique) | `aria-labelledby` titre + note horaire | axe 0 |
| REFLEX 78 (h2 39 px sous h1 84 px) | h2 de la carte, groupes jobs et cartes au token section (52 px à 1440) | mesuré 52 px / 32 px à 375 |
| REFLEX 71, 83 | waivers écrits avec preuve | sloplint 0 REFLEX |
Non traités : police TTF servie par Google Fonts (hors site), robots.txt et sitemap (WARN `base`, faux positif connu), cibles tactiles du pied KYW (paquet partagé).
Review finish : pas de sous-agent disponible, auto-évaluation seulement.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Téléphone du formulaire | contact, jobs | `0470 00 00 00` (format) | n/a, indication de format |
| E-mail du formulaire | contact, jobs | `nom@exemple.be` | n/a, indication de format |
| Envoi des formulaires | contact, jobs | maquette, rien n'est envoyé (message affiché) | endpoint réel du client |
| Image Open Graph | toutes | photo de façade existante | visuel de partage dédié |
Aucun slot `.fill`, aucun avis repris.

## 6. Demande de matériel
Photo la plus utile : une façade ou vitrine en lumière du jour, 1200 x 630, pour le partage social et le hero. Aussi : polices Sentient auto-hébergées (Fontshare injoignable ici).

## 7. Leçons
Voir `data/usage/test-1/lecons-proposees/maison-des-desserts.md` (mode figé).
