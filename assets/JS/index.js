// Function to fetch the current price of Bitcoin using CoinCap API
fetch('https://api.coincap.io/v2/assets/bitcoin')
  .then(response => response.json())
  .then(data => {
    const price = parseFloat(data.data.priceUsd).toFixed(2);
    console.log('Current price of Bitcoin: $' + price);
  })
  .catch(error => {
    console.error('Error fetching Bitcoin price:', error);
  });


// Function to fetch the current price of Ethereum using CoinCap API
async function fetchEthereumPrice() {
  const response = await fetch('https://api.coincap.io/v2/assets/ethereum');
  const data = await response.json();

  if (data && data.data) {
    const ethereumPrice = parseFloat(data.data.priceUsd).toFixed(2);
    return ethereumPrice;
  }

  return null; // If price data is not available
}

// Call the function to fetch the current price of Ethereum
fetchEthereumPrice()
  .then(ethereumPrice => {
    if (ethereumPrice !== null) {
      console.log('Current Ethereum price:', ethereumPrice);
      document.getElementById('eth-price-current').innerHTML=`Current Price: $${ethereumPrice}`
    } else {
      console.log('Unable to fetch Ethereum price.');
    }
  })
  .catch(error => {
    console.error('Error fetching Ethereum price:', error);
  });

// Function to fetch the current price of Tether using CoinCap API


async function fetchRipplePrice() {
  const symbol = 'ripple'; // Symbol for Ripple (XRP)
  const currency = 'usd'; // Currency in which to get the price

  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=${currency}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data && data[symbol] && data[symbol][currency]) {
    const price = data[symbol][currency].toFixed(2);
    document.getElementById('tether-price-current').innerHTML=`Current Price: $${price}`
    return price;
  } else {
    throw new Error('Unable to fetch current price for Ripple');
  }
}

// Call the function to fetch the current price of Ripple
fetchRipplePrice()
  .then(price => {
    console.log('Current price of Ripple (XRP): $' + price);
  })
  .catch(error => {
    console.error('Error fetching current price of Ripple:', error);
  });

  


// prediction algorithm for bitcoin  
// Function to fetch the weekly prices of Bitcoin for the last four weeks using CoinGecko API
async function fetchBitcoinWeeklyPrices() {
  const weeks = 4; // Number of weeks
  const currentDate = new Date();
  const weeklyPrices = [];

  for (let i = 0; i < weeks; i++) {
    const endDate = new Date(currentDate.getTime() - (i * 7 * 24 * 60 * 60 * 1000)); // Subtracting the required number of weeks in milliseconds
    const startDate = new Date(endDate.getTime() - (6 * 24 * 60 * 60 * 1000)); // Subtracting 6 days in milliseconds

    const apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${Math.floor(startDate.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.prices && data.prices.length > 0) {
      const weeklyPrice = parseFloat(data.prices[0][1]).toFixed(2); // Taking the price of the first day in the week and rounding to two decimal places
      weeklyPrices.push(weeklyPrice);
    }
  }

  return weeklyPrices;
}

// Call the function to fetch the weekly prices of Bitcoin
fetchBitcoinWeeklyPrices()
  .then(weeklyPrices => {
    console.log('Weekly prices of Bitcoin for the last four weeks:');
    weeklyPrices.forEach((price, index) => {
      const weekNumber = index + 1;
      console.log(`Week ${weekNumber}: ${price}`);
    });
  })
  .catch(error => {
    console.error('Error fetching Bitcoin weekly prices:', error);
  });

  // Function to fetch the weekly prices of Ethereum for the last four weeks using CoinGecko API
async function fetchEthereumWeeklyPrices() {
  const weeks = 4; // Number of weeks
  const currentDate = new Date();
  const weeklyPrices = [];

  for (let i = 0; i < weeks; i++) {
    const endDate = new Date(currentDate.getTime() - (i * 7 * 24 * 60 * 60 * 1000)); // Subtracting the required number of weeks in milliseconds
    const startDate = new Date(endDate.getTime() - (6 * 24 * 60 * 60 * 1000)); // Subtracting 6 days in milliseconds

    const apiUrl = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${Math.floor(startDate.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.prices && data.prices.length > 0) {
      const weeklyPrice = parseFloat(data.prices[0][1]).toFixed(2); // Taking the price of the first day in the week and rounding to two decimal places
      weeklyPrices.push(weeklyPrice);
    }
  }

  return weeklyPrices;
}

// Call the function to fetch the weekly prices of Ethereum
fetchEthereumWeeklyPrices()
  .then(weeklyPrices => {
    console.log('Weekly prices of Ethereum for the last four weeks:');
    weeklyPrices.forEach((price, index) => {
      const weekNumber = index + 1;
      console.log(`Week ${weekNumber}: ${price}`);
    });
  })
  .catch(error => {
    console.error('Error fetching Ethereum weekly prices:', error);
  });

 // Function to fetch the weekly price of Ripple for the last four weeks
async function fetchRippleWeeklyPrices() {
  const symbol = 'ripple'; // Symbol for Ripple (XRP)

  const currentDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 28); // Subtract 28 days for four weeks

  const apiUrl = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart/range?vs_currency=usd&from=${startDate.getTime() / 1000}&to=${currentDate.getTime() / 1000}&interval=week`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data && data.prices && data.prices.length > 0) {
    const weeklyPrices = data.prices.map(entry => {
      const timestamp = new Date(entry[0]);
      const weekNumber = Math.floor((currentDate - timestamp) / (7 * 24 * 60 * 60 * 1000));
      const price = entry[1].toFixed(2);
      return { week: weekNumber, price: price };
    });

    return weeklyPrices;
  } else {
    throw new Error('No historical data found for Ripple');
  }
}

// Call the function to fetch Ripple weekly prices for the last four weeks
fetch('http://localhost:3000/api/ripple-price')
  .then(response => response.json())
  .then(data => {
    const price = data.price;
    console.log('Current price of Ripple (XRP): $' + price);
  })
  .catch(error => {
    console.error('Error fetching Ripple price:', error);
  });



