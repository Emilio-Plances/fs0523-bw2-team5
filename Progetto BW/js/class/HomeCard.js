import {Artist} from "./Artist.js";

export class HomeCard{
   constructor(_API, _name, _artist, _immagine, _container, _artistID, _song=``, _albumID=``){
      this.API=_API;  
      this.name=_name;
      this.artist=_artist;
      this.immagine=_immagine;
      this.container=_container;
      this.song=_song;
      this.artistID=_artistID;
      this.albumID=_albumID;
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
            
            window.open(this.song,'_blank');
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
            new Album(album.cover_big, album.title, album.tracks, album.release_date, album.artist.id, album.artist.name)
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
}