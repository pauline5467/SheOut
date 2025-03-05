document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();

    document.querySelectorAll('.remove-favorite-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeFavorite(productId, button);
        });
    });
});

function removeFavorite(productId, button) {
    fetch('remove_favorite.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            button.closest('.favorite-item').remove(); // Supprime l'élément de la page
            loadFavorites(); // Recharge la liste des favoris
        } else {
            alert(data.error);
        }
    });
}

function loadFavorites() {
    fetch('get_favorites.php')
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert(data.error);
                return;
            }

            const favoritesContainer = document.getElementById('favorites-list');
            favoritesContainer.innerHTML = ""; // Vide le conteneur avant de recharger

            if (data.favorites.length === 0) {
                favoritesContainer.innerHTML = "<p>Aucun produit dans vos favoris.</p>";
                return;
            }

            data.favorites.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('favorite-item');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name} - ${product.price}€</p>
                    <button class="remove-favorite-btn" data-product-id="${product.id}">Retirer</button>
                `;

                // Ajoute l'événement "click" pour supprimer un favori
                productElement.querySelector('.remove-favorite-btn').addEventListener('click', () => {
                    removeFavorite(product.id, productElement.querySelector('.remove-favorite-btn'));
                });

                favoritesContainer.appendChild(productElement);
            });
        });
}
