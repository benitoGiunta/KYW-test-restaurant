**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, one-page conservé (contenu, liens, Zenchef, mailto, tel, PDF gardés).
- Before : `.hallmark/before.txt` (202 FAIL, 90 REFLEX, 16 WARN), AUDIT.md.
- Keeps : one-page, ordre héros, À propos, carte, horaires, réservations, job, contact ; photo de salle en héros ; widget de réservation (lien Zenchef rid 367820) ; PDF de la carte.
- Files : `src/styles/{tokens,base,page}.css`, `src/components/*`, `src/pages/{index,404}.astro`, `src/data/*`.
- Shape : one-page en rangées (macrostructure conservée), hero Poster.
- Theme : Spore (dealt 1/3, seed restaurant-namur-family-brasserie-77f1·05513bf6·2026-11-20·r0). Écartés : Vellum (blackletter trop cérémonieux pour une brasserie familiale), Ink (teal civique, photos désaturées, aurait éteint les fauteuils orange).
- Chrome : barre fine collée en haut, logo, cinq ancres, un bouton cuivre.
- Hero : photo de salle plein cadre, titre en bas à gauche sur voile sombre, un bouton, un lien.
- Signature : les fauteuils orange en plein cadre, un accent cuivre repris de la marque (#ce5923 lu dans le CSS d'origine).
- Sections : À propos (split), Carte (Switcher + rows), bande de trois photos, Horaires (Schedule), Réservation (split inversé), Job (liste), Pied (mast).
- Material : photographies du client, grain Spore, filets.
- Comp : 2 built, no key · c1 chosen (comp.md).
- Sweep : phase 3.

# Approche
Macrostructure one-page, empreinte Heading|Body|Divider|Button|Image|Reveal. Posture : Poster conservé (le site d'origine ouvre sur la photo). Le draw proposait Index (carte en tête) : échangé, la carte vient juste après À propos pour garder l'ordre d'origine. Dérogations : bulle verte organique remplacée par un voile (8), flipbook remplacé par Switcher (le PDF reste en lien), formulaire d'emploi remplacé par mailto (70), bannière cookies supprimée (aucun traceur chargé). Test miroir : un voisin avec le même site aurait une carte en flipbook et une bulle verte ; ici la décision changée est la dalle de photo plein cadre avec carte en rangées.

# Thème
Spore, dark/roman-serif/warm : café noir grainé, encre parchemin, Young Serif sur Instrument Sans. L'accent rose huître est remplacé par un cuivre (oklch 72 % 0.13 50) lu sur la marque (#ce5923 dans le CSS d'origine) : échange nommé, seul écart au thème.

# Tokens
Voir `src/styles/tokens.css` : paper 15/19/24 %, ink 93 %, accent cuivre, voile du héros en tokens, `--container` 1440, gouttière 64 (16 au téléphone), gaps de section 120/144/176.

# Composants
- Carte : Switcher en six panneaux (À partager, Entrées, Plats, Enfants, Desserts, Boissons), `role="tablist"`, premier panneau visible sans script, tous les panneaux affichés en liste sans JS ; rows (nom col. 1, prix à droite en tabular-nums), filets seuls ; carte du 15 octobre mentionnée. Menus de fêtes à emporter en rows sous le Switcher. (layout.md § 5)
- Horaires : Schedule en `dl`, `time`, dits une fois dans la section et résumés au pied ; pas d'icône ; pas de jour fermé.
- Pied : mast (nom en grand), quatre colonnes courtes (adresse, contact, ouverture, réseaux), `data-credits`, puis KywFooter.
- Photo : `<figure data-slot data-alt>`, width/height, hero `fetchpriority="high"`, les autres lazy.

# Sur-utilisation
- [x] 1. Hallmark audit lancé · preuve : .hallmark/before.txt
- [x] 2. Deal puis draw tirés au journal partagé · preuve : .hallmark/log.json (draw 1cce36)
- [x] 3. Scaffold du thème, stamp en tête de page.css · preuve : src/styles/page.css:1
- [x] 4. Deux comps construites et capturées, choix écrit · preuve : comp.md
- [x] 5. sloplint --render sur le build servi avec base · preuve : .logs/legacy-sloplint3.log (1 FAIL source scaffold-only 34, 2 REFLEX 49b et 59, voir ETAT.md)
- [x] 6. Photos du client uniquement, pas de génération · preuve : public/photos/
