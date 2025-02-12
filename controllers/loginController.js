const jwt = require('jsonwebtoken');
const emailValidate = require('valid-email');

function loginController(req, res) {
  const { email, password } = req.body;
  if (emailValidate(email) && password.length >= 6) {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET_TOKEN, {
      expiresIn: 900, // expires in 15 min
    });
    res.status(200)
    return res.json({auth: true, token})
  }
  return res.status(400).json({ message: "Campos inválidos!" });
}

module.exports = loginController;