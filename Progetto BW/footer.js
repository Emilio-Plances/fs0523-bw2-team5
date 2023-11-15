// Elemento audio
var audioPlayer = new Audio();

// URL del file MP3 (sostituisci con il tuo endpoint)
var mp3Url = 'https://cdns-preview-4.dzcdn.net/stream/c-4abfe85155aa7b5b84020c6125bec66b-6.mp3';

// Imposta il sorgente audio
audioPlayer.src = mp3Url;

// Pulsante play/pausa
var playPauseButton = document.getElementById('play');

// Ascolta l'evento di clic sul pulsante play/pausa
playPauseButton.addEventListener('click', function () {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.classList.remove('bi-play-fill');
        playPauseButton.classList.add('bi-pause-fill');
    } else {
        audioPlayer.pause();
        playPauseButton.classList.remove('bi-pause-fill');
        playPauseButton.classList.add('bi-play-fill');
    }
});

// Aggiorna la barra di avanzamento
audioPlayer.addEventListener('timeupdate', function () {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.querySelector('.progress').style.width = progress + '%';

    // Aggiorna il tempo corrente
    let currentTime = formatTime(audioPlayer.currentTime);
    document.getElementById('currentTime').innerText = currentTime;
});

// Aggiorna la durata totale
audioPlayer.addEventListener('loadedmetadata', function () {
    let duration = formatTime(audioPlayer.duration);
    document.getElementById('duration').innerText = duration;
});

// Funzione per formattare il tempo come mm:ss
function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// Funzione per gestire il progresso quando viene cliccato
document.querySelector('.progress-container').addEventListener('click', function (e) {
    var progressBar = document.querySelector('.progress-bar');
    var percent = e.offsetX / progressBar.offsetWidth;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Slider del volume
let volumeSlider = document.querySelector('.volume-slider');

// Ascolta gli eventi di cambiamento sullo slider del volume
volumeSlider.addEventListener('input', function () {
    audioPlayer.volume = volumeSlider.value;
});

// Inizializza il volume iniziale
audioPlayer.volume = volumeSlider.value;

// Pulsante per passare alla canzone successiva
let skipNextButton = document.querySelector('.bi-skip-end-fill');
skipNextButton.addEventListener('click', function () {
    // Qui puoi implementare il codice per passare alla canzone successiva
    // Ad esempio, puoi cambiare l'URL del file MP3 e avviare la riproduzione
});

// Pulsante per passare alla canzone precedente
let skipPrevButton = document.querySelector('.bi-skip-start-fill');
skipPrevButton.addEventListener('click', function () {
    // Qui puoi implementare il codice per passare alla canzone precedente
    // Ad esempio, puoi cambiare l'URL del file MP3 e avviare la riproduzione
});

// Pulsante per la riproduzione in loop
let loopButton = document.querySelector('.bi-arrow-repeat');
loopButton.addEventListener('click', function () {
    audioPlayer.loop = !audioPlayer.loop;
    updateButtonState(loopButton, audioPlayer.loop);
});

// Funzione per aggiornare lo stato del pulsante
function updateButtonState(button, isActive) {
    if (isActive) {
        button.classList.add('activeGreen');
    } else {
        button.classList.remove('activeGreen');
    }
}




// Pulsante per la riproduzione casuale
let shuffleButton = document.querySelector('.bi-shuffle');
shuffleButton.addEventListener('click', function () {
    toggleActiveGreen(shuffleButton);
    isShuffleActive = !isShuffleActive;
    updateButtonState(shuffleButton, isShuffleActive);






});

function toggleActiveGreen(element) {
    element.classList.toggle('activeGreen');
}

