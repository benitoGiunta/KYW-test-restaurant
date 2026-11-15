# CORRECTION-1 · les-potes-au-feu · awwwards

| id | catégorie | décision | changement (fichier) | preuve |
|---|---|---|---|---|
| brouillon « à confirmer » (carte, accueil) | brouillon | corrigé | pastilles retirées, valeurs conservées (52 € : Fooding + site client ; boissons : Fooding) : `src/data/site.ts` (`aConfirmer`) | scan : 0 libellé |
| « 52 € à confirmer » (carte) | brouillon | corrigé | `prixNote` retiré (`site.ts`) | scan : 0 |
| « trois exemples, prix à confirmer » (carte) | brouillon | corrigé | `prixNote` retiré (`site.ts`) | scan : 0 |
| « Trois exemples relevés par Le Fooding en juillet 2026… » | brouillon | corrigé | note reformulée : « Quelques verres, pour patienter ou prolonger ; la carte complète… » (`site.ts`) | scan : 0 |
| awwwards-01 | disposition | corrigé | fond de l'en-tête opaque jusqu'à 72 % puis dégradé (`src/styles/site.css`, `.top::before`) | grep CSS ; pas de capture |
| awwwards-02 | disposition | corrigé | colonne vignette 3,25 rem sur mobile tactile, la règle `max-width: 767px` l'écrasait (`site.css`) | grep CSS dist ; pas de capture |
| awwwards-03 | langue | corrigé | « quatre services, le même menu pour toute la table. » (`site.ts`) | grep dist : 0 |
| awwwards-04 | contenu | corrigé | « Voici les quatre services… » sans saison (`src/pages/index.astro`) | grep dist : 0 |

Rebuild OK. Scan final : 0 libellé. Captures non refaites (sobriété) : 01 et 02 vérifiés par le CSS seulement.
