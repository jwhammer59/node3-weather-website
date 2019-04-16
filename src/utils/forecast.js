const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/0f8569910cbbf346341e2f032ae345f7/' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      temp = body.currently.temperature;
      chanceOfPrecip = body.currently.precipProbability;
      todayTempHigh = body.daily.data[0].temperatureHigh;
      todayTempLow = body.daily.data[0].temperatureLow;
      callback(
        undefined,
        body.daily.data[0].summary +
          ' ' +
          'It is currently ' +
          temp +
          ' degrees out.  There is a ' +
          chanceOfPrecip +
          '% chance of rain.' +
          'The high today was ' +
          todayTempHigh +
          ' and the low today was ' +
          todayTempLow +
          '.'
      );
    }
  });
};

module.exports = forecast;
