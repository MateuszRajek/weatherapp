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
  viewElements.weatherMinTemp = getDomElement('weatherMaxTemp');

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
    let city = viewElements.searchLocationInput.value;
    getWeatherByCity(city).then(data => {
      console.log(data)});
  }
  
};

const onSearchSubmit = event => {
  switchOnOffLoader()
  let city = viewElements.searchLocationInput.value;
  getWeatherByCity(city).then(data => {
    console.log(data)
    setTimeout(() => {
      switchOnOffLoader()
    }, 2000)});
  switchView()
};

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