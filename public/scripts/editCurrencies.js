function currenciesValues(token) {

  return fetch('/api/crypto/currencies', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
  }).then(response => {
    const data = response.json()
    if (data.message) {
      alert(data.message);
      if (cryptos.auth === false) {
        return window.location.href = '/login';
      }
      return location.reload();
    }
    return data;
  });
};

window.onload = async () => {
  const token = localStorage.getItem('token');
  const currency = document.getElementById('currencySelect');
  const newValue = document.getElementById('currencyNewValue');
  let oldValue = document.getElementById('currencyValue');
  let cryptos = await currenciesValues(token);
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

};
