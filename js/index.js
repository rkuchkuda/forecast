
$( document ).ready(function() {
    console.log( "ready!" );
    
    $('#btn').click(function () {
        getWeatherByCity(insertWeatherData, showError, $('#search-loc').val());
    });
    
    getWeatherData(insertWeatherData, showError);
    
     $('#search-loc').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btn').trigger('click');
            return false;
        }
    }); 
    
    
    
    
    
    var dayNum = 0;
    //var currentGeolocation;

    
    navigationSlider(dayNum);
     
     
    /*if ($('body').hasClass('home')) {
        navigator.geolocation.getCurrentPosition(getWeatherData, error);
    } */
     
     
    // function positionLatLon(position, currentGeolocation) {
    //     currentGeolocation = position;
    //     return currentGeolocation;
      
    // }
    
    //console.log(currentGeolocation);    
     
    // all click and hover event
     
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

 
 
    // slider navigation
    $('.arrow').on('click', '.next', function(event){
        event.preventDefault();
        dayNum++;
        console.log(dayNum);
        navigationSlider(dayNum);
    });
    
    $('.arrow').on('click', '.previous', function(event){
        event.preventDefault();
        dayNum--;
        console.log(dayNum);
        navigationSlider(dayNum);
    });


    function showError(msg){
        $('.forecast-box').html('<div class="geolocationerror">' + msg + '</div>');
	}
});


function navigationSlider(dayNum) {
    if(dayNum === 0) {
        $('.arrow .previous').addClass('none-active')
    } else if (dayNum === 15) {
         $('.arrow .next').addClass('none-active')
    } else {
         $('.arrow .previous').removeClass('none-active')
         $('.arrow .next').removeClass('none-active')
    }
}



/*function getWeatherData(position){
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +position.coords.longitude + '&units=metric' + '&lang=en&callback=?&appid=2239135b18e8b5e093a144e55b94b5d6', function(data){
        $('.button-box').addClass('visible');
        insertWeatherData(data);
        charts(data);
    	
    });
}*/

/*function error(err) {
  $('.forecast-box').html('<div class="geolocationerror">Please choose location for weather forecast</div>');
  console.warn('ERROR(' + err.code + '): ' + err.message);
}*/

function insertWeatherData(data){
    var offset = (new Date()).getTimezoneOffset()*60*1000;
    	
	var localTime = new Date( data.list[0].dt*1000 - offset);
	var currentDay = moment(localTime).calendar();
	var currentDate = moment(localTime).format('MMMM, D');
	
	var localTimeSecondDay = new Date( data.list[0+1].dt*1000 - offset);
	var secondDay = moment(localTimeSecondDay).calendar();
	var secondDateSmall = moment(localTimeSecondDay).format('D.M ');
	
	var localTimeThirdDay = new Date( data.list[0+2].dt*1000 - offset);
	var thirdDay = moment(localTimeThirdDay).calendar();
	var thirdDateSmall = moment(localTimeThirdDay).format('D.M ');
	
	var localTimeFourthDay = new Date( data.list[0+3].dt*1000 - offset);
	var fourthDay = moment(localTimeFourthDay).calendar();
	var fourthDateSmall = moment(localTimeFourthDay).format('D.M ');
	
    
    var currentPostcard;
        switch (data.list[0].weather[0].icon) {
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
    $('#forecast-img').html('<img src="img/weather-img/' + data.list[0].weather[0].icon + '.png" alt="weather icon" />' + 
                            '<p>' + data.list[0].weather[0].description + '</p>');
    $('#location-box').html('<p id="location">' + data.city.name + ', ' + data.city.country + '</p>');
    $('#forecast-box-right').html('<img src="img/postcard/postcard-img-' + currentPostcard + '.png"></img>');
    //insert weather data in sidebar
    $('.sidebar-forecast-open.second-day').html('<div class="side-temp">' + Math.round(data.list[0+1].temp.day) + '&deg</div> <div class="side-forecast-img"> <img src="img/weather-img/white/' + data.list[0+1].weather[0].icon + '.png"> </div> <p class="side-day">' + secondDay + '</p>');
    $('.sidebar-forecast-close.second-day').html('<img src="img/weather-img/white/' + data.list[0+1].weather[0].icon + '.png"> <div class="side-data-sm">' + secondDateSmall + '</div>');
    $('.sidebar-forecast-open.third-day').html('<div class="side-temp">' + Math.round(data.list[0+2].temp.day) + '&deg</div> <div class="side-forecast-img"> <img src="img/weather-img/white/' + data.list[0+2].weather[0].icon + '.png"> </div> <p class="side-day">' + thirdDay + '</p>');
    $('.sidebar-forecast-close.third-day').html('<img src="img/weather-img/white/' + data.list[0+2].weather[0].icon + '.png"> <div class="side-data-sm">' + thirdDateSmall + '</div>');
    $('.sidebar-forecast-open.forth-day').html('<div class="side-temp">' + Math.round(data.list[0+3].temp.day) + '&deg</div> <div class="side-forecast-img"> <img src="img/weather-img/white/' + data.list[0+3].weather[0].icon + '.png"> </div> <p class="side-day">' + fourthDay + '</p>');
    $('.sidebar-forecast-close.forth-day').html('<img src="img/weather-img/white/' + data.list[0+3].weather[0].icon + '.png"> <div class="side-data-sm">' + fourthDateSmall + '</div>');
    
    // insert weather data in chart boxes
    var tempChartData = {
    	labels : ['Morning','Daytime','Evening','Night'],
    	datasets : [
    		{
    			label: 'Chart whith temperature',
    			fillColor : 'white',
    			strokeColor : '#0A94C2',
    			pointColor : '#991C1F',
    			pointStrokeColor : 'white',
    			pointHighlightFill : '#EF292B',
    			pointHighlightStroke : 'rgba(255,255,255,0.5)',
    			data : [Math.round(data.list[0].temp.morn),
    			        Math.round(data.list[0].temp.day),
    			        Math.round(data.list[0].temp.eve),
    			        Math.round(data.list[0].temp.night)],
    		}
    	]
    
    }
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
			value: data.list[0].humidity,
			color:'#0A94C2',
			highlight: '#0A94C2',
			label: ''
		},
		{
			value: 100-data.list[0].humidity,
			color: 'white',
			highlight: 'white',
			label: ''
		},
	];
    var optionsHumidity = 
        {
            tooltipTemplate: '<%= value %>%',
            showTooltips: true,
            onAnimationComplete: function()
            {    
                this.showTooltip(this.segments, true);          
            },
            tooltipEvents: []
        };
        
	var chartHumidity = document.getElementById('chart-humidity').getContext('2d');
    new Chart(chartHumidity).Doughnut(humidityData, optionsHumidity, {
		responsive: true
	});
	
	var pressureData = {
		labels : ['Normal','Current'],
		datasets : [
			{
				fillColor : '#0A94C2',
				strokeColor : 'white',
				highlightFill: '#991C1F',
				highlightStroke: 'white',
				data : [760, Math.round(data.list[0].pressure*0.7501)] //convert from hPa to mm Hg
			},
		]
	};
    var optionsPressure = 
        {
            showTooltips: true,
            onAnimationComplete: function()
            {    
                this.showTooltip(this.datasets[0], true);          
            },
            tooltipEvents: []
        };
        
	var chartPressure = document.getElementById('chart-pressure').getContext('2d');
    new Chart(chartPressure).Bar(pressureData, //optionsPressure, 
                                {responsive: true
	});
    
    
}

