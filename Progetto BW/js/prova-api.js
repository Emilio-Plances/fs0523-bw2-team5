import {Track} from "./class/Track.js";

const API=`https://striveschool-api.herokuapp.com/api/deezer/`;

//album              artist                  search?q=queen
let invio= document.querySelector(`#search-button`);

invio.addEventListener(`click`,(e)=>{
   e.preventDefault();
   let input= document.querySelector(`#search-bar`);
   
   getSearch(input.value);
   input.value=``;
})

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
      let boxTrack=document.querySelector(`#box-track`);
      resetContainer(boxTrack);

      risultatiRicerca.data.forEach(element=>{
         let title=element.title;
         let artistName=element.artist.name;
         let artistID=element.artist.id;
         let albumCover=element.album.cover_small;
         let preview=element.preview
         let duration=element.duration
         new Track(API, title, artistName, artistID, albumCover, preview,duration, boxTrack)

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

function resetContainer(container){
   while(container.firstChild){
      container.removeChild(container.firstChild);
   }
}

