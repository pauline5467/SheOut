<?php
include 'config.php';
header('Content-Type: application/json');

session_start();
$user_id = $_SESSION['Utilisateurs_id'] ?? null;

if (!$user_id) {
    echo json_encode(["cart" => 0, "favorites" => 0]);
    exit;
}

try {
    $favStmt = $pdo->prepare("SELECT COUNT(*) FROM favorites WHERE user_id = ?");
    $favStmt->execute([$user_id]);
    $favorites = $favStmt->fetchColumn();

    $cartStmt = $pdo->prepare("SELECT SUM(quantity) FROM cart WHERE user_id = ?");
    $cartStmt->execute([$user_id]);
    $cart = $cartStmt->fetchColumn();

    echo json_encode(["cart" => $cart ?: 0, "favorites" => $favorites]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
