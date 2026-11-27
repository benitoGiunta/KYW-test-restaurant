# Révision 1 · La Bergerie de Lives (portfolio)

Corrigés : 13 (F1-1 à F1-5, F2-1 à F2-7) · Refusés : 0 · Impossibles : 0 · Reportés : F2-8 (composition des pages intérieures, hors révision ciblée) et F3.
Build : `pnpm build:site` OK. Vérification : axe-core sur index 390, le-domaine, chambres, contact 1440, séminaires 390 = 0 violation, 0 débordement. Grep `dist/` : plus de « non publié », « loger ou louer », « table ouverte », « cadre d'exception », `data-cursor="Voir"`, ni `<footer class="footer">`.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `site.ts` histoire[0] : « vous recevoir chez eux » | grep dist |
| F1-2 | corrige | `site.ts` histoire[1] : plus d'affirmation sur la table ; presse citée par ses titres | grep dist |
| F1-3 | corrige | `HeroPage.astro` : sr-only du chiffre retiré ; filigrane « 3 » retiré de Chambres | h1 = « Chambres d'hôtes » |
| F1-4 | corrige | `le-domaine.astro` : filigrane 2017 retiré | axe 0 violation 1440 |
| F1-5 | corrige | `index.astro` : `tabindex=0 role=region aria-label` sur la bande | axe 0 violation 390 |
| F2-1 | corrige | `site.ts` (tarifs sur demande, capacité à préciser), `Footer.astro` colonne horaires retirée, `contact.astro` note retirée | grep dist |
| F2-2 | corrige | chambres : chapô et bloc distincts, bloc petit déjeuner supprimé ; séminaires : « cadre d'exception » remplacé par des faits | grep dist |
| F2-3 | corrige | photo petit déjeuner retirée avec son bloc (`chambres.astro`) | bloc absent |
| F2-4 | corrige | `base.css` : `capitalize` retiré | dt rendus depuis les données |
| F2-5 | corrige | `site.ts` activités, séminaire ; `index.astro` phrases d'inférence retirées | relecture |
| F2-6 | corrige | `Footer.astro` : `<section aria-label>` (évite la violation `region`) | axe 0 violation |
| F2-7 | corrige | `data-cursor="Voir"` retiré | grep dist |
| F2-8 | reporté | non traité (refonte de composition, hors ciblé) | — |

Bonus F3 faits : « nœud », « vœux », « cœur » retiré, alt tonnelle, méta le-domaine, 404 « Page introuvable ». Hypothèse : espaces insécables (F3-1) non traités. Site publiable : oui.
