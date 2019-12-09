let pageSelect = document.querySelector('.page-select');
pageSelect.onclick = function() {
    if(!pageSelect.classList.contains('open')){pageSelect.classList.add('open');return}
    if(pageSelect.classList.contains('open')){pageSelect.classList.remove('open');}};
let fixed = document.querySelector('.mob-fixed');

window.onload = function () {
    setInterval('changeBGC()',10000);

    requestAnimationFrame(function () {
        //* -- Анимация пунктов меню--*//
        let tl = new TimelineMax();
        tl.add(TweenMax.staggerFromTo('.navigation>li',.5,
            {y:'33px',scale:0,ease: "back.out(1.7)",},
            {y:0,scale:1,ease: "back.out(1.7)"},.125));
        tl.add(TweenMax.to('.navigation li:last-child svg',.5,
            {fill:'red'}));

        //* -- Анимация пунктов меню конец--*//
    });

};
function changeBGC() {
    let arr = document.querySelectorAll('.typycal');
    arr.forEach(function (el) {
        let cls = el.getAttribute('data-class'),
            clsBgc = el.getAttribute('data-change');
        if(el.classList.contains(clsBgc)){
            el.classList.add(cls);
            el.classList.remove(clsBgc);
        }
        else{
            el.classList.add(clsBgc);
            el.classList.remove(cls)

        }
    })
}