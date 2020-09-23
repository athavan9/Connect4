const express = require('express');

const app = express();

module.exports = app;

const state = {
  gameBoardValues: [],
  currentPlayer: 'red',
  gameBoardColumns: 0,
  gameBoardRows: 0,
};

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

function updateStateValues(newStateValues) {
  state.gameBoardValues = newStateValues.gameBoardValues;
  state.currentPlayer = newStateValues.currentPlayer;
  state.gameBoardColumns = newStateValues.gameBoardColumns;
  state.gameBoardRows = newStateValues.gameBoardRows;
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

      state.currentPlayer = changePlayer(state.currentPlayer);

      const counterPos = `${columnIndex}-${i}`;
      return counterPos;
    }
  }
  return null;
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

function checkRightDiagonalWin(colIndex, rowIndex, gameBoardArray) { // PURE FUNCTION
  let fourInARowCount = 0;
  const columnLength = gameBoardArray.length;

  const lowestLeftDiagPoint = getLeftDiagnoalPoint(colIndex, rowIndex, gameBoardArray);

  let columnPos = lowestLeftDiagPoint[0];
  let rowPos = lowestLeftDiagPoint[1];

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

function checkLeftDiagonalWin(colIndex, rowIndex, gameBoardArray) { // PURE FUNCTION
  let fourInARowCount = 0;

  const lowestRightDiagPoint = getRightDiagnoalPoint(colIndex, rowIndex, gameBoardArray);

  let columnPos = lowestRightDiagPoint[0];
  let rowPos = lowestRightDiagPoint[1];
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

function checkWinner(columnIndex, rowIndex) {
  if (checkColumnWin(columnIndex, state.gameBoardValues) != null) {
    return checkColumnWin(columnIndex, state.gameBoardValues);
  } if (checkRowWin(rowIndex, state.gameBoardValues) != null) {
    return checkRowWin(rowIndex, state.gameBoardValues);
  } if (checkRightDiagonalWin(columnIndex, rowIndex, state.gameBoardValues) != null) {
    return checkRightDiagonalWin(columnIndex, rowIndex, state.gameBoardValues);
  } if (checkLeftDiagonalWin(columnIndex, rowIndex, state.gameBoardValues) != null) {
    return checkLeftDiagonalWin(columnIndex, rowIndex, state.gameBoardValues);
  }
  return null;
}

app.use(express.static('./FrontEnd/source'));
app.use(express.json());

app.post('/setupNewGame', (req, res) => {
  state.gameBoardRows = req.body.rows;
  state.gameBoardColumns = req.body.columns;
  state.gameBoardValues = setupGameBoardValuesArray(state.gameBoardRows, state.gameBoardColumns);
  state.currentPlayer = 'red';
  res.status(200);
  res.json({
    updatedState: state,
  });
});

app.post('/placeCounter', (req, res) => {
  const counterPosLBL = placeCounter(req.body.column);
  res.status(200);
  res.json({
    updatedState: state,
    placedCounterPos: counterPosLBL,
  });
});

app.post('/checkWin', (req, res) => {
  const isWin = checkWinner(parseInt(req.body.column, 10), parseInt(req.body.row, 10));
  res.json({
    winDetected: isWin,
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('server started on port 8080');
  });
}

if (typeof module !== 'undefined') {
  module.exports = {
    setupGameBoardValuesArray,
    updateStateValues,
    changePlayer,
    placeCounter,
    checkColumnWin,
    checkRowWin,
    checkRightDiagonalWin,
    getLeftDiagnoalPoint,
    checkLeftDiagonalWin,
    getRightDiagnoalPoint,
    checkWinner,
    app,
  };
  // module.exports = app;
}
