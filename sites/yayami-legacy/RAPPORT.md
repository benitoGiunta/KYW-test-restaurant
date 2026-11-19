# Yayami · variante legacy · 2026-11-19

## QA (phase 3, passe test)
Source : QA-build.md (captures et audit de l'agent « captures »), planche home relue.

| Constat | Décision | Preuve |
|---|---|---|
| Titre home 73 caractères | corrigé : « Yayami Sushi à Namur : sushi à emporter et livraison » (54) | grep du build |
| `twitter:card` absent (home, carte) | corrigé : `summary_large_image` dans Base.astro | présent sur home et carte |
| Bloc CSS des lignes (`.row`, `.row--idx`) en double dans page.css | doublon supprimé | build OK |
| « Focus visible absent » x4 sur home | faux positif : lien étiré, anneau porté par la ligne via `:has()` | Tab x25 au clavier : 0 arrêt sans contour |
| Axe 404 : contraste 4,36:1 de `.kyw-footer__note` | non corrigé : paquet `@kyw/footer` non modifiable ici ; 404 du serveur statique pour la capture | à traiter dans le paquet |
| CLS home 0,058 | non corrigé : images avec width/height, pas de cause trouvée ; sous le seuil 0,1 | |
| Polices TTF/OTF (375 Ko), pas de robots.txt/sitemap racine | non traités (hors périmètre site, noindex) | |
| Cible 128x20 « la page d'accueil » (404) | non traitée, lien du 404 d'origine serveur | |

Build : 3 pages, noindex et kyw-footer présents partout, 0 tiret cadratin, `pnpm index` passé. Sloplint et finish review : faits en phases 1-2 (voir ETAT.md, DESIGN.md) ; non relancés ici.

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires 12h-14h, 18h-22h, 7/7 | statut d'ouverture, pied | hypothèse | horaires confirmés par le client |
| Lien « Commander » | nav, hero | site de commande actuel | URL de commande définitive |
| Descriptions courtes de gammes | carte | reprises de l'existant | texte validé |
| Mention « données illustratives » | pied | présente | à retirer à la livraison |

## Demande de matériel
Photo qui améliorerait le plus la page : l'équipe et le comptoir à l'intérieur du restaurant (aucune photo du lieu). Hero : nigiri détouré actuel, à doubler d'une prise de vue réelle.
