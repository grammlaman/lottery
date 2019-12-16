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
    }
    if(!header.classList.contains('display-none')){
        let headerHeight = header.getClientRects()[0].height;
        if(scrolled<headerHeight){
            if(document.getElementById('participate')){
                part.classList.remove('scrolled-hide');
            }
            navBar.classList.remove('mob-scroll');
        }
        if(scrolled>=headerHeight){
            if (document.getElementById('participate')) {
                if(!part.classList.contains('scrolled-hide')) {
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
                    });
                }
            }
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
    loginHeadNav = document.getElementById('loginHeadNav'),
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
loginHead.onclick = loginHeadNav.onclick = function () {
    formShow(regEnter)
};
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
