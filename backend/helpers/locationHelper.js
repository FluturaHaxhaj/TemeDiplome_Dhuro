const NodeGeocoder = require("node-geocoder");
const options = {
  provider: "google",
  apiKey: process.env.API_KEY,
  formatter: null,
};

const geoCoder = NodeGeocoder(options);
const getLocationFromCordinates = async (latitude, longitude) => {
  return await geoCoder
    .reverse({ lat: latitude, lon: longitude })
    .then(async (res) => {
      return await res;
    })
    .catch((err) => {
      throw err;
    });
};

const getLocationFromAddress = async (address) => {
  return await geoCoder
    .geocode({ address })
    .then(async (res) => {
      return await res;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  options,
  getLocationFromAddress,
  getLocationFromCordinates,
};
