const {
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
  checkWinner} = require('../BackEnd/source/server.js');

describe('Setup Initial GameBoard Array', () => {
  const TwoByTwoExpectedBoard = [
    [null, null],
    [null, null],
  ];
  const SixBySixExpectedBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  const SevenByFiveExpectedBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];

  const FiveBySixExpectedBoard = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const cases = [[2, 2, TwoByTwoExpectedBoard],
    [6, 6, SixBySixExpectedBoard],
    [7, 5, SevenByFiveExpectedBoard],
    [5, 6, FiveBySixExpectedBoard]];

  test.each(cases)(
    'When given %s rows and %s columns, it returns an empty initial game board array of that size',
    (numRows, numColumns, expectedResult) => {
      // Act
      const actualBoard = setupGameBoardValuesArray(numRows, numColumns);
      expect(actualBoard).toStrictEqual(expectedResult);
    },
  );
});

describe('Changes Current Player', () => {
  test('Returns a Red value when current player is Yellow', () => {
    // Arrange
    const currentPlayer = 'yellow';
    const expectedOutout = 'red';

    // Act
    const actualOutput = changePlayer(currentPlayer);
    // Assert
    expect(actualOutput).toBe(expectedOutout);
  });

  test('Returns a Yellow value when current player is Red', () => {
    // Arrange
    const currentPlayer = 'red';
    const expectedOutout = 'yellow';

    // Act
    const actualOutput = changePlayer(currentPlayer);
    // Assert
    expect(actualOutput).toBe(expectedOutout);
  });
});

describe('Checks for Column Wins', () => {
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
    expect(actualWinner).toBe(expectedWinner);
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
    expect(actualWinner).toBe(expectedWinner);
  });

  test('Returns a yellow column win when column starting after the first row on third column', () => {
    // Arrange
    const gameBoard = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      ['yellow', 'yellow', 'yellow', 'yellow', 'red'],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];

    const columnOfLastPlacedPiece = 2;

    const expectedWinner = 'yellow';

    // Act
    const actualWinner = checkColumnWin(columnOfLastPlacedPiece, gameBoard);
    // Assert
    expect(actualWinner).toBe(expectedWinner);
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
    expect(actualWinner).toBe(expectedWinner);
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
    expect(actualWinner).toBe(expectedWinner);
  });
});

describe('Checks for Row Wins', () => {
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
    expect(actualWinner).toBe(expectedWinner);
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
    expect(actualWinner).toBe(expectedWinner);
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
    expect(actualWinner).toBe(expectedWinner);
  });

  test('Returns a null when a row win is not detected on the second visual row (full)', () => {
    // Arrange
    const gameBoard = [
      [null, null, 'red', 'yellow'],
      [null, null, 'yellow', 'red'],
      [null, null, 'yellow', 'red'],
      [null, null, 'red', 'red'],
      [null, null, 'yellow', 'yellow'],
      [null, null, 'red', 'yellow'],
    ];

    const rowOfLastPlacedPiece = 2; // 3rd Row Index represents the first visual row

    const expectedWinner = null;

    // Act
    const actualWinner = checkRowWin(rowOfLastPlacedPiece, gameBoard);
    // Assert
    expect(actualWinner).toBe(expectedWinner);
  });

  test('Returns a null when a row win is not detected on the second visual row (empty)', () => {
    // Arrange
    const gameBoard = [
      [null, null, null, 'yellow'],
      [null, null, null, 'red'],
      [null, null, null, 'red'],
      [null, null, null, 'red'],
      [null, null, null, 'yellow'],
      [null, null, null, 'yellow'],
    ];

    const rowOfLastPlacedPiece = 2; // 3rd Row Index represents the first visual row

    const expectedWinner = null;

    // Act
    const actualWinner = checkRowWin(rowOfLastPlacedPiece, gameBoard);
    // Assert
    expect(actualWinner).toBe(expectedWinner);
  });
});

