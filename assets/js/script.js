//--------------//
//GLOBALS
//--------------//

let count;
let playlist;
let library;
const urlCol = $('.urlCol');
const nameCol = $('.nameCol'); 





$(document).ready(function () {
	/* body... */
	$('.playerContainer').hide();
	clearInput();
	getLibrary();
});




//--------------//
//PLAYLIST LIBRARY
//--------------//


//initialize playlist library
function getLibrary() {
	// body...
	const url = 'api/get.php';
	$.ajax({
        type: 'POST',
        datatype: 'json',
        url: url,
        data: {
        	get: true,
        },
        success: function(data) {
            // console.log("db response:", data);
            clearInput();
        	library = JSON.parse(data);
    		displayLibrary(library);
        	console.log(library);
        },
        error: function(error) {
            console.log("error : ", error);
        }
    });

}


//Create library DOM Elements

function displayLibrary(lib) {
	// body...
	const libraryEl = $('.library');
	$(libraryEl).empty();

	for (var i = 0; i < lib.length; i++) {
		console.log(libraryEl);

		let playlistCol = document.createElement('div');
		let playlistContainer = document.createElement('div');
		let whiteHole = document.createElement('div');
		let btnContainer = document.createElement('div');
		let deleteBtn = document.createElement('button');
		let editBtn = document.createElement('button');
		let editIcon = document.createElement('i');
		let deleteIcon = document.createElement('i');
		let playlistArt = document.createElement('img');
		let playlistTitle = document.createElement('h3');
		let playIcon = document.createElement('i')

		playlistCol.classList.add('col-3');
		playlistCol.classList.add('playlistCol');

		whiteHole.classList.add('whiteHole-library');
		playIcon.classList.add('far');
		playIcon.classList.add('fa-play-circle');
		btnContainer.classList.add('btnContainer');
		deleteBtn.classList.add('deleteBtn');
		deleteBtn.classList.add('btn');
		deleteBtn.classList.add('btn-secondary');
		editBtn.classList.add('editBtn');
		editBtn.classList.add('btn');
		editBtn.classList.add('btn-secondary');
		deleteIcon.classList.add('far');
		deleteIcon.classList.add('fa-trash-alt');
		editIcon.classList.add('fas');
		editIcon.classList.add('fa-edit');

		playlistContainer.classList.add('playlistContainer');
		playlistArt.classList.add('playlistArt');
		playlistTitle.classList.add('playlistTitle');
		
		whiteHole.id = 'p-' + lib[i].id;
		deleteBtn.id = 'd-' + lib[i].id;
		editBtn.id = 'e-' + lib[i].id;

		whiteHole.setAttribute('onclick', 'playlistHandler(this.id)')
		playlistArt.setAttribute('src', lib[i].image);
		playlistTitle.textContent = lib[i].name;

		deleteBtn.setAttribute("onclick", "deletePlaylist(this.id)");
		editBtn.setAttribute("onclick", "updatePlaylistModel(this.id)");
		editBtn.setAttribute("data-toggle", "modal");
		editBtn.setAttribute("data-target", "#updateModal");

		whiteHole.appendChild(playIcon);
		deleteBtn.appendChild(deleteIcon);
		editBtn.appendChild(editIcon);
		btnContainer.appendChild(deleteBtn);
		btnContainer.appendChild(editBtn);

		playlistContainer.appendChild(btnContainer);
		playlistContainer.appendChild(playlistTitle);
		playlistContainer.appendChild(playlistArt);
		playlistContainer.appendChild(whiteHole);
		
		playlistCol.appendChild(playlistContainer);
		libraryEl.append(playlistCol);
	}
	$('.playlistTitle').lettering();
		

}





//--------------//
//EVENT HANDLERS
//--------------//


//ADD PLAYLIST HANDLERS
$('#addPlaylist').on('click', ()=>{
	/* body... */
	playlist = new Object();
	$('.phase').hide();
	$('.phase-1').show();
});


$('#toAddTracks').on('click', ()=>{
	/* body... */
	let checkImage = $('#playlistImage').val();

	if ($('#playlistImage').val() != '' && $('#playlistName').val() != '' ) {
		if(checkImage.includes(".png") || checkImage.includes(".jpeg") || checkImage.includes(".jpg")) {
			$('.phase').hide();
			$('.phase-2').show();
			initSongPicker();	

			playlist.title = $('#playlistName').val();
			playlist.image = $('#playlistImage').val();		
		} else {
			console.log(checkImage);
		}
	}
});


