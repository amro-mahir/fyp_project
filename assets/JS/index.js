// bitcoin price fetch
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
  .then(response => response.json())
  .then(data => {
    const bitcoinPrice = data.bitcoin.usd;
    console.log(`The current price of Bitcoin is $${bitcoinPrice}`);
    document.getElementById('btc-price-current').innerHTML=`$${bitcoinPrice}`
  })
  .catch(error => {
    console.log('An error occurred while fetching the Bitcoin price:', error);
});

// etheruem price fetch
fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  .then(response => response.json())
  .then(data => {
    const ethereumPrice = data.ethereum.usd;
    console.log(`The current price of Ethereum is $${ethereumPrice}`);
    document.getElementById('eth-price-current').innerHTML=`Current Price: $${ethereumPrice}`
  })
  .catch(error => {
    console.log('An error occurred while fetching the Ethereum price:', error);
  });

// tether price fetch
fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd')
  .then(response => response.json())
  .then(data => {
    const tetherPrice = data.tether.usd;
    console.log(`The current price of Tether is $${tetherPrice}`);
    document.getElementById('tether-price-current').innerHTML=`Current Price: $${tetherPrice}`
  })
  .catch(error => {
    console.log('An error occurred while fetching the Tether price:', error);
  });

// prediction algorithm for bitcoin  
// Function to fetch the previous price of Bitcoin for each day in the past week
// Function to calculate the weekly average price of Bitcoin for the last 4 weeks
async function calculateWeeklyAverageBitcoinPrice() {
  const weeks = 4; // Number of weeks
  const currentDate = new Date();
  const weeklyAverages = [];

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
  })
  .catch(error => {
    console.error('Error calculating weekly average Bitcoin prices:', error);
  });


// prediction model for etheruem
// Function to calculate the weekly average price of Ethereum for the last 4 weeks
async function calculateWeeklyAverageEthereumPrice() {
  const weeks = 4; // Number of weeks
  const currentDate = new Date();
  const weeklyAverages = [];

  for (let i = 0; i < weeks; i++) {
    const endDate = new Date(currentDate.getTime() - (i * 7 * 24 * 60 * 60 * 1000)); // Subtracting the required number of weeks in milliseconds
    const startDate = new Date(endDate.getTime() - (6 * 24 * 60 * 60 * 1000)); // Subtracting 6 days in milliseconds

    const priceDataResponse = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${startDate.getTime() / 1000}&to=${endDate.getTime() / 1000}`);
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

// Call the function to calculate the weekly average Ethereum prices
calculateWeeklyAverageEthereumPrice()
  .then(weeklyAverages => {
    console.log('Weekly average Ethereum prices for the last 4 weeks:');
    weeklyAverages.forEach((average, index) => {
      const weekNumber = index + 1;
      console.log(`Week ${weekNumber}: ${average}`);
    });
  })
  .catch(error => {
    console.error('Error calculating weekly average Ethereum prices:', error);
  });

  // prediction model for tether
  // Function to calculate the weekly average price of Tether for the last 4 weeks
async function calculateWeeklyAverageTetherPrice() {
  const weeks = 4; // Number of weeks
  const currentDate = new Date();
  const weeklyAverages = [];

  for (let i = 0; i < weeks; i++) {
    const endDate = new Date(currentDate.getTime() - (i * 7 * 24 * 60 * 60 * 1000)); // Subtracting the required number of weeks in milliseconds
    const startDate = new Date(endDate.getTime() - (6 * 24 * 60 * 60 * 1000)); // Subtracting 6 days in milliseconds

    const priceDataResponse = await fetch(`https://api.coingecko.com/api/v3/coins/tether/market_chart/range?vs_currency=usd&from=${startDate.getTime() / 1000}&to=${endDate.getTime() / 1000}`);
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

// Call the function to calculate the weekly average Tether prices
calculateWeeklyAverageTetherPrice()
  .then(weeklyAverages => {
    console.log('Weekly average Tether prices for the last 4 weeks:');
    weeklyAverages.forEach((average, index) => {
      const weekNumber = index + 1;
      console.log(`Week ${weekNumber}: ${average}`);
    });
  })
  .catch(error => {
    console.error('Error calculating weekly average Tether prices:', error);
  });
