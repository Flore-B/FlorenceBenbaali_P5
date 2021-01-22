async function fillProducts() {
    await fetch('http://localhost:3000/api/teddies') 
      .then((response) => response.json())
      .then((data) => allProducts(data)) 
  }




async function descriptiveProduct() {
    await fetch('http://localhost:3000/api/teddies/' + product) // will return info, but in wrong format
      .then((response) => response.json()) // will return info, in json format
      .then((data) => oneProduct(data)) // main code here, using json info
  }











/*let request = new XMLHttpRequest();

request.open("GET", "http://localhost:3000/api/teddies");
request.responseType = 'json';
request.onload = function() {
    //console.log(JSON.parse(request.response));*/
/*request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.response);
        console.log(this.response);
        console.log(this.response.length);
    }*/
    /*for (let i = 0; i < request.response.length; i++) {

        const container = document.getElementById('teddies');
        
        
        //Création balises 
        const teddy = document.createElement ("div");
        const nom = document.createElement("h2");
        const img = document.createElement("img");
        let prix = document.createElement("p");
        const btn = document.createElement("button");
        const a = document.createElement("a");
        
        //Création classes
        teddy.setAttribute("class", "teddy");
        nom.setAttribute("class", "name");
        img.setAttribute('src', request.response[i].imageUrl);
        img.setAttribute('alt', 'photo ours en peluche');
        prix.setAttribute("class", "price");
        btn.setAttribute("class", "button");
        a.setAttribute("href", "index.html/produit.html?id=" + request.response[i]._id);
        
        container.appendChild(teddy);
        teddy.appendChild(nom);
        teddy.appendChild(img);
        teddy.appendChild(prix);
        a.appendChild(btn);
        teddy.appendChild(a);
        
        //Contenu texte
        nom.textContent = request.response[i].name;
        prix.textContent = request.response[i].price / 100 + " €";
        img.setAttribute('src', request.response[i].imageUrl);
        btn.innerHTML = "Voir" + ' ' + request.response[i].name;
        a.href = "produit.html?id=" + request.response[i]._id;
    }
};
request.send();*/