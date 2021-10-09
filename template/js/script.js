$("document").ready(function () {
  /*
jQuery Masked Input Plugin
Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
  /*jQuery Masked Input Plugin END*/

  fancyLang = {
    lang: "ru",
    i18n: {
      ru: {
        CLOSE: "Закрыть",
        NEXT: "Далее",
        PREV: "Назад",
        ERROR: "Не удается загрузить ресурс",
        PLAY_START: "Запустить слайдшоу",
        PLAY_STOP: "Пауза",
        FULL_SCREEN: "На полный экран",
        THUMBS: "Превью",
        DOWNLOAD: "Скачать",
        SHARE: "Поделиться",
        ZOOM: "Масштаб",
      },
    },
  };

  $("input[name=t]").mask("+7 (999) 999-9999");

  if ($(".ymap")) {
    $(".ymap").each(function (i) {
      var id = "map-" + i;
      $(this).attr("id", id);
      renderMap(
        id,
        $(this).attr("data-coord"),
        $(this).attr("data-content"),
        $(this).attr("data-hint")
      );
    });
  }

  function renderMap(id, coord, content, hint) {
    ymaps.ready(function () {
      coordBallun = coord.split(",");

      coordCenter = coord.split(",");
      coordCenter[1] = parseFloat(coordCenter[1]) + 0.002;

      var myMap = new ymaps.Map(
        id,
        {
          center: coordCenter,
          zoom: 15,
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

      //Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; width: 176px; text-align: center; font-size: 14px; font-family: Conv_GothamProRegular; white-space:nowrap"><i class="icon-palma"></i> <span>$[properties.iconContent]</span></div>'
      );

      myPlacemarkWithContent = new ymaps.Placemark(
        coordBallun,
        {
          hintContent: "",
          balloonContent: hint,
          iconContent: content,
        },
        {
          iconLayout: "default#imageWithContent",
          iconImageHref: "/template/i/point.png",
          iconImageSize: [206, 50],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-27, -50],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [8, 8],
          iconContentLayout: MyIconContentLayout,
        }
      );

      myMap.geoObjects.add(myPlacemarkWithContent);
    });
  }
  /* common form sender */

  /* protect */
  $(".form__protect").val("19X84-lider");

  $(".js-form-submit").on("submit", function () {
    var form = $(this);
    var error = $(this).parent().find(".form__error");
    var success = $(this).parent().find(".form__success");
    var url = $(this).attr("action");
    var submit = $(".form__submit", this);

    error.hide();
    success.hide();
    submit.prop("disable", true);

    $.ajax({
      url: url,
      type: "post",
      data: $(this).serialize(),
      dataType: "json",
      success: function (response) {
        if (response.status == "success") {
          error.hide();
          submit.prop("disable", false);
          form.slideUp(300, function () {
            success.slideDown();
          });
          setTimeout(function () {
            $.fancybox.close();
            form.slideDown();
            success.hide();
          }, 10000);
        } else {
          error.show();
        }
      },
    }).fail(function (response) {
      error.show();
      console.log(response);
    });

    return false;
  });
  /* sticky */
  // stickyNav = function (navbar, minWidth) {
  //     navbar = document.querySelector(navbar);
  //     sticky = navbar.offsetTop;
  //     minWidth = minWidth ? minWidth : 768;

  //     function onScroll() {
  //         if (sticky == 0) { sticky = navbar.offsetTop}
  //         windowWinth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //         if ((window.pageYOffset >= sticky) && (windowWinth > minWidth)) {

  //             navbar.classList.add("sticky");
  //         } else {
  //             navbar.classList.remove("sticky");
  //         }
  //     }

  //     document.addEventListener('scroll', onScroll);
  // }
  // stickyNav('.header-bottom', 769);

  /* fancybox */
  $(".fancybox").fancybox(fancyLang);
});

var wrappers_AniHeader = document.querySelectorAll(".ani-header");
if (wrappers_AniHeader) {
  wrappers_AniHeader.forEach((element) => {
    element.innerHTML = element.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
  });
}
var wrappers_AniText = document.querySelectorAll(".ani-text");
if (wrappers_AniText) {
  wrappers_AniText.forEach((element) => {
    element.innerHTML = element.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
  });
}

