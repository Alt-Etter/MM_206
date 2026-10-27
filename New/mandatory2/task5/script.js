// Task 5 - Weather forecast for Landvik

const url = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=58.34&lon=8.52";
const daysDiv = document.getElementById("days");

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();

  // timeseries is a list with one entry for each hour (and later every 6th hour)
  const timeseries = data.properties.timeseries;

  // Only keep the entries at 12:00 UTC
  const noonEntries = [];
  for (let i = 0; i < timeseries.length; i++) {
    const entry = timeseries[i];
    // time looks like "2026-10-27T12:00:00Z"
    if (entry.time.endsWith("T12:00:00Z")) {
      noonEntries.push(entry);
    }
  }

  // If it is already past 12:00 UTC today, the first noon is tomorrow,
  // so we just take the first 7 noon entries either way
  const sevenDays = noonEntries.slice(0, 7);

  showWeather(sevenDays);
}

function showWeather(entries) {
  daysDiv.innerHTML = "";

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // Temperature, wind speed and wind direction are the values at 12:00 ("instant")
    const details = entry.data.instant.details;
    const temperature = details.air_temperature;
    const windSpeed = details.wind_speed;
    const windDirection = details.wind_from_direction;

    // The icon is the forecast for the next 12 hours
    const symbol = entry.data.next_12_hours.summary.symbol_code;

    const date = new Date(entry.time).toLocaleDateString("en-US");

    const div = document.createElement("div");
    div.className = "day";

    // The icons are in the weathericons folder from Canvas (e.g. weathericons/svg/rain.svg)
    div.innerHTML =
      '<img src="weathericons/svg/' + symbol + '.svg" alt="' + symbol + '">' +
      '<div>' +
        '<div class="date">' + date + '</div>' +
        '<div>Temperature: ' + temperature + '°C</div>' +
        '<div>Wind speed: ' + windSpeed + ' m/s</div>' +
        '<div>Wind direction: ' + windDirection + '°</div>' +
      '</div>';

    daysDiv.appendChild(div);
  }
}

getWeather();
