document.addEventListener("DOMContentLoaded", function(event) {
  // GLOBAL VARS
  var code_tags = document.getElementsByTagName('code'),
      method_menu = document.querySelectorAll('.method-menu > li'),
      i;

  // LOAD SYNTAX HIGHLIGHT
  hljs.initHighlighting();
  for (i = 0; code_tags.length > i; i++) {
    var html = code_tags[i].innerHTML,
        pattern = html.match(/\s*\n[\t\s]*/);
    code_tags[i].innerHTML = html.replace(new RegExp(pattern, "g"),'\n');
  }

  // CODE MENU & CODE SWITCH
  hide('.request > code');
  show('.request > code.bash');

  for (i = 0; method_menu.length > i; i++) {
    method_menu[i].addEventListener('click', function(){
      var lang = this.dataset.lang;

      removeClass('.method-menu > li', 'active');
      this.classList.add('active');

      hide('.request > code');
      show('.request > code.'+ lang);
    });
  }

  // MOBILE MENU
  document.querySelector('.mobile-menu').addEventListener("click", function(){
    var navigation = document.getElementsByClassName('navigation');
    navigation.classList.toggle('mobile');
  });

  // MAIN MENU HIGHLIGHT WHILE SCROLL
  var links = document.querySelectorAll('.menu > li > a'),
      section = document.getElementsByClassName('method'),
      sections = {};

  [...section].forEach(function(e) {
    sections[e.id] = e.offsetTop - 50;
  });

  for (i = 0; links.length > i; i++) {
    links[i].addEventListener('click', function(){
      var id = 'div#' + this.getAttribute('id');
      scrollTo(id);
    });
  }

  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        removeClass('.menu > li', 'active');
        document.querySelector('#'+ i).parentElement.classList.add('active');
      }
    }
  };

});

// EFFECT FUNCTIONS
function show(element) {
  var el = document.querySelectorAll(element);
  for (var i = 0; i < el.length; i ++) {
      el[i].style.display = "initial";
  }
}

function hide(element) {
  var el = document.querySelectorAll(element);
  for (var i = 0; i < el.length; i ++) {
      el[i].style.display = "none";
  }
}

function addClass(element, val) {
  var el = document.querySelectorAll(element);
  for (var i = 0; i < el.length; i ++) {
      el[i].classList.add(val);
  }
}

function removeClass(element, val) {
  var el = document.querySelectorAll(element);
  for (var i = 0; i < el.length; i ++) {
      el[i].classList.remove(val);
  }
}

function scrollTo(element) {
  var offset = document.querySelector(element).offsetTop;
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: offset
  });
}
