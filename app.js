var userCityInput = [];

function getCurrentWeatherInfo() {

    
     var cityName = $("#weather-input").val()
    

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=111bd09519012867035e16b4e2d0ebd1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

       displayCurrentWeather(response);

       storedLastWeather(cityName);

    });
}

$("#add-weather").on("click", function(event){
    event.preventDefault();

    

    getCurrentWeatherInfo();

    })


function displayCurrentWeather(weather) {

$("#city").text(weather.name)
// check string
$("#currentDate").text(new Date(weather.dt * 1000).toLocaleTimeString())

var iconcode = weather.weather[0].icon;
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
$("#weatherIcon").attr("src", iconurl)

// math
$("#temperature").text(weather.main.temp)
$("#humidity").text(weather.main.humidity)
$("#wind").text(weather.wind.speed)


}
    
// function displayUVInfo() {

//     var latitude = weather.coord.lat;
//     var longitude = weather.coord.lon;

//     var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=111bd09519012867035e16b4e2d0ebd1"

//     $.ajax({
//         url: UVqueryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response)

//         $(document).on("click", ".city", function(event){
//         event.preventDefault();
//         })
//     });
// }

// function displayForecast() {

// }


// function renderWeather() {




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