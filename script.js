const api = `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=46351da790226c653537b9628dc20463&units=metric`;

const elList = document.querySelector(".weather__info");
const elLoading = document.querySelector(".Loading");
const elSearch = document.querySelector(".search");
const elCreate = document.querySelector(".create__btn");
const elCreateSearch = document.querySelector(".search__create");
const elCreateSearch1 = document.querySelector(".search__create1");
const elCreateSearch2 = document.querySelector(".search__create2");
const elCreateSearch3 = document.querySelector(".search__create3");
const elSubmitBtn = document.querySelector(".submit__btn");
const elClearBtn = document.querySelector(".clear__btn");
const elBackBtn = document.querySelector(".back__btn");
const elwrapper = document.querySelector(".wrapper");
elwrapper.style.backgroundImage = `url('./Img/winter.jpeg')`;

if (elwrapper) {
  elwrapper.style.backgroundImage = `url('./Img/winter.jpeg')`;
}

let element = false;

elSubmitBtn.addEventListener("click", () => {
  elList.innerHTML = "";

  if (element) {
    const city = elCreateSearch.value.trim();
    const temp = elCreateSearch1.value.trim();
    const humidity = elCreateSearch2.value.trim();
    const wind = elCreateSearch3.value.trim();

    if (!city || !temp || !humidity || !wind) {
      Toastify({
        text: "Please fill the inputs",
        duration: 3000,
        gravity: "top",
        position: "left",
        backgroundColor: "linear-gradient(to right, #ff0015, #ea2700)",
      }).showToast();
      return;
    }

    const cities = [
      "Tashkent",
      "Toshkent",
      "Namangan",
      "Samarkand",
      "Bukhara",
      "Samarqand",
      "Buxoro",
      "Farg'ona",
      "Fargona",
      "Qarshi",
      "Qoqon",
      "Kokand",
      "Margilan",
      "Angren",
      "Nukus",
      "Ong'ren",
      "Chust",
      "Guliston",
      "Jizzakh",
      "Urganch",
      "Urgench",
      "Termiz",
      "Denov",
      "Shahrisabz",
      "Bekobod",
      "Yangiyul",
      "Zarafshan",
    ];

    if (
      temp <= 80 &&
      humidity <= 100 &&
      wind <= 30 &&
      temp >= -50 &&
      humidity >= 0 &&
      wind >= 0 &&
      cities.includes(city)
    ) {
      let bg = "";
      let icon = "";

      if (temp <= 0) {
        bg = "./Img/winter.jpeg";
        icon = "./Img/winter__icon.png";
      } else if (temp < 20) {
        bg = "./Img/cloudy.png";
        icon = "./Img/cloudy__icon.png";
      } else if (temp < 50) {
        bg = "Sunny.png";
        icon = "./Img/sunny__icon.png";
      } else {
        bg = "hot.png";
        icon = "./Img/hot__icon.png";
      }

      elwrapper.style.backgroundImage = `url('./Img/${bg}')`;

      elList.innerHTML = `
        <div class="weather__card">
          <div class="weather__top">
            <h2>${city}</h2>
            <img class="weather__icon" src="./Img/${icon}" alt="Custom">
          </div>
          <p class="weather__temp">${temp}°C</p>
          <p><i class="ri-cloud-line"></i> Wind</p>
          <p><i class="ri-water-percent-fill"></i> Humidity: ${humidity}%</p>
          <p><i class="ri-cloud-windy-line"></i> Wind: ${wind} m/s</p>
        </div>
      `;
    } else {
      Toastify({
        text: "Please enter realistic values or correct city name",
        duration: 3000,
        gravity: "top",
        position: "left",
        backgroundColor: "linear-gradient(to right, #ff0015, #ea2700)",
      }).showToast();
    }
  } else {
    const InputValue = elSearch.value.trim();
    if (InputValue) {
      getWeather(
        `https://api.openweathermap.org/data/2.5/weather?q=${InputValue}&appid=46351da790226c653537b9628dc20463&units=metric`,
      );
    }
  }
});

elClearBtn.addEventListener("click", () => {
  elList.innerHTML = "";
  elCreateSearch.value = "";
  elCreateSearch1.value = "";
  elCreateSearch2.value = "";
  elCreateSearch3.value = "";
});

elBackBtn.addEventListener("click", () => {
  element = false;
  elList.innerHTML = "";

  elCreate.classList.remove("none");
  elSubmitBtn.classList.add("none");
  elClearBtn.classList.add("none");
  elBackBtn.classList.add("none");

  elCreateSearch.classList.add("none");
  elCreateSearch1.classList.add("none");
  elCreateSearch2.classList.add("none");
  elCreateSearch3.classList.add("none");

  elSearch.disabled = false;
});

elCreate.addEventListener("click", () => {
  element = true;
  elList.innerHTML = "";

  elCreate.classList.add("none");
  elSubmitBtn.classList.remove("none");
  elClearBtn.classList.remove("none");
  elBackBtn.classList.remove("none");

  elCreateSearch.classList.remove("none");
  elCreateSearch1.classList.remove("none");
  elCreateSearch2.classList.remove("none");
  elCreateSearch3.classList.remove("none");

  elSearch.disabled = true;
});

elSearch.addEventListener("change", (e) => {
  if (element) return;

  elList.innerHTML = "";
  const inputValue = e.target.value.trim();
  if (inputValue) {
    getWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=46351da790226c653537b9628dc20463&units=metric`,
    );
  }
});

const getWeather = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showWeather(data);
};

try {
  getWeather(api);
} catch (error) {
  throw new Error(error);
}

function showWeather(data) {
  elLoading.innerHTML = "";

  if (data.cod === "404") {
    elList.innerHTML = "City not found";
    return;
  }

  const { name } = data;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  const { icon, main } = data.weather[0];
  elList.innerHTML = `
    <div class="weather__card">
      <div class="weather__top">
        <h2>${name}</h2>
        <img class="weather__icon"
          src="https://openweathermap.org/img/wn/${icon}@2x.png"
          alt="${main}">
      </div>
      <p class="weather__temp">${temp}°C</p>
      <p><i class="ri-cloud-line"></i> ${main}</p>
      <p><i class="ri-water-percent-fill"></i> Humidity: ${humidity}%</p>
      <p><i class="ri-cloud-windy-line"></i> Wind: ${speed} m/s</p>
    </div>
  `;

  let bg = "";
  if (temp <= 0) {
    bg = "./Img/winter.jpeg";
  } else if (temp < 20) {
    bg = "./Img/cloudy.png";
  } else if (temp < 50) {
    bg = "./Img/Sunny.png";
  } else {
    bg = "./Img/hot.png";
  }

  elwrapper.style.backgroundImage = `url('./Img/${bg}')`;
}
