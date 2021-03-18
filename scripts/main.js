import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './DOMActions.js'

class WeatherApp {
  constructor() {
    this.viewElements = {};
    this.connectDOMElements();
    this.setupListeners();
  }

  connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
    this.viewElements = mapListToDOMElements(listOfIds);
  };

  setupListeners = () => {
    this.viewElements.searchLocationInput.addEventListener('keydown', this.handleSubmit);
    this.viewElements.searchButton.addEventListener('click', this.handleSubmit);
    this.viewElements.returnButton.addEventListener('click', this.switchView);
    this.viewElements.errorSwitchOffButton.addEventListener('click', this.switchOnOffErrorView);
  }

  handleSubmit = event => {
    if (event.key === 'Enter' || event.type === 'click') {
      this.switchOnOffLoader()
    let city = this.viewElements.searchLocationInput.value;
    getWeatherByCity(city).then(data => {
      this.displayWeatherData(data);
      this.viewElements.searchLocationInput.value = '';
    }).catch(() => {
      this.viewElements.searchLocationInput.value = '';
      this.switchOnOffErrorView();
      this.switchOnOffLoader()
    });
    }
  };

 switchOnOffLoader = () => {
    if (this.viewElements.mainContainer.style.display !== 'none') {
      this.viewElements.mainContainer.style.display = 'none';
      this.viewElements.loaderContainer.style.display = 'flex';
  } else {
    this.viewElements.mainContainer.style.display = 'flex';
    this.viewElements.loaderContainer.style.display = 'none';
  }
  };

  displayWeatherData = data => {
    setTimeout(() => {
      this.switchOnOffLoader()
    }, 2000);
    this.switchView();
  
    const weather = data.consolidated_weather[1]
  
    this.viewElements.searchedCityWeather.textContent = data.title;
    this.viewElements.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
  
    const currTemp = Math.round(weather.the_temp);
    const minTemp = Math.round(weather.min_temp);
    const maxTemp = Math.round(weather.max_temp);
    const windSpeed = (weather.wind_speed * 1.609344).toFixed(1);
  
    this.viewElements.currentWeatherTemp.innerText = `Current temperature: ${currTemp}°C`;
    this.viewElements.weatherMinTemp.innerText = `Min daily temperature: ${minTemp}°C`;
    this.viewElements.weatherMaxTemp.innerText = `Max daily temperature: ${maxTemp}°C`;
    this.viewElements.windSpeed.innerText = `Wind Speed: ${windSpeed}km/h`;
  };

  switchView = () => {
    if (this.viewElements.weatherSearchView.style.display !== 'none') {
      this.viewElements.weatherSearchView.style.display = 'none';
      this.viewElements.weatherForecastView.style.display = 'flex';
      
    } else {
      this.viewElements.weatherSearchView.style.display = 'flex'
      this.viewElements.weatherForecastView.style.display = 'none'
    }
  }

  switchOnOffErrorView = () => {
    if (this.viewElements.errorContainer.style.display !== 'flex') {
      this.viewElements.errorContainer.style.display = 'flex'
    } else {
      this.viewElements.errorContainer.style.display = 'none'
    }
    
  }
};


document.addEventListener('DOMContentLoaded', new WeatherApp());