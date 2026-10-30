export const meta = {
  name: 'refonte-restaurant',
  description: 'Refonte complète d un restaurant en 3 variantes : recherche, 3 builds, revue, révision, publication, leçons',
  whenToUse: 'Lancer avec args = { slug } pour un restaurant présent dans data/restaurants.json',
  phases: [
    { title: 'Recherche', detail: 'dossier client complet (site actuel, photos, faits)' },
    { title: 'Construction', detail: 'portfolio, awwwards, legacy en parallèle' },
    { title: 'Revue', detail: 'texte + fonctionnel, par variante' },
    { title: 'Révision', detail: 'corrections puis re-revue' },
    { title: 'Publication', detail: 'build, index, commit, push, vérification Vercel' },
    { title: 'Leçons', detail: 'auto-amélioration des prompts' },
  ],
}

// Script du moteur de workflows. Entrée : args = { slug, variantes?: [...], passesMax?: 2 }.
// Tous les prompts de production vivent dans agents/*.md : le script ne fait que les désigner et chaîner.
const slug = typeof args === 'string' ? args : args?.slug
if (!slug) throw new Error('args.slug manquant')
const variantes = args?.variantes || ['portfolio', 'awwwards', 'legacy']
const passesMax = args?.passesMax || 2
const ROOT = '/home/user/KYW-test-restaurant'
const prompts = { portfolio: 'variante-portfolio.md', awwwards: 'variante-awwwards.md', legacy: 'variante-legacy.md' }

const socle = (role) => `Tu es l'agent « ${role} » du dépôt ${ROOT} (cd ${ROOT} avant toute commande). Lis d'abord intégralement ${ROOT}/agents/${role}.md : c'est ton prompt de production, applique-le à la lettre. Lis aussi ${ROOT}/agents/lecons.md. Restaurant : slug « ${slug} » (entrée correspondante de data/restaurants.json). Chromium Playwright est préinstallé : ne lance jamais « playwright install ». Ne pose aucune question : décide, note tes hypothèses, livre. Ta réponse finale est un compte rendu factuel (pas un message pour un humain).`

const SCHEMA_RECHERCHE = { type: 'object', properties: { ok: { type: 'boolean' }, photos: { type: 'number' }, manques: { type: 'array', items: { type: 'string' } }, resume: { type: 'string' } }, required: ['ok', 'photos', 'resume'] }
const SCHEMA_BUILD = { type: 'object', properties: { ok: { type: 'boolean' }, build_passe: { type: 'boolean' }, resume: { type: 'string' }, placeholders: { type: 'array', items: { type: 'string' } } }, required: ['ok', 'build_passe', 'resume'] }
const SCHEMA_REVUE = { type: 'object', properties: { verdict: { type: 'string', enum: ['BLOQUANT', 'A_CORRIGER', 'PUBLIABLE'] }, f0: { type: 'number' }, f1: { type: 'number' }, f2: { type: 'number' }, f3: { type: 'number' }, fichier: { type: 'string' }, resume: { type: 'string' } }, required: ['verdict', 'f0', 'f1', 'fichier', 'resume'] }
const SCHEMA_REVISION = { type: 'object', properties: { corriges: { type: 'number' }, refuses: { type: 'number' }, impossibles: { type: 'number' }, publiable: { type: 'boolean' }, amendements_prompts: { type: 'array', items: { type: 'object', properties: { prompt: { type: 'string' }, paragraphe: { type: 'string' } }, required: ['prompt', 'paragraphe'] } }, resume: { type: 'string' } }, required: ['corriges', 'publiable', 'resume'] }
const SCHEMA_PUB = { type: 'object', properties: { urls: { type: 'array', items: { type: 'string' } }, etat: { type: 'string' }, non_publie: { type: 'array', items: { type: 'string' } } }, required: ['urls', 'etat'] }

phase('Recherche')
let recherche = await agent(`${socle('recherche-client')} Si ${ROOT}/data/restaurants/${slug}/donnees.json existe déjà et est complet (carte, horaires, photos/index.json), vérifie-le, complète ce qui manque et ne refais pas ce qui est fait.`, { label: `recherche:${slug}`, phase: 'Recherche', schema: SCHEMA_RECHERCHE, model: 'sonnet' })
if (!recherche) throw new Error('Recherche échouée (agent mort)')
log(`Recherche ${slug} : ${recherche.photos} photos ; ${recherche.resume}`)

