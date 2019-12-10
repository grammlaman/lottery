let pageSelect = document.querySelector('.page-select');
pageSelect.onclick = function() {
    if(!pageSelect.classList.contains('open')){pageSelect.classList.add('open');return}
    if(pageSelect.classList.contains('open')){pageSelect.classList.remove('open');}};
let fixed = document.querySelector('.mob-fixed');

window.onload = function () {
    setInterval('changeBGC()',10000);
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

window.addEventListener('scroll', function(e) {
    let scrolled = window.pageYOffset;
    let navBar = document.getElementById('navigation'),
        header = document.getElementById('header'),
        part = document.getElementById('participate'),
        scrollF = document.getElementById('scroll-1'),
        scrollS = document.getElementById('scroll-2'),
        firstView = document.getElementById('first-view').getClientRects()[0].height,
        secondView = document.getElementById('second-view').getClientRects()[0].height;
    if(!scrolled){
        part.classList.remove('scrolled-hide');
        header.classList.remove('head-scrolled');
        navBar.classList.remove('mob-scroll');
    }
    if(scrolled){
        if(!part.classList.contains('scrolled-hide')){part.classList.add('scrolled-hide');}
        if(!header.classList.contains('head-scrolled')){header.classList.add('head-scrolled');}
        if(!navBar.classList.contains('mob-scroll')){navBar.classList.add('mob-scroll');
            requestAnimationFrame(function () {
                //* -- Анимация пунктов меню--*//
                let tl = new TimelineMax();
                tl.add(TweenMax.staggerFromTo('.navigation>li',0.8,
                    {y:'33px',scale:0,ease: "back.out(1.7)",},
                    {y:0,scale:1,ease: "back.out(1.7)"},.2));
                tl.add(TweenMax.to('.navigation>li:last-child svg',0.8,
                    {fill:'red'}));

                //* -- Анимация пунктов меню конец--*//
            });}
    }
    if(scrolled>=firstView-1){
        scrollF.classList.add('display-none');
        scrollS.classList.remove('display-none')
    }
    if(scrolled<firstView-1){
        scrollF.classList.remove('display-none');
        scrollS.classList.add('display-none')
    }
    if(scrolled>=(secondView+150)){
        scrollS.classList.add('scrolled-hide')
    }
    if(scrolled<(secondView+150)){
        scrollS.classList.remove('scrolled-hide')
    }
});

let youBut = document.querySelector('.mainview-video');
let youTube = document.querySelector('.youtube');
let youClose = document.querySelector('.youtube-close');
let iframe = document.querySelector('iframe');
youBut.onclick=function () {
    youTube.style.display = 'flex';
    iframe.src='https://www.youtube.com/embed/9pvPxG1_r2E';
};
youClose.onclick=function () {
    youTube.style.display = 'none';
    iframe.src='';
};