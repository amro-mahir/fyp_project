const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const axios = require('axios');

const url = 'https://api.coinbase.com/v2/prices/BTC-USD/spot';

axios.get(url).then(response => {
  const price = response.data.amount.toFixed(2);
  console.log(price);
});