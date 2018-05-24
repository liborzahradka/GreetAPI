$(document).ready(function () {
  // LOAD SYNTAX HIGHLIGHT
  hljs.initHighlighting();



  $("pre code").each(function(){
    var html = $(this).html();
    var pattern = html.match(/\s*\n[\t\s]*/);
    $(this).html(html.replace(new RegExp(pattern, "g"),'\n'));
  });

  // CODE MENU & CODE SWITCH
  var method_menu = $('.method-menu li');
  $('.request code').hide();
  $('.request code.bash').show();
  method_menu.click(function(){
    var lang = $(this).data('lang');

    method_menu.removeClass('active');
    $(this).addClass('active');

    $('.request code').hide();
    $('.request code.'+ lang +'').show();

  });

  $('.mobile-menu').click(function(){
    $('.navigation').toggleClass('mobile');
  });

  // MAIN MENU HIGHLIGHT WHILE SCROLL
  var last_id,
   top_menu = $(".navigation .menu"),
   top_menu_height = top_menu.outerHeight()+1,
   menu_items = top_menu.find("a"),
   scroll_items = menu_items.map(function(){
     var item = $($(this).attr("href"));
      if (item.length) { return item; }
   });

  menu_items.click(function(e){
    var href = $(this).attr("href"),
        offset_top = href === "#" ? 0 : $(href).offset().top-top_menu_height+100;
    $('html, body').stop().animate({
        scrollTop: offset_top
    }, 850);
    e.preventDefault();
  });

  $(window).scroll(function(){
     var from_top = $(this).scrollTop()+top_menu_height;
     var cur = scroll_items.map(function(){
       if ($(this).offset().top < from_top)
         return this;
     });

     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";

     if (last_id !== id) {
         last_id = id;
         menu_items.parent()
                   .removeClass("active")
                   .end()
                   .filter("[href=\\#"+id+"]")
                   .parent()
                   .addClass("active");
     }
  });
});
