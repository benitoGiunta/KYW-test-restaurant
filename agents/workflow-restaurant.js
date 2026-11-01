export const meta = {
  name: 'refonte-restaurant',
  description: 'Refonte d un restaurant en 3 variantes, version sobre (01/11) : agents courts, captures par Haiku, révision ciblée',
  whenToUse: 'Lancer avec args = { slug } pour un restaurant présent dans data/restaurants.json',
  phases: [
    { title: 'Recherche', detail: 'dossier client complet (site actuel, photos, faits)' },
    { title: 'Construction', detail: '3 agents courts par variante : structure, motion, QA' },
    { title: 'Captures', detail: 'shoot + audit par Haiku, résumé QA-<étape>.md' },
    { title: 'Revue', detail: 'texte + fonctionnel, par variante' },
    { title: 'Révision', detail: 'corrections ciblées puis re-revue' },
    { title: 'Publication', detail: 'build, index, commit, push, vérification Vercel' },
    { title: 'Leçons', detail: 'auto-amélioration des prompts' },
  ],
}

// Règles de sobriété : agents/sobriete.md. Chaque agent a un modèle explicite, au plus 40 réponses, aucune attente
// longue ; les captures complètes sont faites par un agent Haiku avant l'agent qui les exploite.
const slug = typeof args === 'string' ? args : args?.slug
if (!slug) throw new Error('args.slug manquant')
const variantes = args?.variantes || ['portfolio', 'awwwards', 'legacy']
const passesMax = args?.passesMax || 2
const ROOT = '/home/user/KYW-test-restaurant'
const prompts = { portfolio: 'variante-portfolio', awwwards: 'variante-awwwards', legacy: 'variante-legacy' }
// Test C (01/11) : construction de la variante legacy sur Sonnet 5.5 ; portfolio et awwwards restent sur Opus.
const MODELE_BUILD = { portfolio: 'opus', awwwards: 'opus', legacy: 'sonnet' }
const PORTS = { portfolio: 4501, awwwards: 4502, legacy: 4503 }

// Test A (01/11) : awwwards et legacy lisent commun.md + phase-N.md au lieu du prompt complet ; portfolio garde le sien.
const promptPhase = (v, n) => (v === 'awwwards' || v === 'legacy') ? [`agents/variante-${v}/commun.md`, `agents/variante-${v}/phase-${n}.md`] : undefined
const entete = (role, v, passe) => `Rôle : ${role} · Restaurant : ${slug} · Variante : ${v || '-'} · Passe : ${passe || '-'}`
const socle = (role, v, passe, fichiersPrompt) => `${entete(role, v, passe)}\nTu es l'agent « ${role} » du dépôt ${ROOT} (cd ${ROOT} avant toute commande). Lis d'abord intégralement ${ROOT}/agents/sobriete.md (règles de sobriété, prioritaires sur tout le reste), puis ${fichiersPrompt ? fichiersPrompt.map((f) => `${ROOT}/${f}`).join(' + ') : `${ROOT}/agents/${role}.md`} (ton prompt de production) et ${ROOT}/agents/lecons/commun.md + le fichier de ton rôle dans ${ROOT}/agents/lecons/ (construction, revue, revision, recherche ou publication). Restaurant : slug « ${slug} » (entrée de data/restaurants.json). Chromium Playwright est préinstallé : ne lance jamais « playwright install ». Serveur : note son PID, arrête-le avec kill <PID> (jamais pkill -f). Ne touche jamais à gabarits/ ni aux dossiers d'autres restaurants. Ne pose aucune question : décide, note tes hypothèses, livre. Au plus 40 réponses : vers 35, écris ETAT.md dans le dossier du site et termine. Réponse finale : compte rendu factuel court.`

