id | catégorie | décision | changement | preuve
01 | brouillon | corrige | bloc « Définition illustrative » retiré (index.astro, placeholder false) | scan 0
02 | brouillon | corrige | sens 1 réduit à « Qui s’écarte de la règle. » (exemple pizza inventé retiré) | scan 0
03 | brouillon | corrige | note horaires retirée, horaires mar-sam 18 h 30-21 h 30 + sam midi gardés (Le Fooding et Table de Terroir concordent) | scan 0
04 | brouillon | corrige | « (illustratif) » retiré de À emporter | scan 0
05 | brouillon | corrige | bandeau retiré, meta description sans mention | scan 0
06 | brouillon | corrige | « En trois gestes » ; étape « Appelez » sans procédure déduite ; « Par téléphone. » | scan 0
07 | brouillon | corrige | « Vous serez redirigé vers Barestho pour finaliser la réservation. » | scan 0
08 | brouillon | corrige | note horaires retirée de la page réservation | scan 0
09 | fonctionnel | refuse | 404.astro existe déjà et 404.html est construit ; la 404 par défaut vient de l'hébergement (Vercel sert dist/ sans règle not-found à ce chemin), hors du paquet | dist/incorrect/portfolio/404.html
10 | contenu | refuse | texte complet « 14,50 € » dans le DOM ; innerText omet seulement le caractère encore en visibility:hidden pendant l'animation d'entrée (SplitText), sans effet une fois l'animation finie | motion/drivers.ts empile()
