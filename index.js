document.addEventListener("DOMContentLoaded", () => {
  populateCities();
  const citySelect = document.getElementById("citiesList");
  citySelect.addEventListener("change", filterCity);
});

function populateCities() {
  let cityList = document.getElementById("citiesList");

  cities.forEach((city) => {
    const option = new Option(city.name);
    cityList.appendChild(option);
  });
}

async function filterCity() {
  const selectedCity = document.getElementById("citiesList").value;

  let city = cities.find((city) => {
    return selectedCity == city.name;
  });

  let stationLookupUrl = `https://api.weather.gov/points/${city.latitude},${city.longitude}`;

  const response = await fetch(stationLookupUrl);
  const data = await response.json();

  let weatherUrl = data.properties.forecast;
  getWeather(weatherUrl);
}

async function getWeather(weatherUrl) {
  const response = await fetch(weatherUrl);
  const data = await response.json();

  let forecastArray = data.properties.periods;
  displayWeather(forecastArray);
}

function displayWeather(forecastArray) {
  const weatherContainer = document.getElementById("weatherContent");

  weatherContainer.innerHTML = "";

  forecastArray.forEach((forecast) => {
    const weatherForecast = document.createElement("p");
    weatherForecast.innerText = `${forecast.name}: Temperature ${forecast.temperature} ${forecast.temperatureUnit}  Winds ${forecast.windDirection} ${forecast.windDirection}   ${forecast.shortForecast}`;
    weatherContainer.appendChild(weatherForecast);
    const breakElement = document.createElement("br");
    weatherContainer.appendChild(breakElement);
  });
}
