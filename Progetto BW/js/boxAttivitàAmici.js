let closeBox = document.querySelector('#closeBox');
let boxAttivitàAmici = document.querySelector('.boxAttivitàAmici.p-3.rounded-3')

closeBox.addEventListener('click', () => {
    boxAttivitàAmici.classList.add('hidden');
});