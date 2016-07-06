$(document).ready(function() {
  
  $(function() { //прелоадер---------------------------------------
    var imgs = [],
        percents = 1;

    $('*').each(function() {
      var $this = $(this),
          img = $this.is('img'),
          background = $this.css('background-image');

      if (background != 'none') {
        var path = background.replace('url(','').replace(')','');
        if (path[0] === '"' || path[0] === '\'') {
          path = path.substr(1);
        }
        if (path[path.length-1] === '"' || path[0] === '\'') {
          path = path.substring(0,path.length-1);
        }
        if (path) {
          imgs.push(path);
        }
      }

      if (img) {
        var path = $this.attr('src');
        if (path) {
          imgs.push(path);
        }
      }
    });
    for (var i = 0; i < imgs.length; i++) {
      var image = $('<img>', {
        attr: {
          src: imgs[i]
        }
      });
      image.load(function() {
        setPercents(imgs.length, percents);
        percents++;
      });
    }

    function setPercents(total, current) {
      var percent = Math.ceil(current / total * 100);
      $('.preloader__text').text(percent + '%');
      if (percent >= 100) {
        $('.wrapper').css('display', 'block');
        $('.inner-wrapper').css('display', 'block');
        $('.preloader').css('display', 'none');
        setTimeout(function() {
          $('.flipper').removeClass('flipper--unload');
        }, 400);
      }
    }

  });

  $('.anchor-link').on('click', function(e) { //якорный переход---------
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body, html').animate({
      scrollTop: top
    }, 1500);
  });

});

