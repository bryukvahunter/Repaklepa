import { showLocalStotage, setItemLocalStorage } from "./localStorage.js";
import { KEYS } from "./keys.js";
import {
  checkLove,
  updateInfo,
  updateForecastInfo,
  nameCityBlock,
} from "./ui.js";

const weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
const forecastWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast";
const apiKey = "dbabf5a0105688896566a862f8914f66";

// можно просто в константу добавить
function getUrl(url, name, api) {
  const newUrl = `${url}?q=${name}&appid=${api}&units=metric`;
  return newUrl;
}

// лишняя функция
// если хочешь можешь сделать общую функцию для get запросов
async function getFetchWeather(name) {
  try {
    const response = await fetch(getUrl(weatherUrl, name, apiKey));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function getWeather(city) {
  try {
    const data = await getFetchWeather(city);
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

async function getFetchForecastWeather(name) {
  try {
    const response = await fetch(getUrl(forecastWeatherUrl, name, apiKey));
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
export async function getForecastWeather(city) {
  try {
    const data = await getFetchForecastWeather(city);
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

// export function getSunMoveTime(sunrise, sunset, timezone) {
//   const sunriseFullTime = new Date((sunrise + timezone) * 1000);
//   const sunriseHour = sunriseFullTime.getUTCHours();
//   const sunriseMin = sunriseFullTime.getMinutes();
//   const sunriseSec = sunriseFullTime.getSeconds();
//   let sunriseRoundMin;

//   if (sunriseSec >= 30) {
//     sunriseRoundMin = sunriseMin + 1;
//   } else if (sunriseSec < 30) {
//     sunriseRoundMin = sunriseMin;
//   }

//   const sunriseRoundTime = [sunriseHour, sunriseRoundMin]
//     .map(function (x) {
//       return x < 10 ? "0" + x : x;
//     })
//     .join(":");

//   const sunsetFullTime = new Date((sunset + timezone) * 1000);
//   const sunsetHour = sunsetFullTime.getUTCHours();
//   const sunsetMin = sunsetFullTime.getMinutes();
//   const sunsetSec = sunsetFullTime.getSeconds();
//   let sunsetRoundMin;

//   // сделать через new Intl.DateTimeFormat
//   if (sunsetSec >= 30) {
//     sunsetRoundMin = sunsetMin + 1;
//   } else if (sunsetSec < 30) {
//     sunsetRoundMin = sunsetMin;
//   }

//   const sunsetRoundTime = [sunsetHour, sunsetRoundMin]
//     .map(function (x) {
//       return x < 10 ? "0" + x : x;
//     })
//     .join(":");

//   // cделать через return
//   sunriseSunset.sunrise = sunriseRoundTime;
//   sunriseSunset.sunset = sunsetRoundTime;
// }

// export function getWeather(name) {
//   const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
//   const cityName = name;
//   const apiKey = "dbabf5a0105688896566a862f8914f66";
//   const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("wtf error");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       const {
//         main: { feels_like, temp },
//         name,
//         sys: { sunrise, sunset },
//         timezone,
//         weather: [{ icon }],
//       } = data;

//       getSunMoveTime(sunrise, sunset, timezone);

//       updateInfo(
//         Math.round(feels_like),
//         Math.round(temp),
//         name,
//         sunriseSunset.sunrise,
//         sunriseSunset.sunset,
//         icon
//       );
//       checkLove();
//       setItemLocalStorage(KEYS.CURRENT_CITY, nameCityBlock.textContent);
//       showLocalStorage();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// export function getForecastWeather(name) {
//   const serverUrl = "http://api.openweathermap.org/data/2.5/forecast";
//   const apiKey = "dbabf5a0105688896566a862f8914f66";
//   const url = `${serverUrl}?q=${name}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("error WTF?!");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);

//       const {
//         city: { timezone: timeZone },
//         list: [
//           ,
//           {
//             dt: threeHoursTime,
//             dt_txt: threeHours,
//             main: { temp: threeHoursTemp, feels_like: threeHoursFeelslike },
//             weather: [{ icon: threeHoursIcon }],
//           },
//           {
//             dt_txt: sixHours,
//             main: { temp: sixHoursTemp, feels_like: sixHoursFeelslike },
//             weather: [{ icon: sixHoursIcon }],
//           },
//           {
//             dt_txt: nineHours,
//             main: { temp: nineHoursTemp, feels_like: nineHoursFeelslike },
//             weather: [{ icon: nineHoursIcon }],
//           },
//         ],
//       } = data;

//       // Переделать под местное время? // показывает только по московскому
//       const threeHoursTitle = threeHours.substr(11, 5);
//       const sixHoursTitle = sixHours.substr(11, 5);
//       const nineHoursTitle = nineHours.substr(11, 5);

//       updateForecastInfo(
//         threeHoursTitle,
//         Math.round(threeHoursTemp),
//         Math.round(threeHoursFeelslike),
//         threeHoursIcon,
//         sixHoursTitle,
//         Math.round(sixHoursTemp),
//         Math.round(sixHoursFeelslike),
//         sixHoursIcon,
//         nineHoursTitle,
//         Math.round(nineHoursTemp),
//         Math.round(nineHoursFeelslike),
//         nineHoursIcon
//       );
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
