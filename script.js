// Get all the necessary elements
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

// Define the players and current player
const player1 = 'X';
const player2 = 'O';
let currentPlayer = player1;
let gameActive = true;

// Add event listeners to each cell
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Add event listener to restart button
restartButton.addEventListener('click', restartGame);

function makeComputerMove() {
  // Generate a random index for the computer's move
  const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];

  // Delay the computer's move for better user experience
  setTimeout(() => {
    randomCell.textContent = currentPlayer;

    // Check for a win or a draw after the computer's move
    if (checkWin() === true) {
      alert('Player ' + currentPlayer + ' wins!');
      gameActive = false;
      return;
    } else if (checkDraw() === true) {
      alert('It\'s a draw!');
      gameActive = false;
      return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }, 500); // Adjust the delay as desired
}

function handleCellClick(event) {
  const clickedCell = event.target;

  // Check if the cell is already occupied or if the game is not active
  if (clickedCell.textContent !== '' || !gameActive) {
    return;
  }

  // Update the cell with the current player's symbol
  clickedCell.textContent = currentPlayer;

  // Check for a win or a draw
  if (checkWin() === true) {
    alert('Player ' + currentPlayer + ' wins!');
    gameActive = false;
    return;
  } else if (checkDraw() === true) {
    alert('It\'s a draw!');
    gameActive = false;
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === player1 ? player2 : player1;

  // If current player is computer, make a move
  if (currentPlayer === player2) {
    makeComputerMove();
  }
}


//rules
function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  for (let cell of cells) {
    if (cell.textContent === '') {
      return false;
    }
  }
  return true;
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = player1;
  gameActive = true;
}
