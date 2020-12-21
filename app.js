var userCityInput = [];
let tempEl = $(".temp");

function getCurrentWeatherInfo() {
    var cityName = $("#weather-input").val()
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=111bd09519012867035e16b4e2d0ebd1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        displayCurrentWeather(response);
        getUVInfo(response)
        storedLastWeather(response);
        

    });
}

$("#add-weather").on("click", function (event) {
    event.preventDefault();
    getForecast();
    getCurrentWeatherInfo();

})


function displayCurrentWeather(weather) {

    $("#city").text(weather.name)
    // check string
    $("#currentDate").text(new Date(weather.dt * 1000).toLocaleDateString())

    var iconcode = weather.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $("#weatherIcon").attr("src", iconurl)
    $("#temperature").text(((weather.main.temp - 273.15) * 1.80 + 32).toFixed(0));
    $("#humidity").text(weather.main.humidity)
    $("#wind").text((weather.wind.speed * 2.237).toFixed(0))


}

function getUVInfo(weather) {

    var latitude = weather.coord.lat;
    var longitude = weather.coord.lon;

    var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=111bd09519012867035e16b4e2d0ebd1"

    $.ajax({
        url: UVqueryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response)

        $("#UV").text(response.value)


    });
}


function getForecast() {
    var cityName = $("#weather-input").val()
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast/?q=" + cityName +" &units=imperial&appid=111bd09519012867035e16b4e2d0ebd1"

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $("#temp1").text("Temp: " + response.list[1].main.temp + "°F");
        $("#temp2").text("Temp: " + response.list[2].main.temp + "°F");
        $("#temp3").text("Temp: " + response.list[3].main.temp + "°F");
        $("#temp4").text("Temp: " + response.list[4].main.temp + "°F");
        $("#temp5").text("Temp: " + response.list[5].main.temp + "°F");
     
    })
}   



function storedLastWeather(city) {

    localStorage.setItem("lastCity", city)

}

function displayDefaultWeather() {

    var lastCity = localStorage.getItem("lastCity")
    console.log(lastCity)
    if (lastCity === null) {
        getCurrentWeatherInfo(lastCity);
    }
}

displayDefaultWeather();






// empty method 

