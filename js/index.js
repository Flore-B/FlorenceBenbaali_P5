//-------------Ajoute les éléments des produits dans le code HTML-------------

function allProducts(data) {
  for (let i = 0; i < data.length; i++) {
    //------------------------Création des balises---------------------------------
    const container = document.getElementById("teddies"); //Création du cadre pour accueillir les produits

    const teddy = document.createElement("div");
    const img = document.createElement("img");
    const prix = document.createElement("p");
    const btn = document.createElement("button");
    const a = document.createElement("a");

    //------------------------Création des classes---------------------------------
    teddy.setAttribute("class", "teddy");
    img.setAttribute("src", data[i].imageUrl);
    img.setAttribute("alt", "photo ours en peluche");
    prix.setAttribute("class", "priceA");
    btn.setAttribute("class", "button");
    a.setAttribute("href", `produit.html?id=${data[i]._id}`);

    //--------Ajoute l'élément HTML enfant à la fin d'un élément parent-------------
    container.appendChild(teddy);
    teddy.appendChild(img);
    teddy.appendChild(prix);
    a.appendChild(btn);
    teddy.appendChild(a);

    //---------------------------Ajout du contenu texte------------------------------
    prix.textContent = (data[i].price / 100).toFixed(2) + " €";
    img.setAttribute("src", data[i].imageUrl);
    btn.innerHTML = `Voir ${data[i].name}`;
    a.href = `produit.html?id=${data[i]._id}`;
  }
}
//---------------------------Appel de l'API------------------------------

fillProducts();
