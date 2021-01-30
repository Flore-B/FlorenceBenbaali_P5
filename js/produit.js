//-------------------Fonction qui appelle la requête fetch----------------------------
descriptiveProduct()

//-------------------Fonction pour créer la carte du produit en HTML------------------
function oneProduct(data) {

    let content = document.getElementById('product');//conteneur de la carte du nounours

//-------------------Création de la div pour le nom-----------------------------------
    let nameTeddy = document.createElement('div');
    nameTeddy.setAttribute('class', 'name');
    nameTeddy.textContent = data.name;
    content.appendChild(nameTeddy);

//-------------------Création de la balise img pour la photo--------------------------
let imgTeddy = document.createElement('img');
imgTeddy.setAttribute('src', data.imageUrl);
imgTeddy.setAttribute('alt', 'Photo d\'un ours en peluche');
content.appendChild(imgTeddy);

//-------------------Création de la balise p pour le prix----------------------------
let priceTeddy = document.createElement('p');
priceTeddy.setAttribute('class', 'prix');
priceTeddy.innerHTML = `${(data.price / 100).toFixed(2)} €`;
content.appendChild(priceTeddy);

//-------------------Création de la balise p pour la description--------------------
let descriptionTeddy = document.createElement('p');
descriptionTeddy.setAttribute('class', 'description');
descriptionTeddy.textContent = data.description;
content.appendChild(descriptionTeddy);

//-------------- Création du formulaire pour le choix de la couleur------------------
let labelColorTeddy = document.createElement('label');
labelColorTeddy.setAttribute('for', 'couleurs');
labelColorTeddy.setAttribute('class', 'choix');
labelColorTeddy.textContent = "Sélectionner une couleur :";
content.appendChild(labelColorTeddy);

let selectColorTeddy = document.createElement('select');
selectColorTeddy.setAttribute('name', 'couleurs');
selectColorTeddy.setAttribute('id', 'couleurs');
content.appendChild(selectColorTeddy);

//------------Boucle for pour le menu déroulant-------------------------------------
for(i = 0; i < data.colors.length; i++) {
    let optionColorTeddy = document.createElement('option');
    optionColorTeddy.setAttribute('value', data.colors[i]);
    selectColorTeddy.appendChild(optionColorTeddy);
    optionColorTeddy.innerHTML = data.colors[i];
}

//--------------Récupération de la couleur sélectionnée-----------------------------
optionColorTeddy = document.getElementById('couleurs').value;
    console.log(optionColorTeddy)
}