const SCHEMA_RECHERCHE = { type: 'object', properties: { ok: { type: 'boolean' }, photos: { type: 'number' }, manques: { type: 'array', items: { type: 'string' } }, resume: { type: 'string' } }, required: ['ok', 'photos', 'resume'] }
const SCHEMA_BUILD = { type: 'object', properties: { ok: { type: 'boolean' }, build_passe: { type: 'boolean' }, termine: { type: 'boolean' }, resume: { type: 'string' }, placeholders: { type: 'array', items: { type: 'string' } } }, required: ['ok', 'build_passe', 'resume'] }
const SCHEMA_QA = { type: 'object', properties: { ok: { type: 'boolean' }, fichier: { type: 'string' }, fails: { type: 'number' }, resume: { type: 'string' } }, required: ['ok', 'fichier', 'resume'] }
const SCHEMA_REVUE = { type: 'object', properties: { verdict: { type: 'string', enum: ['BLOQUANT', 'A_CORRIGER', 'PUBLIABLE'] }, f0: { type: 'number' }, f1: { type: 'number' }, f2: { type: 'number' }, f3: { type: 'number' }, fichier: { type: 'string' }, resume: { type: 'string' } }, required: ['verdict', 'f0', 'f1', 'fichier', 'resume'] }
const SCHEMA_REVISION = { type: 'object', properties: { corriges: { type: 'number' }, refuses: { type: 'number' }, impossibles: { type: 'number' }, publiable: { type: 'boolean' }, amendements_prompts: { type: 'array', items: { type: 'object', properties: { prompt: { type: 'string' }, paragraphe: { type: 'string' } }, required: ['prompt', 'paragraphe'] } }, resume: { type: 'string' } }, required: ['corriges', 'publiable', 'resume'] }
const SCHEMA_PUB = { type: 'object', properties: { urls: { type: 'array', items: { type: 'string' } }, etat: { type: 'string' }, non_publie: { type: 'array', items: { type: 'string' } } }, required: ['urls', 'etat'] }

// Agent mécanique : build + serveur + shoot + audit, tout via scripts/q.sh ; écrit un résumé chiffré.
const captures = (v, etape) => agent(`${entete('captures', v, etape)}\nTu es un agent d'exécution mécanique dans ${ROOT} (cd ${ROOT}). Lis ${ROOT}/agents/sobriete.md. Site : sites/${slug}-${v}/. Étapes, toutes via scripts/q.sh (jamais de sortie longue dans ta réponse) : 1) scripts/q.sh ${slug}-${v}-${etape}-build node scripts/build-site.mjs sites/${slug}-${v} ; si exit ≠ 0, écris l'erreur (grep -m5 -i error dans le journal) dans le résumé et arrête. 2) node .claude/skills/awwwards/scripts/serve.mjs dist --port ${PORTS[v]} > .logs/serve-${v}.log 2>&1 & ; note le PID. 3) U=http://127.0.0.1:${PORTS[v]}/${slug}/${v}/ ; scripts/q.sh ${slug}-${v}-${etape}-shoot node .claude/skills/awwwards/scripts/shoot.mjs $U --crawl --nav --out .shots-${slug}-${v}-${etape} (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers) ; puis scripts/q.sh ${slug}-${v}-${etape}-audit node .claude/skills/awwwards/scripts/audit.mjs $U. 4) Pour chaque dossier de page dans .shots-${slug}-${v}-${etape}/, fais une planche : python3 scripts/planche.py <dossier>/planche.png <dossier>/d-*.png <dossier>/m-*.png --colonnes 4 --largeur 480. 5) Arrête le serveur par kill <PID>. 6) Écris sites/${slug}-${v}/QA-${etape}.md : pour chaque page, chemin du dossier de captures et de la planche, et les chiffres utiles extraits par grep/jq des report.json (erreurs console, requêtes en échec, violations axe, CLS, LCP mobile et desktop, débordement, éléments cachés, clavier) ; puis les lignes FAIL et le nombre de WARN de l'audit. Pas d'analyse de design : des faits. Ne modifie aucun fichier source, ne commite pas. Au plus 20 réponses.`, { label: `captures-${etape}:${v}:${slug}`, phase: 'Captures', schema: SCHEMA_QA, model: 'haiku' })

phase('Recherche')
const recherche = await agent(`${socle('recherche-client')} Si ${ROOT}/data/restaurants/${slug}/donnees.json existe déjà et est complet (carte, horaires, photos/index.json), vérifie-le, complète ce qui manque et ne refais pas ce qui est fait.`, { label: `recherche:${slug}`, phase: 'Recherche', schema: SCHEMA_RECHERCHE, model: 'sonnet' })
if (!recherche) throw new Error('Recherche échouée (agent mort)')
log(`Recherche ${slug} : ${recherche.photos} photos ; ${recherche.resume}`)