describe('Checks for Right Diagonal Wins', () => {
  const fiveBySixBoard = [
    [null, null, null, 'yellow', 'yellow'],
    [null, null, 'red', 'yellow', 'yellow'],
    [null, 'yellow', 'yellow', 'red', null],
    ['red', 'yellow', 'red', null, null],
    [null, 'red', null, null, null],
    ['red', null, null, null, null],
  ];

  const cases = [
    [3, 1, fiveBySixBoard, 'yellow'], // Yellow Diagonal Win detected from the end (diagonal starting at row 0)
    [5, 0, fiveBySixBoard, 'red'], // Red Diagonal Win detected from the end (diagonal starting after row 0)
    [0, 4, fiveBySixBoard, 'yellow'], // Yellow win detected from the start of a diagonal
    [2, 2, fiveBySixBoard, 'yellow'], // Yellow Win detected from the middle of a diagonal
    [5, 1, fiveBySixBoard, null], // No Diagonal Win returns null with an empty diagonal
    [3, 0, fiveBySixBoard, null], // No Diagonal Win returns null with a full diagonal
  ];
  test.each(cases)(
    'When given %s rows and %s columns, it returns an empty initial game board array of that size',
    (numRows, numColumns, testBoard, expectedWinner) => {
      // Act
      const winColour = checkRightDiagonalWin(numRows, numColumns, testBoard);
      expect(winColour).toBe(expectedWinner);
    },
  );
});

describe('Checks for Left Diagonal Wins', () => {
  const fiveBySixBoard = [
    [null, 'yellow', null, null, null],
    ['red', 'red', 'yellow', null, null],
    [null, 'red', 'yellow', 'yellow', null],
    [null, null, 'red', 'red', 'yellow'],
    [null, null, null, 'red', 'yellow'],
    [null, null, null, null, 'yellow'],
  ];

  const cases = [
    [0, 1, fiveBySixBoard, 'yellow'], // Yellow Diagonal Win detected from the end (diagonal starting at row 0)
    [3, 4, fiveBySixBoard, 'yellow'], // Yellow win detected from the start of a diagonal
    [1, 2, fiveBySixBoard, 'yellow'], // Yellow Win detected from the middle of a diagonal
    [1, 0, fiveBySixBoard, 'red'], // Red Diagonal Win detected from the end (diagonal starting after row 0)
    [2, 0, fiveBySixBoard, null], // No Diagonal Win returns null with an empty diagonal
    [1, 1, fiveBySixBoard, null], // No Diagonal Win returns null with a full diagonal
  ];
  test.each(cases)(
    'When given %s rows and %s columns, it returns an empty initial game board array of that size',
    (numRows, numColumns, testBoard, expectedWinner) => {
      // Act
      const winColour = checkLeftDiagonalWin(numRows, numColumns, testBoard);
      expect(winColour).toBe(expectedWinner);
    },
  );
});

describe('Checks for Lowest Left Diagonal Point', () => {
  const fiveBySixBoard = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const cases = [
    [0, 4, fiveBySixBoard, [0, 4]],
    [1, 3, fiveBySixBoard, [0, 4]],
    [2, 2, fiveBySixBoard, [0, 4]],
    [0, 3, fiveBySixBoard, [0, 3]],
    [1, 2, fiveBySixBoard, [0, 3]],
    [1, 0, fiveBySixBoard, [0, 1]],
  ];
  test.each(cases)(
    'When given %s rows and %s columns, it returns an empty initial game board array of that size',
    (numRows, numColumns, testBoard, expectedWinner) => {
      // Act
      const winColour = getLeftDiagnoalPoint(numRows, numColumns, testBoard);
      expect(winColour).toStrictEqual(expectedWinner);
    },
  );
});

describe('Checks for Lowest Right Diagonal Point', () => {
  const fiveBySixBoard = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const cases = [
    [5, 4, fiveBySixBoard, [5, 4]],
    [4, 3, fiveBySixBoard, [5, 4]],
    [3, 2, fiveBySixBoard, [5, 4]],
    [4, 4, fiveBySixBoard, [4, 4]],
    [3, 3, fiveBySixBoard, [4, 4]],
    [4, 2, fiveBySixBoard, [5, 3]],
  ];
  test.each(cases)(
    'When given %s rows and %s columns, it returns an empty initial game board array of that size',
    (numRows, numColumns, testBoard, expectedWinner) => {
      // Act
      const winColour = getRightDiagnoalPoint(numRows, numColumns, testBoard);
      expect(winColour).toStrictEqual(expectedWinner);
    },
  );
});

describe('Check for a Winner', () => {
  test('', () => {

  });
});
