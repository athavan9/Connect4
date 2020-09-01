//setupBoard(row, column);

let gameBoardValues = []
let currentPlayer = 'red'

function getGameBoardValues() {
    return gameBoardValues;
}

function setGameBoardValues(updatedGameBoardValues) {
    gameBoardValues = updatedGameBoardValues;
}

function resetBoard(row, column) {
    document.getElementById("game-board").innerHTML = "";
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            gameBoardValues[row][column] = null;
        }
    }
    document.getElementById("player-counter").style.background = "red"
}

function setupGameBoardValues(row, column) {
    let customGameBoardValues = [];
    for (let i = 0; i < column; i++) {
        let tempArray = []
        for (let j = 0; j < row; j++) {
            tempArray.push(null);
        }
        customGameBoardValues.push(tempArray)
    }
    gameBoardValues = customGameBoardValues;
}

function placeCounter(columnIndex) {
    for (let i = gameBoardValues[columnIndex].length - 1; i >= 0; i--) {
        if (gameBoardValues[columnIndex][i] == null) {
            gameBoardValues[columnIndex][i] = "red";
            let slot = document.getElementById(columnIndex + "," + i)
            slot.style.background = currentPlayer;
            break;
        }
    }
    if (currentPlayer == "yellow") {
        currentPlayer = "red"
        document.getElementById('player-counter').style.background = "red"
    } else {
        currentPlayer = "yellow"
        document.getElementById('player-counter').style.background = "yellow"
    }
    console.log(gameBoardValues);
}

function setupBoard() {
    resetBoard();
    let row = document.getElementById("row-input").value;
    let column = document.getElementById("column-input").value;
    let gameBoard = document.getElementById("game-board");
    setupGameBoardValues(row, column);
    for (let i = 0; i < column; i++) {
        let divColumn = document.createElement("div");
        divColumn.addEventListener("click", function() {
            placeCounter(i);
        });
        divColumn.className = "column flex-container";
        divColumn.id = i;

        for (let j = 0; j < row; j++) {
            let divRow = document.createElement("div");
            divRow.className = "row";
            divRow.id = i + "," + j;
            divColumn.appendChild(divRow);
        }
        gameBoard.appendChild(divColumn);
    }
}

module = module || {};
module.exports = {
    resetBoard: resetBoard,
    setupGameBoardValues: setupGameBoardValues,
    placeCounter: placeCounter,
    setupBoard: setupBoard,
    getGameBoardValues: getGameBoardValues,
    setGameBoardValues: setGameBoardValues,
}

// function setupBoard() {
//     resetBoard();
//     let row = document.getElementById("row-input").value;
//     let column = document.getElementById("column-input").value;
//     let gameBoard = document.getElementById("game-board");
//     for (let i = 0; i < row; i++) {
//         let divRow = document.createElement("div");
//         divRow.className = "row";
//         divRow.id = i;

//         for (let j = 0; j < column; j++) {
//             let divColumn = document.createElement("div");
//             divColumn.className = "col-md-2 slot";
//             divColumn.id = j;
//             let divCircle = document.createElement("div");
//             divCircle.className = "circle"
//             divColumn.appendChild(divCircle);
//             divRow.appendChild(divColumn);
//         }
//         gameBoard.appendChild(divRow);
//     }
// }