<?php
$host = 'localhost';
$dbname = 'mfkxkzpr_SheOut';
$username = 'mfkxkzpr_qsK3fAkFX'; // Change selon ton serveur
$password = 'dJ8MvF.n27ksYHS'; // Mets le mot de passe si nécessaire

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
