$(document).ready(function () {
    var city, country, lat, lon, elem, backgroundPicture, weatherDesc;

// Getting geo data: latitude, longitude, city, country
    function getGeoData() {
        var geoDataRequest = new XMLHttpRequest();
        geoDataRequest.onreadystatechange = function () {
            if (geoDataRequest.readyState === 4 && geoDataRequest.status === 200) {
                var geoObj = JSON.parse(geoDataRequest.responseText);
                city = geoObj.city;
                country = geoObj.countryCode;
                lat = geoObj.lat;
                lon = geoObj.lon;
                getWeatherData();
            }
        }
        geoDataRequest.open("GET", "http://ip-api.com/json", true);
        geoDataRequest.send(null);

    }

// Getting weather data
    function getWeatherData() {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=49037828a4a9d17baba6cc149d2db604&units=imperial";
        var weatherRequest = new XMLHttpRequest();
        weatherRequest.onreadystatechange = function () {
            if (weatherRequest.readyState === 4 && weatherRequest.status === 200) {
                var weatherObj = JSON.parse(weatherRequest.responseText);
                var fahrenheit = weatherObj.main.temp;
                var celsius = (fahrenheit - 32) * 5 / 9;
                var iconURL = 'http://openweathermap.org/img/w/' + weatherObj.weather[0].icon + '.png';
                var icon1 = document.createElement("img");
                icon1.src = iconURL;
                var icon2 = document.createElement("img");
                icon2.src = iconURL;
                elem = document.querySelector(".celsius");
                elem.innerHTML = Math.round(celsius * 10) / 10 + " &#8451" + "<br>" + "<p class = 'city'>" + city + ", " + country + "</p>";
                elem.insertBefore(icon1, elem.childNodes[2]);
                elem = document.querySelector(".fahrenheit");
                elem.innerHTML = Math.round(fahrenheit * 10) / 10 + " &#8457" + "<br>" + "<p class = 'city'>" + city + ", " + country + "</p>";
                elem.insertBefore(icon2, elem.childNodes[2]);
                weatherDesc = weatherObj.weather[0].description;
                image();
                console.log(backgroundPicture);
                elem = document.getElementsByTagName("body")[0];
                elem.style.backgroundImage = 'url(' + backgroundPicture + ')';
                elem.style.backgroundSize = "cover";

            }
        }
        weatherRequest.open("GET", url, true);
        weatherRequest.send(null);
    }

//Defining backgroundImage
    function image() {
        switch (true) {
            case /\bclear\b/i.test(weatherDesc): // match uses regular expression.
                backgroundPicture = 'http://www.gannett-cdn.com/-mm-/1f09360cfabb773cdf6fa082f2fafe397a2d03b1/c=28-0-479-338&r=x404&c=534x401/local/-/media/FortMyers/2014/12/08/B9315415807Z.1_20141208164230_000_GI99BRCAH.1-0.jpg';
                break;
            case /\bovercast\b/i.test(weatherDesc):
                backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/overcast.jpg';
                break;
            case /\bclouds\b/i.test(weatherDesc):
                backgroundPicture = 'https://www.nps.gov/dena/planyourvisit/images/weather1.jpg';
                break;
            case /\brain\b/i.test(weatherDesc):
                backgroundPicture = 'http://weknowyourdreams.com/images/rain/rain-09.jpg';
                break;
            case /\bdrizzle\b/i.test(weatherDesc):
                backgroundPicture = 'http://weknowyourdreams.com/images/rain/rain-09.jpg';
                break;
            case /\bthunderstorm\b/i.test(weatherDesc):
                backgroundPicture = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJ6Ww4FwH6HJ2_C3D6VTc1QN9kECprL0p34GHCrg2Aw-CM6QMaeg';
                break;
            case /\bsnow\b/i.test(weatherDesc):
                backgroundPicture = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT5tbaEda-PjxUL9HqOCdDuq2uHVR8d5OGus1shgMlg8YBbupyh';
                break;
            case /\bmist\b/i.test(weatherDesc):
                backgroundPicture = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTmIG6qqvqFeeIQJdAvMJoIroiOtkeBDfBnU7vfKMrlzzzsraZc';
                break;
            case /\bfog\b/i.test(weatherDesc):
                backgroundPicture = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTmIG6qqvqFeeIQJdAvMJoIroiOtkeBDfBnU7vfKMrlzzzsraZc';
                break;
        }
    }

// Changing units of measure

    var temSign = ["&#8451", "&#8457"];
    var i = 0;
    $(".button").click(function () {
        $("#card").toggleClass("flipped");
        elem = document.querySelector(".button");
        elem.innerHTML = "Show in " + temSign[i];
        i = (i + 1) % 2;
    });
    getGeoData();


})
;
