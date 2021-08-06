require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;
const routes = require('./routes');

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
})