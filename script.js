const Gameboard = (function () {
    const board = []

    for(let i = 0; i < 3; i++) {
        board[i] = [];
        for(let j = 0; j < 3; i++) {
            
        }
    }


    return {
        board
    };

    
})();

const displayController = (function () {

})();

function player(name, marker) {
    let user = {
        name,
        marker,
    };

    return user;
}

const player1 = player('Sam', 'O')
console.log(player1)


