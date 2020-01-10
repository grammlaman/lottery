
function query(el) {return document.querySelector(el);}
function queryAll(el) {return document.querySelectorAll(el);}
function getId(el) {return document.getElementById(el);}
function add(el,cls = 'display-none') {el.classList.add(cls)}
function remove(el,cls = 'display-none') {el.classList.remove(cls)}
function toggle(el,cls = 'display-none') {el.classList.toggle(cls)}
function contains(el,cls = 'display-none') {return el.classList.contains(cls)}

window.onload = function () {

    //* -- Выбор языка -- *//
    let pageSelect = query('.page-select');
    pageSelect.onclick = function() {
        if(!contains(pageSelect,'open')){add(pageSelect,'open');}
        else{remove(pageSelect,'open');}
    };
    let fixed = query('.mob-fixed');

    //* -- Объявление переменных выезжающего текста -- *//
    let bgcArr = queryAll('.typycal'),
        bgcCollection = [];
    let programmBlock = query('.program');
    bgcCollection.push({
        elem : programmBlock,
        top : programmBlock.getBoundingClientRect().top,
        height : programmBlock.getBoundingClientRect().height
    });
    let countBlock = query('.count');
    bgcCollection.push({
        elem : countBlock,
        top :countBlock.getBoundingClientRect().top,
        height : countBlock.getBoundingClientRect().height
    });
    let statisticBlock = query('.statistic');
    bgcCollection.push({
        elem : statisticBlock,
        top : statisticBlock.getBoundingClientRect().top,
        height : statisticBlock.getBoundingClientRect().height
    });
    bgcArr.forEach(function (el) {
        let elObj = {
            elem : el,
            top : el.getBoundingClientRect().top,
            height : el.getBoundingClientRect().height
        };
        bgcCollection.push(elObj);
    });

    //* -- Смена задних фонов -- *//
    function changeBGC() {
        bgcArr.forEach(function (el) {
            let cls = el.getAttribute('data-class'),
                clsBgc = el.getAttribute('data-change');
            if(el.classList.contains(clsBgc)){
                el.classList.remove(clsBgc);
                el.classList.add(cls);
                let elArr = el.querySelector('.typycal-one');
                elArr.style.animation = 'fade-zoom-in-image 3s forwards cubic-bezier(0.645, 0.045, 0.355, 1)';
                setTimeout(function () {
                    elArr.style.animation = '';
                }, 3000);
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
    setInterval(changeBGC,10000);

    //* -- Действия со скроллами -- *//
    let mainPage = query('.mainPage');
    let header = getId('header');
    window.addEventListener('scroll', function(e) {
        let scrolled = window.pageYOffset;
        let scrollF = document.getElementById('scroll-1'),
            scrollS = document.getElementById('scroll-2');
        if(!header.classList.contains('display-none')){
            if(document.getElementById('first-view')) {
                let firstView = document.getElementById('first-view').getClientRects()[0].height,
                    mainView = document.getElementById('main-view').getClientRects()[0].height;
                if (scrolled >= firstView - 1) {
                    scrollF.classList.add('display-none');
                    scrollS.classList.remove('display-none')
                }
                if (scrolled < firstView - 1) {
                    scrollF.classList.remove('display-none');
                    scrollS.classList.add('display-none')
                }
                if (scrolled >= (mainView - 500)) {
                    scrollS.classList.add('scrolled-hide')
                }
                if (scrolled < (mainView - 500)) {
                    scrollS.classList.remove('scrolled-hide')
                }
            }
            let headerHeight = header.getClientRects()[0].height;
            if(scrolled<headerHeight) {
                header.classList.remove('head-scrolled');
            } else if (!header.classList.contains('head-scrolled')){header.classList.add('head-scrolled');}
        }

        //* -- Анимация выезжающего текста -- *//
        if(bgcCollection.length > 0){
            if((scrolled >= (bgcCollection[0].top - (window.innerHeight - 100)))){
                TweenMax.staggerFromTo(bgcCollection[0].elem.querySelectorAll('.gs'),.8, {y:-80,opacity:0},{y:0,opacity:1},.3)
                bgcCollection.shift();
            }
        }
    });

    //* -- Кнопки переходов и показа форм -- *//
    function close (){
        if(youTube){add(youTube);iframe.src='';}
        let arr= [regForm,regEnter,regForgot,priv,privSuccess,terms,partnerPage,termsPage];
        for(let i = 0; i < arr.length; i++){
            add(arr[i]);
        }
        remove(header);
        remove(mainPage);
    }
    function formShow(el){
        if(!contains(mainPage)){
            add(mainPage);
            add(header)
        }
        remove(el)
    }
    //* -- Кнопка закрытия -- *//
    let formClose = queryAll('.close-form');
    formClose.forEach(function (el) {el.onclick = close;});
    //* -- Видео YouTube --*//
    let youBut = query('.mainview-video'),
        youTube = query('.youtube'),
        iframe = query('iframe');
    if(youBut){
        youBut.onclick = function () {
            remove(youTube);
            iframe.src='https://www.youtube.com/embed/9pvPxG1_r2E';
        };
    }
    //* -- Форма регистрации --*//
    let regBut = queryAll('.part'),
        regForm = query('.reg-form'),
        regSub = getId('registration-sub'),
        regFirstPage = query('.reg-first-page');
    let regSecondPage = query('.reg-second-page'),
        regPassSub = getId('registration-submit');
    let privSuccess = query('.priv-success');
    regBut.forEach(function(el){el.onclick = function(){formShow(regForm);remove(regFirstPage)}});
    regSub.onclick = function(){add(regFirstPage);remove(regSecondPage)};
    regPassSub.onclick = function(){add(regForm);add(regSecondPage);remove(privSuccess)};
    //* -- Форма входа --*//
    let loginHead = getId('loginHead'),
        forgotBut = getId('reg-login-forgot'),
        regForgot = query('.reg-forgot'),
        regEnter = query('.reg-enter');
    if(loginHead){loginHead.onclick = function () {formShow(regEnter)};}
    forgotBut.onclick = function(){add(regEnter);remove(regForgot)};
    //* -- Privacy Policy --*//
    let priv = query('.privacy-page'),
        privLink = query('.foot-privacy');
    privLink.onclick = function(){close();formShow(priv);};
    //* -- Футер термс --*//
    let footTerms = query('.foot-terms'),
        termsPage = query('.terms-page');
    footTerms.onclick = function(){close();formShow(termsPage);};
    //* -- Become a Participant -- *//
    let footPart = query('.foot-partner'),
        partnerPage = query('.partner-page'),
        partSub = query('.partner-button'),
        terms = query('.terms'),
        termsSub = query('#termsSubmit'),
        termsDec = query('#termsDecline');
    footPart.onclick = function(){close();formShow(partnerPage);};
    partSub.onclick = function(){add(partnerPage);formShow(terms)};
    termsSub.onclick = function(){add(terms);remove(regForm);remove(regFirstPage);};
    termsDec.onclick = close;

    //* -- Кабинет выпадающий список --*//
    let cabBut = getId('cabinet-button');
    if(cabBut){
        cabBut.onclick = function(){
            let cabList = query('.cabinet-list');
            toggle(cabList,'cabinet-hidden');};}

    //* -- Переключения Методов на странице кабинета --*//
    let mainMethodForm = query('.main-method'),
        refPartnerForm = query('.ref-method'),
        affPartnerForm = query('.aff-method'),
        conPartnerForm = query('.con-method'),
        mainMethodBut = queryAll('.main-method-link'),
        affPartnerBut = queryAll('.aff-method-link'),
        conPartnerBut = queryAll('.con-method-link'),
        refMethodBut = queryAll('.ref-method-link');
    function methodClose(){add(refPartnerForm);add(affPartnerForm);add(conPartnerForm);add(mainMethodForm)}
    function methodSelect(el,elForm){
        el.forEach(function (el) {
            el.onclick = function () {
                methodClose();
                let form = elForm;
                remove(form)
            }
        })
    }
    methodSelect(mainMethodBut,mainMethodForm);
    methodSelect(refMethodBut,refPartnerForm);
    methodSelect(affPartnerBut,affPartnerForm);
    methodSelect(conPartnerBut,conPartnerForm);

    //* -- Рандомайзер --*//
    let random = query('.count-random');
    let randomInt = 0;
    let currentInt = 0;
    function getRandomInt() {
        let step = Math.round((randomInt - currentInt) / 20);
        if (randomInt > currentInt && step === 0){
            step = 1;
        } else if (randomInt < currentInt && step === 0){
            step = -1;
        }
        currentInt += step;
        let res = currentInt.toString();
        for (let i = res.length - 6; i < 0; i++){
            res = "0" + res;
        }
        return res;
    }
    function nextRandom(){
        randomInt = Math.round(Math.random() * 100000);
    }
    if (random) {
        setInterval(function(){random.textContent = getRandomInt()});
        setInterval(function(){nextRandom()}, 2500);
    }
    //* -- Отсчет --*//
    let countHour = query('.count-span-hour');
    let countMin = query('.count-span-minute');
    let countSec = query('.count-span-second');
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
        setInterval(function(){CountSec(countSec,countMin,countHour)},1000);
    }
    //* -- Отсчет конец --*//

    //* -- Выбор страны -- *//
    let country = query('.reg-datalist'),
        countryOpened = false,
        countryList = query('.reg-country-list');
    function countryListToggle(){
        let countryList = query('.reg-country-list');
        if(!contains(countryList,'reg-country-list-active')){
            add(countryList,'reg-country-list-active');
        }
        else{remove(countryList,'reg-country-list-active'); countryOpened = false}
    }
    if(country){
        country.onclick = countryListToggle;
    }
    countryList.addEventListener('click',function (e) {
        let element = e.target;
        if(!(element.tagName == "BUTTON") ){
            while(element.tagName != 'BUTTON'){
                element = element.parentNode;
            }
        }
        let listImg = element.querySelector('img'),
            img = country.querySelector('img'),
            input = country.querySelector('input');
        img.setAttribute('src',listImg.getAttribute('src'));
        input.setAttribute('data-value',element.getAttribute('data-value'));
        input.value = element.querySelector('span').textContent;
        if(contains(countryList,'reg-country-list-active')){
            remove(countryList,'reg-country-list-active')
        }
        let countryShowCont = query('.reg-country');
        add(countryShowCont,'success');
    });
    let countryListItems = countryList.querySelectorAll('li'),
        countryNewList = [];
    country.querySelector('input').addEventListener('keyup',function (e) {
        if(e.keyCode === 40){
            countryList.children[0].querySelector('button').focus();
        }
    });
    countryList.addEventListener('keyup',function (e) {
        let elem = document.activeElement,
            outLi = elem.parentNode;
        if(e.keyCode === 40){
            if(!outLi.nextElementSibling) return;
            nextLi = outLi.nextElementSibling;
        }
        if(e.keyCode === 38){
            if(!outLi.previousElementSibling) return;
            nextLi = outLi.previousElementSibling;
        }
        nextLi.querySelector('button').focus();
    });
    country.querySelector('input').addEventListener('input',function (e) {
        let inputValue = this.value;
        if(!countryOpened){
            if(!contains(countryList,'reg-country-list-active')){
                add(countryList,'reg-country-list-active');
            }
        }
        countryOpened = true;
        countryNewList = [];
        countryListItems.forEach(function (li) {
            let span = li.querySelector('span'),
                str = ''+span.textContent,
                finded = str.search(inputValue);
            if(finded > -1){
                countryNewList.push(li);
            }
        });
        countryList.innerHTML = '';
        countryNewList.forEach(function(li){
            countryList.append(li);
        });
        let img = country.querySelector('img');
        img.setAttribute('src','');
    });
};
