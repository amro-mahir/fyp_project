<?php

$email = $_POST['email'];
$userPassword = $_POST['password'];

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'fyp';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo 'connection success';
}

$sql = "SELECT * FROM user WHERE email='$email' AND password='$userPassword'";
$result = $conn->query($sql);

if ($result === false) {
    die("Error executing query: " . $conn->error);
}

if ($result->num_rows > 0) {
    // Login successful
    echo "Login successful!";
} else {
    // Login failed
    echo "Invalid username or password";
}

// Close the connection
$conn->close();

?>