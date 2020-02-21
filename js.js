var iconElement = $('.weather-icon');
var fiveDayElement = $('.fiveDayDisplay');
var APIKey = '684857a391a32ea7614be7216a7d5035';
var Search = $('.btn1');
var weather = {};
var KELVIN = 273;
var recentCities = [];
var currentDate = moment().format("ll");
cityStorage();
localStorage.clear();

function saveCity() {
  var city = $('#cityQ').val().trim();
  console.log(city)
  recentCities.push(city);
  localStorage.setItem('recentCities', JSON.stringify(recentCities));
  cityStorage();
}
function cityStorage() {
  var pullCity = JSON.parse(localStorage.getItem('recentCities'));
  if (pullCity && pullCity.length > 0) {
    $('.recentSearches').empty();
    for (var i = 0; i < pullCity.length; i++) {
      var citiesBtn = $('<button>').text(pullCity[i]);
      $('.recentSearches').prepend(citiesBtn);
      citiesBtn.addClass('citySearch')
    }
    recentCities = pullCity;
    console.log(recentCities);
  } else {
    recentCities = [];
  }
}

function getCity(event) {
  event.preventDefault();
 // $('.container').display = 'none';
  var city = $('#cityQ').val().trim();
  console.log(city);
  var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey;
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function (response) {
    var data = response
    console.log(data)
    console.log(data.list[0].main.temp - KELVIN);
    weather.tempature = Math.floor((data.list[0].main.temp - 273) *1.8) + 32;
    weather.description = data.list[0].weather[0].description;
    console.log(weather.description);
    weather.humidity = data.list[0].main.humidity;
    weather.city = data.city.name;
    console.log(weather.city);
    weather.icon = data.list[0].weather[0].icon;
    weather.speed = data.list[0].wind.speed;
    latitude = data.city.coord.lat;
    longitude = data.city.coord.lon;
    console.log(latitude);
    console.log(longitude);
    show5dayWeather(data)

    $('#mainCity').text(weather.city + ' (' + currentDate + ')');
    $('#mainTemp').text('Tempature: ' + weather.tempature + 'F*');
    $('#mainHumidity').text('Humidity: ' + weather.humidity);
    $('#mainWindS').text('Wind Speed: ' + weather.speed);

  }).then(function() {
    UVurl = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + latitude + '&lon=' + longitude;
    $.ajax({
      url: UVurl,
      method: "GET",
    }).then(function (response) {
      console.log(response)
      UVDiv = $('#mainUV');
      UVDiv.removeClass('badge-success badge-warning badge-danger')
      weather.UV = response.value;
      $('#mainUV').text('Uv Index: ' + weather.UV);
      if (weather.UV <= 2) {
        UVDiv.addClass('badge-success');
      } else if (weather.UV > 2 && weather.UV <= 7) {
        UVDiv.addClass('badge-warning');
      } else if (weather.UV >= 7) {
        UVDiv.addClass('badge-danger');
      }
      console.log(weather.UV);

    })

  });
}


 function show5dayWeather(data){
    console.log(data)
    
    for( var i = 0; i < 40; i++){
    if(data.list[i].dt_txt.indexOf("12:00:00") !== -1){
      var day = data.list[i].dt
      var dayDate = (moment(day, "X").format("MMM Do YY"));
      var temp = data.list[i].main.temp;
      var humid = data.list[i].main.humidity;
      var iconimg = data.list[i].weather[0].icon;
      var Ftemp = Math.floor((temp - 273) *1.8) + 32;
      var content = `
    <div class="card fiveDay">
    <div class="card-body">
      <h4 class="card-title">${dayDate}'</h4>
      <h5 class="card-text">Temp: ${Ftemp} F*</h5>
      <h5 class = 'card-text'>Humidity: ${humid} %</h5>
      <img src="http://openweathermap.org/img/wn/"${iconimg}.icon}".png">
      
      
    </div>
  </div>
          `

      $('.fiveDayDisplay').append(content);
    }
    }
  }






  Search.on('click', getCity);
  //Search.on('click', getUv);
  Search.on('click', saveCity);
Search.on('click', show5dayWeather);