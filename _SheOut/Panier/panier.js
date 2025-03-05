document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceContainer = document.getElementById('total-price');

    // Fonction pour charger les articles du panier
    function loadCart() {
        fetch('get_cart.php')
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    cartContainer.innerHTML = '<p>' + data.error + '</p>';
                    totalPriceContainer.textContent = 'Total : 0€';
                    return;
                }

                let totalPrice = 0;
                cartContainer.innerHTML = '';  // Réinitialiser le contenu du panier

                data.cartItems.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');

                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>Prix : ${item.price} €</p>
                            <p>Quantité : ${item.quantity}</p>
                            <p>Taille : ${item.size}</p>
                            <button class="remove-item" data-id="${item.id}">Retirer</button>
                        </div>
                    `;
                    cartContainer.appendChild(itemElement);

                    // Calculer le total
                    totalPrice += item.price * item.quantity;
                });

                totalPriceContainer.textContent = `Total : ${totalPrice.toFixed(2)} €`;
            })
            .catch(error => console.error('Erreur lors de la récupération du panier :', error));
    }

    // Fonction pour retirer un produit du panier
    function removeFromCart(productId) {
        fetch('remove_from_cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadCart(); // Recharger le panier après suppression
            } else {
                alert('Erreur lors de la suppression du produit');
            }
        })
        .catch(error => console.error('Erreur lors de la suppression du produit :', error));
    }

    // Ajouter un événement pour chaque bouton de retrait
    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const productId = e.target.getAttribute('data-id');
            removeFromCart(productId);
        }
    });

    // Charger les produits au chargement de la page
    loadCart();
});
