const api = "7e79115f7a424edf95e124411242006";
const cityInput = document.querySelector("#city");
const submitBtn = document.querySelector("#submitBtn");
const forecastDiv = document.querySelector("#forecast");
const h3 = document.querySelector("#h3");
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
  forecast.innerHTML = "";
  axios
    .get(`http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${city}&days=14&aqi=no&alerts=no`)
    .catch(function (error) {
      h3.innerText = `Город ${city} не найден`;
    })
    .then(function (response) {
      localStorage.setItem("city", city);
      weather = response.data.forecast.forecastday;
      forecastDiv.innerHTML = "";
      for (let i = 0; i < weather.length; i++) {
        const dayCard = document.createElement("div");
        dayCard.classList.add("dayCard");
        const icon = document.createElement("img");
        icon.src = weather[i].day.condition.icon;
        const date = document.createElement("p");
        date.innerHTML = new Date(weather[i].date).toLocaleString("ru").substring(0, 10);
        date.classList.add("date");
        const temprature = document.createElement("p");
        temprature.innerHTML = `${weather[i].day.mintemp_c} - ${weather[i].day.maxtemp_c} С°`;
        const dayLink = document.createElement("a");
        dayLink.href = `./page1.html?day=${i}`;
        dayLink.innerText = "Подробнее";
        dayLink.classList.add("dayLink");
        dayCard.append(date, icon, temprature, dayLink);
        forecastDiv.append(dayCard);
        h3.innerText = `Прогноз в городе: ${city}`;
      }
    });
}
