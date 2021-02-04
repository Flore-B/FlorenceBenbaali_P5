//------------------Récupération des données du local storage--------------------
function recupBasket() {
  let totalBasket = localStorage.getItem("panier");
  const fillBasket = document.getElementById("basket-container");

  if (totalBasket) {  //Si le panier existe
    return JSON.parse(totalBasket); //Renvoie le panier en objet javaScript

  } else {
    const emptyBasket = document.createElement("p"); //Pour afficher que le panier est vide
    fillBasket.appendChild(emptyBasket);
    fillBasket.textContent = "Votre panier ne contient pas d'article !";
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
      elem.addEventListener('click', function () {
          // e.preventDefault();
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
  totalBasket = recupBasket();

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
// function countHeader() {
//   totalBasket = recupBasket();

//   const count = document.getElementById('basket-count');
//   const result = totalBasket.length;
//   count.textContent = result;
// console.log(result)
// }
// countHeader()
totalPrice();
displayBasket();
