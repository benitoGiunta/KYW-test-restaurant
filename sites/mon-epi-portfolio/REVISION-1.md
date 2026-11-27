# Révision 1 · mon-epi portfolio (liste F0, F1, F2 de REVUE-1)

Hypothèse : le site est celui de la boulangerie ; aucune mention du « site actuel » ni de monepi.be hors source des avis cités (gardée en petit) et JSON-LD.

| id | décision | changé (fichier) | vérification |
|---|---|---|---|
| F1-1 | corrigé | `pains.astro` : « Selon les saisons et les évènements, la boulangerie propose aussi des pâtisseries. » | grep `dist` « la liste change » : 0 |
| F1-2 | corrigé | `points-de-vente.astro` (lead, paragraphe, section « Ce qu'on sait » + tampon supprimés), `farines.astro`, `data/site.ts` (notes de marge : « taux annoncé par la boulangerie », « moulin partenaire », « point de vente ») | grep `dist` « site actuel », « Ce qu'on sait » : 0 ; monepi.be reste seulement dans 3 sources d'avis et le JSON-LD |
| F1-3 | corrigé | `farines.astro` : titre « Dans la liste des pains », phrase remplacée par un fait du dossier | grep « règle du cahier » : 0 |
| F2-1 | corrigé | `data/site.ts` carte postale (« depuis 1990 … repris l'atelier en 1992 »), `boulanger.astro` tampon « atelier repris en 1992 » | grep « depuis 1992 » : 0 |
| F2-2 | corrigé | `index.astro` : « Ce qu'en disent les clients » | grep dist |
| F2-3 | corrigé | `MenuDuJour.astro` (« Ouverture confirmée » retiré), `index.astro` (annotation « c'est confirmé » retirée), `Footer.astro` (tableau remplacé par « Ouvert le vendredi, 9 h à 18 h ») | grep : 0 |
| F2-4 | corrigé | `commander.astro` : « Pour réserver ses produits, on appelle la boulangerie au {tél}. La boutique est rue Es Fays 43, à Loyers. » | grep « commande en ligne » : 0 |
| F2-5 | corrigé | `tokens.css` : `--c-mine` #5e5b55 vers #4f4c46, `--c-rouge` #d43d2e vers #c43526 | axe 1440 : plus de color-contrast sur annotations ni tampon (reste le texte du loader, transitoire, hors revue) |
| F2-6 | corrigé | `Footer.astro` : `<footer>` du site vers `<section aria-labelledby>` | 1 seul `<footer>` par page ; axe : plus de `contentinfo` ni `region` sur 5 pages × 1440/390 |
| F2-7 | corrigé | étiquettes retirées sur l'accueil (Sommaire, Farines, En marge, Pratique) et `commander` (Pratique) ; numéros 01 à 05 de `boulanger` retirés | grep source |

Hors liste : F3 non traités. Axe : `landmark-unique` (moderate) sur `.couverture` de l'accueil et contraste du nom du loader (capturé pendant le loader), non liés aux findings. Débordement : scrollWidth = fenêtre à 1440 et 390 sur 5 pages. Build OK (`q.sh revision-build`). Serveur arrêté. Pas de publication.

Bilan : 10 corrigés, 0 refusé, 0 impossible. Publiable : oui (à confirmer par la revue 2).
