// Function to fetch the current price of Bitcoin using CoinCap API
async function fetchBitcoinPrice() {
  const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
  const data = await response.json();

  if (data && data.data) {
    const bitcoinPrice = parseFloat(data.data.priceUsd).toFixed(2);
    return bitcoinPrice;
    
  }
  return null; // If price data is not available
}

// Call the function to fetch the current price of Bitcoin
fetchBitcoinPrice()
  .then(bitcoinPrice => {
    if (bitcoinPrice !== null) {
      console.log('Current Bitcoin price:', bitcoinPrice);
      document.getElementById('btc-price-current').innerHTML=`$${bitcoinPrice}`
    } else {
      console.log('Unable to fetch Bitcoin price.');
    }
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
async function fetchTetherPrice() {
  const response = await fetch('https://api.coincap.io/v2/assets/tether');
  const data = await response.json();

  if (data && data.data) {
    const tetherPrice = parseFloat(data.data.priceUsd).toFixed(2);
    return tetherPrice;
  }

  return null; // If price data is not available
}

// Call the function to fetch the current price of Tether
fetchTetherPrice()
  .then(tetherPrice => {
    if (tetherPrice !== null) {
      console.log('Current Tether price:', tetherPrice);
      document.getElementById('tether-price-current').innerHTML=`Current Price: $${tetherPrice}`
    } else {
      console.log('Unable to fetch Tether price.');
    }
  })
  .catch(error => {
    console.error('Error fetching Tether price:', error);
  });


// prediction algorithm for bitcoin  
// Function to fetch the previous price of Bitcoin for each day in the past week
// Function to calculate the weekly average price of Bitcoin for the last 4 weeks
const weeks = 4; 
const currentDate = new Date();
const weeklyAverages = [];

async function calculateWeeklyAverageBitcoinPrice() {
  // const weeks = 4; 
  // const currentDate = new Date();
  // const weeklyAverages = [];

  for (let i = 0; i < weeks; i++) {
    const endDate = new Date(currentDate.getTime() - (i * 7 * 24 * 60 * 60 * 1000)); // Subtracting the required number of weeks in milliseconds
    const startDate = new Date(endDate.getTime() - (6 * 24 * 60 * 60 * 1000)); // Subtracting 6 days in milliseconds

    const priceDataResponse = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${startDate.getTime() / 1000}&to=${endDate.getTime() / 1000}`);
    const priceData = await priceDataResponse.json();

    const prices = priceData.prices;
    if (prices.length > 0) {
      const weeklySum = prices.reduce((sum, price) => sum + price[1], 0);
      const weeklyAverage = weeklySum / prices.length;
      weeklyAverages.push(weeklyAverage);
    }
  }

  return weeklyAverages;
}

// Call the function to calculate the weekly average Bitcoin prices
calculateWeeklyAverageBitcoinPrice()
  .then(weeklyAverages => {
    console.log('Weekly average Bitcoin prices for the last 4 weeks:');
    weeklyAverages.forEach((average, index) => {
      const weekNumber = index + 1;
      console.log(`Week ${weekNumber}: ${average}`);
      
    });
    // console.log(weeklyAverages[0]);
  })
  .catch(error => {
    console.error('Error calculating weekly average Bitcoin prices:', error);
  });

