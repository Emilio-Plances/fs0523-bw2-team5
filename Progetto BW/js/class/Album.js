export class Album{
   constructor(_cover, _title, _tracks, _release_date, _artistID, _artistName, _numberTracks){
      this.cover_big=_cover;
      this.title=_title;
      this.tracks=_tracks;
      this.release_date=_release_date;
      this.artistID=_artistID;
      this.artistName=_artistName;
      this.numberTracks=_numberTracks;
      console.log(this);
      this.HTMLinit();
   }
   HTMLinit(){
      this.getAlbumTemplate();
      temp= document.querySelector(`#album-template`);

   }
   getAlbumTemplate(){
      let centralBox=document.querySelector(`#central-box`);
      let temp= document.querySelector(`#album-template`);
      let clone= temp.content.cloneNode(true);
      this.setAlbumVariables(clone);
      centralBox.append(clone);
   }
   setAlbumVariables(clone){
      clone.querySelector(`.album-img`).src=this.cover_big;
      clone.querySelector(`.album-title`).innerText=this.title;
      clone.querySelector(`.album-release-date`).innerText=this.release_date;
      clone.querySelector(`.album-artist-name`).innerText=this.artistName;
      clone.querySelector(`.album-number-tracks`).innerText=this.numberTracks;
   }
}