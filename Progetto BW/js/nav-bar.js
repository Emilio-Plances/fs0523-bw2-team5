let homeButton=document.getElementById('home-button')
let searchButton=document.getElementById('search-button')
let searchBar=document.getElementById('search-bar')
let premium=document.getElementById('premium-button')

homeButton.addEventListener('click',function(){
    searchBar.classList.add('hidden');

})
searchButton.addEventListener('click',function(){
    searchBar.classList.remove('hidden')
})



searchButton.addEventListener('click',function(){
premium.classList.add('hidden');
})
homeButton.addEventListener('click',function(){
    premium.classList.remove('hidden')
})