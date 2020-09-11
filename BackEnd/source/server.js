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
// const cors = require('cors');

app.use(express.static('./FrontEnd/source'));
// app.use(cors());
app.use(express.json());

app.post('/setup', (req, res) => {
  // eslint-disable-next-line max-len
  updateStateValues(req.body);
  state.gameBoardValues = setupGameBoardValuesArray(state.gameBoardRows, state.gameBoardColumns);
  res.json({
    result: state,
  });
});

app.post('/placeCounter', (req, res) => {
  // eslint-disable-next-line max-len
  updateStateValues(req.body);
  state.gameBoardValues = setupGameBoardValuesArray(state.gameBoardRows, state.gameBoardColumns);
  res.json({
    result: state,
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
