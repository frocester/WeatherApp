// all required items

const inputBox = document.querySelector('.text');
const searchBtn = document.getElementById('search-btn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temp');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const weather_text = document.querySelector('.content-text');
const current_location = document.querySelector('#current-location');

// main function for weather data

async function getWeather(city)
{
    const api_key = "1aa742546f4648627b0802372e645d1f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].main}`;
    humidity.innerHTML = `Humidity: ${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `Wind Speed: ${weather_data.wind.speed} Km/h`;
    pressure.innerHTML = `Pressure: ${weather_data.main.pressure}hPa`;



    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "images/clouds-and-sun.png";
            break;
        case 'Rain':
            weather_img.src = "images/rain.png";
                break;
        case 'Mist':
            weather_img.src = "images/mist.png";
                break;
        case 'Clear':
            weather_img.src = "images/sun.png";
                break;
        case 'Snow':
            weather_img.src = "images/snowflake.png";
                break;     
        case 'Haze':
            weather_img.src = "images/haze.png";
                break;            

        }


}

// fetching current loaction 

async function getCurrentLocationName(latitude,longitude)
{
    const api_key = "1aa742546f4648627b0802372e645d1f";
    const url_1 = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

    const weather_data = await fetch(`${url_1}`).then(response => response.json());

    const city_name = weather_data[0].name;
    changeName(city_name);
    getWeather(city_name);
    

}

//fetching current location coordinates of user and getting city name from it

function getCurrentLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
        //   console.log(latitude,longitude);
            getCurrentLocationName(latitude,longitude);
        }
    )};

}

// main function for fetching respective city's image 

function getImage(city)
{
    const api_key = "lSYm9zyf7eP-IuOYVfbXPvdomJDWgJFLdpXg3A-0ybU";
  
    const query = city;
    const url_2 = `https://api.unsplash.com/search/photos?client_id=${api_key}&query=${query}`;

    fetch(url_2)
        .then(response => response.json())
        .then(data => {
          const img_url = data.results[0].urls.regular;
          console.log(img_url);
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + query + "')";
        
        })

}

function changeName(city)
{
    weather_text.innerHTML = `Weather in ${city}`;
}

// event listeners 

current_location.addEventListener('click', ()=>
{
    getCurrentLocation();

});



searchBtn.addEventListener('click',()=>{
    getWeather(inputBox.value);
    changeName(inputBox.value);
    getImage(inputBox.value); 
});

inputBox.addEventListener('keypress', function(e)
{
    if (e.key === 'Enter') {
        getWeather(inputBox.value);
        changeName(inputBox.value);
        getImage(inputBox.value);  
    }
});