var currentImageAnimationSection = null;
var currentImageAnimationPosition = null;
var bottleTimeouts = [];
var slideTimeouts = [];

function setCurrentImageAnimationPosition(position){
  currentImageAnimationPosition = position
}

function getCurrentImageAnimationPosition(){
  return currentImageAnimationPosition
}

function setCurrentImageAnimationSection(section){
  currentImageAnimationSection = section
}

function getCurrentImageAnimationSection(){
  return currentImageAnimationSection
}

function clearCurrentImageAnimationSection(){
  switch(getCurrentImageAnimationPosition()){
    case 0:{
      getCurrentImageAnimationSection().querySelector('img').classList.remove('aos-animate');
      break;
    }
    case 1:{
      getCurrentImageAnimationSection().querySelector('.image-border').classList.remove('aos-animate');
      break;
    }
    case 2:{
      bottleTimeouts.forEach(timeout=>{
        clearTimeout(timeout)
      })
      bottleTimeouts = []
      getCurrentImageAnimationSection().querySelectorAll('.collection-item-img').forEach(image=>{
        image.classList.remove('aos-animate')
      });
      break;
    }
    case 3:{
      getCurrentImageAnimationSection().querySelectorAll('.production-item-imgages').forEach(image=>{
        image.classList.remove('aos-animate')
      });
      break;
    }
    case 4:{
      slideTimeouts.forEach(timeout=>{
        clearTimeout(timeout)
      })
      slideTimeouts = []
      getCurrentImageAnimationSection().querySelectorAll('.slider-item').forEach(slide=>{
        slide.classList.remove('aos-animate')
      })
    }
  }
}

new fullScroll({
  mainElement: "main",
  menuElement: ".main-nav ul",
  displayDots: false,
  dotsPosition: "left",
  animateTime: 0.7,
  animateFunction: "ease",
  onChangeCurrentPosition: function (e) {
    let elements = e.defaults.container.children;
    let currentSection = elements.item(e.defaults.currentPosition);
    if(getCurrentImageAnimationSection() != null){
      clearCurrentImageAnimationSection()
    }
    setTimeout(()=>{
      if(e.defaults.currentPosition == 0){
        setCurrentImageAnimationSection(currentSection);
        setCurrentImageAnimationPosition(e.defaults.currentPosition)
        currentSection.querySelector('img').classList.add('aos-animate')
      } else if(e.defaults.currentPosition == 1){
        setCurrentImageAnimationSection(currentSection);
        setCurrentImageAnimationPosition(e.defaults.currentPosition)
        currentSection.querySelector('.image-border').classList.add('aos-animate')
      } else if(e.defaults.currentPosition == 2){
        setCurrentImageAnimationSection(currentSection);
        setCurrentImageAnimationPosition(e.defaults.currentPosition)
        currentSection.querySelectorAll('.collection-item-images').forEach(images=>{
          let time = 0
          for(let i = 2; i>=0; i--){
            let timeout = setTimeout(()=>{
              images.querySelectorAll('.collection-item-img')[i].classList.add('aos-animate')
            }, time)
            bottleTimeouts.push(timeout)
            time+=700
          }
        })
      } else if(e.defaults.currentPosition == 3){
        setCurrentImageAnimationSection(currentSection);
        setCurrentImageAnimationPosition(e.defaults.currentPosition)
        currentSection.querySelectorAll('.production-item-imgages').forEach(image=>{
          image.classList.add('aos-animate')
        })
      } else if(e.defaults.currentPosition == 4){
        setCurrentImageAnimationSection(currentSection);
        setCurrentImageAnimationPosition(e.defaults.currentPosition)
        let time = 0
        currentSection.querySelectorAll('.slider-item').forEach(slide=>{
          let timeout = setTimeout(()=>{
            slide.classList.add('aos-animate');
          }, time)
          slideTimeouts.push(timeout)
          time+=100
        })
      }
    }, 700)
    if(e.defaults.currentPosition != 5){
      anime.timeline({ loop: false }).add({
        targets: currentSection.querySelectorAll(".ani-text .letter"),
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 260,
        delay: (el, i) => 55 + 3 * i,
      });
    }
    anime.timeline({ loop: false }).add({
      targets: currentSection.querySelectorAll(".ani-header .letter"),
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1300,
      delay: (el, i) => 550 + 30 * i,
    });
  },
  onLoad: function(e){
    let elements = e.defaults.container.children;
    let currentSection = elements.item(e.defaults.currentPosition);
    if(e.defaults.currentPosition == 0){
      setCurrentImageAnimationSection(currentSection);
      setCurrentImageAnimationPosition(e.defaults.currentPosition)
      currentSection.querySelector('img').classList.add('aos-animate')
    } else if(e.defaults.currentPosition == 1){
      setCurrentImageAnimationSection(currentSection);
      setCurrentImageAnimationPosition(e.defaults.currentPosition)
      currentSection.querySelector('.image-border').classList.add('aos-animate')
    } else if(e.defaults.currentPosition == 2){
      setCurrentImageAnimationSection(currentSection);
      setCurrentImageAnimationPosition(e.defaults.currentPosition)
      currentSection.querySelectorAll('.collection-item-images').forEach(images=>{
        let time = 0
        for(let i = 2; i>=0; i--){
          let timeout = setTimeout(()=>{
            images.querySelectorAll('.collection-item-img')[i].classList.add('aos-animate')
          }, time)
          bottleTimeouts.push(timeout)
          time+=700
        }
      })
    } else if(e.defaults.currentPosition == 3){
      setCurrentImageAnimationSection(currentSection);
      setCurrentImageAnimationPosition(e.defaults.currentPosition)
      currentSection.querySelectorAll('.production-item-imgages').forEach(image=>{
        image.classList.add('aos-animate')
      })
    }
  }
});



