import {Artist} from "./Artist.js";
import {Album} from "./Album.js";

export class Library{
   constructor(_API, _name, _artist, _immagine, _container, _artistID, _song, _albumID, _release,_type,_songID,_audioPlayer){
      this.API=_API;
      this.name=_name;
      this.artist=_artist;
      this.immagine=_immagine;
      this.container=_container;
      this.artistID=_artistID;
      this.song=_song;
      this.albumID=_albumID;
      this.release=_release;
      this.type=_type;
      this.songID=_songID;
      this.audioPlayer=_audioPlayer;
      this.HTMLinit()
   }
   HTMLinit(){
      let temp= document.querySelector(`#library-template`);
      let clone= temp.content.cloneNode(true);

      this.setVariables(clone);
      this.setLinkName(clone);
      this.setLinkArtist(clone);

      this.container.append(clone);
   }

   setVariables(clone){
      clone.querySelector(`.library-card-img`).src=this.immagine;
      clone.querySelector(`.library-card-title`).innerText=this.name;
      clone.querySelector(`.library-card-type`).innerText=this.type;
      clone.querySelector(`.library-card-release`).innerText=this.release;
   }

   setLinkArtist(clone){
      let linkArtist=clone.querySelector(`.library-type-link`)
      
      linkArtist.addEventListener(`click`,()=>{

         let centralBox=document.querySelector(`#central-box`);

         while(centralBox.firstChild){
            centralBox.removeChild(centralBox.firstChild);
         }

         this.getArtist(this.artistID)
         .then(artist=>{
            new Artist(artist.id, artist.name, artist.nb_fan, artist.picture_xl, artist.tracklist)
         });
      })
   }
   
   setLinkName(clone){
      let linkName=clone.querySelector(`.library-name-link`)
      

      linkName.addEventListener(`click`,()=>{
         let centralBox=document.querySelector(`#central-box`);
         
         if(this.type==`artist`){
            while(centralBox.firstChild){
               centralBox.removeChild(centralBox.firstChild);
            }
            this.getArtist(this.artistID)
            .then(artist=>{
               new Artist(artist.id, artist.name, artist.nb_fan, artist.picture_xl, artist.tracklist)
            });
         }
         if(this.type==`album`){
            while(centralBox.firstChild){
               centralBox.removeChild(centralBox.firstChild);
            }
            this.getAlbum(this.albumID)
            .then(album=>{
               console.log(this.audioPlayer);
               new Album(album.cover_big, album.title, album.tracks.data, album.release_date, 
                  album.artist.id, album.artist.name,album.nb_tracks,album.artist.picture_small,this.audioPlayer)
            });
         }
         if(this.type==`track`){
            this.setSong(this.name, this.artist, this.immagine, this.song, this.songID)
         }
      })
   }
   

   getArtist(idArtist){
      
      return fetch(`${this.API}artist/${idArtist}`,{
         "method": "GET",
         "headers": {
            "Content-Type": "application/json"
         }
      })
      .then(res=>res.json())
      .then(artist=>{
         return artist;
      })
   }
   getAlbum(idAlbum){
      return fetch(`${this.API}album/${idAlbum}`,{
         "method": "GET",
         "headers": {
            "Content-Type": "application/json"
         }
      })
      .then(res=>res.json())
      .then(album=>{
         return album;
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