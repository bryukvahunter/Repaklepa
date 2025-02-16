import { setItemLocalStorage } from "./localStorage.js";
import { KEYS, API, apiKey } from "./constants.js";
import { checkLove, updateInfo, updateForecastInfo } from "./ui.js";

async function getFetch(url, name, api) {
  try {
    const createUrl = `${url}?q=${name}&appid=${api}&units=metric`;
    const response = await fetch(createUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getWeather(city) {
  const newFetch = getFetch(API.MAIN_WEATHER, city, apiKey);
  try {
    const data = await newFetch;
    console.log(data);
    const {
      main: { feels_like, temp },
      name,
      sys: { sunrise, sunset },
      timezone,
      weather: [{ icon }],
    } = data;

    getSunMoveTime(sunrise, timezone);
    getSunMoveTime(sunset, timezone);

    updateInfo(
      Math.round(feels_like),
      Math.round(temp),
      name,
      getSunMoveTime(sunrise, timezone),
      getSunMoveTime(sunset, timezone),
      icon
    );
    setItemLocalStorage(KEYS.CURRENT_CITY, name);
    checkLove();
  } catch (error) {
    console.error(error);
  }
}

export async function getForecastWeather(city) {
  const newFetch = getFetch(API.FORECAST_WEATHER, city, apiKey);
  try {
    const data = await newFetch;
    console.log(data);
    const {
      city: { timezone: timeZone },
      list: [
        {
          dt: threeHoursTime,
          main: { temp: threeHoursTemp, feels_like: threeHoursFeelslike },
          weather: [{ icon: threeHoursIcon }],
        },
        {
          dt: sixHoursTime,
          main: { temp: sixHoursTemp, feels_like: sixHoursFeelslike },
          weather: [{ icon: sixHoursIcon }],
        },
        {
          dt: nineHoursTime,
          main: { temp: nineHoursTemp, feels_like: nineHoursFeelslike },
          weather: [{ icon: nineHoursIcon }],
        },
      ],
    } = data;

    updateForecastInfo(
      getLocalTime(threeHoursTime, timeZone),
      Math.round(threeHoursTemp),
      Math.round(threeHoursFeelslike),
      threeHoursIcon,
      getLocalTime(sixHoursTime, timeZone),
      Math.round(sixHoursTemp),
      Math.round(sixHoursFeelslike),
      sixHoursIcon,
      getLocalTime(nineHoursTime, timeZone),
      Math.round(nineHoursTemp),
      Math.round(nineHoursFeelslike),
      nineHoursIcon
    );
  } catch (error) {
    console.error(error);
  }
}

function getLocalTime(time, offset) {
  const myOffsetTime = new Date().getTimezoneOffset() * 60;
  const hours = new Date(time + myOffsetTime + offset) * 1000;
  const localTime = new Intl.DateTimeFormat("ru", {
    timeStyle: "short",
  }).format(hours);
  return localTime;
}

export function getSunMoveTime(sun, timezone) {
  const sunnyTime = new Date((sun + timezone) * 1000);
  const timeFormat = new Intl.DateTimeFormat("ru", {
    timeZone: "UTC",
    timeStyle: "short",
  }).format(sunnyTime);

  return timeFormat;
}
