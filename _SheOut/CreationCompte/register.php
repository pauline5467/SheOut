<?php
include '../config.php';  // Inclure la configuration pour se connecter à la base de données

// Récupérer les données JSON envoyées via POST
$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$password = $data->password;
$username = $data->username;

// Vérifier si l'email existe déjà dans la base de données
$stmt = $pdo->prepare("SELECT * FROM Utilisateurs WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(["error" => "Cet email est déjà utilisé."]);
} else {
    // Hacher le mot de passe
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insérer l'utilisateur dans la base de données
    $stmt = $pdo->prepare("INSERT INTO Utilisateurs (email, username, password_hash) VALUES (?, ?, ?)");
    $stmt->execute([$email, $username, $password_hash]);

    echo json_encode(["message" => "Utilisateur créé avec succès !"]);
}
?>
