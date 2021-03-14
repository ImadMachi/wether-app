const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaW1hZC1tYWNoaTEyIiwiYSI6ImNrbHJ2eWl6dTFxZ3cybm4xdHN1bGJ0OWoifQ.pYNB_B2zK5xRyfmrvTCmcw`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find location, please try an other location",
        undefined
      );
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
