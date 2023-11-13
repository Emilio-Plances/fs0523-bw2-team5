const LINKARTISTI=`https://striveschool-api.herokuapp.com/api/deezer/artist/`
let pinguiniTatticiNucleariID=6168800;

fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/6168800/top?limit=50`)
.then(res=>res.json())
.then(braniPTN=>{
   console.log(braniPTN);
   let album= braniPTN.data.filter(element=>element.type==`album`);
   console.log(album);
});