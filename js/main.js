$(function() {
    console.log( 'ready!' );

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

    // take data about geolocation
    navigator.geolocation.getCurrentPosition(getWeatherData, error);
   
    function error(err) {
      $('.forecast-box-left').html('<p>Please allow to take your geolocation or search weather forecast by city</p>');
    }
    
    function getWeatherData(position){
        $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +
                    position.coords.longitude + '&units=metric' + '&lang=en&callback=?&appid=2239135b18e8b5e093a144e55b94b5d6',
            function(data){
                var offset = (new Date()).getTimezoneOffset()*60*1000;
        		var localTime = new Date( data.list[0].dt*1000 - offset);
        		var currentDay = moment(localTime).calendar();
        		var currentDate = moment(localTime).format('MMMM D');
        	    $('#forecast-date').html('<div class="day-active">' + currentDay + '</div>' +
                                        '<div class="data-active">' + currentDate + '</div>');
                $('#forecast-img').html('<img src="img/w/' + data.list[0].weather[0].icon + '.png" alt="weather icon" />' + 
                                        '<p>' + data.list[0].weather[0].description + '</p>');
                $('#location-box').html('<p id="location">' + data.city.name + ', ' + data.city.country + '</p>');
                
                // chart for temperature 
               
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
                        tooltipTemplate: "<%= value %>°",
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
        		/*
        		// chart for humidity
                var humidityData = [
    				{
    					value: data.list[0].humidity,
    					color:"#0A94C2",
    					highlight: "#0A94C2",
    					label: ""
    				},
    				{
    					value: 100-data.list[0].humidity,
    					color: "white",
    					highlight: "white",
    					label: ""
    				},
    			];
                var optionsHumidity = 
                    {
                        tooltipTemplate: "<%= value %>%",
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
        		});*/
        		
            });
    }
    






});