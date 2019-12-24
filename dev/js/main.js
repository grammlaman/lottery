let pageSelect = document.querySelector('.page-select');
pageSelect.onclick = function() {
    if(!pageSelect.classList.contains('open')){pageSelect.classList.add('open');return}
    if(pageSelect.classList.contains('open')){pageSelect.classList.remove('open');}};
let fixed = document.querySelector('.mob-fixed');

window.onload = function () {
    setInterval('changeBGC()',5000);
};
function changeBGC() {
    let arr = document.querySelectorAll('.typycal');
    arr.forEach(function (el) {
        let cls = el.getAttribute('data-class'),
            clsBgc = el.getAttribute('data-change');
        if(el.classList.contains(clsBgc)){
            el.classList.remove(clsBgc);
            el.classList.add(cls);
            let elArr = el.querySelector('.typycal-one');
            elArr.style.animation = 'fade-zoom-in-image 3s forwards cubic-bezier(0.645, 0.045, 0.355, 1)';
            setTimeout(function () {
                elArr.style.animation = '';
            }, 3000)
        }
        else{
            el.classList.remove(cls);
            el.classList.add(clsBgc);
            let elArr = el.querySelector('.typycal-two');
            elArr.style.animation = 'fade-zoom-in-image 3s forwards cubic-bezier(0.645, 0.045, 0.355, 1)';
            setTimeout(function () {
                elArr.style.animation = '';
            }, 3000)
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
    if(!header.classList.contains('display-none')){
        if(document.getElementById('first-view')) {
            let firstView = document.getElementById('first-view').getClientRects()[0].height,
                secondView = document.getElementById('second-view').getClientRects()[0].height;
            if (scrolled >= firstView - 1) {
                scrollF.classList.add('display-none');
                scrollS.classList.remove('display-none')
            }
            if (scrolled < firstView - 1) {
                scrollF.classList.remove('display-none');
                scrollS.classList.add('display-none')
            }
            if (scrolled >= (secondView + 150)) {
                scrollS.classList.add('scrolled-hide')
            }
            if (scrolled < (secondView + 150)) {
                scrollS.classList.remove('scrolled-hide')
            }
        }
        let headerHeight = header.getClientRects()[0].height;
        if(scrolled<headerHeight) {
            header.classList.remove('head-scrolled');
        } else if (!header.classList.contains('head-scrolled')){header.classList.add('head-scrolled');}
        //     if(document.getElementById('participate')){
        //         part.classList.remove('scrolled-hide');
        //     }
        //     navBar.classList.remove('mob-scroll');
        // }
        // if(scrolled>=headerHeight){
        //     if (document.getElementById('participate')) {
        //         if(!part.classList.contains('scrolled-hide')) {
        //             part.classList.add('scrolled-hide');
        //             requestAnimationFrame(function () {
        //                 //* -- Анимация пунктов меню--*//
        //                 let tl = new TimelineMax();
        //                 tl.add(TweenMax.staggerFromTo('.navigation>li',0.8,
        //                     {y:'33px',scale:0,ease: "back.out(1.7)",},
        //                     {y:0,scale:1,ease: "back.out(1.7)"},.2));
        //                 tl.add(TweenMax.to('.navigation>li:last-child svg',0.8,
        //                     {fill:'#0071E3'}));
        //                 //* -- Анимация пунктов меню конец--*//
        //             });
        //         }
        //     }
        //     if(!navBar.classList.contains('mob-scroll')){navBar.classList.add('mob-scroll');}
    }
});


//* -- Видео YouTube --*//
let youBut = document.querySelector('.mainview-video'),
    youTube = document.querySelector('.youtube'),
    iframe = document.querySelector('iframe');
//* -- Privacy Policy --*//
let priv = document.querySelector('.privacy');
let privLink = document.querySelector('.foot-privacy');
//* -- Форма регистрации --*//
let reg = document.querySelector('.reg-form'),
    regFirstPage = document.querySelector('.reg-first-page');
    regBut = document.querySelectorAll('.part');
let regSecondPage = document.querySelector('.reg-second-page'),
    regPassSub = document.getElementById('registration-submit');
let regSub = document.getElementById('registration-sub'),
    privSuccess = document.querySelector('.priv-success');
//* -- Форма входа --*//
let loginHead = document.getElementById('loginHead'),
    loginReg = document.getElementById('loginReg'),
//    loginHeadNav = document.getElementById('loginHeadNav'),
    forgotBut = document.getElementById('reg-login-forgot'),
    forgotSub = document.getElementById('forgotPassword'),
    regForgot = document.querySelector('.reg-forgot'),
    regEnter = document.querySelector('.reg-enter');
//* -- Кнопка закрытия -- *//
let formClose = document.querySelectorAll('.close-form');


function close (){
    if(youTube){
        youTube.classList.add('display-none');
        iframe.src='';
    }
    reg.classList.add('display-none');
    regEnter.classList.add('display-none');
    regForgot.classList.add('display-none');
    priv.classList.add('display-none');
    privSuccess.classList.add('display-none');
    header.classList.remove('display-none');
    mainPage.classList.remove('display-none');
}

formClose.forEach(function (el) {
    el.onclick = close;
});
forgotSub.onclick = close;


function formShow(el){
    close();
    mainPage.classList.add('display-none');
    header.classList.add('display-none');
    el.classList.remove('display-none');
}


//* -- Видео YouTube --*//
if(youBut){
    youBut.onclick = function () {
        youTube.classList.remove('display-none');
        iframe.src='https://www.youtube.com/embed/9pvPxG1_r2E';
    };
}
//* -- Видео YouTube Конец --*//

//* -- Privacy Policy --*//
privLink.onclick = function(){formShow(priv);};
//* -- Privacy Policy Конец --*//

//* -- Форма регистрации --*//
regBut.forEach(function (el) {
    if(el) {
        el.onclick = function () {
            formShow(reg);
            regFirstPage.classList.remove('display-none');
        }
    }
});
regSub.onclick = function () {
    regFirstPage.classList.add('display-none');
    regSecondPage.classList.remove('display-none');
};
regPassSub.onclick = function () {
    reg.classList.add('display-none');
    regSecondPage.classList.add('display-none');
    privSuccess.classList.remove('display-none');
};
//* -- Форма регистрации Конец --*//

//* -- Форма входа --*//
if(loginHead){
    loginHead.onclick = function () {
        formShow(regEnter)
    };
}

if(loginReg){
    loginReg.onclick = function () {
        close();
        formShow(reg);
        regFirstPage.classList.remove('display-none');
    };
}
forgotBut.onclick = function(){
    regEnter.classList.add('display-none');
    regForgot.classList.remove('display-none');
};
//* -- Форма входа конец--*//



//* -- Методы --*//
let mainMethodForm = document.querySelector('.main-method'),
    refPartnerForm = document.querySelector('.ref-method'),
    affPartnerForm = document.querySelector('.aff-method'),
    conPartnerForm = document.querySelector('.con-method'),
    mainMethodBut = document.querySelectorAll('.main-method-link'),
    affPartnerBut = document.querySelectorAll('.aff-method-link'),
    conPartnerBut = document.querySelectorAll('.con-method-link'),
    refMethodBut = document.querySelectorAll('.ref-method-link');



function closeCabinet(){
    refPartnerForm.classList.add('display-none');
    affPartnerForm.classList.add('display-none');
    conPartnerForm.classList.add('display-none');
    mainMethodForm.classList.add('display-none');
}
mainMethodBut.forEach(function (el) {
    el.onclick = function () {
        closeCabinet();
        mainMethodForm.classList.remove('display-none');
    }
});

refMethodBut.forEach(function (el) {
    el.onclick = function () {
        closeCabinet();
        refPartnerForm.classList.remove('display-none');
    };
});

affPartnerBut.forEach(function (el) {
    el.onclick = function () {
        closeCabinet();
        affPartnerForm.classList.remove('display-none');
    };
});

conPartnerBut.forEach(function (el) {
    el.onclick = function () {
        closeCabinet();
        conPartnerForm.classList.remove('display-none');
    };
});

//* -- Рандомайзер --*//
let random = document.querySelector('.count-random');
function getRandomInt() {
    let res = Math.round(Math.random() * 100000);
    if(res > 9999){res = '0' + res;}
    else if(res > 999){res = '00' + res;}
    else if(res > 99){res = '000' + res;}
    else if(res > 9){res = '0000' + res;}
    else {res = '00000' + res;}
    return res;}
if(random){setInterval('random.textContent = getRandomInt()',500);}
//* -- Отсчет --*//
let countHour = document.querySelector('.count-span-hour');
let countMin = document.querySelector('.count-span-minute');
let countSec = document.querySelector('.count-span-second');
if(countSec){
    function CountSec(sec,min,hour) {
        if (parseInt(sec.textContent) != 0){
            sec.textContent -= 1;
            if(sec.textContent < 10){
                sec.textContent = '0' + sec.textContent;
            }
        } else {
            sec.textContent = 59;
            min.textContent -= 1;
            if(parseInt(min.textContent) <= 9){
                min.textContent = '0' + min.textContent;
            }
            if((min.textContent.length) == 3){
                min.textContent = 59;
                hour.textContent -= 1;
            }
        }
    }
    setInterval('CountSec(countSec,countMin,countHour)',1000);
}
//* -- Отсчет конец --*//


