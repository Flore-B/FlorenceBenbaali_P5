//---------------------------Appel de l'API------------------------------

fillProducts();

//-------------Ajoute les éléments des produits dans le code HTML-------------

function allProducts(data) {
  for (let i = 0; i < data.length; i++) {

//------------------------Création des balises---------------------------------
    const container = document.getElementById('teddies'); //Création du cadre pour accueillir les produits

    const cardBear = document.createElement('div');
    const imgBear = document.createElement('img');
    const priceBear = document.createElement('p');
    const btnViewBear = document.createElement('button');
    const linkBear = document.createElement('a');

//------------------------Création des classes---------------------------------
    cardBear.setAttribute('class', 'bear');
    imgBear.setAttribute('src', data[i].imageUrl);
    imgBear.setAttribute('alt', 'photo ours en peluche');
    imgBear.setAttribute("width", "400px");
    imgBear.setAttribute("height", "300px");
    priceBear.setAttribute('class', 'priceA');
    btnViewBear.setAttribute('class', 'click');
    linkBear.setAttribute('href', `produit.html?id=${data[i]._id}`);

//--------Ajoute l'élément HTML enfant à la fin d'un élément parent-------------
    container.appendChild(cardBear);
    cardBear.appendChild(imgBear);
    cardBear.appendChild(priceBear);
    linkBear.appendChild(btnViewBear);
    cardBear.appendChild(linkBear);

//---------------------------Ajout du contenu texte------------------------------
    priceBear.textContent = `${(data[i].price / 100).toFixed(2)} €`;
    btnViewBear.innerHTML = `Voir ${data[i].name}`;
    linkBear.href = `produit.html?id=${data[i]._id}`;
  }
}

//------Appel de la fonction qui affiche la quantité du panier dans le header-----

countHeader()