function getWeatherData(fnOK, fnError){
    if ($('body').hasClass('home')) {
        navigator.geolocation.getCurrentPosition(locSuccess, locError);
    } 
    function locSuccess(position) {
        $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +position.coords.longitude + '&cnt=16&units=metric&lang=en&callback=?&appid=2239135b18e8b5e093a144e55b94b5d6', 
            function(data){
                fnOK.call(this, data);
            });
    }
    
    function locError(error) {
        var message = 'Location error. ';
        switch(error.code) {
            case error.TIMEOUT:
                message += 'A timeout occured! Please try again!';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'We can\'t detect your location. Sorry!';
                break;
            case error.PERMISSION_DENIED:
                message += 'Please allow geolocation access for this to work.';
                break;
            case error.UNKNOWN_ERROR:
                message += 'An unknown error occured!';
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
            fnOK.call(this, data);
        }
    );
}
