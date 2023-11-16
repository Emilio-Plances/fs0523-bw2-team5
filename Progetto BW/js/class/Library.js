import {Artist} from "./Artist.js";
import {Album} from "./Album.js";

export class Library{
   constructor(_API, _name, _artist, _immagine, _container, _artistID, _song, _albumID, _release,_type){
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
         while(centralBox.firstChild){
            centralBox.removeChild(centralBox.firstChild);
         }
         if(this.type==`artist`){
            this.getArtist(this.artistID)
            .then(artist=>{
               new Artist(artist.id, artist.name, artist.nb_fan, artist.picture_xl, artist.tracklist)
            });
         }
         if(this.type==`album`){
            this.getAlbum(this.albumID)
            .then(album=>{
               new Album(album.cover_big, album.title, album.tracks, album.release_date, album.artist.id, album.artist.name)
            });
         }
         if(this.type==`track`){
            console.log(this.song);
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
}