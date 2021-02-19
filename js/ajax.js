//---------Fonction pour récupérer tous les produits dans l'URL----------------
async function fillProducts() {
  await fetch("http://localhost:3000/api/teddies")
    .then(response => response.json()) //retourne au format Json
    .then(data => allProducts(data)) //appelle fonction pour la page accueil
    .catch(error => alert("L'appel au serveur ne fonctionne pas : " + error)); //si la promesse est rejetée
}

//------------Récupérer l'id du produit dans l'URL---------------------------
const urlParams = new URLSearchParams(window.location.search); //Pour accéder à la chaîne des paramètres de l'URL
const card = urlParams.get("id");

//-----------------Fonction pour afficher un produit par son id-----------------
async function descriptiveProduct() {
  await fetch("http://localhost:3000/api/teddies/" + card)
    .then(response => response.json())
    .then(data => oneProduct(data)) //appelle fonction pour création page produit
    .catch(error => alert("L'appel au serveur ne fonctionne pas : " + error)); //si la promesse est rejetée
}

//-------------Fonction pour envoyer les données récoltées à l'API---------------

function validOrder() {

  let button = document.querySelector(".submit");
  button.addEventListener("click", () => {

 //------------------Récupération des données du formulaire----------------------
      let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;
    let couriel = document.getElementById("email").value;

    let products = totalBasket.map((totalBasket) => totalBasket.id);//création d'un tableau avec seulement les id des produits
  
    let order = { //création de l'objet contenant les données du contact et les id des produits sélectionnés
      contact: {
        firstName: prenom,
        lastName: nom,
        address: adresse,
        city: ville,
        email: couriel,  
      },
      products: products,
    };
  //--------------------Envoi des données au serveur---------------------------
     fetch("http://localhost:3000/api/teddies/order",
      {
        method: "POST",
        body: JSON.stringify(order), //envoi de l'objet au format JSON
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(response => {
          localStorage.setItem('order', JSON.stringify(order)); //enregistrement de l'objet dans le local storage
          localStorage.setItem('firstName', JSON.stringify(response.contact.firstName)); //stockage de l'objet dans le local storage
          localStorage.setItem('orderId', JSON.stringify(response.orderId)); //stockage du numéro de commande
          window.location.href = "/front/confirmation.html"; //ouverture de la page confirmation
        })
    });
  }
  
//-----------------Fonction pour afficher la quantité du panier dans le header----------------------
function countHeader() {
  let totalBasket = JSON.parse(localStorage.getItem("panier"));
  let count = document.querySelector("span");
  result = 0;
  if (totalBasket) {
    for (let elem of totalBasket) {
      result += elem.quantity;
    }
    count.innerText = result;
  }
}