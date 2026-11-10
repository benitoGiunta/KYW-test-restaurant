import{o as a}from"./index.BgTWKf0H.js";a(()=>{const e=document.querySelector("[data-reservation]");if(!e)return;const r=n=>{n.preventDefault();const o=e.querySelector("[data-statut]");if(!e.checkValidity()){e.reportValidity(),o&&(o.textContent="Merci de compléter les champs signalés.");return}o&&(o.textContent="Votre messagerie s’ouvre avec le message prêt à envoyer.");const t=new FormData(e),s=`Nom : ${t.get("nom")}
Téléphone : ${t.get("tel")||""}
Date : ${t.get("date")}
Heure : ${t.get("heure")}
Couverts : ${t.get("couverts")}

${t.get("message")||""}`;window.location.href=`${e.getAttribute("action")}?subject=${encodeURIComponent("Demande de table")}&body=${encodeURIComponent(s)}`};return e.addEventListener("submit",r),()=>e.removeEventListener("submit",r)});
