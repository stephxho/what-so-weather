function refreshWeather(response) {
  console.log(response.data);
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
