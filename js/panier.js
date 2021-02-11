//------------------Récupération des données du local storage--------------------
function recupBasket() {
  let totalBasket = localStorage.getItem("panier");
  const fillBasket = document.getElementById("basket-container");
  let displayForm = document.getElementById("form");

  if (totalBasket) {//Si le panier existe
    return JSON.parse(totalBasket); //Renvoie le panier en objet javaScript
  } else {
    const emptyBasket = document.createElement("p"); //Pour afficher que le panier est vide
    fillBasket.appendChild(emptyBasket);
    fillBasket.textContent = "Votre panier ne contient pas d'article !";
    displayForm.style.display = "none";
  }
}
//--------------------Affichage des informations du panier-----------------------
function displayBasket() {
  totalBasket = recupBasket();

  //--------------------------Création des éléments du DOM--------------------------
  for (let i = 0; i < totalBasket.length; i++) {
    const produit = document.getElementById("produit");
    const imageProduct = document.createElement("img");
    imageProduct.setAttribute("src", totalBasket[i].image);

    produit.appendChild(imageProduct);
    const nameProduct = document.createElement("li");
    produit.appendChild(nameProduct);
    nameProduct.textContent = totalBasket[i].name;

    const couleur = document.getElementById("couleur");
    const colorProduct = document.createElement("li");
    couleur.appendChild(colorProduct);
    colorProduct.textContent = totalBasket[i].color;

    const quantite = document.getElementById("quantite");
    const numberProduct = document.createElement("li");
    quantite.appendChild(numberProduct);
    numberProduct.textContent = totalBasket[i].quantity;

    const supprimer = document.getElementById("supprimer");
    const deleteProduct = document.createElement("li");
    deleteProduct.setAttribute("class", "far fa-trash-alt");
    supprimer.appendChild(deleteProduct);
    
    let sup = document.getElementsByClassName("far fa-trash-alt");
    for (let elem of sup) {
      elem.addEventListener("click", function () {
        deletePrice(i);
      });
    }
    const prix = document.getElementById("prix");
    const prixProduct = document.createElement("li");
    prix.appendChild(prixProduct);
    prixProduct.textContent = (totalBasket[i].price / 100).toFixed(2) + " €";

    const total = document.getElementById("total");
    const totalProduct = document.createElement("li");
    total.appendChild(totalProduct);
    totalProduct.textContent = (totalBasket[i].total / 100).toFixed(2) + " €";
  }
}
//-----------------------Calcul et affichage du montant total du panier-----------------------------------
function totalPrice() {
  totalBasket = recupBasket();
  let totalPrice = 0;

  for (let elem of totalBasket) {
    totalPrice += elem.total;
  }
  document.querySelector(".prix_total").textContent = `Le montant de votre panier est de ${(totalPrice / 100).toFixed(2)} € `;
console.log(totalPrice)
}
//-----------------------Fonction pour supprimer un article du panier--------------------------------
function deletePrice(i) {
  if (totalBasket) {
    totalBasket.splice(i, 1); //Supprime du tableau l'élément sélectionné
    localStorage.setItem("panier", JSON.stringify(totalBasket)); //Retourne le tableau mis à jour
    document.location.reload(); // Actualise la page avec les modifs
  }
  if (totalBasket.length == 0) {
    localStorage.clear();
  }
}

countHeader();
totalPrice();
displayBasket();

//----------------------Formulaire-----------------------------------------------------------------------
let form = document.getElementById("formulaire");

//---------------------------Regex-----------------------------------------------------------------------
let rEText = new RegExp(/^[A-ZÀ-Ü][a-zà-ÿ]+(-[A-ZÀ-Ü][a-zà-ÿ]+[!0-9])?$/);
let rEAddress = new RegExp(/[0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s,-]{1,50}$/);
let rEEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9-.]{2,4}$/);

//---------------------------Regex-----------------------------------------------------------------------

let prenom = document.getElementById("prenom");
let nom = document.getElementById("nom");
let adresse = document.getElementById("adresse");
let ville = document.getElementById("ville");
let couriel = document.getElementById("email");

//----------------Variables pour tester la concordance de l'input----------------------------------------
let testPrenom = rEText.test(prenom.value);
let testNom = rEText.test(nom.value);
let testAdresse = rEAddress.test(adresse.value);
let testVille = rEText.test(ville.value);
let testEmail = rEEmail.test(couriel.value);

//----------------Variables pour commenter en cas d'erreur----------------------------------------------
let prenomError = document.getElementById("first_name_error");
let nomError = document.getElementById("last_name_error");
let adresseError = document.getElementById("address_error");
let villeError = document.getElementById("town_error");
let courielError = document.getElementById("email_error");

//----------------Vérification de la saisie pour tous les champs du formulaire---------------------------
form.addEventListener("input", () => {
  if (testPrenom == false && prenom.value > 0) {
    prenomError.textContent = "Saisie incorrecte";
    prenomError.style.color = "red";
  } else {
    prenomError.textContent = "";
    console.log(prenom.value)
  }
  if (testNom == false && nom.value > 0) {
    nomError.innerHTML = "Saisie incorrecte";
    nomError.style.color = "red";
  } else {
    nomError.textContent = "";
    console.log(nom.value)
  }
  if (testAdresse == false && adresse.value > 0) {
    adresseError.innerHTML = "Saisie incorrecte";
    adresseError.style.color = "red";
  } else {
    adresseError.textContent = "";
    console.log(adresse.value)
  }
  if (testVille == false && ville.value > 0) {
    villeError.innerHTML = "Saisie incorrecte";
    villeError.style.color = "red";
  } else {
    villeError.textContent = "";
  }
  if (testEmail == false && couriel.value > 0) {
    courielError.innerHTML = "Veuillez saisir une adresse email valide";
    courielError.style.color = "red";
  } else {
    courielError.textContent = "";
  }
});

let button = document.querySelector(".submit");
button.addEventListener("click", (validOrder));


async function validOrder() {
  let products = totalBasket.map((totalBasket) => totalBasket.id);
  console.log(products);

  let order = {
    contact: {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: couriel.value,  
    },
    products: products,
  };
console.log(order)
 await fetch("http://localhost:3000/api/teddies/order",
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
    }
