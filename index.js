let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentDate.getMinutes();

if (minute < 10) {
  minute = `0${minute}`;
}

let time = document.querySelector("#dayAndTime");
time.innerHTML = `${day} ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

// This function displays the weather forecast for each day
function displayForecast(response) {
  let forecast = response.data.daily;
  forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let maxTemp = Math.round(forecastDay.temp.max);
      let minTemp = Math.round(forecastDay.temp.min);
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2">
            <div class="weather-date">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
              alt="Weather Description Icon" class="description-icon" id="description-icon">
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">${maxTemp}°</span>
              <span class="forecast-temperature-min">${minTemp}°</span>
            </div>
          </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// This function shows the weather of different cities across the world
function checkWeather(response) {
  console.log(response);
  celsiusTemperature = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  let weatherCondition = document.querySelector("#weather-condition");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(celsiusTemperature);
  let precipitationElement = document.querySelector("#precipitation");
  let precipitation = Math.round(response.data.clouds.all);
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  let descriptionIcon = document.querySelector("#description-icon");

  cityElement.innerHTML = response.data.name;
  weatherCondition.innerHTML = response.data.weather[0].main;
  temperatureElement.innerHTML = `${temperature}`;
  precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;
  windElement.innerHTML = `Wind Speed: ${windSpeed}km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  descriptionIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(checkWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let submitForm = document.querySelector("#form-container");
submitForm.addEventListener("submit", handleSubmit);

// This function shows the weather in the current location
function showCurrentWeather(response) {
  let currentPosition = document.querySelector("#city");
  let position = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let weatherCondition = document.querySelector("#weather-condition");
  let condition = response.data.weather[0].main;
  let precipitationElement = document.querySelector("#precipitation");
  let precipitation = Math.round(response.data.clouds.all);
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);

  currentPosition.innerHTML = `${position}`;
  currentTemperature.innerHTML = `${temperature}`;
  weatherCondition.innerHTML = `${condition}`;
  precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;
  windElement.innerHTML = `Wind Speed: ${windSpeed}km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showCurrentWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Lagos");
