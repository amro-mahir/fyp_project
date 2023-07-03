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

// prediction algorithm for bitcoin  
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 3, delayMs = 1000) {
  let retryCount = 0;
  let response;

  while (retryCount < maxRetries) {
    try {
      response = await fetch(url);
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
        await delay(retryAfter * 1000);
        retryCount++;
      } else {
        break;
      }
    } catch (error) {
      console.error('Error making API request:', error);
      break;
    }
  }

  return response;
}

async function calculateWeeklyAverageBitcoinPrice() {
  const weeks = 4;
  const currentDate = new Date();
  const weeklyAverages = [];
  const weeklyPercentageDifferences = [];

  for (let i = 0; i < weeks; i++) {
    const endDate = new Date(currentDate.getTime() - i * 7 * 24 * 60 * 60 * 1000);
    const startDate = new Date(endDate.getTime() - 6 * 24 * 60 * 60 * 1000);

    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${startDate.getTime() / 1000}&to=${endDate.getTime() / 1000}`;

    const response = await fetchWithRetry(url);

    if (response && response.status === 200) {
      try {
        const priceData = await response.json();
        const prices = priceData.prices;
        if (prices && prices.length > 0) {
          const weeklySum = prices.reduce((sum, price) => sum + price[1], 0);
          const weeklyAverage = weeklySum / prices.length;
          weeklyAverages.push(weeklyAverage.toFixed(2));
          if (weeklyAverages.length >= 2) {
            const previousWeekAverage = parseFloat(weeklyAverages[weeklyAverages.length - 2]);
            const percentageDifference = ((weeklyAverage - previousWeekAverage) / previousWeekAverage) * 100;
            weeklyPercentageDifferences.push(percentageDifference.toFixed(2));
          } else {
            weeklyPercentageDifferences.push('N/A');
          }
        }
      } catch (error) {
        console.error('Error parsing response:', error);
      }
    } else {
      console.error('Error fetching data for Bitcoin. Status:', response ? response.status : 'Unknown');
    }
  }

  return { weeklyAverages, weeklyPercentageDifferences };
}

calculateWeeklyAverageBitcoinPrice()
  .then(({ weeklyAverages, weeklyPercentageDifferences }) => {
    console.log('Weekly average Bitcoin prices and percentage differences for the last 4 weeks:');
    const [week1, week2, week3, week4] = weeklyAverages;
    const [percentageDiff1, percentageDiff2, percentageDiff3, percentageDiff4] = weeklyPercentageDifferences;

    console.log(`Week 1: $${week1} (${percentageDiff1}%)`);
    console.log(`Week 2: $${week2} (${percentageDiff2}%)`);
    console.log(`Week 3: $${week3} (${percentageDiff3}%)`);
    console.log(`Week 4: $${week4} (${percentageDiff4}%)`);
  })
  .catch(error => {
    console.error('Error calculating weekly average Bitcoin prices:', error);
  });


// get eth prices
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 3, delayMs = 1000) {
  let retryCount = 0;
  let response;

  while (retryCount < maxRetries) {
    try {
      response = await fetch(url);
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
        await delay(retryAfter * 1000);
        retryCount++;
      } else {
        break;
      }
    } catch (error) {
      console.error('Error making API request:', error);
      break;
    }
  }

  return response;
}

async function calculateWeeklyAverageEthereumPrice() {
  const weeks = 4;
  const currentDate = new Date();
  const weeklyAverages = [];
  const weeklyPercentageDifferences = [];

  for (let i = 0; i < weeks; i++) {
    const endDate = new Date(currentDate.getTime() - i * 7 * 24 * 60 * 60 * 1000);
    const startDate = new Date(endDate.getTime() - 6 * 24 * 60 * 60 * 1000);

    const url = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${startDate.getTime() / 1000}&to=${endDate.getTime() / 1000}`;

    const response = await fetchWithRetry(url);

    if (response && response.status === 200) {
      try {
        const priceData = await response.json();
        const prices = priceData.prices;
        if (prices && prices.length > 0) {
          const weeklySum = prices.reduce((sum, price) => sum + price[1], 0);
          const weeklyAverage = weeklySum / prices.length;
          weeklyAverages.push(weeklyAverage.toFixed(2));
          if (weeklyAverages.length >= 2) {
            const previousWeekAverage = parseFloat(weeklyAverages[weeklyAverages.length - 2]);
            const percentageDifference = ((weeklyAverage - previousWeekAverage) / previousWeekAverage) * 100;
            weeklyPercentageDifferences.push(percentageDifference.toFixed(2));
          } else {
            weeklyPercentageDifferences.push('N/A');
          }
        }
      } catch (error) {
        console.error('Error parsing response:', error);
      }
    } else {
      console.error('Error fetching data for Ethereum. Status:', response ? response.status : 'Unknown');
    }
  }

  return { weeklyAverages, weeklyPercentageDifferences };
}

calculateWeeklyAverageEthereumPrice()
  .then(({ weeklyAverages, weeklyPercentageDifferences }) => {
    console.log('Weekly average Ethereum prices and percentage differences for the last 4 weeks:');
    const [week1, week2, week3, week4] = weeklyAverages;
    const [percentageDiff1, percentageDiff2, percentageDiff3, percentageDiff4] = weeklyPercentageDifferences;

    console.log(`Week 1: $${week1} (${percentageDiff1}%)`);
    console.log(`Week 2: $${week2} (${percentageDiff2}%)`);
    console.log(`Week 3: $${week3} (${percentageDiff3}%)`);
    console.log(`Week 4: $${week4} (${percentageDiff4}%)`);

    
  })
  .catch(error => {
    console.error('Error calculating weekly average Ethereum prices:', error);
  });

