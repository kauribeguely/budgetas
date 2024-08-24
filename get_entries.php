<?php
include 'db.php';  // Include the database connection file

$sql = "SELECT * FROM transactions ORDER BY date DESC";
$result = $conn->query($sql);

$entries = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $entries[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($entries);

$conn->close();
?>
