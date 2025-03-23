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

async function getData() {
  // let response = await axios.get(
  //   "https://api.aladhan.com/v1/timingsByCity?country=EG&city=Al Qāhirah"
  // );

  // let response = await axios.get(
  //   "https://api.aladhan.com/v1/timingsByCity?country=SA&city=Makkah al Mukarramah"
  // );
  //US
  // let response = await axios.get(
  //   "https://api.aladhan.com/v1/timingsByCity?country=US&city=New York"
  // );
  let response = await axios.get(
    "https://api.aladhan.com/v1/timingsByCity?country=AE&city=Abū Z̧aby"
  );
  let responseData = response.data;
  let dateObject = responseData.data.date;
  console.log(dateObject);
  let timingsObject = responseData.data.timings;
  console.log(timingsObject);

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

  // console.log(Fajr);
  // console.log(Sunrise);
  // console.log(Dhuhr);
  // console.log(Asr);
  // console.log(Maghrib);
  // console.log(Isha);
}

// getData();

// document.getElementById("colors").addEventListener("change", function () {
//   let selectedValue = this.value;

//   console.log(selectedValue);
// });

// let optionsList = document.querySelectorAll("select option");
// // console.log(optionsList);

// optionsList.forEach((opption) => {
//   opption.onclick = function () {
//     console.log(opption.value);

//     //all logic
//   };
// });

async function getAthanData(countryName, cityName) {
  let response = await axios.get(
    `https://api.aladhan.com/v1/timingsByCity?country=${countryName}&city=${cityName}`
  );
  // console.log(response.data);
  let responseData = response.data;
  let timingsObject = responseData.data.timings;
  // let dateObject = responseData.data.date;
  // console.log(dateObject);
  console.log(timingsObject);
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
getAthanData("EG", "Al Qāhirah");

// let optionsList = document.querySelectorAll("select option");
// console.log(optionsList);

// optionsList.forEach((option) => {
//   option.onclick = function () {
//     console.log(option.value);
//   };
// });
document.querySelector("#colors").addEventListener("change", function () {
  let cityName = this.value;
  let countryName = countryCityMap.get(cityName)[0];
  getAthanData(countryName, cityName);
});
