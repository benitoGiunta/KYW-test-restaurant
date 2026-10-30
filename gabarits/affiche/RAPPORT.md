# Rapport : gabarit « Affiche » (30/10/2026)

**Concept en une ligne.** Un mur d'affiches de rue : chaque écran est un aplat (rouge, jaune, vert, crème) collé par-dessus
le précédent avec un bord dentelé, un titre Archivo extra-large, des horaires traités comme le titre principal et un plat
signature qui s'empile en cinq couches au scroll, prix qui claque à la fin.

## QA mécanique (passe unique, `shoot.mjs` + `audit.mjs`, port 4403)

Six pages capturées (accueil avec `--nav`, carte, histoire, reservation, a-emporter, 404). Rapports JSON dans
`.shots-affiche.log` (passe 2) et `.shots-affiche/home/`, `.shots-affiche/histoire/` (passe 3, après corrections).

| Critère | Résultat |
| --- | --- |
| Erreurs console / requêtes échouées | 0 / 0 sur les 6 pages |
| `audit.mjs` | 0 FAIL ; 4 WARN : robots.txt et sitemap cherchés à la racine de l'origine (normal sous `base`), « 404 sans h1 » = la 404 de `dist/` (celle du gabarit a un h1), description raccourcie à moins de 160 caractères |
| Débordement horizontal | corrigé (nom du hero trop large à 1440 : `--t-mega` plafonné à 11,5 rem ; figures tournées : `overflow-x: clip` sur `.affiche`) |
| axe | 0 violation sérieuse après corrections : contrastes (liste et prix de la pile, descriptions du bento, badges, jour des cartes horaires, prix du menu du jour), `<dl>` des horaires, nom accessible du disque |
| Reduced motion | `hiddenText: 0`, `moving: false` sur les 6 pages |
| Clavier | tous les arrêts visibles ; une exception : le disque CTA en fin de galerie épinglée est hors écran quand le focus l'atteint (piste translatée), voir « Points ouverts » |
| Hover | tous les rôles réagissent (flood, soulèvement, décalage) ; `colorOnly` et `noHoverChange` vides après ajout du survol de la marque et du déplacement des `.link` |
| Idle | `desktop.idleMotion: true` sur l'accueil (plat du hero), aucun ailleurs (décision : rien ne bouge au repos hors accueil) |
| LCP | desktop : loader (texte « Les Potes au Feu ») à 0,2 à 0,6 s ; mobile throttlé : 5,5 à 6 s, dont 5,1 à 5,8 s de loader (plancher 1,1 s + sortie, ×4 CPU) : comportement prévu par le moteur, voir leçon socle-gabarits |
| CLS | 0 partout |
| FPS scroll | desktop 60 ; mobile 51 à 60 |
| Cibles < 24 px | uniquement « Réalisé par » du pied de page KYW (composant partagé) |

## Scores du critique

Non évalués ici (règle : la skill `jury` est lancée ensuite par un agent distinct).

## Placeholders (`placeholder: true` dans `site.ts`)

E-mail de contact ; prix à la carte (le restaurant fonctionne en menu unique) et 8 plats inventés pour remplir le bento ;
menu du jour ; service à emporter (page entière illustrative, étapes et boîtes) ; rôles de Sara et Jordan ; deux avis
Google ; prononciation et définition humoristique du nom. À l'écran : badge « exemple », mention « illustratif », et la
phrase « Maquette KYW, certaines données sont illustratives » dans le pied de page.

## Ce qui manque ou reste ouvert

- Le plat en 5 couches est dessiné en SVG (pas de détourages PNG chez le client) ; le driver lit `[data-couche]`, donc 5 `<img>` le remplacent sans code.
- Le disque CTA de la galerie épinglée est atteignable au clavier mais hors écran à ce moment (la piste est translatée par le scrub) : solution possible, `scrollIntoView` sur `focus` qui avance le ScrollTrigger, ou un second lien « Réserver » statique après la bande.
- Le plan de la section Visite est un schéma SVG, pas une carte.
- LCP mobile dominé par le loader (prévu) ; si le jury le pénalise, réduire `MIN` du moteur ou retirer le rideau sur mobile.
- Seconde passe visuelle complète (toutes les frames de toutes les pages) à faire par le relecteur : cet agent a regardé les planches accueil, histoire et 404.

## Leçons structurelles (à reporter dans `agents/lecons.md`)

- `shoot.mjs` écrit dans `.shots/` par défaut, dossier partagé entre agents parallèles : les rapports de deux gabarits se sont écrasés (`.shots/home` contenait quatre-mains après ma capture). Toujours passer `--out .shots-<id>/<page>` ; en mode URL unique, `--out` est le dossier de la page elle-même (pas de sous-dossier), donc un dossier par page.
- Six pages en séquence dépassent les 600 s d'une commande de premier plan : lancer la série en arrière-plan avec un marqueur de fin dans un journal et un `Monitor` `until grep`.
- axe compte « texte large » à partir de 24 px, ou 18,66 px en gras : sur un aplat rouge ou vert (contraste 3,8 à 4,3 avec crème ou ink), tout texte doit être ≥ 1,25 rem en 700, sinon le placer dans une puce crème.
