async function fillProducts() {
    
    await fetch('http://localhost:3000/api/teddies/') 
      .then(response => response.json())
      .then(data => allProducts(data)) 
      
  }

//------------Récupérer l'id du produit dans l'URL---------------------------
    const urlParams = new URLSearchParams(window.location.search);//Pour accéder à la chaîne des paramètres de l'url
    const card = urlParams.get('id');


//---------Fonction avec méthode fetch-----------------------------------------
async function descriptiveProduct() {
    await fetch('http://localhost:3000/api/teddies/' + card) 
      .then(response => response.json()) //retourne au format Json
      .then(data => oneProduct(data)) //fonction pour la page produit
    
      console.log(card)
  }


