import { carte } from '../data/carte';
import { euro } from './format';
/** Retrouve un plat réel de la carte par son nom exact (échoue au build s'il n'existe pas). */
export function plat(nom: string) {
  for (const c of carte) { const p = c.plats.find((x) => x.nom === nom); if (p) return { ...p, prixTexte: euro(p.prix) }; }
  throw new Error(`Plat introuvable dans la carte : ${nom}`);
}
