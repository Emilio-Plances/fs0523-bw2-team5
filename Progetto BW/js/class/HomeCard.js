import {Artist} from "./Artist.js";
import {Album} from "./Album.js";

export class HomeCard{
   constructor(_API, _name, _artist, _immagine, _container, _artistID, _song=``, _albumID=``,_songID=``,_audioPlayer){
      this.API=_API;  
      this.name=_name;
      this.artist=_artist;
      this.immagine=_immagine;
      this.container=_container;
      this.song=_song;
      this.artistID=_artistID;
      this.albumID=_albumID;
      this.songID=_songID;
      this.audioPlayer=_audioPlayer;
      this.HTMLinit();
   }
   
   HTMLinit(){
      let temp= document.querySelector(`#card-home-template`);
      let clone= temp.content.cloneNode(true);

      this.setVariables(clone);
      this.setLinks(clone);
      this.container.append(clone);
   }

   setVariables(clone){
      clone.querySelector(`.home-card-img`).src=this.immagine;
      clone.querySelector(`.home-card-title`).innerText=this.name;
      clone.querySelector(`.home-card-artist`).innerText=this.artist;
   }

   setLinks(clone){
      let cardHome=clone.querySelector(`.card-home`);
      let homeLinkTitle=clone.querySelector(`.home-link-title`);
      let homeLinkArtist=clone.querySelector(`.home-link-artist`);

      if(this.container.id.includes(`track`)){
         this.setTrackLink(cardHome,homeLinkTitle,homeLinkArtist)
      }
      if(this.container.id.includes(`artist`)){
         clone.querySelector(`.home-card-img`).classList.add(`rounded-circle`);
         this.setArtistLink(cardHome);
      }
      if(this.container.id.includes(`album`)){
         this.setAlbumLink(cardHome,homeLinkTitle,homeLinkArtist);
      }
   }

   setTrackLink(home, title, buttonArtist){
      
      [home,title].forEach(element=>{
         element.addEventListener(`click`,()=>{
            
            this.setSong(this.name, this.artist, this.immagine, this.song, this.songID)
         }) 
      })
      
      buttonArtist.addEventListener(`click`,(e)=>{
         e.stopPropagation();
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

   setArtistLink(home){
      
      home.addEventListener('click',()=>{
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

   setAlbumLink(home, title, buttonArtist){
      [home,title].forEach(element=>{
         element.addEventListener(`click`,()=>{
            let centralBox=document.querySelector(`#central-box`);
            while(centralBox.firstChild){
               centralBox.removeChild(centralBox.firstChild);
            }

            this.getAlbum(this.albumID)
            .then(album=>{
               new Album(album.cover_big, album.title, album.tracks.data, album.release_date, album.artist.id, 
               album.artist.name,album.nb_tracks,album.artist.picture_small,this.audioPlayer)
            });    
         }) 
      })

      buttonArtist.addEventListener(`click`,(e)=>{
         e.stopPropagation();
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