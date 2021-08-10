const express = require('express');
const fs = require('fs');
const loginController = require('./controllers/loginController');
const auth = require('./middlewares/auth');
const { fetchAPI } = require('./utils');
const jsonData = require('./currencies.json');
const router = express.Router();

router.post('/login', loginController);

router.get('/crypto/btc', async (_req, res) => {
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

    res.status(200).json({ time, disclaimer, bpi: newBpi });
  } catch (error) {
    res.status(500).json({ messsage: error });
  }

})

router.post('/crypto/btc', auth,(req, res) => {
  const { currency, value } = req.body;
  const currencys = ['BRL', 'EUR', 'CAD'];

  if (!currency || currencys.indexOf(currency) === -1 || typeof currency !== 'string') {
    return res.status(400).json({ message: "Moeda inválida" });
  }
  if (!value || typeof value !== 'number') {
    return res.status(400).json({ message: "Valor inválido" });
  }

  jsonData[currency] = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3, minimumFractionDigits: 3 }).format(value)

  fs.writeFile("currencies.json", JSON.stringify(jsonData), 'utf8', function (error) {
    if (error) {
      return res.status(500).json({ messsage: error });
    }

    res.status(200).json({ messsage: "Valor alterado com sucesso!" });
  });

})
module.exports = router;