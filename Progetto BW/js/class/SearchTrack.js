import { Artist } from "./Artist.js";


export class SearchTrack {
   constructor(_API, _title, _artistName, _artistID, _albumCover, _preview, _duration, _container, _audioPlayer, _songID, _albumID) {
      this.API = _API;
      this.title = _title;
      this.artistName = _artistName;
      this.artistID = _artistID;
      this.albumCover = _albumCover;
      this.preview = _preview;
      this.duration = _duration;
      this.container = _container;
      this.audioPlayer = _audioPlayer;
      this.songID = _songID;
      this.albumID = _albumID;
      this.HTMLinit();
   }

   HTMLinit() {
      let temp = document.querySelector(`#track-search-template`);
      let clone = temp.content.cloneNode(true);
      this.setVariables(clone);
      this.setLink(clone);
      this.setPreference(clone);
      this.container.append(clone);
   }

   setVariables(clone) {
      clone.querySelector(`.img-track`).src = this.albumCover;
      clone.querySelector(`.name-track`).innerText = this.title;
      let trackCard = clone.querySelector(`.track-card`);
      let timeTrack = clone.querySelector(`.time-track`)
      let minuteConvertedDuration = Math.floor(this.duration / 60);
      let secondConvertedDuration = this.duration % 60;
      secondConvertedDuration = String(secondConvertedDuration).padStart(2, `0`);
      timeTrack.innerText = `${minuteConvertedDuration}:${secondConvertedDuration}`;
      trackCard.addEventListener(`click`, () => {
         this.setSong(this.title, this.artistName, this.albumCover, this.preview,this.songID);
      })
   }

   setLink(clone) {
      let linkArtist = clone.querySelector(`.artist-name-track`)
      linkArtist.innerText = this.artistName;
      linkArtist.addEventListener(`click`, (e) => {
         e.stopPropagation();
         let centralBox = document.querySelector(`#central-box`);

         while (centralBox.firstChild) {
            centralBox.removeChild(centralBox.firstChild);
         }

         this.getArtist(this.artistID)
            .then(artist => {
               new Artist(artist.id, artist.name, artist.nb_fan, artist.picture_xl, artist.tracklist)
            });
      })
   }

   getArtist(idArtist) {
      return fetch(`${this.API}artist/${idArtist}`, {
         "method": "GET",
         "headers": {
            "Content-Type": "application/json"
         }
      })
         .then(res => res.json())
         .then(artist => {
            return artist;
         })
   }

   setPreference(clone) {
      let heart = clone.querySelector(`.heart`);
      let filledHearth = clone.querySelector(`.filled-heart`);

      [heart, filledHearth].forEach(element => {
         element.addEventListener(`click`, () => {
            filledHearth.classList.toggle(`hidden`);

            if (!filledHearth.classList.contains(`hidden`)) {
               heart.classList.add(`hidden`);
            }
         })
      })
   }

   setSong(title, artist, cover, preview,songID) {
      let previousButton = document.querySelector('.bi-skip-start-fill');
      let playPauseButton = document.getElementById('play');
      let nextButton = document.querySelector('.bi-skip-end-fill');

      document.querySelector('.musicPlayerTitle ').innerHTML = title;
      document.querySelector('.musicPlayerArtist').innerHTML = artist;
      document.querySelector('.imgMusicPlayer').src = cover;
      this.audioPlayer.src = preview;
      this.audioPlayer.play();
      playPauseButton.classList.remove('bi-play-fill');
      playPauseButton.classList.remove('ms-1');
      playPauseButton.classList.add('bi-pause-fill');
      previousButton.addEventListener('click', () => {
         this.changeSong(songID,`minus`);
      })
      nextButton.addEventListener('click', () => {
         this.changeSong(songID,`plus`);
      })
   }

   changeSong(songID,operator) {

      fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${songID}`, {
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
                  console.log(album);
                  let currentIndex = album.tracks.data.findIndex(t => t.id == songID);
                  let previousIndex= operator==`minus`?  currentIndex-1 : currentIndex+1;
                  let previousTrack = album.tracks.data[previousIndex];

                  this.setSong(previousTrack.title, previousTrack.artist.name, album.cover_small, previousTrack.preview, previousTrack.id);
               });
         });
   }
}