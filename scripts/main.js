
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

function init() {
  let visitDate = document.getElementById("visitDate");
  let today = new Date();

  visitDate.value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  buildRegionList();
  geoFind();
}

async function getCountries() {
  let countrySelect = document.getElementById("countrySelect");
  let regionSel = (document.getElementById("regionList"));
  let countrySel = (document.getElementById("countryList"));
  let apiString = "https://restcountries.eu/rest/v2/regionalbloc/" + regionSel.value + "?fields=name;alpha2Code";

  countrySelect.style.display = "block";
  document.getElementById("countryInfo").innerHTML = "";

  // Delete the countries from prior region, if any
  for (let i = countrySel.length; i > 1; i--) {
    countrySel.remove(i - 1);
  }

  // retrieve the JSON data
  const response = await fetch(apiString);
  const jsonData = await response.json();
  console.table(jsonData);

  if (jsonData.status === 404) {
    document.getElementById("countryInfo").innerHTML = "Region " + regionSel.innerHTML.toString + " is " + jsonData.message;
    document.getElementById("countryInfo").style.color = "red";
    document.getElementById("countryInfo").style.fontSize = "larger";
  } else {
    let countries = jsonData.length;
    console.log("Countries: " + countries);

    for (let index = 0; index < countries; index++) {
      let newOpt = document.createElement('option');
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

  console.log(apiString);
  document.getElementById("countryInfo").innerHTML = "";

  // retrieve the JSON data
  const response = await fetch(apiString);
  const jsonData = await response.json();
  console.table(jsonData);

  if (jsonData.status === 404) {
    document.getElementById("countryParagraph").innerHTML = "Region " + regionSel.value + " is " + jsonData.message;
    document.getElementById("countryParagraph").style.color = "red";
    document.getElementById("countryParagraph").style.fontSize = "larger";
  } else {
    let countryInfo = document.getElementById("countryInfo");
    console.log("Name: " + jsonData.name);
    console.log("Alpha 2 Code: " + jsonData.alpha2Code);
    countryInfo.innerHTML = "<p> Name: " + jsonData.name + "</p>";
    countryInfo.innerHTML += "<p> Capital: " + jsonData.capital + "</p>";
    countryInfo.innerHTML += "<p> Region: " + jsonData.region + "</p>";
    countryInfo.innerHTML += "<p> Sub-Region: " + jsonData.subregion + "</p>";
    countryInfo.innerHTML += "<p> Flag: <img src=" + jsonData.flag + " width=\"100\" height=\"50\"></p>";
  }
}

let buildRegionList = function () {
  let sel = (document.getElementById("regionList"));

  for (let i = 0; i < regions.length; i++) {
    console.table(regions[i]);
    let newOpt = document.createElement('option');
    newOpt.innerHTML = regions[i].region;
    newOpt.value = regions[i].code;
    sel.appendChild(newOpt);
  }
}

function geoFind() {

  const apiKey = 'AIzaSyApewl-x5kAspgxi-ftOf7_rnZYnjd1Vso';
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  const mapFrame = document.querySelector('#mapFrame');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapFrame.src = 
        `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${latitude},${longitude}&zoom=13`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

init();