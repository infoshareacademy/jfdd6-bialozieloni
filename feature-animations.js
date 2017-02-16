$(window).on('scroll', function () {
    var p = $('#functions');
    var offset = p.offset().top;
    var scrollTop = $(window).scrollTop()
    $( '.func-1-icon, .func-2-icon, .func-3-icon, .func-4-icon' ).addClass( "animate-icons" );
    console.log(offset, scrollTop);
});
