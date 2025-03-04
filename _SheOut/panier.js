// Récupérer les produits du panier stockés dans le localStorage
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

// Sélectionner les éléments de la page
const cartList = document.querySelector('.cart-list');
const cartTotal = document.getElementById('cart-total');

// Fonction pour afficher les produits dans le panier
function displayCartProducts() {
    cartList.innerHTML = '';  // Réinitialiser le contenu

    let total = 0;

    // Si le panier est vide
    if (cartProducts.length === 0) {
        cartList.innerHTML = '<p>Votre panier est vide.</p>';
        cartTotal.textContent = '0.00 €';
        return;
    }

    // Parcourir les produits du panier
    cartProducts.forEach((product, index) => {
        const item = document.createElement('div');
        item.classList.add('cart-item');

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <h4>${product.name}</h4>
                <p>Taille : ${product.size} | Quantité : ${product.quantity}</p>
                <p>Prix unitaire : ${product.price.toFixed(2)} €</p>
            </div>
            <p><strong>${(product.price * product.quantity).toFixed(2)} €</strong></p>
            <button class="remove-btn" data-index="${index}">Supprimer</button>
        `;

        // Ajouter l'article à la liste
        cartList.appendChild(item);

        // Calculer le total
        total += product.price * product.quantity;
    });

    // Mettre à jour le total
    cartTotal.textContent = `${total.toFixed(2)} €`;

    // Ajouter les écouteurs d'événements pour les boutons de suppression
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeProduct);
    });
}

// Fonction pour supprimer un produit du panier
function removeProduct(event) {
    const productIndex = event.target.getAttribute('data-index');
    cartProducts.splice(productIndex, 1); // Retirer le produit du tableau
    localStorage.setItem('cart', JSON.stringify(cartProducts)); // Mettre à jour localStorage
    displayCartProducts(); // Réafficher les produits après suppression
}

// Appeler la fonction pour afficher les produits dans le panier
displayCartProducts();

