const api = "7e79115f7a424edf95e124411242006";
const hoursCard = document.querySelector("#hoursCard");
const h3 = document.querySelector("#h3");
const cityInput = document.querySelector("#city");
const submitBtn = document.querySelector("#submitBtn");
const card = document.querySelector("#card");
let weather;
const city = localStorage.getItem("city");

if (city) {
  getWeather(city);
}

submitBtn.addEventListener("click", (e) => {
  if (cityInput.value != "") {
    getWeather(cityInput.value);
  } else {
    alert("Введите город!");
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (cityInput.value != "") {
      getWeather(cityInput.value);
    } else {
      alert("Введите город!");
    }
  }
});

async function getWeather(city) {
  axios
    .get(`http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${city}&days=1&aqi=no&alerts=no`)
    .catch(function (error) {
      h3.innerText = `Город ${city} не найден`;
    })
    .then(function (response) {
      localStorage.setItem("city", city);
      hoursCard.innerHTML = "";
      card.innerHTML = "";
      weather = response.data.forecast.forecastday[0];
      console.log(weather);
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
      for (let i = 0; i < weather.hour.length; i++) {
        const hourCard = document.createElement("div");
        const time = document.createElement("p");
        time.innerHTML = `${weather.hour[i].time.slice(-5)}`;
        const icon = document.createElement("img");
        icon.src = weather.hour[i].condition.icon;
        const temp = document.createElement("p");
        temp.innerHTML = `Температура: ${weather.hour[i].temp_c} С°`;
        const wind = document.createElement("p");
        wind.innerHTML = `Скорость ветра: ${weather.hour[i].wind_kph} км/ч`;
        const humidity = document.createElement("p");
        humidity.innerHTML = `Влажность ${weather.hour[i].humidity}%`;
        const rainChance = document.createElement("p");
        rainChance.innerHTML = `Шанс дождя: ${weather.hour[i].chance_of_rain}%`;
        hourCard.append(time, icon, temp, wind, humidity, rainChance);
        hourCard.classList.add("hourCard");
        hoursCard.append(hourCard);
      }
      h3.innerText = `Погода в городе: ${city}`;
      // console.log(weather);
    });
}
