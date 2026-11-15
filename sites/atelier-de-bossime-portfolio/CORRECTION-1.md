# Correction 1 (portfolio)

| id | catégorie | décision | changement (fichier) | preuve |
|---|---|---|---|---|
| brouillon « année à confirmer » (index, ferme) | brouillon | corrigé | année G&Millau retirée (2018 vs 2017 selon les sources) : `data/site.ts`, `index.astro`, `ferme.astro` | scan 0 |
| brouillon « exemple » (FAQ, carte) + « Réponse à compléter… parking » | brouillon | corrigé | question parking retirée (parking inconnu) ; étiquettes « exemple » retirées : `site.ts`, `index.astro`, `carte.astro` | scan 0 |
| brouillon « volume à confirmer » (Eau) | brouillon | corrigé | prix 12 € gardé (source), mention retirée : `site.ts` | scan 0 |
| brouillon « modalités à confirmer » (chèques-cadeaux) | brouillon | corrigé | « montant libre » et « modalités à demander » (non prouvés) remplacés par « La maison propose des chèques-cadeaux. » : `site.ts`, `carte.astro` | scan 0 |
| brouillon « portrait à confirmer » | brouillon | corrigé | carte « Ludovic Vanackere » (portrait non prouvé) retirée de l'équipe ; étiquettes « rôle/portrait à confirmer » et « photo à fournir » supprimées : `histoire.astro`, `site.ts` | scan 0 |
| brouillon « Formulaire de démonstration… » | brouillon | corrigé | « La réservation se finalise sur Zenchef… » : `reservation.astro` | scan 0 |
| portfolio-01 | animation | corrigé | loader MIN 0,35 s, MAX 0,9 s, lissage 0,3, sortie 0,6 s : `engine/loader.ts`, `motion/setup.ts` | non mesuré dans un navigateur |
| portfolio-02 | disposition | corrigé | prix avec espaces insécables, `nowrap` sur le prix : `site.ts`, `base.css` | dist |
| portfolio-03 | lisibilité | corrigé | sous-titre logo 11 px ; puces roue `max(11px, 2cqw)` : `base.css` | non mesuré |
| portfolio-04 | contenu | corrigé | doublon supprimé en retirant la carte du chef de l'équipe : `site.ts` | dist |
| portfolio-05 | langue | corrigé | `hFr()` : « 12 h à 16 h », « 23 h 30 » : `site.ts` | 0 occurrence « 12:00 » dans dist |
