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
