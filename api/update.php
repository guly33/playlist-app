<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: application/json'); 
	include 'connect.php';
	
	if (isset($_POST['id'])) {
		# code...
			$id = $_POST['id'];
			$name = $_POST['name'];
			$image = $_POST['image'];
			$songs = $_POST['tracks'];
		
		$query = mysqli_query($con, "SELECT * FROM playlists WHERE id='$id'");		
		if (mysqli_num_rows($query) > 0) {
			# code...
			$query = mysqli_query($con, "UPDATE `playlists` SET name='$name', image='$image' WHERE id='$id'") or die("Unable to Connect, sorry :D");

			foreach($songs as $track) {
				$trackName = $track['name'];
				$trackUrl = $track['url'];
				if(isset($track['id'])) {								
					$trackId = $track['id'];				
					$query = mysqli_query($con, "UPDATE tracks SET name='$trackName', url='$trackUrl', playlist_id='$id' WHERE id='$trackId'");				
				}else {
					$trackQuery = mysqli_query($con, "INSERT INTO `tracks`(`name`, `url`, `playlist_id`) VALUES ('$trackName','$trackUrl', '$id') ") or die("Unable to Connect, sorry :D");  
				}
			}
		}

		echo json_encode('1');
	}
 ?>