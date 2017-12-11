// let list = [0, 1, 2, 3, 4];
// let inputLengths = [3, 4, 1, 5];

let list = [];
for (let idx = 0; idx < 256; idx++){
    list.push(idx);
}

let inputLengths = [63,144,180,149,1,255,167,84,125,65,188,0,2,254,229,24];

let processResults = runProcess(inputLengths, list, 0, 0)

list = processResults[0];

// Part One
console.log("Part One ", list[0]*list[1])


//Part Two
let inpuString = "63,144,180,149,1,255,167,84,125,65,188,0,2,254,229,24";
let inputASCII = createASCILengths(inpuString)

let newList = [];
for (let idx = 0; idx < 256; idx++){
    newList.push(idx);
}

let position = 0;
let skipSize = 0;

for (let idx = 0; idx < 64; idx++){
    let processResults = runProcess(inputASCII, newList, position, skipSize)
    newList = processResults[0]
    position = processResults[1]
    skipSize = processResults[2]
}

let denseHash = createDenseHash(newList)

console.log("Part Two ", createHexString(denseHash))


function runProcess(inputLengths, list, inputCurrentPos, inputSkipSize){
    let currentPosition = inputCurrentPos;
    let skipSize = inputSkipSize;
    for (let idx = 0; idx < inputLengths.length; idx++){
        let sublist = [];
        
        sublist = createSublist(sublist, list, inputLengths[idx], currentPosition)
    
        let position = currentPosition
        for (let sublistIdx = 0; sublistIdx < sublist.length; sublistIdx++){
            list[position] = sublist[sublistIdx]
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
            currentLength = 0
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
    let inputASCII = []
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
    let posIdx = 0
    for (let idx = 0; idx < 16; idx++){
        for (let listIdx = 0 + 16 * posIdx ; listIdx < 16 + 16 * posIdx; listIdx++){
            denseHash[idx] = denseHash[idx]^newList[listIdx]
        }
        posIdx++
    }
    return denseHash;
}


function createHexString(denseHash){
    let hexString = ""
    for (let idx = 0; idx < denseHash.length; idx++){
        newString = denseHash[idx].toString(16)
        if (newString.length < 2){
            hexString = hexString + "0" + newString
        }
        else {
            hexString = hexString + newString
        }   
    }
    return hexString;
}