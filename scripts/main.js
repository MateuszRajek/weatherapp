const viewElements = {}

const getDomElement = id => {
  return document.getElementById(id)
}

const connectDOMElements = () => {
  viewElements.mainContainer = getDomElement('mainContainer');
  viewElements.weatherSearchView = getDomElement('weatherSearchView');
  viewElements.weatherForecastView = getDomElement('weatherForecastView');

  viewElements.searchedCityWeather = getDomElement('searchedCityWeather');
  viewElements.weatherIcon = getDomElement('weatherIcon');
  viewElements.currentWeatherTemp = getDomElement('currentWeatherTemp');
  viewElements.weatherMinTemp = getDomElement('weatherMinTemp');
  viewElements.weatherMinTemp = getDomElement('weatherMaxTemp');

  viewElements.searchLocationInput = getDomElement('searchLocationInput');
  viewElements.searchButton = getDomElement('searchButton');
  viewElements.returnButton = getDomElement('returnButton');
}

const setupListeners = () => {
  viewElements.searchLocationInput.addEventListener('keydown', onEnterSubmit)
  viewElements.searchButton.addEventListener('click', onSearchSubmit)
}

const onEnterSubmit = () => {};
const onSearchSubmit = () => {};

const initializeApp = () => {
  connectDOMElements();
  setupListeners();
}

document.addEventListener('DOMContentLoaded', initializeApp)