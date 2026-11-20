# QA revue1 : el-greco-portfolio (passe captures, incomplète)

Build : OK (`dist/el-greco/portfolio/`, 5 pages : 404, carte, histoire, index, reservation).
Serveur : `serve.mjs dist --port 4501` (arrêté).

## Captures
- Dossiers : `.shots-el-greco-portfolio-revue1/home/`, `.shots-el-greco-portfolio-revue1/el-greco-item/`, `.shots-el-greco-portfolio-revue1/404/`
- Planches : NON FAITES (étape 4 non exécutée).
- Capture interrompue : le crawl s'est arrêté sur `carte/` (blocage de plus de 10 min) puis le process a été tué. Pages `histoire`, `reservation` non capturées. Le dossier `404/` contient un `report.json` avec `shootFailed` (fermeture du navigateur).

## Chiffres extraits (report.json)
- home : erreurs console 0 ; requêtes en échec 0 ; violations axe 0.
- Audit (`audit.mjs`) : NON EXÉCUTÉ (serveur arrêté après blocage).
- CLS, LCP, débordement, éléments cachés, clavier : non extraits (champs `vitals`, `overflowX`, `smallTargets`, `nav` présents dans le report, valeurs non lues).

## FAIL / WARN
- Aucun FAIL (audit non lancé). WARN : non compté.
