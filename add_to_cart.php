<?php
include 'config.php';
session_start();

$data = json_decode(file_get_contents("php://input"));
$product_id = $data->product_id;

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Vous devez être connecté."]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // Vérifier si le produit est déjà dans le panier
    $stmt = $pdo->prepare("SELECT quantity FROM cart WHERE Utilisateurs_id = ? AND product_id = ?");
    $stmt->execute([$user_id, $product_id]);
    $existingItem = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingItem) {
        // Si le produit est déjà dans le panier, on met à jour la quantité
        $newQuantity = $existingItem['quantity'] + 1;
        $stmt = $pdo->prepare("UPDATE cart SET quantity = ? WHERE Utilisateurs_id = ? AND product_id = ?");
        $stmt->execute([$newQuantity, $user_id, $product_id]);
    } else {
        // Ajouter le produit au panier
        $stmt = $pdo->prepare("INSERT INTO cart (Utilisateurs_id, product_id, quantity) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $product_id, 1]);
    }

    echo json_encode(["success" => true, "message" => "Produit ajouté au panier."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