$('#savePlaylist').on('click', ()=> {
	/* body... */
	createPlaylist();
	clearInput();
	getLibrary();
});

$('#addRow').on('click', ()=> {
	/* body... */
	count++;
	appendSongPicker(count - 1, undefined);
});

$("#playlistImage").on('change keyup copy paste cut', function (){
    //!this.value ...
    console.log($(this).val());
    $('.toUpload').attr('src', $(this).val());
});


//UPDATE PLAYLIST HANDLERS

$('#toEditTracks').on('click', ()=>{
	/* body... */
	$('.phase').hide();
	$('.phase-4').show();

});
$("#imageToUpdate").on('change keyup copy paste cut', function (){
    //!this.value ...
    console.log($(this).val());
    $('.toUpload').attr('src', $(this).val());
});
$('#addNewRow').on('click', ()=> {
	/* body... */
	count++;
	appendSongPicker(count - 1, undefined);
});




$('#playPause').on('click', ()=> {
	let toggleBtn = $('#playPause').find('i');
	$(toggleBtn).toggleClass('fa-pause fa-play');
	$('#playCover').toggleClass('spin');
	
});

$('#search').on('change keyup copy paste cut', ()=> {
	searchResults();

})


//----------------------//
//ADD PLAYLIST FUNCUNALITY
//----------------------//


//Create playlist functions 
function initSongPicker(trackCount) {
	// body... 
	urlCol.empty();
	nameCol.empty();
	if (trackCount != undefined) {
		for (var i = 0; i < trackCount; i++) {
			let trackId = document.createElement('input');
			trackId.setAttribute('type', 'hidden');
			trackId.setAttribute('name', 'trackId-' + i);
			console.log(trackId);
			appendSongPicker(i,trackId);
			count = trackCount;
		}		
	} else {		
		count = 4;
		for (var i = 0; i < count; i++) {
			appendSongPicker(i, undefined);
		}
	}
}

function appendSongPicker(i, trackId) {
	// body...
	let songUrl = document.createElement('div');
	let urlLabel = document.createElement('label');
	let urlInput = document.createElement('input');
	let songName = document.createElement('div');
	let nameLabel = document.createElement('label');
	let nameInput = document.createElement('input');

	songUrl.classList.add('form-group');
	songUrl.classList.add('songUrl');
	urlLabel.setAttribute('for', 'newUrl-' + (i + 1));
	urlLabel.textContent = 'Url:';
	urlInput.setAttribute('type', 'url');
	urlInput.classList.add('urls');
	urlInput.setAttribute('name', 'newUrl-' + (i + 1));

	songName.classList.add('form-group');
	songName.classList.add('songName');
	nameLabel.setAttribute('for', 'newName-' + (i + 1));
	nameLabel.textContent = 'Name:';
	nameInput.setAttribute('type', 'text');
	nameInput.classList.add('names');
	nameInput.setAttribute('name', 'newName-' + (i + 1));

	songUrl.appendChild(urlLabel);
	songUrl.appendChild(urlInput);
	if (trackId != undefined) {
		songUrl.appendChild(trackId);	
	}
	urlCol.append(songUrl);

	songName.appendChild(nameLabel);
	songName.appendChild(nameInput);
	nameCol.append(songName);
}



//----------------------//
//CREATE and VALIDATE playlist
//----------------------//

function createPlaylist() {
	// body...
	playlist.tracks = [];
	let unsortedTracksUrls = $('.urls');
	let unsortedTracksNames = $('.names');
	for (var i = 0; i < unsortedTracksUrls.length; i++) {
		if (unsortedTracksUrls[i].value.length != 0) {	
			let track = new Object();
			let type = '.mp3';

			track.url = unsortedTracksUrls[i].value;
			
			let endsValid = track.url.endsWith(type);
			if (endsValid) {
				if (unsortedTracksNames[i].value.length != 0) {
					track.name = unsortedTracksNames[i].value;	
					console.log(track.name);
					playlist.tracks.push(track);
					console.log(track);
				}
			} else {
				console.log(track.url + ' not Valid format');
			}
		}
	}
	addPlaylist(playlist);
}

//Add to DB
function addPlaylist(playlist) {
    const url = 'api/create.php';
    let playlistToAdd =  {
    	name: playlist.title,
    	image: playlist.image,
    	tracks: playlist.tracks 
	}


    $.ajax({
        type: 'POST',
        datatype: 'json',
        url: url,
        data: playlistToAdd,
        success: function(data) {
            console.log("db response:", data);
        },
        error: function(error) {
            console.log("error : ", error);
        }
    });


}


