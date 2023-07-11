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

$sql = "INSERT INTO user (firstName, lastName, birthDate, email, password) VALUES ('$firstName', '$lastName', '$birthDate', '$userEmail', '$userPassword')";

if ($conn->query($sql) === TRUE) {
    echo "Data inserted successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>