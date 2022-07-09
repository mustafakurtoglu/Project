if ((navigator.appVersion.indexOf("Win")!=-1) && (navigator.userAgent.indexOf("Firefox") != -1 ))
{
  //$("body").css("cssText", "font-weight: 400 !important;");
  $("body").css("cssText", "font-weight: lighter !important;");
}

/*Бутерброд*/
var forEach=function(t,o,r) {
    if("[object Object]"===Object.prototype.toString.call(t))
        for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);
    else
        for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
            this.classList.toggle("is-active");
        }, false);
    });
}


$('#toggle-menu').click(function(){
    if ( $('html').hasClass('open-search')) {
        $('html').removeClass('open-search');
    }
    $('html').toggleClass('open-menu');
});


$('#btn-search').click(function(){

    if ( $('html').hasClass('open-menu')) {
        $('html').removeClass('open-menu');
    }

	//$("input.search_input").focus();
	setTimeout(function(){
	    $(".search_input").focus();
	});
    $("#my-search").fadeToggle(300);
    $('html').toggleClass('open-search');
});

$('#my-search .close').click(function(){
    $("#my-search").fadeToggle(300);
    $('html').removeClass('open-search');
});

$(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
        $("#my-search").fadeOut(300);
    }
});


// /*Работа с формой контактов*/
// $('#form_contact').find("input[name='phone_number']").bind('keypress', function (event) {
//     var regex = new RegExp("^[\\s\\b\+\(\)0-9]+$");
//     var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
//     if (!regex.test(key)) {
//        event.preventDefault();
//        return false;
//     }
// });
//
// $('#form_contact').find("input[name='email']").bind('keypress', function (event) {
//     var regex_mail = new RegExp("^[a-z+@+.+0-9+-]");
//     var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
//     if (!regex_mail.test(key)) {
//        event.preventDefault();
//        return false;
//     }
// });
//
// $("#form_contact").validate({
//     rules: {
//         "name": {
//             required: true
//         },
//
//         "phone_number": {
//             required: true
//         },
//
//         "type": {
//             required: true
//         },
//     },
//     messages: {
//         "name": '',
//         "phone_number": '',
//         "type": ''
//     },
//
//     highlight: function(element) {
//       var el = $(element).closest('input, textarea');
//       el.addClass('has-error');
//       setTimeout(function(){
//         el.removeClass('has-error');
//       }, 2000);
//     }
// });

/*После проверки, если поля заполнены, отправляем форму и вызываем окно ответки*/

/*
$('#form_contact').submit(function(e) {
    e.preventDefault();
    if($(this).valid()) {
      $('#box_form-contact').css({'opacity':'0'});
      $('.fancybox-close').css({'opacity':'0'});
      $('#report_contact').fadeIn(800);
      $.ajax({
        type: "POST",
        url: "/contact-form.php",
        data: $(this).serialize(),
        success: function() {
          setTimeout('window.location.reload()', 4000)
        }
      });
    }
});
*/


/*Открываем список с тегами*/

$('.btn-tag').click(function() {
    if ($(window).width() < 800) {
        $(this).toggleClass('active');
        $('#bl_tag').slideToggle();
    }
});


function setActiveMenuElement(element, pageID)
{
    var sel = $("."+element+pageID);

    if ((sel.length > 0))
    {
        sel.addClass('active');
    }
}
