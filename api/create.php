<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: application/json');
	include 'connect.php';
	
		# code...
		if(isset($_POST['name']) && isset($_POST['image']) && isset($_POST['tracks'])) {
			$name = $_POST['name'];
			$image = $_POST['image'];
			$songs = $_POST['tracks'];
			

		$query = mysqli_query($con, "SELECT * FROM playlists WHERE name = '$name'") or die("Unable to Connect, sorry :D");
		if (mysqli_num_rows($query) < 1) {
			# code...
			$query = mysqli_query($con, "INSERT INTO `playlists`(`name`, `image`) VALUES ('$name', '$image')") or die("Unable to Connect, sorry :D");
			$query = mysqli_query($con, "SELECT id FROM playlists WHERE name = '$name'") or die("Unable to Connect, sorry :D");
			$result = mysqli_fetch_assoc($query);
			$playlistId	= $result['id'];
			foreach($songs as $track) {
				$trackName = $track['name'];
				$trackUrl = $track['url'];
				$trackQuery = mysqli_query($con, "INSERT INTO `tracks`(`name`, `url`, `playlist_id`) VALUES ('$trackName','$trackUrl', '$playlistId') ") or die("Unable to Connect, sorry :D");  
			}
										
		}
		echo json_encode('1');
	}
	

?>