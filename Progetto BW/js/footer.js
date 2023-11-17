let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');

button1.addEventListener('click', function (e) {
    e.preventDefault();
    LINK = `https://striveschool-api.herokuapp.com/api/deezer/track/`
    selectedID = `127673047`
    getSong()
});

button2.addEventListener('click', function (e) {
    e.preventDefault();
    LINK = `https://striveschool-api.herokuapp.com/api/deezer/track/`
    selectedID = `552496552`
    getSong()
});


async function getSong() {
    fetch(`${LINK}${selectedID}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
        .then(track => {
            initMusicPlayer(track);
        })     
}

async function initMusicPlayer(track) {
    document.querySelector('.musicPlayerTitle ').innerHTML = track.title
    document.querySelector('.musicPlayerArtist').innerHTML = track.artist.name
    document.querySelector('.imgMusicPlayer').src = track.album.cover_small
    audioPlayer.src = track.preview
    audioPlayer.play();
    playPauseButton.classList.toggle('bi-play-fill');
    playPauseButton.classList.toggle('ms-1');
    playPauseButton.classList.toggle('bi-pause-fill');
}

let playPauseButton = document.getElementById('play');

playPauseButton.addEventListener('click', function () {
    playPauseButton.classList.toggle('bi-play-fill');
    playPauseButton.classList.toggle('ms-1');
    playPauseButton.classList.toggle('bi-pause-fill');
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

audioPlayer.addEventListener('timeupdate', function () {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.querySelector('.progress').style.width = progress + '%';

    let currentTime = formatTime(audioPlayer.currentTime);
    document.getElementById('currentTime').innerText = currentTime;
});

audioPlayer.addEventListener('loadedmetadata', function () {
    let duration = formatTime(audioPlayer.duration);
    document.getElementById('duration').innerText = duration;
});

function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

document.querySelector('.progress-container').addEventListener('click', function (e) {
    var progressBar = document.querySelector('.progress-bar');
    var percent = e.offsetX / progressBar.offsetWidth;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

let loopButton = document.querySelector('.bi-arrow-repeat');
loopButton.addEventListener('click', function () {
    audioPlayer.loop = !audioPlayer.loop;
    updateButtonState(loopButton, audioPlayer.loop);
});

function updateButtonState(button, isActive) {
    if (isActive) {
        button.classList.add('activeGreen');
    } else {
        button.classList.remove('activeGreen');
    }
}

function toggleActiveGreen(element) {
    element.classList.toggle('activeGreen');
};

let progressVolume = document.getElementById('progressVolume');
let volumeBar = document.querySelector('.volume-bar');

volumeBar.addEventListener('click', function (e) {
    let percent = e.offsetX / volumeBar.offsetWidth;
    audioPlayer.volume = percent;
    progressVolume.style.width = percent * 100 + '%';
});

audioPlayer.addEventListener('volumechange', function () {
    let percent = audioPlayer.volume * 100;
    progressVolume.style.width = percent + '%';
});

let skipStartButton = document.querySelector('.bi-skip-start-fill');

skipStartButton.addEventListener('click', function () {

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${selectedID}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
        .then(track => {

            let albumID = track.album.id;
            
            fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
                .then(album => {

                    let currentIndex = album.tracks.data.findIndex(t => t.id == selectedID);
                    let previousIndex = (currentIndex - 1 + album.tracks.data.length) % album.tracks.data.length;
                    let previousTrackID = album.tracks.data[previousIndex].id;

                    selectedID = previousTrackID;
                    getSong();
                });
        });
});

let skipEndButton = document.querySelector('.bi-skip-end-fill');

skipEndButton.addEventListener('click', function () {

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${selectedID}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
        .then(track => {

            let albumID = track.album.id;
            
            fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
                .then(album => {

                    let currentIndex = album.tracks.data.findIndex(t => t.id == selectedID);
                    let nextIndex = (currentIndex + 1) % album.tracks.data.length;
                    let nextTrackID = album.tracks.data[nextIndex].id;

                    selectedID = nextTrackID;
                    getSong();
                });
        });
});