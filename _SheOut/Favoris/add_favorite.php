<?php
include '../config.php';
header('Content-Type: application/json');
session_start();

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
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si l'article est déjà en favoris
    $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM favorites WHERE Utilisateurs_id = ? AND product_id = ?");
    $checkStmt->execute([$user_id, $product_id]);

    if ($checkStmt->fetchColumn() > 0) {
        echo json_encode(["success" => false, "error" => "Ce produit est déjà dans vos favoris."]);
        exit;
    }

    // Ajouter l'article en favoris
    $stmt = $pdo->prepare("INSERT INTO favorites (Utilisateurs_id, product_id) VALUES (?, ?)");
    $stmt->execute([$user_id, $product_id]);

    if ($stmt->rowCount() > 0) {
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM favorites WHERE Utilisateurs_id = ?");
        $countStmt->execute([$user_id]);
        $favCount = $countStmt->fetchColumn();

        echo json_encode(["success" => true, "message" => "Ajouté aux favoris !", "favoriteCount" => $favCount]);
    } else {
        echo json_encode(["success" => false, "error" => "Erreur lors de l'ajout en base de données."]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Erreur SQL : " . $e->getMessage()]);
}
?>
