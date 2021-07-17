// export {};

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

async function getCountries() {
  let regionSel: HTMLSelectElement = (<HTMLSelectElement> document.getElementById("regionList"));
  let countrySel: HTMLSelectElement = (<HTMLSelectElement> document.getElementById("countryList"));
  let apiString: string = "https://restcountries.eu/rest/v2/regionalbloc/" + regionSel.value + "?fields=name;alpha2Code";
  let countryView = document.getElementById("countryView");
  countryView.style.display = "block";

  console.log(apiString);
  document.getElementById("countryInfo").innerHTML = "";

  // Delete the countries from prior region, if any
  for (let i: number = countrySel.length; i > 1; i--) {
    countrySel.remove(i - 1);
  }

  // retrieve the JSON data
  const response: Response = await fetch(apiString);
  const jsonData: any = await response.json();
  console.table(jsonData);

  if (jsonData.status === 404) {
    document.getElementById("countryInfo").innerHTML = "Region " + regionSel.innerHTML.toString + " is " + jsonData.message;
    document.getElementById("countryInfo").style.color = "red";
    document.getElementById("countryInfo").style.fontSize = "larger";
  } else {
    let countries: number = jsonData.length;
    console.log("Countries: " + countries);

    for (let index: number = 0; index < countries; index++) {
      let newOpt: HTMLOptionElement = document.createElement('option');
      newOpt.innerHTML = jsonData[index].name;
      newOpt.value = jsonData[index].alpha2Code;
      countrySel.appendChild(newOpt);
    }
  }
}

async function getCountryInfo() {
  let regionSel: HTMLSelectElement = (<HTMLSelectElement> document.getElementById("regionList"));
  let countrySel: HTMLSelectElement = (<HTMLSelectElement> document.getElementById("countryList"));
  let apiString: string = "https://restcountries.eu/rest/v2/alpha/" + countrySel.value;

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
  let sel: HTMLSelectElement = (<HTMLSelectElement> document.getElementById("regionList"));

  for (let i: number = 0; i < regions.length; i++) {
    console.table(regions[i]);
    let newOpt: HTMLOptionElement = document.createElement('option');
    newOpt.innerHTML = regions[i].region;
    newOpt.value = regions[i].code;
    sel.appendChild(newOpt);
  }
  let countryView = document.getElementById("countryView");
  countryView.style.display = "none";
}

buildRegionList();