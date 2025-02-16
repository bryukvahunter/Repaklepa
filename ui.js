import { getItemLocalStorage } from "./localStorage.js";
import { KEYS } from "./constants.js";

export const findForm = document.querySelector("#block-form"),
  inputName = document.querySelector("#input-name"),
  addCityBlock = document.querySelector("#add-city"),
  checkboxInput = document.querySelector(".check-input"),
  nameCityBlock = document.querySelector("#city-name");

function createElement(text) {
  const city = document.createElement("li");
  city.classList.add("city");
  city.textContent = text;
  return city;
}

export function render() {
  const localStorageActualArray = getItemLocalStorage(KEYS.ADDED_CITIES);
  localStorageActualArray.forEach((item) => {
    addCityBlock.appendChild(createElement(item));
  });
}

export function clean() {
  let allCities = document.querySelectorAll(".city");
  for (let i = 0; i < allCities.length; i++) {
    allCities[i].remove();
  }
}

export function checkLove() {
  const findName = getItemLocalStorage(KEYS.ADDED_CITIES).find((city) => {
    return city === nameCityBlock.textContent;
  });
  if (findName) {
    checkboxInput.checked = true;
    return;
  }
  checkboxInput.checked = false;
}

export function updateInfo(feelslike, temp, name, sunrise, sunset, pic) {
  document.getElementById(
    "feels-like-main"
  ).textContent = `Feels like: ${feelslike}`;
  document.getElementById("temperature").textContent = temp;
  nameCityBlock.textContent = name;
  document.querySelector(
    "#pic"
  ).src = `https://openweathermap.org/img/wn/${pic}@4x.png`;
  document.getElementById("sunrise").textContent = `Sunrise: ${sunrise}`;
  document.getElementById("sunset").textContent = `Sunset: ${sunset}`;
}

export function updateForecastInfo(
  threeHours,
  threeHoursTemp,
  threeHoursFeelslike,
  threeHoursPic,
  sixHours,
  sixHoursTemp,
  sixHoursFeelslike,
  sixHoursIcon,
  nineHours,
  nineHoursTemp,
  nineHoursFeelslike,
  nineHoursIcon
) {
  document.getElementById("three-hours-title").textContent = threeHours;
  document.getElementById(
    "three-hours-temp"
  ).textContent = `Temperature: ${threeHoursTemp}`;
  document.getElementById(
    "three-hours-feelslike"
  ).textContent = `Feels like: ${threeHoursFeelslike}`;
  document.querySelector(
    "#three-hours-pic"
  ).src = `https://openweathermap.org/img/wn/${threeHoursPic}@4x.png`;

  document.getElementById("six-hours-title").textContent = sixHours;
  document.getElementById(
    "six-hours-temp"
  ).textContent = `Temperature: ${sixHoursTemp}`;
  document.getElementById(
    "six-hours-feelslike"
  ).textContent = `Feels like: ${sixHoursFeelslike}`;
  document.querySelector(
    "#six-hours-pic"
  ).src = `https://openweathermap.org/img/wn/${sixHoursIcon}@4x.png`;

  document.getElementById("nine-hours-title").textContent = nineHours;
  document.getElementById(
    "nine-hours-temp"
  ).textContent = `Temperature: ${nineHoursTemp}`;
  document.getElementById(
    "nine-hours-feelslike"
  ).textContent = `Feels like: ${nineHoursFeelslike}`;
  document.querySelector(
    "#nine-hours-pic"
  ).src = `https://openweathermap.org/img/wn/${nineHoursIcon}@4x.png`;
}
