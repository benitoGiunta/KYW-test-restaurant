import{o as a}from"./index.FCHLZemN.js";a(()=>{const e=document.querySelector("[data-reservation]");if(!e)return;const o=n=>{n.preventDefault();const t=new FormData(e),r=`Nom : ${t.get("nom")}
Date : ${t.get("date")}
Heure : ${t.get("heure")}
Couverts : ${t.get("couverts")}

${t.get("message")??""}`;window.location.href=`mailto:${e.dataset.mail}?subject=${encodeURIComponent("Demande de réservation")}&body=${encodeURIComponent(r)}`};return e.addEventListener("submit",o),()=>e.removeEventListener("submit",o)});
