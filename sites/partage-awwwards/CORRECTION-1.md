# Correction 1 — partage / awwwards

| id | catégorie | décision | changement (fichier) | preuve |
|---|---|---|---|---|
| brouillon « Heures à confirmer par téléphone » (404, carte, histoire, accueil, réservation : pied) | brouillon | corrigé | étiquette retirée, jours de fermeture gardés (components/Footer.astro) | scan 0 |
| brouillon « Jours de fermeture confirmés… heures à confirmer » | brouillon | corrigé | « Fermé le dimanche, le lundi et le mardi midi. » (pages/reservation.astro) | scan 0 |
| awwwards-01 ancres carte | fonctionnel | corrigé | clic délégué : ScrollTrigger.refresh + lenis.scrollTo(y) au lieu de `anchors:true` (engine/scroll.ts) | Playwright : scrollY 578 / 1541 / 2129 / 2704 depuis le haut |
| awwwards-02 « Starters » | langue | corrigé | catégorie « Pour commencer » (data/carte.ts, pages/carte.astro) | build |
| awwwards-03 « boeuf » | langue | corrigé | « bœuf » (data/carte.ts) | build |
| awwwards-04 « Date non relevée » | langue | corrigé | date vide non affichée (data/site.ts, pages/histoire.astro) | build |
| awwwards-05 adresse répétée | contenu | corrigé | bloc « Venir » du pied masqué sur /reservation/ (components/Footer.astro, layouts/Base.astro) | build, non capturé |
