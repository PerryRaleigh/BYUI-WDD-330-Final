const regions = [
  { region: "European Union", code: "eu" },
  { region: "European Free Trade Association", code: "efta" },
  { region: "Caribbean Community", code: "caricom" },
  { region: "Pacific Alliance", code: "pa" },
  { region: "African Union", code: "au" },
  { region: "Union of South American Nations", code: "usan" },
  { region: "Eurasian Economic Union", code: "eeu" },
  { region: "Arab League", code: "al" },
  { region: "Association of Southeast Asian Nations", code: "asean" },
  { region: "Central American Integration System", code: "cais" },
  { region: "Central European Free Trade Agreement", code: "cefta" },
  { region: "North American Free Trade Agreement", code: "nafta" },
  { region: "South Asian Association for Regional Cooperation", code: "saarc" }
]
var currentLat = 0;
var currentLon = 0;
var countryLat = 0;
var countryLon = 0;
var countrySaved = '';
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function init() {
  let visitDate = document.getElementById("visitDate");
  let today = new Date();

  visitDate.value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  buildRegionList();
  geoFind(null, null);
}

async function getCountries() {
  let countrySelect = document.getElementById("countrySelect");
  let regionSel = (document.getElementById("regionList"));
  let countrySel = (document.getElementById("countryList"));
  let apiString = "https://restcountries.eu/rest/v2/regionalbloc/" + regionSel.value + "?fields=name;alpha2Code";

  countrySelect.style.display = "block";

  // Delete the countries from prior region, if any
  for (let i = countrySel.length; i > 1; i--) {
    countrySel.remove(i - 1);
  }

  // retrieve the JSON data
  response = await fetch(apiString);
  jsonData = await response.json();

  if (jsonData.status === 404) {
    document.getElementById("countryInfo").innerHTML = "Region " + regionSel.innerHTML.toString + " is " + jsonData.message;
    document.getElementById("countryInfo").style.color = "red";
    document.getElementById("countryInfo").style.fontSize = "larger";
  } else {
    let countries = jsonData.length;
    let newOpt = document.createElement('option');

    newOpt.innerHTML = 'Select A Country';
    newOpt.value = 'none';
    newOpt.selected = true;
    newOpt.disabled = true;
    countrySel.appendChild(newOpt);

    for (let index = 0; index < countries; index++) {
      newOpt = document.createElement('option');
      newOpt.innerHTML = jsonData[index].name;
      newOpt.value = jsonData[index].alpha2Code;
      countrySel.appendChild(newOpt);
    }
  }
}

async function getCountryInfo() {
  let regionSel = (document.getElementById("regionList"));
  let countrySel = (document.getElementById("countryList"));
  let apiString = "https://restcountries.eu/rest/v2/alpha/" + countrySel.value;
  let countryView = document.getElementById("countryView");
  countryView.style.display = "block";
  document.getElementById("saveCountry").disabled = false;

  // retrieve the JSON data
  var response = await fetch(apiString);
  var jsonData = await response.json();

  console.table(jsonData);

  if (jsonData.status === 404) {
    document.getElementById("countryParagraph").innerHTML = "Region " + regionSel.value + " is " + jsonData.message;
    document.getElementById("countryParagraph").style.color = "red";
    document.getElementById("countryParagraph").style.fontSize = "larger";
  } else {
    let infoTable = document.getElementById("infoTable");

    countrySaved = jsonData.name;
    geoFind(jsonData.capital, jsonData.name);
    document.getElementById("infoTable").rows[0].cells[1].innerHTML = `<img class="image-border" src=${jsonData.flag} width=100 height=50>`;
    document.getElementById("infoTable").rows[1].cells[1].innerHTML = jsonData.name;
    document.getElementById("infoTable").rows[2].cells[1].innerHTML = jsonData.capital;
    document.getElementById("infoTable").rows[3].cells[1].innerHTML = jsonData.region;
    document.getElementById("infoTable").rows[4].cells[1].innerHTML = jsonData.subregion;
    document.getElementById("infoTable").rows[5].cells[1].innerHTML = jsonData.currencies[0].name;

    getWeatherForcast(jsonData.capital, jsonData.name);
  }
}

