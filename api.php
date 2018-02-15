<?php
    $file = fopen("data.json", "r");
    $response = fread($file, filesize("data.json"));
    echo json_encode($response);
    fclose($file);
?>
