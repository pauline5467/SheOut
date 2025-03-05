<?php
include '../config.php';  // Inclure la configuration pour se connecter à la base de données

// Sélectionner tous les utilisateurs sans mot de passe haché
$stmt = $pdo->query("SELECT id, password FROM Utilisateurs");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($users as $user) {
    // Hashage du mot de passe avec bcrypt
    $hashedPassword = password_hash($user['password'], PASSWORD_DEFAULT);

    // Mettre à jour le mot de passe dans la base de données
    $updateStmt = $pdo->prepare("UPDATE Utilisateurs SET password_hash = ? WHERE id = ?");
    $updateStmt->execute([$hashedPassword, $user['id']]);
}

echo "Tous les mots de passe ont été hachés et mis à jour !";
?>
