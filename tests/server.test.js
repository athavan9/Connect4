const {
  setupGameBoardValuesArray,
  resetBoardArray,
  updateStateValues,
  changePlayer,
  placeCounter,
  checkColumnWin,
  checkRowWin,
  checkRightDiagonalWin,
  getLeftDiagnoalPoint,
  checkLeftDiagonalWin,
  getRightDiagnoalPoint,
  checkWinner} = require('../BackEnd/source/server.js');

test('Sets up an Initial Game Board Arary when given 2 rows and 2 columns', () => {
  // Arrange
  const expectedBoard = [
    [null, null],
    [null, null],
  ];
  const numOfRows = 2;
  const numOfColumns = 2;

  // Act
  const actualBoard = setupGameBoardValuesArray(numOfRows, numOfColumns);
  // Assert
  expect(actualBoard).toStrictEqual(expectedBoard);
});

test('Sets up an Initial Game Board Arary when given 6 rows and 6 columns', () => {
  // Arrange
  const expectedBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const numOfRows = 6;
  const numOfColumns = 6;

  // Act
  const actualBoard = setupGameBoardValuesArray(numOfRows, numOfColumns);
  // Assert
  expect(actualBoard).toStrictEqual(expectedBoard);
});

test('Sets up an Initial Game Board Arary when given 7 rows and 5 columns', () => {
  // Arrange
  const expectedBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
  const numOfRows = 7;
  const numOfColumns = 5;

  // Act
  const actualBoard = setupGameBoardValuesArray(numOfRows, numOfColumns);
  // Assert
  expect(actualBoard).toStrictEqual(expectedBoard);
});

test('Sets up an Initial Game Board Arary when given 5 rows and 6 columns', () => {
  // Arrange
  const expectedBoard = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  const numOfRows = 5;
  const numOfColumns = 6;

  // Act
  const actualBoard = setupGameBoardValuesArray(numOfRows, numOfColumns);
  // Assert
  expect(actualBoard).toStrictEqual(expectedBoard);
});

test('Resets a half populated 4x5 board to null', () => {
  // Arrange
  const initialBoard = [
    ['yellow', 'red', 'red', null],
    ['yellow', 'red', 'red', null],
    ['red', 'yellow', 'yellow', null],
    ['yellow', 'red', 'red', null],
    [null, null, null, null],
  ];
  const numOfRows = 4;
  const numOfColumns = 5;

  const expectedBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // Act
  const actualBoard = resetBoardArray(numOfRows, numOfColumns, initialBoard);
  // Assert
  expect(actualBoard).toStrictEqual(expectedBoard);
});

test('Resets a fully populated 4x6 board to null', () => {
  // Arrange
  const initialBoard = [
    ['yellow', 'red', 'red', 'red'],
    ['yellow', 'red', 'red', 'red'],
    ['red', 'yellow', 'yellow', 'red'],
    ['yellow', 'red', 'red', 'red'],
    ['yellow', 'red', 'red', 'red'],
    ['yellow', 'red', 'red', 'red'],
  ];
  const numOfRows = 4;
  const numOfColumns = 6;

  const expectedBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // Act
  const actualBoard = resetBoardArray(numOfRows, numOfColumns, initialBoard);
  // Assert
  expect(actualBoard).toStrictEqual(expectedBoard);
});

test('Resets an empty 4x6 board to null', () => {
  // Arrange
  const initialBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  const numOfRows = 4;
  const numOfColumns = 6;

  const expectedBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  // Act
  const actualBoard = resetBoardArray(numOfRows, numOfColumns, initialBoard);
  // Assert
  expect(actualBoard).toStrictEqual(expectedBoard);
});

test('Returns a Red value when current player is Yellow', () => {
  // Arrange
  const currentPlayer = 'yellow';

  const expectedOutout = 'red';

  // Act
  const actualOutput = changePlayer(currentPlayer);
  // Assert
  expect(actualOutput).toStrictEqual(expectedOutout);
});

test('Returns a Yellow value when current player is Red', () => {
  // Arrange
  const currentPlayer = 'red';

  const expectedOutout = 'yellow';

  // Act
  const actualOutput = changePlayer(currentPlayer);
  // Assert
  expect(actualOutput).toStrictEqual(expectedOutout);
});

test('Returns a red column win in the first column', () => {
  // Arrange
  const gameBoard = [
    ['red', 'red', 'red', 'red'],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  const columnOfLastPlacedPiece = 0;

  const expectedWinner = 'red';

  // Act
  const actualWinner = checkColumnWin(columnOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});

test('Returns a yellow column win in the second column', () => {
  // Arrange
  const gameBoard = [
    [null, null, null, null],
    ['yellow', 'yellow', 'yellow', 'yellow'],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  const columnOfLastPlacedPiece = 1;

  const expectedWinner = 'yellow';

  // Act
  const actualWinner = checkColumnWin(columnOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});

test('Returns a yellow column win when column starting after the first row on third column', () => {
  // Arrange
  const gameBoard = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    ['red', 'yellow', 'yellow', 'yellow', 'yellow'],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const columnOfLastPlacedPiece = 2;

  const expectedWinner = 'yellow';

  // Act
  const actualWinner = checkColumnWin(columnOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});

test('Returns a null when a column win is not detected on the 2nd column (empty)', () => {
  // Arrange
  const gameBoard = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const columnOfLastPlacedPiece = 2;

  const expectedWinner = null;

  // Act
  const actualWinner = checkColumnWin(columnOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});

test('Returns a null when a column win is not detected on the 2nd column (full)', () => {
  // Arrange
  const gameBoard = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    ['red', 'yellow', 'red', 'yellow', 'yellow'],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const columnOfLastPlacedPiece = 2;

  const expectedWinner = null;

  // Act
  const actualWinner = checkColumnWin(columnOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});

test('Returns a red row win in the first visual row', () => {
  // Arrange
  const gameBoard = [
    [null, null, null, 'red'],
    [null, null, null, 'red'],
    [null, null, null, 'red'],
    [null, null, null, 'red'],
    [null, null, null, null],
    [null, null, null, 'yellow'],
  ];

  const rowOfLastPlacedPiece = 3; // 3rd Row Index represents the first visual row

  const expectedWinner = 'red';

  // Act
  const actualWinner = checkRowWin(rowOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});

test('Returns a yellow row win in the second visual row', () => {
  // Arrange
  const gameBoard = [
    [null, null, 'yellow', 'red'],
    [null, null, 'yellow', 'red'],
    [null, null, 'yellow', 'red'],
    [null, null, 'yellow', 'yellow'],
    [null, null, null, null],
    [null, null, null, null],
  ];

  const rowOfLastPlacedPiece = 2; // 3rd Row Index represents the first visual row

  const expectedWinner = 'yellow';

  // Act
  const actualWinner = checkRowWin(rowOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});

test('Returns a yellow row win in the middle of a row', () => {
  // Arrange
  const gameBoard = [
    [null, null, null, null],
    [null, null, 'yellow', 'red'],
    [null, null, 'yellow', 'red'],
    [null, null, 'yellow', 'red'],
    [null, null, 'yellow', 'yellow'],
    [null, null, null, null],
  ];

  const rowOfLastPlacedPiece = 2; // 3rd Row Index represents the first visual row

  const expectedWinner = 'yellow';

  // Act
  const actualWinner = checkRowWin(rowOfLastPlacedPiece, gameBoard);
  // Assert
  expect(actualWinner).toStrictEqual(expectedWinner);
});
