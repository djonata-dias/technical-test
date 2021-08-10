window.onload = () => {
  document.getElementById('submit-button').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(response => response.json());

    if (loginResponse.message) {
      return alert(loginResponse.message);
    }
    localStorage.setItem('token', loginResponse.token)
    window.location.href = '/';
  })
}