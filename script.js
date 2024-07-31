console.log("Welcome to Music");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Lal Joda Pahne Aana - Arijit Singh", filePath: "songs/1.mp3", coverPath: "img/1.jpg"},
    {songName: "Maan Meri Jaan - King", filePath: "songs/2.mp3", coverPath: "img/2.jpg"},
    {songName: "Tu Hai Kahan -  AUR", filePath: "songs/3.mp3", coverPath: "img/3.jpg"},
    {songName: "Tere Hawaale - Arijit Singh", filePath: "songs/4.mp3", coverPath: "img/4.jpg"},
    {songName: "Kahani Suno 2.0 - Kaifi Khalil", filePath: "songs/5.mp3", coverPath: "img/5.jpg"},
    {songName: "Heeriye - Arijit Singh", filePath: "songs/6.mp3", coverPath: "img/6.jpg"},
    {songName: "O Mahi O Mahi - Arijit Singh", filePath: "songs/7.mp3", coverPath: "img/7.jpg"},
    {songName: "Satranga - Arijit Singh", filePath: "songs/8.mp3", coverPath: "img/8.jpg"},
    {songName: "Kesariya - Arijit Singh", filePath: "songs/9.mp3", coverPath: "img/9.jpg"},
    {songName: "Saari Duniya Jalaa Denge - B Praak", filePath: "songs/10.mp3", coverPath: "img/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Volume Bar..........

// Handle volume change
document.getElementById('volumeControl').addEventListener('input', (e) => {
    const volume = e.target.value;
    audioElement.volume = volume;
});

// Set initial volume
audioElement.volume = 0.5; // Default volume set to 50%


// Automatic Songs Play....................

// Listen for the 'ended' event to automatically play the next song
audioElement.addEventListener('ended', () => {
    // Increment the song index
    songIndex++;
    // If it exceeds the maximum index, loop back to the first song
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    // Set the source of the audio element to the next song
    audioElement.src = songs[songIndex].filePath;
    // Update the song name
    masterSongName.innerText = songs[songIndex].songName;
    // Play the next song
    audioElement.play();
    // Update the play/pause button icon
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});





