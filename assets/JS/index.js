// Function to fetch the current price of Bitcoin using CoinCap API
let bitcoinPrice;
async function fetchBitcoinPrice() {
  const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
  const data = await response.json();

  if (data && data.data) {
    bitcoinPrice = parseFloat(data.data.priceUsd).toFixed(2);

    // find percentage differences
    let bitcoinPrices = [26298.77,25956.39,23539.96,30453.39]

    const diffAB = (bitcoinPrices[1] - bitcoinPrices[0]) / Math.abs(bitcoinPrices[0]) * 100;
    const diffBC = (bitcoinPrices[2] - bitcoinPrices[1]) / Math.abs(bitcoinPrices[1]) * 100;
    const diffCD = (bitcoinPrices[3] - bitcoinPrices[2]) / Math.abs(bitcoinPrices[2]) * 100;
    const diffDCurrent = (bitcoinPrice - bitcoinPrices[3]) / Math.abs(bitcoinPrices[3]) * 100;
    
    const differenceAvg = ((diffAB + diffBC + diffCD + diffDCurrent) / 4).toFixed(2);
    console.log(differenceAvg)
    let futurePriceBtc = (bitcoinPrice * (1+differenceAvg / 100)).toFixed(2)
    document.getElementById('btc-future-price').innerHTML = `$${futurePriceBtc}`
    console.log(bitcoinPrice)

    let crashTextBtc = document.getElementById('crash-text-btc')

    if (futurePriceBtc >= bitcoinPrice) {
      document.getElementById('btc-future-price').style.color = 'green'
    } else if (futurePriceBtc < bitcoinPrice * 0.9) {
      document.getElementById('btc-future-price').style.color ='red';
      crashTextBtc.innerHTML = 'Warning: Crash Predicted! (Drop of 10% or more)';
      crashTextBtc.style.color = 'red'
    } 

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

    let ethPrices = [1807.05,1708.75,1868.37,1903.23]

    const diffAB = (ethPrices[1] - ethPrices[0]) / Math.abs(ethPrices[0]) * 100;
    const diffBC = (ethPrices[2] - ethPrices[1]) / Math.abs(ethPrices[1]) * 100;
    const diffCD = (ethPrices[3] - ethPrices[2]) / Math.abs(ethPrices[2]) * 100;
    const diffDCurrent = (ethereumPrice - ethPrices[3]) / Math.abs(ethPrices[3]) * 100;

    const differenceAvg = ((diffAB + diffBC + diffCD + diffDCurrent) / 4).toFixed(2);
    console.log(differenceAvg)
    let futurePriceEth = (ethereumPrice * (1+differenceAvg / 100)).toFixed(2)
    document.getElementById('eth-future-price').innerHTML = `$${futurePriceEth}`
    console.log(bitcoinPrice)

    let crashTextEth = document.getElementById('crash-text-eth')

    if (futurePriceEth >= ethereumPrice) {
      document.getElementById('eth-future-price').style.color = 'green'
    } else if (futurePriceEth < ethereumPrice * 0.9) {
      document.getElementById('eth-future-price').style.color ='red';
      crashTextEth.innerHTML = 'Warning: Crash Predicted! (Drop of 10% or more)'
      crashTextEth.style.color = 'red'
    }

    return ethereumPrice;
  }

  return null; // If price data is not available
}

// Call the function to fetch the current price of Ethereum
fetchEthereumPrice()
  .then(ethereumPrice => {
    if (ethereumPrice !== null) {
      console.log('Current Ethereum price:', ethereumPrice);
      document.getElementById('eth-price-current').innerHTML=`$${ethereumPrice}`
    } else {
      console.log('Unable to fetch Ethereum price.');
    }
  })
  .catch(error => {
    console.error('Error fetching Ethereum price:', error);
  });