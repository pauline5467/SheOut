<?php
session_start();
include '../config.php';
header('Content-Type: application/json');

$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["error" => "Utilisateur non connecté"]);
    exit;
}

$stmt = $pdo->prepare("SELECT username, email FROM Utilisateurs WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(["name" => $user['username'], "email" => $user['email']]);
} else {
    echo json_encode(["error" => "Utilisateur introuvable"]);
}
?>
