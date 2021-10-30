const request = require('request');

const forecast = (longtude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2cbd98003eb68eb63a0afc06a9ac11c1&query=' +
        encodeURIComponent(latitude) + ',' + encodeURIComponent(longtude) + '&units=m';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location!", undefined);
        } else {
            const forecastStr = body.current.weather_descriptions[0] +
                '. It is currently ' +
                body.current.temperature +
                ' degree out. It feels like ' +
                body.current.feelslike +
                ' degree out.'
            callback(undefined, forecastStr);

        }
    });
}

module.exports = forecast;