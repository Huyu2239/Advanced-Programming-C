const size = 9;
let board = [];

function initializeBoard() {
  // Initialize an empty board with zeros
  board = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
  console.log(board);
  // Implement your code here to set initial numbers, if required.
  // For example:
  board[0][1] = 5;
  // board[2][2] = 3;
  // ...
}

function drawBoard() {
  const boardElement = document.getElementById('numberPlaceBoard');
  boardElement.innerHTML = '';

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.className = 'cell';
      cell.value = board[i][j] !== 0 ? board[i][j] : '';
      cell.addEventListener('input', () => updateBoard(i, j, parseInt(cell.value)));
      boardElement.appendChild(cell);
    }

    let lineBreak = document.createElement('br');
    boardElement.appendChild(lineBreak);
  }
}

function updateBoard(row, col, value) {
  // Check if the move is valid
  if (isValidMove(row, col, value)) {
    board[row][col] = value;
    drawBoard();
    checkWin();
  } else {
    // Reset the cell value if it's an invalid move
    board[row][col] = 0;
  }
}

function isValidMove(row, col, value) {
  // Check if the value is a valid number (1 to 9)
  if (isNaN(value) || value < 1 || value > 9) {
    return false;
  }

  // Check the row and column for duplicates
  for (let i = 0; i < size; i++) {
    if (board[row][i] === value || board[i][col] === value) {
      return false;
    }
  }

  // Check the 3x3 block for duplicates
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === value) {
        return false;
      }
    }
  }

  return true;
}

function checkWin() {
  // Check if the board is filled and valid
  if (isBoardFilled() && isBoardValid()) {
    alert('Congratulations! You solved the Number Place!');
  }
}

function isBoardFilled() {
  // Check if all cells are filled with non-zero values
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function isBoardValid() {
  // Check if the board is valid according to the rules
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const value = board[i][j];
      board[i][j] = 0;
      if (value !== 0 && !isValidMove(i, j, value)) {
        return false;
      }
      board[i][j] = value;
    }
  }
  return true;
}

function startGame() {
  initializeBoard();
  drawBoard();
}

startGame();
