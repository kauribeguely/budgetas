<?php
include 'db.php';  // Include the database connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = $_POST['type'];
    $description = $_POST['description'];
    $amount = $_POST['amount'];
    $category = $_POST['category'];
    $payer = $_POST['payer'];

    $sql = "INSERT INTO transactions (type, description, amount, category, payer)
            VALUES ('$type', '$description', $amount, '$category', '$payer')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
