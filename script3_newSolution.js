let puzzleInput = 361527;

// Part One
let grid = createGrid();
console.log("Part One: ", calculateDistance(grid, puzzleInput))

// Part Two
createGrid2();

function createGrid2(){
    let grid = [];
    let gridSize = 9;
    for (let row = 0; row  < gridSize; row++){
        grid[row] = []
        for (let col = 0; col < gridSize; col++){
            grid[row][col] = 0;
        }
    }

    let currentRow = (grid.length - 1)/2;
    let currentCol = (grid.length - 1)/2;
    
    let spiralLength = 1;
    
    let number = 1;
    
    grid[currentRow][currentCol] = number;
    
    spiralLength = spiralLength + 2;
    
    
    while (number < puzzleInput){
        // right
        currentCol++;
        number = calculateSum(grid, currentRow, currentCol);
        grid[currentRow][currentCol] = number;
    
    
        // up
        for (let idx = 0; idx < spiralLength - 2; idx++){
            currentRow--;
            number = calculateSum(grid, currentRow, currentCol);
            grid[currentRow][currentCol] = number;
        }
    
        // left
        for (let idx = 0; idx < spiralLength - 1; idx++){
            currentCol--;
            number = calculateSum(grid, currentRow, currentCol);
            grid[currentRow][currentCol] = number;
        }
    
        // down
        for (let idx = 0; idx < spiralLength - 1; idx++){
            currentRow++;
            number = calculateSum(grid, currentRow, currentCol);
            grid[currentRow][currentCol] = number;
        }
    
        // right
        for (let idx = 0; idx < spiralLength - 1; idx++){
            currentCol++;            
            number = calculateSum(grid, currentRow, currentCol);
            grid[currentRow][currentCol] = number;
        }
    
        spiralLength = spiralLength + 2;
    }
}

function calculateSum(grid, row, col){
    let number = 0;
    if (row - 1 >= 0){
        number = number + grid[row-1][col];
        if (col - 1 >= 0) number = number + grid[row-1][col-1];
        if (col + 1 < grid.length) number = number + grid[row-1][col+1]
    }
    if (row + 1 < grid.length){
        number = number + grid[row+1][col]
        if (col - 1 >= 0) number = number + grid[row+1][col-1];
        if (col + 1 < grid.length) number = number + grid[row+1][col+1]
    }
    if (col - 1 >= 0) number = number + grid[row][col-1];
    if (col + 1 < grid.length) number = number + grid[row][col+1];
    if (number >  puzzleInput) {
        console.log("Part Two", number)
        return
    }
    return number
}


function createGrid(){
    let grid = [];
    let gridSize = 603;
    for (let row = 0; row  < gridSize; row++){
        grid[row] = []
        for (let col = 0; col < gridSize; col++){
            grid[row][col] = 0;
        }
    }

    let currentRow = (grid.length - 1)/2;
    let currentCol = (grid.length - 1)/2;
    
    let spiralLength = 1;
    
    let number = 1;
    
    grid[currentRow][currentCol] = number;
    
    spiralLength = spiralLength + 2;
    
    
    while (number < Math.pow(gridSize, 2)){
        // right
        number++;
        currentCol++;
        grid[currentRow][currentCol] = number;
    
    
        // up
        for (let idx = 0; idx < spiralLength - 2; idx++){
            number++;
            currentRow--;
            grid[currentRow][currentCol] = number;
        }
    
        // left
        for (let idx = 0; idx < spiralLength - 1; idx++){
            number++;
            currentCol--;
            grid[currentRow][currentCol] = number;
        }
    
        // down
        for (let idx = 0; idx < spiralLength - 1; idx++){
            number++;
            currentRow++;
            grid[currentRow][currentCol] = number;
        }
    
        // right
        for (let idx = 0; idx < spiralLength - 1; idx++){
            number++;
            currentCol++;
            grid[currentRow][currentCol] = number;
        }
    
        spiralLength = spiralLength + 2;
    }
    return grid
}


function calculateDistance(grid, number){
    for (let row = 0; row < grid.length; row++){
        let col = grid[row].indexOf(number)
        if (col > -1) {
            let distance = Math.abs(row - (grid.length - 1)/2) + Math.abs(col - (grid.length - 1)/2);
            return distance
        }
    }
}