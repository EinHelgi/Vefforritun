<?php
// This is the server-side script
 
// Set the content type
header('Content-Type: application/json');

ini_set('display_errors', 'on');

//$witch = $_GET['witch'];

try {
	/**************************************
	* Create databases and                *
	* open connections                    *
	**************************************/

	// Create (connect to) SQLite database in file
	$file_db = new SQLite3('standardScore.db');

	//if($witch[0]===0) $query = $file_db->prepare("SELECT * FROM myllaScore ORDER BY score DESC LIMIT 10;");
	//if($witch[0]===1) $query = $file_db->prepare("SELECT * FROM pacmanScore ORDER BY score DESC LIMIT 10;");
	//if($witch[0]===2) $query = $file_db->prepare("SELECT * FROM breakoutScore ORDER BY score DESC LIMIT 10;");
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