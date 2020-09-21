const request = require('supertest');
const serverExport = require('../BackEnd/source/server');

// const { request } = require("express")

describe('POST /setupNewGame', () => {
  const zeroByZeroStateToSend = {
    gameBoardValues: [],
    currentPlayer: 'red',
    gameBoardColumns: 0,
    gameBoardRows: 0,
  };

  const twoByTwoStateToSend = {
    gameBoardValues: [],
    currentPlayer: 'red',
    gameBoardColumns: 2,
    gameBoardRows: 2,
  };

  const expectedZeroByZeroState = {
    gameBoardValues: [],
    currentPlayer: 'red',
    gameBoardColumns: 0,
    gameBoardRows: 0,
  };

  const expectedTwoByTwoState = {
    gameBoardValues: [
      [null, null],
      [null, null],
    ],
    currentPlayer: 'red',
    gameBoardColumns: 2,
    gameBoardRows: 2,
  };

  const cases = [
    [zeroByZeroStateToSend, expectedZeroByZeroState],
    [twoByTwoStateToSend, expectedTwoByTwoState],
  ];

  test.each(cases)(
    'When given %s rows and %s columns, it returns an empty initial game board array of that size',
    (stateToSend, expectedState, done) => {
      // Act
      request(serverExport.app)
        .post('/setupNewGame')
        .send(stateToSend)
        .expect(200, { result: expectedState })
        .end(done);
    },
  );

  test('setupBoard call sets currentPlayer to red', (done) => {
    const stateToSend = {
      gameBoardValues: [],
      currentPlayer: 'yellow',
      gameBoardColumns: 2,
      gameBoardRows: 2,
    };

    const expectedState = {
      gameBoardValues: [
        [null, null],
        [null, null],
      ],
      currentPlayer: 'red',
      gameBoardColumns: 2,
      gameBoardRows: 2,
    };

    request(serverExport.app)
      .post('/setupNewGame')
      .send(stateToSend)
      .expect(200, { result: expectedState })
      .end(done);
  });
});

describe('POST /placeCounter', () => {
  it('should return a state with a correctly placed counter', (done) => {
    const columnIndexSent = 0;
    const expectedState = {
      gameBoardValues: [],
      currentPlayer: 'red',
      gameBoardColumns: 0,
      gameBoardRows: 0,
    };

    request(serverExport.app)
      .post('/setupNewGame')
      .send({ body: columnIndexSent })
      .expect(200, { result: expectedState })
      .end(done);
  });
});
