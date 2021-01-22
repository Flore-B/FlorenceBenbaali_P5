//------------Récupérer l'id dans l'URL---------------------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id');


function oneProduct(data) {
 
  //Création balises 
      const content = document.getElementById('product');
      
      
      const produit = document.createElement ("div");
      const nom = document.createElement("h2");
      const img = document.createElement("img");
      const description = document.createElement("p");
      const label = document.createElement ('label');
      const select = document.createElement('select');
      const prix = document.createElement("p");
      const btn = document.createElement("button");
      const a = document.createElement("a");
      
      //Création classes
      produit.setAttribute("class", "produit");
      nom.setAttribute("class", "name");
      img.setAttribute('src', data.imageUrl);
      img.setAttribute('alt', 'photo ours en peluche');
      description.setAttribute('class', 'description');
      prix.setAttribute("class", "price");
      btn.setAttribute("class", "button");
      a.setAttribute("href", `index.html/produit.html?id=${data._id}`);
      label.setAttribute('for', 'couleurs');
      label.setAttribute('class', 'choix');
      select.setAttribute('id', 'couleurs')
     

      
      
     
      content.appendChild(produit);
      produit.appendChild(nom);
      produit.appendChild(img);
      produit.appendChild(description);
      produit.appendChild(prix);
      produit.appendChild(label);
      produit.appendChild(select);
      
      a.appendChild(btn);
      produit.appendChild(a);
      
      //Contenu texte
      nom.textContent = data.name;
      prix.textContent = `${data.price / 100},00€`;
      description.textContent = data.description;
      label.textContent = "Sélectionner une couleur :";  
      
      
        for(i=0; i< data.colors.length; i++) {

          const option = document.createElement('option');
          select.appendChild(option);
          option.setAttribute('value', 'data.colors[i]');
          option.innerHTML = `${data.colors[i]}`;
          
        }
        
      
      
      
      img.setAttribute('src', data.imageUrl);
      btn.innerHTML = "Ajouter au panier";
    }

async function descriptiveProduct() {
  await fetch('http://localhost:3000/api/teddies/' + product) // will return info, but in wrong format
    .then((response) => response.json()) // will return info, in json format
    .then((data) => oneProduct(data)) // main code here, using json info
}

descriptiveProduct()
