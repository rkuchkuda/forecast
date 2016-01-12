$( document ).ready(function() {
    console.log( "ready!" );
    var dayNum = 0;
    $('#btn').click(function () {
        getWeatherByCity(insertWeatherData, showError, $('#search-loc').val());
    });
    
    getWeatherData(insertWeatherData, showError);
    $('.forecast-box').addClass('load');
    
     $('#search-loc').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btn').trigger('click');
            return false;
        }
    });
    
    // all click and hover event
    
    // save postcard function
    $("#btnSave").click(function() { 
        html2canvas($(".forecast-box"), {
            onrendered: function(canvas) {
                var win = window.open();
	            $(win.document.body).html(canvas);
            }
        });
    });
     
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
    
    function showError(msg){
        /*$('.forecast-box').html('<div class="geolocationerror">' + msg + '</div>');*/
        alert(msg);
	}
    
    // slider navigation
    $('.arrow').on('click', '.next', function(event){
        event.preventDefault();
        dayNum = JSON.parse(localStorage.getItem('dayNum'));
        dayNum++;
        blockSliderArrow(dayNum);
        localStorage.setItem('dayNum', dayNum);
        insertWeatherData();
    });
    
    $('.arrow').on('click', '.previous', function(event){
        event.preventDefault();
        dayNum = JSON.parse(localStorage.getItem('dayNum'));
        dayNum--;
        blockSliderArrow(dayNum);
        localStorage.setItem('dayNum', dayNum);
        insertWeatherData();
    });
});
// document ready end

// block slider function
function blockSliderArrow(dayNum) {
    if(dayNum === 0) {
        $('.arrow .previous').addClass('none-active')
    } else if (dayNum === 12) {
         $('.arrow .next').addClass('none-active')
    } else {
         $('.arrow .previous').removeClass('none-active')
         $('.arrow .next').removeClass('none-active')
    }
}

