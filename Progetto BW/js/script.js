import {SearchTrack} from "./class/SearchTrack.js";
import {HomeCard} from "./class/HomeCard.js";
import {Library} from "./class/Library.js";
const API=`https://striveschool-api.herokuapp.com/api/deezer/`;
const ALGORITMO=[{
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
let centralBox=document.querySelector(`#central-box`);
let homeButton=document.querySelector(`#home-button`);
let input= document.querySelector(`#search-bar`);
let plusButton = document.getElementById("arrow-button");
let leftColumn = document.getElementById("left-column");

let searchButton=document.getElementById('search-button')
let closeBox = document.querySelector('#closeBox');
let boxAttivitaAmici = document.querySelector('.boxAttivitaAmici.p-3.rounded-3');


closeBox.addEventListener('click', () => {
    boxAttivitaAmici.classList.add('hidden');
});

homeButton.addEventListener(`click`,()=>{
   input.classList.add('hidden');
   resetContainer(centralBox);
   getHome();
});

searchButton.addEventListener('click',function(){
    input.classList.remove('hidden')
});

input.addEventListener(`keydown`,(e)=>{
   if (e.key === "Enter"){
      getSearch(input.value);
      input.value=``;
   }
});

plusButton.addEventListener("click", function () {
   let ripDate = document.querySelector(".rip-date");
   let addDate = document.querySelector(".add-date");
   plusButton.classList.toggle('reverse-arrow')
   ripDate.classList.toggle('hidden')
   addDate.classList.toggle('hidden');
   
   leftColumn.classList.toggle("col-3");
   leftColumn.classList.toggle("col-5");
});

getHome();

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

function getHome() {
   getHomeTemplate();
   console.dir(centralBox);
   ALGORITMO.forEach(element=>{
      fetch(`${API}${element.type}/${element.id}`,{
         "method": "GET",
         "headers": {
            "Content-Type": "application/json"
         }
      })
    .then(res=>res.json())
    .then(dato=>{
      console.log(dato);
      let name;let artist;let immagine;let container; let artistID;
      let song;let albumID;let release;
      let libraryContainer=document.querySelector(`#library-container`);
      if(element.type==`artist`){
         name=dato.name;
         immagine=dato.picture_medium;
         artist=`Artist`;
         artistID=dato.id;
         container=document.querySelector(`#artist-home-container`);
      }
      if(element.type==`album`){
         name=dato.title;
         albumID=dato.id;
         release=dato.release_date;
         artist=dato.artist.name;
         artistID=dato.artist.id;
         immagine=dato.cover_medium;
         container=document.querySelector(`#album-home-container`);
      }
      if(element.type==`track`){
         name=dato.title;
         artist=dato.artist.name;
         artistID=dato.artist.id;
         release=dato.release_date;
         immagine=dato.album.cover_medium;
         song=dato.preview;
         container=document.querySelector(`#track-home-container`);
      }
      new Library(API, name, artist, immagine, libraryContainer, artistID, song, albumID, release);
      new Library(API, name, artist, immagine, libraryContainer, artistID, song, albumID, release);

      new HomeCard(API, name, artist, immagine, container, artistID, song, albumID);
    })
   }) 
}

function getHomeTemplate(){
   let temp= document.querySelector(`#home-template`);
   let clone= temp.content.cloneNode(true);
   centralBox.append(clone);
};



function resetContainer(container){
   while(container.firstChild){
      container.removeChild(container.firstChild);
   }
}