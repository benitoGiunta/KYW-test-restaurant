# Correction 1 · atelier-de-bossime legacy

| id | catégorie | décision | changement (fichier) | preuve |
|---|---|---|---|---|
| brouillon « , volume à confirmer » + « (illustratif) » (carte, Eau) | brouillon | corrigé | étiquette retirée, prix du site d'origine gardé (`site.ts`, `notre-carte.astro`) | scan 0 |
| brouillon « (légende illustrative) » ×4 (carte, cuisine) | brouillon | corrigé | label retiré, légendes = sujet de `photos/index.json` (`notre-carte.astro`, `notre-cuisine.astro`) | scan 0 |
| brouillon « Portrait, nom à confirmer (illustratif) » | brouillon | corrigé | légende retirée, alt neutre conservé (`notre-cuisine.astro`) | scan 0 |
| brouillon placeholders `nom@exemple.be`, téléphone d'exemple | brouillon | corrigé | placeholders retirés (`contactez-nous.astro`) | grep dist |
| legacy-01 | fonctionnel | corrigé | formulaire en `data-mailto` : ouvre la messagerie vers info@bossime.be ; note « pas encore relié » remplacée (`contactez-nous.astro`, `Base.astro`) | grep dist 0 |
| legacy-02 | disposition | corrigé | filet gauche du panneau mobile retiré (`page.css`) | CSS, non capturé |
| legacy-03 | contenu | corrigé | « Pas d'accord proposé » / « Sans objet » (`notre-carte.astro`) | build OK |
