//-------------------Fonction qui appelle la requête fetch----------------------------
descriptiveProduct();

//-------------------Fonction pour créer la carte du produit en HTML------------------
function oneProduct(data) {
  let content = document.getElementById("product"); //conteneur de la carte du nounours

  //-------------------Création de la div pour le nom-----------------------------------
  let nameTeddy = document.createElement("div");
  nameTeddy.setAttribute("class", "name");
  nameTeddy.textContent = data.name;
  content.appendChild(nameTeddy);

  //-------------------Création de la balise img pour la photo--------------------------
  let imgTeddy = document.createElement("img");
  imgTeddy.setAttribute("src", data.imageUrl);
  imgTeddy.setAttribute("alt", "Photo d'un ours en peluche");
  content.appendChild(imgTeddy);

  //-------------------Création de la balise p pour le prix----------------------------
  let priceTeddy = document.createElement("p");
  priceTeddy.setAttribute("class", "prix");
  priceTeddy.innerHTML = `${(data.price / 100).toFixed(2)} €`;
  content.appendChild(priceTeddy);

  //-------------------Création de la balise p pour la description--------------------
  let descriptionTeddy = document.createElement("p");
  descriptionTeddy.setAttribute("class", "description");
  descriptionTeddy.textContent = data.description;
  content.appendChild(descriptionTeddy);

  //-------------- Création du formulaire pour le choix de la couleur------------------
  let labelColorTeddy = document.createElement("label");
  labelColorTeddy.setAttribute("for", "couleurs");
  labelColorTeddy.setAttribute("class", "choix");
  labelColorTeddy.textContent = "Sélectionner une couleur :";
  content.appendChild(labelColorTeddy);

  let selectColorTeddy = document.createElement("select");
  selectColorTeddy.setAttribute("name", "couleurs");
  selectColorTeddy.setAttribute("id", "couleurs");
  content.appendChild(selectColorTeddy);

  //------------Boucle for pour le menu déroulant-------------------------------------
  for (i = 0; i < data.colors.length; i++) {
    let optionColorTeddy = document.createElement("option");
    optionColorTeddy.setAttribute("value", data.colors[i]);
    selectColorTeddy.appendChild(optionColorTeddy);
    optionColorTeddy.innerHTML = data.colors[i];
  }

  //-------------------Création du bouton pour valider le choix--------------------
  let btnAdd = document.createElement("button");
  let link = document.createElement("a");
  btnAdd.setAttribute("class", "btnAdd");
  link.setAttribute("href", "#");
  content.appendChild(link);
  link.appendChild(btnAdd);
  btnAdd.textContent = "Ajouter au panier";

  //------------Choix de la couleur et ajout au panier--------------------------------
  btnAdd = document.querySelector("button");
  btnAdd.addEventListener("click", () => {
    addToBasket();
  });

  //-------------------------Initialisation du panier pour les objets-------------------

 
  function initBasket() {
    let basket = localStorage.getItem("panier");

    if (basket) { //Si le panier existe
      return JSON.parse(basket); //renvoie le panier en objet javaScript
    } else {
      return []; //Sinon, envoie un tableau vide
    }
  }

  //----------------------Fonction pour l'ajout au panier--------------------------------

  function addToBasket() {
    let basket = initBasket(); // Récupération du panier
    let colorChoice = document.getElementById("couleurs").value; //Récupération de la couleur4
 
    let quantity = 1;
    let productSelected = {
      id: data._id,
      color: colorChoice,
      name: data.name,
      price: data.price,
      quantity: quantity,
    };
    // On regarde si le produit + couleur existe dans le panier
    const found = basket.find(
      (productSelected) =>
        productSelected.id == data._id && productSelected.color == colorChoice
    );
    if (found) {
      found.quantity++; // Si oui, on icrémente la quantité
      found.price = productSelected.price * found.quantity; // Si oui, on ajuste le prix en fonction

    } else {
      basket.push(productSelected); // Si non, on ajoute le produit au panier

    }

    //------ Message d'alerte pour prévenir de l'ajout du produit dans le panier-----------
    window.alert(
      `${productSelected.name} avec sa couleur ${productSelected.color} est dans votre panier`
    );
    
    saveBasket(basket);
  }
}
//-----------------Enregistre le panier dans le localstorage-------------------------------

function saveBasket(basket) {
    localStorage.setItem("panier", JSON.stringify(basket));

}
 

