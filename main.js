/*

Задачи

1. Переработать\заменить функцию checkItemLocalStorage(item) +
2. Изменить функцию инициализации по замечаниям Игоря +
3. Разобратсья с setItemLocalStotage в fetch(видео) +
4. Сделать местное время в прогнозе на 3-6-9 часов +
5. Уменьшить функцию getSunMoveTime() +
6. Посмотреть new Intl.DateTimeFormat и попробовать переделать под него часть кода +
7. Починить иконки в хроме и фаерфоксе (+) и разобраться с svg картинками (-)
8. Скачать обс или бандикам +

*/

import { getWeather, getForecastWeather } from "./requests.js";
import { KEYS } from "./keys.js";
import {
  findForm,
  inputName,
  addCityBlock,
  checkboxInput,
  nameCityBlock,
  render,
  clean,
  checkLove,
} from "./ui.js";
import {
  showLocalStotage,
  setItemLocalStorage,
  getItemLocalStorage,
  checkNullLocalStorage,
} from "./localStorage.js";

const DEFAULT_CITY = {
  SAINT_P: "Saint Petersburg",
};

function doInitialization() {
  if (
    getItemLocalStorage(KEYS.CURRENT_CITY) === null &&
    getItemLocalStorage(KEYS.ADDED_CITIES) === null
  ) {
    setItemLocalStorage(KEYS.CURRENT_CITY, DEFAULT_CITY.SAINT_P);
    setItemLocalStorage(KEYS.ADDED_CITIES, new Array());
  }
  nameCityBlock.textContent = getItemLocalStorage(KEYS.CURRENT_CITY);

  getWeather(getItemLocalStorage(KEYS.CURRENT_CITY));
  getForecastWeather(getItemLocalStorage(KEYS.CURRENT_CITY));
  getItemLocalStorage(KEYS.ADDED_CITIES);
  checkLove();
  render();
  return;
}
doInitialization();
showLocalStotage();

function findCity(event) {
  event.preventDefault();
  const inputValue = inputName.value;
  getWeather(inputValue);
  getForecastWeather(inputValue);
  showLocalStotage();
  event.target.reset();
}

findForm.addEventListener("submit", findCity);

function addCity() {
  if (this.checked) {
    const localStorageArrayCities = getItemLocalStorage(KEYS.ADDED_CITIES);
    localStorageArrayCities.push(getItemLocalStorage(KEYS.CURRENT_CITY));
    const newSetAddedCities = new Set(localStorageArrayCities);
    setItemLocalStorage(KEYS.ADDED_CITIES, [...newSetAddedCities]);
  } else {
    const localStorageArrayCities = getItemLocalStorage(KEYS.ADDED_CITIES);
    const newSetAddedCities = new Set(localStorageArrayCities);
    newSetAddedCities.delete(nameCityBlock.textContent);
    setItemLocalStorage(KEYS.ADDED_CITIES, [...newSetAddedCities]);
  }
  clean();
  render();
}
checkboxInput.addEventListener("change", addCity);

function getCity(event) {
  const clickName = event.target;
  if (clickName.tagName != "LI") {
    return;
  }
  setItemLocalStorage(KEYS.CURRENT_CITY, clickName.textContent);
  getWeather(getItemLocalStorage(KEYS.CURRENT_CITY));
  getForecastWeather(getItemLocalStorage(KEYS.CURRENT_CITY));
  showLocalStotage();
}
addCityBlock.addEventListener("click", getCity);
