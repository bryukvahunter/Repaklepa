import { getWeather, getForecastWeather } from "./requests.js";
import { KEYS, DEFAULT_CITY } from "./constants.js";
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
} from "./localStorage.js";

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
