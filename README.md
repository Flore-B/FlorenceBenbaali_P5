# FlorenceBenbaali_P5
<h1 >Contexte</h1>
<p>Projet n°5 du parcours "Développeur web" dispensé par OpenClassRooms, concernant la réalisation d'un MVP pour le site de e-commerce Orinoco.</p>
<h1>Cahier des  charges</h1>
<h2>Architecture générale</h2>
<p>L’application web sera composée de 4 pages :</p>
<ul>
<li>une page de vue sous forme de liste, montrant tous les articles disponibles à la vente ;</li>
<li>une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier ;</li>
<li>une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end ;</li>
<li>une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.</li>
</ul>
<h2>Planification de tests unitaires</h2>
<p>Elaboration d'un plan pour couvrir au minimum 80 % de la base de code pour le front-end.</p>
<h2>Informations complémentaires</h2>
<ul>
<li>Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page contenant un seul article aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur.</li>
<li>Le code source devra être indenté et utiliser des commentaires. Il devra également utiliser des fonctions globales.</li>
<li>Concernant l’API, des promesses devront être utilisées pour éviter les rappels.</li>
<li>Les inputs des utilisateurs doivent être validés avant l’envoi à l’API.</li>
</ul>
<h2>Technologies utilisées</h2>
<p>HTML, CSS, JavaScript.</p>
<h2>URL de l'API</h2>
<ul>
<li>Ours en peluche faits à la main : http://localhost:3000/api/teddies</li>
</ul>
<h2>Validation des données</h2>
<p>Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName, lastName, address, city et email. Le tableau des produits envoyé au backend doit être un array de strings product_id. Les types de ces champs et leur présence doivent être validés avant l’envoi des données au serveur.</p>
<h2>Livrables</h2>
<ul>
<li>Le lien vers un dépôt Git public contenant le code de l'application web ;</li>
<li>Un plan de tests.</li>
</ul>
<h1>Démarrage de l'application</h1>
<p>Cloner le repository suivant :</p>
<p>https://github.com/OpenClassrooms-Student-Center/JWDP5.git</p>
<p>Il s'agit du back-end de ce projet. Une fois cloné, suivre les instructions du README présent dans le repository afin de lancer le serveur, il s'agira ensuite de cloner mon repository puis d'ouvrir la page index.html pour lancer l'application.</p> 
