// Part One ---------------------------------------------------------------------------
let cluster = createCluster()
let direction = 0;

//      0 (360)
//  270         90
//      180

let curRow = (cluster.length - 1)/2;
let curCol = (cluster[0].length - 1)/2;

let infectionCases = 0;

for (let idx = 0; idx < 10000; idx++){
    virusBurst()
}

// Part One solution
console.log("Part One", infectionCases)

// Part Two ---------------------------------------------------------------------------
let cluster2 = createCluster()
direction = 0;

curRow = (cluster2.length - 1)/2;
curCol = (cluster2[0].length - 1)/2;
infectionCases = 0;

for (let idx = 0; idx < 10000000; idx++){
    virusBurst2()
}
// Part Two solution
console.log("Part Two", infectionCases)


function virusBurst2(){
    if (cluster2[curRow][curCol] === "."){
        cluster2[curRow][curCol] = "W";
        // turn left
        direction = direction - 90;
    }
    else if (cluster2[curRow][curCol] === "W"){
        cluster2[curRow][curCol] = "#";
        infectionCases++;
        // direction does not change
    }
    else if (cluster2[curRow][curCol] === "#"){
        cluster2[curRow][curCol] = "F";
        // turn right
        direction = direction + 90;

    }
    else{
        // F
        cluster2[curRow][curCol] = ".";
        // reverse direction
        direction = direction - 180;
    }

    calculateDirection()

    // increase size of the cluster
    if (curCol < 0 || curRow < 0 || curCol > cluster2.length - 1 || curRow > cluster2.length - 1){        
        increaseClusterSize(cluster2)
        curCol++;
        curRow++;
    }
}


function virusBurst(){
    if (cluster[curRow][curCol] === "#"){
        cluster[curRow][curCol] = ".";
        // turn right
        direction = direction + 90;
    }
    else {
        cluster[curRow][curCol] = "#";
        infectionCases++;
        // turn left
        direction = direction - 90;
    }
    
    calculateDirection()

    // increase size of the cluster
    if (curCol < 0 || curRow < 0 || curCol > cluster.length - 1 || curRow > cluster.length - 1){        
        increaseClusterSize(cluster)
        curCol++;
        curRow++;
    }
}


function increaseClusterSize(cluster){
    let newRow = [];
    for (let idx = 0; idx < cluster[0].length; idx++){
        newRow.push(".")
    }
    // add new first row
    cluster.splice(0, 0, newRow.slice())
    // add new last row
    cluster.push(newRow.slice())

    for (let idx = 0; idx < cluster.length; idx++){
        cluster[idx].splice(0, 0, ".")
        cluster[idx].push(".")
    }
}


function createCluster(){
    // input from separate file
    let inputArray = input.split(`\n`)

    let cluster = [];
    for (let row = 0; row < inputArray.length; row++){
        cluster[row] = [];
        inputArray[row] = inputArray[row].split("");
        for (let col = 0; col < inputArray[row].length; col++){
            cluster[row].push(inputArray[row][col])
        }
    }    
    return cluster
}


function calculateDirection(){
    if (direction < 0) direction = direction + 360;
    direction = direction % 360;
    
    if (direction === 270) curCol--;
    else if (direction === 0) curRow--;
    else if (direction === 90) curCol++;
    else if (direction === 180) curRow++;
}