import { SearchTrack } from "./class/SearchTrack.js";
import { HomeCard } from "./class/HomeCard.js";
import { Library } from "./class/Library.js";

const API = `https://striveschool-api.herokuapp.com/api/deezer/`;
const ALGORITMO = [{
   id: 92,
   type: `artist`
}, {
   id: 52,
   type: `artist`
}, {
   id: 10666537,
   type: `artist`
}, {
   id: 4138,
   type: `artist`
}, {
   id: 459,
   type: `artist`
}, {
   id: 412,
   type: `artist`
}, {
   id: 12874,
   type: `artist`
}, {
   id: 2276,
   type: `artist`
}, {
   id: 81912,
   type: `album`
}, {
   id: 6203779,
   type: `album`
}, {
   id: 47702742,
   type: `album`
}, {
   id: 1121401,
   type: `album`
}, {
   id: 182475962,
   type: `album`
}, {
   id: 50036922,
   type: `album`
}, {
   id: 135876548,
   type: `track`
}, {
   id: 12209331,
   type: `track`
}, {
   id: 568121122,
   type: `track`
}, {
   id: 404203072,
   type: `track`
}, {
   id: 3091028,
   type: `track`
}, {
   id: 1756262067,
   type: `track`
}, {
   id: 6611231,
   type: `track`
}, {
   id: 986662082,
   type: `track`
}
]; //questi dati dovrebbero arrivare dall'algoritmo del backend 
let centralBox = document.querySelector(`#central-box`);
let homeButton = document.querySelector(`#home-button`);
let input = document.querySelector(`#search-bar`);
let plusButton = document.getElementById("arrow-button");
let leftColumn = document.getElementById("left-column");
let searchButton = document.getElementById('search-button')
let closeBox = document.querySelector('#closeBox');
let rightColumn = document.querySelector('#right-column');
let usersButton = document.querySelector('#nav-bar-users');
let playPauseButton = document.getElementById('play');
let justFirstTime = true;
let audioPlayer = new Audio();

closeBox.addEventListener('click', () => {
   rightColumn.classList.add('hidden');
});

usersButton.addEventListener('click', () => {
   rightColumn.classList.remove('hidden');
})

homeButton.addEventListener(`click`, () => {
   input.classList.add('hidden');
   resetContainer(centralBox);
   getHome();
});

searchButton.addEventListener('click', function () {
   input.classList.remove('hidden')
});

input.addEventListener(`keydown`, (e) => {
   if (e.key === "Enter") {
      getSearch(input.value);
      input.value = ``;
   }
});

plusButton.addEventListener("click", function () {
   let ripDate = document.querySelector(".rip-date");
   let addDate = document.querySelector(".add-date");
   plusButton.classList.toggle('reverse-arrow')
   ripDate.classList.toggle('hidden')
   addDate.classList.toggle('hidden');

   leftColumn.classList.toggle("col-3");
   leftColumn.classList.toggle("col-5");
});

getHome()

function getSearch(query) {
   query = query.replace(" ", "");
   query = query.toLowerCase();
   fetch(`${API}search?q=${query}`, {
      "method": "GET",
      "headers": {
         "Content-Type": "application/json"
      }
   })
      .then(res => res.json())
      .then(risultatiRicerca => {
         let boxTrack = document.querySelector(`#central-box`);
         resetContainer(boxTrack);
         console.log(risultatiRicerca);
         risultatiRicerca.data.forEach(element => {
            let title = element.title;
            let artistName = element.artist.name;
            let artistID = element.artist.id;
            let albumCover = element.album.cover_small;
            let preview = element.preview;
            let duration = element.duration;
            let songID = element.id;
            let albumID = element.album.id;
            new SearchTrack(API, title, artistName, artistID, albumCover, preview, duration, boxTrack, audioPlayer, songID, albumID)
         })
      })
}

function getHome() {
   getHomeTemplate();
   let i = 0;

   ALGORITMO.forEach(element => {
      fetch(`${API}${element.type}/${element.id}`, {
         "method": "GET",
         "headers": {
            "Content-Type": "application/json"
         }
      })
      .then(res => res.json())
      .then(dato => {
         let name; let artist; let immagine; let container;
         let song; let albumID; let release; let artistID;
         let songID

         let libraryContainer = document.querySelector(`#library-container`);

         if (element.type == `artist`) {
            name = dato.name;
            artist = `Artist`;
            immagine = dato.picture_medium;
            artistID = dato.id;
            container = document.querySelector(`#artist-home-container`);
         } else {
            name = dato.title;
            artist = dato.artist.name;
            artistID = dato.artist.id;
            if (element.type == `album`) {

               immagine = dato.cover_medium;
               albumID = dato.id;
               release = dato.release_date;
               container = document.querySelector(`#album-home-container`);
            }
            if (element.type == `track`) {
               name = dato.title;
               immagine = dato.album.cover_medium;
               release = dato.release_date;
               song = dato.preview;
               songID = dato.id;
               container = document.querySelector(`#track-home-container`);
            }
         }

         if (justFirstTime) {
            new Library(API, name, artist, immagine, libraryContainer, artistID, song, albumID, release, element.type, songID, audioPlayer);
            i++;
            if (i == ALGORITMO.length) {
               justFirstTime = false;
            }
         }
         new HomeCard(API, name, artist, immagine, container, artistID, song, albumID, songID, audioPlayer);
      })
   })
}

function getHomeTemplate() {
   let temp = document.querySelector(`#home-template`);
   let clone = temp.content.cloneNode(true);
   centralBox.append(clone);
}

function resetContainer(container) {
   while (container.firstChild) {
      container.removeChild(container.firstChild);
   }
}

/*___________________________________________________PLAYER________________________________________________*/


let progressVolume = document.getElementById('progressVolume');
let volumeBar = document.querySelector('.volume-bar');
let loopButton = document.querySelector('.bi-arrow-repeat');

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
   let currentTime = formatTime(audioPlayer.currentTime);

   document.querySelector('.progress').style.width = progress + '%';
   document.getElementById('currentTime').innerText = currentTime;
});

audioPlayer.addEventListener('loadedmetadata', function () {
   let duration = formatTime(audioPlayer.duration);
   document.getElementById('duration').innerText = duration;
});

document.querySelector('.progress-container').addEventListener('click', function (e) {
   let progressBar = document.querySelector('.progress-bar');
   let percent = e.offsetX / progressBar.offsetWidth;
   audioPlayer.currentTime = percent * audioPlayer.duration;
});

function formatTime(time) {
   let minutes = Math.floor(time / 60);
   let seconds = Math.floor(time % 60);
   return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

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

volumeBar.addEventListener('click', function (e) {
   let percent = e.offsetX / volumeBar.offsetWidth;
   audioPlayer.volume = percent;
   progressVolume.style.width = percent * 100 + '%';
});

audioPlayer.addEventListener('volumechange', function () {
   let percent = audioPlayer.volume * 100;
   progressVolume.style.width = percent + '%';
});

