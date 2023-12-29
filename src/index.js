function refreshWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let currentCity = document.querySelector("#current-city");
  let currentDescription = document.querySelector("#current-description");
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="icon"
    />`;

  let currentHumidity = document.querySelector("#current-humidity");
  let currentCountry = document.querySelector("#current-country");
  let currentPressure = document.querySelector("#current-pressure");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  currentCity.innerHTML = response.data.city;
  currentDescription.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentCountry.innerHTML = response.data.country;
  currentPressure.innerHTML = response.data.temperature.pressure;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentTime.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${month} ${date.getDate()}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8b568tdd52ea0467a4ff3f2cbo8f1f31";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "8b568tdd52ea0467a4ff3f2cbo8f1f31";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function displayForecast(response) {
  let todayHtml = "";
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if ((index < 5) & (index > 0)) {
      forecastHtml += `
          <div class="forecast-card">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div><img src="${
              day.condition.icon_url
            }"  class="weather-forecast-icon" /></div>
            <div class="weather-forecast-temperatures">
              <span class="max-temp">${Math.round(
                day.temperature.maximum
              )}° </span> ${Math.round(day.temperature.minimum)}°</div>
          </div>
`;
    }
    if (index === 0) {
      todayHtml += `
    <div class="forecast-card forecast-card-today">
            <div class="weather-forecast-date">Today</div>
            <div><img src="${
              day.condition.icon_url
            }"  class="weather-forecast-icon" /></div>
            <div class="weather-forecast-temperatures">
              <span class="max-temp">${Math.round(
                day.temperature.maximum
              )}° </span> ${Math.round(day.temperature.minimum)}°</div>
          </div>
          `;
    }
  });
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = todayHtml + forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Nuremberg");
