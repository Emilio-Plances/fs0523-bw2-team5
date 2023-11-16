let plusButton = document.getElementById("arrow-button");
let leftColumn = document.getElementById("left-column");
let ripDate = document.querySelector(".rip-date");
let addDate = document.querySelector(".add-date");
plusButton.addEventListener("click", function () {
    plusButton.classList.toggle('reverse-arrow')
    ripDate.classList.toggle('d-none')
    addDate.classList.toggle('d-none');
   
    leftColumn.classList.toggle("col-3");
    leftColumn.classList.toggle("col-5");
   
});

