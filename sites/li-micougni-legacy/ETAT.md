# ETAT : li-micougni legacy (phase 1 sur 3 faite)

## Fait
- Audit (AUDIT.md, `.hallmark/before.*`), deal Vellum 1/3, draw ead5b8, scaffold, stamp, DESIGN.md (Picks, Approche, Thème, Composants, Sur-utilisation 1 à 7), comp.md.
- Contenu : `src/data/site.ts`, `carte.json` (tiré de donnees.json, 9 rubriques + sauces et menu enfant dans menu.astro), `photos.json`, 16 photos WebP + logo, PDF de la carte.
- Pages statiques : /, /vitrine-du-restaurant/, /menu/, /notre-terrasse-arriere/, /evenement-privee/, /a-propos-de-nous/, /contact/, 404. Build vert (`dist/li-micougni/legacy/`), noindex, kyw-signature et mention KYW sur les 8 pages. sloplint statique de page.css : 0 FAIL, 2 WARN (41) corrigés ensuite.

## Reste
- Phase 2 : nav (menu mobile en `<details>` provisoire), jour courant des horaires, reveal unique, états des contrôles testés, comp c2, reproduction.
- Aucun rendu navigateur fait : mise en page jamais vue. À vérifier en priorité : plaque du hero et `hero__cap` (bottom négatif) à 1440 et 390, `.bento` (spans 8/4 puis 4/8), `.nav__pill` à 1100 px, double filet sous `.rows`, contraste du bandeau fibre (multiply sur fond sombre quasi invisible).
- Phase 3 : sloplint `--render` par route, jury, RAPPORT.md, `pnpm index`, commit de `.hallmark/log.json` (`git add -f`), entrée de log à compléter (axes, entry, fingerprint).

## Décisions et hypothèses
- Colourway oxblood reversed (bordeaux du logo, or du cercle) ; hero Poster gardé, draw Split Studio/Stage écarté.
- Horaires : seule phrase du site (mardi 17 h à dimanche 17 h) ; mercredi à samedi en `.fill`. Lundi « fermé » vient de donnees.json.
- Téléphone et e-mail viennent de donnees.json (téléphone relayé par recherche web, à confirmer). Pas de GPS : JSON-LD sans geo. Pas d'avis, pas de noms d'équipe (administrateurs BCE non repris).
- Réserver pointe vers `/contact/#reserver` (comme l'original) ; formulaire `data-endpoint=""`, note visible, aucun succès simulé. Champ anti-spam et cookies supprimés (`dropped`).
- Textes raccourcis pour 58 (évènement, à propos) : mots du client, phrases reprises ou resserrées.

## Pièges
- Les `import` en tête du frontmatter Astro, sinon erreur de regex trompeuse.
- Pas de `sites/_test-legacy/` : astro.config copié de le-ponti-2-legacy.
