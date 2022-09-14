/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");

city = city.toLowerCase();

if (weather[city] !== undefined) {
  let temperatura = weather[city].temp;
  let roundTemp = Math.round(temperatura);
  let humidity = weather[city].humidity;
  let temperaturaForeng = Math.round(roundTemp * 1.8 + 32);

  alert(
    `It is currently ${roundTemp}°C (${temperaturaForeng}°F) in ${city} with a humidity of ${humidity}`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}*/

let now = new Date();

let currentDay = document.querySelector("#currentDay");

let days = [
  "Saturday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Sanday",
];

let day = days[now.getDay()];

currentDay.innerHTML = `${day}`;

let currentTime = document.querySelector("#currentTime");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentTime.innerHTML = `${hour}:${minutes}`;

let currentDate = now.getDate();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let month = months[now.getMonth()];

let currentDayMonth = document.querySelector("#currentDate");
currentDayMonth.innerHTML = `${currentDate}.${month}`;

let h1Default = document.querySelector("h1").innerHTML;
console.log(h1Default);

/*function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = `${h1Default}`;
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function tempCels() {
  let celsius = document.querySelector("h2");

  celsius.innerHTML = `32°`;
}
let showTempCels = document.querySelector("#celsius-link");
showTempCels.addEventListener("click", tempCels);

function tempFor() {
  let foreng = document.querySelector("h2");

  foreng.innerHTML = `68°`;
}
let showTempForeng = document.querySelector("#farenheit-link");
showTempForeng.addEventListener("click", tempFor);*/

function showTemperature(response) {
  let temperatura = Math.round(response.data.main.temp);

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperatura}°C`;
}

function search(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-text-input");
  console.log(cityInput.value);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  let h1 = document.querySelector("h1");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    h1.innerHTML = `${h1Default}`;
  }
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showCurrentTemperature(responce) {
  console.log(responce);
  let temperatura = Math.round(responce.data.main.temp);
  let currentWeather = document.querySelector("h2");
  currentWeather.innerHTML = `${temperatura}°C`;
  let currentCountry = responce.data.sys.country;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `In ${currentCountry}`;
}

function currentPositionWeather(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlCurrent = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlCurrent).then(showCurrentTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPositionWeather);
}

let buttonCurrent = document.querySelector("#button-current");
buttonCurrent.addEventListener("click", getCurrentPosition);
