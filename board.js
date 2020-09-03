let gameBoardValues = [];
let currentPlayer = 'red';

function resetBoard(row, column) {
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

      checkWinner(columnIndex, i);
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
  setupGameBoardValues(row, column);

  for (let i = 0; i < column; i += 1) {
    const divColumn = $('<div></div>');
    divColumn.click(() => {
      placeCounter(i);
    });
    divColumn.attr('class', 'column flex-container');
    divColumn.attr('id', i);

    for (let j = 0; j < row; j += 1) {
      const divRow = $('<div></div>');
      divRow.attr('class', 'row');
      divRow.attr('id', `${i}-${j}`);
      divColumn.append(divRow);
    }

    $('#game-board').append(divColumn);
    $('#player-turn-area').attr('style', 'display: block');
  }
}

function checkColumnWin(columnIndex) {
  let lossDetected = true;
  let fourInARowCount = 0;
  for (let i = gameBoardValues[columnIndex].length - 1; i >= 0; i -= 1) {
    console.log(i + ". CheckPiece: " + gameBoardValues[columnIndex][i]);
    if ((i + 1) >= 4 && gameBoardValues[columnIndex][i] !== null) {
      fourInARowCount = 0;
      for (let j = 1; j < 4; j += 1) {
        const nextRowUpPiece = gameBoardValues[columnIndex][i - j];
        console.log("gameBoardValues [" + columnIndex + "][" + (i - j) + "] - " + nextRowUpPiece);
        if (gameBoardValues[columnIndex][i] !== nextRowUpPiece || nextRowUpPiece === null) {
          console.log("Loss Detected");
          lossDetected = true;
          break;
        } else if (gameBoardValues[columnIndex][i] === nextRowUpPiece) {
          fourInARowCount += 1;
        }
      }
    } else {
      break;
    }
    if (fourInARowCount === 3) {
      console.log("Win");
      break;
    }
  }
}

function checkRowWin(rowIndex) {
  let winDetected = true;
  for (let i = 0; i < gameBoardValues.length; i += 1) {
    if (gameBoardValues.length - i >= 4) {
      for (let j = 1; j < 4; j += 1) {
        if (gameBoardValues[i][rowIndex] !== gameBoardValues[i + j][rowIndex]) {
          winDetected = false;
          break;
        }
      }
    }
    if (winDetected === true) {
      console.log("Win");
      break;
    }
  }
}

// eslint-disable-next-line no-unused-vars
function checkWinner(columnIndex, rowIndex) {
  checkColumnWin(columnIndex);
  checkRowWin(rowIndex);
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
