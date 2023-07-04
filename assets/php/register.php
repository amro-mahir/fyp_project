<?php

$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'fyp';

$conn = mysqli_connect($hostname, $username, $password, $database);

// Check if the connection was successful
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $birth_date = $_POST['birth_date'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare the SQL statement
    $sql = "INSERT INTO your_table (firstName, lastName, birthDate, email, password) VALUES ($first_name, $last_name, $birth_date, $email, $password)";
    $stmt = mysqli_prepare($conn, $sql);
if ($stmt) {
    // Bind the parameters
    mysqli_stmt_bind_param($stmt, "sssss", $first_name, $last_name, $birth_date, $email, $password);

    // Execute the statement
    if (mysqli_stmt_execute($stmt)) {
        // Success: Data inserted into the database
        echo "Data inserted successfully.";
    } else {
        // Error: Failed to execute the statement
        echo "Error executing the statement: " . mysqli_stmt_error($stmt);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    // Error: Failed to prepare the statement
    echo "Error preparing the statement: " . mysqli_error($conn);
}

    // Close the prepared statement
    mysqli_stmt_close($stmt);
}

// Close the database connection
mysqli_close($conn);
?>