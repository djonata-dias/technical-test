function currenciesValues(token) {

  return fetch('/api/crypto/currencies', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
  }).then(response => response.json());
}


window.onload = async () => {
  const token = localStorage.getItem('token');
  const currency = document.getElementById('currencySelect');
  const newValue = document.getElementById('currencyNewValue');
  let oldValue = document.getElementById('currencyValue');
  let cryptos = await currenciesValues(token);
  console.log(token);
  oldValue.value = cryptos[currency.value];

  currency.addEventListener('change', async () => {
    oldValue.value = cryptos[currency.value];
  });

  document.getElementById('submitButton').addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(newValue.value);
    const cryptoResponse = await fetch('/api/crypto/btc', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ currency: currency.value, value: newValue.value })
    }).then(response => response.json());
    if (cryptoResponse.message) {
      return alert(cryptoResponse.message);
    }
    window.location.href = '/';
  });

  document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '/';
  });
};
