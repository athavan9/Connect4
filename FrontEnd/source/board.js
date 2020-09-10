const state = {
  gameBoardValues: [],
  currentPlayer: 'red',
  gameBoardColumns: 0,
  gameBoardRows: 0,
};

function resetBoardArray(row, column, gameBoardArray) { // PURE FUNCTION
  const customGameBoardValues = gameBoardArray.slice;
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < column; j += 1) {
      customGameBoardValues[i][j] = null;
    }
  }
  return customGameBoardValues;
}

function resetBoard(row, column) {
  $('#game-board').html('');
  state.gameBoardValues = resetBoardArray(row, column, state.gameBoardValues);
  $('#player-counter').css('background-color', 'red');
  state.currentPlayer = 'red';
}

function resetGame() {
  $('.fireworks').attr('style', 'display: none;');
  setupBoard();
}

function setupGameBoardValuesArray(row, column) { // PURE FUNCTION
  const customGameBoardValues = [];
  for (let i = 0; i < column; i += 1) {
    const tempArray = [];
    for (let j = 0; j < row; j += 1) {
      tempArray.push(null);
    }
    customGameBoardValues.push(tempArray);
  }
  return customGameBoardValues;
}

function removeHover() {
  for (let i = 0; i < state.gameBoardColumns; i += 1) {
    $(`#${i}`).removeClass('column-hover');
  }
}

function disableBoard() {
  for (let i = 0; i < state.gameBoardColumns; i += 1) {
    $(`#${i}`).off('click');
  }
}

function showWinner(winningColor) {
  $('.fireworks').attr('style', 'display: block;');
  $('.winner-text').text(`${winningColor.toUpperCase()} TEAM WINS!`);
  $('.winner-text').css('color', winningColor);
  const winCount = $(`#${winningColor}-win-count`).text();
  $(`#${winningColor}-win-count`).text(parseInt(winCount) + 1);
  disableBoard();
  removeHover();
}

function checkColumnWin(columnIndex, gameBoardArray) { // PURE FUNCTION
  let fourInARowCount = 0;
  for (let i = gameBoardArray[columnIndex].length - 1; i >= 0; i -= 1) { // Loops through each row
    if ((i + 1) >= 4 && gameBoardArray[columnIndex][i] !== null) {
      fourInARowCount = 0;
      for (let j = 1; j < 4; j += 1) {
        const nextRowUpPiece = gameBoardArray[columnIndex][i - j];
        if (gameBoardArray[columnIndex][i] !== nextRowUpPiece || nextRowUpPiece === null) {
          break;
        } else if (gameBoardArray[columnIndex][i] === nextRowUpPiece) {
          fourInARowCount += 1;
        }
      }
    } else {
      break;
    }
    if (fourInARowCount >= 3) {
      return gameBoardArray[columnIndex][i];
    }
  }
  return null;
}

function checkRowWin(rowIndex, gameBoardArray) { // PURE FUNCTION
  let fourInARowCount = 0;
  for (let i = 0; i < gameBoardArray.length - 1; i += 1) {
    if (gameBoardArray.length - i >= 4) {
      fourInARowCount = 0;
      for (let j = 1; j < 4; j += 1) {
        const nextColumnPiece = gameBoardArray[i + j][rowIndex];
        if (gameBoardArray[i][rowIndex] !== nextColumnPiece || nextColumnPiece === null) {
          break;
        } else if (gameBoardArray[i][rowIndex] === nextColumnPiece) {
          fourInARowCount += 1;
        }
      }
    } else {
      break;
    }
    if (fourInARowCount >= 3) {
      return gameBoardArray[i][rowIndex];
    }
  }
  return null;
}

