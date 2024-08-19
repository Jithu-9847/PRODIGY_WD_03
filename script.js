let turn = true;

let matrix = Array.from({ length: 3 }, () => Array(3).fill(-1));


function check(dir) {
    for (let i = 0; i < 3; i++) {
        let temp = 0, flag = 0;
        for (let j = 0; j < 3; j++) {
            let value;
            if (dir == "h") {
                value = matrix[i][j];
            } else if (dir == "v") {
                value = matrix[j][i];
            }
            if (value == -1) {
                flag = 1;
                break;
            } else {
                temp += value;
            }
        }
        if (flag == 0) {
            if (temp == 0) return 0;
            else if (temp == 3) return 1;
        }
    }
    return -1;
}

function checkDiagonal() {
    let temp1 = matrix[0][0] + matrix[1][1] + matrix[2][2];
    let temp2 = matrix[0][2] + matrix[1][1] + matrix[2][0];

    if (matrix[0][0] == -1 || matrix[1][1] == -1 || matrix[2][2] == -1) {
        temp1 = -1;
    }
    if (matrix[0][2] == -1 || matrix[1][1] == -1 || matrix[2][0] == -1) {
        temp2 = -1;
    }

    if (temp1 == 0 || temp2 == 0) return 0;
    else if (temp1 == 3 || temp2 == 3) return 1;

    return -1;
}


function winner_check() {
    let horizontal = check("h");
    let vertical = check("v");
    let diagonal = checkDiagonal();
    if (horizontal != -1) return horizontal;
    if (vertical != -1) return vertical;
    if (diagonal != -1) return diagonal;
    return -1;
}

function mark(a, i, j) {
    if (matrix[i][j] != -1) {
        alert("Cell already marked! Choose another.");
        return;
    }
    if (turn) {
        a.innerHTML = '<img src="cross.svg" alt="X">';
        matrix[i][j] = 1;
        document.getElementById("turn").innerText = "O's TURN";
    } else {
        a.innerHTML = '<img src="circle.svg" alt="O">';
        matrix[i][j] = 0;
        document.getElementById("turn").innerText = "X's TURN";
    }
    turn = !turn;
    let winner = winner_check();
    if (winner != -1) {
        let winner_id = winner == 1 ? "X Wins!" : "O Wins!"
        document.getElementById("turn").innerText = winner_id
        endGame()


    } else if (matrix.flat().every(cell => cell != -1)) {
        document.getElementById("turn").innerText = "It's a Draw"

        endGame()
    }
}

function resetGame() {
    matrix = Array.from({ length: 3 }, () => Array(3).fill(-1));
    document.querySelectorAll('button').forEach(button => button.innerHTML = '');
    turn = true;
    document.getElementById("turn").innerText = "X's TURN";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("resetButton").innerText = "Reset";
    gameActive = false;
}

function startGame() {
    gameActive = true;

    document.getElementById("resetButton").style.display = "none";
}

function endGame() {
    gameActive = false;
    document.getElementById("resetButton").style.display = "block";
}
