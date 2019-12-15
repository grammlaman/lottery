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


let mainPage = document.querySelector('.mainPage');
let header = document.getElementById('header');
window.addEventListener('scroll', function(e) {
    let scrolled = window.pageYOffset;
    let navBar = document.getElementById('navigation'),
        part = document.getElementById('participate'),
        scrollF = document.getElementById('scroll-1'),
        scrollS = document.getElementById('scroll-2');
    if(mainPage.style.display != 'none'){
        let firstView = document.getElementById('first-view').getClientRects()[0].height,
            secondView = document.getElementById('second-view').getClientRects()[0].height;
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
    }
    if(header.style.display != 'none'){
        let headerHeight = header.getClientRects()[0].height;
        if(scrolled<headerHeight){
            part.classList.remove('scrolled-hide');
            navBar.classList.remove('mob-scroll');
        }
        if(scrolled>=headerHeight){
            if(!part.classList.contains('scrolled-hide')){
                part.classList.add('scrolled-hide');
                requestAnimationFrame(function () {
                    //* -- Анимация пунктов меню--*//
                    let tl = new TimelineMax();
                    tl.add(TweenMax.staggerFromTo('.navigation>li',0.8,
                        {y:'33px',scale:0,ease: "back.out(1.7)",},
                        {y:0,scale:1,ease: "back.out(1.7)"},.2));
                    tl.add(TweenMax.to('.navigation>li:last-child svg',0.8,
                        {fill:'#0071E3'}));
                    //* -- Анимация пунктов меню конец--*//
                });}
            if(!navBar.classList.contains('mob-scroll')){navBar.classList.add('mob-scroll');}
        }
    }
    if(!scrolled){
        header.classList.remove('head-scrolled');
    }
    if(scrolled){
        if(!header.classList.contains('head-scrolled')){header.classList.add('head-scrolled');}
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

function formShow(el){
    el.style.display = 'block';
    mainPage.style.display='none';
    header.style.display='none';
}
function formClose(el){
    el.style.display = 'none';
    mainPage.style.display='block';
    header.style.display='block';
}

let privacy = document.querySelector('.privacy');
let privacyLink = document.querySelector('.foot-privacy');
privacyLink.onclick = function(){formShow(privacy);};
let privClose = document.querySelector('.privacy-close');
privClose.onclick = function (){formClose(privacy);};




//* -- Форма регистрации --*//
let registration = document.querySelector('.reg');
let part = document.querySelectorAll('.part');
let regClose = document.querySelector('.reg-close');
for(let i = 0; i <= part.length; i++){
    let participate = part[i];
    if(participate){participate.onclick = function () {formShow(registration);}}
}
regClose.onclick = function () {
    formClose(registration)
};
let registrationPass = document.querySelector('.reg-pass'),
    registrationPassSub = document.getElementById('registration-submit'),
    registrationPassClose = document.querySelector('.reg-pass-close');
let registrationCard = document.querySelector('.reg-card'),
    registrationCardClose = document.querySelector('.reg-card-close'),
    registrationSub = document.getElementById('registration-sub'),
    registrationSuccess = document.querySelector('.priv-success'),
    registrationSuccessClose = document.querySelector('.priv-close');
registrationSub.onclick = function () {
    registration.style.display = 'none';
    registrationPass.style.display = 'block';
};
registrationPassClose.onclick = function () {
    formClose(registrationPass)
};
registrationPassSub.onclick = function () {
    registrationPass.style.display = 'none';
    registrationSuccess.style.display = 'block';
};
registrationSuccessClose.onclick = function () {
    formClose(registrationSuccess)
};
//* -- Форма регистрации конец --*//


//* -- Форма входа --*//
let loginHead = document.getElementById('loginHead'),
    loginHeadNav = document.getElementById('loginHeadNav'),
    loginHeadSubmit = document.getElementById('loginSubmit'),
    loginHeadClose = document.querySelector('.reg-enter-close'),
    loginHeadCancel = document.getElementById('loginCancel'),
    registrationEnter = document.querySelector('.reg-enter');

loginHead.onclick = loginHeadNav.onclick = function () {
    formShow(registrationEnter)
};
loginHeadClose.onclick = loginHeadCancel.onclick = loginHeadSubmit.onclick = function () {
    formClose(registrationEnter)
};
//* -- Форма входа конец--*//