function checkRightDiagonalWin(colAndRowIndex, gameBoardArray) { // PURE FUNCTION
  let fourInARowCount = 0;
  const columnLength = gameBoardArray.length;

  let columnPos = colAndRowIndex[0];
  let rowPos = colAndRowIndex[1];
  while (columnPos <= columnLength - 4 && rowPos >= 3) {
    fourInARowCount = 0;
    for (let i = 1; i < 4; i += 1) {
      if (gameBoardArray[columnPos + i][rowPos - i] !== null) {
        if (gameBoardArray[columnPos][rowPos] === gameBoardArray[columnPos + i][rowPos - i]) {
          fourInARowCount += 1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    if (fourInARowCount >= 3) {
      return gameBoardArray[columnPos][rowPos];
    }
    columnPos += 1;
    rowPos -= 1;
  }
  return null;
}

function getLeftDiagnoalPoint(columnIndex, rowIndex, gameBoardArray) { // PURE FUNCTION
  let columnPos = columnIndex;
  let rowPos = rowIndex;
  let lowestLeftDiagonal;

  let foundEnd = false;
  while (foundEnd === false) {
    if (columnPos - 1 < 0 || rowPos + 1 > gameBoardArray[0].length - 1) {
      lowestLeftDiagonal = [columnPos, rowPos];
      foundEnd = true;
    }
    columnPos -= 1;
    rowPos += 1;
  }
  return lowestLeftDiagonal;
}

function checkLeftDiagonalWin(colAndRowIndex, gameBoardArray) { // PURE FUNCTION
  let fourInARowCount = 0;

  let columnPos = colAndRowIndex[0];
  let rowPos = colAndRowIndex[1];
  while (columnPos >= 3 && rowPos >= 3) {
    fourInARowCount = 0;
    for (let i = 1; i < 4; i += 1) {
      if (gameBoardArray[columnPos - i][rowPos - i] !== null) {
        if (gameBoardArray[columnPos][rowPos] === gameBoardArray[columnPos - i][rowPos - i]) {
          fourInARowCount += 1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    if (fourInARowCount >= 3) {
      return gameBoardArray[columnPos][rowPos];
    }
    columnPos -= 1;
    rowPos -= 1;
  }
  return null;
}

function getRightDiagnoalPoint(columnIndex, rowIndex, gameBoardArray) { // PURE FUNCTION
  let columnPos = columnIndex;
  let rowPos = rowIndex;
  let lowestRightDiagonal;

  let foundEnd = false;
  while (foundEnd === false) {
    if (columnPos + 1 > gameBoardArray.length - 1 || rowPos + 1 > gameBoardArray[0].length - 1) {
      lowestRightDiagonal = [columnPos, rowPos];
      foundEnd = true;
    }
    columnPos += 1;
    rowPos += 1;
  }
  return lowestRightDiagonal;
}

function checkWinner(columnIndex, rowIndex) {
  const lowestLeftDiagPoint = getLeftDiagnoalPoint(columnIndex, rowIndex, state.gameBoardValues);
  const lowestRightDiagPoint = getRightDiagnoalPoint(columnIndex, rowIndex, state.gameBoardValues);

  if (checkColumnWin(columnIndex, state.gameBoardValues) != null) {
    showWinner(checkColumnWin(columnIndex, state.gameBoardValues));
  } else if (checkRowWin(rowIndex, state.gameBoardValues) != null) {
    showWinner(checkRowWin(rowIndex, state.gameBoardValues));
  } else if (checkRightDiagonalWin(lowestLeftDiagPoint, state.gameBoardValues) != null) {
    showWinner(checkRightDiagonalWin(lowestLeftDiagPoint, state.gameBoardValues));
  } else if (checkLeftDiagonalWin(lowestRightDiagPoint, state.gameBoardValues) != null) {
    showWinner(checkLeftDiagonalWin(lowestRightDiagPoint, state.gameBoardValues));
  }
}

function changePlayer(currentPlayerColour) { // PURE FUNCTION
  if (currentPlayerColour === 'yellow') {
    return 'red';
  }
  return 'yellow';
}

function placeCounter(columnIndex) {
  for (let i = state.gameBoardValues[columnIndex].length - 1; i >= 0; i -= 1) {
    if (state.gameBoardValues[columnIndex][i] == null) {
      state.gameBoardValues[columnIndex][i] = state.currentPlayer;
      const counterPos = `${columnIndex}-${i}`;
      $(`#${counterPos}`).css('background-color', state.currentPlayer);

      checkWinner(columnIndex, i);
      break;
    }
  }
  state.currentPlayer = changePlayer(state.currentPlayer);
  $('#player-counter').css('background-color', state.currentPlayer);
}

function drawBoardToHtml(columnSize, rowSize) {
  for (let i = 0; i < columnSize; i += 1) {
    const divColumn = $('<div></div>');
    divColumn.click(() => {
      placeCounter(i);
    });
    divColumn.attr('class', 'column column-hover flex-container');
    divColumn.attr('id', i);

    for (let j = 0; j < rowSize; j += 1) {
      const divRow = $('<div></div>');
      divRow.attr('class', 'row');
      divRow.attr('id', `${i}-${j}`);
      divColumn.append(divRow);
    }

    $('#game-board').append(divColumn);
  }
}

function displayInGameAssets() {
  $('#win-count-area').attr('style', 'display: block');
  $('#player-turn-area').attr('style', 'display: block');
  $('#reset-button').attr('style', 'display: block');
}

function testSetupBoard() {
  $.get('http://localhost:8080/setup', () => {

  });
}

// eslint-disable-next-line no-unused-vars
function setupBoard() {
  $.get('http://localhost:8080/setup', () => {

  });
  resetBoard();
  const row = $('#row-input').val();
  const column = $('#column-input').val();
  state.gameBoardColumns = column;
  state.gameBoardRows = row;
  state.gameBoardValues = setupGameBoardValuesArray(row, column);
  drawBoardToHtml(state.gameBoardColumns, state.gameBoardRows);

  displayInGameAssets();
}

// module = module || {};
// if (typeof module !== 'undefined') {
//   module.exports = {
//     resetBoard,
//     setupGameBoardValuesArray,
//     placeCounter,
//     setupBoard,
//   };
// }
