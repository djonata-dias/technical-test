
const axios = require('axios');

function fetchAPI() {
  return axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error);
    })

}

module.exports = { fetchAPI }