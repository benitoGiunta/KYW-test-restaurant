**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 7 routes (/, /notre-histoire, /menu, /carte-restaurant, /avis, /galerie, /bayti-chez-vous) + 404
- **Before** · Floor et Reflex du CSS Wix (voir AUDIT.md) ; la carte complète et les photos restent
- **Keeps** · toutes les routes, liens Barestho, tel:, mailto:, réseaux, formulaire de contact (champs Prénom, E-mail, Téléphone, Message), la carte et ses prix, l'avis de Brenda C. mot pour mot
- **Files** · create : tout le paquet `sites/bayti-legacy/` ; edit : rien hors de ce dossier ; delete : aucun
- **Shape** · Photographic (kept), draw 60d80a (Letter proposé, écarté : le site d'origine est multipage et photographique)
- **Theme** · Squeeze, dealt 1/3, seed restaurant-namur-middle-eastern-2323·3a7fc9f2·2026-11-27·r0 (vert forêt chromatique : porte l'herbe et les feuilles des photos). Écartés : Vellum (blackletter, trop patrimonial pour une cuisine du quotidien), Atelier (limewash calme, déjà beaucoup tiré au journal).
- **Chrome** · nav : dalle (slab), logo à gauche, liens, Réserver à droite · footer : mast (le nom en très grand, quatre colonnes)
- **Hero** · Counter sur l'accueil (réservation et texte à gauche, photographie à droite, deux tuiles de prix juste dessous) ; Banner sur les autres routes
- **Signature** · deux prix en figures géantes (45 € le soir, 28 € de jour) sous la photographie
- **Sections** · Hero · Adresses (deux tuiles) · Foyer · Trois façons (Index) · Horaires (Schedule) · Réservation · Contact · Mast
- **Material** · réel : 33 photos du client, carte et prix, horaires Mar à Sam, avis de Brenda C. · absent : salle, façade, équipe, presse, date d'ouverture
- **Comp** · non construit (voir comp.md)
- **Sweep** · phase 3 ; sloplint src + URL : 0 FAIL, 0 REFLEX ouvert au dernier passage de phase 1

## Système (depuis tokens.css)
Papier vert `--color-paper` oklch(41% .10 154), tuile `--color-paper-2`, bande profonde `--color-paper-3`, encre blanc chaud, accent pêche `--color-accent`, carte blanc chaud une fois par page (`--color-card`). Polices : Gabarito 800 (titres, chiffres), Manrope 500/700 (corps). Rayons 24 / 16 / pill. Espacements : échelle partagée ; colonnes 48 px.

## Composants
- **Carte** : Rows (titre col. 1, description, régimes en texte, prix à droite en tabular-nums, `layout.md` § 5) ; menu 8 services numéroté ; carte traiteur en Switcher (`role="tablist"`, toutes les rubriques lisibles sans script).
- **Horaires** : Schedule en `<dl>`, `<time>`, jour fermé en muted non barré, jour courant sur `--color-paper-3`.
- **Réservation** : bande profonde, titre à gauche, texte et bouton à droite.
- **Pied** : mast, adresses, horaires, contact, réseaux, `data-credits`, puis KywFooter.
- **Photo** : `<figure>` + `data-slot` + `data-alt`, `srcset` 800/1600, hero eager + `fetchpriority="high"`, autres lazy.

## Sur-utilisation
- [x] 1. Audit lu avec captures · preuve : AUDIT.md
- [x] 2. deal/draw/scaffold via theme.mjs, journal $LOG · preuve : `.hallmark/log.json`, stamp page.css:1
- [x] 3. Hallmark SKILL.md, redesign.md lus · preuve : stamp et Picks
- [x] 4. sloplint src + URL rendue · preuve : 0 FAIL, REFLEX 44c et 26b corrigés
- [ ] 5. Comps c1/c2 · non construits, raison dans comp.md
