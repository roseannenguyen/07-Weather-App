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

$("#weather-input").empty();

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

        if (response.value > 8.0) {
            $("#UV").removeClass().addClass("badge badge-danger");
        }
        else if (6.0 <= response.value && response.value < 8.0) {
            $("#UV").removeClass().addClass("badge badge-warning");
        }
        else if (3.0 <= response.value && response.value < 6.0) {
            $("#UV").removeClass().addClass("badge badge-warning");
        }
        else if (response.value < 3.0) {
            $("#UV").removeClass().addClass("badge badge-success");
        };


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
        
        var response = response.list;

        for (let i = 0; i = response.list.length; i++) {
    
        $(`#temp${i}`).text("Temp: " + response.list[i].main.temp + "°F");
        }
        // $("#day2").text(response.list[i].dt_txt);
        // $("#temp2").text("Temp: " + response.list[i].main.temp + "°F");

        // $("#day3").text(response.list[16].dt_txt);
        // $("#temp3").text("Temp: " + response.list[16].main.temp + "°F");

        // $("#day4").text(response.list[16].dt_txt);
        // $("#temp4").text("Temp: " + response.list[24].main.temp + "°F");

        // $("#day5").text(response.list[16].dt_txt);
        // $("#temp5").text("Temp: " + response.list[30].main.temp + "°F");
     
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

