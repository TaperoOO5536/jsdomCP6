const api = "7e79115f7a424edf95e124411242006";
const card = document.querySelector("#card");
let weather;

const url = window.location.href;
const dayIndex = url.split("day=")[1];
console.log(dayIndex);
const city = localStorage.getItem("city");

async function getWeather() {
  axios
    .get(`http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${city}&days=14&aqi=no&alerts=no`)
    .catch(function (error) {
      h3.innerText = `Город ${city} не найден`;
    })
    .then(function (response) {
      weather = response.data.forecast.forecastday[dayIndex];
      const icon = document.createElement("img");
      icon.src = weather.day.condition.icon;
      const date = document.createElement("p");
      date.innerHTML = new Date(weather.date).toLocaleString("ru").substring(0, 10);
      date.classList.add("date");
      const iconDateDiv = document.createElement("div");
      iconDateDiv.classList.add("iconDateDiv");
      iconDateDiv.append(date, icon);
      card.append(iconDateDiv);
      const tempratureDiv = document.createElement("div");
      const minTemp = document.createElement("p");
      const maxTemp = document.createElement("p");
      const avgTemp = document.createElement("p");
      minTemp.innerHTML = `Минимальная температура: ${weather.day.mintemp_c} С°`;
      maxTemp.innerHTML = `Максимальная температура: ${weather.day.maxtemp_c} С°`;
      avgTemp.innerHTML = `Средняя температура: ${weather.day.avgtemp_c} С°`;
      tempratureDiv.append(minTemp, maxTemp, avgTemp);
      tempratureDiv.classList.add("tempratureDiv");
      card.append(tempratureDiv);
      const wetDiv = document.createElement("div");
      wetDiv.classList.add("wetDiv");
      const rainDiv = document.createElement("div");
      const precip = document.createElement("p");
      const humidity = document.createElement("p");
      const rainChance = document.createElement("p");
      const maxWind = document.createElement("p");
      precip.innerHTML = `Ожидаемые осадки: ${weather.day.totalprecip_mm} мм`;
      humidity.innerHTML = `Средняя влажность: ${weather.day.avghumidity}%`;
      rainChance.innerHTML = `Шанс дождя: ${weather.day.daily_chance_of_rain}%`;
      rainDiv.append(precip, humidity, rainChance, maxWind);
      maxWind.innerHTML = `Максимальная скорость ветра: ${weather.day.maxwind_kph} км/ч`;
      wetDiv.append(rainDiv);
      card.append(wetDiv);
      const riseSetDiv = document.createElement("div");
      const sunDiv = document.createElement("div");
      const moonDiv = document.createElement("div");
      const sunSet = document.createElement("p");
      const sunRise = document.createElement("p");
      const moonSet = document.createElement("p");
      const moonRise = document.createElement("p");
      sunRise.innerHTML = `Восход Солнца: ${weather.astro.sunrise}`;
      sunSet.innerHTML = `Заход Солнца: ${weather.astro.sunset}`;
      moonRise.innerHTML = `Восход Луны: ${weather.astro.moonrise}`;
      moonSet.innerHTML = `Заход Луны: ${weather.astro.moonset}`;
      sunDiv.append(sunRise, sunSet);
      sunDiv.classList.add("sunDiv");
      moonDiv.classList.add("moonDiv");
      moonDiv.append(moonRise, moonSet);
      riseSetDiv.append(sunDiv, moonDiv);
      riseSetDiv.classList.add("riseSetDiv");
      card.append(riseSetDiv);
      // console.log(weather);
    });
}

getWeather();
