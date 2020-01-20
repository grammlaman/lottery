
function query(el,doc = document) {return doc.querySelector(el);}
function queryAll(el,doc = document) {return doc.querySelectorAll(el);}
function getId(el,doc = document) {return doc.getElementById(el);}
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

    //* -- Объявление переменных выезжающего текста -- *//
    let animCollection = [];
    let animArr = queryAll('.anim');
    animArr.forEach(function (el) {
        let elObj = {
            elem : el,
            top : el.getBoundingClientRect().top,
            height : el.getBoundingClientRect().height
        };
        animCollection.push(elObj);
    });
    //* -- Анимация выезжающего текста -- *//
    let scrolledLoad = window.pageYOffset;
    function textAnimation() {
        if(window.pageYOffset) {
            if (!animCollection.length) return;
            animCollection.forEach(
                (el) => {
                    if((el.top - (window.innerHeight - 100)) < 0) {
                        TweenMax.staggerTo(el.elem.querySelectorAll('.gs'), .5, {y: 0, opacity: 1}, .3);
                    }

                }
            );
        }
    }
    textAnimation();
    //* -- Смена задних фонов -- *//
    let bgcArr = queryAll('.typycal');
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

    //* -- Кнопка скроллов при обновлении страницы -- *//
    if(document.getElementById('first-view')){
        if (scrolledLoad >= document.getElementById('first-view').getClientRects()[0].height){
            add(getId('scroll-1'));
        }
    }

    //* -- Анимация флагов на главной странице -- *//
    let statFlagsItem = queryAll('.statistic-row-item');
    let statFlagsItemCheck = false;
    if(statFlagsItem){
        function flagsAnimStart() {
            let example = window.innerWidth;
            statFlagsItem.forEach(function (el) {
                el.style.transform = 'translateX('+example+'px)';
                el.style.opacity = '1';
            });
            return statFlagsItem;
        }
        function requestAnimationFrame() {
            let example = window.innerWidth;
            let exMult = 1.5;
            let cnt = 2;
            if(example<500){cnt = 2}
            else if(example<1000){cnt = 3}
            else if(example<1440){cnt = 4}
            else {exMult = 2; cnt = 5}
            let tl = new TimelineMax({repeat:-1});
            tl.add(TweenMax.staggerTo(statFlagsItem,cnt*exMult,{x:-200,ease:'linear'},exMult));
        }
        if(statFlagsItem[0].getBoundingClientRect().top <= window.innerHeight - 250){
            statFlagsItemCheck = true;
            flagsAnimStart();
            requestAnimationFrame();
        }
    }
    //* -- Действия со скроллами -- *//
    let mainPage = query('.mainPage');
    let header = getId('header');
    window.addEventListener('scroll', function(e) {
        let scrolled = window.pageYOffset;
        let scrollF = getId('scroll-1'),
            scrollS = getId('scroll-2');
        if(!contains(header)){
            if(getId('first-view')) {
                let firstView = document.getElementById('first-view').getClientRects()[0].height,
                    mainView = document.getElementById('main-view').getClientRects()[0].height;
                if (scrolled >= firstView - 1) {
                    add(scrollF);
                    remove(scrollS);
                }
                if (scrolled < firstView - 1) {
                    remove(scrollF);
                    add(scrollS);
                }
                if (scrolled >= (mainView - 500)) {
                    add(scrollS,'scrolled-hide')
                }
                if (scrolled < (mainView - 500)) {
                    remove(scrollS,'scrolled-hide')
                }
            }
            let headerHeight = header.getClientRects()[0].height;
            if(scrolled<headerHeight) {
                remove(header,'head-scrolled');
            } else if (!contains(header,'head-scrolled')){
                add(header,'head-scrolled');
            }
        }
        if(!animCollection.length) return;
        if((scrolled - scrolledLoad) >= (animCollection[0].top - (window.innerHeight - 100))){
            TweenMax.staggerTo(animCollection[0].elem.querySelectorAll('.gs'),.5,{y:0,opacity:1},.3);
            animCollection.shift();
        }
        let statFlagsItem = queryAll('.statistic-row-item');
        if(statFlagsItem){
            if(!statFlagsItemCheck){
                if(scrolled >= statFlagsItem[0].getBoundingClientRect().top){
                    statFlagsItemCheck = true;
                    flagsAnimStart()
                    requestAnimationFrame();
                }
            }
        }

        let firstViewOpacity = 1;
        if(scrolled == 0){
            firstViewOpacity = 1
        }
        if(scrolled >= 100){
            firstViewOpacity = 0.5
        }
        if(scrolled >= 200){
            firstViewOpacity = 0.2
        }
        if(scrolled >= 300){
            firstViewOpacity = 0.05
        }
        if(scrolled >= 400){
            firstViewOpacity = 0
        }
        firstView = document.querySelector('#first-view');
        firstView.querySelector('img').style.opacity = firstViewOpacity;
        firstView.querySelector('h1').style.opacity = firstViewOpacity;

    });

    //* -- Кнопки переходов и показа форм -- *//
    function close (){
        if(youTube){
            add(youTube);iframe.src='';
        }
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
    formClose.forEach(function (el) {
        el.onclick = close;
    });
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
    regBut.forEach(function(el){
        el.onclick = function(){
            formShow(regForm);
            remove(regFirstPage)
        }
    });
    regSub.onclick = function(){
        add(regFirstPage);
        remove(regSecondPage)
    };
    regPassSub.onclick = function(){
        add(regForm);
        add(regSecondPage);
        remove(privSuccess)
    };
    //* -- Форма входа --*//
    let loginHead = getId('loginHead'),
        forgotBut = getId('reg-login-forgot'),
        regForgot = query('.reg-forgot'),
        regEnter = query('.reg-enter');
    if(loginHead){
        loginHead.onclick = function(){
            formShow(regEnter)
        };
    }
    forgotBut.onclick = function(){
        add(regEnter);
        remove(regForgot)
    };
    //* -- Privacy Policy --*//
    let priv = query('.privacy-page'),
        privLink = query('.foot-privacy');
    privLink.onclick = function(){
        close();
        formShow(priv);
    };
    //* -- Футер термс --*//
    let footTerms = query('.foot-terms'),
        termsPage = query('.terms-page');
    footTerms.onclick = function(){
        close();
        formShow(termsPage);
    };
    //* -- Become a Participant -- *//
    let footPart = query('.foot-partner'),
        partnerPage = query('.partner-page'),
        partSub = query('.partner-button'),
        terms = query('.terms'),
        termsSub = query('#termsSubmit'),
        termsDec = query('#termsDecline');
    footPart.onclick = function(){
        close();
        formShow(partnerPage);
    };
    partSub.onclick = function(){
        add(partnerPage);
        formShow(terms)
    };
    termsSub.onclick = function(){
        add(terms);
        remove(regForm);
        remove(regFirstPage);
    };
    termsDec.onclick = close;

    //* -- Кабинет выпадающий список --*//
    let cabBut = getId('cabinet-button');
    if(cabBut){
        cabBut.onclick = function(){
            let cabList = query('.cabinet-list');
            toggle(cabList,'cabinet-hidden');
        };
    }

    //* -- Переключения Методов на странице кабинета --*//
    let cabObj = {
        form : [query('.main-method'),query('.ref-method'),query('.aff-method'),query('.con-method')],
        but : [queryAll('.main-method-link'),queryAll('.ref-method-link'),queryAll('.aff-method-link'),queryAll('.con-method-link')],
        Close : function () {
            this.form.forEach(function (el) {
                add(el)
            })
        }
    };
    for(let i = 0; i < 4; i++){
        cabObj.but[i].forEach(function (el) {
            el.onclick = function () {
                cabObj.Close();
                remove(cabObj.form[i])
            }
        })
    }

    let timerCheck = false;
    //* -- Отсчет --*//
    function timer(){
        let countHour = query('.count-span-hour');
        let countMin = query('.count-span-minute');
        let countSec = query('.count-span-second');
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
                    if(hour.textContent < 10){
                        hour.textContent = '0' + hour.textContent
                    }
                }
            }
            if((hour.textContent == 0)&&(min.textContent == 0)&&(sec.textContent == 0)){
                return timerCheck = true;
            }
        }
        setInterval(function(){
            if(!timerCheck){
                CountSec(countSec,countMin,countHour)
            }
        },1000);
    }
    if(query('.count-span-second')){
        timer();
    }
    //* -- Отсчет конец --*//
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
        setInterval(function(){
           if(!timerCheck){
               nextRandom()
           }
        }, 2500);
    }

    //* -- Выбор страны -- *//
    let country = query('.reg-datalist'),
        countryOpened = false,
        cashed = false,
        countryList = query('.reg-country-list');
    let countryListItems = [],
        countryNewList = [];
    function countryListToggle(){
        let countryList = query('.reg-country-list');
        if(!cashed){
            let outList = '', items = countryList.querySelectorAll('li');
            items.forEach(function (el) {
                let li = `
                    <li>
                        <button type="button" data-value="${el.dataset.value}">
                            <img src="img/flags/${el.dataset.img}" class="lazyload" alt="">
                            <span>${el.dataset.country}</span>
                        </button>
                    </li>
                `;
                outList+= li;
            });
            countryList.innerHTML = outList;
            countryListItems = countryList.querySelectorAll('li');
            cashed = true;
        }
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
    country.querySelector('input').addEventListener('keyup',function (e) {
        if(e.keyCode === 40){
            countryList.children[0].querySelector('button').focus();
        }
    });
    countryList.addEventListener('keyup',function (e) {
        let elem = document.activeElement,
            nextLi = '',
            outLi = elem.parentNode;
        if(e.keyCode === 40){
            if(!outLi.nextElementSibling) return;
            nextLi = outLi.nextElementSibling;
        }
        if(e.keyCode === 38){
            if(!outLi.previousElementSibling) return;
            nextLi = outLi.previousElementSibling;
        }
        if(nextLi)
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

    //* -- Анимация главного экрана -- *//
    let mainAnim = {
        item : query('.mainview'),
        checked : false
        };
    if(mainAnim.item){
        if(mainAnim.checked !== true){
            TweenMax.to(mainAnim.item.querySelectorAll('.gsm')[0],3,{scale:1,opacity:1});
            TweenMax.to(mainAnim.item.querySelectorAll('.gsm')[1],2,{delay:1,scale:1,opacity:1});
            mainAnim.checked = true;
        }
    }




};
