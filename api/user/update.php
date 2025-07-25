<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once '../config/database.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $query = "UPDATE users SET name=:name, email=:email, dob=:dob WHERE id=:id";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":dob", $data->dob);
    $stmt->bindParam(":id", $data->id);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "User updated successfully."]);
    } else {
        echo json_encode(["message" => "Unable to update user."]);
    }
} else {
    echo json_encode(["message" => "ID missing."]);
}
?>
