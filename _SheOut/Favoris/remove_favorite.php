<?php
include '../config.php';
header('Content-Type: application/json');
session_start();

// Vérifie si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "Vous devez être connecté."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"));
$product_id = $data->product_id ?? null;

if (!$product_id) {
    echo json_encode(["success" => false, "error" => "Produit invalide."]);
    exit;
}

try {
    // Suppression du produit des favoris
    $stmt = $pdo->prepare("DELETE FROM favorites WHERE Utilisateurs_id = ? AND product_id = ?");
    $stmt->execute([$user_id, $product_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "message" => "Produit retiré des favoris."]);
    } else {
        echo json_encode(["success" => false, "error" => "Ce produit n'est pas dans vos favoris."]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Erreur SQL : " . $e->getMessage()]);
}
?>