//----------------------//
//delete from DB and update library
//----------------------//

function deletePlaylist(t) {
    
	const url = 'api/delete.php'
	let deleteId = t.slice(2);
	console.log(deleteId);
    let toDelete = {
    	id: deleteId,
    };

    $.ajax({
        type: 'POST',
        datatype: 'json',
        url: url,
        data: toDelete,
        success: function(data) {
            console.log("db response:", data);
        	clearInput();
			getLibrary();

        },
        error: function(error) {
            console.log("error : ", error);
        }
    });

}


//----------------------//
//update playlist
//----------------------//

function updatePlaylistModel(t) {
	const url = 'api/update.php'
	let editId = t.slice(2);
	console.log(editId);
	let playlistToEdit;
	for (var i = 0; i < library.length; i++) {
		if (library[i].id == editId) {
			playlistToEdit = library[i];
			displayEditModal(playlistToEdit);
		}
		
	}
}

function displayEditModal(edit) {
	initSongPicker(edit[3].length);

	$('.phase').hide();
	$('.phase-3').show();
	$('#playlistNewName').val(edit.name);
	$('#imageToUpdate').val(edit.image);
    $('.toUpload').attr('src', $('#imageToUpdate').val());
	$('#playlistId').val(edit.id);

	for (var i = 0; i < edit[3].length; i++) {
		let trackUrl = 'newUrl-' + (i + 1);
		let trackName = 'newName-' + (i + 1);
		let songId = 'trackId-' + i;
		let pickerFormatUrl = 'input[name=' + trackUrl + ']';
		let pickerFormatName = 'input[name=' + trackName + ']';
		let pickerFormatId = 'input[name=' + songId + ']';
		$(pickerFormatUrl).val(edit[3][i].url);
		$(pickerFormatName).val(edit[3][i].name);
		$(pickerFormatId).val(edit[3][i].id);
	}

}



//----------------------//
//Player functions
//----------------------//


function playlistHandler(t) {
	$('#playCover').removeClass('spin');
	$('.playerContainer').show('slow');
	$('#playCover').addClass('spin');
	let toggleBtn = $('#playPause').find('i');
	$(toggleBtn).removeClass('fa-play');
	$(toggleBtn).addClass('fa-pause');
	fixPosition();
	initPlayer(t);
}

function initPlayer(t) {
	// body...
	let playId = t.slice(2);
	console.log(playId);

	for (var i = 0; i < library.length; i++) {
		if (library[i].id == playId) {
			let trackList = $('#trackList');
			let playTracks = library[i][3];
			document.title = library[i].name;
			$('#playCover').attr('src', library[i].image);
			$('#playTitle').text(library[i].name);
			$(trackList).empty();

			playTracks.forEach( function(el, index) {
				// statements
				let trackLi = document.createElement('li');
				trackLi.textContent = el.name;
				trackLi.id = 't-' + el.id;
				trackLi.setAttribute('onclick', 'playTrack(this.id)');
				trackLi.classList.add('track-item');
				trackList.append(trackLi);



				if (index == 0) {
					$('#trackPlayer').attr('src', el.url);
					let tr = $('#trackPlayer');
					audioHandler(tr);
				}
			});
		}
	}
}


//AUDIO FUNCTIONS
function audioHandler(track) {
	// body...
	$(track).on('loadedmetadata', ()=> {
		console.log(track.duration);
	});
	// $('.duration').text(duration);
}

function playTrack(t) {
	let toPlay = t.slice(2);
	console.log(toPlay);
}


//SEARCH FUNCTION
function searchResults() {
	// body...
	let resList = $('#resList');
	$(resList).empty();
	let matches = [];
	let str = $('#search').val();

	if (str.length > 2) {
		for (var i = 0; i < library.length; i++) {
			let playName = library[i].name;
			let isStart = playName.startsWith(str);
			if (isStart) {
				matches.push(library[i]);
			}
			
		}
	}
	if (matches.length > 0) {
		for (var i = 0; i < matches.length; i++) {
			displayLibrary(matches);
		}
	} else {
		displayLibrary(library);
	}

}



//UTILITES
function clearInput() {
	$('input').val('');
	$('#playlistImage').val('');
	$('.urls').val('');
	$('.names').val('');
	$('#search').val('');
	$('.toUpload').attr('src','#');
};

function fixPosition() {
	$('.playerNest').addClass('fixed-top');
	$('.playerNest').addClass('fixed-player');
	$('.libraryContainer').css('padding-top', '18%');
}