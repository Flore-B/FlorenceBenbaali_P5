//-------------Ajoute les éléments des produits dans le code HTML-------------

function allProducts(data) {
  for (let i = 0; i < data.length; i++) {
    //------------------------Création des balises---------------------------------
    const container = document.getElementById("teddies"); //Création du cadre pour accueillir les produits

    const bear = document.createElement("div");
    const img = document.createElement("img");
    const prix = document.createElement("p");
    const btn = document.createElement("button");
    const a = document.createElement("a");

    //------------------------Création des classes---------------------------------
    bear.setAttribute("class", "bear");
    img.setAttribute("src", data[i].imageUrl);
    img.setAttribute("alt", "photo ours en peluche");
    prix.setAttribute("class", "priceA");
    btn.setAttribute("class", "click");
    a.setAttribute("href", `produit.html?id=${data[i]._id}`);

    //--------Ajoute l'élément HTML enfant à la fin d'un élément parent-------------
    container.appendChild(bear);
    bear.appendChild(img);
    bear.appendChild(prix);
    a.appendChild(btn);
    bear.appendChild(a);

    //---------------------------Ajout du contenu texte------------------------------
    prix.textContent = `${(data[i].price / 100).toFixed(2)} €`;
    btn.innerHTML = `Voir ${data[i].name}`;
    a.href = `produit.html?id=${data[i]._id}`;
  }
}

//-----------------Fonction pour afficher la quantité du panier dans le header----------------------
function countHeader() {
  let totalBasket = JSON.parse(localStorage.getItem('panier'));
console.log(totalBasket)
  count = document.querySelector('span');
  result = 0;
if(totalBasket) {
  for(let elem of totalBasket) {
    result += elem.quantity;
  }
  count.innerHTML = result;
  console.log(totalBasket)
} else {
  count.innerHTML = result;
}
}
countHeader()

//---------------------------Appel de l'API------------------------------

fillProducts();