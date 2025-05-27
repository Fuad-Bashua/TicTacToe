// create function factories and then wrap it in an IIFE
function Gameboard() {
    const board = []
    const columns = 3;
    const rows = 3;

    // creating a 2d array w/ a nested for loop which represents the state of the gameboard
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push[j];
        }
    }

    // this method will get our entire board so that our Ui can render it
    const getBoard = () => board;

    //
    const dropToken = (column, player) => {
    // here I am looping through rows to find all the rows that dont have a token
    const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);


    if (!availableCells.length) return;

    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addToken(player)
};

    const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
};

    return { 
        getBoard, 
        dropToken, 
        printBoard 
    };
   
}


function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}


function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard()

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

       const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into column ${column}...`);
        board.dropToken(column, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();

const displayController = (function () {

})();

function player(name, marker) {
    let user = {
        name,
        marker,
    };

    return user;
}



