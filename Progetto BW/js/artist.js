let cuore = document.querySelector(".heart_artist");
let verde = document.querySelector(".filled_heart");
let tPlay = document.querySelector(".playNero");
let pausa = document.querySelector("#pAusa");
let cirlce = document.querySelector(".cirlce");

tPlay.addEventListener("click", () => {
      tPlay.classList.toggle("hidden");
      pausa.classList.toggle("hidden");
});

pausa.addEventListener("click", () => {
      tPlay.classList.toggle("hidden");
      pausa.classList.toggle("hidden");
});

function cuori() {
      cuore.addEventListener("click", () => {
            verde.classList.toggle("hidden");
            cuore.classList.toggle("hidden");
      });
}
cuori();
function noCuori() {
      verde.addEventListener("click", () => {
            cuore.classList.toggle("hidden");
            verde.classList.toggle("hidden");
      });
}
noCuori();
fetch("https://striveschool-api.herokuapp.com/api/deezer/artist")
      .then((response) => response.json())
      .then((data) => {
            console.log(data);
      });
function getCardClone() {
      let temp = document.getElementsByTagName("template")[0];
      return temp.content.cloneNode(true);
}
