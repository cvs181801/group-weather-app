const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const description = document.getElementById('description');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const tempEl = document.querySelector(".temp");
const cityInput = document.querySelector(".city");
const cityButton = document.querySelector(".cityBtn");
const cityButtonWarn = document.querySelector(".cityBtn-warning");
const cityDisplay = document.querySelector(".cityName");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windspeed = document.getElementById("windspeed");
const futureDay1 = document.getElementById("future-forecast--day1");
const futureDay2 = document.getElementById("future-forecast--day2");
const futureDay3 = document.getElementById("future-forecast--day3");
const futureDay4 = document.getElementById("future-forecast--day4");
const futureDay5 = document.getElementById("future-forecast--day5");
const futureTemp1 = document.getElementById("future-forecast--temp1");
const futureTemp2 = document.getElementById("future-forecast--temp2");
const futureTemp3 = document.getElementById("future-forecast--temp3");
const futureTemp4 = document.getElementById("future-forecast--temp4");
const futureTemp5 = document.getElementById("future-forecast--temp5");
const forecastWarn = document.querySelector(".forecastWarn");
const currentWeatherIcon = document.querySelector(".weather-icon");
const forecast1Icon = document.getElementById("forecast1icon");
const forecast2Icon = document.getElementById("forecast1icon");
const forecast3Icon = document.getElementById("forecast1icon");
const forecast4Icon = document.getElementById("forecast1icon");
const forecast5Icon = document.getElementById("forecast1icon");
const celsiusBtn = document.querySelector(".c-btn");
const farenheitBtn = document.querySelector(".f-btn");
const selectField = document.getElementById("button-container__units-select");

celsiusBtn.style.backgroundColor = "white";
celsiusBtn.style.color = "grey";
farenheitBtn.style.backgroundColor = "transparent";
farenheitBtn.style.color = "white";

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

getWeatherData(cityInput.value, "metric")
function getWeatherData(city, units) {
    
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude } = success.coords;
            console.log('geolocation is available');  
            cityInput.style.display = "none";
            cityButtonWarn.style.display = "none";
            forecastWarn.style.display = "none";
            selectField.style.display = "none";

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=${units}&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
            console.log(data)
            showWeatherData(data);
            showFutureForecastData();
        })
    })
}
getWeatherData(cityInput.value, "metric")

