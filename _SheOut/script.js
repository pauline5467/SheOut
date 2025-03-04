// Liste de produits à vendre
const products = [
    { id: 1, name: "Produit 1", price: 19.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Produit 2", price: 24.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "L"] },
    { id: 3, name: "Produit 3", price: 15.99, image: "https://via.placeholder.com/200", sizes: ["M", "L"] },
    { id: 4, name: "Produit 4", price: 30.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "XL"] },
    { id: 5, name: "Produit 5", price: 30.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "XL"] },
    { id: 6, name: "Produit 6", price: 30.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "XL"] },
    { id: 7, name: "Produit 7", price: 30.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "XL"] },
    { id: 8, name: "Produit 8", price: 30.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "XL"] },
    { id: 9, name: "Produit 9", price: 30.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "XL"] },
    { id: 10, name: "Produit 10", price: 30.99, image: "https://via.placeholder.com/200", sizes: ["S", "M", "XL"] },
];
// Liste des produits
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Compteurs de favoris et de panier
let favoritesCount = 0;
let cartCount = 0;

// Stockage des favoris
let favoriteProducts = new Set();

// Stockage du panier
let cartProducts = new Set();

// Initialiser les éléments de la page
const productList = document.querySelector('.product-list');
const favoritesCountEl = document.getElementById('favorites-count');
const cartCountEl = document.getElementById('cart-count');

// Générer la liste des produits
products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Créer le sélecteur de tailles
    let sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Prix: ${product.price.toFixed(2)} €</p>
        <select class="size-select">
            <option value="" disabled selected>Choisir une taille</option>
            ${sizeOptions}
        </select>
        <input class="quantity-input" type="number" min="1" value="1" placeholder="Quantité">
        <button class="favorite-btn">Ajouter aux favoris</button>
        <button class="cart-btn">Ajouter au panier</button>
    `;

    // Bouton favoris
    const favoriteBtn = productCard.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => {
        // Si le produit est déjà dans les favoris
        if (favoriteProducts.has(product.id)) {
            favoriteProducts.delete(product.id); // On le retire
            favoriteBtn.classList.remove('favorited');
            favoriteBtn.textContent = "Ajouter aux favoris";
            favoritesCount--;
        } else {
            favoriteProducts.add(product.id); // On l'ajoute
            favoriteBtn.classList.add('favorited');
            favoriteBtn.textContent = "En favoris";
            favoritesCount++;
        }
        // Mise à jour du compteur de favoris
        favoritesCountEl.textContent = favoritesCount;
    });

    // Fonction pour mettre à jour le compteur du panier
    function updateCartCount() {
        const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;

        // Calculer la quantité totale d'articles dans le panier
        cartProducts.forEach(product => {
            totalItems += product.quantity;
        });

        // Mettre à jour l'affichage du compteur du panier
        const cartCountEl = document.getElementById('cart-count');
        cartCountEl.textContent = totalItems;
    }

    // Appeler la fonction pour mettre à jour le compteur dès le chargement de la page
    updateCartCount();

    // Bouton ajouter au panier
    const cartBtn = productCard.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        const selectedSize = productCard.querySelector('.size-select').value;
        const selectedQuantity = parseInt(productCard.querySelector('.quantity-input').value, 10);

        if (selectedSize === "") {
            alert("Veuillez sélectionner une taille avant d'ajouter au panier !");
        } else if (isNaN(selectedQuantity) || selectedQuantity < 1) {
            alert("Veuillez entrer une quantité valide !");
        } else {
            cartBtn.disabled = true;
            cartBtn.textContent = `Dans le panier (${selectedQuantity} x Taille: ${selectedSize})`;

            // Ajouter le produit au panier
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: selectedSize,
                quantity: selectedQuantity
            });

            // Enregistrer dans localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // Mettre à jour le compteur du panier après l'ajout
            updateCartCount();
        }
    });

    productList.appendChild(productCard);
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username === 'admin' && password === 'password123') {
        alert('Connexion réussie !');
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
    }
});
