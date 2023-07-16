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
$sql = "SELECT * FROM user WHERE email='$userEmail'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    echo "Email is already in use. Please choose a different email.";
    header("Location: http://localhost/fyp_project/registerError.html");
} else {
    $insertQuery = "INSERT INTO user (firstName, lastName, birthDate, email, password) VALUES ('$firstName', '$lastName', '$birthDate', '$userEmail', '$userPassword')";
    if ($conn->query($insertQuery) === TRUE) {
        echo "Registration successful!";
        header("Location: http://localhost/fyp_project/homepage.html");
    } else {
        header("Location: http://localhost/fyp_project/registerError.html");
    }
}
$conn->close();
?>