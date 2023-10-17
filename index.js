//CURRENT DATE

function formatDate(date) {
  let day = today.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  day = days[day];

  let todayDate = today.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];

  return `${day} ${month} ${todayDate}`;
}

//CURRENT TIME
function formatTime(time) {
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentDate = document.querySelector("#date");
let today = new Date();
currentDate.innerHTML = formatDate(today);

let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatTime(today);

// starting work before putting it into a function:
// let today = new Date();

// let date = today.getDate();
// let year = today.getFullYear();
// let hours = today.getHours();
// if (hours < 10) {
//   hours = `0${hours}`;
// }

// let minutes = today.getMinutes();
// if (minutes < 10) {
//   minutes = `O${minutes}`;
// }

// let months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "June",
//   "July",
//   "Aug",
//   "Sept",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// let month = months[today.getMonth()];

// let day = today.getDay();
// let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
// day = days[day]; //original was day = days[today.getDay()]; but you can just use day since it is the same thing due to your let statements.

// let currentDate = document.querySelector("#date");
// let currentTime = document.querySelector("#time");
// currentDate.innerHTML = `${day} ${month} ${date}`;
// currentTime.innerHTML = `${hours}:${minutes}`;

//CITY SEARCH

function onSubmit(event) {
  event.preventDefault();
  let search = document.querySelector("#city-search").value;
  let h1 = document.querySelector("#city");

  // Autocapitalize the first letter
  let firstLetter = search.charAt(0).toUpperCase();
  let restOfString = search.slice(1);
  let capitalizedSearch = firstLetter + restOfString;

  // previous to capitalizing the first letter
  //h1.innerHTML=`${search}`;
  //console.log(search);

  h1.innerHTML = `${capitalizedSearch}`;
}

let citySearch = document.querySelector("#search");

citySearch.addEventListener("submit", onSubmit);

//Temp Conversion to F

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);

  temperatureElement.innerHTML = `${fahrenheitTemp}`;
}

//Temp Converion to C

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  let celsiusTemp = "30";
  temperatureElement.innerHTML = `${celsiusTemp}`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

//Temp switch to F (no conversion)
// function showFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   let fahrenheitTemp = (24 * 9) / 5 + 32;
//   temperatureElement.innerHTML = `${fahrenheitTemp}`;
// }

// ________________________________________________________________

// function unit(event) {
//   event.preventDefault();
//   let fahrenheit = document.querySelector("#fahrenheit");

//   let units = document.querySelector("#unit-value").textContent;
//   console.log(fahrenheit);
//   let calculateF = (${units}*9/5 + 32);
//   units.innerHTML = `${calculateF}`;
//   console.log(units);
// }

// let changeUnits = document.querySelector("a#fahrenheit");

// changeUnits.addEventListener("click", unit);

// function showTemp(degree) {
//   console.log(degree);
// }
// let city = prompt("Enter a city");
// city = city.toLowerCase();

// if (weather[city] !== undefined) {
//   let fahrenheit = Math.round(weather[city].temp * (9 / 5) + 32);
//   let temperature = Math.round(weather[city].temp);
//   let humidity = weather[city].humidity;

//   alert(`It is ${temperature}°C (${fahrenheit}°F) in ${city} with a humidity of ${humidity}%
// `);
// } else {
//   alert("Too bad for you");
// }

//_________________________________________________________________________________________

//Search for temperature

function showCity(event) {
  event.preventDefault();
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let units = "metric";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

let searchBar = document.querySelector("#search");

searchBar.addEventListener("submit", showCity);

function showTemp(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.temp) + "%";
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed) + "km/h";

  let iconElement = document.querySelector("#emoji");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  console.log(icon);
}

//show current location

function getLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let cityNameApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

  axios.get(cityNameApiUrl).then(findCity);
}

function findCity(response) {
  let city = response.data[0].name;
  let units = "metric";
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let cityName = document.querySelector("#city");
  cityName.innerHTML = city;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

// this function was already created earlier in the code and does not need to be repeated since it
// using the same API and all the same responses.
// function showTemp(response) {
//   let tempResult = Math.round(response.data.main.temp);
//   let cityTemp = document.querySelector("#temperature");
//   cityTemp.innerHTML = `${tempResult}`;
//   let description = document.querySelector("#description");
//   description.innerHTML = response.data.weather[0].description;
//   let humidity = document.querySelector("#humidity");
//   humidity.innerHTML = `Humidity: ${Math.round(response.data.main.temp)}%`;
//   let wind = document.querySelector("#wind");
//   wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)}km/h`;

//   let iconElement = document.querySelector("#emoji");
//   let icon = response.data.weather[0].icon;
//   iconElement.setAttribute(
//     "src",
//     `http://openweathermap.org/img/wn/${icon}@2x.png`
//   );
// }

function showLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", showLocation);

//the celsius and F buttons are still f-ed