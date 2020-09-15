const state = {
  gameBoardValues: [],
  currentPlayer: 'red',
  gameBoardColumns: 0,
  gameBoardRows: 0,
};

function updateStateValues(newStateValues) {
  state.gameBoardValues = newStateValues.gameBoardValues;
  state.currentPlayer = newStateValues.currentPlayer;
  state.gameBoardColumns = newStateValues.gameBoardColumns;
  state.gameBoardRows = newStateValues.gameBoardRows;
}

function resetBoard(row, column) {
  $('#game-board').html('');

  const body = {
    gameBoardValues: state.gameBoardValues,
    currentPlayer: 'red',
    gameBoardColumns: column,
    gameBoardRows: row,
  };
  $.ajax({
    type: 'POST',
    url: '/resetBoard',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: (result) => {
      const resultObject = result.updatedState;
      updateStateValues(resultObject);

      $('#player-counter').css('background-color', state.currentPlayer);
    },
  });
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
  $(`#${winningColor}-win-count`).text(parseInt(winCount, 10) + 1);
  disableBoard();
  removeHover();
}

function checkWin(columnRowIndex) {
  const columnRowArray = columnRowIndex.split('-');
  const body = {
    column: columnRowArray[0],
    row: columnRowArray[1],
  };

  $.ajax({
    type: 'POST',
    url: '/checkWin',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: (result) => {
      if (result.winDetected != null) {
        showWinner(result.winDetected);
      }
    },
  });
}

function placeCounter(columnIndex) {
  let newlyPlacedPiece;
  const body = {
    column: columnIndex,
  };
  $.ajax({
    type: 'POST',
    url: '/placeCounter',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: (result) => {
      const resultObject = result.updatedState;
      newlyPlacedPiece = result.placedCounterPos;

      $(`#${newlyPlacedPiece}`).css('background-color', state.currentPlayer);

      updateStateValues(resultObject);

      $('#player-counter').css('background-color', state.currentPlayer);

      checkWin(newlyPlacedPiece);
    },
  });
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
  $('.fireworks').attr('style', 'display: none;');
}

function setupBoard() {
  resetBoard(state.gameBoardRows, state.gameBoardColumns);
  const row = $('#row-input').val();
  const column = $('#column-input').val();
  state.gameBoardColumns = column;
  state.gameBoardRows = row;
  state.currentPlayer = 'red';

  drawBoardToHtml(state.gameBoardColumns, state.gameBoardRows);
  displayInGameAssets();

  $.ajax({
    type: 'POST',
    url: '/setup',
    data: JSON.stringify(state),
    contentType: 'application/json',
    success: (result) => {
      const resultObject = result.result;
      updateStateValues(resultObject);
    },
  });
}

$('#create-board-button').click(() => {
  setupBoard();
});

$('#reset-button').click(() => {
  setupBoard();
});
// module = module || {};
// if (typeof module !== 'undefined') {
//   module.exports = {
//     resetBoard,
//     setupGameBoardValuesArray,
//     placeCounter,
//     setupBoard,
//   };
// }
