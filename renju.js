const fs = require('fs');

function solve() {
    const rawInput = fs.readFileSync(0, 'utf8');
    const input = rawInput.trim().split(/\s+/);
    let idx = 0;
    const testCases = parseInt(input[idx++]);

    for (let t = 0; t < testCases; t++) {
        const board = [];
        for (let i = 0; i < 19; i++) {
            board[i] = [];
            for (let j = 0; j < 19; j++) {
                board[i][j] = parseInt(input[idx++]);
            }
        }

        const result = findWinner(board);
        if (result) {
            console.log(result.winner);
            console.log(`${result.row + 1} ${result.col + 1}`);
        } else {
            console.log(0);
        }
    }
}

function isInside(row, col) {
    return row >= 0 && row < 19 &&
           col >= 0 && col < 19;
}

function findWinner(board) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1]
    ];

    for (let column = 0; column < 19; column++) {
        for (let row = 0; row < 19; row++) {
            const color = board[row][column];
            if (color === 0) continue;

            for (const [directionRow, directionColumn] of directions) {
                let count = 0;
                let currRow = row;
                let currColumn = column;

                while (isInside(currRow, currColumn) && board[currRow][currColumn] === color) {
                    count++;
                    currRow += directionRow;
                    currColumn += directionColumn;
                }

                if (count === 5) {
                    const prevRow = row - directionRow;
                    const prevColumn = column - directionColumn;
                    if (isInside(prevRow, prevColumn) && board[prevRow][prevColumn] === color) {
                        continue;
                    }

                    const nextRow = row + 5 * directionRow;
                    const nextColumn = column + 5 * directionColumn;
                    if (isInside(nextRow, nextColumn) && board[nextRow][nextColumn] === color) {
                        continue;
                    }

                    return { winner: color, row: row, col: column };
                }
            }
        }
    }
    return null;
}

solve();
