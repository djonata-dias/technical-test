require('dotenv').config();

const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const viewsRoutes = require('./routes/viewsRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded(true));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT;

app.use('/api', apiRoutes)
app.use('/', viewsRoutes)

app.get('*', (_req, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" })
})

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
})