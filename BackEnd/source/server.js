const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/setup', (req, res) => {
  console.log('Setting up board...');
  setupBoard();
  res.send('hi');
});

app.post('game/board/col', (req, res) => {
  res.json();
});

app.listen(8080, () => {
  console.log('server has started');
});

let gameBoardValues = [];
let currentPlayer = 'red';
let gameBoardColumns;
let gameBoardRows;

// function resetBoard(row, column) {
//   $('#game-board').html('');
//   for (let i = 0; i < row; i += 1) {
//     for (let j = 0; j < column; j += 1) {
//       gameBoardValues[i][j] = null;
//     }
//   }
//   $('#player-counter').css('background-color', 'red');
//   currentPlayer = 'red';
// }

// function resetGame() {
//   $('.fireworks').attr('style', 'display: none;');
//   setupBoard();
// }

// function setupGameBoardValuesArray(row, column) {
//   const customGameBoardValues = [];
//   for (let i = 0; i < column; i += 1) {
//     const tempArray = [];
//     for (let j = 0; j < row; j += 1) {
//       tempArray.push(null);
//     }
//     customGameBoardValues.push(tempArray);
//   }
//   gameBoardValues = customGameBoardValues;
// }

// function changePlayer() {
//   if (currentPlayer === 'yellow') {
//     currentPlayer = 'red';
//     $('#player-counter').css('background-color', 'red');
//   } else {
//     currentPlayer = 'yellow';
//     $('#player-counter').css('background-color', 'yellow');
//   }
// }

// function placeCounter(columnIndex) {
//   for (let i = gameBoardValues[columnIndex].length - 1; i >= 0; i -= 1) {
//     if (gameBoardValues[columnIndex][i] == null) {
//       gameBoardValues[columnIndex][i] = currentPlayer;
//       const counterPos = `${columnIndex}-${i}`;
//       $(`#${counterPos}`).css('background-color', currentPlayer);

//       // checkWinner(columnIndex, i);
//       break;
//     }
//   }
//   changePlayer();
// }

// function drawBoardToHtml(columnSize, rowSize) {
//   for (let i = 0; i < columnSize; i += 1) {
//     const divColumn = $('<div></div>');
//     divColumn.click(() => {
//       placeCounter(i);
//     });
//     divColumn.attr('class', 'column column-hover flex-container');
//     divColumn.attr('id', i);

//     for (let j = 0; j < rowSize; j += 1) {
//       const divRow = $('<div></div>');
//       divRow.attr('class', 'row');
//       divRow.attr('id', `${i}-${j}`);
//       divColumn.append(divRow);
//     }

//     $('#game-board').append(divColumn);
//   }
// }

// function displayInGameAssets() {
//   $('#win-count-area').attr('style', 'display: block');
//   $('#player-turn-area').attr('style', 'display: block');
//   $('#reset-button').attr('style', 'display: block');
// }

// function setupBoard() {
//   resetBoard();
//   const row = $('#row-input').val();
//   const column = $('#column-input').val();
//   gameBoardColumns = column;
//   gameBoardRows = row;
//   setupGameBoardValuesArray(row, column);
//   drawBoard(gameBoardColumns, gameBoardRows);

//   displayInGameAssets();
// }