// carousel

$(".owl-carousel.collection-slider").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: false,
  autoplay: false,
  autoplayTimeout: 5000,
  responsive: {
    0: {
      items: 1,
    },
  },
});
//custom nav //

createNavForSlider(".owl-carousel.collection-slider");

// end custom nav //

$(".owl-carousel.slider-items").owlCarousel({
  loop: true,
  margin: 0,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 2,
    },
    576:{
      items: 3,
    },
    768:{
      items: 4,
    },
    992:{
      items: 5,
    },
    1200:{
      items: 6,
    }
  },
})

createNavForSlider(".owl-carousel.slider-items");

$(".owl-carousel.galery-collection").owlCarousel({
  loop: true,
  margin: 10,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 1,
    },
    992: {
      items: 2,
    }
  },
})

createNavForSlider(".owl-carousel.galery-collection");

function setAnimationType(){
  var currentSize = document.body.clientWidth;
  var type;
  if(currentSize > 0 && currentSize < 576){
    type = 'fade-up'
  } else if( currentSize >=576 && currentSize < 768){
    type = 'fade-left'
  } else if(currentSize >= 768 && currentSize < 992){
    type = 'fade-up'
  } else {
    type = 'fade-left'
  }
  document.querySelector('#main>section:nth-child(2) .image-border').setAttribute("data-aos", type)
}

function createNavForSlider(selector){
  var nav = document.createElement("div")
  nav.classList.add('nav')
  var prevButton = document.createElement("button");
  prevButton.classList.add('prev');
  prevButton.addEventListener('click', ()=>{
    $(selector).trigger('prev.owl.carousel');
  })
  var nextButton = document.createElement("button");
  nextButton.classList.add('next');
  nextButton.addEventListener('click', ()=>{
    $(selector).trigger('next.owl.carousel');
  })
  prevButton.innerHTML = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve"><g><g><polygon points="207.093,30.187 176.907,0 48.907,128 176.907,256 207.093,225.813 109.28,128"/></g></g></svg>';
  nextButton.innerHTML = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve"><g><g><polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128"/></g></g></svg>';
  nav.appendChild(prevButton)
  nav.appendChild(nextButton)

  document.querySelector(selector).appendChild(nav);
}

setAnimationType()

window.addEventListener('resize', setAnimationType)

