import {Artist} from "./Artist.js";

export class Track{
   constructor(_API, _title, _artistName,_artistID, _albumCover, _preview,_duration, _container){
      this.API=_API;
      this.title=_title;
      this.artistName=_artistName;
      this.artistID=_artistID;
      this.albumCover=_albumCover;
      this.preview=_preview;
      this.duration= _duration;
      this.container=_container;
      this.HTMLinit();
   }

   HTMLinit(){
      let temp= document.querySelector(`#track-search-template`);
      let clone= temp.content.cloneNode(true);
      this.setVariables(clone);
      this.setLink(clone);
      this.setPreference(clone);
      this.container.append(clone);
   }
   
   setVariables(clone){
      clone.querySelector(`.img-track`).src=this.albumCover;
      clone.querySelector(`.name-track`).innerText=this.title;
      let timeTrack=clone.querySelector(`.time-track`)
      
      let minuteConvertedDuration=Math.floor(this.duration/60);
      let secondConvertedDuration=this.duration%60;
      secondConvertedDuration=String(secondConvertedDuration).padStart(2,`0`);
      timeTrack.innerText=`${minuteConvertedDuration}:${secondConvertedDuration}`;
   }
   
   setLink(clone){
      let linkArtist=clone.querySelector(`.artist-name-track`)
      linkArtist.innerText=this.artistName;
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

   setPreference(clone){
      let heart=clone.querySelector(`.heart`);
      let filledHearth=clone.querySelector(`.filled-heart`);

      [heart,filledHearth].forEach(element=>{
         element.addEventListener(`click`,()=>{
            filledHearth.classList.toggle(`hidden`);

            if(!filledHearth.classList.contains(`hidden`)){
               heart.classList.add(`hidden`);
            }
         })
      })
   }
}