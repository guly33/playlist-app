<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: application/json');
	include 'connect.php';
	
		# code...
		if(isset($_POST['id'])) {
		$playlistId = $_POST['id'];
		$query = mysqli_query($con, "SELECT * FROM playlists WHERE id = '$playlistId'") or die("Unable to Connect, sorry :D");				
		if (mysqli_num_rows($query) > 0) {
			# code...
			$query = mysqli_query($con, "DELETE FROM `tracks` WHERE `playlist_id`='$playlistId'") or die("Unable to Connect, sorry :D");				
			$query = mysqli_query($con, "DELETE FROM `playlists` WHERE `id`='$playlistId'") or die("Unable to Connect, sorry :D");				
		}
		echo json_encode('1');
	}
	

?>