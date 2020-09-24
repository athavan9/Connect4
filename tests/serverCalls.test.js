const request = require('supertest');
const serverExport = require('../BackEnd/source/server');

describe('POST /setupNewGame', () => {
  const expectedZeroByZeroState = {
    gameBoardValues: [],
    currentPlayer: 'red',
    gameBoardColumns: 0,
    gameBoardRows: 0,
    gameInPlay: true,
    yellowWinCount: 0,
    redWinCount: 0,
    aiMode: false,
  };

  const expectedTwoByTwoState = {
    gameBoardValues: [
      [null, null],
      [null, null],
    ],
    currentPlayer: 'red',
    gameBoardColumns: 2,
    gameBoardRows: 2,
    gameInPlay: true,
    yellowWinCount: 0,
    redWinCount: 0,
    aiMode: false,
  };

  const cases = [
    [0, 0, expectedZeroByZeroState],
    [2, 2, expectedTwoByTwoState],
  ];

  it.each(cases)(
    'should, when given %s rows and %s columns, return an empty initial game board array of that size',
    (numOfColumns, numOfRows, expectedState, done) => {
      // Act
      request(serverExport.app)
        .post('/setupNewGame')
        .send({ rows: numOfRows, columns: numOfColumns })
        .expect(200, { updatedState: expectedState })
        .end(done);
    },
  );
});

it.skip('should return the value of the current state of the server /checkGameInPlay', (done) => {
  const expectedState = {
    gameBoardValues: [],
    currentPlayer: 'red',
    gameBoardColumns: 0,
    gameBoardRows: 0,
    gameInPlay: true,
    yellowWinCount: 0,
    redWinCount: 0,
    aiMode: false,
  };

  request(serverExport.app)
    .post('/checkGameInPlay')
    .expect({ latestState: expectedState })
    .end(done);
});

describe.skip('POST /placeCounter', () => {
  it('should return a state with a correctly placed counter', (done) => {
    const columnIndexSent = 0;
    const expectedState = {
      gameBoardValues: [
        [null, 'red'],
        [null, null],
      ],
      currentPlayer: 'red',
      gameBoardColumns: 2,
      gameBoardRows: 2,
      gameInPlay: true,
      yellowWinCount: 0,
      redWinCount: 0,
      aiMode: false,
    };

    request(serverExport.app)
      .post('/placeCounter')
      .send({ body: columnIndexSent })
      .expect(500, { result: expectedState })
      .end(done);
  });
});