// Pipeline par variante : build → revue → (révision → revue)×n → décision. Pas de barrière entre variantes.
const resultats = await pipeline(
  variantes,
  async (v) => {
    const b = await agent(`${socle(prompts[v].replace('.md', ''))} Variante à produire : « ${v} ». Sortie : ${ROOT}/sites/${slug}-${v}/ et ${ROOT}/dist/${slug}/${v}/ (via node scripts/build-site.mjs). Le build final doit passer.`, { label: `build:${v}:${slug}`, phase: 'Construction', schema: SCHEMA_BUILD, effort: 'high', ...(v === 'awwwards' ? {} : { model: 'opus' }) })
    return { v, build: b }
  },
  async (etat) => {
    if (!etat?.build?.build_passe) { log(`${etat?.v} : build en échec, révision immédiate`); }
    const revues = [], revisions = []
    let passe = 1
    let revue = await agent(`${socle('relecteur-site')} Variante : « ${etat.v} », passe ${passe}. Site : ${ROOT}/sites/${slug}-${etat.v}/. Écris REVUE-${passe}.md dans ce dossier.`, { label: `revue${passe}:${etat.v}:${slug}`, phase: 'Revue', schema: SCHEMA_REVUE, effort: 'high', model: 'sonnet' })
    revues.push(revue)
    while (revue && revue.verdict !== 'PUBLIABLE' && (revue.f0 > 0 || revue.f1 > 0 || revue.verdict === 'BLOQUANT') && passe <= passesMax) {
      const rev = await agent(`${socle('reviseur-site')} Variante : « ${etat.v} ». Site : ${ROOT}/sites/${slug}-${etat.v}/, revue à traiter : REVUE-${passe}.md. Écris REVISION-${passe}.md. Rends dans amendements_prompts les paragraphes exacts à ajouter aux prompts de agents/ si tu as détecté une lacune de méthode (sinon tableau vide).`, { label: `revision${passe}:${etat.v}:${slug}`, phase: 'Révision', schema: SCHEMA_REVISION, effort: 'high', model: 'opus' })
      revisions.push(rev)
      passe++
      revue = await agent(`${socle('relecteur-site')} Variante : « ${etat.v} », passe ${passe} (après REVISION-${passe - 1}.md : vérifie chaque correction annoncée). Site : ${ROOT}/sites/${slug}-${etat.v}/. Écris REVUE-${passe}.md.`, { label: `revue${passe}:${etat.v}:${slug}`, phase: 'Revue', schema: SCHEMA_REVUE, effort: 'high', model: 'sonnet' })
      revues.push(revue)
    }
    const derniere = revues[revues.length - 1]
    const publiable = !!derniere && derniere.f0 === 0 && derniere.verdict !== 'BLOQUANT'
    log(`${etat.v} : ${revues.length} revue(s), verdict final ${derniere?.verdict} (F0 ${derniere?.f0}, F1 ${derniere?.f1}) → ${publiable ? 'publiable' : 'NON publiable'}`)
    return { v: etat.v, build: etat.build, revues, revisions, publiable }
  },
)

phase('Publication')
const ok = resultats.filter(Boolean).filter((r) => r.publiable).map((r) => r.v)
const pub = ok.length
  ? await agent(`${socle('publication')} Variantes à publier : ${ok.join(', ')}. Variantes non publiables (ne pas publier, les lister dans non_publie) : ${variantes.filter((v) => !ok.includes(v)).join(', ') || 'aucune'}.`, { label: `publication:${slug}`, phase: 'Publication', schema: SCHEMA_PUB, model: 'haiku' })
  : { urls: [], etat: 'rien à publier', non_publie: variantes }
log(`Publication ${slug} : ${pub?.urls?.join(' ') || 'aucune URL'}`)

phase('Leçons')
const amendements = resultats.filter(Boolean).flatMap((r) => r.revisions.filter(Boolean).flatMap((x) => x.amendements_prompts || []))
const lecons = await agent(`Tu travailles dans le dépôt ${ROOT} (cd ${ROOT} avant toute commande), en français, sans poser de question. Rôle : gardien des leçons. Lis ${ROOT}/agents/lecons.md, tous les RAPPORT.md, REVUE-*.md et REVISION-*.md de ${ROOT}/sites/${slug}-*/ et ces amendements proposés par les réviseurs : ${JSON.stringify(amendements)}. 1) Ajoute à agents/lecons.md les leçons structurelles nouvelles (une ligne datée chacune, sans doublon). 2) Pour chaque amendement pertinent et général (pas spécifique à ce restaurant), ajoute-le à la fin du prompt visé (agents/<prompt>.md) sous un titre « ## Leçons intégrées » (crée-le s'il manque), sans jamais supprimer ni réécrire le reste du prompt. 3) git add agents && git commit -m "Intègre les leçons du restaurant ${slug}" && git push (retente sur échec réseau). Réponds par la liste des leçons ajoutées et des prompts modifiés.`, { label: `lecons:${slug}`, phase: 'Leçons', model: 'sonnet' })

return { slug, recherche, resultats: resultats.filter(Boolean).map((r) => ({ v: r.v, publiable: r.publiable, verdicts: r.revues.filter(Boolean).map((x) => `${x.verdict} F0=${x.f0} F1=${x.f1}`) })), publication: pub, lecons }
