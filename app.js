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
       getForecast(response)

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
    
function getForecast(cityName) {

    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&appid=e6f3f6bbf7d2faca7164fbf775f8f8cf";

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < 6; i++) {

        var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
        var iconDay= response.list[((i+1)*8)-1].weather[0].icon;
        var iconIMG="https://openweathermap.org/img/wn/"+iconDay+".png";
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
        var humidity= response.list[((i+1)*8)-1].main.humidity;

        $("#fDate"+i).html(date);
            $("#fImg"+i).html("<img src="+iconIMG+">");
            $("#fTemp"+i).html(tempF+"&#8457");
            $("#fHumidity"+i).html(humidity+"%");
        }
        

    });

}

// function displayForecast() {
// $("#day1")
// }


// empty method 
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