export class Library{
   constructor(_API, _name, _artist, _immagine, _container, _artistID, _song, _albumID, _release){
      this.API=_API;
      this.name=_name;
      this.artist=_artist;
      this.immagine=_immagine;
      this.container=_container;
      this.artistID=_artistID;
      this.song=_song;
      this.albumID=_albumID;
      this.release=_release;
      this.HTMLinit()
   }
   HTMLinit(){
      let temp= document.querySelector(`#library-template`);
      let clone= temp.content.cloneNode(true);

      this.setVariables(clone);
      
      this.container.append(clone);
   }
   setVariables(clone){
      clone.querySelector(`.library-card-img`).src=this.immagine;
      clone.querySelector(`.library-card-title`).innerText=this.name;
      clone.querySelector(`.library-card-artist`).innerText=this.artist;
   }
}