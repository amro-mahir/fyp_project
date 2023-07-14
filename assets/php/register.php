<?php

$firstName = $_POST['first_name'];
$lastName = $_POST['last_name'];
$birthDate = $_POST['birth_date'];
$userEmail = $_POST['email'];
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

// $sql = "INSERT INTO user (firstName, lastName, birthDate, email, password) VALUES ('$firstName', '$lastName', '$birthDate', '$userEmail', '$userPassword')";

$sql = "SELECT * FROM user WHERE email='$userEmail'";
$result = $conn->query($sql);

// Check if the query returned any rows
if ($result->num_rows > 0) {
    // Email already in use
    echo "Email is already in use. Please choose a different email.";
    header("Location: http://localhost/fyp_project/registerError.html");
} else {
    // Insert the new user into the database
    $insertQuery = "INSERT INTO user (firstName, lastName, birthDate, email, password) VALUES ('$firstName', '$lastName', '$birthDate', '$userEmail', '$userPassword')";
    if ($conn->query($insertQuery) === TRUE) {
        // Registration successful
        echo "Registration successful!";
        header("Location: http://localhost/fyp_project/homepage.html");
    } else {
        // Registration failed
        // echo "Error registering user: " . $conn->error;
        header("Location: http://localhost/fyp_project/registerError.html");
    }
}

// if ($conn->query($sql) === TRUE) {
//     echo "Data inserted successfully!";
//     header("Location: http://localhost/fyp_project/homepage.html");
// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
//     header("Location: https://localhost/fyp_project/register.html");
// }

$conn->close();
?>