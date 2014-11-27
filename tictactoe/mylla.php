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

	$table = 'hardStart';

	if($board[9]==='true') {
		$query = $file_db->prepare("SELECT result, win FROM hardStart WHERE one = :one AND two = :two AND three = :three AND four = :four AND five = :five AND six = :six AND seven = :seven AND eight =:eight AND nine = :nine");
	}
	else {
		$query = $file_db->prepare("SELECT result, win FROM hardNoStart WHERE one = :one AND two = :two AND three = :three AND four = :four AND five = :five AND six = :six AND seven = :seven AND eight =:eight AND nine = :nine");		
	}
	$query->bindValue('one',$board[0]);
	$query->bindValue('two',$board[1]);
	$query->bindValue('three',$board[2]);
	$query->bindValue('four',$board[3]);
	$query->bindValue('five',$board[4]);
	$query->bindValue('six',$board[5]);
	$query->bindValue('seven',$board[6]);
	$query->bindValue('eight',$board[7]);
	$query->bindValue('nine',$board[8]);
	//$query->bindValue('table',$table);

	$result = $query->execute();

	$data = $result->fetchArray();
	echo json_encode($data);

	$file_db = null;
}
catch(PDOException $e) {
	// Print PDOException message
	echo $e->getMessage();
}
?>