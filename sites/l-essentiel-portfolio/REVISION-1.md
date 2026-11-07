# Révision 1 · L'Essentiel · portfolio (ciblée : F0, F1, F2)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F0 | rien à faire (aucun) | | |
| F1-1 | corrigé | `src/layouts/Base.astro` : titre par défaut « Table gastronomique à Temploux » | `<title>` du dist ; 0 « Menu unique » dans dist |
| F1-2 | corrigé | `src/engine/reveal.ts` : `aria: 'none'` dans `SplitText.create` | 0 `aria-label` sur le `<p>` ; axe 0 violation sur 7 pages x 1440/390 |
| F2-1 | corrigé | `Footer.astro` : `<footer>` en `<section aria-label="Contact et horaires">` ; `Header.astro` : logo vertical + pastille dans `<aside aria-label="Accès rapides">` | 1 seul `<footer>` (kyw-footer) ; axe : plus de `landmark-no-duplicate-contentinfo` ni `region` (14 cas) |
| F2-2 | corrigé | surtitres retirés sur les 5 pages intérieures, la 404 et 5 sections de l'accueil (gardés : « Table gastronomique, Temploux », sous-titres de plats, « Services », « Fermetures annuelles ») | grep des pages |
| F2-3 | corrigé | `public/photos/facade-enseigne(-900).webp` recadrés 25..1359 px de la source 2400 (5:6) ; `.hero__media` en 5/6 ; dimensions dans `site.ts` | capture 1440 et 390 : « l'essentiel » entier |
| F2-4 | corrigé | `site.ts` : « choisissez l'ambiance… » et « Pour un groupe, appelez… » retirés ; `index.astro` : « Du mercredi au samedi, midi et soir » | grep dist : 0 occurrence |
| F2-5 | corrigé (partiel : preload + sortie de loader) | `index.astro` : preload `facade-enseigne.webp` (desktop) ; `loader.ts` : MIN 0,8 s, sorties 0,5 s et 0,7 s | LCP desktop accueil 2592 -> 2260 / 2268 ms (2 passes) |

Non traités (hors périmètre ciblé) : F3-1 à F3-6. DESIGN.md inchangé (cadre du hero 5:6 au lieu de 4:5, sans effet sur le concept).
Hypothèse : le loader plus court (1,1 -> 0,8 s) reste lisible ; 4G mobile non remesurée (déjà correcte à 2224 ms).
