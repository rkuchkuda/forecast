function getWeatherData(fnOK, fnError){
    if ($('body').hasClass('home')) {
        navigator.geolocation.getCurrentPosition(locSuccess, locError);
    } 
    function locSuccess(position) {
        $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +position.coords.longitude + '&cnt=16&units=metric&lang=en&callback=?&appid=2239135b18e8b5e093a144e55b94b5d6', 
            function(data){
                localStorage.setItem('dayNum', 0);
                localStorage.setItem('WeatherArray', JSON.stringify(data));
                fnOK.call(this, data);
                $('.forecast-box').removeClass('load');
            });
    }
    function locError(error) {
        var message = 'Location error. ';
        $('.forecast-box').removeClass('load');
        switch(error.code) {
            case error.TIMEOUT:
                message += 'A timeout occured! Please try again! You can also use search input to get weather forecast';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'We can\'t detect your location. Sorry! You can also use search input to get weather forecast';
                break;
            case error.PERMISSION_DENIED:
                message += 'Please allow geolocation access for this to work. You can also use search input to get weather forecast';
                break;
            case error.UNKNOWN_ERROR:
                message += 'An unknown error occured! You can also use search input to get weather forecast';
                break;
        }
        fnError.call(this, message);
        }
}


function getWeatherByCity(fnOK, fnError, cityName) {
    $.getJSON(
        'http://api.openweathermap.org/data/2.5/forecast/daily?q=' 
        + cityName + '&cnt=16&units=metric' + '&lang=en&callback=?&appid=2239135b18e8b5e093a144e55b94b5d6',
        function (data) {
            localStorage.setItem('WeatherArray', JSON.stringify(data));
            // reset 
            localStorage.setItem('dayNum', 0);
            $('.arrow .previous').addClass('none-active')
            $('.arrow .next').removeClass('none-active')
            // end reset
            $('.forecast-box').removeClass('load');
            fnOK.call(this, data);
        }
    );
}

