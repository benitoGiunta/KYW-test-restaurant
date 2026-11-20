# Révision 1 · yayami legacy (F2 seulement, F3 non traités)

| id | décision | changement | preuve |
|---|---|---|---|
| F2-1 | corrigé | `src/data/carte.json` : 7 chapeaux de rayons remplacés par des faits tirés de la carte (ex. « Sept variétés, 4,50 € les 2 pièces. » ; salade : phrase coupée supprimée) | grep dans `dist/.../carte/index.html` : chapeaux présents ; prix et comptes recoupés avec carte.json (7 nigiri, 9 maki, 5 temaki, 14 plats chauds, 5 salades, 3 bières, 4 ramune) |
| F2-2 | corrigé | `src/pages/carte.astro` : « Toute la carte, avec les prix. » | grep `prix du site` = 0 dans dist |
| F2-3 | corrigé | `src/layouts/Base.astro` : `image` + `openingHoursSpecification` (7 jours, 12:00-14:00 et 18:00-22:00, conforme à donnees.json) | JSON-LD du dist : image présente, 2 plages `opens` |
| F2-4 | corrigé | `src/styles/tokens.css` : repli métrique `@font-face "Sofia repli"` (Arial, size-adjust 52 %, rapport mesuré 1071/2062) ; `page.css:40` h1 `max-width` 14ch passé à 4.94em (le `ch` suivait le repli : 4 lignes au lieu de 3) | CLS mobile accueil, 4G lente + CPU x4 : 0,054 puis 0,0029 (2 mesures) ; desktop 0,004 ; carte 0,003 ; h1 chargé inchangé (3 lignes, 159 px) |
| F2-5 | corrigé | `src/components/Pied.astro` : `<footer id="horaires">` devenu `<section aria-label="Horaires et adresse">` | axe (landmark-no-duplicate-contentinfo, region, landmark-unique) : 0 violation sur accueil et carte à 390 et 1440 ; scrollWidth = largeur |

Bilan : 5 corrigés, 0 refusé, 0 impossible. Rebuild OK (`scripts/q.sh`, 3 pages). sloplint : 0 FAIL, 3 REFLEX de rendu 1440 (hero 740/900, espacement de sections, h2 vs h1), non liés à ces corrections et non traités. `DESIGN.md` inchangé. F3-1 à F3-7 non traités (hors périmètre de cette passe). Hypothèse : chapeaux sans formulation promotionnelle, uniquement chiffres de la carte. Site jugé publiable.
