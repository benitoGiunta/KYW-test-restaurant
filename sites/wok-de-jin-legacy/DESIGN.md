# DESIGN · Wok de Jin (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**
- **Redesign** · full · 3 routes (/, /reveillon, 404 ; /reveillon/reserver et /confidentialite restent chez le client)
- **Before** · Floor 9 gates en FAIL, Reflex 9 (AUDIT.md) · modale d'arrivée, copie à tirets, cartes arrondies
- **Keeps** · tous les liens (tel, itinéraire, réservation réveillon, confidentialité, crédit) · prix, horaires, textes du client · photos réelles
- **Files** · création complète du paquet `sites/wok-de-jin-legacy/` ; rien supprimé hors du site
- **Shape** · Photographic (08, gardée) ; le draw 570c12 donnait Split Studio : refusé, le site d'origine est fait de photos plein cadre et d'un tarif, pas d'un empilement de splits (et le draw exclut Split)
- **Theme** · `brand` : noir laqué #1e191b, corail #ff5366, or #ddba86, lus sur les captures du client (CSS externe non sauvegardé). Deal r0 : Squeeze (vert forêt), Vellum (parchemin), Atelier (calcaire) écartés, aucun ne porte le noir et corail du client ; pas de re-deal
- **Chrome** · nav : dalle (slab) sombre, filet or, Réserver à droite ; pied : mast (le nom en grand), le draw donnait colonnes d'index, trop pour deux routes
- **Hero** · Ledge : la salle rouge plein cadre, titre au bas, phrase et action à droite
- **Signature** · 16,80 € le midi, posé en or à 10 rem dans les tarifs et repris à 80 € au réveillon
- **Sections** · Hero · Tarifs (Table) · Showcase sushis · Buffet (Rows) · Wok (Bento 7/5) · Réveillon (Band) · Salle (Showcase + Rows) · Horaires et adresse (Schedule) · Pied
- **Material** · real : tarifs, horaires, adresse, téléphone, textes · pictures : 16 photos du client en WebP · absent : avis, notes, e-mail, réseaux, histoire (rien d'inventé)
- **Comp** · 2 built, c1 chosen
- **Sweep** · phases 2 et 3

## Approche
Macrostructure 08 Photographic, empreinte `Heading petit sur plaque|Body photos alternées avec tableaux et rangées|Divider bord d'image|Button lien ou pastille corail|Image plein cadre|Reveal aucun`. Posture : calme, une page, hero Ledge, aucun scroll pattern (phase 2 : un reveal au plus). Dérogations : modale d'arrivée supprimée (réveillon remonté en bandeau et en route), carrousel de salle remplacé par une photo et une rangée (18), pluie de reveals sans suite (craft § 5), caractères chinois décoratifs retirés (aucune lecture vérifiable, 83), `waive 8` sur la séquence gardée. Test miroir : un voisin n'aurait pas la salle en Ledge sous un titre serif sur noir laqué avec le prix en or ; décision changée par rapport au draw : forme et pied.

## Thème
Brand, `dealt 0/3, seed restaurant-namur-asian-buffet-b13f·00f1f266·2026-11-19·r0`. Tokens de `src/styles/tokens.css` : paper oklch(22% 0.009 352), ink oklch(95% 0.015 75), accent oklch(68% 0.207 18), or oklch(81% 0.079 77), focus oklch(86% 0.076 80). Polices : Gloock (titres, prix, une seule graisse) et Instrument Sans 400/500/600 (corps, labels en casse de phrase).

## Composants
- **Carte** : pas de liste de plats (buffet). Tarifs en Table : service en colonne 1, buffet seul et buffet et boissons à droite, `tabular-nums`, filets (F6, F24).
- **Horaires** : Schedule en `<dl>`, mardi en `--color-muted` non barré, dits une fois, section de clôture ; jour courant : phase 2.
- **Pied** : mast, adresse, téléphone, liens, ligne légale du client sans « tous droits réservés » ; puis KywFooter.
- **Photo** : `<div data-slot data-alt><img width height srcset sizes>` ; hero `fetchpriority="high"`, autres lazy ; légendes hors du slot ; photos 10 et 11 (visages) non utilisées.
- **Boutons** : une seule pastille corail pleine par écran ; fantôme et lien soulignés or pour le reste.

## Sur-utilisation
- [x] 1. Hallmark SKILL.md, redesign.md, anatomy.md § book, layout.md lus · preuve : AUDIT.md, DESIGN.md
- [x] 2. sloplint `--before` · preuve : `.hallmark/before.txt`
- [x] 3. deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-6`, `.logs/wok-deal.log`, `wok-draw.log`
- [x] 4. comp avant build, deux comps capturées · preuve : `comp.md`, `.hallmark/comps/*.png`
- [x] 5. pied KYW, noindex, `lang="fr"` · preuve : `src/layouts/Base.astro`
- [ ] 6. sloplint rendu sur le site construit : phase 2 (hors navigateur en phase 1)
