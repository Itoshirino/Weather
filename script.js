const api = `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=46351da790226c653537b9628dc20463&units=metric`;
console.log(api);

const elList = document.querySelector(".weather__info");
const elLoading = document.querySelector(".Loading");
const elSearch = document.querySelector(".search");

const getWeather = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showWeather(data);
};

elSearch.addEventListener("change", (e) => {
  elList.innerHTML = "";
  const inputValue = e.target.value.trim();
  if (inputValue) {
    getWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=46351da790226c653537b9628dc20463&units=metric`,
    );
  }
});

try {
  getWeather(api);
} catch (error) {
  throw new Error(error);
}

function showWeather(data) {
  elLoading.innerHTML = "";

  if (data.cod === "404") {
    elList.innerHTML = `City not found`;
    return;
  }

  const { name } = data;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  elList.innerHTML += `
    <div class="weather__card">
      <h2>${name}</h2>
      <p>${temp}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${speed} m/s</p>
    </div>
  `;
  } 
