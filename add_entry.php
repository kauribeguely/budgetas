<?php
include 'db.php';  // Include the database connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $description = $_POST['description'];
    $amount = $_POST['amount'];
    $payer = $_POST['payer'];

    // Updated SQL query without 'type' and 'category'
    $sql = "INSERT INTO transactions (description, amount, payer)
            VALUES ('$description', $amount, '$payer')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>



$type = $_POST['type'];
$category = $_POST['category'];
