const express = require('express');
const loginController = require('./controllers/loginController');
const router = express.Router();
const auth = require('./helpers/auth');

router.post('/login', loginController);

router.get('/crypto/btc', (req, res) => {

})


module.exports = router;