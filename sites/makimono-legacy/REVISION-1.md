# Révision 1 · Makimono legacy

Périmètre : F0, F1, F2 de REVUE-1.md (pas de F3 ; Korean Futo, hover, polices, horaires, chapeau inchangés).

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F0 | aucun finding | - | - |
| F1-1 | corrigé | `carte.json` : champ `choix` (protéines et prix, ordre croissant, tiré de donnees.json) sur les 13 rolls « dès » ; `Carte.astro` + `page.css` : ligne « Au choix : … » sous chaque roll ; `site.ts` : note de rubrique « la protéine de la recette se remplace, le prix dépend d'elle » | 13 `ligne__choix` dans dist ; le prix minimum de chaque liste = prix « dès » (assertion script) ; captures desktop et 390 px |
| F1-2 | corrigé | `carte.json` : groupe « Base · Riz vinaigré 5,50 € » en tête de Create.Your.Bowl | « Riz vinaigré » présent dans dist, capture du composer |
| F2-1 | corrigé | `carte.json` : descriptions des rolls/nigiri/poké et options des 2 composeurs en minuscules, sauf Nori, Teriyaki, Unagi, Spicy ; noms de plats inchangés | grep dist : 0 « cream Cheese », « oignons Frits », « coco Râpé », « jeunes Oignons », « Foie Gras », « Piments Mexicain », « tempura Flakes » |
| F2-2 | corrigé | `Pied.astro` : `<footer class="pied">` devenu `<section aria-label="Coordonnées de Makimono">` | 1 seul `<footer` par page ; axe 0 violation sur accueil 1440 et 390 et sur 404 |

Autres vérifications : scrollWidth = clientWidth à 1440 et 390 ; sloplint 0 FAIL (2 WARN préexistants sur lazy-loading). Rebuild via scripts/q.sh OK. Serveur arrêté.
Hypothèse : « dès » reste le prix de la protéine la moins chère ; la recette cite toujours sa protéine d'origine.
