<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($data && isset($data['id'])) {
    $file = 'data.json';
    $jsonData = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    
    foreach ($jsonData as &$item) {
        if ($item['id'] == $data['id']) {
            $item['productName'] = $data['productName'];
            $item['quantity'] = $data['quantity'];
            $item['price'] = $data['price'];
            break;
        }
    }

    file_put_contents($file, json_encode($jsonData));
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>
