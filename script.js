// Initial wallet balance
let walletBalance = 100;

// Voting Function
function vote(type) {
    if (type === 'in') {
        alert('You voted In! Transaction is being processed.');
        updateWalletBalance(5);
    } else if (type === 'out') {
        alert('You voted Out! Transaction is being processed.');
        updateWalletBalance(5);
    }
createblock();
}

// Update Wallet Balance
function updateWalletBalance(amount) {
    walletBalance += amount;
    document.getElementById('wallet-balance').textContent = `Balance: $${walletBalance}`;
}

// Crypto Wallet Dialog Functionality
function openWalletDialog() {
    document.getElementById('wallet-dialog').style.display = 'block';
    generateRandomInfo(); // Generate random info when opening the dialog
}

function closeWalletDialog() {
    document.getElementById('wallet-dialog').style.display = 'none';
}

function generateRandomInfo() {
  walletBalance += 5;
  document.getElementById("wallet-id").textContent = `Wallet ID: ${walletId}`;
  document.getElementById(
    "wallet-balance"
  ).textContent = `Balance: $${balance}`;
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  if (event.target == document.getElementById("wallet-dialog")) {
    closeWalletDialog();
  }
};
function createblock() {
  fetch("http://localhost:8080/vote")
    .then((response) => response.json())
    .then((json) => console.log(json));
}
