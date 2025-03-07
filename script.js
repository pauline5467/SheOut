document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector('.product-list');
    const favoritesCountEl = document.getElementById('favorites-count');
    const cartCountEl = document.getElementById('cart-count');

    // Charger les produits depuis la base de données via PHP
    fetch('get_products.php')
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = '';

            if (products.length === 0) {
                productList.innerHTML = '<p>Aucun produit disponible.</p>';
                return;
            }

            products.forEach(product => {
                product.price = parseFloat(product.price); // Convertir en nombre pour éviter l'erreur

                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                // Créer le sélecteur de tailles
                let sizeOptions = product.sizes.split(',').map(size => `<option value="${size}">${size}</option>`).join('');

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Prix: ${product.price.toFixed(2)} €</p>
                    <select class="size-select">
                        <option value="" disabled selected>Choisir une taille</option>
                        ${sizeOptions}
                    </select>
                    <input class="quantity-input" type="number" min="1" value="1">
                    <button class="favorite-btn">Ajouter aux favoris</button>
                    <button class="cart-btn">Ajouter au panier</button>
                `;

                // Ajouter aux favoris
                const favoriteBtn = productCard.querySelector('.favorite-btn');
                favoriteBtn.addEventListener('click', () => addToFavorites(product));

                // Ajouter au panier
                const cartBtn = productCard.querySelector('.cart-btn');
                cartBtn.addEventListener('click', () => addToCart(product, productCard));

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Erreur lors du chargement des produits :", error));

    // Fonction pour ajouter aux favoris
    function addToFavorites(product) {
        fetch('add_favorite.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: product.id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                favoritesCountEl.textContent = data.favoriteCount;
                alert("Produit ajouté aux favoris !");
            } else {
                alert("Erreur lors de l'ajout aux favoris.");
            }
        })
        .catch(error => console.error("Erreur ajout favoris :", error));
    }

    // Fonction pour ajouter au panier
    function addToCart(product, productCard) {
        const selectedSize = productCard.querySelector('.size-select').value;
        const selectedQuantity = parseInt(productCard.querySelector('.quantity-input').value, 10);

        if (!selectedSize) {
            alert("Veuillez sélectionner une taille !");
            return;
        }
        if (selectedQuantity < 1) {
            alert("Veuillez entrer une quantité valide !");
            return;
        }

        fetch('add_to_cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: product.id, size: selectedSize, quantity: selectedQuantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                cartCountEl.textContent = data.cartCount;
                alert("Produit ajouté au panier !");
            } else {
                alert("Erreur lors de l'ajout au panier.");
            }
        })
        .catch(error => console.error("Erreur ajout panier :", error));
    }

    // Charger le compteur de panier et de favoris
    function updateCounters() {
        fetch('get_counters.php')
            .then(response => response.json())
            .then(data => {
                favoritesCountEl.textContent = data.favorites;
                cartCountEl.textContent = data.cart;
            })
            .catch(error => console.error("Erreur chargement compteurs :", error));
    }

    updateCounters();
});
