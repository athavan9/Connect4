const express = require('express');

const app = express();

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
    return checkColumnWin(columnIndex, state.gameBoardValues);
  } if (checkRowWin(rowIndex, state.gameBoardValues) != null) {
    return checkRowWin(rowIndex, state.gameBoardValues);
  } if (checkRightDiagonalWin(lowestLeftDiagPoint, state.gameBoardValues) != null) {
    return checkRightDiagonalWin(lowestLeftDiagPoint, state.gameBoardValues);
  } if (checkLeftDiagonalWin(lowestRightDiagPoint, state.gameBoardValues) != null) {
    return checkLeftDiagonalWin(lowestRightDiagPoint, state.gameBoardValues);
  }
  return null;
}

app.use(express.static('./FrontEnd/source'));
app.use(express.json());

app.post('/setup', (req, res) => {
  updateStateValues(req.body);
  state.gameBoardValues = setupGameBoardValuesArray(state.gameBoardRows, state.gameBoardColumns);
  res.json({
    result: state,
  });
});

app.post('/placeCounter', (req, res) => {
  res.json({
    updatedState: state,
    placedCounterPos: placeCounter(req.body.column),
  });
});

app.post('/checkWin', (req, res) => {
  const isWin = checkWinner(parseInt(req.body.column), parseInt(req.body.row));
  res.json({
    winDetected: isWin,
  });
});

// app.get('/setup', (req, res) => {
//   console.log('Setting up board...');
//   res.send('hi');
// });

app.post('game/board/col', (req, res) => {
  res.json();
});

app.listen(8080, () => {
  console.log('server has started');
});
