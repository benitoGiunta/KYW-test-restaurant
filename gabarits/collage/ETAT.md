# ETAT collage (30/10/2026 22:32)

- [x] Socle copié, pnpm install, `name` renommé
- [x] DESIGN.md, FICHE.md, RAPPORT.md
- [x] site.ts étendu (Activite, Evenement, Formule, Sticker, privatisation, quartier, manifeste), polices auto-hébergées, photos 960/800/640
- [x] tokens.css, base.css, Logo/Header/Footer/Loader/Vague/Agenda, motion/setup.ts, 7 pages
- [x] build OK → dist/gabarits/collage/
- [x] shoot.mjs × 7 pages + audit.mjs (0 FAIL) : .shots-collage/<page>/, planches planche-<page>.png, audit-collage.txt
- [x] correctifs mécaniques appliqués et rebuild (voir RAPPORT.md) ; pré-contrôle Playwright repassé (0 console, 0 débordement)
- [x] apercu.png (desktop-haut)
- [ ] À faire par le relecteur : recapture shoot après correctifs, jury, test manuel du menu mobile
- Serveur 4413 arrêté (PID du script de QA tué par le script ; second serveur tué par PID). Aucun script dans scripts/.

## Révision 1 (31/10/2026 12:40)

- [x] REVUE-1 traitée : 7 corrigés (C-01 titre, C-02 logo pied mobile, C-03 hero 1140 en srcset, C-04 LCP agenda 1,1-1,2 s, C-05 ligatures, C-07 formules, C-08 « photo à venir »), 1 refusé (C-06, alts fondés sur photos/index.json) ; voir REVISION-1.md
- [x] rebuild OK, apercu.png recopié dans dist, vérifs Playwright `.shots-collage-rev/`, serveur 4434 arrêté par PID
- [ ] Non commité (à faire par l'orchestrateur)
