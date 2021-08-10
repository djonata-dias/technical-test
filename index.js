require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.use('/api', routes)

app.get('*', (_req, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" })
})

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
})