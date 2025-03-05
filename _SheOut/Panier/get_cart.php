<?php
include '../config.php';
session_start();

// Vérifier que l'utilisateur est connecté
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(["success" => false, "error" => "Utilisateur non connecté"]);
    exit;
}

// Récupérer les articles du panier de l'utilisateur
$stmt = $pdo->prepare("
    SELECT c.id, p.name, p.price, c.quantity, c.size, p.image 
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.Utilisateurs_id = ?
");
$stmt->execute([$user_id]);
$cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Si le panier est vide
if (empty($cartItems)) {
    echo json_encode(["success" => false, "error" => "Le panier est vide"]);
    exit;
}

// Renvoyer les articles du panier
echo json_encode(["success" => true, "cartItems" => $cartItems]);
?>