/* inserted this function in main function
function charts (data){
      var tempChartData = {
    			labels : ['Morning','Daytime','Evening','Night'],
    			datasets : [
    				{
    					label: 'Chart whith temperature',
    					fillColor : 'white',
    					strokeColor : '#0A94C2',
    					pointColor : '#991C1F',
    					pointStrokeColor : 'white',
    					pointHighlightFill : '#EF292B',
    					pointHighlightStroke : 'rgba(255,255,255,0.5)',
    					data : [Math.round(data.list[0].temp.morn),
    					        Math.round(data.list[0].temp.day),
    					        Math.round(data.list[0].temp.eve),
    					        Math.round(data.list[0].temp.night)],
    				}
    			]
    
    		}
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
    		
    		// chart for humidity
            var humidityData = [
				{
					value: data.list[0].humidity,
					color:'#0A94C2',
					highlight: '#0A94C2',
					label: ''
				},
				{
					value: 100-data.list[0].humidity,
					color: 'white',
					highlight: 'white',
					label: ''
				},
			];
            var optionsHumidity = 
                {
                    tooltipTemplate: '<%= value %>%',
                    showTooltips: true,
                    onAnimationComplete: function()
                    {    
                        this.showTooltip(this.segments, true);          
                    },
                    tooltipEvents: []
                };
                
    		var chartHumidity = document.getElementById('chart-humidity').getContext('2d');
    	    new Chart(chartHumidity).Doughnut(humidityData, optionsHumidity, {
    			responsive: true
    		});
    		
    		var pressureData = {
				labels : ['Normal','Current'],
        		datasets : [
        			{
        				fillColor : '#0A94C2',
        				strokeColor : 'white',
        				highlightFill: '#991C1F',
        				highlightStroke: 'white',
        				data : [760, Math.round(data.list[0].pressure*0.7501)] //convert from hPa to mm Hg
        			},
        		]
			};
            var optionsPressure = 
                {
                    showTooltips: true,
                    onAnimationComplete: function()
                    {    
                        this.showTooltip(this.datasets[0], true);          
                    },
                    tooltipEvents: []
                };
                
    		var chartPressure = document.getElementById('chart-pressure').getContext('2d');
    	    new Chart(chartPressure).Bar(pressureData, //optionsPressure, 
    	                                {responsive: true
    		});
}
*/