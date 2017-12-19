
let puzzle = input.split('\n');

for (let idx = 0; idx < puzzle.length; idx++){
    puzzle[idx] = puzzle[idx].split('');
}


let puzzlePath = solvePuzzle()

let pathString = puzzlePath.join("");

// Part One
console.log("Part One: ", pathString.replace(/\W/g, ""));

// Part Two
console.log("Part Two: ", puzzlePath.length + 1);


function solvePuzzle(){
    // get starting row and column idx
    let row = 0;
    let col = getStartingColumn(row);

    let direction = "down";
    let puzzleEnd = false;
    let puzzlePath = [];
    while(!puzzleEnd){
        switch (direction){
            case "down": {
                row++;
                break
            }
            case "right": {
                col++;
                break
            }
            case "up": {
                row--;
                break
            }
            case "left": {
                col--;
                break
            }
        }
        // check if we are at the end of puzzle
        if (puzzle[row][col] === " "){
            puzzleEnd = true;
        }
        else {
            puzzlePath.push(puzzle[row][col])
            if (puzzle[row][col] === "+"){
                if (direction === "down" || direction === "up"){
                    if (puzzle[row][col-1] !== " ") direction = "left";
                    else direction = "right";
                }
                else if (direction === "left" || direction === "right"){
                    if (puzzle[row-1][col] !== " ") direction = "up";
                    else direction = "down";
                }
            }
        }
    }
    return puzzlePath
}


function getStartingColumn(row){
    for (let idx = 0; idx < puzzle[row].length; idx++){
        if (puzzle[row][idx] === "|"){
            return idx
        }
    }
}
