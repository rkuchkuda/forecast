$( document ).ready(function() {
    console.log( "ready!" );

    $('.button-box').on('click', 'a', function( event ) {
         event.preventDefault();
         var parrent = $(this).parent(),
             name = parrent.data('name');
         parrent.addClass('active').siblings('li').removeClass('active');
         parrent.closest('.forecast-box-middle').find('.chart-box-item.'+name).addClass('active').siblings('.chart-box-item').removeClass('active');
        
    });
    
    $('#aside').mouseenter(function() {
        $(this).closest('body').addClass('open');
    });
    $('#aside').mouseleave(function() {
        $(this).closest('body').removeClass('open');
    });
    
});