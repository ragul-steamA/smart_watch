let weatherApiKey = "L7hWQsguVPFfTDccP7xDDYk7RHOximno";
let cnt = 0;

document.getElementById("message").style.display = "none";
document.getElementById("spotify").style.display = "none";
document.getElementById("timer").style.display = "none";
document.getElementById("display_message").style.display = "none";

var latitude;
var longitude;
var city = "Coimbatore";
navigator.geolocation.getCurrentPosition(function (position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
});
async function getWeather() {
  const data = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87cfbc9449359a5449b017e2d4c55013`);
  const dataofWeather = await fetch(
    `https://openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`
  );

  weatherData = await data.json();
  weatherIcon = await dataofWeather.json();

  const iconId = weatherIcon.daily[0].weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconId}.png`;
  document.querySelector(".weatherNow").src = iconUrl;
}

setInterval(getWeather(), 1000);
function padWithZero(number) {
  return String(number).padStart(2, "0");
}

function display(value) {
  document.getElementById("home").style.display = "none";
  document.getElementById("message").style.display = "none";
  document.getElementById("spotify").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("display_message").style.display = "none";
  document.getElementById(value).style.display = "flex";
  document.getElementById(value).style.flexDirection = "column";
  document.getElementById(value).style.alignItems = "center";
  cnt = 0;
  if (value == "timer") {
    document.getElementById(value).style.justifyContent = "space-around";
  }
  if (value == "spotify") {
    document.getElementById(value).style.display = "block";
  }
}
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let ms = document.getElementById("ms");

let m = 0;
let s = 0;
let ml = 0;
let interval;
let flag = true;
function start() {
  cnt = 0;
  if (flag) {
    interval = setInterval(() => {
      ml++;
      if (ml > 100) {
        s++;
        ml = 0;
      }
      if (s > 60) {
        m++;
        s = 0;
      }
      min.innerHTML = padWithZero(m);
      sec.innerHTML = padWithZero(s);
      ms.innerHTML = padWithZero(ml);
    }, 10);
    flag = !flag;
  } else {
    m = padWithZero(m);
    s = padWithZero(s);
    ml = padWithZero(ml);
    clearInterval(interval);
    document.getElementById("lap").innerHTML = m + ":" + s + ":" + ml;
    flag = !flag;
  }
}

function stop() {
  cnt = 0;
  if (flag != false) {
    return;
  }
  clearInterval(interval);
  flag = !flag;
}

function reset() {
  cnt = 0;
  m = "00";
  s = "00";
  ml = "00";
  min.innerHTML = m;
  sec.innerHTML = s;
  ms.innerHTML = ml;
  document.getElementById("lap").innerHTML = m + ":" + s + ":" + ml;
}

const now = new Date();

setInterval(() => {
  let time;
  if (now.getMinutes() > 9) {
    time = now.getHours() + ":" + now.getMinutes();
  } else {
    time = now.getHours() + ":0" + now.getMinutes();
  }

  document.getElementById("timenow").innerHTML = time;
  document.getElementById("timemain").innerHTML = time;
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.getElementById("day").innerHTML = week[now.getDay()];
}, 10);

function messageDisplay() {
  cnt = 0;
  document.getElementById("home").style.display = "none";
  document.getElementById("message").style.display = "none";
  document.getElementById("spotify").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("display_message").style.display = "block";
}

function unlock() {
  document.getElementById("unlock").style.display = "none";

  setInterval(() => {
    if (cnt == 30) {
      document.getElementById("unlock").style.display = "block";
      cnt = 0;
    }
    cnt++;
  }, 1000);
}
