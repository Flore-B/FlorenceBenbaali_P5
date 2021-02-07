//------------------Récupération des données du local storage--------------------
function recupBasket() {
  let totalBasket = localStorage.getItem("panier");
  const fillBasket = document.getElementById("basket-container");
  let displayForm = document.getElementById("form")

  if (totalBasket) {  //Si le panier existe
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

    let supprimer = document.getElementById("supprimer");
    const deleteProduct = document.createElement("li");
    deleteProduct.setAttribute("class", "far fa-trash-alt");
    supprimer.appendChild(deleteProduct);
    supprimer = document.getElementsByClassName("far fa-trash-alt");
    for (let elem of supprimer) {
      elem.addEventListener('click', function (e) {
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
recupId()
countHeader()
}
//-----------------------Calcul et affichage du montant total du panier-----------------------------------
function totalPrice() {
  totalBasket = recupBasket();
  let sum = 0;

  for (let elem of totalBasket) {
    sum += elem.total;
  }
  let prixTotal = document.querySelector(".prix_total");
  prixTotal.textContent = `Le montant de votre panier est de ${(
    sum / 100
  ).toFixed(2)} € `;


}
//-----------------------Fonction pour supprimer un article du panier--------------------------------
function deletePrice(i) {
  // totalBasket = recupBasket();
  if (totalBasket) {
    totalBasket.splice(i, 1); //Supprime du tableau l'élément sélectionné
    localStorage.setItem("panier", JSON.stringify(totalBasket)); //Retourne le tableau mis à jour
    document.location.reload(); // Actualise la page avec les modifs
  }
  if (totalBasket.length == 0) {
    localStorage.clear();
  } 
}

//-----------------Fonction pour afficher la quantité du panier dans le header----------------------
function countHeader() {
totalBasket = recupBasket();

  let count = document.getElementById('basket-count');
  let result = 0;

  for(let elem of totalBasket) {
    result += elem.quantity;
  }
  count.innerHTML = result;
}
countHeader()
totalPrice();
displayBasket();

//-----------Récupération des id du panier pour la requête POST---------------------------------------
function recupId() {
  let products = [];
  totalBasket = recupBasket();

  for(let elem of totalBasket) {
    products.push(elem.id);
    // console.log(products)
  }
}
recupId()


//----------------------RegEx-----------------------------------------------------------------------

let form = document.getElementById('formulaire');

let rEText = new RegExp(/^[A-Z][^0-9][a-z ,.'-]+$/);
// (/^[A-Za-z\é\è\ê\ë\ï\à\ö\ô-]+$/);
// /^[A-Z][a-zà-ÿ.-]+([ -][A-Z][a-zà-ÿ.-])*$/;
//^[A-Z][a-zA-ZÀ-ÿ-]+$/);
let rEAddress = new RegExp(/^[\w._ -\s]+,?/);
let rEEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9-.]{2,4}$/);

let prenom = document.getElementById('prenom');
let nom = document.getElementById('nom');
let adresse = document.getElementById('adresse');
let ville = document.getElementById('ville');
let couriel = document.getElementById('email');

let testPrenom = rEText.test(prenom.value);
let testNom = rEText.test(nom.value);
let testAdresse = rEAddress.test(adresse.value);
let testVille = rEText.test(ville.value);
let testEmail = rEEmail.test(couriel.value)

let prenomError = document.getElementById('first_name_error');
let nomError = document.getElementById('last_name_error');
let adresseError = document.getElementById('address_error');
let villeError = document.getElementById('town_error');
let courielError = document.getElementById('email_error');

form.addEventListener('input', (e) => {
  if(testPrenom == false && prenom.value > 2) {
    e.preventDefault;
    prenomError.textContent = "Saisie incorrecte"
    prenomError.style.color = 'red';
   } else {
    prenomError.textContent = ""
   } if(testNom == false && nom.value > 2) {
    e.preventDefault;
    nomError.innerHTML = "Saisie incorrecte"
    nomError.style.color = 'red';
  } else {
    nomError.textContent = ""
  } if(testAdresse == false && adresse.value > 2) {
    e.preventDefault;
    adresseError.innerHTML = "Saisie incorrecte"
    adresseError.style.color = 'red';
  } else {
    adresseError.textContent = ""
  } if(testVille == false && ville.value > 2) {
    e.preventDefault;
    villeError.innerHTML = "Saisie incorrecte"
    villeError.style.color = 'red';
  } else {
    villeError.textContent = ""
  } if(testEmail == false && couriel.value > 2) {
    e.preventDefault;
    courielError.innerHTML = "Veuillez saisir une adresse mail valide"
    courielError.style.color = 'red';
    } else {
      courielError.textContent = "";
  }
});
  let contacts = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value, 
    email: couriel.value
  }
  console.log(contacts)
