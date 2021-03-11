import { getWeatherByCity } from './apiService.js'

const viewElements = {};

const getDomElement = id => {
  return document.getElementById(id)
};

const connectDOMElements = () => {
  viewElements.mainContainer = getDomElement('mainContainer');
  viewElements.weatherSearchView = getDomElement('weatherSearchView');
  viewElements.weatherForecastView = getDomElement('weatherForecastView');
  viewElements.loaderContainer = getDomElement('loaderContainer');

  viewElements.searchedCityWeather = getDomElement('searchedCityWeather');
  viewElements.weatherIcon = getDomElement('weatherIcon');
  viewElements.currentWeatherTemp = getDomElement('currentWeatherTemp');
  viewElements.weatherMinTemp = getDomElement('weatherMinTemp');
  viewElements.weatherMaxTemp = getDomElement('weatherMaxTemp');
  viewElements.windSpeed = getDomElement('windSpeed');

  viewElements.searchLocationInput = getDomElement('searchLocationInput');
  viewElements.searchButton = getDomElement('searchButton');
  viewElements.returnButton = getDomElement('returnButton');
};

const setupListeners = () => {
  viewElements.searchLocationInput.addEventListener('keydown', onEnterSubmit);
  viewElements.searchButton.addEventListener('click', onSearchSubmit);
  viewElements.returnButton.addEventListener('click', switchView)
};

const initializeApp = () => {
  connectDOMElements();
  setupListeners();
};

const onEnterSubmit = event => {
  if (event.key === 'Enter') {
    switchOnOffLoader()
    let city = viewElements.searchLocationInput.value;
    getWeatherByCity(city).then(data => {
      console.log(data)
      displayWeatherData(data)
    });
  };
};

const onSearchSubmit = event => {
  switchOnOffLoader()
  let city = viewElements.searchLocationInput.value;
  getWeatherByCity(city).then(data => {
    displayWeatherData(data)
    console.log(data)
  });
};

const displayWeatherData = data => {
  setTimeout(() => {
    switchOnOffLoader()
  }, 2000);
  switchView();

  const weather = data.consolidated_weather[1]

  viewElements.searchedCityWeather.textContent = data.title;
  viewElements.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;

  const currTemp = Math.round(weather.the_temp);
  const minTemp = Math.round(weather.min_temp);
  const maxTemp = Math.round(weather.max_temp);
  const windSpeed = (weather.wind_speed * 1.609344).toFixed(1);

  viewElements.currentWeatherTemp.innerText = `Current temperature: ${currTemp}°C`;
  viewElements.weatherMinTemp.innerText = `Min daily temperature: ${minTemp}°C`;
  viewElements.weatherMaxTemp.innerText = `Max daily temperature: ${maxTemp}°C`;
  viewElements.windSpeed.innerText = `Wind Speed: ${windSpeed}km/h`;
}

const switchOnOffLoader = () => {
  if (viewElements.mainContainer.style.display !== 'none') {
    viewElements.mainContainer.style.display = 'none';
    viewElements.loaderContainer.style.display = 'flex';
} else {
  viewElements.mainContainer.style.display = 'flex';
  viewElements.loaderContainer.style.display = 'none';
}
}

const switchView = () => {
  if (viewElements.weatherSearchView.style.display !== 'none') {
    viewElements.weatherSearchView.style.display = 'none';
    viewElements.weatherForecastView.style.display = 'flex';
    
  } else {
    viewElements.weatherSearchView.style.display = 'flex'
    viewElements.weatherForecastView.style.display = 'none'
  }
}


document.addEventListener('DOMContentLoaded', initializeApp);