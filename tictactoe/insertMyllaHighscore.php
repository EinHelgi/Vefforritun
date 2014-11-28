<?php
// This is the server-side script

// Set the content type
header('Content-Type: application/json');

ini_set('display_errors', 'on');

$data = $_GET['data'];

try {
	/**************************************
	* Create databases and                *
	* open connections                    *
	**************************************/

	//echo chmod('../highscore.db',0777);
	// Create (connect to) SQLite database in file

	$file_db = new SQLite3('../highscore.db');

	/**************************************
	* Create table                        *
	**************************************/

	// Create table Items
	$file_db->exec("CREATE TABLE IF NOT EXISTS myllaScore (name varchar(30),	score int)"); 

	$query = $file_db->prepare("INSERT INTO myllaScore(name, score) VALUES(:name, :score)");

	$result = $query->execute(array('name' => $data[0], 'score' => $data[1], ));

	$file_db = null;
}
catch(Exception $e) {
	// Print Exception message
	echo $e->getMessage();
}
?>