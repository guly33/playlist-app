<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: application/json');
	include 'connect.php';
	if(isset($_POST['get'])) {
	$playlistArr = array();
	
	$query = mysqli_query($con, "SELECT * FROM playlists LIMIT 100");
	
	if(mysqli_num_rows($query) > 0) {
		while ($row = mysqli_fetch_array($query)) {
	 		# code...
	 		$tracksArr = array();
	 		$playlistId = $row['id'];
	 		$tracksQuery = mysqli_query($con, "SELECT * FROM tracks WHERE playlist_id = '$playlistId'");
	 		while ($trackRow = mysqli_fetch_array($tracksQuery)) {
	 			# code...
	 			$trackId = $trackRow['id'];
	 			array_push($tracksArr, $trackRow);

	 		}
	 		array_push($row, $tracksArr);
	 		array_push($playlistArr, $row);
		 }					
		
		}
	}
			echo json_encode($playlistArr);
?>
