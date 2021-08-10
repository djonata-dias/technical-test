const express = require('express');
const router = express.Router();


router.get('/login', async (_req, res) => {
  try {
    res.status(200).render('login');
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
})


router.get('/', async (_req, res) => {
  try {
    res.status(200).render('viewCurrencies');
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
})



module.exports = router;