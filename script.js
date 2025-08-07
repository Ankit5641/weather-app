const API_KEY = "Your Api Key"; // Replace with your OpenWeatherMap API key

// Fetch Current Weather Data
const fetchWeather = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found! Please enter a valid city.");
        return;
    }

    document.getElementById("cityName").innerText = `Weather in ${data.name}`;
    document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} km/h`;
    
    // Set Weather Icon
    const weatherIconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

    // Change Background Based on Weather
    changeBackground(data.weather[0].main);
};

// Fetch 5-Day Forecast
const fetchForecast = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "";

    for (let i = 0; i < data.list.length; i += 8) {
        let day = data.list[i];
        let forecastElement = `
            <div class="forecast-day">
                <p>${new Date(day.dt * 1000).toDateString()}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
                <p>${day.main.temp}°C</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastElement;
    }
};

// Change Background Based on Weather
// Change Background Based on Weather
const changeBackground = (weather) => {
    let bg;
    if (weather.includes("Cloud")) {
        bg = "linear-gradient(to right, #757F9A, #D7DDE8)"; // Classic Blue-Grey
    } else if (weather.includes("Rain")) {
        bg = "linear-gradient(to right, #00C6FB, #005BEA)"; // Rainy Sky Blue
    } else if (weather.includes("Clear")) {
        bg = "linear-gradient(to right, #ff9966, #ff5e62)"; // Warm Sunset
    } else if (weather.includes("Snow")) {
        bg = "linear-gradient(to right, #E6E9F0, #EEF1F5)"; // Soft Snowy White
    } else {
        bg = "linear-gradient(to right, #1e3c72, #2a5298)"; // Default Elegant Blue
    }
    
    document.body.style.background = bg;
};


// Geolocation to Auto-Detect User's Location
const fetchLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            fetchWeather(data.name);
            fetchForecast(data.name);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
};

// Voice Search Feature
const voiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = (event) => {
        document.getElementById("cityInput").value = event.results[0][0].transcript;
        fetchWeather(event.results[0][0].transcript);
        fetchForecast(event.results[0][0].transcript);
    };
};

// Dark Mode Toggle
// Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save mode preference in local storage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Load User's Preference on Page Load
window.onload = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
};


// Event Listeners
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    fetchWeather(city);
    fetchForecast(city);
});

document.getElementById("voiceSearch").addEventListener("click", voiceSearch);

// Fetch Weather for User's Location on Load
fetchLocationWeather();

