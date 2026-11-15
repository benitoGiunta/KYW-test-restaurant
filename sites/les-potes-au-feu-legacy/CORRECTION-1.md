# CORRECTION-1 — les-potes-au-feu / legacy

Brouillons : clé `les-potes-au-feu/legacy` vide au départ (0 libellé) ; grep de `src/` (à confirmer, illustratif, exemple, démonstration, placeholder) : rien d'autre que le `placeholder="nom@exemple.be"` d'un champ (exemple de saisie, pas un texte d'équipe).

| id | catégorie | décision | changement (fichier) | preuve |
|---|---|---|---|---|
| brouillons | brouillon | 0 à retirer | aucun | scan-brouillon : 0 libellé |
| legacy-01 | contenu | refuse | aucun : le 52 € vient d'une source du dossier (Le Fooding, juil. 2026), la règle du correcteur garde la valeur sans étiquette ; la mention générale du pied de page couvre le reste | donnees.json l.161 |
| legacy-02 | langue | corrige | « Home made » → « Fait maison » (src/pages/index.astro) | grep dist |
| legacy-03 | langue | corrige | « DAMFRA SRL, TVA BE 0741.540.749, RPM Namur. » (src/pages/contactez-nous.astro) | grep dist |
| legacy-04 | langue | corrige | attribut `data-erreur-vide` sur le champ e-mail + lecture de `validity.valueMissing` (contactez-nous.astro, layouts/Base.astro) : « Indiquez votre adresse e-mail. » si vide | grep dist (attribut présent) |
| legacy-05 | langue | corrige | horaires « 12 h à 14 h », « 19 h à 21 h » (src/data/site.ts) | grep dist |
| legacy-06 | langue | corrige | « pdt » → « pommes de terre » (src/data/site.ts) | grep dist |

Rebuild OK (6 pages). Pas de leçon structurelle.
