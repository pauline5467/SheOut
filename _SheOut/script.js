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
let favoritesCount = 0;
let cartCount = 0;

// Gérer les favoris
let favoriteProducts = JSON.parse(localStorage.getItem("favoris")) || [];

// Gérer les éléments de la page
const productList = document.querySelector('.product-list');
const favoritesCountEl = document.getElementById('favorites-count');
const cartCountEl = document.getElementById('cart-count');

// Afficher les produits de la boutique
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

    // Bouton "Ajouter aux favoris"
    const favoriteBtn = productCard.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => {
        // Ajouter/retirer le produit aux favoris
        const index = favoriteProducts.findIndex(fav => fav.id === product.id);
        if (index === -1) {
            favoriteProducts.push({ id: product.id, name: product.name, image: product.image, price: product.price });
            favoriteBtn.classList.add('favorited');
            favoriteBtn.textContent = "En favoris";
        } else {
            favoriteProducts.splice(index, 1);
            favoriteBtn.classList.remove('favorited');
            favoriteBtn.textContent = "Ajouter aux favoris";
        }

        // Sauvegarder dans localStorage
        localStorage.setItem("favoris", JSON.stringify(favoriteProducts));
        
        // Mettre à jour le compteur de favoris
        favoritesCount = favoriteProducts.length;
        favoritesCountEl.textContent = favoritesCount;
    });

    // Fonction pour mettre à jour le compteur du panier
    function updateCartCount() {
        const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;

        cartProducts.forEach(product => {
            totalItems += product.quantity;
        });

        cartCountEl.textContent = totalItems;
    }

    // Bouton "Ajouter au panier"
    const cartBtn = productCard.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        const selectedSize = productCard.querySelector('.size-select').value;
        const selectedQuantity = parseInt(productCard.querySelector('.quantity-input').value, 10);

        if (selectedSize === "") {
            alert("Veuillez sélectionner une taille avant d'ajouter au panier !");
        } else if (isNaN(selectedQuantity) || selectedQuantity < 1) {
            alert("Veuillez entrer une quantité valide !");
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: selectedSize,
                quantity: selectedQuantity
            });

            // Sauvegarder dans localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Mise à jour du compteur du panier
            updateCartCount();
        }
    });

    productList.appendChild(productCard);
});

// Initialiser le compteur de favoris
favoritesCountEl.textContent = favoritesCount;

