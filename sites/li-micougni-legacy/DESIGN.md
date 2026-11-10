**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 7 pages (/, /vitrine-du-restaurant/, /menu/, /notre-terrasse-arriere/, /evenement-privee/, /a-propos-de-nous/, /contact/) + 404
- **Before** · Floor 32 FAIL, Reflex 18 (Webador rendu) · hero centré, têtes à 32 px, carte en PDF seulement ; les photos, le ton et la phrase « même les demi-fous » restent
- **Keeps** · les 7 routes, le formulaire de contact (3 champs), `mailto`, liens Instagram et Facebook, lien Google Maps, PDF de la carte, textes du client (reformulés seulement pour 58)
- **Files** · create : tout le paquet `sites/li-micougni-legacy/` ; delete : none
- **Shape** · Photographic (08, kept), empreinte Heading petit/plaque · Body bandes photo et rangs · Divider bord d'image et double filet · Button lien/plein · Image pleine · Reveal aucun ; draw ead5b8 : Split Studio / Stage / pastille / letter close, échangés pour Photographic / Poster (posture d'origine) ; pastille et letter close gardés
- **Theme** · Vellum, dealt 1/3 (seed restaurant-namur-local-seasonal-2d5e·8bc329a7·2026-11-10·r0), colourway oxblood reversed : le bordeaux est le lettrage du logo et l'or son cercle. Écartés : Squeeze (vert forêt sans rapport avec le logo, Bento), Ink (teal, grotesque froid, catalogue).
- **Chrome** · nav : pastille flottante (logo, six liens, Réserver) ; pied : letter close (« même les demi-fous ») + coordonnées
- **Hero** · Poster : salle en plein écran, plaque à gauche en bas (titre, une phrase, deux actions)
- **Signature** · la plaque oxblood sur la salle, et le coq orange du client en tuile de 48 px
- **Sections** · Hero · Ardoises (Rows) · Grillades (Split 7/5) · Énoncé (fibre) · Terrasse (Split 4/8 + Rows de liens) · Horaires (Schedule) · Pied
- **Material** · real : carte complète, adresse, téléphone, mailto, réseaux, 30 couverts, horaires du site (mardi 17 h à dimanche 17 h) · pictures : 16 photos du client · absent : avis, presse, GPS, équipe
- **Comp** · hero réel seulement (voir comp.md)
- **Sweep** · phase 3

## Approche
Macrostructure : Photographic (08). Empreinte `Heading plaque|Body bandes photo et rangs|Divider bord d'image + double filet|Button lien et plein|Image pleine|Reveal aucun`. Posture : multipage, toutes les routes gardées, hero Poster (accueil) et Banner (menu), calme, aucune chorégraphie. Dérogations : faux envoi du formulaire neutralisé par `data-endpoint=""` (70) ; la vitrine devient une galerie de plats du client ; champ anti-spam et bandeau cookies supprimés (`dropped`). Test miroir : un voisin bistrot aurait un menu et une photo ; ici la combinaison oxblood + gothique + coq orange + « demi-fous » est propre à Li Micougni.

## Thème
Vellum oxblood reversed. Tokens lus dans `src/styles/tokens.css` : paper `oklch(27% 0.09 20)`, ink `oklch(94% 0.02 80)`, accent or `oklch(84% 0.11 85)`, rule `oklch(44% 0.08 20)`. Display Grenze Gotisch 600 (jamais sous 30 px), Grenze 400 pour les énoncés, Hanken Grotesk pour tout le reste. Rayon 2 px, pas d'ombre, double filet sous les listes. Couleur de marque : orange du logo présent seulement dans l'image du logo.

## Composants
- **Carte** : Rows (nom col. 1 à 5, description, prix à droite en `tabular-nums`, couleur or), une `<article>` par rubrique dans une seule `<section>`, titre de rubrique en colonnes 1 à 4. Pas de tuiles, pas de carte dans carte. Sur téléphone : nom et prix sur la première ligne.
- **Horaires** : Schedule en `<dl>`, lundi fermé en `--color-muted` non barré ; mercredi à samedi : slot `.fill` « heures à confirmer ». Dits une fois dans la section, une ligne courte dans le pied (adresse seulement) ; jour courant en phase 2.
- **Pied** : letter close, 200 à 400 px : sentence-signature en Grenze, coordonnées, six liens, `data-credits`, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>`, `srcset`, `width`/`height`, hero `fetchpriority="high"`, le reste lazy, légende = un fait (sujet du dossier).

## Sur-utilisation
- [x] 1. Floor lié (sloplint statique 0 FAIL) · preuve : `.logs/lm-legacy-lint.log`
- [x] 2. Deal/draw/scaffold/stamp en tête de CSS · preuve : `src/styles/page.css:1`
- [x] 3. Audit avant · preuve : `AUDIT.md`, `.hallmark/before.txt`
- [x] 4. Thème tiré et justifié, écartés nommés · preuve : bloc Picks
- [x] 5. Données réelles, fictif signalé (`.fill`, 2 par page au plus) · preuve : `src/data/site.ts`, `menu.astro`
- [x] 6. Photos du client, WebP, `width`/`height` · preuve : `public/photos/`, `Fig.astro`
- [x] 7. Noindex, mention KYW, signature sur les 8 pages · preuve : grep de `dist/li-micougni/legacy/`
- [ ] 8. Render sloplint `--render` par page, comp c2, reproduction · phase 2 et 3
