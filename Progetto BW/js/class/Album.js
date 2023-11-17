import {Track} from "./Track.js";

export class Album{
   constructor(_cover, _title, _tracks, _release_date, _artistID, _artistName, _numberTracks,_artistImage,_audioPlayer){
      this.cover_big=_cover;
      this.title=_title;
      this.tracks=_tracks;
      this.release_date=_release_date;
      this.artistID=_artistID;
      this.artistName=_artistName;
      this.numberTracks=_numberTracks;
      this.artistImage=_artistImage;
      this.audioPlayer=_audioPlayer;
      this.HTMLinit();
   }
   HTMLinit(){
      let temp= document.querySelector(`#album-template`);
      let clone= temp.content.cloneNode(true);
      let centralBox=document.querySelector(`#central-box`);
      let containerTrack=clone.querySelector(`#areatrack-container`);
      this.setVariables(clone);
      this.setAreaTrack(containerTrack);
      centralBox.append(clone);
   }

   setVariables(clone){
      clone.querySelector(`.album-img`).src=this.cover_big;
      clone.querySelector(`.album-title`).innerText=this.title;
      clone.querySelector(`.album-release-date`).innerText=this.release_date;
      clone.querySelector(`.album-artist-name`).innerText=this.artistName;
      clone.querySelector(`.album-number-tracks`).innerText=this.numberTracks;
      clone.querySelector(`.album-artist-image`).src=this.artistImage;
   }

   setAreaTrack(container){
      this.tracks.forEach((element,i)=>{
         i++;
         new Track(i, element.title,element.artist.name,element.rank,
            element.duration,element.preview,container, element.album.cover_small, element.id,this.audioPlayer)
      })
   }
}