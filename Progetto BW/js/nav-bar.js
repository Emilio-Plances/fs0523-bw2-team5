let homeButton=document.getElementById('home-button')
let searchButton=document.getElementById('search-button')
let searchBar=document.getElementById('search-bar')


homeButton.addEventListener('click',function(){
    searchBar.classList.add('hidden');

})
searchButton.addEventListener('click',function(){
    searchBar.classList.remove('hidden')
})