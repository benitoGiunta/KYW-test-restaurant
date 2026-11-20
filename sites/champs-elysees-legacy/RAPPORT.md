# Champs Elysées · variante legacy · 20/11/2026

## 1. Approche conservée vs site d'origine

| Élément | Origine (WordPress, Divi) | Legacy |
|---|---|---|
| Type | one-page + `/la-carte/`, `/contact/`, `/fetes-patronales/` | idem (5 pages avec 404) |
| Hero | grand visuel, bulle crème sur motif | Poster : photo de salle pleine largeur, plaque coton |
| Nav | menu Divi, widget Zenchef flottant | bandeau d'infos qui défile + barre sticky, menu Popover mobile |
| Carte | PDF de 16 pages | rubriques HTML |
| Animations | `.et_animated` | un seul reveal (galerie), reduced-motion respecté |

Dérogations : carrousel Swiper non repris (18) ; waivers 8 (ordre des sections gardé), 83 (galerie de cinq tuiles), 77 (bande horaires = tableau), 71 (noms de plats en lignes de prix).

## 2. Axes traités

Adresse unique, un seul horaire, formulaire étiqueté, carte en HTML, jour courant et état d'ouverture : faits (voir AUDIT.md et ETAT.md). Non traité : cp 5100 à confirmer, envoi du formulaire non branché.

## 3. Résultat sloplint

- Before : 146 FAIL, 66 REFLEX. After : 0 FAIL, 0 REFLEX, waived 8, 83, 77, 71 (en tête de CSS), 7 WARN (23 bandeau vert déclaré, 28a logo de pied en lazy faux positif, kept non comparé).
- Corrigés en phase 3 : 26a (anneau de focus du bandeau 1,55:1), 24a/24b (valeurs hors échelle), 78 (titres de rubrique 25 px sous un h1 de 84 px), 71 waived.
- Render : 20 captures dans `sites/champs-elysees-legacy/.hallmark/shots/`. Build : `pnpm build:site` OK, KywFooter et noindex sur 5/5 pages.

## 4. Reviews

Hero review et finish review en `self` (pas de sous-agent). Écart restant : CLS mobile de la carte 0,102 (polices Fontshare/Google en `swap`, pas de fallback à métriques ajustées). Le « 404 » du crawl QA était la page générique du serveur de test, pas celle du site (la 404 du site existe).

## 5. Placeholders et faits manquants

| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Message d'envoi non branché | `/contact/` | `data-placeholder="true"` | endpoint du formulaire (`data-endpoint`) |
| Exemples de champs | `/contact/` | Camille Dupont, 0470 12 34 56 | sans objet (aides de saisie) |
| Code postal | adresse | 5100 Jambes | à confirmer avec le client |
| Horaires et état d'ouverture | accueil | ceux du site d'origine | horaires confirmés |
| Consentement formulaire | `/contact/` | texte provisoire | à valider |

Aucun slot `.fill`. Aucun avis repris.

## 6. Demande de matériel

Photo la plus utile : façade ou terrasse de jour en 3:2, 2400 px de large, pour la section à propos (aujourd'hui une façade verticale). Aussi : une photo de tablée pour les fêtes patronales ; logo en SVG.

## 7. Leçons structurelles

Voir `data/usage/test-2/lecons-proposees/champs-elysees.md`.
