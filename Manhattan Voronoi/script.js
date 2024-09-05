const { random, floor, max } = Math;
const W = 200;
const N = 30;

function createNxNArray(n) {
    // Create an empty array to hold the rows
    const result = [];

    // Loop to create 'n' rows
    for (let i = 0; i < n; i++) {
        // Create a row filled with '1's
        const row = new Array(n).fill(1);
        // Push the row into the result array
        result.push(row);
    }

    return result;
}

function getValueFromNeighbours(matrix, row, col) {

    if (matrix[row][col] != 1) return matrix[row][col];

    let value = 1;

    // Loop through the 3x3 grid centered on (row, col)
    for (let i = -1; i <= 1; i++) {

        for (let j = -1; j <= 1; j++) {

            if (i == 0 && j == 0) continue;
            // Calculate the neighboring row and column indices
            const newRow = row + i;
            const newCol = col + j;

            // Check if the indices are within bounds of the matrix
            if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length) {
                let val2 = matrix[newRow][newCol];
                if (val2 == 0 || val2 == 1) continue;
                if (value == 1) value = val2;
                else if (value != val2) {
                    return 0;
                }
            }
        }
    }

    return value;
}



onload = () => {
    const cnv = document.getElementById("cnv")
    const ctx = cnv.getContext("2d");
    cnv.width = cnv.height = W;
    ctx.fillRect(0, 0, W, W);

    let Cells;

    function init() {
        Cells = createNxNArray(W);
        for (let i = 0; i < N; i++) {
            Cells[floor(random() * W)][floor(random() * W)] = (i + 1) / N;
        }
        draw();
    }


    function draw() {
        ctx.clearRect(0, 0, W, W);
        let newCells = createNxNArray(W);
        let check = 0;
        for (let y = 0; y < W; y++) {
            for (let x = 0; x < W; x++) {
                let c = floor(Cells[y][x] * 255)
                ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
                ctx.fillRect(x, y, 1, 1);
                newCells[y][x] = getValueFromNeighbours(Cells, y, x);
                check = max(check, newCells[y][x]);
            }
        }
        Cells = newCells;
        // console.log(Cells)
        if (check == 1) {
            requestAnimationFrame(draw);
        }
        else {
            document.querySelector("button").style.display = "inline-block";
        }

    }

    document.querySelector('button').onclick = () => {
        document.querySelector('button').style.display = "none";
        cnv.scrollIntoView();
        setTimeout(init, 500);
    }
}