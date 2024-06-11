<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $file = 'data.json';
    $jsonData = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    $data['id'] = uniqid();
    array_push($jsonData, $data);
    file_put_contents($file, json_encode($jsonData));
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>