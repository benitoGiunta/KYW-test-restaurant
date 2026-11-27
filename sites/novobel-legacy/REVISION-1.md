# Révision 1 · Novobel legacy (ciblée F0-F2)
| id | décision | changement (fichier) | vérification |
|---|---|---|---|
| F0 | sans objet | aucun | - |
| F1-1 | corrigé | `Footer.astro` : ligne Horaires et phrase « stock » retirées ; `blog.astro`, `jobs.astro`, `projects.astro` : phrases d'atelier supprimées ou remplacées ; `Photo.astro` : data-credits neutralisé | grep `dist/` : 0 occurrence (stock, compléter, viendront du client, n'a pas été repris) |
| F1-2 | corrigé | Articles sorti de la nav et du pied (`site.ts`), page conservée avec une phrase neutre ; Carrière : note de candidature spontanée ; Projets : photo « visite de chantier » illustrative ajoutée | build OK |
| F2-1 | corrigé | `page.css` : carte du hero alignée à droite (desktop) | capture 1440 : ouvrier entier visible. Mobile inchangé (voulu) |
| F2-2 | corrigé | `site.ts` : étapes Conception, Accompagnement, Finitions réécrites en 1-2 phrases sur faits prouvés | grep |
| F2-3 | corrigé | h2 « Devis gratuit » ; délai 24 h déplacé dans le texte, marqué illustratif (accueil) ; « sans plus attendre » retiré | grep |
| F2-4 | corrigé | accueil : métiers en titres seuls (`row--plain`), Livraison en une phrase | build OK |
| F2-5 | corrigé | `Base.astro` : canonical, og:image, twitter:card, JSON-LD HomeAndConstructionBusiness | 6 pages avec ld+json ; og:image relatif (à absolutiser après publication) |
F3 : F3-3 (alt halle, h1 projets) et F3-4 (numéros des métiers de l'accueil) faits au passage ; reste non traité.
Rebuild : `scripts/q.sh revision-build pnpm build:site` OK. Serveur arrêté (kill PID).
