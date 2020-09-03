let gameBoardValues = [];
let currentPlayer = 'red';

function resetBoard(row, column) {
  // document.getElementById("game-board").innerHTML = "";
  $('#game-board').html('');
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < column; j += 1) {
      gameBoardValues[row][column] = null;
    }
  }
  $('#player-counter').css('background-color', 'red');
  currentPlayer = 'red';
}

function setupGameBoardValues(row, column) {
  const customGameBoardValues = [];
  for (let i = 0; i < column; i += 1) {
    const tempArray = [];
    for (let j = 0; j < row; j += 1) {
      tempArray.push(null);
    }
    customGameBoardValues.push(tempArray);
  }
  gameBoardValues = customGameBoardValues;
}

function placeCounter(columnIndex) {
  for (let i = gameBoardValues[columnIndex].length - 1; i >= 0; i -= 1) {
    if (gameBoardValues[columnIndex][i] == null) {
      gameBoardValues[columnIndex][i] = currentPlayer;
      const counterPos = `${columnIndex}-${i}`;
      $(`#${counterPos}`).css('background-color', currentPlayer);
      // document.getElementById(counterPos).style.background = currentPlayer;
      break;
    }
  }
  if (currentPlayer === 'yellow') {
    currentPlayer = 'red';
    $('#player-counter').css('background-color', 'red');
  } else {
    currentPlayer = 'yellow';
    $('#player-counter').css('background-color', 'yellow');
  }
  console.log(gameBoardValues);
}

// eslint-disable-next-line no-unused-vars
function setupBoard() {
  resetBoard();
  const row = $('#row-input').val();
  const column = $('#column-input').val();
  // let gameBoard = document.getElementById('game-board');
  // let gameBoard = $("#game-board");
  setupGameBoardValues(row, column);

  for (let i = 0; i < column; i += 1) {
    const divColumn = $('<div></div>');
    // let divColumn = document.createElement("div");
    divColumn.click(() => {
      placeCounter(i);
    });
    divColumn.attr('class', 'column flex-container');
    // divColumn.className = "column flex-container";
    divColumn.attr('id', i);
    // divColumn.id = i;

    for (let j = 0; j < row; j += 1) {
      const divRow = $('<div></div>');
      // let divRow = document.createElement("div");
      divRow.attr('class', 'row');
      // divRow.className = "row";
      divRow.attr('id', `${i}-${j}`);
      // divRow.id = i + "-" + j;
      divColumn.append(divRow);
      // divColumn.append(divRow);
    }

    $('#game-board').append(divColumn);
    // gameBoard.appendChild(divColumn);
  }
}

// module = module || {};
/* module.exports = {
    resetBoard: resetBoard,
    setupGameBoardValues: setupGameBoardValues,
    placeCounter: placeCounter,
    setupBoard: setupBoard,
    getGameBoardValues: getGameBoardValues,
    setGameBoardValues: setGameBoardValues,
} */
