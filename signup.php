<?php
$conn = mysql_connect("localhost", "root", " " , "music_app");
if($conn) {
    echo "Connected";
}
else{
    echo "Fail";
}

$username = $_POST['username'];
$password = $_POST['password'];

$data = "insert into login values('$username','$password')";
