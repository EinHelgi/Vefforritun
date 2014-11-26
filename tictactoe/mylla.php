<?php
// This is the server-side script
 
// Set the content type
header('Content-Type: application/json');

ini_set('display_errors', 'on');

$board = $_GET['board'];

try {
	/**************************************
	* Create databases and                *
	* open connections                    *
	**************************************/

	// Create (connect to) SQLite database in file
	$file_db = new SQLite3('tictactoe.db');
	// Set errormode to exceptions
	//$file_db->setAttribute(PDO::ATTR_ERRMODE, 
	//                        PDO::ERRMODE_EXCEPTION);

	//$table = 'hardNoStart';
	$query = $file_db->prepare("SELECT result, win FROM hardStart WHERE one = :one AND two = :two AND three = :three AND four = :four AND five = :five AND six = :six AND seven = :seven AND eight =:eight AND nine = :nine");
	
	$query->bindValue('one',$board[0]);
	$query->bindValue('two',$board[1]);
	$query->bindValue('three',$board[2]);
	$query->bindValue('four',$board[3]);
	$query->bindValue('five',$board[4]);
	$query->bindValue('six',$board[5]);
	$query->bindValue('seven',$board[6]);
	$query->bindValue('eight',$board[7]);
	$query->bindValue('nine',$board[8]);


	$result = $query->execute();

	$data = $result->fetchArray();
	echo json_encode($data);
	/*if($data['win']===false) {
		var_dump($data['win']);
	}
	else {
		var_dump($data['result']);
	}*/

	$file_db = null;
}
catch(PDOException $e) {
	// Print PDOException message
	echo $e->getMessage();
}
?>