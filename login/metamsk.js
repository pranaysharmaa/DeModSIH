// metamask.js
document.getElementById('login-metamask').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        
        // Get user's account
        const account = accounts[0];
        console.log("Connected MetaMask account:", account);
  
        // Here, you could send the account to the server for authentication
        alert(`Logged in as: ${account}`);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask.");
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  });
  
  // You could also add more features such as signature verification for security.
  