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

// This function shows the weather of different cities across the world
function checkWeather(response) {
  let cityElement = document.querySelector("#city");
  let weatherCondition = document.querySelector("#weather-condition");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
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
  descriptionIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
 

  console.log(response);
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
