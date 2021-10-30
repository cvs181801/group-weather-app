const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const description = document.getElementById('description');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const tempEl = document.querySelector(".temp");
const cityInput = document.querySelector(".city");
const cityButton = document.querySelector(".cityBtn");
const newCityButton = document.querySelector(".newCityBtn");
const cityDisplay = document.querySelector(".cityName");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windspeed = document.getElementById("windspeed");

cityInput.style.display = "none";
newCityButton.style.display = "none";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='1c3490897ff213fb415c46efd13ebb3b';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

function getWeatherDataByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            cityDisplay.innerHTML = data.name
            newCityButton.classList.remove = "hidden";
            description.innerHTML = data.weather[0].description;
            humidity.innerHTML = "humidity: " + data.main.humidity + "%";
            pressure.innerHTML = "pressure: " + data.main.pressure;
            windspeed.innerHTML = "windspeed: " + data.wind.speed;
            tempEl.innerHTML = data.main.temp + "&#176";

        })
}


getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success, error) => {
       
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
            console.log(data)
            description.innerHTML = data.current.weather[0].description;
            showWeatherData(data);
        })
        
    })
}


cityButton.addEventListener("click", function(event) {
    event.preventDefault();
    cityInput.style.display = "none";
    cityButton.style.display = "none";
    newCityButton.style.display = "block";
    getWeatherDataByCity(cityInput.value);
})

newCityButton.addEventListener("click", function(event) {
    event.preventDefault();
    cityDisplay.innerHTML = "";
    newCityButton.style.display = "none";
    cityButton.style.display = "block";
    cityInput.style.display = "block";   
})


function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current; 
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}