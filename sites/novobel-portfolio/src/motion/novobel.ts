// Motion propre à Novobel (phase 2) : le tableau de chantier avance. Fil des étapes tracé au défilement, chiffres qui
// montent, traits sous les titres, photos qui se découvrent, jauge d'avancement de la page dans l'en-tête, formulaire de devis.
// Rien n'est caché avant d'être animé sans la classe html.motion ; en reduced motion seuls les états (jauge, formulaire) restent.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger);

type Off = (() => void) | void;

export function novobelMotion(): Off[] {
  return [jauge(), filChantier(), compteurs(), traits(), photos(), devis()];
}

/** Jauge d'avancement de la page : trait jaune sous l'en-tête, piloté par le défilement (aucune animation propre). */
function jauge(): Off {
  const header = document.querySelector<HTMLElement>('.header');
  if (!header) return;
  const st = ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (s) => header.style.setProperty('--p', s.progress.toFixed(4)),
  });
  header.style.setProperty('--p', '0');
  return () => { st.kill(); header.style.removeProperty('--p'); };
}

/** Fil à plomb des étapes : une ligne jaune descend avec le défilement, chaque numéro s'allume en la croisant. */
function filChantier(): Off {
  if (prefersReducedMotion()) return;
  const liste = document.querySelector<HTMLElement>('.etapes');
  if (!liste) return;
  const fil = document.createElement('span');
  fil.className = 'etapes__fil';
  fil.setAttribute('aria-hidden', 'true');
  liste.prepend(fil);
  const tween = gsap.fromTo(fil, { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: liste, start: 'top 70%', end: 'bottom 60%', scrub: 0.4 },
  });
  const triggers = [...liste.querySelectorAll<HTMLElement>('.etape')].map((li) => ScrollTrigger.create({
    trigger: li, start: 'top 68%',
    onEnter: () => li.classList.add('est-atteinte'),
    onLeaveBack: () => li.classList.remove('est-atteinte'),
  }));
  return () => { tween.scrollTrigger?.kill(); tween.kill(); triggers.forEach((t) => t.kill()); fil.remove(); };
}

/** Chiffres clés : montent de 0 à la valeur du dossier une seule fois. Le texte final est dans le HTML (aucun saut de mise en page). */
function compteurs(): Off {
  if (prefersReducedMotion()) return;
  const cibles = [...document.querySelectorAll<HTMLElement>('.stats .num')];
  const tweens = cibles.map((el) => {
    const final = Number((el.textContent || '').trim());
    if (!Number.isFinite(final) || final <= 0) return null;
    const o = { v: 0 };
    el.setAttribute('aria-label', String(final));
    el.setAttribute('role', 'text');
    return ScrollTrigger.create({
      trigger: el, start: 'top 95%', once: true,
      onEnter: () => {
        el.textContent = '0';
        gsap.to(o, { v: final, duration: 1.4, delay: 0.3, ease: ease.out, onUpdate: () => { el.textContent = String(Math.round(o.v)); }, onComplete: () => { el.textContent = String(final); } });
      },
    });
  });
  return () => tweens.forEach((t) => t && t.kill());
}

/** Trait jaune sous les titres de page et de hero : se trace une fois (classe posée au chargement, CSS pour le reste). */
function traits(): Off {
  if (prefersReducedMotion()) return;
  const id = window.setTimeout(() => {
    document.querySelectorAll('.ardoise__nom, .entete h1').forEach((h) => h.classList.add('est-trace'));
  }, 450);
  return () => clearTimeout(id);
}

/** Photos : les bandes pleine largeur dérivent doucement (parallaxe bornée), les portraits se découvrent de bas en haut. */
function photos(): Off {
  if (prefersReducedMotion()) return;
  const tweens: gsap.core.Tween[] = [];
  document.querySelectorAll<HTMLElement>('.bande img').forEach((img) => {
    tweens.push(gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
      yPercent: 5, scale: 1.12, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    }));
  });
  document.querySelectorAll<HTMLElement>('.deux figure').forEach((fig) => {
    tweens.push(gsap.fromTo(fig, { clipPath: 'inset(100% 0 0 0)' }, {
      clipPath: 'inset(0% 0 0 0)', duration: 1, ease: ease.out, clearProps: 'clipPath',
      scrollTrigger: { trigger: fig, start: 'top 88%', once: true },
    }));
  });
  return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
}

/** Formulaire de devis : validation en français champ par champ, message d'état, puis ouverture de la messagerie
 *  avec le message prérempli (aucun envoi, aucun serveur). Sans JS : validation native et envoi mailto du navigateur. */
function devis(): Off {
  const form = document.querySelector<HTMLFormElement>('[data-devis]');
  if (!form) return;
  form.noValidate = true;
  const etat = form.querySelector<HTMLElement>('[data-etat-form]')!;
  const champs = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[name], textarea[name]')];
  const dire = (c: HTMLInputElement | HTMLTextAreaElement) => {
    const v = c.validity;
    if (v.valueMissing) return ({ nom: 'Indiquez votre nom.', email: 'Indiquez votre adresse e-mail.', projet: 'Décrivez votre projet en quelques mots.' } as Record<string, string>)[c.name] || 'Ce champ est requis.';
    if (v.typeMismatch) return 'Cette adresse e-mail semble incomplète (il manque par exemple le @).';
    if (c.name === 'telephone' && c.value.trim() && !/^[\d\s+.()/-]{6,}$/.test(c.value.trim())) return 'Numéro de téléphone non reconnu : chiffres, espaces, + et points seulement.';
    return '';
  };
  const montrer = (c: HTMLInputElement | HTMLTextAreaElement) => {
    const msg = dire(c);
    const zone = form.querySelector<HTMLElement>(`#e-${c.name}`);
    if (!zone) return !msg;
    zone.textContent = msg;
    zone.hidden = !msg;
    if (msg) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
    return !msg;
  };
  const touches = new Set<string>();
  const onBlur = (e: Event) => { const c = e.target as HTMLInputElement; if (c.name) { touches.add(c.name); montrer(c); } };
  const onInput = (e: Event) => {
    const c = e.target as HTMLInputElement;
    if (!c.name) return;
    if (touches.has(c.name) || c.getAttribute('aria-invalid')) montrer(c);
    etat.hidden = true; form.dataset.pret = 'non';
  };
  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const invalides = champs.filter((c) => !montrer(c));
    if (invalides.length) {
      etat.hidden = false; etat.dataset.type = 'erreur';
      etat.textContent = invalides.length === 1 ? 'Un champ est à corriger avant l’envoi.' : `${invalides.length} champs sont à corriger avant l’envoi.`;
      invalides[0].focus();
      return;
    }
    const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value.trim() || '';
    const corps = `${val('projet')}\n\nNom : ${val('nom')}\nTéléphone : ${val('telephone') || 'non communiqué'}\nE-mail : ${val('email')}`;
    const base = new URL(form.action);
    const href = `${base.protocol}${base.pathname}?subject=${encodeURIComponent('Demande de devis gratuit')}&body=${encodeURIComponent(corps)}`;
    etat.hidden = false; etat.dataset.type = 'ok';
    etat.textContent = 'Votre messagerie s’ouvre avec le message prérempli. Rien n’est envoyé tant que vous ne validez pas dans votre messagerie.';
    form.dataset.pret = 'oui';
    window.location.href = href;
  };
  form.addEventListener('focusout', onBlur);
  form.addEventListener('input', onInput);
  form.addEventListener('submit', onSubmit);
  return () => { form.removeEventListener('focusout', onBlur); form.removeEventListener('input', onInput); form.removeEventListener('submit', onSubmit); };
}
