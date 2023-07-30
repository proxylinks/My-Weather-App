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

function checkWeather(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let weatherCondition = document.querySelector("#weather-condition");
  let temperatureElement = document.querySelector("#temperature");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;
  let precipitationElement = document.querySelector("#precipitation");
  let precipitation = Math.round(response.data.clouds.all);
  precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind Speed: ${windSpeed}km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(checkWeather);
}

let submitForm = document.querySelector("#form-container");
submitForm.addEventListener("submit", cityInput);

// Bonus Task
function showCurrentWeather(response) {
  let currentPosition = document.querySelector("#city");
  console.log(response);
  let position = response.data.name;
  currentPosition.innerHTML = `${position}`;
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;
  let weatherCondition = document.querySelector("#weather-condition");
  let condition = response.data.weather[0].main;
  weatherCondition.innerHTML = `${condition}`;
  let precipitationElement = document.querySelector("#precipitation");
  let precipitation = Math.round(response.data.clouds.all);
  precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind Speed: ${windSpeed}km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
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
