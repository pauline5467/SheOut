<?php
include '../config.php';
header('Content-Type: application/json');

// Récupérer les données envoyées via POST
$data = json_decode(file_get_contents("php://input"));
$product_id = $data->product_id;

session_start();
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(["success" => false, "error" => "Non connecté"]);
    exit;
}

try {
    // Supprimer le produit du panier
    $stmt = $pdo->prepare("DELETE FROM cart WHERE Utilisateurs_id = ? AND product_id = ?");
    $success = $stmt->execute([$user_id, $product_id]);

    if ($success) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de la suppression du produit"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>

