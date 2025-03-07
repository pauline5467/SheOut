<?php
include 'config.php';
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Vous devez être connecté."]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("SELECT products.id, products.name, products.image, products.price 
                           FROM favorites 
                           JOIN products ON favorites.product_id = products.id 
                           WHERE favorites.Utilisateurs_id = ?");
    $stmt->execute([$user_id]);
    $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "favorites" => $favorites]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Erreur SQL : " . $e->getMessage()]);
}
?>