const resultats = await pipeline(
  variantes,
  async (v) => {
    const role = prompts[v]
    const site = `${ROOT}/sites/${slug}-${v}/`
    const a = await agent(`${socle(role, v, 'construction-1', promptPhase(v, 1))} PHASE 1 sur 3 de la construction de la variante « ${v} » (${site}) : concept, DESIGN.md, contenu (site.ts / données), toutes les pages et leur mise en page statique, build qui passe (scripts/q.sh). PAS d'animations avancées ni de QA en navigateur dans cette phase. Termine par ETAT.md (fait / reste / décisions) dans ${site}.`, { label: `build1:${v}:${slug}`, phase: 'Construction', schema: SCHEMA_BUILD, effort: 'high', model: MODELE_BUILD[v] })
    const b = await agent(`${socle(role, v, 'construction-2', promptPhase(v, 2))} PHASE 2 sur 3 de la variante « ${v} » (${site}) : lis ${site}ETAT.md et DESIGN.md (un agent précédent a fait la phase 1 ; ne refais pas ce qui est fait). Fais : motion, signature, interactions, états, mobile, reduced-motion, finitions, puis build qui passe (scripts/q.sh). Pas de shoot complet : un agent « captures » le fera après toi. Mets ETAT.md à jour.`, { label: `build2:${v}:${slug}`, phase: 'Construction', schema: SCHEMA_BUILD, effort: 'high', model: MODELE_BUILD[v] })
    const qa1 = await captures(v, 'build')
    const c = await agent(`${socle(role, v, 'construction-3', promptPhase(v, 3))} PHASE 3 sur 3 de la variante « ${v} » (${site}) : QA. Lis ${site}ETAT.md puis ${site}QA-build.md (captures et audit déjà faits par l'agent « captures » : lis les planches indiquées, n'en refais pas de complètes). Corrige ce qui est cassé, rebuild (scripts/q.sh), vérifie chaque correction par capture ciblée d'une page. Écris RAPPORT.md (QA, placeholders) et mets ETAT.md à jour. Build final qui passe.`, { label: `build3:${v}:${slug}`, phase: 'Construction', schema: SCHEMA_BUILD, effort: 'high', model: MODELE_BUILD[v] })
    return { v, build: c || b || a, qa1 }
  },
  async (etat) => {
    const v = etat.v
    const site = `${ROOT}/sites/${slug}-${v}/`
    const revues = [], revisions = []
    let passe = 1
    await captures(v, `revue${passe}`)
    let revue = await agent(`${socle('relecteur-site', v, passe)} Site : ${site}. Les captures complètes et l'audit sont déjà faits : lis ${site}QA-revue${passe}.md et ses planches (ne relance pas de shoot complet ; captures ciblées seulement si une preuve manque). Écris REVUE-${passe}.md dans ce dossier.`, { label: `revue${passe}:${v}:${slug}`, phase: 'Revue', schema: SCHEMA_REVUE, effort: 'high', model: 'sonnet' })
    revues.push(revue)
    // Test B (01/11) : revue 1 sans F0 ni F1 → une révision ciblée des F2 éventuels, sans revue 2.
    if (revue && revue.f0 === 0 && revue.f1 === 0 && revue.verdict !== 'BLOQUANT' && ((revue.f2 || 0) > 0)) {
      const rev = await agent(`${socle('reviseur-site', v, passe)} Site : ${site}, revue à traiter : REVUE-${passe}.md (aucun F0 ni F1). RÉVISION CIBLÉE des F2 seulement, chacun vérifié par capture ciblée, grep ou mesure ; pas de QA complète. Rebuild final via scripts/q.sh. Écris REVISION-${passe}.md. Pas de revue 2 ensuite : la session de reporting contrôlera un échantillon. Rends amendements_prompts (tableau vide si rien).`, { label: `revision${passe}:${v}:${slug}`, phase: 'Révision', schema: SCHEMA_REVISION, effort: 'high', model: 'opus' })
      revisions.push(rev)
      log(`${v} : revue 1 sans F0/F1 → révision des F2, revue 2 dispensée (test B)`)
    }
    while (revue && revue.verdict !== 'PUBLIABLE' && (revue.f0 > 0 || revue.f1 > 0 || revue.verdict === 'BLOQUANT') && passe <= passesMax) {
      const rev = await agent(`${socle('reviseur-site', v, passe)} Site : ${site}, revue à traiter : REVUE-${passe}.md. RÉVISION CIBLÉE : corrige la liste F0, F1, F2 de la revue et vérifie seulement ces points (capture ciblée d'une page, grep, mesure) ; pas de QA complète. Rebuild final via scripts/q.sh. Écris REVISION-${passe}.md. Rends dans amendements_prompts les paragraphes exacts à ajouter aux prompts de agents/ si tu as détecté une lacune de méthode (sinon tableau vide).`, { label: `revision${passe}:${v}:${slug}`, phase: 'Révision', schema: SCHEMA_REVISION, effort: 'high', model: 'opus' })
      revisions.push(rev)
      passe++
      await captures(v, `revue${passe}`)
      revue = await agent(`${socle('relecteur-site', v, passe)} Site : ${site}, passe ${passe} après REVISION-${passe - 1}.md : vérifie chaque correction annoncée. Captures déjà faites : lis ${site}QA-revue${passe}.md et ses planches. Écris REVUE-${passe}.md.`, { label: `revue${passe}:${v}:${slug}`, phase: 'Revue', schema: SCHEMA_REVUE, effort: 'high', model: 'sonnet' })
      revues.push(revue)
    }
    const derniere = revues[revues.length - 1]
    const publiable = !!derniere && derniere.f0 === 0 && derniere.verdict !== 'BLOQUANT'
    log(`${v} : ${revues.length} revue(s), verdict final ${derniere?.verdict} (F0 ${derniere?.f0}, F1 ${derniere?.f1}) → ${publiable ? 'publiable' : 'NON publiable'}`)
    return { v, build: etat.build, revues, revisions, publiable }
  },
)

