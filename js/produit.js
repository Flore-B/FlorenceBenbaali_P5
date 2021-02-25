//------Appel de la fonction qui affiche la quantité du panier dans le header-----
countHeader()

//--------------------------------Appel de l'API-----------------------------------
descriptiveProduct();

//----------------------Initialisation du panier pour les objets-------------------
function initBasket() {
  let basket = localStorage.getItem("panier"); // Récupération de l'élement de stockage
    
  if (basket) { //Si le panier existe
    return JSON.parse(basket); //renvoie le panier en objet javaScript
  } else {
    return []; //Sinon, envoie un tableau vide dans lequel on pourra stocker nos produits
  }
}

//-----------------Enregistre le panier dans le localstorage--------------------------
function saveBasket(basket) {
  localStorage.setItem("panier", JSON.stringify(basket));
}

//-------------------Fonction pour créer la carte du produit en HTML------------------
 function oneProduct(data) {
  const content = document.getElementById("product"); //conteneur de la carte du nounours

  //-------------------Création de la div pour le nom-----------------------------------
  const nameTeddy = document.createElement("div");
  nameTeddy.setAttribute("class", "name");
  nameTeddy.textContent = data.name;
  content.appendChild(nameTeddy);

  //-------------------Création de la balise img pour la photo--------------------------
  const imgTeddy = document.createElement("img");
  imgTeddy.setAttribute("src", data.imageUrl);
  imgTeddy.setAttribute("alt", "Photo d'un ours en peluche");
  imgTeddy.setAttribute("width", "450px");
  imgTeddy.setAttribute("height", "350px");
  content.appendChild(imgTeddy);

  //-------------------Création de la balise p pour le prix----------------------------
  const priceTeddy = document.createElement("p");
  priceTeddy.setAttribute("class", "prix");
  priceTeddy.textContent = `${(data.price / 100).toFixed(2)} €`;
  content.appendChild(priceTeddy);

  //-------------------Création de la balise p pour la description--------------------
  const descriptionTeddy = document.createElement("p");
  descriptionTeddy.setAttribute("class", "description");
  descriptionTeddy.textContent = data.description;
  content.appendChild(descriptionTeddy);

  //-------------- Création du formulaire pour le choix de la couleur------------------
  const labelColorTeddy = document.createElement("label");
  labelColorTeddy.setAttribute("for", "couleurs");
  labelColorTeddy.setAttribute("class", "choix");
  labelColorTeddy.textContent = "Sélectionner une couleur :";
  content.appendChild(labelColorTeddy);

  const selectColorTeddy = document.createElement("select");
  selectColorTeddy.setAttribute("name", "couleurs");
  selectColorTeddy.setAttribute("id", "couleurs");
  content.appendChild(selectColorTeddy);

  //------------Boucle for pour le menu déroulant du choix des couleurs-------------------
   for (i = 0; i < data.colors.length; i++) {
    const optionColorTeddy = document.createElement("option");
    optionColorTeddy.setAttribute("value", data.colors[i]);
    selectColorTeddy.appendChild(optionColorTeddy);
    optionColorTeddy.textContent = data.colors[i];
   }
  //-------------------Création du bouton pour valider le choix--------------------
  const btnAdd = document.createElement("button");
  btnAdd.setAttribute("class", "btnAdd");
  content.appendChild(btnAdd);
  btnAdd.textContent = "Ajouter au panier";

  //------------Choix de la couleur et ajout au panier--------------------------------
  btnAdd.addEventListener("click", () => {
    addToBasket();
    countHeader();
  });

//----------------------Fonction pour l'ajout au panier--------------------------------
function addToBasket() {
  basket = initBasket(); // Récupération du panier
  const colorChoice = document.getElementById("couleurs").value; // Récupération de la couleur
  
  const quantity = 1;
  const total = 0;
  const productSelected = {
    id: data._id,
    image: data.imageUrl,
    name: data.name,
    color: colorChoice,
    price: data.price,
    quantity: quantity,
    total: total
 };
  // On regarde si le produit + couleur existe dans le panier
  const found = basket.find(
    productSelected =>
    productSelected.id == data._id && productSelected.color == colorChoice
  );
  if (found) {
    found.quantity++; // Si oui, on icrémente la quantité
    found.total = productSelected.price * found.quantity; // Si oui, on ajuste le prix en fonction

  } else {
    basket.push(productSelected); // Si non, on ajoute le produit au panier
    productSelected.total = productSelected.price * productSelected.quantity;
  }
  
  //------ Message d'alerte pour prévenir de l'ajout du produit dans le panier-----------
  window.alert(
    `${productSelected.name} avec sa couleur ${productSelected.color} est dans votre panier`
  );
 saveBasket(basket);
 }
}