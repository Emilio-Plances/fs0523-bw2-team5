import {SearchTrack} from "./class/SearchTrack.js";

const API=`https://striveschool-api.herokuapp.com/api/deezer/`;

let invio= document.querySelector(`#search-button`);

invio.addEventListener(`click`,(e)=>{
   e.preventDefault();
   let input= document.querySelector(`#search-bar`);
   
   getSearch(input.value);
   input.value=``;
})

const IDRANDOM=[{
   id:92,
   type:`artist`
},{
   id:52,
   type:`artist`
},{
   id:10666537,
   type:`artist`
},{
   id:4138,
   type:`artist`
},{
   id:459,
   type:`artist`
},{
   id:412,
   type:`artist`
},{
   id:12874,
   type:`artist`
},{
   id:2276,
   type:`artist`
},{
   id:81912,
   type:`album`
},{
   id:6203779,
   type:`album`
},{
   id:47702742,
   type:`album`
},{
   id:1121401,
   type:`album`
},{
   id:182475962,
   type:`album`
},{
   id:50036922,
   type:`album`
},{
   id:135876548,
   type:`track`
},{
   id:12209331,
   type:`track`
},{
   id:568121122,
   type:`track`
},{
   id:404203072,
   type:`track`
},{
   id:3091028,
   type:`track`
},{
   id:1756262067,
   type:`track`
},{
   id:6611231,
   type:`track`
},{
   id:986662082,
   type:`track`
}
]; //questi dati dovrebbero arrivare dall'algoritmo del backend 

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
      let boxTrack=document.querySelector(`#central-box`);
      resetContainer(boxTrack);

      risultatiRicerca.data.forEach(element=>{
         let title=element.title;
         let artistName=element.artist.name;
         let artistID=element.artist.id;
         let albumCover=element.album.cover_small;
         let preview=element.preview
         let duration=element.duration
         new SearchTrack(API, title, artistName, artistID, albumCover, preview,duration, boxTrack)
      })
   })
}

function getHome(id) {
   
}

function resetContainer(container){
   while(container.firstChild){
      container.removeChild(container.firstChild);
   }
}

        // if(element.type==`album`){
         //    let albumTitle=element.album.title;
         //    
         //    console.log(albumTitle, artistName, albumCover);
         // }
         // if(element.type==`artist`){
         //    let artistImg=element.artist.picture_medium;
         //    console.log(artistName,artistImg)
         // }