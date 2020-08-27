//setupBoard(row, column);

function resetBoard() {
    document.getElementById("game-board").innerHTML = "";
}

function setupBoard() {
    resetBoard();
    let row = document.getElementById("row-input").value;
    let column = document.getElementById("column-input").value;
    let gameBoard = document.getElementById("game-board");
    for (let i = 0; i < row; i++) {
        let divRow = document.createElement("div");
        divRow.className = "row";
        divRow.id = i;

        for (let j = 0; j < column; j++) {
            let divColumn = document.createElement("div");
            divColumn.className = "col-md-2 slot";
            divColumn.id = j;
            let divCircle = document.createElement("div");
            divCircle.className = "circle"
            divColumn.appendChild(divCircle);
            divRow.appendChild(divColumn);
        }
        gameBoard.appendChild(divRow);
    }
}