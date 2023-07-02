const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.get('/api/ripple-price', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd');
    const data = await response.json();
    const ripplePrice = data.ripple.usd.toFixed(2);

    res.json({ price: ripplePrice });
  } catch (error) {
    console.error('Error fetching Ripple price:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Serve the client-side HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Assuming your CSS file is located in a folder named "css" relative to your server file
app.use(express.static('CSS'));
// Assuming your image files are located in a folder named "images" relative to your server file
app.use(express.static('images'));

