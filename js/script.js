$( document ).ready(function() {
    console.log( "ready!" );
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

// forecast data
    var locale = 'ua',
        weatherDiv = $('.forecast-box-left'),
		scroller = $('#scroller'),
		location = $('p.location');

	getWeatherData(locale, dataReceived, showError);

	function dataReceived(data) {
		// Get the offset from UTC (turn the offset minutes into ms)
		var offset = (new Date()).getTimezoneOffset()*60*1000;
		var city = data.city.name;
		var country = data.city.country;

		$.each(data.list, function(){
			// "this" holds a forecast object
			// Get the local time of this forecast (the api returns it in utc)
			var localTime = new Date(this.dt*1000 - offset);
			addWeather(
				this.weather[0].icon,
				moment(localTime).calendar(),	// We are using the moment.js library to format the date
				this.weather[0].description
			);
		});
		// Add the location to the page
		location.html(city+', <b>'+country+'</b>');
		// Set the slider to the first slide
		showSlide(0);
	}

	function addWeather(icon, day, condition, city){

		var markup = '<li>'+
		    '<div class="forecast-date">'+
			'<div class="day-active">'+ day +'</div>'+
			'<div class="day-active">'+ day +'</div>'+ //put heare data of forecast !!
			'</div>'+
			'<div class="forecast-img">'+
			'<img src="img/w/'+ icon +'.png" alt="weather icon" />'+
			'<p>'+ condition +'</p>'+
			'</div>'+
			'<div class="location-box">'+
			'<p class="location">'+ 'Current city' +'</p>'+
            '</div>';

		scroller.append(markup);
	}

	/* Handling the previous / next arrows */
	var currentSlide = 0;
	weathernDiv.find('a.previous').click(function(e){
		e.preventDefault();
		showSlide(currentSlide-1);
	});

	weatherDiv.find('a.next').click(function(e){
		e.preventDefault();
		showSlide(currentSlide+1);
	});

	// listen for arrow keys
	$(document).keydown(function(e){
		switch(e.keyCode){
			case 37: 
				weatherDiv.find('a.previous').click();
			break;
			case 39:
				weatherDiv.find('a.next').click();
			break;
		}
	});

	function showSlide(i){
		var items = scroller.find('li');

		if (i >= items.length || i < 0 || scroller.is(':animated')){
			return false;
		}

		weatherDiv.removeClass('first last');

		if(i == 0){
			weatherDiv.addClass('first');
		}
		else if (i == items.length-1){
			weatherDiv.addClass('last');
		}

		scroller.animate({top:(-i*100)+'%'}, function(){
			currentSlide = i;
		});
	}

	/* Error handling functions */
	function showError(msg){
		weatherDiv.addClass('error').html(msg);
	}
});
