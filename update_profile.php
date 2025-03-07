<?php
session_start();
include 'config.php';
header('Content-Type: application/json');

$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["success" => false, "error" => "Utilisateur non connecté"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

$new_name = $data->name ?? null;
$new_email = $data->email ?? null;

if (!$new_name || !$new_email) {
    echo json_encode(["success" => false, "error" => "Champs obligatoires manquants"]);
    exit;
}

$stmt = $pdo->prepare("UPDATE Utilisateurs SET username = ?, email = ? WHERE id = ?");
$success = $stmt->execute([$new_name, $new_email, $user_id]);

if ($success) {
    echo json_encode(["success" => true, "message" => "Profil mis à jour"]);
} else {
    echo json_encode(["success" => false, "error" => "Échec de la mise à jour"]);
}
?>
