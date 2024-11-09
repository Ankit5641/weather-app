const apiKey = '4ebf6f3c52daec5ab40d25669fe47ab4';
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');
const forecastContainer = document.getElementById('forecast');
const modeToggle = document.getElementById('mode-toggle');

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  modeToggle.innerText = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
}

async function getWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) {
    errorMessage.textContent = 'Please enter a city name.';
    return;
  }
  errorMessage.textContent = '';
  
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === '404') {
      errorMessage.textContent = 'City not found!';
      return;
    }
    displayWeather(data);
    getForecast(city);
  } catch (error) {
    errorMessage.textContent = 'An error occurred. Please try again later.';
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const temperature = main.temp;
  const feelsLike = main.feels_like;
  const description = weather[0].description;
  const iconCode = weather[0].icon;
  
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <div id="weather-icon"><img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" /></div>
    <p>Temperature: ${temperature}°C</p>
    <p>Feels Like: ${feelsLike}°C</p>
    <p>Weather: ${description}</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
    <p>Last updated: ${new Date().toLocaleString()}</p>
  `;

  updateBackground(weather[0].main);
}

function updateBackground(weatherType) {
  document.body.classList.remove('sunny', 'cloudy', 'rainy');
  if (weatherType === 'Clear') document.body.classList.add('sunny');
  else if (weatherType === 'Clouds') document.body.classList.add('cloudy');
  else if (weatherType === 'Rain') document.body.classList.add('rainy');
}

async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  displayForecast(data);
}

fun
function updateBackground(weatherType) {
  document.body.classList.remove('sunny', 'cloudy', 'rainy');
  
  if (weatherType === 'Clear') {
    document.body.classList.add('sunny');
    document.body.style.background = 'linear-gradient(to right, #f9d423, #ff4e50, #f9a8d4)'; // Sunrise colors
  } 
  else if (weatherType === 'Clouds') {
    document.body.classList.add('cloudy');
    document.body.style.background = 'linear-gradient(to right, #d3cce3, #e9e4f0)';
  }
  else if (weatherType === 'Rain') {
    document.body.classList.add('rainy');
    document.body.style.background = 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)';
  }
}
