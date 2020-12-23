function getCurrentWeatherInfo(cityName) {


    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=111bd09519012867035e16b4e2d0ebd1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        displayCurrentWeather(response);
        getUVInfo(response)
        storedLastWeather(cityName);
        displaySearchHistory(cityName);


    });
}

$("#add-weather").on("click", function (event) {
    event.preventDefault();
    var city = $("#weather-input").val()

    getForecast();
    getCurrentWeatherInfo(city);

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
};


function getForecast() {
    var cityName = $("#weather-input").val();
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast/?q=" + cityName + " &units=imperial&appid=111bd09519012867035e16b4e2d0ebd1";

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var number = 1;

        for (var i = 5; i < response.list.length; i = i + 8) {
            $("#day" + number).text(response.list[i].dt_txt);
            var iconcode = response.list[i].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $("#icon" + number).attr("src", iconurl);
            $("#temp" + number).text(response.list[i].main.temp);
            $("#humidity" + number).text(response.list[i].main.humidity);
            number++;
        }

    });

};



function storedLastWeather(city) {
    console.log(city)
    localStorage.setItem("lastCity", city);
    var savedHistory = JSON.parse(localStorage.getItem("cities"))
    console.log(savedHistory)
    if (savedHistory === null) {
        savedHistory = [];
        console.log(savedHistory)
    };
    savedHistory.push(city)
   
    console.log(savedHistory)
    localStorage.setItem("cities", JSON.stringify(savedHistory))
};


function displaySearchHistory() {
    $("#searchHistory").empty();
    var savedHistory = JSON.parse(localStorage.getItem("cities"))
    
    if (savedHistory === null) {
        savedHistory = [];
    };

    for (var i = 0; i < savedHistory.length; i++) {
        var button = $("<button>")
        button.text(savedHistory[i])
        button.addClass("btn btn-success")
        $("#searchHistory").append(button)
    }
}

var city = localStorage.getItem("lastCity")
if (city !== null) {
    getCurrentWeatherInfo(city)
}
else {
    displaySearchHistory()
}





