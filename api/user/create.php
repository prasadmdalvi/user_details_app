<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config/database.php';
$data = json_decode(file_get_contents("php://input"));
//print_r($data); exit;
if (!empty($data->name) && !empty($data->email) && !empty($data->password) && !empty($data->dob)) {
    $query = "INSERT INTO users (name, email, password, dob) 
    VALUES (:name, :email, :password, :dob)";

    //var_dump($query);
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":password", password_hash($data->password, PASSWORD_DEFAULT));
    $stmt->bindParam(":dob", $data->dob);
    //$stmt = $conn->prepare($query);
   
    if ($stmt->execute()) {
        // print_r($stmt); exit;
        echo json_encode(["message" => "User created successfully."]);
    } else {
        echo json_encode(["message" => "Unable to create user."]);
    }
} else {
    echo json_encode(["message" => "Incomplete data."]);
}
?>
