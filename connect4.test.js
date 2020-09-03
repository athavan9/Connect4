const {
  resetBoard, setupGameBoardValues, placeCounter, setupBoard} = require('./board');

test('Checks game board array is reset from resetBoard', () => {
  // Arrange
  gameBoard = [
    [null, null, null, 'red'],
    [null, null, null, 'red'],
    [null, null, null, 'yellow'],
    [null, null, null, 'red'],
  ];

  expectedGameBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // Act
  setGameBoardValues(gameBoard);
  resetBoard(0, 3);
  gameBoard = getBoard();
  // Assert
  expect(gameBoard).toStrictEqual(expectedGameBoard);
});

test('Checks game board array is set up to the right dimensions', () => {
  // Arrange
  gameBoardValues = [];

  expectedGameBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // Act
  setupGameBoardValues(4, 4);
  // Assert
  expect(getGameBoardValues()).toStrictEqual(expectedGameBoard);
});



test('Checks a piece is placed correctly', () => {
  // Arrange
  gameBoardValues = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  expectedGameBoard = [
    [null, null, null, 'red'],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // Act
  placeCounter(0)
  // Assert
  console.log(getGameBoardValues())
  expect(getGameBoardValues()).toStrictEqual(expectedGameBoard);
});
