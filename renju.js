const fs = require('fs');

const BOARD_SIZE = 19;
const WIN_LENGTH = 5;

function solve() {
    const rawInput = fs.readFileSync(0, 'utf8');
    const input = rawInput.trim().split(/\s+/).filter(Boolean);
    let idx = 0;
    const testCases = parseInt(input[idx++]);

    if (!Number.isInteger(testCases) || testCases < 1) {
        throw new Error('Invalid test case count');
    }

    for (let t = 0; t < testCases; t++) {
        const board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            board[i] = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (idx >= input.length) {
                    throw new Error(`Missing board value at test case ${t + 1}, row ${i + 1}, column ${j + 1}`);
                }

                const value = Number(input[idx++]);
                if (!Number.isInteger(value) || value < 0 || value > 2) {
                    throw new Error(`Invalid board value at test case ${t + 1}, row ${i + 1}, column ${j + 1}`);
                }

                board[i][j] = value;
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

    if (idx < input.length) {
        throw new Error('Extra input detected after the last test case');
    }
}

function isWithinBounds(row, col) {
    return row >= 0 && row < BOARD_SIZE &&
           col >= 0 && col < BOARD_SIZE;
}

function findWinner(board) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1]
    ];

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let column = 0; column < BOARD_SIZE; column++) {
            const color = board[row][column];
            if (color === 0) continue;

            for (const [directionRow, directionColumn] of directions) {
                let count = 0;
                let currRow = row;
                let currColumn = column;

                while (isWithinBounds(currRow, currColumn) && board[currRow][currColumn] === color) {
                    count++;
                    currRow += directionRow;
                    currColumn += directionColumn;
                }

                if (count === WIN_LENGTH) {
                    const prevRow = row - directionRow;
                    const prevColumn = column - directionColumn;
                    if (isWithinBounds(prevRow, prevColumn) && board[prevRow][prevColumn] === color) {
                        continue;
                    }

                    const nextRow = row + WIN_LENGTH * directionRow;
                    const nextColumn = column + WIN_LENGTH * directionColumn;
                    if (isWithinBounds(nextRow, nextColumn) && board[nextRow][nextColumn] === color) {
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
