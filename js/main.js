$(function() {
    console.log( "ready!" );

// forecast data

    // take data about geolocation
    navigator.geolocation.getCurrentPosition(getWeatherData, error);
   
    function error(err) {
      $('.forecast-box-left').html('<p>Please allow to take your geolocation or search weather forecast by city</p>');
    }
    
    function getWeatherData(position){
        $.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' +
                    position.coords.longitude + '&units=metric' + '&lang=en&callback=?&appid=2239135b18e8b5e093a144e55b94b5d6',
            function(data){
                var offset = (new Date()).getTimezoneOffset()*60*1000;
        		var localTime = new Date( data.list[0].dt*1000 - offset);
        		var currentDay = moment(localTime).calendar();
        		var currentDate = moment(localTime).format('MMMM D');
        	    console.log( currentDate );
                $('#forecast-date').html('<div class="day-active">' + currentDay + '</div>' +
                                        '<div class="data-active">' + currentDate + '</div>');
                $('#forecast-img').html('<img src="img/w/' + data.list[0].weather[0].icon + '.png" alt="weather icon" />' + 
                                        '<p>' + data.list[0].weather[0].description + '</p>');
                $('#location-box').html('<p id="location">' + data.city.name + ', ' + data.city.country + '</p>');
            });
    }
    


// buttons in chart-box. switch chart in box
    $('.button-box').on('click', 'a', function( event ) {
         event.preventDefault();
         var parrent = $(this).parent(),
             name = parrent.data('name');
         parrent.addClass('active').siblings('li').removeClass('active');
         parrent.closest('.forecast-box-middle').find('.chart-box-item.'+name).addClass('active').siblings('.chart-box-item').removeClass('active');
        
    });
// slider. move body whith slider
    $('#aside').mouseenter(function() {
        $(this).closest('body').addClass('open');
    });
    $('#aside').mouseleave(function() {
        $(this).closest('body').removeClass('open');
    });



});