function refreshWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let currentCity = document.querySelector("#current-city");
  let currentDescription = document.querySelector("#current-description");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentCountry = document.querySelector("#current-country");
  let currentPressure = document.querySelector("#current-pressure");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  currentCity.innerHTML = response.data.city;
  currentDescription.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentCountry.innerHTML = response.data.country;
  currentPressure = response.data.temperature.pressure;
  currentWindSpeed = response.data.wind.speed;
}

function searchCity(city) {
  //make api call and update the interface
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Nuremberg");
