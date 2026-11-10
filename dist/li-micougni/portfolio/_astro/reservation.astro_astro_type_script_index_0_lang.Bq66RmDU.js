import{o as i}from"./index.Q08n3KIm.js";i(()=>{const e=document.querySelector("[data-reservation]");if(!e)return;const r=n=>{n.preventDefault();const o=e.querySelector("[data-statut]");if(!e.checkValidity()){e.reportValidity(),o&&(o.textContent="Merci de compléter les champs signalés.");return}o&&(o.textContent="Votre messagerie s’ouvre avec le message prêt à envoyer.");const t=new FormData(e),a=`Nom : ${t.get("nom")}
Téléphone : ${t.get("tel")||""}
Date : ${t.get("date")}
Heure : ${t.get("heure")}
Couverts : ${t.get("couverts")}

${t.get("message")||""}`;window.location.href=`${e.getAttribute("action")}?subject=${encodeURIComponent("Demande de table")}&body=${encodeURIComponent(a)}`},s=()=>{const n=e.querySelector("[data-statut]");n&&(n.textContent="Merci de compléter les champs signalés.")};return e.addEventListener("submit",r),e.addEventListener("invalid",s,!0),()=>{e.removeEventListener("submit",r),e.removeEventListener("invalid",s,!0)}});
