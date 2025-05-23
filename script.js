function gameboard() {
    const gameboard = []
    return {gameboard}
}

function player(name, marker) {
    let user = {
        name,
        marker,
    };

    return user;
}

const player1 = new player('Sam', 'O')
console.log(player1)