//---------Fonction pour récupérer tous les produits dans l'URL----------------
async function fillProducts() {
  await fetch("http://localhost:3000/api/teddies")
    .then(response => response.json()) //retourne au format Json
    .then(data => allProducts(data)) //fonction pour la page accueil
    .catch(error => alert("L'appel au serveur ne fonctionne pas : " + error));
}

//------------Récupérer l'id du produit dans l'URL---------------------------
const urlParams = new URLSearchParams(window.location.search); //Pour accéder à la chaîne des paramètres de l'URL
const card = urlParams.get("id");

//-----------------Fonction pour afficher un produit par son id-----------------
async function descriptiveProduct() {
  await fetch("http://localhost:3000/api/teddies/" + card)
    .then(response => response.json())
    .then(data => oneProduct(data)) //fonction pour la page produit
    .catch(error => alert("L'appel au serveur ne fonctionne pas : " + error));
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

//-----------------Fonction pour envoyer les données récoltées à l'API----------------------

function validOrder() {

  let button = document.querySelector(".submit");
  button.addEventListener("click", () => {
   
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;
    let couriel = document.getElementById("email").value;
    let products = totalBasket.map((totalBasket) => totalBasket.id);
  
    let order = {
      contact: {
        firstName: prenom,
        lastName: nom,
        address: adresse,
        city: ville,
        email: couriel,  
      },
      products: products,
    };
     fetch("http://localhost:3000/api/teddies/order",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(response => {
          localStorage.setItem('order', JSON.stringify(order));
          localStorage.setItem('firstName', JSON.stringify(response.contact.firstName));
          localStorage.setItem('orderId', JSON.stringify(response.orderId));
          window.location.href = "/front/confirmation.html";
        })
    });
  }