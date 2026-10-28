# KYW-test-restaurant

Dépôt de travail de l'agence **KYW** (Know Your Website, filiale web de KYN) : refonte des sites de 20 restaurants de Namur, en
trois variantes par restaurant, publiées sur Vercel sous une seule URL avec un index à la racine.

| Variante | Nom public | Méthode |
| --- | --- | --- |
| 1 | **Portfolio** | Un gabarit choisi parmi les 15 de `gabarits/` (collection originale KYW), adapté au restaurant |
| 2 | **Awwwards** | Direction artistique libre au niveau des sites primés, produite avec la skill `awwwards` (+ `jury`) |
| 3 | **Inspi legacy** | Même approche que le site actuel du restaurant, refondue de A à Z avec la skill `hallmark` |

## Arborescence

```
agents/            prompts de production (un fichier par rôle) + lecons.md (auto-amélioration) + README.md (workflow)
data/candidats.json          140 restaurants namurois avec site, extraits de la base KYN
data/selection/              vérification d'activité par lots
data/restaurants.json        les 20 restaurants retenus (slug, nom, site actuel, type de cuisine…)
data/restaurants/<slug>/     dossier client : dossier.md, donnees.json, photos/, site-actuel/ (captures, HTML)
gabarits/<nom>/              15 gabarits Astro du portfolio (variante 1)
sites/<slug>-<variante>/     un paquet Astro par site produit
packages/kyw-footer/         pied de page KYW partagé (logo unique : signature)
scripts/build-site.mjs       build d'un site → dist/<slug>/<variante>/ ; assemble.mjs : tout ; index.mjs : dist/index.html
dist/                        sortie statique COMMITÉE, servie telle quelle par Vercel
.claude/skills/              awwwards, jury (juliobsz/skills) et hallmark (Nutlope/hallmark), vendorisées
```

## Commandes

```bash
pnpm install
pnpm build:site sites/<slug>-awwwards     # build d'un site, avec contrôle noindex + pied de page KYW
pnpm index                                # régénère dist/index.html
pnpm assemble                             # tout reconstruire
```

Publication : commit de `dist/` et push sur la branche de production du projet Vercel `kyw-test-restaurant`.
