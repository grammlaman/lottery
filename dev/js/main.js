let pageSelect = document.querySelector('.page-select');
pageSelect.onclick = function() {
    if(pageSelect.classList.length==2){pageSelect.classList.add('open');return}
    if(pageSelect.classList.length!==2){pageSelect.classList.remove('open');}};
let fixed = document.querySelector('.mob-fixed');