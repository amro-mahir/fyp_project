const connectWallet = async() => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const addressFirstFour = address.substring(0, 4);
    const addressLastFour = address.substring(address.length - 4)
    const button =  document.getElementById('connect-wallet-btn')

    button.innerHTML = `${addressFirstFour}...${addressLastFour}`
    button.disabled = true
}