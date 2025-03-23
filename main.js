//https://api.aladhan.com/v1/timingsByCity?country=EG&city=Al Qāhirah

let FajrTimeElment = document.querySelector(".content .Fajr .athan-time");
let SunriseTimeElment = document.querySelector(".content .Sunrise .athan-time");
let DhuhrTimeElment = document.querySelector(".content .Dhuhr .athan-time");
let AsrTimeElment = document.querySelector(".content .Asr .athan-time");
let MaghribTimeElment = document.querySelector(".content .Maghrib .athan-time");
let IshaTimeElment = document.querySelector(".content .Isha .athan-time");
let cityNameElement = document.querySelector(".city-name");

//declare map and set elements in it

let countryCityMap = new Map();
countryCityMap.set("Al Qāhirah", ["EG", "القاهرة"]);
countryCityMap.set("New York", ["US", "نيويورك"]);
countryCityMap.set("Makkah al Mukarramah", ["SA", "مكة المكرمة"]);
countryCityMap.set("Abū Z̧aby", ["AE", "ابو ظبى"]);

// console.log(countryCityMap.get("Al Qāhirah"));

//create options list
let selectElement = document.querySelector("#colors");
console.log(selectElement);
function createSelectOptions() {
  let keys = countryCityMap.keys();
  keys.forEach((key) => {
    //create Option
    let selectOption = document.createElement("option");
    //set the value for the option
    selectOption.value = key;
    //text option get it from the map
    let textOption = document.createTextNode(countryCityMap.get(key)[1]);
    //append the text into option
    selectOption.appendChild(textOption);
    //append the option into select element
    selectElement.appendChild(selectOption);
  });
}

createSelectOptions();

async function getAthanData(countryName, cityName) {
  let response = await axios.get(
    `https://api.aladhan.com/v1/timingsByCity?country=${countryName}&city=${cityName}`
  );
  // console.log(response.data);
  let responseData = response.data;
  let dateObject = responseData.data.date;
  let thedayDate = dateObject.readable;
  showDate(thedayDate);

  let timingsObject = responseData.data.timings;

  let Fajr = timingsObject.Fajr;
  FajrTimeElment.innerHTML = Fajr;
  let Sunrise = timingsObject.Sunrise;
  SunriseTimeElment.innerHTML = Sunrise;
  let Dhuhr = timingsObject.Dhuhr;
  DhuhrTimeElment.innerHTML = Dhuhr;
  let Asr = timingsObject.Asr;
  AsrTimeElment.innerHTML = Asr;
  let Maghrib = timingsObject.Maghrib;
  MaghribTimeElment.innerHTML = Maghrib;
  let Isha = timingsObject.Isha;
  IshaTimeElment.innerHTML = Isha;

  cityNameElement.innerHTML = `مدينة ${countryCityMap.get(cityName)[1]}`;
}

//call function
getAthanData("EG", "Al Qāhirah");

document.querySelector("#colors").addEventListener("change", function () {
  let cityName = this.value;
  let countryName = countryCityMap.get(cityName)[0];
  getAthanData(countryName, cityName);
});

function showDate(the_day) {
  const date = new Date(the_day);
  const arabicDate = date.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let listDate = arabicDate.split("،");
  let dayName = listDate[0];
  let dayDate = listDate[1];
  console.log(dayName);
  console.log(dayDate);

  document.querySelector(".day-date-name .theday span").innerHTML = dayName;
  document.querySelector(".day-date-name .day-date span").innerHTML = dayDate;
}