phase('Publication')
const ok = resultats.filter(Boolean).filter((r) => r.publiable).map((r) => r.v)
const pub = ok.length
  ? await agent(`${socle('publication')} Variantes à publier : ${ok.join(', ')}. Variantes non publiables (ne pas publier, les lister dans non_publie) : ${variantes.filter((x) => !ok.includes(x)).join(', ') || 'aucune'}. Toujours git pull --rebase avant git push ; commandes longues via scripts/q.sh.`, { label: `publication:${slug}`, phase: 'Publication', schema: SCHEMA_PUB, model: 'haiku' })
  : { urls: [], etat: 'rien à publier', non_publie: variantes }
log(`Publication ${slug} : ${pub?.urls?.join(' ') || 'aucune URL'}`)

phase('Leçons')
const amendements = resultats.filter(Boolean).flatMap((r) => r.revisions.filter(Boolean).flatMap((x) => x.amendements_prompts || []))
const lecons = await agent(`${entete('gardien-des-lecons')}\nTu travailles dans le dépôt ${ROOT} (cd ${ROOT} avant toute commande), en français, sans poser de question. Lis ${ROOT}/agents/lecons/commun.md et les fichiers de rôle de ${ROOT}/agents/lecons/ concernés, les RAPPORT.md, REVUE-*.md et REVISION-*.md de ${ROOT}/sites/${slug}-*/ (grep ciblé si longs) et ces amendements proposés par les réviseurs : ${JSON.stringify(amendements)}. 1) Ajoute les leçons structurelles nouvelles à la fin de agents/lecons/<rôle>.md (construction, revue, revision, recherche, publication ou commun si elle vaut pour tous ; une ligne datée chacune, sans doublon, sans toucher à lecons-archive.md). 2) Pour chaque amendement pertinent et général, ajoute-le à la fin du prompt visé (agents/<prompt>.md) sous « ## Leçons intégrées », sans supprimer ni réécrire le reste. 3) git add agents && git commit -m "Intègre les leçons du restaurant ${slug}" && git pull --rebase && git push. Au plus 20 réponses. Réponds par la liste des leçons ajoutées et des prompts modifiés.`, { label: `lecons:${slug}`, phase: 'Leçons', model: 'sonnet' })

return { slug, recherche, resultats: resultats.filter(Boolean).map((r) => ({ v: r.v, publiable: r.publiable, verdicts: r.revues.filter(Boolean).map((x) => `${x.verdict} F0=${x.f0} F1=${x.f1}`) })), publication: pub, lecons }
