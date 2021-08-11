function updateCurrencies(currencyFields, btcValue, currenciesResponse) {
  for (let i = 0; i < currencyFields.length; i++) {
    const field = currencyFields[i];
    const id = field.id;
    const cryptoResponseValue = currenciesResponse.bpi[id].rate_float;

    field.value = (btcValue * cryptoResponseValue).toFixed(2);
  }
};

function getCryptoValues() {
  return fetch('/api/crypto/btc', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(response => response.json());
};

window.onload = async () => {
  const btcField = document.getElementById('BTC');
  const updateCurrenciesField = document.getElementById('updateCurrencies');
  const currencyFields = document.getElementsByClassName('currencyField');

  let currenciesResponse = await getCryptoValues();

  updateCurrencies(currencyFields, btcField.value, currenciesResponse);

  btcField.addEventListener('change', () => {
    updateCurrencies(currencyFields, btcField.value, currenciesResponse);
  });
  updateCurrenciesField.addEventListener('click', async () => {
    window.location.href = '/editCurrency';
  });

};
