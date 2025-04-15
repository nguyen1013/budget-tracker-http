<?php
// Allow CORS-requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$config = parse_ini_file('../../config.ini', true);

$db_host = $config['database']['host'];
$db_user = $config['database']['username'];
$db_pass = $config['database']['password'];
$db_name = $config['database']['dbname'];

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("SELECT id, type, category, amount, description, date FROM transactions");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("INSERT INTO transactions (type, category, amount, description, date) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$data['type'], $data['category'], $data['amount'], $data['description'], $data['date']]);
            echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
            break;

        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("UPDATE transactions SET type=?, category=?, amount=?, description=?, date=? WHERE id=?");
            $stmt->execute([$data['type'], $data['category'], $data['amount'], $data['description'], $data['date'], $data['id']]);
            echo json_encode(['status' => 'success']);
            break;

        case 'DELETE':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("DELETE FROM transactions WHERE id=?");
            $stmt->execute([$data['id']]);
            echo json_encode(['status' => 'success']);
            break;

        case 'OPTIONS':
            // For Preflight-request 
            http_response_code(200);
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'message' => $e->getMessage()]);
}
?>
