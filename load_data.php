<?php
$file = 'data.json';

if (file_exists($file)) {
    $jsonData = file_get_contents($file);
    echo $jsonData;
} else {
    echo json_encode([]);
}
?>
