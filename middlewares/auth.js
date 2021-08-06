require('dotenv').config();

const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token inválido ou inexistente!' });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Falha na autenticação do token.' });
    }

    req.userId = decoded.id;
    next()
  })


}

module.exports = verifyJWT;