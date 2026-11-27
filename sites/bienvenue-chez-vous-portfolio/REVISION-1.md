# Révision 1 · Bienvenue chez vous · portfolio
| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/data/site.ts` : « Chèques cadeaux proposés par le restaurant (modalités à confirmer). » | grep `dist/.../carte/` |
| F2-1 | corrige | `site.ts` : « reçoit sur réservation, par téléphone ; pas de module en ligne » | build |
| F2-2 | corrige | `Footer.astro` : `<footer>` du site en `<section aria-label>` (un seul contentinfo, KYW) | axe 0 violation, 4 pages x 2 largeurs |
| F2-3 | corrige | `index.astro` : bande galerie `tabindex=0 role=region aria-label` | axe 390 px accueil : 0 |
| F2-4 | corrige | `index.astro` (phrase retirée), `menu.astro`, `site.ts` (sous-titre chapitre prix : « hors accords ») | grep « pas dévoilé » : 0 sur accueil et menu hors citation |
| F2-5 | corrige | `Footer.astro` : « Services (horaires à confirmer) » | build |
F3 non traités (hors liste). Hypothèse : horaires JSON-LD inchangés. Rebuild OK via q.sh.
