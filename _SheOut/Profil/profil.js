document.addEventListener('DOMContentLoaded', () => {
    const profileInfo = document.getElementById('profile-info');
    const editForm = document.getElementById('edit-form');
    const editBtn = document.getElementById('edit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const updateForm = document.getElementById('update-profile-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Fonction pour charger les informations du profil
    function loadProfile() {
        fetch('get_profile.php')
            .then(response => response.json())
            .then(user => {
                if (user.error) {
                    window.location.href = 'login.html'; // Redirige si non connecté
                    return;
                }

                document.getElementById('user-name').textContent = user.name;
                document.getElementById('user-email').textContent = user.email;
            })
            .catch(error => console.error("Erreur chargement profil :", error));
    }

    // Afficher le formulaire d'édition
    editBtn.addEventListener('click', () => {
        editForm.style.display = 'block';
        profileInfo.style.display = 'none';

        document.getElementById('edit-name').value = document.getElementById('user-name').textContent;
        document.getElementById('edit-email').value = document.getElementById('user-email').textContent;
    });

    // Annuler la modification
    cancelBtn.addEventListener('click', () => {
        editForm.style.display = 'none';
        profileInfo.style.display = 'block';
    });

    // Soumettre le formulaire de mise à jour
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedName = document.getElementById('edit-name').value;
        const updatedEmail = document.getElementById('edit-email').value;

        fetch('update_profile.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: updatedName, email: updatedEmail })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Profil mis à jour !");
                loadProfile(); // Recharge les infos
                editForm.style.display = 'none';
                profileInfo.style.display = 'block';
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error("Erreur mise à jour profil :", error));
    });

    // Action sur le bouton "Déconnexion"
    logoutBtn.addEventListener('click', () => {
        window.location.href = '../Connexion/logout.php'; // Redirige vers logout.php
    });

    loadProfile(); // Charger les infos dès l'affichage
});
