//------------------Récupération des données du local storage--------------------
const confirmOrder = JSON.parse(localStorage.getItem("order")); //Conversion au format js
const firstName = JSON.parse(localStorage.getItem("firstName"));
const orderId = JSON.parse(localStorage.getItem("orderId"));
const panier = JSON.parse(localStorage.getItem("panier"));

console.log(firstName)
console.log(orderId)
console.log(confirmOrder);
const confirm = document.getElementById("valid");
//------------------------Création des éléments du DOM----------------------------
const cont = document.createElement("div");
cont.setAttribute("class", "confirm");
confirm.appendChild(cont);

const title = document.createElement("h1");
title.innerText = `Merci ${firstName} !`;//Utilisation du prénom stocké
cont.appendChild(title);

//------------------------------Calcul du prix total------------------------------
let total = 0;
for(let elem of panier) {
    total += elem.total;
}
console.log(total);

//------------Affichage de l'identifiant de commande envoyé par le serveur---------
const txt = document.createElement("p");
txt.innerHTML = `Nous vous confirmons l'enregistrement de votre commande n° :<br><strong>${orderId}</strong><br><br>Nous la traiterons dans les plus brefs délais.<br><br><br>Votre facture d'un montant de <br><strong>${(total/100).toFixed(2)} €</strong><br>vous sera adressé par email très prochainement.<br><br><br>Nous vous souhaitons une agréable journée <i class="fas fa-paw"></i></i>`;
cont.appendChild(txt);

//----------------------Vider le localStorage--------------------------------------
localStorage.clear();
 


countHeader();


