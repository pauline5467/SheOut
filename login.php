<?php
include 'config.php';  // Inclure la configuration pour se connecter à la base de données

// Récupérer les données JSON envoyées via POST
$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$password = $data->password;

// Rechercher l'utilisateur par email
$stmt = $pdo->prepare("SELECT * FROM Utilisateurs WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Vérifier si l'utilisateur existe et si le mot de passe est correct
if ($user && password_verify($password, $user['password_hash'])) {
    // Démarrer la session
    session_start();
    $_SESSION['user_id'] = $user['id'];  // Stocker l'ID de l'utilisateur dans la session
    echo json_encode(["message" => "Connexion réussie !", "username" => $user['username']]);
} else {
    // Si les identifiants sont incorrects
    echo json_encode(["error" => "Identifiants incorrects."]);
}
?>
