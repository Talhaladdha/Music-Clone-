console.log("Welcome to Spotify");

// Initialize the Variables
let songsindex = 0;
let audioElement = new Audio(); // Initialize without a source
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let gif = document.getElementById('gif'); // Make sure you have a 'gif' element

let songs = [
    { songName: "ummat-al-islami-bushra", filepath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "spirit-of-bravery", filepath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "LABBAIK", filepath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Ana-maradun", filepath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "qaulu-innaha-wahad", filepath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Lighting nasheed", filepath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "QAULU-QAULU", filepath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "HABBAT-KARREH", filepath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "SOLDIER-OF-ALLAH", filepath: "songs/9.mp3", coverPath: "covers/9.jpg" },
];
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});


// Function to update the play/pause buttons for all songs
function updateSongItems() {
    songItems.forEach((element, index) => {
        if (index === songsindex && !audioElement.paused) {
            element.querySelector('.songItemPlay').classList.remove('fa-play-circle');
            element.querySelector('.songItemPlay').classList.add('fa-pause-circle');
            
        } else {
            element.querySelector('.songItemPlay').classList.remove('fa-pause-circle');
            element.querySelector('.songItemPlay').classList.add('fa-play-circle');
        }
    });
}

/// Function to play or pause a song
function playPauseSong(index) {
    if (songsindex === index) {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    } else {
        songsindex = index;
        masterSongName.innerText = songs[songsindex].songName;
        audioElement.src = songs[songsindex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1; // Set the GIF's opacity to 1 when playing a new song
    }

    // Update the play/pause buttons of all songs
    updateSongItems();
}


    
// Add click event listeners to song items
songItems.forEach((element, index) => {
    element.querySelector('.songItemPlay').addEventListener('click', () => {
        playPauseSong(index);
    });
});

// Handle Play/Pause Click for the masterPlay button
masterPlay.addEventListener('click', () => {
    playPauseSong(songsindex);
});

// Listen to audio timeupdate event
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar or any other relevant UI elements here
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Initialize audioElement with the first song
audioElement.src = songs[songsindex].filepath;

 // FORWARD BUTTON
document.getElementById('forward').addEventListener('click', () => {
    if (songsindex >= 9) {
        songsindex = 0;
    } else {
        songsindex += 1;
    }
    audioElement.src = `songs/${songsindex + 1}.mp3`;
    masterSongName.innerText = songs[songsindex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update the song item play buttons
    updateSongItems();
});

/// PREVIOUS BUTTON
document.getElementById('previous').addEventListener('click', () => {
    if (songsindex <= 0) {
        songsindex = 0;
    } else {
        songsindex -= 1;
    }
    audioElement.src = `songs/${songsindex + 1}.mp3`;
    masterSongName.innerText = songs[songsindex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Update the song item play buttons
    updateSongItems();
});