let buildRegionList = function () {
  let sel = (document.getElementById("regionList"));

  for (let i = 0; i < regions.length; i++) {
    let newOpt = document.createElement('option');
    newOpt.innerHTML = regions[i].region;
    newOpt.value = regions[i].code;
    sel.appendChild(newOpt);
  }
}

function geoFind(cityIn, countryIn) {
  const googleApiKey = 'AIzaSyApewl-x5kAspgxi-ftOf7_rnZYnjd1Vso';
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  const mapFrame = document.querySelector('#mapFrame');
  const googlUrlBase = 'https://www.google.com/maps/embed/v1/place?key=';
  const weatherGeoUrlBase = 'https://api.openweathermap.org/geo/1.0/reverse';

  mapLink.href = '';
  mapLink.textContent = '';

  async function success(position) {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
    const apiString = `${weatherGeoUrlBase}?lat=${currentLat}&lon=${currentLon}&appid=b65c2520dadd5ae6207572b5ee022f38`

    // retrieve the JSON data
    var response = await fetch(apiString);
    var jsonData = await response.json();

    status.textContent = '';
    mapFrame.src =
      `${googlUrlBase}${googleApiKey}&q=${jsonData[0].name}+${jsonData[0].country}&zoom=9`;
      getWeatherForcast(jsonData[0].name, jsonData[0].country);
    }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (cityIn === null || countryIn === null) {

    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  } else {
    status.textContent = '';
    mapFrame.src =
      `${googlUrlBase}${googleApiKey}&q=${cityIn}+${countryIn}&zoom=9`;
  }
}

async function getWeatherForcast(cityIn, countryIn) {
  let newRow = '';
  const forcastTable = document.getElementById("forcastTable");
  let listBody = document.getElementById("forcastTableBody");
  const appId = 'b65c2520dadd5ae6207572b5ee022f38';
  const weatherGeoUrlBase = 'https://api.openweathermap.org/geo/1.0/direct';
  const weatherUrlBase = 'https://api.openweathermap.org/data/2.5/onecall';
  const weatherView = document.getElementById("forcastParagraph");

  forcastTable.style.visibility = "hidden";

  // Delete the rows from prior repos, if any
  for (var i = listBody.rows.length; i > 0; i--) {
    listBody.deleteRow(i - 1);
  }

  var apiString = `${weatherGeoUrlBase}?q=${cityIn},${countryIn}&appid=${appId}&units=imperial`
  // retrieve the lattitude and longitude of the city
  var response = await fetch(apiString);
  var jsonData = await response.json();
  countryLat = jsonData[0].lat;
  countryLon = jsonData[0].lon;
  apiString = `${weatherUrlBase}?lat=${countryLat}&lon=${countryLon}&appid=${appId}&units=imperial`

  // retrieve the weather forcast
  response = await fetch(apiString);
  jsonData = await response.json();

  jsonData.daily.forEach(day => {
    const d = new Date(day.dt * 1000);
    const monthDay = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const fullDate = `${month} ${monthDay}, ${year}`

    newRow = listBody.insertRow(listBody.rows.length);
    newCell1 = newRow.insertCell(0);
    newCell2 = newRow.insertCell(1);
    newCell3 = newRow.insertCell(2);
    newCell1.className = "tableBorder";
    newCell2.className = "tableBorder";
    newCell3.className = "tableBorder";
    newCell1.innerHTML = fullDate;
    newCell2.innerHTML = day.weather[0].description;
    newCell3.innerHTML = day.temp.day;
  });

  forcastTable.style.visibility = "visible";
}

function saveCountry() {
  let visitDate = document.getElementById("visitDate").value;
  let storedCountries = document.getElementById("storedCountries");
  storedCountries.innerHTML += `<p>${countrySaved} - ${visitDate}</p>`;
}

init();