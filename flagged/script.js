// Array of post elements as HTML strings with 5 entries
const posts = [
  `<div class="post">
      <div class="post-header">
          <img src="w.png" alt="User Avatar" class="avatar">
          <div class="username">username123</div>
      </div>
      <img src="wallpaper.png" alt="Flagged Content" class="post-image">
      <div class="post-footer">
          <div class="voting">
              <button class="vote-btn in" onclick="vote('in')">✔ In</button>
              <button class="vote-btn out" onclick="vote('out')">✘ Out</button>
          </div>
      </div>
  </div>`,
  `<div class="post">
      <div class="post-header">
          <img src="psps.png" alt="User Avatar" class="avatar">
          <div class="username">username456</div>
      </div>
      <img src="ceo.png" alt="Flagged Content" class="post-image">
      <div class="post-footer">
          <div class="voting">
              <button class="vote-btn in" onclick="vote('in')">✔ In</button>
              <button class="vote-btn out" onclick="vote('out')">✘ Out</button>
          </div>
      </div>
  </div>`,
  `<div class="post">
      <div class="post-header">
          <img src="image3.jpg" alt="User Avatar" class="avatar">
          <div class="username">username123</div>
      </div>
      <img src="pic3.jpg" alt="Flagged Content" class="post-image">
      <div class="post-footer">
          <div class="voting">
              <button class="vote-btn in" onclick="vote('in')">✔ In</button>
              <button class="vote-btn out" onclick="vote('out')">✘ Out</button>
          </div>
      </div>
  </div>`,
  `<div class="post">
      <div class="post-header">
          <img src="image4.jpg" alt="User Avatar" class="avatar">
          <div class="username">username456</div>
      </div>
      <img src="pic4.jpg" alt="Flagged Content" class="post-image">
      <div class="post-footer">
          <div class="voting">
              <button class="vote-btn in" onclick="vote('in')">✔ In</button>
              <button class="vote-btn out" onclick="vote('out')">✘ Out</button>
          </div>
      </div>
  </div>`,
  `<div class="post">
      <div class="post-header">
          <img src="image5.jpg" alt="User Avatar" class="avatar">
          <div class="username">username123</div>
      </div>
      <img src="pic5.jpg" alt="Flagged Content" class="post-image">
      <div class="post-footer">
          <div class="voting">
              <button class="vote-btn in" onclick="vote('in')">✔ In</button>
              <button class="vote-btn out" onclick="vote('out')">✘ Out</button>
          </div>
      </div>
  </div>`,
  
  // Add more posts as needed
];

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle posts array and insert into the content div
document.addEventListener("DOMContentLoaded", function() {
  const shuffledPosts = shuffleArray(posts);
  const contentDiv = document.getElementById('content');
  shuffledPosts.forEach(post => {
    contentDiv.innerHTML += post;
  });
});

let walletBalance = 100;  // Initial wallet balance

// Voting function with alerts and wallet update
function vote(option) {
  console.log(`Voted ${option}`);
  alert(`You voted ${option.toUpperCase()}! Transaction is being processed.`);
  updateWalletBalance(5);
  createBlock();
}

// Update Wallet Balance
function updateWalletBalance(amount) {
  walletBalance += amount;
  document.getElementById('wallet-balance').textContent = `Balance: $${walletBalance}`;
}

// Dialog functions
function openWalletDialog() {
  document.getElementById('wallet-dialog').style.display = 'block';
  generateRandomInfo();
}

function closeWalletDialog() {
  document.getElementById('wallet-dialog').style.display = 'none';
}

function generateRandomInfo() {
  const walletId = Math.random().toString(36).substring(2, 15);
  document.getElementById("wallet-id").textContent = `Wallet ID: ${walletId}`;
  document.getElementById("wallet-balance").textContent = `Balance: $${walletBalance}`;
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target === document.getElementById("wallet-dialog")) {
    closeWalletDialog();
  }
};

// Simulated blockchain interaction
function createBlock() {
  console.log('Creating a block on the blockchain...');
  fetch("http://localhost:8080/vote")
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log('Error with blockchain network:', error));
}
