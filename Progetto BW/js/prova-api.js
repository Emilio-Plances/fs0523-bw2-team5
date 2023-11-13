const API=`https://striveschool-api.herokuapp.com/api/deezer/`

//album              artist                  search?q=queen
let idArtist=6168800;  // PTN
let idAlbum=129682562; // - Diamo un calcio all'aldilà
let invio= document.querySelector(`#search-button`);
invio.addEventListener(`click`,()=>{
   
   let input= document.querySelector(`#search-bar`).value;
   getSearch(input);
})
const ARTISTS=[
      {
         idArtist:6168800,
         idAlbum1:129682562
      }
      
   ]


getData(`album`,idAlbum);
getData(`artist`,idArtist)

function getData(type,id){
   fetch(`${API}${type}/${id}`,{
      "method": "GET",
      "headers": {
         "Content-Type": "application/json"
      }
   })
   .then(res=>res.json())
   .then(datoScelto=>{
      console.log(datoScelto);
      if(type==`album`){
         console.log(datoScelto.title);
         console.log(datoScelto.nb_tracks);
      }
      if(type==`artist`){
         console.log(datoScelto.name);
         let img=document.createElement(`img`);
         img.src=datoScelto.picture_small
         document.querySelector(`body`).append(img);
         
      }
      });
}

function getSearch(query){
   query=query.replace(" ", "");
   query=query.toLowerCase();
   fetch(`${API}search?q=${query}`,{
      "method": "GET",
      "headers": {
         "Content-Type": "application/json"
      }
   })
   .then(res=>res.json())
   .then(risultatiRicerca=>{
      console.log(risultatiRicerca);

      risultatiRicerca.data.forEach(element=>{
         let title=element.title;
         let artistName=element.artist.name;
         let albumCover=element.album.cover_small;
         let preview=element.preview
         let duration=element.duration
         let boxTrack=document.querySelector(`#box-track`);
         new Track(title, artistName, albumCover, preview,duration, boxTrack)

         // if(element.type==`album`){
         //    let albumTitle=element.album.title;
         //    
         //    console.log(albumTitle, artistName, albumCover);
         // }
         // if(element.type==`artist`){
         //    let artistImg=element.artist.picture_medium;
         //    console.log(artistName,artistImg)
         // }
      })
   })
}

class Track{
   constructor(_title, _artistName, _albumCover, _preview,_duration, _container){
      this.title=_title;
      this.artistName=_artistName;
      this.albumCover=_albumCover;
      this.preview=_preview;
      this.duration= _duration;
      this.container=_container;
      this.HTMLinit();
   }
   HTMLinit(){
      let temp= document.querySelector(`#track-template`);
      let clone= temp.content.cloneNode(true);

      this.setVariables(clone);
      this.container.append(clone);
   }
   
   setVariables(clone){
      clone.querySelector(`.img-track`).src=this.albumCover;
      clone.querySelector(`.artist-name-track`).innerText=this.artistName;
      clone.querySelector(`.name-track`).innerText=this.title;

      let minuteConvertedDuration=Math.floor(this.duration/60);
      let secondConvertedDuration=this.duration-(minuteConvertedDuration*60);
      let timeTrack=clone.querySelector(`.time-track`)
      timeTrack.innerText=`${minuteConvertedDuration}:${secondConvertedDuration}`;
   }
}