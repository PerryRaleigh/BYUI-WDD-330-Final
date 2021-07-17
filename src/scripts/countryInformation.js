// export {};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var regions = [
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
];
function getCountries() {
    return __awaiter(this, void 0, void 0, function () {
        var regionSel, countrySel, apiString, countryView, i, response, jsonData, countries, index, newOpt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    regionSel = document.getElementById("regionList");
                    countrySel = document.getElementById("countryList");
                    apiString = "https://restcountries.eu/rest/v2/regionalbloc/" + regionSel.value + "?fields=name;alpha2Code";
                    countryView = document.getElementById("countryView");
                    countryView.style.display = "block";
                    console.log(apiString);
                    document.getElementById("countryInfo").innerHTML = "";
                    // Delete the countries from prior region, if any
                    for (i = countrySel.length; i > 1; i--) {
                        countrySel.remove(i - 1);
                    }
                    return [4 /*yield*/, fetch(apiString)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    jsonData = _a.sent();
                    console.table(jsonData);
                    if (jsonData.status === 404) {
                        document.getElementById("countryInfo").innerHTML = "Region " + regionSel.innerHTML.toString + " is " + jsonData.message;
                        document.getElementById("countryInfo").style.color = "red";
                        document.getElementById("countryInfo").style.fontSize = "larger";
                    }
                    else {
                        countries = jsonData.length;
                        console.log("Countries: " + countries);
                        for (index = 0; index < countries; index++) {
                            newOpt = document.createElement('option');
                            newOpt.innerHTML = jsonData[index].name;
                            newOpt.value = jsonData[index].alpha2Code;
                            countrySel.appendChild(newOpt);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getCountryInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var regionSel, countrySel, apiString, response, jsonData, countryInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    regionSel = document.getElementById("regionList");
                    countrySel = document.getElementById("countryList");
                    apiString = "https://restcountries.eu/rest/v2/alpha/" + countrySel.value;
                    console.log(apiString);
                    document.getElementById("countryInfo").innerHTML = "";
                    return [4 /*yield*/, fetch(apiString)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    jsonData = _a.sent();
                    console.table(jsonData);
                    if (jsonData.status === 404) {
                        document.getElementById("countryParagraph").innerHTML = "Region " + regionSel.value + " is " + jsonData.message;
                        document.getElementById("countryParagraph").style.color = "red";
                        document.getElementById("countryParagraph").style.fontSize = "larger";
                    }
                    else {
                        countryInfo = document.getElementById("countryInfo");
                        console.log("Name: " + jsonData.name);
                        console.log("Alpha 2 Code: " + jsonData.alpha2Code);
                        countryInfo.innerHTML = "<p> Name: " + jsonData.name + "</p>";
                        countryInfo.innerHTML += "<p> Capital: " + jsonData.capital + "</p>";
                        countryInfo.innerHTML += "<p> Region: " + jsonData.region + "</p>";
                        countryInfo.innerHTML += "<p> Sub-Region: " + jsonData.subregion + "</p>";
                        countryInfo.innerHTML += "<p> Flag: <img src=" + jsonData.flag + " width=\"100\" height=\"50\"></p>";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var buildRegionList = function () {
    var sel = document.getElementById("regionList");
    for (var i = 0; i < regions.length; i++) {
        console.table(regions[i]);
        var newOpt = document.createElement('option');
        newOpt.innerHTML = regions[i].region;
        newOpt.value = regions[i].code;
        sel.appendChild(newOpt);
    }
    var countryView = document.getElementById("countryView");
    countryView.style.display = "none";
};
buildRegionList();
