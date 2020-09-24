const state = {
  gameBoardValues: [],
  currentPlayer: 'red',
  gameBoardColumns: 0,
  gameBoardRows: 0,
  gameInPlay: false,
  yellowWinCount: 0,
  redWinCount: 0,
  aiMode: false,
};

window.onload = function exampleFunction() {
  checkGameInPlay();
};

function updateStateValues(newStateValues) {
  state.gameBoardValues = newStateValues.gameBoardValues;
  state.currentPlayer = newStateValues.currentPlayer;
  state.gameBoardColumns = newStateValues.gameBoardColumns;
  state.gameBoardRows = newStateValues.gameBoardRows;
  state.gameInPlay = newStateValues.gameInPlay;
  state.yellowWinCount = newStateValues.yellowWinCount;
  state.redWinCount = newStateValues.redWinCount;
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
  $(`#${winningColor}-win-count`).text(state[`${winningColor}WinCount`]);
  disableBoard();
  removeHover();
}

function updateBoard() {
  // Update colours of display
  for (let i = 0; i < state.gameBoardColumns; i += 1) {
    for (let j = 0; j < state.gameBoardRows; j += 1) {
      if (state.gameBoardValues[i][j] !== null) {
        const divID = `${i}-${j}`;
        $(`#${divID}`).css('background-color', state.gameBoardValues[i][j]);
      }
    }
  }
}

function showBoard() {
  drawBoardToHtml(state.gameBoardColumns, state.gameBoardRows);
  updateBoard();
}

function checkGameInPlay() {
  $.ajax({
    type: 'GET',
    url: '/checkGameInPlay',
    contentType: 'application/json',
    success: (result) => {
      console.log(result);
      if (result.latestState.gameInPlay === true) {
        console.log(result.latestState);
        updateStateValues(result.latestState);
        showBoard();
        displayInGameAssets();
      }
    },
  });
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
      // console.log('redWinCountResult' + result.updatedState.redWinCount);
      updateStateValues(result.updatedState);
      // console.log('redWinCountState' + state.redWinCount);
      if (result.winDetected != null) {
        showWinner(result.winDetected);
      }
    },
  });
}

function placeCounter(columnIndex) {
  const body = {
    column: columnIndex,
  };
  $.ajax({
    type: 'POST',
    url: '/placeCounter',
    data: JSON.stringify(body),
    contentType: 'application/json',
    success: (result) => {
      $(`#${result.placedCounterPos}`).css('background-color', state.currentPlayer);

      updateStateValues(result.updatedState);
      $('#player-counter').css('background-color', state.currentPlayer);

      checkWin(result.placedCounterPos);
    },
  });
}

function aiPlaceCounter() {
  $.ajax({
    type: 'GET',
    url: '/aiPlaceCounter',
    contentType: 'application/json',
    success: (result) => {
      $(`#${result.placedCounterPos}`).css('background-color', state.currentPlayer);

      updateStateValues(result.updatedState);
      $('#player-counter').css('background-color', state.currentPlayer);

      checkWin(result.placedCounterPos);
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
  $('#red-win-count').text(state.redWinCount);
  $('#yellow-win-count').text(state.yellowWinCount);
  $('#player-turn-area').attr('style', 'display: block');
  $('#reset-button').attr('style', 'display: block');
  $('.fireworks').attr('style', 'display: none;');
  $('#player-counter').css('background-color', state.currentPlayer);
}

function setupBoard() {
  $('#game-board').html('');
  const rowInput = $('#row-input').val();
  const columnInput = $('#column-input').val();

  $.ajax({
    type: 'POST',
    url: '/setupNewGame',
    data: JSON.stringify({ rows: rowInput, columns: columnInput }),
    contentType: 'application/json',
    success: (result) => {
      const resultObject = result.updatedState;
      updateStateValues(resultObject);

      drawBoardToHtml(state.gameBoardColumns, state.gameBoardRows);
      displayInGameAssets();
    },
  });
}

$('#create-board-button').click(() => {
  setupBoard();
});

$('#reset-button').click(() => {
  setupBoard();
});

$('#AI-button').click(() => {
  aiPlaceCounter();
});
