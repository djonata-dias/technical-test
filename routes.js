const express = require('express');
const router = express.Router();
const loginController = require('./controllers/loginController');
const auth = require('./middlewares/auth');
const { fetchAPI } = require('./utils');
const jsonData = require('./currencies.json');

router.post('/login', loginController);

router.get('/crypto/btc', async (req, res) => {
  try {
    const { time, disclaimer, bpi } = await fetchAPI();

    const newBpi = {
      "USD": bpi.USD,
      "BRL": {
        "code": "BRL",
        "rate": new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format(jsonData.BRL * bpi.USD.rate_float),
        "description": "Brazilian Real",
        "rate_float": parseFloat((jsonData.BRL * bpi.USD.rate_float).toFixed(4))
      },
      "EUR": {
        "code": "EUR",
        "rate": new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format(jsonData.EUR * bpi.USD.rate_float),
        "description": "Euro",
        "rate_float": parseFloat((jsonData.EUR * bpi.USD.rate_float).toFixed(4))
      },
      "CAD": {
        "code": "CAD",
        "rate": new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format(jsonData.CAD * bpi.USD.rate_float),
        "description": "Canadian Dollar",
        "rate_float": parseFloat((jsonData.CAD * bpi.USD.rate_float).toFixed(4))
      },
      "BTC": bpi.BTC
    };
    const reqObj = { time, disclaimer, bpi: newBpi };

    res.status(200).json(reqObj);
  } catch (error) {
    console.error(error)
  }

})

module.exports = router;