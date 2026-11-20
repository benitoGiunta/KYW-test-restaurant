# ETAT : cafe-fleuri-portfolio, phase 1 (construction-1)
## Fait
Gabarit journee copié et adapté ; DESIGN.md ; site.ts (données réelles + placeholders) ; 6 pages (accueil 5 moments, carte, brunch, histoire, nous trouver, 404) ; 10 photos WebP ; favicon et OG ; build OK (`dist/cafe-fleuri/portfolio/`), mention KYW et noindex présents.
## Reste (phase 2/3)
Animations et QA navigateur (shoot, audit, clics en-tête, bas de page 1440) ; vérifier loader (compte jusqu'à l'heure : hors 9-17h), badge « ouvert » (horaires 9h-16h illustratifs) et bandeau `maintenant` ; colophon crédits photos ; sloplint ; RAPPORT.md ; `pnpm index` et commit final avec [publier].
## Décisions / hypothèses
- Café présenté comme actif malgré le statut « probablement fermé » du dossier.
- Horaires 9h-16h 7j/7 (sources contradictoires), brunch 9h-14h30 : illustratifs. Prix brunch 21,95 € et petit-déjeuner 11,95 € : guide ancien, marqués. Boissons : prix fictifs marqués « exemple ».
- Pas d'e-mail, de réseaux, d'équipe, de réservation : rien affiché. Avis : un seul réel (« Wonderful place! »), note 4,2 (223 avis) citée sur la page histoire.
- Page /reservation/ conservée comme URL mais intitulée « Nous trouver ».
- gabarits/UTILISATION.md non mis à jour (gabarits/ protégé) : ajouter `journee | cafe-fleuri`.