var productionItems = document.querySelectorAll(".production-item-imgages");
productionItems[0].setAttribute('data-aos', 'fade-left')
productionItems[1].setAttribute('data-aos', 'fade-right')

document.querySelector('.burger').addEventListener('click', ()=>{
  document.querySelector('#scrollMenu').classList.add("active");
  document.querySelector('.overlay').classList.add('active');
})

document.querySelector('.overlay').addEventListener('click', ()=>{
  document.querySelector('#scrollMenu').classList.remove("active");
  document.querySelector('.overlay').classList.remove('active');
})

document.querySelectorAll('#scrollMenu li a').forEach(link=>{
  link.addEventListener('click', ()=>{
    document.querySelector('#scrollMenu').classList.remove("active");
    document.querySelector('.overlay').classList.remove('active');
  })
})

document.querySelector('.menu-logo').addEventListener('click', ()=>{
  document.querySelector('#scrollMenu').classList.remove("active");
  document.querySelector('.overlay').classList.remove('active');
})

window.addEventListener('resize', onResize)
window.onload = () =>{
  onResize()
}

var productionItems = document.querySelectorAll('.production-item');
var activeProductionItemIndex = 0
productionItems[activeProductionItemIndex].classList.add('active');

for(let i = 0; i< productionItems.length; i++){
  productionItems[i].addEventListener('transitionend', (e)=>{
    if(e.target != productionItems[i] || e.target.classList.contains('active')) return
    console.log(1)
    if(getComputedStyle(e.target).getPropertyValue('opacity') == '0'){
      productionItems[i].classList.add('hidden')
    }
    if(activeProductionItemIndex<productionItems.length-1){
      activeProductionItemIndex++;
    }else{
      activeProductionItemIndex = 0;
    }
    productionItems[activeProductionItemIndex].classList.remove('hidden')
    setTimeout(()=>{
      productionItems[activeProductionItemIndex].classList.add('active');
      moreBtn.disabled = false;
      onResize()
    }, 0)
  })
  if(i==0) continue;
  productionItems[i].classList.add('hidden');
}

var moreBtn = document.querySelector('.more');
moreBtn.addEventListener('click', ()=>{
  productionItems[activeProductionItemIndex].classList.remove('active');
  moreBtn.disabled = "true"
})

function onResize(){
  document.querySelectorAll('.collection-item').forEach(item=>{
    item.querySelector('.text').style.height = item.querySelector('.collection-item-images').clientHeight + 'px';
  })
  var currentSize = document.body.clientWidth
  if(currentSize >= 992){
    productionItems.forEach(item=>{
      var images = item.querySelector('.production-item-imgages')
      var text = item.querySelector('.production-item-text')
      text.style.maxHeight = images.clientHeight + 'px';
      text.style.maxWidth = 'none';
    })
  }else{
    productionItems.forEach(item=>{
      var images = item.querySelectorAll('.production-item-imgages .production-item-img img')
      var width = 0;
      images.forEach(image=>{
        width+=image.clientWidth
      })
      var text = item.querySelector('.production-item-text')
      var padding = 50;
      var clientHeight = document.body.clientHeight;
      var titleHeight = document.querySelector('#main>section:nth-child(4) h1').clientHeight + parseFloat(getComputedStyle(document.querySelector('#main>section:nth-child(4) h1')).getPropertyValue('margin-bottom'));
      var buttonHeight = document.querySelector('#main>section:nth-child(4) button').clientHeight + parseFloat(getComputedStyle(document.querySelector('#main>section:nth-child(4) button')).getPropertyValue('margin-top'));
      var imagesHeight = item.querySelector('.production-item-imgages').clientHeight
      text.style.maxWidth = width + 'px';
      text.style.maxHeight = clientHeight - padding - titleHeight - buttonHeight - imagesHeight +'px';
    })
  }
}

var image = document.querySelector('#main>section img')

image.addEventListener('click', ()=>{
  document.querySelector('#main>section .row .row>div:last-child').classList.toggle('active')
  document.querySelector('#main>section .row .row>div:first-child').classList.toggle('hidden')
})