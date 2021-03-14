const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bede695dddaf28ee99441ffae8941fcc&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature}C° out, it feels like ${body.current.feelslike}C° out`
      );
    }
  });
};

module.exports = forecast;