window.onload = function() {

  (function() {
    var card, form, authBtn, hamburger, menu, clickArea;
    if (document.getElementsByClassName("index-container")[0]) {
      card = document.getElementsByClassName("index-container")[0];
    }
    if (document.getElementsByClassName("login-form")[0]) {
      form = document.getElementsByClassName("login-form")[0];
    }
    if (document.getElementsByClassName("authorization-btn")[0]) {
      authBtn = document.getElementsByClassName("authorization-btn")[0];
    }
    if (document.getElementsByClassName("click-area")[0]) {
      clickArea = document.getElementsByClassName("click-area")[0];
    }
    if (document.getElementsByClassName("hamburger")[0]) {
      hamburger = document.getElementsByClassName("hamburger")[0];
    }
    if (document.getElementsByClassName("menu")[0]) {
      menu = document.getElementsByClassName("menu")[0];
    }

    if (authBtn) {
      clickArea.onclick = function() {
        card.classList.toggle("index-container--flip");
        authBtn.classList.toggle("authorization-btn--clicked");
        clickArea.classList.toggle("click-area--display");
      };
      authBtn.onclick = function() {
        card.classList.toggle("index-container--flip");
        authBtn.classList.toggle("authorization-btn--clicked");
        clickArea.classList.toggle("click-area--display");
      }
    }
    if (hamburger) {
      hamburger.onclick = function(e) {
        var list;
        if (document.getElementsByClassName("menu__list")[0]) {
          list = document.getElementsByClassName("menu__list")[0];
        }
        e.preventDefault();
        menu.classList.toggle("menu--active");
        if (hamburger.classList.contains('hamburger--transformed')) {
          list.classList.toggle('menu__list--active');
        } else {
          setTimeout(function() {
            list.classList.toggle('menu__list--active');
          }, 500);
        }
        hamburger.classList.toggle("hamburger--transformed")
      }
    }
  }());

  (function() {
    var downBtn = $('.thumbnail.thumbnail--down'),
        upBtn = $('.thumbnail.thumbnail--up'),
        slide = $('.slider__current'),
        description = $('.slider__description'),
        counterDown = 0,
        counterUp = 2,
        counterSlide = 1;
    downBtn.on('click', function() { //Вниз---------------
      //Счётчики
      counterDown--;
      counterUp--;
      counterSlide--;
      var $this = $(this),
          itemsDown = downBtn.find('.thumbnail__item'),
          itemsUp = upBtn.find('.thumbnail__item'),
          itemsSlide = slide.find('.slider__current-item'),
          itemsDescr = description.find('.slider__description-item'),
          activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active'),
          activeItemDescr = description.find('.slider__description-item--active');

      if (counterDown < 0) {
        counterDown = itemsDown.length-1;
      }

      if (counterUp < 0) {
        counterUp = itemsUp.length-1;
      }

      if (counterSlide < 0) {
        counterSlide = itemsUp.length-1;
      }

      var reqItemDown = itemsDown.eq(counterDown),
          reqItemUp = itemsUp.eq(counterUp),
          reqItemSlide = itemsSlide.eq(counterSlide),
          reqItemDescr = itemsDescr.eq(counterSlide);

      activeItemDown.animate({
        'top': '100%'
      }, 300);

      activeItemUp.animate({
        'top' : '-100%'
      }, 300);

      activeItemSlide.fadeOut(700);
      reqItemSlide.fadeIn(700);
      activeItemSlide.removeClass('slider__current-item--active').css('opacity', '0');
      reqItemSlide.addClass('slider__current-item--active');

      reqItemDescr.addClass('slider__description-item--active').css({
        position: 'relative',
        opacity: '1'
      });

      activeItemDescr.removeClass('slider__description-item--active').css({
        position: 'absolute',
        opacity: '0'
      });

      reqItemDown.animate({
        'top' : '0'
      }, 300, function() {
        activeItemDown.removeClass('thumbnail__item--active').css('top', '-100%');
        reqItemDown.addClass('thumbnail__item--active');
      });

      reqItemUp.animate({
        'top' : '0'
      }, 300, function() {
        activeItemUp.removeClass('thumbnail__item--active').css('top', '100%');
        reqItemUp.addClass('thumbnail__item--active');
      });
    });
    upBtn.on('click', function() { //Вверх---------------------
      //Счётчики
      counterDown++;
      counterUp++;
      counterSlide++;
      var $this = $(this),
          itemsDown = downBtn.find('.thumbnail__item'),
          itemsUp = upBtn.find('.thumbnail__item'),
          itemsSlide = slide.find('.slider__current-item'),
          itemsDescr = description.find('.slider__description-item'),
          activeItemDown = downBtn.find('.thumbnail__item--active'),
          activeItemUp = upBtn.find('.thumbnail__item--active'),
          activeItemSlide = slide.find('.slider__current-item--active'),
          activeItemDescr = description.find('.slider__description-item--active');

      if (counterUp >= itemsUp.length) {
        counterUp = 0;
      }

      if (counterDown >= itemsDown.length) {
        counterDown = 0;
      }

      if (counterSlide >= itemsDown.length) {
        counterSlide = 0;
      }

      var reqItemDown = itemsDown.eq(counterDown),
          reqItemUp = itemsUp.eq(counterUp),
          reqItemSlide = itemsSlide.eq(counterSlide),
          reqItemDescr = itemsDescr.eq(counterSlide);

      activeItemDown.animate({
        'top': '100%'
      }, 300);

      activeItemUp.animate({
        'top' : '-100%'
      }, 300);

      reqItemDescr.addClass('slider__description-item--active').css({
        position: 'relative',
        opacity: '1'
      });

      activeItemDescr.removeClass('slider__description-item--active').css({
        position: 'absolute',
        opacity: '0'
      });

      activeItemSlide.fadeOut(700);
      reqItemSlide.fadeIn(700);
      activeItemSlide.removeClass('slider__current-item--active').css('opacity', '0');
      reqItemSlide.addClass('slider__current-item--active');

      reqItemDown.animate({
        'top' : '0'
      }, 300, function() {
        activeItemDown.removeClass('thumbnail__item--active').css('top', '-100%');
        reqItemDown.addClass('thumbnail__item--active');
      });
      reqItemUp.animate({
        'top' : '0'
      }, 300, function() {
        activeItemUp.removeClass('thumbnail__item--active').css('top', '100%');
        reqItemUp.addClass('thumbnail__item--active');
      });
    });
  }());

  $(window).scroll(function() {
    var wScroll = $(window).scrollTop(),
        menu = $('.titles__wrapper'),
        sideBar = $('.titles--static'),
        stickyStart = sideBar.offset().top + 10,
        articles = $('.articles .article'),
        menuFixed = $('.titles--fixed'),
        menuStatic = $('.titles--static'),
        itemsFixed = $('.titles--fixed .titles__item'),
        itemsStatic = $('.titles--static .titles__item'),
        activeItemFixed = $('.titles--fixed .titles__item--active'),
        activeItemStatic = $('.titles--static .titles__item--active');

    if (wScroll >= stickyStart && !(menu.hasClass('titles__wrapper--fixed'))) {
      menu.toggleClass('titles__wrapper--fixed');
    }

    if (wScroll < stickyStart && menu.hasClass('titles__wrapper--fixed')) {
      menu.toggleClass('titles__wrapper--fixed');
    }

    (function() {
      var i,
          itemOffset = {
            value: 0,
            index: 0
          },
          offsetsMas = [];
      for (var i = 0; i < articles.length; i++) {
        offsetsMas.push($(articles[i]).offset().top-50);
      }
      for (var i = 0; i < articles.length; i++) {
        if (offsetsMas[i] > itemOffset.value && offsetsMas[i] <= wScroll) {
          itemOffset.value = offsetsMas[i];
          itemOffset.index = i;
        }
      }
      if (wScroll >= offsetsMas[offsetsMas.length-1]+$(articles[offsetsMas.length-1]).height()-800) {
        itemOffset.value = offsetsMas[offsetsMas.length-1];
        itemOffset.index = offsetsMas.length-1;
      }
      activeItemFixed.removeClass('titles__item--active');
      activeItemStatic.removeClass('titles__item--active');
      $(itemsFixed[itemOffset.index]).addClass('titles__item--active');
      $(itemsStatic[itemOffset.index]).addClass('titles__item--active');
    }());
  });

  (function(){
    var menuFixed = $('.titles--fixed'),
        menuBtn = menuFixed.find('.titles__btn'),
        clickArea = $('.titles-click-area');
    menuBtn.on('click', function(){
      clickArea.toggleClass('titles-click-area--active');
      menuFixed.toggleClass('titles--active');
    });
    clickArea.on('click', function(){
      clickArea.toggleClass('titles-click-area--active');
      menuFixed.toggleClass('titles--active');
    });
  }());

}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICBcclxuICAkKGZ1bmN0aW9uKCkgeyAvL9C/0YDQtdC70L7QsNC00LXRgC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdmFyIGltZ3MgPSBbXSxcclxuICAgICAgICBwZXJjZW50cyA9IDE7XHJcblxyXG4gICAgJCgnKicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICBpbWcgPSAkdGhpcy5pcygnaW1nJyksXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcblxyXG4gICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKCcsJycpLnJlcGxhY2UoJyknLCcnKTtcclxuICAgICAgICBpZiAocGF0aFswXSA9PT0gJ1wiJyB8fCBwYXRoWzBdID09PSAnXFwnJykge1xyXG4gICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGF0aFtwYXRoLmxlbmd0aC0xXSA9PT0gJ1wiJyB8fCBwYXRoWzBdID09PSAnXFwnJykge1xyXG4gICAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyaW5nKDAscGF0aC5sZW5ndGgtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaW1nKSB7XHJcbiAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgc3JjOiBpbWdzW2ldXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaW1hZ2UubG9hZChmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHMpO1xyXG4gICAgICAgIHBlcmNlbnRzKys7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcbiAgICAgICQoJy5wcmVsb2FkZXJfX3RleHQnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICAkKCcud3JhcHBlcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICQoJy5pbm5lci13cmFwcGVyJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgJCgnLnByZWxvYWRlcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICQoJy5mbGlwcGVyJykucmVtb3ZlQ2xhc3MoJ2ZsaXBwZXItLXVubG9hZCcpO1xyXG4gICAgICAgIH0sIDQwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gICQoJy5hbmNob3ItbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgLy/Rj9C60L7RgNC90YvQuSDQv9C10YDQtdGF0L7QtC0tLS0tLS0tLVxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgdG9wID0gJChpZCkub2Zmc2V0KCkudG9wO1xyXG4gICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICBzY3JvbGxUb3A6IHRvcFxyXG4gICAgfSwgMTUwMCk7XHJcbiAgfSk7XHJcblxyXG59KTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNhcmQsIGZvcm0sIGF1dGhCdG4sIGhhbWJ1cmdlciwgbWVudSwgY2xpY2tBcmVhO1xyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbmRleC1jb250YWluZXJcIilbMF0pIHtcclxuICAgICAgY2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbmRleC1jb250YWluZXJcIilbMF07XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvZ2luLWZvcm1cIilbMF0pIHtcclxuICAgICAgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsb2dpbi1mb3JtXCIpWzBdO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhdXRob3JpemF0aW9uLWJ0blwiKVswXSkge1xyXG4gICAgICBhdXRoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImF1dGhvcml6YXRpb24tYnRuXCIpWzBdO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbGljay1hcmVhXCIpWzBdKSB7XHJcbiAgICAgIGNsaWNrQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbGljay1hcmVhXCIpWzBdO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoYW1idXJnZXJcIilbMF0pIHtcclxuICAgICAgaGFtYnVyZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhhbWJ1cmdlclwiKVswXTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWVudVwiKVswXSkge1xyXG4gICAgICBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1lbnVcIilbMF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGF1dGhCdG4pIHtcclxuICAgICAgY2xpY2tBcmVhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLmNsYXNzTGlzdC50b2dnbGUoXCJpbmRleC1jb250YWluZXItLWZsaXBcIik7XHJcbiAgICAgICAgYXV0aEJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiYXV0aG9yaXphdGlvbi1idG4tLWNsaWNrZWRcIik7XHJcbiAgICAgICAgY2xpY2tBcmVhLmNsYXNzTGlzdC50b2dnbGUoXCJjbGljay1hcmVhLS1kaXNwbGF5XCIpO1xyXG4gICAgICB9O1xyXG4gICAgICBhdXRoQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLmNsYXNzTGlzdC50b2dnbGUoXCJpbmRleC1jb250YWluZXItLWZsaXBcIik7XHJcbiAgICAgICAgYXV0aEJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiYXV0aG9yaXphdGlvbi1idG4tLWNsaWNrZWRcIik7XHJcbiAgICAgICAgY2xpY2tBcmVhLmNsYXNzTGlzdC50b2dnbGUoXCJjbGljay1hcmVhLS1kaXNwbGF5XCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaGFtYnVyZ2VyKSB7XHJcbiAgICAgIGhhbWJ1cmdlci5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBsaXN0O1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWVudV9fbGlzdFwiKVswXSkge1xyXG4gICAgICAgICAgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtZW51X19saXN0XCIpWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKFwibWVudS0tYWN0aXZlXCIpO1xyXG4gICAgICAgIGlmIChoYW1idXJnZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYW1idXJnZXItLXRyYW5zZm9ybWVkJykpIHtcclxuICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudV9fbGlzdC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudV9fbGlzdC0tYWN0aXZlJyk7XHJcbiAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShcImhhbWJ1cmdlci0tdHJhbnNmb3JtZWRcIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0oKSk7XHJcblxyXG4gIChmdW5jdGlvbigpIHtcclxuICAgIHZhciBkb3duQnRuID0gJCgnLnRodW1ibmFpbC50aHVtYm5haWwtLWRvd24nKSxcclxuICAgICAgICB1cEJ0biA9ICQoJy50aHVtYm5haWwudGh1bWJuYWlsLS11cCcpLFxyXG4gICAgICAgIHNsaWRlID0gJCgnLnNsaWRlcl9fY3VycmVudCcpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gJCgnLnNsaWRlcl9fZGVzY3JpcHRpb24nKSxcclxuICAgICAgICBjb3VudGVyRG93biA9IDAsXHJcbiAgICAgICAgY291bnRlclVwID0gMixcclxuICAgICAgICBjb3VudGVyU2xpZGUgPSAxO1xyXG4gICAgZG93bkJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgLy/QktC90LjQty0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAvL9Ch0YfRkdGC0YfQuNC60LhcclxuICAgICAgY291bnRlckRvd24tLTtcclxuICAgICAgY291bnRlclVwLS07XHJcbiAgICAgIGNvdW50ZXJTbGlkZS0tO1xyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgaXRlbXNEb3duID0gZG93bkJ0bi5maW5kKCcudGh1bWJuYWlsX19pdGVtJyksXHJcbiAgICAgICAgICBpdGVtc1VwID0gdXBCdG4uZmluZCgnLnRodW1ibmFpbF9faXRlbScpLFxyXG4gICAgICAgICAgaXRlbXNTbGlkZSA9IHNsaWRlLmZpbmQoJy5zbGlkZXJfX2N1cnJlbnQtaXRlbScpLFxyXG4gICAgICAgICAgaXRlbXNEZXNjciA9IGRlc2NyaXB0aW9uLmZpbmQoJy5zbGlkZXJfX2Rlc2NyaXB0aW9uLWl0ZW0nKSxcclxuICAgICAgICAgIGFjdGl2ZUl0ZW1Eb3duID0gZG93bkJ0bi5maW5kKCcudGh1bWJuYWlsX19pdGVtLS1hY3RpdmUnKSxcclxuICAgICAgICAgIGFjdGl2ZUl0ZW1VcCA9IHVwQnRuLmZpbmQoJy50aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbVNsaWRlID0gc2xpZGUuZmluZCgnLnNsaWRlcl9fY3VycmVudC1pdGVtLS1hY3RpdmUnKSxcclxuICAgICAgICAgIGFjdGl2ZUl0ZW1EZXNjciA9IGRlc2NyaXB0aW9uLmZpbmQoJy5zbGlkZXJfX2Rlc2NyaXB0aW9uLWl0ZW0tLWFjdGl2ZScpO1xyXG5cclxuICAgICAgaWYgKGNvdW50ZXJEb3duIDwgMCkge1xyXG4gICAgICAgIGNvdW50ZXJEb3duID0gaXRlbXNEb3duLmxlbmd0aC0xO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY291bnRlclVwIDwgMCkge1xyXG4gICAgICAgIGNvdW50ZXJVcCA9IGl0ZW1zVXAubGVuZ3RoLTE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb3VudGVyU2xpZGUgPCAwKSB7XHJcbiAgICAgICAgY291bnRlclNsaWRlID0gaXRlbXNVcC5sZW5ndGgtMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHJlcUl0ZW1Eb3duID0gaXRlbXNEb3duLmVxKGNvdW50ZXJEb3duKSxcclxuICAgICAgICAgIHJlcUl0ZW1VcCA9IGl0ZW1zVXAuZXEoY291bnRlclVwKSxcclxuICAgICAgICAgIHJlcUl0ZW1TbGlkZSA9IGl0ZW1zU2xpZGUuZXEoY291bnRlclNsaWRlKSxcclxuICAgICAgICAgIHJlcUl0ZW1EZXNjciA9IGl0ZW1zRGVzY3IuZXEoY291bnRlclNsaWRlKTtcclxuXHJcbiAgICAgIGFjdGl2ZUl0ZW1Eb3duLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnOiAnMTAwJSdcclxuICAgICAgfSwgMzAwKTtcclxuXHJcbiAgICAgIGFjdGl2ZUl0ZW1VcC5hbmltYXRlKHtcclxuICAgICAgICAndG9wJyA6ICctMTAwJSdcclxuICAgICAgfSwgMzAwKTtcclxuXHJcbiAgICAgIGFjdGl2ZUl0ZW1TbGlkZS5mYWRlT3V0KDcwMCk7XHJcbiAgICAgIHJlcUl0ZW1TbGlkZS5mYWRlSW4oNzAwKTtcclxuICAgICAgYWN0aXZlSXRlbVNsaWRlLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2N1cnJlbnQtaXRlbS0tYWN0aXZlJykuY3NzKCdvcGFjaXR5JywgJzAnKTtcclxuICAgICAgcmVxSXRlbVNsaWRlLmFkZENsYXNzKCdzbGlkZXJfX2N1cnJlbnQtaXRlbS0tYWN0aXZlJyk7XHJcblxyXG4gICAgICByZXFJdGVtRGVzY3IuYWRkQ2xhc3MoJ3NsaWRlcl9fZGVzY3JpcHRpb24taXRlbS0tYWN0aXZlJykuY3NzKHtcclxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICBvcGFjaXR5OiAnMSdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhY3RpdmVJdGVtRGVzY3IucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9fZGVzY3JpcHRpb24taXRlbS0tYWN0aXZlJykuY3NzKHtcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICBvcGFjaXR5OiAnMCdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXFJdGVtRG93bi5hbmltYXRlKHtcclxuICAgICAgICAndG9wJyA6ICcwJ1xyXG4gICAgICB9LCAzMDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFjdGl2ZUl0ZW1Eb3duLnJlbW92ZUNsYXNzKCd0aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpLmNzcygndG9wJywgJy0xMDAlJyk7XHJcbiAgICAgICAgcmVxSXRlbURvd24uYWRkQ2xhc3MoJ3RodW1ibmFpbF9faXRlbS0tYWN0aXZlJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmVxSXRlbVVwLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnIDogJzAnXHJcbiAgICAgIH0sIDMwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWN0aXZlSXRlbVVwLnJlbW92ZUNsYXNzKCd0aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpLmNzcygndG9wJywgJzEwMCUnKTtcclxuICAgICAgICByZXFJdGVtVXAuYWRkQ2xhc3MoJ3RodW1ibmFpbF9faXRlbS0tYWN0aXZlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB1cEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHsgLy/QktCy0LXRgNGFLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgIC8v0KHRh9GR0YLRh9C40LrQuFxyXG4gICAgICBjb3VudGVyRG93bisrO1xyXG4gICAgICBjb3VudGVyVXArKztcclxuICAgICAgY291bnRlclNsaWRlKys7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICBpdGVtc0Rvd24gPSBkb3duQnRuLmZpbmQoJy50aHVtYm5haWxfX2l0ZW0nKSxcclxuICAgICAgICAgIGl0ZW1zVXAgPSB1cEJ0bi5maW5kKCcudGh1bWJuYWlsX19pdGVtJyksXHJcbiAgICAgICAgICBpdGVtc1NsaWRlID0gc2xpZGUuZmluZCgnLnNsaWRlcl9fY3VycmVudC1pdGVtJyksXHJcbiAgICAgICAgICBpdGVtc0Rlc2NyID0gZGVzY3JpcHRpb24uZmluZCgnLnNsaWRlcl9fZGVzY3JpcHRpb24taXRlbScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbURvd24gPSBkb3duQnRuLmZpbmQoJy50aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbVVwID0gdXBCdG4uZmluZCgnLnRodW1ibmFpbF9faXRlbS0tYWN0aXZlJyksXHJcbiAgICAgICAgICBhY3RpdmVJdGVtU2xpZGUgPSBzbGlkZS5maW5kKCcuc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgICAgYWN0aXZlSXRlbURlc2NyID0gZGVzY3JpcHRpb24uZmluZCgnLnNsaWRlcl9fZGVzY3JpcHRpb24taXRlbS0tYWN0aXZlJyk7XHJcblxyXG4gICAgICBpZiAoY291bnRlclVwID49IGl0ZW1zVXAubGVuZ3RoKSB7XHJcbiAgICAgICAgY291bnRlclVwID0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvdW50ZXJEb3duID49IGl0ZW1zRG93bi5sZW5ndGgpIHtcclxuICAgICAgICBjb3VudGVyRG93biA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb3VudGVyU2xpZGUgPj0gaXRlbXNEb3duLmxlbmd0aCkge1xyXG4gICAgICAgIGNvdW50ZXJTbGlkZSA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciByZXFJdGVtRG93biA9IGl0ZW1zRG93bi5lcShjb3VudGVyRG93biksXHJcbiAgICAgICAgICByZXFJdGVtVXAgPSBpdGVtc1VwLmVxKGNvdW50ZXJVcCksXHJcbiAgICAgICAgICByZXFJdGVtU2xpZGUgPSBpdGVtc1NsaWRlLmVxKGNvdW50ZXJTbGlkZSksXHJcbiAgICAgICAgICByZXFJdGVtRGVzY3IgPSBpdGVtc0Rlc2NyLmVxKGNvdW50ZXJTbGlkZSk7XHJcblxyXG4gICAgICBhY3RpdmVJdGVtRG93bi5hbmltYXRlKHtcclxuICAgICAgICAndG9wJzogJzEwMCUnXHJcbiAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICBhY3RpdmVJdGVtVXAuYW5pbWF0ZSh7XHJcbiAgICAgICAgJ3RvcCcgOiAnLTEwMCUnXHJcbiAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICByZXFJdGVtRGVzY3IuYWRkQ2xhc3MoJ3NsaWRlcl9fZGVzY3JpcHRpb24taXRlbS0tYWN0aXZlJykuY3NzKHtcclxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICBvcGFjaXR5OiAnMSdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhY3RpdmVJdGVtRGVzY3IucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9fZGVzY3JpcHRpb24taXRlbS0tYWN0aXZlJykuY3NzKHtcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICBvcGFjaXR5OiAnMCdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhY3RpdmVJdGVtU2xpZGUuZmFkZU91dCg3MDApO1xyXG4gICAgICByZXFJdGVtU2xpZGUuZmFkZUluKDcwMCk7XHJcbiAgICAgIGFjdGl2ZUl0ZW1TbGlkZS5yZW1vdmVDbGFzcygnc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpLmNzcygnb3BhY2l0eScsICcwJyk7XHJcbiAgICAgIHJlcUl0ZW1TbGlkZS5hZGRDbGFzcygnc2xpZGVyX19jdXJyZW50LWl0ZW0tLWFjdGl2ZScpO1xyXG5cclxuICAgICAgcmVxSXRlbURvd24uYW5pbWF0ZSh7XHJcbiAgICAgICAgJ3RvcCcgOiAnMCdcclxuICAgICAgfSwgMzAwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhY3RpdmVJdGVtRG93bi5yZW1vdmVDbGFzcygndGh1bWJuYWlsX19pdGVtLS1hY3RpdmUnKS5jc3MoJ3RvcCcsICctMTAwJScpO1xyXG4gICAgICAgIHJlcUl0ZW1Eb3duLmFkZENsYXNzKCd0aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmVxSXRlbVVwLmFuaW1hdGUoe1xyXG4gICAgICAgICd0b3AnIDogJzAnXHJcbiAgICAgIH0sIDMwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWN0aXZlSXRlbVVwLnJlbW92ZUNsYXNzKCd0aHVtYm5haWxfX2l0ZW0tLWFjdGl2ZScpLmNzcygndG9wJywgJzEwMCUnKTtcclxuICAgICAgICByZXFJdGVtVXAuYWRkQ2xhc3MoJ3RodW1ibmFpbF9faXRlbS0tYWN0aXZlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSgpKTtcclxuXHJcbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgIHZhciB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgIG1lbnUgPSAkKCcudGl0bGVzX193cmFwcGVyJyksXHJcbiAgICAgICAgc2lkZUJhciA9ICQoJy50aXRsZXMtLXN0YXRpYycpLFxyXG4gICAgICAgIHN0aWNreVN0YXJ0ID0gc2lkZUJhci5vZmZzZXQoKS50b3AgKyAxMCxcclxuICAgICAgICBhcnRpY2xlcyA9ICQoJy5hcnRpY2xlcyAuYXJ0aWNsZScpLFxyXG4gICAgICAgIG1lbnVGaXhlZCA9ICQoJy50aXRsZXMtLWZpeGVkJyksXHJcbiAgICAgICAgbWVudVN0YXRpYyA9ICQoJy50aXRsZXMtLXN0YXRpYycpLFxyXG4gICAgICAgIGl0ZW1zRml4ZWQgPSAkKCcudGl0bGVzLS1maXhlZCAudGl0bGVzX19pdGVtJyksXHJcbiAgICAgICAgaXRlbXNTdGF0aWMgPSAkKCcudGl0bGVzLS1zdGF0aWMgLnRpdGxlc19faXRlbScpLFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1GaXhlZCA9ICQoJy50aXRsZXMtLWZpeGVkIC50aXRsZXNfX2l0ZW0tLWFjdGl2ZScpLFxyXG4gICAgICAgIGFjdGl2ZUl0ZW1TdGF0aWMgPSAkKCcudGl0bGVzLS1zdGF0aWMgLnRpdGxlc19faXRlbS0tYWN0aXZlJyk7XHJcblxyXG4gICAgaWYgKHdTY3JvbGwgPj0gc3RpY2t5U3RhcnQgJiYgIShtZW51Lmhhc0NsYXNzKCd0aXRsZXNfX3dyYXBwZXItLWZpeGVkJykpKSB7XHJcbiAgICAgIG1lbnUudG9nZ2xlQ2xhc3MoJ3RpdGxlc19fd3JhcHBlci0tZml4ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod1Njcm9sbCA8IHN0aWNreVN0YXJ0ICYmIG1lbnUuaGFzQ2xhc3MoJ3RpdGxlc19fd3JhcHBlci0tZml4ZWQnKSkge1xyXG4gICAgICBtZW51LnRvZ2dsZUNsYXNzKCd0aXRsZXNfX3dyYXBwZXItLWZpeGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaSxcclxuICAgICAgICAgIGl0ZW1PZmZzZXQgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9mZnNldHNNYXMgPSBbXTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG9mZnNldHNNYXMucHVzaCgkKGFydGljbGVzW2ldKS5vZmZzZXQoKS50b3AtNTApO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAob2Zmc2V0c01hc1tpXSA+IGl0ZW1PZmZzZXQudmFsdWUgJiYgb2Zmc2V0c01hc1tpXSA8PSB3U2Nyb2xsKSB7XHJcbiAgICAgICAgICBpdGVtT2Zmc2V0LnZhbHVlID0gb2Zmc2V0c01hc1tpXTtcclxuICAgICAgICAgIGl0ZW1PZmZzZXQuaW5kZXggPSBpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAod1Njcm9sbCA+PSBvZmZzZXRzTWFzW29mZnNldHNNYXMubGVuZ3RoLTFdKyQoYXJ0aWNsZXNbb2Zmc2V0c01hcy5sZW5ndGgtMV0pLmhlaWdodCgpLTgwMCkge1xyXG4gICAgICAgIGl0ZW1PZmZzZXQudmFsdWUgPSBvZmZzZXRzTWFzW29mZnNldHNNYXMubGVuZ3RoLTFdO1xyXG4gICAgICAgIGl0ZW1PZmZzZXQuaW5kZXggPSBvZmZzZXRzTWFzLmxlbmd0aC0xO1xyXG4gICAgICB9XHJcbiAgICAgIGFjdGl2ZUl0ZW1GaXhlZC5yZW1vdmVDbGFzcygndGl0bGVzX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgYWN0aXZlSXRlbVN0YXRpYy5yZW1vdmVDbGFzcygndGl0bGVzX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgJChpdGVtc0ZpeGVkW2l0ZW1PZmZzZXQuaW5kZXhdKS5hZGRDbGFzcygndGl0bGVzX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgJChpdGVtc1N0YXRpY1tpdGVtT2Zmc2V0LmluZGV4XSkuYWRkQ2xhc3MoJ3RpdGxlc19faXRlbS0tYWN0aXZlJyk7XHJcbiAgICB9KCkpO1xyXG4gIH0pO1xyXG5cclxuICAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBtZW51Rml4ZWQgPSAkKCcudGl0bGVzLS1maXhlZCcpLFxyXG4gICAgICAgIG1lbnVCdG4gPSBtZW51Rml4ZWQuZmluZCgnLnRpdGxlc19fYnRuJyksXHJcbiAgICAgICAgY2xpY2tBcmVhID0gJCgnLnRpdGxlcy1jbGljay1hcmVhJyk7XHJcbiAgICBtZW51QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNsaWNrQXJlYS50b2dnbGVDbGFzcygndGl0bGVzLWNsaWNrLWFyZWEtLWFjdGl2ZScpO1xyXG4gICAgICBtZW51Rml4ZWQudG9nZ2xlQ2xhc3MoJ3RpdGxlcy0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICAgIGNsaWNrQXJlYS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBjbGlja0FyZWEudG9nZ2xlQ2xhc3MoJ3RpdGxlcy1jbGljay1hcmVhLS1hY3RpdmUnKTtcclxuICAgICAgbWVudUZpeGVkLnRvZ2dsZUNsYXNzKCd0aXRsZXMtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfSgpKTtcclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
