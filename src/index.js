const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser');

const port =  process.env.APP_PORT || 3001;
const app = express()
const transactionsRoute = require('./routes/transactions');

app.use(bodyParser.json());
app.use('/api/transactions', transactionsRoute);

app.use(function errorHandler (err, req, res, next) {
  res.send(500, { error: err.message })
})

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.listen(port, () => {
  console.log(`API Server started at  http://localhost:${port}`)
})

module.exports = app;