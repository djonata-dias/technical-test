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

function handleErro(response){
  if(response.message){
   return alert(response.message);
  }
  return response;
}

window.onload = async () => {
  const btcField = document.getElementById('BTC');
  const updateCurrenciesField = document.getElementById('updateCurrencies');
  const currencyFields = document.getElementsByClassName('currencyField');
  const token = localStorage.getItem('token');
  let currenciesResponse = await getCryptoValues();
  handleErro(updateCurrencies);
  updateCurrencies(currencyFields, btcField.value, currenciesResponse);

  btcField.addEventListener('change', () => {
    handleErro(updateCurrencies);
    updateCurrencies(currencyFields, btcField.value, currenciesResponse);
  });
  updateCurrenciesField.addEventListener('click', async () => {
    if(!token){
      alert("Você precisa estar logado para entrar nesta seção!")
      return window.location.href = '/login'
    }
    window.location.href = '/editCurrency'
  });

};
