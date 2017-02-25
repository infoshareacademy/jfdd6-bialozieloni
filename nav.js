$('.nav-functions').on('click', function (event) {
  event.preventDefault();
  var p = $('#functions');
  var offset = p.offset().top;

  $('html, body').animate({
    scrollTop: offset
  }, 1000);
});

$('.nav-form').on('click', function (event) {
  event.preventDefault();
  var p = $('#form');
  var offset = p.offset().top;

  $('html, body').animate({
    scrollTop: offset
  }, 1000);
});

$('.nav-team').on('click', function (event) {
  event.preventDefault();
  var p = $('#team');
  var offset = p.offset().top;

  $('html, body').animate({
    scrollTop: offset
  }, 1000);
});

$('.nav-additional').on('click', function (event) {
  event.preventDefault();
  var p = $('#additional');
  var offset = p.offset().top;

  $('html, body').animate({
    scrollTop: offset
  }, 1000);
});

$('.navbar-brand').on('click', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: 0
  }, 1000);
});

// ponizej kod Janka

 $('.btn-zaj').on('click', function (event) {
  var p = $('#form');
  var offset = p.offset().top;

  $('html, body').animate({
    scrollTop: offset
  }, 1000);
});
 //  paralaxa
$(window).on('scroll', function(){
  $('header').css({
    backgroundPosition: '0 ' + (-$(window).scrollTop() * 0.6) + 'px'
  }, 2000)});
