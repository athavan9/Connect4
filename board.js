let gameBoardValues = [];
let currentPlayer = 'red';
let gameBoardColumns;
let gameBoardRows;

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

function resetGame() {

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

function showWinner(winningColor) {
  $('.fireworks').attr('style', 'display: block;');
  $('.winner-text').text(`${winningColor.toUpperCase()} TEAM WINS!`);
  $('.winner-text').css('color', winningColor);
  // removeHover();
}

function checkColumnWin(columnIndex) {
  let fourInARowCount = 0;
  for (let i = gameBoardValues[columnIndex].length - 1; i >= 0; i -= 1) { // Loops through each row
    if ((i + 1) >= 4 && gameBoardValues[columnIndex][i] !== null) {
      fourInARowCount = 0;
      for (let j = 1; j < 4; j += 1) {
        const nextRowUpPiece = gameBoardValues[columnIndex][i - j];
        if (gameBoardValues[columnIndex][i] !== nextRowUpPiece || nextRowUpPiece === null) {
          break;
        } else if (gameBoardValues[columnIndex][i] === nextRowUpPiece) {
          fourInARowCount += 1;
        }
      }
    } else {
      break;
    }
    if (fourInARowCount >= 3) {
      showWinner(gameBoardValues[columnIndex][i]);
      break;
    }
  }
}

function checkRowWin(rowIndex) {
  // let lossDetected = true;
  let fourInARowCount = 0;
  for (let i = 0; i < gameBoardValues.length - 1; i += 1) {
    // console.log(i + '. CheckPiece(Row): ' + gameBoardValues[i][rowIndex]);
    if (gameBoardValues.length - i >= 4) {
      fourInARowCount = 0;
      for (let j = 1; j < 4; j += 1) {
        const nextColumnPiece = gameBoardValues[i + j][rowIndex];
        // console.log('gameBoardValues [' + (i + j) + '][' + rowIndex + '] - ' + nextColumnPiece);
        if (gameBoardValues[i][rowIndex] !== nextColumnPiece || nextColumnPiece === null) {
          // console.log('Loss Detected');
          // lossDetected = true;
          break;
        } else if (gameBoardValues[i][rowIndex] === nextColumnPiece) {
          fourInARowCount += 1;
        }
      }
    } else {
      break;
    }
    if (fourInARowCount >= 3) {
      showWinner(gameBoardValues[i][rowIndex]);
      break;
    }
  }
}

function checkWinner(columnIndex, rowIndex) {
  checkColumnWin(columnIndex);
  checkRowWin(rowIndex);
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
  // console.log(gameBoardValues);
}

// eslint-disable-next-line no-unused-vars
function setupBoard() {
  resetBoard();
  const row = $('#row-input').val();
  const column = $('#column-input').val();
  gameBoardColumns = column;
  gameBoardRows = row;
  setupGameBoardValues(row, column);

  for (let i = 0; i < column; i += 1) {
    const divColumn = $('<div></div>');
    divColumn.click(() => {
      placeCounter(i);
    });
    divColumn.attr('class', 'column column-hover flex-container');
    divColumn.attr('id', i);

    for (let j = 0; j < row; j += 1) {
      const divRow = $('<div></div>');
      divRow.attr('class', 'row');
      divRow.attr('id', `${i}-${j}`);
      divColumn.append(divRow);
    }

    $('#game-board').append(divColumn);
    // $('#indicator-area').attr('style', 'display: block');
    $('#player-turn-area').attr('style', 'display: block');
    $('#reset-button').attr('style', 'display: block');
  }
}

function removeHover() {
  for (let i = 0; i < gameBoardColumns; i += 1) {
    $(`#${i}`).removeClass('.column-hover');
  }
}

// module = module || {};
if (typeof module !== 'undefined') {
  module.exports = {
    resetBoard,
    setupGameBoardValues,
    placeCounter,
    setupBoard,
  };
}
