//------Appel de la fonction qui affiche la quantité du panier dans le header-----
countHeader();

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
    fillBasket.textContent = "Votre panier ne contient pas d'article !";
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
  document.querySelector(".prix_total").textContent = `Le montant de votre panier est de ${(totalPrice / 100).toFixed(2)} € `;
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

totalPrice();
displayBasket();


let form = document.getElementById("formulaire");

//----------------Vérification de la saisie pour tous les champs du formulaire---------------------------
form.addEventListener("input", validForm);

function validForm(e) {
//---------------------------Regex-----------------------------------------------------------------------
let regexText = /^[A-ZÀ-Ü]{1}[a-zà-ÿ]+['-]*[A-ZÀ-Üa-zà-ÿ]*$/;
let regexAddress = /[0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s,-]{1,50}$/;
let regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9-.]{2,4}$/;

//---------------------------Récupération des inputs-----------------------------------------------------
let prenom = document.getElementById("prenom").value;
let nom = document.getElementById("nom").value;
let adresse = document.getElementById("adresse").value;
let ville = document.getElementById("ville").value;
let couriel = document.getElementById("email").value;

//----------------Variables pour commenter en cas d'erreur----------------------------------------------
let prenomError = document.getElementById("first_name_error");
let nomError = document.getElementById("last_name_error");
let adresseError = document.getElementById("address_error");
let villeError = document.getElementById("town_error");
let courielError = document.getElementById("email_error");

  if (regexText.test(prenom)) { // Vérifie la correspondance entre la saisie et l'expression régulière
    prenomError.textContent = "";
  } else {
    prenomError.textContent = "Veuillez saisir votre Prénom";
    prenomError.style.color = "red";
    return false;
  }
  if (regexText.test(nom)) {
    nomError.textContent = "";
  } else {
    nomError.textContent = "Veuillez saisir votre Nom";
    nomError.style.color = "red";
    return false;
  }
  if (regexAddress.test(adresse)) {
    adresseError.textContent = "";
  } else {
    adresseError.textContent = "Veuillez saisir votre Adresse";
    adresseError.style.color = "red";
    return false;
  }
  if (regexText.test(ville)) {
    villeError.textContent = "";
  } else {
    villeError.textContent = "Veuillez saisir le Nom de votre ville";
    villeError.style.color = "red";
    return false;
  }
  if (regexEmail.test(couriel)) {
    courielError.textContent = "";
  } else {
    courielError.textContent = "Veuillez saisir une adresse email valide";
    courielError.style.color = "red";
    return false;
  } 
  if(form.checkValidity() != true) { //Vérification du formulaire avant envoi
    e.preventDefault();
  } else {
      validOrder();
  }
};