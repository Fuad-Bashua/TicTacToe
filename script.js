// create function factories and then wrap it in an IIFE
function Gameboard() {
    const board = []
    const columns = 3;
    const rows = 3;

    // creating a 2d array w/ a nested for loop which represents the state of the gameboard
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
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

const checkWinner = (token) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0].getValue() === token &&
            board[i][1].getValue() === token &&
            board[i][2].getValue() === token
        ) return true;
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (
            board[0][j].getValue() === token &&
            board[1][j].getValue() === token &&
            board[2][j].getValue() === token
        ) return true;
    }

    // Check diagonals
    if (
        board[0][0].getValue() === token &&
        board[1][1].getValue() === token &&
        board[2][2].getValue() === token
    ) return true;

    if (
        board[0][2].getValue() === token &&
        board[1][1].getValue() === token &&
        board[2][0].getValue() === token
    ) return true;

    return false;
};

    return { 
        getBoard, 
        dropToken, 
        printBoard,
        checkWinner
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
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
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

        if (board.checkWinner(getActivePlayer().token)) {
    console.log(`${getActivePlayer().name} wins!`);
      return; // End the game
   }



        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {

        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        board.forEach(row => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add('cell');

                cellButton.dataset.column = index
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;

    if(!selectedColumn) return;

    game.playRound(selectedColumn);
    updateScreen();
    }
    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
}


ScreenController();



