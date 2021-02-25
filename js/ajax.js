//--------------------------Création varaible URL------------------------------
const urlApi = "http://localhost:3000/api/teddies";

//---------Fonction pour récupérer tous les produits dans l'URL----------------
async function fillProducts() {
  let response = await fetch(urlApi);
  if (!response.ok) {
    alert("L'appel au serveur ne fonctionne pas"); // si la promesse est rejetée
  }
  let data = await response.json(); // retourne au format Json
  return allProducts(data); // fonction pour afficher les données sur la page accueil
}

//------------------Récupérer l'id du produit dans l'URL------------------------
const urlParams = new URLSearchParams(window.location.search); // Pour accéder à la chaîne des paramètres de l'URL
const card = urlParams.get("id");

//-----------------Fonction pour afficher un produit par son id-----------------
async function descriptiveProduct() {
  let response = await fetch(`${urlApi}/${card}`);
  if (!response.ok) {
    alert("L'appel au serveur ne fonctionne pas");
  }
  let data = await response.json();
  return oneProduct(data); // fonction pour afficher les données sur la page produit
}

//-------------Fonction pour envoyer les données récoltées à l'API---------------
function validOrder() {
  const button = document.querySelector(".submit");
  button.addEventListener("click", () => {
    
//création de l'objet contenant les données du contact et les id des produits sélectionnés  
    const order = {
      contact: { //------------------Récupération des données du formulaire----------------------
        firstName: document.getElementById("prenom").value,
        lastName: document.getElementById("nom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("email").value,
      },
      products: totalBasket.map(totalBasket => totalBasket.id), //création d'un tableau avec seulement les id des produits
    };

//--------------------Envoi des données au serveur---------------------------
    fetch(`${urlApi}/order`, {
      method: "POST",
      body: JSON.stringify(order), //envoi de l'objet au format JSON
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(response => {
        localStorage.setItem("order", JSON.stringify(order)); // stockage de l'objet dans le local storage
        localStorage.setItem("firstName", JSON.stringify(response.contact.firstName)); // stockage du prénom dans le local storage
        localStorage.setItem("orderId", JSON.stringify(response.orderId)); // stockage du numéro de commande dans le local storage
        window.location.href = "confirmation.html"; // ouverture de la page confirmation
      });
  });
}

//-----------------Fonction pour afficher la quantité du panier dans le header----------------------
function countHeader() {
  const totalBasket = JSON.parse(localStorage.getItem("panier"));
  const count = document.querySelector("span");
  result = 0;
  if (totalBasket) {
    for (let elem of totalBasket) {
      result += elem.quantity;
    }
    count.innerText = result;
  }
}
