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

  $(".slider-items").slick({
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
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

    anime.timeline({ loop: false }).add({
      targets: currentSection.querySelectorAll(".ani-header .letter"),
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1300,
      delay: (el, i) => 550 + 30 * i,
    });

    anime.timeline({ loop: false }).add({
      targets: currentSection.querySelectorAll(".ani-text .letter"),
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 260,
      delay: (el, i) => 55 + 3 * i,
    });
  },
});

// carousel

$(".owl-carousel").owlCarousel({
  loop: false,
  margin: 10,
  responsive: {
    0: {
      items: 1,
    },
  },
});
