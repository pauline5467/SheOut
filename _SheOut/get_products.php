<?php
include 'config.php';
header('Content-Type: application/json');

$stmt = $pdo->query("SELECT id, name, CAST(price AS DECIMAL(10,2)) AS price, image, sizes FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);
?>