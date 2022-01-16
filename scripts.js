// Openweathermap API. Do not share it publicly.
const api = 'd2015d1bd7142384e8260d8b01ce07cd'; //Replace with your API

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const humid = document.querySelector('.humidity');
const press = document.querySelector('.pressure');
const feel = document.querySelector('.feels');
const winds = document.querySelector('.wind');

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      
      console.log(base);

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        
          // check-check
          console.log(data);
          console.log(data[0]);
        
          const { temp, feels_like, humidity, pressure } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;
          const wind = data.wind.speed;

          const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;
          const feel_fahrenheit = (feels_like * 9) / 5 + 32;

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          humid.textContent = `${humidity}%`;
          press.textContent = `${pressure} hPa`;
          feel.textContent = `${feel_fahrenheit.toFixed(2)} °F`;
          winds.textContent = `${wind} m/s`;  
        });
    });
  }
});
