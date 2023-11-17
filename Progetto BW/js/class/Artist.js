import {Track} from "./Track.js";

export class Artist{
   constructor(_API,_id, _name, _nbFan, _picture_xl, _tracklist,_songID,_audioPlayer){
      this.API=_API;
      this.id=_id;
      this.name=_name;
      this.nbFan=_nbFan;
      this.picture_xl=_picture_xl;
      this.tracklist=_tracklist;
      this._songID;
      this.audioPlayer=_audioPlayer
      this.HTMLinit();
   }
   HTMLinit(){
      let temp= document.querySelector(`#artist-page-template`);
      let clone= temp.content.cloneNode(true);
      let centralBox=document.querySelector(`#central-box`);
      this.setVariables(clone);
      this.setArtistTracks(clone);
      centralBox.append(clone);
   }
   setVariables(clone){
      clone.querySelector(`.artist-page-name`).innerText=this.name;
      clone.querySelector(`.artist-page-nb-fan`).innerText=this.nbFan;
      clone.querySelector(`.artist-page-bg-image`).style.backgroundImage=`url(${this.picture_xl})`;
   }
   setArtistTracks(clone){
      let container= clone.querySelector(`#areatrack-container`);
      console.log(container);
      this.getTracks()
      .then((tracks)=>{
         console.log(tracks);
         tracks.data.forEach((element,i)=>{
            i++
            new Track(i,element.title,element.artist.name,element.rank,
               element.duration,element.preview,container, element.album.cover_small, element.id,this.audioPlayer)
         })
      })
   }

   getTracks(){
      return fetch(this.tracklist,{
         "method": "GET",
         "headers": {
            "Content-Type": "application/json"
         }
      })
      .then(res=>res.json())
      .then(tracks=>{
         return tracks;
      })
   }
}