// Insert weather data
function insertWeatherData(){
    
    data = JSON.parse(localStorage.getItem('WeatherArray'));
    dayNum = JSON.parse(localStorage.getItem('dayNum'));
    
    console.log(data)
    console.log(dayNum)
    
    moment.locale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[last] dddd',
            nextWeek : 'dddd',
            sameElse : 'L'
        }
    });
    var offset = (new Date()).getTimezoneOffset()*60*1000;
	var localTime = new Date( data.list[dayNum].dt*1000 - offset);
	var currentDay = moment(localTime).calendar();
	var currentDate = moment(localTime).format('MMMM, D');
	
	var localTimeLastDay = new Date( data.list[Math.abs(dayNum-1)].dt*1000 - offset);
	var lastDay = moment(localTimeLastDay).calendar();
	
	var localTimeSecondDay = new Date( data.list[dayNum+1].dt*1000 - offset);
	var secondDay = moment(localTimeSecondDay).calendar();
	var secondDateSmall = moment(localTimeSecondDay).format('MMM D');
	
	var localTimeThirdDay = new Date( data.list[dayNum+2].dt*1000 - offset);
	var thirdDay = moment(localTimeThirdDay).calendar();
	var thirdDateSmall = moment(localTimeThirdDay).format('MMM D');
	
	var localTimeFourthDay = new Date( data.list[dayNum+3].dt*1000 - offset);
	var fourthDay = moment(localTimeFourthDay).calendar();
	var fourthDateSmall = moment(localTimeFourthDay).format('MMM D');
	
    var currentPostcard;
        switch (data.list[dayNum].weather[0].icon) {
                case '01d':
                case '01n':
                    currentPostcard = 'sun';
                    break;
                case '02d':
                case '02n':
                    currentPostcard = 'sun';
                    break;
                case '03d':
                case '03n':
                    currentPostcard = 'sun';
                    break;
                case '04d':
                case '04n':
                    currentPostcard = 'sun';
                    break;
                case '09d':
                case '09n':
                    currentPostcard = 'rain';
                    break;
                case '10d':
                case '10n':
                    currentPostcard = 'rain';
                    break;
                case '11d':
                case '11n':
                    currentPostcard = 'rain';
                    break;
                case '13d':
                case '13n':
                    currentPostcard = 'snow';
                    break;
                case '50d':
                case '50n':
                    currentPostcard = 'rain';
                    break;
            }
    //insert weather data in main box
    $('.button-box').addClass('visible');
    $('#forecast-date').html('<div class="day-active">' + currentDay + '</div>' +
                            '<div class="data-active">' + currentDate + '</div>');
    $('#forecast-img').html('<img src="img/weather-img/' + data.list[dayNum].weather[0].icon + '.png" alt="weather icon" />' + 
                            '<p>' + data.list[dayNum].weather[0].description + '</p>');
    $('#location-box').html('<p id="location">' + data.city.name + ', ' + data.city.country + '</p>');
    $('#forecast-box-right').html('<img src="img/postcard/postcard-img-' + currentPostcard + '.png" alt="weather postcard image"></img>');
    //insert weather data in sidebar
    $('.sidebar-forecast-open.second-day').html('<div class="side-temp">' + Math.round(data.list[dayNum+1].temp.day) + '&deg</div> <div class="side-forecast-img"> <img src="img/weather-img/white/' + data.list[dayNum+1].weather[0].icon + '.png" alt="weather icon"> </div> <p class="side-day">' + secondDay + '</p>');
    $('.sidebar-forecast-close.second-day').html('<img src="img/weather-img/white/' + data.list[0+1].weather[0].icon + '.png" alt="weather icon"> <div class="side-data-sm">' + secondDateSmall + '</div>');
    $('.sidebar-forecast-open.third-day').html('<div class="side-temp">' + Math.round(data.list[dayNum+2].temp.day) + '&deg</div> <div class="side-forecast-img"> <img src="img/weather-img/white/' + data.list[dayNum+2].weather[0].icon + '.png" alt="weather icon"> </div> <p class="side-day">' + thirdDay + '</p>');
    $('.sidebar-forecast-close.third-day').html('<img src="img/weather-img/white/' + data.list[dayNum+2].weather[0].icon + '.png" alt="weather icon"> <div class="side-data-sm">' + thirdDateSmall + '</div>');
    $('.sidebar-forecast-open.forth-day').html('<div class="side-temp">' + Math.round(data.list[dayNum+3].temp.day) + '&deg</div> <div class="side-forecast-img"> <img src="img/weather-img/white/' + data.list[dayNum+3].weather[0].icon + '.png" alt="weather icon"> </div> <p class="side-day">' + fourthDay + '</p>');
    $('.sidebar-forecast-close.forth-day').html('<img src="img/weather-img/white/' + data.list[dayNum+3].weather[0].icon + '.png" alt="weather icon"> <div class="side-data-sm">' + fourthDateSmall + '</div>');
    $('.previous').html(lastDay);
    $('.next').html(secondDay);
    // insert weather data in chart boxes
    var tempChartData = {
    	labels : ['Morning','Daytime','Evening','Night'],
    	datasets : [
    		{
    			label: 'Chart whith temperature',
    			fillColor : 'rgba(255,255,255,0)',
    			strokeColor : '#0A94C2',
    			pointColor : '#991C1F',
    			pointStrokeColor : 'white',
    			pointHighlightFill : '#EF292B',
    			pointHighlightStroke : 'rgba(255,255,255,0.5)',
    			data : [Math.round(data.list[dayNum].temp.morn),
    			        Math.round(data.list[dayNum].temp.day),
    			        Math.round(data.list[dayNum].temp.eve),
    			        Math.round(data.list[dayNum].temp.night)],
    		}
    	]
    };
    var optionsTemp = 
    {
        tooltipTemplate: '<%= value %>°',
        showTooltips: true,
        onAnimationComplete: function()
        {    
            this.showTooltip(this.datasets[0].points, true);          
        },
        tooltipEvents: []
    };
    var chartTemp = document.getElementById('chart-temp').getContext('2d');
    new Chart(chartTemp).Line(tempChartData, optionsTemp, {
    	responsive: true
    });

    var humidityData = [
		{
			value: data.list[dayNum].humidity,
			color:'#0A94C2',
			highlight: '#0A94C2',
			label: ''
		},
		{
			value: 100-data.list[dayNum].humidity,
			color: 'white',
			highlight: 'white',
			label: ''
		},
	];
    var optionsHumidity = 
        {
            tooltipEvents: []
        };
        
	var chartHumidity = document.getElementById('chart-humidity').getContext('2d');
    new Chart(chartHumidity).Doughnut(humidityData, optionsHumidity, {
		responsive: true
	});
	$('#chart-humidity-num').html('<div class="humidity-num-trgl"></div><div class="humidity-num">' + data.list[dayNum].humidity + '%' + '</div>');
	$('#chart-wind-num').html('<div class="wind-num-trgl"></div><div class="wind-num">' + data.list[dayNum].speed + 'm/s' + '</div>');
	$("#wind-image").rotate({animateTo:data.list[dayNum].deg});
}
