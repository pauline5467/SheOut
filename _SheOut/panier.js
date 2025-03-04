// R�cup�rer les produits du panier stock�s dans le localStorage
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

// S�lectionner les �l�ments de la page
const cartList = document.querySelector('.cart-list');
const cartTotal = document.getElementById('cart-total');

// Fonction pour afficher les produits dans le panier
function displayCartProducts() {
    cartList.innerHTML = '';  // R�initialiser le contenu

    let total = 0;

    // Si le panier est vide
    if (cartProducts.length === 0) {
        cartList.innerHTML = '<p>Votre panier est vide.</p>';
        cartTotal.textContent = '0.00 �';
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
                <p>Taille : ${product.size} | Quantit� : ${product.quantity}</p>
                <p>Prix unitaire : ${product.price.toFixed(2)} �</p>
            </div>
            <p><strong>${(product.price * product.quantity).toFixed(2)} �</strong></p>
            <button class="remove-btn" data-index="${index}">Supprimer</button>
        `;

        // Ajouter l'article � la liste
        cartList.appendChild(item);

        // Calculer le total
        total += product.price * product.quantity;
    });

    // Mettre � jour le total
    cartTotal.textContent = `${total.toFixed(2)} �`;

    // Ajouter les �couteurs d'�v�nements pour les boutons de suppression
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeProduct);
    });
}

// Fonction pour supprimer un produit du panier
function removeProduct(event) {
    const productIndex = event.target.getAttribute('data-index');
    cartProducts.splice(productIndex, 1); // Retirer le produit du tableau
    localStorage.setItem('cart', JSON.stringify(cartProducts)); // Mettre � jour localStorage
    displayCartProducts(); // R�afficher les produits apr�s suppression
}

// Appeler la fonction pour afficher les produits dans le panier
displayCartProducts();

