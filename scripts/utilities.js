//
// Get the JSON data function
//
export async function getJSON(url) {
  // use fetch to get a response object
  // then retrieve the JSON data object
  console.log(url);
  const response = await fetch(url).catch(function (error) {
    console.log(error);
  });

  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    let jsonData = await response.json();
    //console.log(jsonData).features[0]//.properties.title);
    return jsonData;
  }
}

//
// Get the geolocation information
//
export const getLocation = function(options) {
  return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};