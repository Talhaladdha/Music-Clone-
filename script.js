console.log("welcome to spotify")

// Initialize the Variables 
let songsindex = 0
let audioElement = new Audio('songs/1.mp3'); // Change the file path to '1.mp3' if it's in the main folder
let masterPlay = document.getElementById('masterPlay'); // Corrected the ID here
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName=document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))

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

]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName

})





//handle Play Pause Click

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0

    }


})
//Listen To Events
audioElement.addEventListener('timeupdate', () => {

    //Updat Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
audioElement.currentTime = myProgressBar.value * audioElement.duration/100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays()
            songsindex = parseInt(e.target.id)
            masterSongName.innerText = songs[songsindex].songName
            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            audioElement.src=`songs/${songsindex+1}.mp3`
            audioElement.currentTime = 0
            audioElement.play()
            gif.style.opacity = 1

            masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle')

        })
    })


    document.getElementById('forward').addEventListener('click',()=>{
         if(songsindex>=9){
            songsindex=0
         }
         else{
            songsindex+=1
         }
         audioElement.src=`songs/${songsindex+1}.mp3`
         masterSongName.innerText = songs[songsindex].songName

         audioElement.currentTime = 0
         audioElement.play()
         gif.style.opacity = 1

         masterPlay.classList.remove('fa-play-circle')
         masterPlay.classList.add('fa-pause-circle')


    })

    document.getElementById('previous').addEventListener('click',()=>{
        if(songsindex<=0){
           songsindex=0
        }
        else{
           songsindex-=1
        }
        audioElement.src=`songs/${songsindex+1}.mp3`
        masterSongName.innerText = songs[songsindex].songName

        audioElement.currentTime = 0
        audioElement.play()
        gif.style.opacity = 1
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')


   })


   //button switching feature 