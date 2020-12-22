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
        getUVInfo(response)
        storedLastWeather(response);
        displaySearchHistory(response);


    });
}


$("#add-weather").on("click", function (event) {
    event.preventDefault();

    getForecast();
    getCurrentWeatherInfo();
    // storedLastWeather();
    displaySearchHistory();

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
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast/?q=" + cityName + " &units=imperial&appid=111bd09519012867035e16b4e2d0ebd1"

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log("data", response)


        $("#day1").text(response.list[0].dt_txt);
        var iconcode1 = response.list[0].weather[0].icon;
        var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
        $("#icon1").attr("src", iconurl1);
        $("#temp1").text(response.list[0].main.temp);
        $("#humidity1").text(response.list[0].main.humidity);


        $("#day2").text(response.list[8].dt_txt);
        var iconcode2 = response.list[8].weather[0].icon;
        var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
        $("#icon2").attr("src", iconurl2);
        $("#temp2").text(response.list[8].main.temp);
        $("#humidity2").text(response.list[8].main.humidity);

        $("#day3").text(response.list[16].dt_txt);
        var iconcode3 = response.list[16].weather[0].icon;
        var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
        $("#icon3").attr("src", iconurl3);
        $("#temp3").text(response.list[16].main.temp);
        $("#humidity3").text(response.list[16].main.humidity);

        $("#day4").text(response.list[24].dt_txt);
        var iconcode4 = response.list[24].weather[0].icon;
        var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
        $("#icon4").attr("src", iconurl4);
        $("#temp4").text(response.list[24].main.temp);
        $("#humidity4").text(response.list[24].main.humidity);

        $("#day5").text(response.list[30].dt_txt);
        var iconcode5 = response.list[30].weather[0].icon;
        var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
        $("#icon5").attr("src", iconurl5);
        $("#temp5").text(esponse.list[30].main.temp);
        $("#humidity5").text(response.list[30].main.humidity);

    })
}



function storedLastWeather(response) {

    localStorage.setItem("lastCity", response)

}

function displayDefaultWeather() {

    var lastCity = localStorage.getItem("lastCity")
    console.log(lastCity)

}

displayDefaultWeather();


function displaySearchHistory(response) {
    $("#searchHistory").empty();

    $("#searchHistory").val(localStorage.getItem("response"));



}