cityButton.addEventListener("click", function(event) {
    event.preventDefault();
    cityInput.style.display = "inline-block";
    cityButtonWarn.style.display = "inline-block";
    farenheitBtn.style.display = "none";
    celsiusBtn.style.display = "none";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${selectField.value}&appid=${API_KEY}`)  //https://api.openweathermap.org/data/2.5/weather?q=paris&units=imperial&appid=1c3490897ff213fb415c46efd13ebb3b
            .then(response => response.json())
            .then(data => {
                console.log(data)
                forecastWarn.style.display = "inline-block";
                cityDisplay.innerHTML = data.name
                description.innerHTML = data.weather[0].description;
                humidity.innerHTML = "humidity: " + data.main.humidity + "%";
                pressure.innerHTML = "pressure: " + data.main.pressure + " hPa";;
                windspeed.innerHTML = "windspeed: " + data.wind.speed;
                tempEl.innerHTML = data.main.temp + "&#176";
                const icon = data.weather[0].icon;
                currentWeatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                })
})

farenheitBtn.addEventListener("click", function(event) {
    event.preventDefault();
        celsiusBtn.style.backgroundColor = "transparent";
        celsiusBtn.style.color = "white";
        farenheitBtn.style.backgroundColor = "white";
        farenheitBtn.style.color = "grey";
    getWeatherData(cityInput.value, "imperial");
})

celsiusBtn.addEventListener("click", function(event) {
    event.preventDefault();
        celsiusBtn.style.backgroundColor = "white";
        celsiusBtn.style.color = "grey";
        farenheitBtn.style.backgroundColor = "transparent";
        farenheitBtn.style.color = "white";
    getWeatherData(cityInput.value, "metric");
})

function showWeatherData(data) {
        description.innerHTML = data.current.weather[0].description;
        humidity.innerHTML = "humidity: " + data.current.humidity + "%";
        pressure.innerHTML = "pressure: " + data.current.pressure + " hPa";
        windspeed.innerHTML = "windspeed: " + data.current.wind_speed;
        tempEl.innerHTML = data.current.temp + "&#176";
        cityButton.style.display = "none";

        futureTemp1.innerHTML = data.daily[0].temp.day + "&#176";
        futureTemp2.innerHTML = data.daily[1].temp.day + "&#176";
        futureTemp3.innerHTML = data.daily[2].temp.day + "&#176";
        futureTemp4.innerHTML = data.daily[3].temp.day + "&#176";
        futureTemp5.innerHTML = data.daily[4].temp.day + "&#176";

        currentDayIcon = data.daily[0].weather[0].icon;
        forecast1Img = data.daily[1].weather[0].icon;
        forecast2Img = data.daily[2].weather[0].icon;
        forecast3Img = data.daily[3].weather[0].icon;
        forecast4Img = data.daily[4].weather[0].icon;
        forecast5Img = data.daily[5].weather[0].icon;

        currentWeatherIcon.src = `http://openweathermap.org/img/wn/${currentDayIcon}@2x.png`;
        forecast1Icon.src = `http://openweathermap.org/img/wn/${forecast1Img}@2x.png`;
        forecast2Icon.src = `http://openweathermap.org/img/wn/${forecast2Img}@2x.png`;
        forecast3Icon.src = `http://openweathermap.org/img/wn/${forecast3Img}@2x.png`;
        forecast4Icon.src = `http://openweathermap.org/img/wn/${forecast4Img}@2x.png`;
        forecast5Icon.src = `http://openweathermap.org/img/wn/${forecast5Img}@2x.png`;
}

function showFutureForecastData() {

    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();

    const daysOfWeekValues = {
        1: "Mon",
        2: "Tues",
        3: "Weds",
        4: "Thurs",
        5: "Fri",
        6: "Sat",
        7: "Sun"
    }
    
    forecastArray = [day + 1, day + 2, day + 3, day + 4, day + 5];
    
    const correctedForecastArray = forecastArray.map((element) => {
        if (element > 7) {
            return (element) % 7
        } else {
        return element;
        }
    })

    futureDay1.innerHTML = daysOfWeekValues[correctedForecastArray[0]];
    futureDay2.innerHTML = daysOfWeekValues[correctedForecastArray[1]];
    futureDay3.innerHTML = daysOfWeekValues[correctedForecastArray[2]];
    futureDay4.innerHTML = daysOfWeekValues[correctedForecastArray[3]];
    futureDay5.innerHTML = daysOfWeekValues[correctedForecastArray[4]];

}

    // let {humidity, pressure, sunrise, sunset, wind_speed} = data.current; 
    // countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    // currentWeatherItemsEl.innerHTML = 
    // `<div class="weather-item">
    //     <div>Humidity</div>
    //     <div>${humidity}%</div>
    // </div>
    // <div class="weather-item">
    //     <div>Pressure</div>
    //     <div>${pressure}</div>
    // </div>
    // <div class="weather-item">
    //     <div>Wind Speed</div>
    //     <div>${wind_speed}</div>
    // </div>
    // <div class="weather-item">
    //     <div>Sunrise</div>
    //     <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    // </div>
    // <div class="weather-item">
    //     <div>Sunset</div>
    //     <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    // </div>
    
    // `;

    // let otherDayForcast = ''
    // data.daily.forEach((day, idx) => {
    //     if(idx == 0){
    //         currentTempEl.innerHTML = `
    //         <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
    //         <div class="other">
    //             <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
    //             <div class="temp">Night - ${day.temp.night}&#176;C</div>
    //             <div class="temp">Day - ${day.temp.day}&#176;C</div>
    //         </div>
            
    //         `
    //     }else{
    //         otherDayForcast += `
    //         <div class="weather-forecast-item">
    //             <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
    //             <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
    //             <div class="temp">Night - ${day.temp.night}&#176;C</div>
    //             <div class="temp">Day - ${day.temp.day}&#176;C</div>
    //         </div>
            
    //         `
    //     }
    //})


    //weatherForecastEl.innerHTML = otherDayForcast;
//}