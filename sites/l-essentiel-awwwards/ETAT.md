# ETAT : l-essentiel-awwwards, construction-3 (phase 3, QA)

## Fait
- Phases 1 et 2 (voir DESIGN.md). Phase 3 : audit + shoot des 4 pages (QA-build.md absent), corrections : survol du logo et du téléphone du pied, descriptions meta < 160, build final OK, audit 0 FAIL / 1 WARN (sitemap de la racine QA, justifié). RAPPORT.md écrit.

## Reste
- Critique jury indépendant et passe 2 (pas d'outil Agent), `texteStatut` à plusieurs instants, doublon « Réserver » mobile, « XVIIe » en exposant, og.png, accessoire à retirer.

## Pièges
- skipLinkFirst false = faux positif (texte français). Serveur QA arrêté, `.qa-root` et `.shots` non commités.
