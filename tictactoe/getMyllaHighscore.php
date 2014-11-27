<?php
// This is the server-side script
 
// Set the content type
header('Content-Type: application/json');

ini_set('display_errors', 'on');

try {
	/**************************************
	* Create databases and                *
	* open connections                    *
	**************************************/

	// Create (connect to) SQLite database in file
	$file_db = new SQLite3('../highscore.db');

	/**************************************
	* Create table                        *
	**************************************/

	// Create table Items
	$file_db->exec("CREATE TABLE IF NOT EXISTS myllaScore (name varchar(30),	score int)"); 

	$query = $file_db->prepare("SELECT * FROM myllaScore ORDER BY score DESC LIMIT 10;");

	$result = $query->execute();

	$data = array();
	while ($row = $result->fetchArray(SQLITE3_NUM)) {
		$data[] = $row[0];
		$data[] = $row[1];
	}

	echo json_encode($data);

	$file_db = null;
}
catch(Exception $e) {
	// Print Exception message
	echo $e->getMessage();
}
?>