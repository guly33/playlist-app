<?php
 
	$con = mysqli_connect("localhost", "root", "", "playlistDB");
	if (mysqli_connect_errno()) {
		# code...
		echo "Failed connecting to DB:".mysqli_connect_errno();
	}
	 
 ?>