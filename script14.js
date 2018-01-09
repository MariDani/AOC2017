let grid = [];
const input = "hxtvlmkl"


partOne()


partTwo()


function partTwo(){
    for (let idx = 0; idx <grid.length; idx++){
        grid[idx] = grid[idx].split("")
    }
    
    let regions = 0;
    
    for (let row = 0; row < grid.length; row++){
        for (let col = 0; col < grid.length; col++){
            if (grid[row][col] === "1"){
                searchRegions(row, col, regions)
                regions++;
                
            }
        }
    }
    console.log("Part Two:", regions)
}


function searchRegions(startRow, startCol){
    grid[startRow][startCol] = "0";
    let queue = [[startRow, startCol]];

    while (queue.length > 0){
        // take first element from queue
        [row, col] = queue.shift()
        // up
        if (row - 1 >= 0 && grid[row-1][col] === "1"){
            queue.push([row-1, col]);
            grid[row-1][col] = "0";
        }
        // down
        if (row + 1 < grid.length && grid[row+1][col] === "1"){
            queue.push([row+1, col]);
            grid[row+1][col] = "0";
        }
        // left
        if (col - 1 >= 0 && grid[row][col-1] === "1"){
            queue.push([row, col-1]);
            grid[row][col-1] = "0";
        }
        // right
        if (col + 1 < grid.length && grid[row][col+1] === "1"){
            queue.push([row, col+1]);            ;
            grid[row][col+1] = "0";
        }
    }
}


function partOne(){
    let usedCount = 0;
    for (let idx = 0; idx < 128; idx++){
        grid[idx] = [""];
        let keyString = day10partTwo(input + "-" + idx);
        keyString.split("").forEach(string => grid[idx] = grid[idx] + (hex2bin(string)))
        usedCount = usedCount + grid[idx].replace(/0/g,"").length
    }
    console.log("Part One:",usedCount)
}


function hex2bin(hex){
    return ("0000" + (parseInt(hex, 16)).toString(2)).substr(-4);
}


function day10partTwo(inpuString){
    let inputASCII = createASCILengths(inpuString)

    let newList = [];
    for (let idx = 0; idx < 256; idx++){
        newList.push(idx);
    }
    
    let position = 0;
    let skipSize = 0;
    
    for (let idx = 0; idx < 64; idx++){
        let processResults = runProcess(inputASCII, newList, position, skipSize)
        newList = processResults[0];
        position = processResults[1];
        skipSize = processResults[2];
    }
    
    let denseHash = createDenseHash(newList);
    
    return createHexString(denseHash)
}


function runProcess(inputLengths, list, inputCurrentPos, inputSkipSize){
    let currentPosition = inputCurrentPos;
    let skipSize = inputSkipSize;
    for (let idx = 0; idx < inputLengths.length; idx++){
        let sublist = [];
        
        sublist = createSublist(sublist, list, inputLengths[idx], currentPosition)
    
        let position = currentPosition
        for (let sublistIdx = 0; sublistIdx < sublist.length; sublistIdx++){
            list[position] = sublist[sublistIdx];
            position++;
            if (position >= list.length){
                position = 0;
            }
        }
        let newPosition = inputLengths[idx] + skipSize;
        while (newPosition > 0){        
            currentPosition++;
            newPosition--;
            if (currentPosition >= list.length){
                currentPosition = 0;
            }
        }
        skipSize++;
    }
    return [list, currentPosition, skipSize];
}


function createSublist(sublist, list, length, currentPosition){
    let currentLength = currentPosition;
    for (let idx = 0; idx < length; idx++) {
        sublist.push(list[currentLength])
        currentLength++;
        if(currentLength >= list.length){
            currentLength = 0;
        }
    }
    sublist = invertOrder(sublist);
    return sublist;
}


function invertOrder(array){
    let newArray = [];
    for (let idx = array.length - 1; idx >= 0; idx--){
        newArray.push(array[idx])
    }
    return newArray;
}


function createASCILengths(inpuString){
    let inputASCII = [];
    for (let idx = 0; idx < inpuString.length; idx++){
        inputASCII.push(inpuString[idx].charCodeAt(0))
    }    
    lenghtSuffix = [17, 31, 73, 47, 23];    
    for (let idx = 0; idx < lenghtSuffix.length; idx++){
        inputASCII.push(lenghtSuffix[idx])
    }
    return inputASCII;
}


function createDenseHash(newList){
    let denseHash = [];
    let posIdx = 0;
    for (let idx = 0; idx < 16; idx++){
        for (let listIdx = 0 + 16 * posIdx ; listIdx < 16 + 16 * posIdx; listIdx++){
            denseHash[idx] = denseHash[idx]^newList[listIdx];
        }
        posIdx++;
    }
    return denseHash;
}


function createHexString(denseHash){
    let hexString = "";
    for (let idx = 0; idx < denseHash.length; idx++){
        newString = denseHash[idx].toString(16);
        if (newString.length < 2){
            hexString = hexString + "0" + newString;
        }
        else {
            hexString = hexString + newString;
        }   
    }
    return hexString;
}