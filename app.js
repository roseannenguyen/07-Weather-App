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
  
       storedLastWeather(response);

    });
}

$("#add-weather").on("click", function(event){
    event.preventDefault();
    // getForecast();
    getCurrentWeatherInfo();

    })


function displayCurrentWeather(weather) {

$("#city").text(weather.name)
// check string
$("#currentDate").text(new Date(weather.dt * 1000).toLocaleDateString())

var iconcode = weather.weather[0].icon;
var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
$("#weatherIcon").attr("src", iconurl)

// math
$("#temperature").text(((weather.main.temp - 273.15) * 1.80 + 32).toFixed(0));

$("#humidity").text(weather.main.humidity)
$("#wind").text((weather.wind.speed*2.237).toFixed(0))


}
    
// function getForecast() {
  
    
//         for (var i = 0; i < 6; i++) {

//         var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
//         var iconDay= response.list[((i+1)*8)-1].weather[0].icon;
//         var iconIMG="https://openweathermap.org/img/wn/"+iconDay+".png";
//         var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
//         var humidity= response.list[((i+1)*8)-1].main.humidity;

//         $("#fDate"+i).text(date);
//             $("#fImg"+i).text("<img src="+iconIMG+">");
//             $("#fTemp"+i).text(tempF+"&#8457");
//             $("#fHumidity"+i).text(humidity+"%");
//         }
      
// }



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