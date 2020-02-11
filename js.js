var iconElement = $('.weather-icon');
var tempElement = $('.tempature-value p');
var descElement = $('.tempature-description p');
var locationElement = $('.location p');
var notificationElement = $('.notification');
var APIKey = '684857a391a32ea7614be7216a7d5035';
var Search = $('.btn1');
var weather = {};
var KELVIN = 273;


 

  function getCity(event){
      event.preventDefault();
      var city = $('#cityQ').val().trim();
     console.log(city);
     var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&appid=684857a391a32ea7614be7216a7d5035'
  $.ajax({
    url : queryURL,
    method: 'GET',
}).then(function(response){
   var data = response
    console.log(data)
    console.log(data.list[0].main.temp - KELVIN);
    weather.tempature = Math.floor(data.list[0].main.temp - KELVIN);
    weather.description = data.list[0].weather[0].description;
    console.log(weather.description);
    weather.humidity = data.list[0].main.humidity;
    weather.city = data.city.name;
    console.log(weather.city);
    weather.icon = data.list[0].weather[0].icon;
    weather.speed = data.list[0].wind.speed;

    console.log(data[0].value)

    

 
}); 


  };
 // $('.btn1').on('click', getCity(event));
  // var $form = document.querySelector('.input-group.mb-3 form');
  
Search.on('click', getCity);
